---
icon: pen-to-square
date: 2025-02-26
tags: 
title: ARMssembly 2
category:
  - 领域
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
并且还发现在main函数调用了func1，于是从func1从上到下分析
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226154805.png)
没什么好说的，主要就是把w0放到偏移12的位置，wzr是零寄存器，那么24和28的位置都是0
进入.L2
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226155009.png)
比较w1(暂时是0)和w0(4189673334)，如果w1<=w0则跳转L3，否则继续进行然后返回
这里肯定跳转L3了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226155441.png)
加载24(首次值为0,)位置的参数到w0，然后+3，并存入24
加载28(首次值为0)位置的参数到w0，然后+1，并存入28
然后再进入L2进行比较,然后回继续跳转到L3继续叠加

到这里就是一个循环，条件是循环到第4189673334次，然后加载24位置到w0，然后返回，这个w0的值就会被printf调用，这个值为w0`*`3=12569020002，但是这个寄存器只能存储32位数据，于是我们保存低32位即ED2C 0662


```
picoCTF{ed2c0662}
```
