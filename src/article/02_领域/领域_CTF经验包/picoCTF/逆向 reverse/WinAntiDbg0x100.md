---
icon: pen-to-square
date: 2024-12-22
tags: 
title: WinAntiDbg0x100
category:
  - 领域
---
*段位还是不够 :<*,
I can do this
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
拖到debug中发现这些都是32位寄存器
*32位寄存器通常由E开头，64位由R开头*

利用调试器进行逐步分析，可以看到输出了log日志
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222140047.png)
意思是检测到我们正在使用debugger了，我们需要绕过检查,然后用ghidra查看反编译代码，然后在`FUN_00401580`发现了关键的逻辑
```C
      BVar3 = IsDebuggerPresent();
      if (BVar3 == 0) {
        FUN_00401440(0xb);
        FUN_00401530(DAT_00405404);
        lpOutputString = FUN_004013b0(DAT_00405408);
        if (lpOutputString == (LPWSTR)0x0) {
          OutputDebugStringW(L"### Something went wrong...\n");
        }
        else {
          OutputDebugStringW(L"### Good job! Here\'s your flag:\n");
          OutputDebugStringW(L"### ~~~ ");
          OutputDebugStringW(lpOutputString);
          OutputDebugStringW(L"\n");
          OutputDebugStringW(
```
`if (BVar3 == 0)`在汇编中对应的语句是
```
        00401602 85  c0           TEST       EAX ,EAX
        00401604 74  15           JZ         LAB_0040161b
```
我们记住这个地址`1602`然后在x32debugger对这个地址打断点
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250121173520.png)
运行知道这个断点
然后更改寄存器的值1变为0
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250121173551.png)
继续运行，在随后的比较中会更新寄存器标志位，然后进行跳转等操作，在日志中可以查看flag
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250121173707.png)

flag
```
picoCTF{d3bug_f0r_th3_Win_0x100_cfbacfab}
```
