---
icon: pen-to-square
date: 2025-07-17
tags: 
title: Prime_Series_Level-1
category:
  - 项目
---
## 信息收集
主机发现`192.168.254.144`
端口扫描
```bash
┌──(root㉿localhost)-[~]
└─# nmap -sT --min-rate 10000 192.168.254.144
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-17 02:26 CST
Nmap scan report for 192.168.254.144
Host is up (0.0011s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 0.20 seconds
```
详细信息扫描
```bash
┌──(root㉿localhost)-[~]
└─#  sudo nmap -sT -sV -sC -O -p22,80 192.168.254.144
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-17 02:27 CST
Nmap scan report for 192.168.254.144
Host is up (0.0015s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 8d:c5:20:23:ab:10:ca:de:e2:fb:e5:cd:4d:2d:4d:72 (RSA)
|   256 94:9c:f8:6f:5c:f1:4c:11:95:7f:0a:2c:34:76:50:0b (ECDSA)
|_  256 4b:f6:f1:25:b6:13:26:d4:fc:9e:b0:72:9f:f4:69:68 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: HacknPentest
|_http-server-header: Apache/2.4.18 (Ubuntu)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.14
Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 7.92 seconds
```
