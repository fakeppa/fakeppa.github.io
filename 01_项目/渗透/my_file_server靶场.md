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

```bash
┌──(root㉿localhost)-[/home]
└─# nmap -sT --min-rate 10000 192.168.254.140 -oA nmapscan/ports
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:31 CST
Nmap scan report for 192.168.254.140
Host is up (0.00025s latency).
Not shown: 901 filtered tcp ports (no-response), 5 filtered tcp ports (host-unreach), 87 closed tcp ports (conn-refused)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
111/tcp  open  rpcbind
445/tcp  open  microsoft-ds
2049/tcp open  nfs
2121/tcp open  ccproxy-ftp

Nmap done: 1 IP address (1 host up) scanned in 0.75 seconds
```
详细信息扫描
`sudo nmap -sT -sV -sC -O -p21,22,80,111,445,2049,2121 192.168.254.140 -oA nmapscan/detail`