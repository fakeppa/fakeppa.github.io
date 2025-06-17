---
icon: pen-to-square
date: 2025-05-28
tags: 
title: my_file_server靶场
category:
  - 项目
---
## 信息收集
### 主机发现
初步推测主机地址在`192.168.254.0/24`C段,通过开关靶机前后两次扫描确定靶机地址
```bash
┌──(root㉿localhost)-[~]
└─# nmap -sn 192.168.254.0/24
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:22 CST
Nmap scan report for 192.168.254.128
Host is up (0.0015s latency).
Nmap scan report for 192.168.254.140
Host is up (0.0012s latency).
Nmap done: 256 IP addresses (2 hosts up) scanned in 20.26 seconds

┌──(root㉿localhost)-[~]
└─# nmap -sn 192.168.254.0/24
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:23 CST
Nmap scan report for 192.168.254.128
Host is up (0.00059s latency).
Nmap done: 256 IP addresses (1 host up) scanned in 20.26 seconds
```
`192.168.254.140`是靶机地址

### 端口扫描
`nmap -sT --min-rate 10000 192.168.254.140 -oA nmapscan/ports`

```bash
┌──(root㉿localhost)-[/home]
└─# nmap -sT --min-rate 10000 192.168.254.140 -oA nmapscan/ports
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:31 CST
Nmap scan report for 192.168.254.140
Host is up (0.00025s latency).
Not shown: 901 filtered tcp ports (no-response), 5 filtered tcp ports (host-unreach), 87 closed tcp ports (conn-refused)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
111/tcp  open  rpcbind
445/tcp  open  microsoft-ds
2049/tcp open  nfs
2121/tcp open  ccproxy-ftp

Nmap done: 1 IP address (1 host up) scanned in 0.75 seconds
```
#### 详细信息扫描
`sudo nmap -sT -sV -sC -O -p21,22,80,111,445,2049,2121 192.168.254.140 -oA nmapscan/detail`

```bash
# Nmap 7.95 scan initiated Wed May 28 15:33:37 2025 as: /usr/lib/nmap/nmap -sT -sV -sC -O -p21,22,80,111,445,2049,2121 -oA nmapscan/detail 192.168.254.140
Nmap scan report for 192.168.254.140
Host is up (0.00043s latency).

PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 3.0.2
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxrwxrwx    3 0        0              16 Feb 19  2020 pub [NSE: writeable]
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:192.168.254.1
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.2 - secure, fast, stable
|_End of status
22/tcp   open  ssh         OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 75:fa:37:d1:62:4a:15:87:7e:21:83:b9:2f:ff:04:93 (RSA)
|   256 b8:db:2c:ca:e2:70:c3:eb:9a:a8:cc:0e:a2:1c:68:6b (ECDSA)
|_  256 66:a3:1b:55:ca:c2:51:84:41:21:7f:77:40:45:d4:9f (ED25519)
80/tcp   open  http        Apache httpd 2.4.6 ((CentOS))
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: My File Server
|_http-server-header: Apache/2.4.6 (CentOS)
111/tcp  open  rpcbind     2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100003  3,4         2049/udp   nfs
|   100003  3,4         2049/udp6  nfs
|   100005  1,2,3      20048/tcp   mountd
|   100005  1,2,3      20048/tcp6  mountd
|   100005  1,2,3      20048/udp   mountd
|   100005  1,2,3      20048/udp6  mountd
|   100021  1,3,4      36516/tcp6  nlockmgr
|   100021  1,3,4      40341/tcp   nlockmgr
|   100021  1,3,4      41589/udp   nlockmgr
|   100021  1,3,4      46564/udp6  nlockmgr
|   100024  1          34943/udp   status
|   100024  1          39096/tcp   status
|   100024  1          41712/tcp6  status
|   100024  1          54859/udp6  status
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
445/tcp  open  netbios-ssn Samba smbd 4.9.1 (workgroup: SAMBA)
2049/tcp open  nfs_acl     3 (RPC #100227)
2121/tcp open  ftp         ProFTPD 1.3.5
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: ERROR
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 2.6.32 - 3.13 (97%), Linux 3.4 - 3.10 (97%), Linux 2.6.32 - 3.10 (97%), Linux 2.6.39 (97%), Linux 3.10 (97%), Synology DiskStation Manager 5.2-5644 (95%), Linux 2.6.32 (94%), Linux 2.6.32 - 3.5 (92%), Linux 3.2 - 3.10 (91%), Linux 3.2 - 3.16 (91%)
No exact OS matches for host (test conditions non-ideal).
Service Info: Host: FILESERVER; OS: Unix

Host script results:
|_clock-skew: mean: 5h34m04s, deviation: 3h10m30s, median: 7h24m02s
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2025-05-28T14:57:54
|_  start_date: N/A
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.9.1)
|   Computer name: localhost
|   NetBIOS computer name: FILESERVER\x00
|   Domain name: \x00
|   FQDN: localhost
|_  System time: 2025-05-28T20:27:53+05:30
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Wed May 28 15:33:57 2025 -- 1 IP address (1 host up) scanned in 20.27 seconds

```
**描述**
```bash
21/tcp   open  ftp         vsftpd 3.0.2
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxrwxrwx    3 0        0              16 Feb 19  2020 pub [NSE: writeable]
```
匿名可以登录，有一个可写的pub目录，其中有三个文件
```bash
22/tcp   open  ssh         OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 75:fa:37:d1:62:4a:15:87:7e:21:83:b9:2f:ff:04:93 (RSA)
|   256 b8:db:2c:ca:e2:70:c3:eb:9a:a8:cc:0e:a2:1c:68:6b (ECDSA)
|_  256 66:a3:1b:55:ca:c2:51:84:41:21:7f:77:40:45:d4:9f (ED25519)
```
ssh是7.4版本的服务
主机密钥类型`ssh-hostkey`有三种类型。
```bash
80/tcp   open  http        Apache httpd 2.4.6 ((CentOS))
```
80端口服务为`apache`，系统为`CentOS`。
```bash
445/tcp  open  netbios-ssn Samba smbd 4.9.1 (workgroup: SAMBA)
```
445端口为SAMBA
2049端口与111端口信息中描述的2049端口一致
```bash
2049/tcp open  nfs_acl     3 (RPC #100227)
```

