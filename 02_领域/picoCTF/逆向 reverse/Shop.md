---
icon: pen-to-square
date: 2024-12-25
tags: 
title: Shop
category:
  - 领域
---
16,048 users solved
Author: thelshell

#### Description

Best Stuff - Cheap Stuff, Buy Buy Buy... Store Instance: [source](https://mercury.picoctf.net/static/73724c199e55e6c056bb00e7bbfdfb38/source). The shop is open for business at .`nc mercury.picoctf.net 10337`

#### Hints
Always check edge cases when programming

----
# 00. 前言
emmm，先要了解一下elf文件吧，先啃文档。。。等做题的时候再把理解的东西写出来。有趣，这好像跟elf可执行程序关系不大，我们直接来玩坏这个程序

# 01.解题过程
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241225163522.png)

买-10个Quiet Quiches获得了100coins
在买flag即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241225163703.png)
简单解码一下可以发现是十进制
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241225163736.png)

```
picoCTF{b4d_brogrammer_3da34a8f}
```