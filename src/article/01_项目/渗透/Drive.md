---
icon: pen-to-square
date: 2025-03-08
tags: 
title: Drive
category:
  - 项目
---
~~****知识和金钱都不允许，只能云渗透一手了****~~

# 初始侦查
建立一个存放日志的文件夹nmapscan
1. 扫端口
```
sudo nmap -sT --min-rate 10000 -p- 10.129.40.36 -oA nmapscan/ports
```
2. 同时udp扫描
```
sudo nmap -sU --top-port 20 10.129.40.36 -oA nmapscan/udp
```
1. 端口详细信息扫描
```
sudo nmap -sT -sV -sC -O -p80,135,445,1985 10.129.40.36 -oA nmapscan/detail
```
-sT:指定以TCP协议扫描
-sV:扫描各服务的版本
-o:探测操作系统的版本
同时查看udp端口扫描结果
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163309.png)
所有端口都是开放或被过滤的状态，应该没有开放
1. 漏洞脚本扫描
```
sudo nmap --script=vuln -p80,135,445,5985 10.129.40.36 -0A nmapscan/detail
```
这个爆破经过很长时间才结束
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121633.png)

一会确定那个端口是开放的，再执行扫描
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163659.png)
在80端口提示我们输入admin的密码
访问靶机的80端口试试
```
sudo bash -c 'echo "10.129.40.36 driver.htb" >> /etc/hosts' 
```
**将一个IP地址和主机名的映射关系添加到系统的`/etc/hosts`文件中**
-  `/etc/hosts`文件的作用

	`/etc/hosts`是一个系统文件，用于将主机名（或域名）映射到IP地址。它在DNS解析之前被系统优先使用，因此可以覆盖DNS解析的结果。

- 一长串字符串的作用，重定向无法把权限延伸过去，需要用把命令和重定向位置作为一个整体执行
确认一下
```
	tail -n 1 /etc/hosts
```
一般来说ip和域名指向同一个位置，但如果说主机头做了不同的站点路由，解析域名才能访问不同的站点
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309115225.png)
第三个菜单项----Firmware Updates，y有新内容
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309115339.png)
可以上传文件，有可能有文件上传相关漏洞

crackMapexec是一款渗透工具，可以用来信息收集，密码爆破等等
这个工具下一代是nxc

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120036.png)

先尝试一下445端口的SMB服务
```
sudo nxc smb driver.htb --shares -u RedteamNotes -p ''
```
该命令的作用是尝试连接目标主机 `driver.htb` 的 SMB 服务，并列出所有可用的共享资源。如果目标主机的 SMB 服务允许匿名访问，命令将成功列出共享资源；否则，可能会提示访问被拒绝。

```
smbclient -L driver.htb -N
```
该命令的作用是尝试以匿名用户的身份连接到目标主机 `driver.htb`，并列出其上所有可访问的 SMB 共享资源。这些共享资源可能包括文件共享、打印机共享等。
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120538.png)
如果命令成功执行，输出可能类似于以下内容：
```
Domain=[DRIVER] OS=[Windows Server 2019 Standard] Server=[Windows Server 2019 Standard 17763]

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        PRINT$          Disk      Printer Drivers
        SharedDocs      Disk      Shared Documents
        Users           Disk      User directories
```
但是失败了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120638.png)

然后尝试一下135端口
```
rpcclient -U "" -N driver.htb
```

```
enum4linux-ng driver.htb
```
这个命令会尝试枚举目标主机的用户、组、共享资源、域信息等，主要是SMB相关的信息的枚举
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121404.png)
SMB的相关版本 
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121438.png)
操作系统地相关版本，win10企业版
没有更多的信息，意味着SMB无法访问
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121708.png)
在爆破出来的信息中发现了已经尝试过的弱密码

现在回到80端口
 ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309122153.png)
如果能上传一个反弹shell，这是最后的目标
制作一个fantanshell的payload
```
sudo updatedb
```
更新一下数据库
```
locate reverse-shell
```
选择一个反弹shell的payload
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309122449.png)
```
cp /usr/share/ludanum/php/php-reverse-shell.php shell.php 
```
这个需要事先准备到本地
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123447.png)
更改一下信息 
能不能找到反弹shell需要目录爆破才能发现
上传文件并bp抓包
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123212.png)
这个Authorization应该是admin的验证，下面提示了上传到fileshare
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123543.png)
下面进行目录爆破
```
sudo feroxbuster -u http://driver.htb -x php -H "Authorization: Basic YWRtaW46YWRtaW4=" -w /usr/share/seclists/Discovery/Web-Content/dir......
```
- `feroxbuster` 是一个快速的目录枚举工具，类似于 `dirb` 或 `gobuster`，但通常速度更快且功能更强大。它通过发送 HTTP 请求，尝试访问目标网站上的各种路径，以发现隐藏的目录和文件。、
- `-x` 参数用于指定扩展名过滤器。这里指定 `php`，表示 `feroxbuster` 会尝试访问以 `.php` 结尾的文件，例如 `/index.php`、`/admin.php` 等。
- `-H` 参数用于添加自定义的 HTTP 头部。
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309151104.png)
随后交叉验证
```
gobuster dir -u http://driver.htb -U admin -P admin -x php -w /字典路径
```
`gobuster` 是一款流行的目录枚举工具，常用于安全测试和渗透测试。
- `-u` 参数用于指定目标 URL。
- `-U` 参数用于指定用户名（`admin`）。
    
- `-P` 参数用于指定密码（`admin`）。

- `-x` 参数用于指定扩展名过滤器。
- `-w /字典路径`

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309151705.png)
```
ffuf -c -H 'Authorization: Basic YWRtaW46YWRtaW4' -w 字典路径 -u http://driver.htb/FUZZ -e php,.zip,.txt,.pdf
```
1. **`ffuf`**：这是命令行工具的名称，通常用于快速模糊测试（Fuzzing）。
2. **`-c`**：启用颜色输出，使结果更直观。
3. **`-H 'Authorization: Basic YWRtaW46YWRtaW4'`**：通过 HTTP 头部发送授权信息。这里使用了 Basic Auth，`YWRtaW46YWRtaW4` 是经过 Base64 编码的用户名和密码（`admin:admin`）。
4. **`-w 字典路径`**：指定字典文件的路径，字典文件中包含了要测试的目录或文件名列表。
5. **`-u http://driver.htb/FUZZ`**：指定目标 URL，`FUZZ` 是一个占位符，`ffuf` 会用字典文件中的内容替换它。
6. **`-e php,.zip,.txt,.pdf`**：指定扩展名过滤器，`ffuf` 会尝试将字典中的内容与这些扩展名组合，以发现更多可能的资源。
多换字典，多尝试有更多收获
```思路
1. 找到上传的脚本 ----正在解决
2. 上传的脚本能不能执行
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309153459.png)
等待。。。快慢取决于字典大小
最后，以上手段都发现不了上传的脚本，只能放弃这个思路

5985是VRM的端口，只有有凭据才能交互，但我们没有
先要继续就需要对内网认证机制，SMB，内网协议 有一定认识

