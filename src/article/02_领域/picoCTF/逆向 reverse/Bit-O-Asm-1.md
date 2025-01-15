---
icon: pen-to-square
date: 2025-01-02
tags: 
title: Bit-O-Asm-1
category:
  - 领域
---
7,056 users solved
#### Description

Can you figure out what is in the `eax` register? Put your answer in the picoCTF flag format: `picoCTF{n}` where `n` is the contents of the `eax` register in the decimal number base. If the answer was `0x11` your flag would be `picoCTF{17}`.Download the assembly dump [here](https://artifacts.picoctf.net/c/509/disassembler-dump0_a.txt).
#### Hints
As with most assembly, there is a lot of noise in the instruction dump. Find the one line that pertains to this question and don't second guess yourself!

----
# 前言
有一个新的mov指令没见过，这是一个x86架构的mov，这个提示给了我们一个分析汇编代码的思路，也就是抛弃所谓的混淆代码，捞干的。

# 解题过程
```
<+0>:     endbr64 
<+4>:     push   rbp
<+5>:     mov    rbp,rsp
<+8>:     mov    DWORD PTR [rbp-0x4],edi
<+11>:    mov    QWORD PTR [rbp-0x10],rsi
<+15>:    mov    eax,0x30
<+20>:    pop    rbp
<+21>:    ret
```
直接看`<+8>:     mov    DWORD PTR [rbp-0x4],edi` :
DWORD:代表两个字节
PTR:代表指向
制定一个二字节的数据类型
下一行的QWORD是四字节的数据类型
制定一个四字节的数据类型
这是将内存上的数据直接用mov指令传送到寄存器上，而arm不可以这样直接做，需要str或ldr等指令
最后eax寄存器的值为0x30也就是十进制的48
所以flag：
```
picoCTF{48}
```