---
icon: pen-to-square
date: 2024-12-27
tags: 
title: ARMssembly 0
category:
  - 项目
---
9,593 users solved
#### Description

What integer does this program print with arguments `266134863` and `1592237099`? File: [chall.S](https://mercury.picoctf.net/static/104d6022bcea93f53083aeb61b134e8b/chall.S) Flag format: picoCTF{XXXXXXXX} -> (hex, lowercase, no 0x, and 32 bits. ex. 5614267 would be picoCTF{0055aabb})
#### Hints
Simple compare

----
# 00. 前言
没有汇编基础，现学现卖吧

# 01. 解题过程
从头看起
```
	.arch armv8-a
	.file	"chall.c"
	.text
	.align	2
	.global	func1
	.type	func1, %function
```
- .arch : armv8-a：指定了目标架构为ARMv8-A，是一个ARM架构的64位版本
- .file "chall.c":这是一个伪指令，用于告诉汇编器这个汇编代码是从哪个C文件转换过来的，通常用于调试信息
- .text：指示接下来的代码是程序的文本段，也就是可执行代码
- .align 2 ：对齐指令，确保func1函数的地址在内存中是2的倍数，这有助于提高代码的执行效率
对齐数据：在cpu位数高于内存位数的时候
- .global func1声明了这是一个全局标号，意味着这个标号在其他源文件中被引用
- .type	func1, %function:声明了func1是一个函数

```
func1:
	sub	sp, sp, #16
	str	w0, [sp, 12]
	str	w1, [sp, 8]
	ldr	w1, [sp, 12]
	ldr	w0, [sp, 8]
	cmp	w1, w0
	bls	.L2
	ldr	w0, [sp, 12]
	b	.L3
```
- sub	sp, sp, #16:减少了栈指针sp的值，为局部变量或函数调用的参数和返回地址分配空间。这里分配了16字节的空间计算寄存器：sp减去16，存入结果向sp寄存器
- 