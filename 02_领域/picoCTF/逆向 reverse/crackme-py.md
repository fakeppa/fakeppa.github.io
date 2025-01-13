---
icon: pen-to-square
date: 2024-12-23
tags: 
title: crackme-py
category:
  - 领域
---
40,689 users solved
Author: syreal

#### Description

[crackme.py](https://mercury.picoctf.net/static/fd0e358d4b82695c220c0d6013c11484/crackme.py)

----
# 解题过程
本题给出了一个python程序，包含了很简单的逻辑
我们发现只调用了![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223144109.png)

实际上程序中包含了两个函数，我们调用另一个函数`decode_secret(secret)`
我们需要传入一个参数，在进行简单分析后，secret应该是这个
```
bezos_cc_secret = "A:4@r%uL`M-^M0c0AbcM-MFE055a4ce`eN"
```
在末尾加入这个即可解决本题
```
decode_secret(bezos_cc_secret)
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223144409.png)

```
picoCTF{1|\/|_4_p34|\|ut_dd2c4616}
```