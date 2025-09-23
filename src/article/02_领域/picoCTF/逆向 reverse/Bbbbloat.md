---
icon: pen-to-square
date: 2025-01-03
tags: 
title: Bbbbloat
category:
  - 领域
---
6,804 users solved
#### Description

Can you get the flag?Reverse engineer this [binary](https://artifacts.picoctf.net/c/46/bbbbloat).

----
# 00. 前言
这题是一个二进制逆向问题,也包含了一些C语言

----
# 01. 解题过程
用`file bbbbloat`我们可以发现这是一个elf可执行二进制程序
`./bbbbloat`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231903.png)

输入任意数字提示
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231950.png)

于是我们需要进行反编译，查看这里的判断条件
下载安装GHIDRA，这是一个二进制反编译工具，可以将二进制文件反汇编并进行反编译。
继续，可以发现这是一个C语言文件，C语言是以函数为基础的
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250111194635.png)
发现主程序
```C
__isoc99_scanf(&DAT_00102020,&local_48);
```
有一个输入逻辑
并且这个变量48在接下来进行了判断
```C
if (local_48 == 0x86187)
```
之后进行了函数的调用
因此，我们可以推断，这个就是最喜欢的数字,输入数字的10进制形式获得flag

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250111211315.png)

