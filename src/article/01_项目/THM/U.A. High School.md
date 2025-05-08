---
icon: pen-to-square
date: 2025-05-07
tags: 
title: U.A. High School
category:
  - 项目
---
## 解题过程
端口扫描和网站爆破之后没有发现可以利用的点
但是在http://10.10.74.25/assets/images的响应很有趣
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250507213758.png)

证明了网页的存在，当访问http://10.10.36.251/assets/时，我们可以发现设置了`session`这意味着我们很可能访问了某个php文件

发现是个php文件后就有了一点操作空间，可以用模糊测试对php的参数进行碰撞
构造命令进行碰撞
```bash
ffuf -u 'http://10.10.85.228/assets/index.php?FUZZ=id' -mc all -ic -t 100 -w /usr/share/seclists/Discovery/Web-Content/raft-small-words-lowercase.txt -fs 0
```
