---
icon: pen-to-square
date: 2024-12-26
tags: 
title: Safe Opener 2
category:
  - 领域
---
11,975 users solved
#### Description

What can you do with this file?I forgot the key to my safe but this [file](https://artifacts.picoctf.net/c/288/SafeOpener.class) is supposed to help me with retrieving the lost key. Can you help me unlock my safe?
#### Hints
Download and try to decompile the file.

----
# 00. 前言
题目给定了一个class文件，所以我们需要反编译成java文件

# 01. 解题过程
把class文件丢进idea就可以反编译成功了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241226123824.png)
发现flag
```
picoCTF{SAf3_0p3n3rr_y0u_solv3d_it_5bfbd6f1}
```
