---
icon: pen-to-square
date: 2025-02-26
tags: 
title: ARMssembly 2
category:
  - 项目
---
#### Description
What integer does this program print with argument `4189673334`? File: [chall_2.S](https://mercury.picoctf.net/static/5c0f1b8d9f0656c228ea0adb62cd5fbf/chall_2.S) Flag format: picoCTF{XXXXXXXX} -> (hex, lowercase, no 0x, and 32 bits. ex. 5614267 would be picoCTF{0055aabb})

#### Hints 
Loops
# 01. 解题过程
在32位arm架构中参数存放在w0中，根据题意可知我们输入4189673334
先来分析代码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226154444.png)
发现func1，.L2和.L3存在较多的w0寄存器
并且还发现在
