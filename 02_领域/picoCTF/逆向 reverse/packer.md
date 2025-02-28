---
icon: pen-to-square
date: 2025-01-13
tags: 
title: packer
category:
  - 领域
---
5,747 users solved
#### Description

Reverse this linux executable?[binary](https://artifacts.picoctf.net/c_titan/20/out)
#### Hints
What can we do to reduce the size of a binary after compiling it.

---
# 00. 前言
本题教你怎么解包upx打包后的程序，upx可以让可执行程序程序变小
这也提醒了我们二进制文件逆向时应该先查看字符串，发现有类似的打包应该先进行解包，然后再进行查看字符串或者逆向一类的操作
# 01. 解题过程
upx---压缩壳，首先在终端输入`strings + 文件名`进行字符串查看，发现了upx的文件头,当然，在010中也可以达到一样的效果
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250113185230.png)
发现upx头，进行upx解压
`upx -d out`
然后再次`strings out | more`获得flag字符串
`7069636f4354467b5539585f556e5034636b314e365f42316e34526933535f62646438343839337d`
进行hex转ascii后可以得到flag
```
picoCTF{U9X_UnP4ck1N6_B1n4Ri3S_bdd84893}
```