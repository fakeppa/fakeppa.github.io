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

### 目录爆破
```bash
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /root/reports/_192.168.254.144_80/__25-07-18_13-49-03.txt

Target: http://192.168.254.144/

[13:49:03] Starting:
[13:49:04] 403 -  280B  - /.ht_wsr.txt
[13:49:04] 403 -  280B  - /.htaccess.bak1
[13:49:04] 403 -  280B  - /.htaccess.sample
[13:49:04] 403 -  280B  - /.htaccess.orig
[13:49:04] 403 -  280B  - /.htaccess.save
[13:49:04] 403 -  280B  - /.htaccess_orig
[13:49:04] 403 -  280B  - /.htaccessBAK
[13:49:04] 403 -  280B  - /.htaccess_sc
[13:49:04] 403 -  280B  - /.htaccessOLD
[13:49:04] 403 -  280B  - /.htaccess_extra
[13:49:04] 403 -  280B  - /.htm
[13:49:04] 403 -  280B  - /.htaccessOLD2
[13:49:04] 403 -  280B  - /.html
[13:49:04] 403 -  280B  - /.htpasswd_test
[13:49:04] 403 -  280B  - /.httr-oauth
[13:49:04] 403 -  280B  - /.htpasswds
[13:49:05] 403 -  280B  - /.php
[13:49:05] 403 -  280B  - /.php3
[13:49:11] 200 -  131B  - /dev
[13:49:13] 200 -  137B  - /image.php
[13:49:13] 301 -  323B  - /javascript  ->  http://192.168.254.144/javascript/
[13:49:18] 403 -  280B  - /server-status
[13:49:18] 403 -  280B  - /server-status/
[13:49:22] 200 -    1KB - /wordpress/wp-login.php
[13:49:22] 200 -    4KB - /wordpress/

Task Completed
```

对wordpress进行递归
```bash
┌──(root㉿localhost)-[~]
└─# dirsearch -u http://192.168.254.144/wordpress/
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /root/reports/http_192.168.254.144/_wordpress__25-07-19_16-30-29.txt

Target: http://192.168.254.144/

[16:30:29] Starting: wordpress/
[16:30:30] 403 -  280B  - /wordpress/.ht_wsr.txt
[16:30:30] 403 -  280B  - /wordpress/.htaccess.bak1
[16:30:30] 403 -  280B  - /wordpress/.htaccess.orig
[16:30:30] 403 -  280B  - /wordpress/.htaccess.save
[16:30:30] 403 -  280B  - /wordpress/.htaccess.sample
[16:30:30] 403 -  280B  - /wordpress/.htaccess_orig
[16:30:30] 403 -  280B  - /wordpress/.htaccess_extra
[16:30:30] 403 -  280B  - /wordpress/.htaccessBAK
[16:30:30] 403 -  280B  - /wordpress/.htaccess_sc
[16:30:30] 403 -  280B  - /wordpress/.htaccessOLD
[16:30:30] 403 -  280B  - /wordpress/.htaccessOLD2
[16:30:30] 403 -  280B  - /wordpress/.htm
[16:30:30] 403 -  280B  - /wordpress/.html
[16:30:30] 403 -  280B  - /wordpress/.htpasswd_test
[16:30:30] 403 -  280B  - /wordpress/.httr-oauth
[16:30:30] 403 -  280B  - /wordpress/.htpasswds
[16:30:30] 403 -  280B  - /wordpress/.php
[16:30:30] 403 -  280B  - /wordpress/.php3
[16:30:38] 301 -    0B  - /wordpress/index.php  ->  http://192.168.254.144/wordpress/
[16:30:38] 301 -    0B  - /wordpress/index.php/login/  ->  http://192.168.254.144/wordpress/login/
[16:30:39] 200 -    7KB - /wordpress/license.txt
[16:30:42] 200 -    3KB - /wordpress/readme.html
[16:30:46] 301 -  331B  - /wordpress/wp-admin  ->  http://192.168.254.144/wordpress/wp-admin/
[16:30:46] 200 -    0B  - /wordpress/wp-config.php
[16:30:46] 301 -  333B  - /wordpress/wp-content  ->  http://192.168.254.144/wordpress/wp-content/
[16:30:46] 200 -    0B  - /wordpress/wp-content/
[16:30:46] 200 -   84B  - /wordpress/wp-content/plugins/akismet/akismet.php
[16:30:46] 200 -  537B  - /wordpress/wp-admin/install.php
[16:30:46] 200 -  464B  - /wordpress/wp-content/uploads/
[16:30:46] 302 -    0B  - /wordpress/wp-admin/  ->  http://192.168.254.144/wordpress/wp-login.php?redirect_to=http%3A%2F%2F192.168.254.144%2Fwordpress%2Fwp-admin%2F&reauth=1
[16:30:46] 500 -    0B  - /wordpress/wp-includes/rss-functions.php
[16:30:46] 301 -  334B  - /wordpress/wp-includes  ->  http://192.168.254.144/wordpress/wp-includes/
[16:30:46] 400 -    1B  - /wordpress/wp-admin/admin-ajax.php
[16:30:46] 500 -    3KB - /wordpress/wp-admin/setup-config.php
[16:30:46] 200 -    4KB - /wordpress/wp-includes/
[16:30:46] 500 -    0B  - /wordpress/wp-content/plugins/hello.php
[16:30:46] 200 -    0B  - /wordpress/wp-cron.php
[16:30:46] 302 -    0B  - /wordpress/wp-signup.php  ->  http://192.168.254.144/wordpress/wp-login.php?action=register
[16:30:46] 405 -   42B  - /wordpress/xmlrpc.php
[16:30:46] 200 -    1KB - /wordpress/wp-login.php

Task Completed
```

