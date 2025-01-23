---
icon: pen-to-square
date: 2025-01-12
tags: 
title: Bit-O-Asm-2
category:
  - 领域
---
6,086 users solved
#### Description

Can you figure out what is in the `eax` register? Put your answer in the picoCTF flag format: `picoCTF{n}` where `n` is the contents of the `eax` register in the decimal number base. If the answer was `0x11` your flag would be `picoCTF{17}`.Download the assembly dump [here](https://artifacts.picoctf.net/c/510/disassembler-dump0_b.txt).
#### Hints
`PTR`'s or 'pointers', reference a location in memory where values can be stored.

---
# 01. 解题过程
```Bash
<+0>:     endbr64 
<+4>:     push   rbp
<+5>:     mov    rbp,rsp
<+8>:     mov    DWORD PTR [rbp-0x14],edi
<+11>:    mov    QWORD PTR [rbp-0x20],rsi
<+15>:    mov    DWORD PTR [rbp-0x4],0x9fe1a
<+22>:    mov    eax,DWORD PTR [rbp-0x4]
<+25>:    pop    rbp
<+26>:    ret

```
简单的一段x86架构汇编代码
`eax,DWORD PTR [rbp-0x4]`在这里可以看到rbp-0x4地址的内容使我们想要的，
`[rbp-0x4],0x9fe1a`,这段代码吧0x9fe1a移动到了rbp-0x4的位置，我们可以知道，这就是flag
dec：`654874`
获得flag
```
picoCTF{654874}
```