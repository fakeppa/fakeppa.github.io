---
icon: pen-to-square
date: 2025-04-26
tags: 
title: windows常用命令
category:
  - 项目
---
以下是 Windows 常用命令的分类整理，涵盖系统管理、网络、文件操作等场景，适用于 CMD命令提示符和 PowerShell：

---

**一、基础命令**
1. `ipconfig`  
   • 查看本机IP地址、网关、DNS信息  

   • `ipconfig /all`：显示详细网络配置  

   • `ipconfig /release` & `ipconfig /renew`：释放/更新IP地址（DHCP）


2. `ping`  
   • 测试网络连通性  

   • `ping 目标IP或域名`（如 `ping google.com`）


3. `systeminfo`  
   • 查看系统详细信息（OS版本、安装日期、内存等）


4. `hostname`  
   • 显示当前计算机名称


5. `cls`  
   • 清空命令行界面


---

**二、文件与目录操作**
1. `dir`  
   • 列出当前目录下的文件和子目录  

   • `dir /a`：显示隐藏文件


2. `cd`  
   • 切换目录  

   • `cd ..`：返回上级目录  

   • `cd /d D:\Folder`：切换盘符并进入目录


3. `copy`  
   • 复制文件  

   • `copy file.txt D:\backup\`


4. `xcopy`  
   • 复制目录及子目录  

   • `xcopy /s /e 源目录 目标目录`


5. `del`  
   • 删除文件  

   • `del /f 文件名`：强制删除


6. `rmdir / rd`  
   • 删除空目录  

   • `rmdir /s /q 目录名`：静默删除非空目录（谨慎使用）


7. `robocopy`  
   • 强大的文件同步工具  

   • `robocopy 源目录 目标目录 /mir`：镜像同步（删除目标多余文件）


---

**三、进程与服务管理**
1. `tasklist`  
   • 列出所有正在运行的进程


2. `taskkill`  
   • 终止进程  

   • `taskkill /im 进程名.exe /f`（如 `taskkill /im chrome.exe /f`）


3. `services.msc`  
   • 打开服务管理界面（图形化）


4. `sc`  
   • 服务控制命令  

   • `sc query 服务名`：查询服务状态  

   • `sc stop 服务名`：停止服务


5. `resmon`  
   • 打开资源监视器（查看CPU、内存、磁盘使用情况）


---

**四、网络诊断与配置**
1. `tracert`  
   • 追踪数据包路径（如 `tracert google.com`）


2. `netstat`  
   • 查看网络连接状态  

   • `netstat -ano`：显示所有连接及对应进程PID


3. `nslookup`  
   • 查询DNS解析结果（如 `nslookup baidu.com`）


4. `arp -a`  
   • 显示ARP缓存表（IP与MAC地址映射）


5. `route print`  
   • 显示本机路由表


---

**五、系统维护与修复**
1. `sfc /scannow`  
   • 扫描并修复系统文件


2. `chkdsk`  
   • 检查磁盘错误  

   • `chkdsk C: /f /r`：修复并恢复坏扇区（需重启）


3. `dism`  
   • 部署映像服务和管理工具  

   • `dism /online /cleanup-image /restorehealth`：修复系统映像


4. `msconfig`  
   • 打开系统配置工具（管理启动项、引导选项）


5. `msinfo32`  
   • 打开系统信息面板（硬件、驱动等详细信息）


---

**六、用户与权限管理**
1. `net user`  
   • 管理用户账户  

   • `net user 用户名 密码 /add`：创建新用户  

   • `net user 用户名 /delete`：删除用户


2. `whoami`  
   • 显示当前登录的用户名  

   • `whoami /priv`：查看用户权限


3. `lusrmgr.msc`  
   • 打开本地用户和组管理界面


4. `gpedit.msc`  
   • 打开组策略编辑器（仅限Windows专业版以上）


---

**七、远程与连接**
1. `mstsc`  
   • 启动远程桌面连接


2. `ssh`  
   • 连接远程服务器（需启用OpenSSH客户端）


3. `telnet`  
   • 测试端口连通性（如 `telnet 目标IP 端口号`，需先启用功能）


---

**八、PowerShell常用命令**
1. `Get-Command`  
   • 查找可用命令


2. `Get-Process`  
   • 查看运行中的进程（类似 `tasklist`）


3. `Get-Service`  
   • 列出所有服务及状态


4. `Test-NetConnection`  
   • 综合网络测试（如 `Test-NetConnection google.com -Port 80`）


5. `Set-ExecutionPolicy RemoteSigned`  
   • 允许执行本地PowerShell脚本


---

**其他实用命令**
• `calc`：打开计算器

• `notepad`：打开记事本

• `control`：打开控制面板

• `shutdown`  

  • `shutdown /s /t 0`：立即关机  

  • `shutdown /r /t 0`：立即重启  

  • `shutdown /l`：注销当前用户

• `wsl`：启动Windows子系统Linux


---

**注意事项**
• 部分命令需以管理员权限运行（右键CMD/PowerShell选择“以管理员身份运行”）。

• 操作危险命令（如 `del`, `format`, `diskpart`）前请确认路径和参数，避免数据丢失。


根据需求选择合适命令，善用 `命令 /?` 查看帮助文档（如 `ping /?`）。