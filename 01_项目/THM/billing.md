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
```
use exploit/linux/http/magnusbilling_unauth_rce_cve_2023_30258
```