---
icon: pen-to-square
date: 2024-12-25
tags: 
title: GDB Test Drive
category:
  - 领域
---
14,551 users solved
Author: LT 'syreal' Jones

#### Description

Can you get the flag?Download this [binary](https://artifacts.picoctf.net/c/85/gdbme).Here's the test drive instructions:

- `$ chmod +x gdbme`
- `$ gdb gdbme`
- `(gdb) layout asm`
- `(gdb) break *(main+99)`
- `(gdb) run`
- `(gdb) jump *(main+104)`

----
# 00. 前言
这个挑战让我第一次知道了什么是GDB，GDB是在linux下的命令行的调试程序

# 01. 解题过程
拉下来文件后按照描述内的指令过一遍即可获得flag
```
picoCTF{d3bugg3r_dr1v3_197c378a}
```