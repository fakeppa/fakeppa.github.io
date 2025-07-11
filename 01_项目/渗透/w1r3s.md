---
icon: pen-to-square
date: 2025-07-11
tags: 
title: w1r3s
category:
  - 项目
---
## 主机发现
扫描192.168.254.0/24网段
扫描192.168.254.142主机

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
