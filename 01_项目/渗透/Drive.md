---
icon: pen-to-square
date: 2025-03-08
tags: 
title: Drive
category:
  - 项目
---
# 初始侦查
建立一个存放日志的文件夹nmapscan
1. 扫端口
```
sudo nmap -sT --min-rate 10000 -p- 10.129.40.36 -oA nmapscan/ports
```
2. 同时udp扫描
```
sudo nmap -sU --top-port 20 10.129.40.36 -oA nmapscan/udp
```
1. 端口详细信息扫描
```
sudo nmap -sT -sV -sC -O -p80,135,445,1985 10.129.40.36 -0A nmapscan/detail
```
-sT:指定以TCP协议扫描
-sV:扫描各服务的版本
-o:探测操作系统的版本
同时查看udp端口扫描结果
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163309.png)
所有端口都是开放或被过滤的状态，应该没有开放
1. 漏洞脚本扫描
```
sudo nmap --script=vuln -p80,135,445,5985 10.129.40.36 -0A nmapscan/detail
```
一会确定那个端口是开放的，再执行扫描
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163659.png)
