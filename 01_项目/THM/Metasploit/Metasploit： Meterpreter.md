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