#### **小技巧--dirb深度应用**
递归

```bash
┌──(root㉿localhost)-[/home/Prime_Series]
└─# dirb http://192.168.254.144

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Sat Jul 19 18:20:43 2025
URL_BASE: http://192.168.254.144/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://192.168.254.144/ ----
+ http://192.168.254.144/dev (CODE:200|SIZE:131)
+ http://192.168.254.144/index.php (CODE:200|SIZE:136)
==> DIRECTORY: http://192.168.254.144/javascript/
+ http://192.168.254.144/server-status (CODE:403|SIZE:280)
==> DIRECTORY: http://192.168.254.144/wordpress/

---- Entering directory: http://192.168.254.144/javascript/ ----
==> DIRECTORY: http://192.168.254.144/javascript/jquery/

---- Entering directory: http://192.168.254.144/wordpress/ ----
+ http://192.168.254.144/wordpress/index.php (CODE:301|SIZE:0)
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-content/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-includes/
+ http://192.168.254.144/wordpress/xmlrpc.php (CODE:405|SIZE:42)

---- Entering directory: http://192.168.254.144/javascript/jquery/ ----
+ http://192.168.254.144/javascript/jquery/jquery (CODE:200|SIZE:284394)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/ ----
+ http://192.168.254.144/wordpress/wp-admin/admin.php (CODE:302|SIZE:0)
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/css/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/images/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/includes/
+ http://192.168.254.144/wordpress/wp-admin/index.php (CODE:302|SIZE:0)
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/js/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/maint/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/network/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-admin/user/

---- Entering directory: http://192.168.254.144/wordpress/wp-content/ ----
+ http://192.168.254.144/wordpress/wp-content/index.php (CODE:200|SIZE:0)
==> DIRECTORY: http://192.168.254.144/wordpress/wp-content/plugins/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-content/themes/
==> DIRECTORY: http://192.168.254.144/wordpress/wp-content/uploads/

---- Entering directory: http://192.168.254.144/wordpress/wp-includes/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/css/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/images/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/includes/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/js/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/maint/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/network/ ----
+ http://192.168.254.144/wordpress/wp-admin/network/admin.php (CODE:302|SIZE:0)
+ http://192.168.254.144/wordpress/wp-admin/network/index.php (CODE:302|SIZE:0)

---- Entering directory: http://192.168.254.144/wordpress/wp-admin/user/ ----
+ http://192.168.254.144/wordpress/wp-admin/user/admin.php (CODE:302|SIZE:0)
+ http://192.168.254.144/wordpress/wp-admin/user/index.php (CODE:302|SIZE:0)

---- Entering directory: http://192.168.254.144/wordpress/wp-content/plugins/ ----
+ http://192.168.254.144/wordpress/wp-content/plugins/index.php (CODE:200|SIZE:0)

---- Entering directory: http://192.168.254.144/wordpress/wp-content/themes/ ----
+ http://192.168.254.144/wordpress/wp-content/themes/index.php (CODE:200|SIZE:0)

---- Entering directory: http://192.168.254.144/wordpress/wp-content/uploads/ ----
(!) WARNING: Directory IS LISTABLE. No need to scan it.
    (Use mode '-w' if you want to scan it anyway)

-----------------
END_TIME: Sat Jul 19 18:21:10 2025
DOWNLOADED: 46120 - FOUND: 15
```
指定后缀爆破，比dirb更加有效
```bash
┌──(root㉿localhost)-[/home/Prime_Series]
└─# dirb http://192.168.254.144  -X .zip,.txt

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Sat Jul 19 23:36:01 2025
URL_BASE: http://192.168.254.144/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt
EXTENSIONS_LIST: (.zip,.txt) | (.zip)(.txt) [NUM = 2]

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://192.168.254.144/ ----
+ http://192.168.254.144/secret.txt (CODE:200|SIZE:412)

-----------------
END_TIME: Sat Jul 19 23:36:05 2025
DOWNLOADED: 9224 - FOUND: 1
```
### 尝试爆破
发现一个用户victor，爆破一下
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250719164555.png)
爆破失败

