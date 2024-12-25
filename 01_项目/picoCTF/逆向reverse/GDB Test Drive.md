---
icon: pen-to-square
date: 2024-12-25
tags: 
title: GDB Test Drive
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
