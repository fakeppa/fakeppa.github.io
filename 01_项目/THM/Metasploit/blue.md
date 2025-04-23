---
icon: pen-to-square
date: 2025-04-22
tags: 
title: blue
category:
  - 项目
---
## 解答过程
### nmap扫描
```bash
namp -sn <ip>
```
发现主机

```bash
sudo nmap --min-rate 10000 -p- <ip> -oA nmapscan/ports
```
扫描端口
```bash
└─# cat ports.nmap
# Nmap 7.94SVN scan initiated Tue Apr 22 20:27:34 2025 as: nmap --min-rate 10000 -p- -oA 10.10.111.35/ports 10.10.111.35
Nmap scan report for 10.10.111.35
Host is up (7.9s latency).
Not shown: 58579 filtered tcp ports (no-response), 6952 closed tcp ports (reset)
PORT     STATE SERVICE
135/tcp  open  msrpc
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
3389/tcp open  ms-wbt-server

# Nmap done at Tue Apr 22 20:28:17 2025 -- 1 IP address (1 host up) scanned in 43.28 seconds
```
发现可能存在高危漏洞`ms17-010`
search一下ms17-010发现
`exploit/windows/smb/ms17_010_eternalblue`模块
设置好options后进行下一步操作
获得反弹bash
multi/manage/shell_to_meterpreter
使用meterpreter进行提升权限
