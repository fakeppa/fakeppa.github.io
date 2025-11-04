---
icon: pen-to-square
date: 2025-01-13
tags: 
title: Bit-O-Asm-3
category:
  - 领域
---
5,406 users solved
#### Description

Can you figure out what is in the `eax` register? Put your answer in the picoCTF flag format: `picoCTF{n}` where `n` is the contents of the `eax` register in the decimal number base. If the answer was `0x11` your flag would be `picoCTF{17}`.Download the assembly dump [here](https://artifacts.picoctf.net/c/530/disassembler-dump0_c.txt).
#### Hints
Not everything in this disassembly listing is optimal.

---
# 01. 解题过程
好简单的汇编。。。eax的变化写在注释里了
```Bash
<+0>:     endbr64

<+4>:     push   rbp

<+5>:     mov    rbp,rsp

<+8>:     mov    DWORD PTR [rbp-0x14],edi

<+11>:    mov    QWORD PTR [rbp-0x20],rsi

<+15>:    mov    DWORD PTR [rbp-0xc],0x9fe1a

<+22>:    mov    DWORD PTR [rbp-0x8],0x4

<+29>:    mov    eax,DWORD PTR [rbp-0xc] ;0x9fe1a

<+32>:    imul   eax,DWORD PTR [rbp-0x8] ;0x27F868

<+36>:    add    eax,0x1f5               ;0x27FA5D

<+41>:    mov    DWORD PTR [rbp-0x4],eax

<+44>:    mov    eax,DWORD PTR [rbp-0x4]

<+47>:    pop    rbp

<+48>:    ret
```
flag
```
picoCTF{2619997}
```