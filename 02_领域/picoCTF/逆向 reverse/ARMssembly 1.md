---
icon: pen-to-square
date: 2025-01-15
tags: 
title: ARMssembly 1
category:
  - 领域
---
4,177 users solved
#### Description

For what argument does this program print `win` with variables `87`, `3` and `3`? File: [chall_1.S](https://mercury.picoctf.net/static/52fa2dfbc7fb145f0a4bf7fd2a89fc49/chall_1.S) Flag format: picoCTF{XXXXXXXX} -> (hex, lowercase, no 0x, and 32 bits. ex. 5614267 would be picoCTF{0055aabb})
#### Hints
Shifts

---
我用我自己的语言写在下面,并不严谨，有写等号是多余的，为了让人看着更直观些
```
w0 >[12]=初始值 
>87 >[16]=87
>3 >[20]=3 >[24]=3

w0 
=[20] =3

w1=[16]=87

w0=w1<<w0=87<<3

w0 >[28]

w1=[28]=87<<3

w0=[24]=3

w0=w1/w0=(87<<3)/3

w0 >[28]=(87<<3)/3

最后一次更改：w1=[28]=(87<<3)/3

w0=[12]=初始值

最后一次更改：w0=w1-w0=((87<<3)/3)-初始值

w0>[28]=((87<<3)/3)-初始值




```
方程w0=0
解得初始值位E8，

flag
```
picoCTF{000000E8}
```
*以32进制的形式来表示，还有他这个题干给的参数(97、3和3)很迷惑，原来他们是寄存器中的值。。。*