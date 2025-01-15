---
icon: pen-to-square
date: 2025-01-15
tags: 
title: ARMssembly 1
category:
  - 项目
---
4,177 users solved
#### Description

For what argument does this program print `win` with variables `87`, `3` and `3`? File: [chall_1.S](https://mercury.picoctf.net/static/52fa2dfbc7fb145f0a4bf7fd2a89fc49/chall_1.S) Flag format: picoCTF{XXXXXXXX} -> (hex, lowercase, no 0x, and 32 bits. ex. 5614267 would be picoCTF{0055aabb})
#### Hints
Shifts

---
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