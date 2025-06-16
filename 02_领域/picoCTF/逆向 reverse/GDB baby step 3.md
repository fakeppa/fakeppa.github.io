---
icon: pen-to-square
date: 2025-01-17
tags: 
title: GDB baby step 3
category:
  - 领域
---
3,953 users solved
#### Description

Now for something a little different. `0x2262c96b` is loaded into memory in the `main` function. Examine byte-wise the memory that the constant is loaded in by using the GDB command `x/4xb addr`. The flag is the four bytes as they are stored in memory. If you find the bytes `0x11 0x22 0x33 0x44` in the memory location, your flag would be: `picoCTF{0x11223344}`.
#### Hints
- You'll need to breakpoint the instruction after the memory load.
- Use the gdb command `x/4xb addr` with the memory location as the address `addr` to examine. [GDB manual page](https://ftp.gnu.org/old-gnu/Manuals/gdb/html_node/gdb_55.html).
- Any registers in `addr` should be prepended with `$` like `$rbp`.
- Don't use square brackets for `addr`
- What is [endianness](https://en.wikipedia.org/wiki/Endianness)?

----
# 00. 前言
这题有一个简单的知识，字节序，在x86架构中，数据的低字存放在低地址，高字存放在高地址
数字：123456，字节序：56 34 12.
# 01. 解题过程
关键
```
        00401115 c7  45  fc       MOV        dword ptr [RBP  + local_c ],0x2262c96b
                 6b  c9  62 
                 22

```
`6b c9 62 22`就是答案，
另外`c7`为mov 
`45 fc`为寄存器与偏移量（二进制补码形式）

flag
```
picoCTF{0x6bc96222}
```