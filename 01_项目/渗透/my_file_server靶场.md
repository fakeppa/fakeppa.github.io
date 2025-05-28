---
icon: pen-to-square
date: 2025-05-28
tags: 
title: my_file_server靶场
category:
  - 项目
---
## 主机发现
初步推测主机地址在`192.168.254.0/24`C段,通过开关靶机前后两次扫描确定靶机地址
```bash
┌──(root㉿localhost)-[~]
└─# nmap -sn 192.168.254.0/24
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:22 CST
Nmap scan report for 192.168.254.128
Host is up (0.0015s latency).
Nmap scan report for 192.168.254.140
Host is up (0.0012s latency).
Nmap done: 256 IP addresses (2 hosts up) scanned in 20.26 seconds

┌──(root㉿localhost)-[~]
└─# nmap -sn 192.168.254.0/24
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:23 CST
Nmap scan report for 192.168.254.128
Host is up (0.00059s latency).
Nmap done: 256 IP addresses (1 host up) scanned in 20.26 seconds
```
`192.168.254.140`是靶机地址

### 端口扫描
`nmap -sT --min-rate 10000 192.168.254.140 -oA nmapscan/ports`