```bash
2121/tcp open  ftp         ProFTPD 1.3.5
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: ERROR
```
这是一个ftp的服务，匿名可以登录
#### 进行UDP扫描
```bash
sudo nmap -sU --top-ports 20 192.168.254.140 -oA nmapscan/udp
```

```bash
┌──(root㉿localhost)-[/home]
└─# sudo nmap -sU --top-ports 20 192.168.254.140 -oA nmapscan/udp
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:46 CST
Nmap scan report for 192.168.254.140
Host is up (0.00053s latency).

PORT      STATE    SERVICE
53/udp    filtered domain
67/udp    filtered dhcps
68/udp    filtered dhcpc
69/udp    filtered tftp
123/udp   filtered ntp
135/udp   filtered msrpc
137/udp   filtered netbios-ns
138/udp   filtered netbios-dgm
139/udp   filtered netbios-ssn
161/udp   filtered snmp
162/udp   filtered snmptrap
445/udp   filtered microsoft-ds
500/udp   filtered isakmp
514/udp   filtered syslog
520/udp   filtered route
631/udp   filtered ipp
1434/udp  filtered ms-sql-m
1900/udp  filtered upnp
4500/udp  filtered nat-t-ike
49152/udp filtered unknown

Nmap done: 1 IP address (1 host up) scanned in 18.33 seconds
```
udp探测原理为空包探测，即不会对请求做出相应但是会在close端口返回ICMP Port Unreachable

#### 漏洞脚本扫描
```bash
sudo nmap --script=vuln -p21,22,80,111,445,2049,2121 192.168.254.140 -oA nmapscan/vuln
```
**没有什么新发现**
```bash
┌──(root㉿localhost)-[/home]
└─# sudo nmap --script=vuln -p21,22,80,111,445,2049,2121 192.168.254.140 -oA nmapscan/vuln
Starting Nmap 7.95 ( https://nmap.org ) at 2025-05-28 15:54 CST
Nmap scan report for 192.168.254.140
Host is up (0.00067s latency).

PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
|_http-csrf: Couldn't find any CSRF vulnerabilities.
|_http-trace: TRACE is enabled
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
|_http-dombased-xss: Couldn't find any DOM based XSS.
| http-enum:
|_  /icons/: Potentially interesting folder w/ directory listing
111/tcp  open  rpcbind
445/tcp  open  microsoft-ds
2049/tcp open  nfs
2121/tcp open  ccproxy-ftp

Host script results:
|_smb-vuln-ms10-061: false
|_smb-vuln-ms10-054: false
| smb-vuln-regsvc-dos:
|   VULNERABLE:
|   Service regsvc in Microsoft Windows systems vulnerable to denial of service
|     State: VULNERABLE
|       The service regsvc in Microsoft Windows 2000 systems is vulnerable to denial of service caused by a null deference
|       pointer. This script will crash the service if it is vulnerable. This vulnerability was discovered by Ron Bowes
|       while working on smb-enum-sessions.
|_

Nmap done: 1 IP address (1 host up) scanned in 47.43 seconds

```

#### 总结
共计优先级
21>nfs(111,2049,20048)>SAMBA(445)>80
- NFS（Network File System，网络文件系统）是一种分布式文件系统协议，由 ​**​Sun Microsystems​**​ 开发，允许客户端像访问本地文件一样访问远程服务器上的文件。
- 111端口由 `rpcbind`服务监听，NFS依赖RPC机制实现远程文件访问， `rpcbind`记录并管理所有RPC服务的动态端口，然后再通过RPC访问

## 渗透过程
### 尝试ftp，21端口
```bash
sudo ftp 192.168.254.140
```