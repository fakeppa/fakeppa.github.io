---
icon: pen-to-square
date: 2025-05-11
tags: 
title: linux提权
category:
  - 领域
---
## 提权
PrivEsca---PE

### 几种权限体制
| **特性​**​      | ​**​UGO​**​           | ​**​SUID​**​           | ​**​SGID​**​       |
| ------------- | --------------------- | ---------------------- | ------------------ |
| ​**​核心目的​**​  | 基础权限控制（读/写/执行）        | 以文件所有者的权限执行            | 以文件所属组的权限执行或继承组    |
| ​**​作用对象​**​  | 文件或目录                 | 文件（二进制或脚本）             | 文件或目录              |
| ​**​权限位标志​**​ | `r`/`w`/`x`           | `s` 或 `S`（User位）       | `s` 或 `S`（Group位）  |
| ​**​数字模式​**​  | 0~7（User/Group/Other） | 前缀 `4`（如 `4755`）       | 前缀 `2`（如 `2755`）   |
| ​**​安全风险​**​  | 权限分配不当导致越权访问          | 提权漏洞（如 SUID root程序滥用）  | 提权或组权限滥用（如 SGID目录） |
| ​**​典型场景​**​  | 常规文件权限管理              | `passwd`, `sudo` 等特权命令 | 共享目录（团队协作）         |

### 提升反弹shell的交互性（攻击机）
`python -c 'import pty;pty.spawn("/bin/bash")'`
`stty raw -echo`
`export TERM=xterm-color`

`rlwrap nc -lvnp 443`

### 手动枚举（获得反弹shell）
#### 第一个命令

```bash
whoami
```
##### 替代命令
`id` : 查看uid和root id，以及其有哪些权限
`id+其他用户名` 查看其他用户的信息
`who`可以显示有哪些用户登陆了系统
`w`显示当前登录用户的详细信息，超详细
`last`系统最近的登陆记录。

#### 第二个命令
```bash
uname -a
```
查看当前系统的版本号
##### 替代命令
`lsb_release -a`更详细的系统信息
`cat /proc/version`
`cat /etc/issue`
`hostnamectl`

#### 第三个命令
```bash
ip addr
```
看网卡，获得路由信息，可以发现内网更多信息
##### 替代命令
`ifconfig`较老的命令
`ip route`替代`route`查看路由表信息
`ip neigh`查看网络邻居
`arp -a`查看哪些局域网的IP地址和MAC地址绑定

#### 第四个命令
```bash
hostname
```
看机器名称

#### 第五个命令
```bash
sudo -l
```
查看哪些程序可以由root权限执行

#### 第六个命令
```bash
getcap -r / 2>/dev/null
```
- `2>/dev/null`:扔掉错误信息

#### 第七个命令
```bash
ls -liah
```
列出全部文件

### 第八个命令
```bash
history
```
操作过的命令

### 第九个命令
```bash
cat /etc/passwd
```
用户名称：x（用shadow存储密码）：uid:gid：描述：家目录：bash环境

### 第十个命令
```

```

