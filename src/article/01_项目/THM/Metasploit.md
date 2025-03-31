---
icon: pen-to-square
date: 2025-03-31
tags: 
title: Metasploit
category:
  - 项目
---
unset 
setg
search
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