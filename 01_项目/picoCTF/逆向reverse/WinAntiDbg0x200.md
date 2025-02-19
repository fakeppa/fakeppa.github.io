---
icon: pen-to-square
date: 2025-02-19
tags: 
title: WinAntiDbg0x200
category:
  - 项目
---
#### Description

If you have solved WinAntiDbg0x100, you'll discover something new in this one. Debug the executable and find the flag!This challenge executable is a Windows console application, and you can start by running it using Command Prompt on Windows.This executable requires admin privileges. You might want to start Command Prompt or your debugger using the 'Run as administrator' option.Challenge can be downloaded [here](https://artifacts.picoctf.net/c_titan/145/WinAntiDbg0x200.zip). Unzip the archive with the password `picoctf`

#### Hints 

Hints will be displayed to the Debug console. Good luck!

---
# 00. 解题思路
这题用IDA代替ghidra，进行静态分析，然后用x32dbg进行步进运行，总体来说没有太复杂的探讨逆向工具的使用
# 01. 解题过程
IDA打开直接进入main函数，F5查看反编译代码
简单看一下，关注到48行有个debugger判定

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219215853.png)
按空格可以清晰地展示逻辑，对新手很友好
看来我们需要走到这一步
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219220045.png)
那我们从开头就用x32跟踪运行
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219220925.png)

在x32dbg中打开文件，点击步进到用户代码
将x32dbg与IDA内代码进行对齐，后四位相同也就是16EB test eax eax，上图未显示，


```
picoCTF{0x200_debug_f0r_Win_603b1bdf}
```