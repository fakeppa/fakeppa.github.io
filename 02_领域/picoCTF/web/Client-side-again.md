---
icon: pen-to-square
date: 2024-12-22
tags: 
title: Client-side-again
category:
  - 领域
---
#### Description
Can you break into this super secure portal? `https://jupiter.challenges.picoctf.org/problem/56816/` ([link](https://jupiter.challenges.picoctf.org/problem/56816/)) or http://jupiter.challenges.picoctf.org:56816

#### Hints
What is obfuscation?

# 00. 前言
需要掌握web调试工具的使用，这里使用的是edge调试工具，本题在中等难度里算是很简单的

# 01. 解题过程
首先查看源代码，发现这里的js代码搞得一行很长
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222132019.png)

然后我们在监视里输入图中的变量名_0x5a46，然后我们可以发现乱序的代码，你可以使用脚本来排序然后访问，但我选择直接进行人脑排序
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222132233.png)

获得flag
```
picoCTF{not_this_again_337115}
```
