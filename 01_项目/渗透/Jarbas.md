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
1. virtualbox必须关闭Hyper-V，让我直接没办法用wsl-kali
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
