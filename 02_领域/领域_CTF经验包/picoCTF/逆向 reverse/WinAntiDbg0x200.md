---
icon: pen-to-square
date: 2025-02-19
tags: 
title: WinAntiDbg0x200
category:
  - 领域
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
将x32dbg与IDA内代码进行对齐，后四位相同也就是16EB test eax eax，上图未显示，我们需要跳转，更改eax寄存器为1即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219221353.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219221428.png)

持续步进到下一个test 寄存器的内存地址，也可以设置断点，直接运行
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219221726.png)
对应地址17bd
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219221843.png)
这时候ecx为1，不需更改，会跳转，并且跳转位置符合预期
继续来到1830，需要进行跳转，且eax为1，继续步进即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219222043.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250219222118.png)
然后和这里的操作大同小异
edx 不跳转
eax 跳转，由于是je条件，则需要设置eax为0即可跳转，这是与jne不同的一点

这步跳转之后直接运行程序到最后
在日志发现flag
```
picoCTF{0x200_debug_f0r_Win_603b1bdf}
```