#### **小技巧----wFuzz参数模糊测试**
```bash
┌──(root㉿localhost)-[/home/Prime_Series]
└─# wfuzz -c -w /usr/share/wfuzz/wordlist/general/common.txt  --hh 136 http://192.168.254.144/index.php?FUZZ=something
 /usr/lib/python3/dist-packages/wfuzz/__init__.py:34: UserWarning:Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.
********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://192.168.254.144/index.php?FUZZ=something
Total requests: 951

=====================================================================
ID           Response   Lines    Word       Chars       Payload
=====================================================================

000000341:   200        7 L      19 W       206 Ch      "file"

Total time: 0.357342
Processed Requests: 951
Filtered Requests: 950
Requests/sec.: 2661.308
```
命令解析
```bash
wfuzz -c -w /usr/share/wfuzz/wordlist/general/common.txt  --hh 136
```
-c：颜色输出
-w：字典选择
-hh：忽略请求字符长度为特定的相应

其他筛选：

| 参数     | 含义         | 示例                      | 用途                     |
| ------ | ---------- | ----------------------- | ---------------------- |
| `--hc` | HTTP状态码过滤  | `--hc 404`              | 隐藏404响应                |
| `--hl` | 响应行数过滤     | `--hl 20`               | 隐藏20行响应的结果             |
| `--hw` | 响应词数过滤     | `--hw 5`                | 隐藏含5个单词的响应             |
| `--hh` | 响应长度(字节)过滤 | `--hh 136`              | 隐藏136字节长度的响应(您示例中的用法)  |
| `--ht` | 响应时间过滤(毫秒) | `--ht 100`              | 隐藏耗时>100ms的请求          |
| `--hs` | 正则表达式过滤    | `--hs "error\\invalid"` | 隐藏包含error/invalid文本的响应 |
经过爆破后发现file参数

获得参数后，发现返回了，用参数获取了错误文件，结合之前再`http://192.168.254.144/secret.txt`的提示,改值为location.txt后，返回正确内容
```bash
Do something better  

ok well Now you reah at the exact parameter  
  
Now dig some more for next one  
use 'secrettier360' parameter on some other php page for more fun.
```
意思是用`secrettier360`参数再其他php页面上传入参数
其他php界面也就是`image.php`界面了，对这个进行操作,发现是一个任意文件包含
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250801133158.png)

```bash
┌──(root㉿localhost)-[/home/Prime_Series]
└─# cat web | grep /bin/bash
root:x:0:0:root:/root:/bin/bash
victor:x:1000:1000:victor,,,:/home/victor:/bin/
```