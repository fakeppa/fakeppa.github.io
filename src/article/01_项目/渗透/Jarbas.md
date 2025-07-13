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
**小技巧--使用rb，metasploit框架扩展脚本**