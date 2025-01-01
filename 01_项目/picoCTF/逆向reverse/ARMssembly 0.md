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
静态分析，从头看起
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
- `str	w0, [sp, 12]`：将w0寄存器的内容加载到栈指针偏移12的内存地址中
- `ldr	w1, [sp, 12]`：将栈指针偏移12的内容加载到w1这个寄存器中

```
.L3:
	add	sp, sp, 16
	ret
	.size	func1, .-func1
	.section	.rodata
	.align	3
```
*这是func1的结束代码段*
- add	sp, sp, 16:对sp栈指针进行相加16，释放栈空间
- ret：指示函数的返回，ret是一个伪指令
- .size	func1, .-func1：告诉连接器，这个函数func1的大小
  
  什么是连接器？
  汇编程序通常由多个源文件组成，每个文件编译后生成一个目标文件。链接器将这些目标文件合并，处理符号解析和地址重定位，最终生成可执行文件。
  具体过程：
  1. 符号解析，有些文件定义的函数或变量，连接器负责解析这些符号的引用
  2. 重定位，文件在编译时可能会使用相对地址，连接器将这些地址转换为最终可执行文件中的绝对地址
  3. 合并目标文件，将多个目标文件合并成一个可执行文件或者库
  4. 生成可执行文件，连接器负责生成最终的可执行文件格式：如elf、pe等文件，确保符合操作系统的要求，可以被执行

- .section  .rodata:指示以后的代码和数据放入.rodata段，用于存储程序中的只读数据
- .align	3:之前分析过了

```
.LC0:
	.string	"Result: %ld\n"
	.text
	.align	2
	.global	main
	.type	main, %function
```
- .string	"Result: %ld\n":定义了一个字符串常量。.string是GUN汇编器(GAS)的伪指令，用于在只读数据段(.rodata)中创建了一个字符串常量。这里的字符串时“Result: %ld\n ”,它通常用于格式化输出一个长整型(%1d)数值，并在末尾添加一个换行符。
  ***什么是汇编器，汇编器都有哪些***
  - **汇编器**（Assembler）是将汇编语言代码转换为机器语言代码的工具。
  - **NASM (Netwide Assembler)**、**MASM (Microsoft Macro Assembler)**、**GAS (GNU Assembler)**、**FASM (Flat Assembler)**、**TASM (Turbo Assembler)**、**LLVM Assembler**。

- 注意.text之后的内容为代码段

```
main:
	stp	x29, x30, [sp, -48]!
	add	x29, sp, 0
	str	x19, [sp, 16]
	str	w0, [x29, 44]
	str	x1, [x29, 32]
	ldr	x0, [x29, 32]
	add	x0, x0, 8
	ldr	x0, [x0]
	bl	atoi
	mov	w19, w0
	ldr	x0, [x29, 32]
	add	x0, x0, 16
	ldr	x0, [x0]
	bl	atoi
	mov	w1, w0
	mov	w0, w19
	bl	func1
	mov	w1, w0
	adrp	x0, .LC0
	add	x0, x0, :lo12:.LC0
	bl	printf
	mov	w0, 0
	ldr	x19, [sp, 16]
	ldp	x29, x30, [sp], 48
	ret
	.size	main, .-main
	.ident	"GCC: (Ubuntu/Linaro 7.5.0-3ubuntu1~18.04) 7.5.0"
	.section	.note.GNU-stack,"",@progbits
```
- main: ：这是程序的入口点
- `stp x29, x30, [sp, -48]!` ：将当前的帧指针x29和返回地址x30保存到栈中，更新栈指针sp，！表示在存储后更新sp的值
  stp：是指令操作码，表示存储一对寄存器到内存，在这里接受了x29和x30和`[sp,-48]`三个参数，表示把x29和x30的值压入栈内，栈空间为sp当前指针减去48的内存位置
  `[]`:表示这是一个内存地址操作
- `add x29, sp, 0`：将当前栈指针赋给x29作为帧指针
- `str x19, [sp, 16]`：将寄存器x19的值存储到栈中偏移量为16的位置
- `str w0, [x29, 44]`:将w0值存储到帧指针偏移+44的位置
- `str x1, [x29, 32]`：将x1的值存储到帧指针偏移+32的位置


- `ldr x0, [x29, 32]`：将存储在帧指针偏移32的位置的值存储到x0寄存器，根据上文可知这里存储着x1的值
- `add x0, x0, 8`：将x0寄存器的值加八，存入x0，也就是之前的x1的值应该是一个内存地址，在这里偏移8
- `ldr x0, [x0]`：将存储在x0所指向的内存位置的值赋给x0寄存器，也就是将存储在x1偏移8位置的内存的值赋给x0
- `bl atoi`：调用atoi函数，这个C标准库中的函数会将字段穿转为整数，而传入atoi函数的参数被提前存放在默认的寄存器x0处
- `mov w19，w0`：将w0寄存器的值存储在w19中，这里存储了atoi函数的返回值
这段代码从栈中读取一个内存地址，增加8，然后读取改地址的值并调用atoi函数将其转换为整数，最后奖结果存储在w19中

- `ldr x0, [x29, 32]`：将存储在帧指针偏移32的内容存储在x0，还是之前x1的值，是一个地址
- `add x0, x0, 16` ：将x0的值偏移16，赋给x0，也就是x1的值偏移16
- `ldr x0, [x0]`:将存储在x0地址的内容赋给x0，也就是存储在x1的值偏移16地址的内容赋给x0
- `bl atoi`：调用atoi函数
- `mov w1, w0`：将上文函数的返回值存储到w1
这段代码从栈中读取另一个值，增加16，调用atoi函数，并将结果存储在w1中

- `mov w0, w19`：将w19的值存储在w0中，也就是首次调用atoi的返回值存储在w0
- `b1 func1`：调用，之前定义过得func1函数。
- `mov w1, w0`：将w0的值赋给w1，也就是将func1的返回值覆盖之前第二次调用atoi时的返回值
这段代码将w19的值移动到w0中，然后调用func1函数，最后将返回值存储在w1中

- `adrp x0, .LC0`：`.LC0`所在的地址的页面基址加载到x0寄存器中，但是这个虚拟地址是不准确的，还需要结合下一个伪指令告诉编译器.LC0的具体位置
- `add x0, x0, :lo12:.LC0`：这是一个伪指令，
  在arm架构的64位cpu中虚拟地址到物理地址的转换是通过页表完成的，页表会将物理内存映射到虚拟内存，类似于8086cpu中的虚拟内存到物理内存的转换，16位段地址和偏移地址合成20位的物理地址
- 