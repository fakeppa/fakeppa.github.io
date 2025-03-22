---
icon: pen-to-square
date: 2025-01-13
tags: 
title: asm1
category:
  - 领域
---
6,024 users solved
#### Description

What does asm1(0x2e0) return? Submit the flag as a hexadecimal value (starting with '0x'). NOTE: Your submission for this question will NOT be in the normal flag format. [Source](https://jupiter.challenges.picoctf.org/static/f1c2358ff7d1e9386e41552c549cf2f6/test.S)
#### Hints
assembly [conditions](https://www.tutorialspoint.com/assembly_programming/assembly_conditions.htm)

---
# 00. 前言
这题考察了汇编语言中的分支结构，有关内容在本博客的汇编/汇编手册中介绍。
另外，本题在picoCTF中十分特殊，答案不是以picoCTF{}为闭合的，而是直接把十六进制码打出来，包括0x这个前缀

# 01. 解题过程
```bash
asm1:
	<+0>:	push   ebp     
	<+1>:	mov    ebp,esp
	<+3>:	cmp    DWORD PTR [ebp+0x8],0x3fb    
	<+10>:	jg     0x512 <asm1+37>
	<+12>:	cmp    DWORD PTR [ebp+0x8],0x280
	<+19>:	jne    0x50a <asm1+29>
	<+21>:	mov    eax,DWORD PTR [ebp+0x8]   
	<+24>:	add    eax,0xa      ;eax:0x2ea
	<+27>:	jmp    0x529 <asm1+60>
	<+29>:	mov    eax,DWORD PTR [ebp+0x8]
	<+32>:	sub    eax,0xa    
	<+35>:	jmp    0x529 <asm1+60>
	<+37>:	cmp    DWORD PTR [ebp+0x8],0x559
	<+44>:	jne    0x523 <asm1+54>
	<+46>:	mov    eax,DWORD PTR [ebp+0x8]
	<+49>:	sub    eax,0xa
	<+52>:	jmp    0x529 <asm1+60>
	<+54>:	mov    eax,DWORD PTR [ebp+0x8]
	<+57>:	add    eax,0xa
	<+60>:	pop    ebp
	<+61>:	ret    
```
本题传入参数为0x2e0
- 为什么呢？
  在x86架构中，调用者会将参数push到栈中，`call` 指令会将返回地址压入栈中，然后跳转到指定的标签或地址处执行

然后开始分析
`DWORD PTR [ebp+0x8],0x3fb`：参数小于0x3fb
不执行`jg`
`cmp    DWORD PTR [ebp+0x8],0x280`：参数大于0x280
执行`jne    0x50a <asm1+29>`
`<+29>:	mov    eax,DWORD PTR [ebp+0x8]`：把0x2e0赋给eax
`<+32>:	sub    eax,0xa`:0x2e0-0xa=0x2d6
然后跳转到60，那么eax内容就是0x2d6

flag:
```
0x2d6
```