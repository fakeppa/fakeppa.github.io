---
icon: pen-to-square
date: 2024-12-22
tags: 
title: WinAntiDbg0x100
category:
  - 项目
---

Author: Nandan Desai
#### Description

This challenge will introduce you to 'Anti-Debugging.' Malware developers don't like it when you attempt to debug their executable files because debugging these files reveals many of their secrets! That's why, they include a lot of code logic specifically designed to interfere with your debugging process.Now that you've understood the context, go ahead and debug this Windows executable!This challenge binary file is a Windows console application and you can start with running it using on Windows.`cmd`Challenge can be downloaded [here](https://artifacts.picoctf.net/c_titan/55/WinAntiDbg0x100.zip). Unzip the archive with the password `picoctf`

#### Hints
Hints will be displayed to the Debug console. Good luck!

----
# 00. 前言
*第一次接触逆向，这是前所未有的挑战*

# 01. 解题过程
尝试运行给定文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133402.png)
提示我们用debugger打开
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133650.png)
在互联网上看到的应用，先下载这个调试工具试试

