---
icon: pen-to-square
date: 2025-07-11
tags: 
title: w1r3s
category:
  - 项目
---
## 信息收集
### 主机发现
扫描192.168.254.0/24网段
扫描192.168.254.142主机
### 端口扫描
```bash
┌──(root㉿localhost)-[/home]
└─# nmap -sT --min-rate 10000 192.168.254.142 -oA nmapscan/w1r3s-port
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-11 22:08 CST
Nmap scan report for 192.168.254.142
Host is up (0.00035s latency).
Not shown: 966 filtered tcp ports (no-response), 30 closed tcp ports (conn-refused)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 0.40 seconds
```
### 详细信息扫描
[[02_领域/渗透/信息收集#^ports|快速端口提取--shell语法]]




```bash
┌──(root㉿localhost)-[/home]
└─# sudo nmap -sT -sV -sC -O -p21,22,80,3306 192.168.254.142 -oA nmapscan/w1r3s-detail
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-11 22:16 CST
Nmap scan report for 192.168.254.142
Host is up (0.00061s latency).

PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxr-xr-x    2 ftp      ftp          4096 Jan 23  2018 content
| drwxr-xr-x    2 ftp      ftp          4096 Jan 23  2018 docs
|_drwxr-xr-x    2 ftp      ftp          4096 Jan 28  2018 new-employees
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:192.168.254.1
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 07:e3:5a:5c:c8:18:65:b0:5f:6e:f7:75:c7:7e:11:e0 (RSA)
|   256 03:ab:9a:ed:0c:9b:32:26:44:13:ad:b0:b0:96:c3:1e (ECDSA)
|_  256 3d:6d:d2:4b:46:e8:c9:a3:49:e0:93:56:22:2e:e3:54 (ED25519)
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.18 (Ubuntu)
3306/tcp open  mysql   MySQL (unauthorized)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 3.10 - 4.11 (97%), Linux 3.2 - 4.14 (97%), Linux 5.1 - 5.15 (97%), Linux 3.13 - 3.16 (91%), Linux 3.13 - 4.4 (91%), Linux 3.16 - 4.6 (91%), Linux 3.8 - 3.16 (91%), Linux 4.10 (91%), Linux 4.4 (91%), OpenWrt 19.07 (Linux 4.14) (91%)
No exact OS matches for host (test conditions non-ideal).
Service Info: Host: W1R3S.inc; OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 20.08 seconds
```
## 渗透过程
发现FTP服务匿名登录
[[FTP命令]]
tips:最好先输入binary切换为二进制模式，以免可执行文件下载出现问题
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# ls
01.txt  02.txt  03.txt  employee-names.txt  worktodo.txt

┌──(root㉿localhost)-[/home/w1r3s]
└─# cat employee-names.txt
The W1R3S.inc employee list

Naomi.W - Manager
Hector.A - IT Dept
Joseph.G - Web Design
Albert.O - Web Design
Gina.L - Inventory
Rico.D - Human Resources


┌──(root㉿localhost)-[/home/w1r3s]
└─# cat worktodo.txt
        ı pou,ʇ ʇɥıuʞ ʇɥıs ıs ʇɥǝ ʍɐʎ ʇo ɹooʇ¡

....punoɹɐ ƃuıʎɐןd doʇs ‘op oʇ ʞɹoʍ ɟo ʇoן ɐ ǝʌɐɥ ǝʍ

┌──(root㉿localhost)-[/home/w1r3s]
└─# cat 01.txt
New FTP Server For W1R3S.inc

┌──(root㉿localhost)-[/home/w1r3s]
└─# cat 02.txt
#
#
#
#
#
#
#
#
01ec2d8fc11c493b25029fb1f47f39ce
#
#
#
#
#
#
#
#
#
#
#
#
#
SXQgaXMgZWFzeSwgYnV0IG5vdCB0aGF0IGVhc3kuLg==
############################################

┌──(root㉿localhost)-[/home/w1r3s]
└─# cat 03
cat: 03: No such file or directory

┌──(root㉿localhost)-[/home/w1r3s]
└─# cat 03.txt
___________.__              __      __  ______________________   _________    .__
\__    ___/|  |__   ____   /  \    /  \/_   \______   \_____  \ /   _____/    |__| ____   ____
  |    |   |  |  \_/ __ \  \   \/\/   / |   ||       _/ _(__  < \_____  \     |  |/    \_/ ___\
  |    |   |   Y  \  ___/   \        /  |   ||    |   \/       \/        \    |  |   |  \  \___
  |____|   |___|  /\___  >   \__/\  /   |___||____|_  /______  /_______  / /\ |__|___|  /\___  >
                \/     \/         \/                \/       \/        \/  \/         \/     \/
```
