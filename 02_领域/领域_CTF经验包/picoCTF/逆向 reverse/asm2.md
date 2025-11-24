---
icon: pen-to-square
date: 2025-02-27
tags: 
title: asm2
category:
  - 领域
---
#### Description

What does asm2(0x4,0x21) return? Submit the flag as a hexadecimal value (starting with '0x'). NOTE: Your submission for this question will NOT be in the normal flag format. [Source](https://jupiter.challenges.picoctf.org/static/7e3eb2f90200ac88126f62ceb4bc3948/test.S)

#### Hints 
assembly [conditions](https://www.tutorialspoint.com/assembly_programming/assembly_conditions.htm)

---
# 01. 解题过程
需要注意的是在python中，hex()函数转换之后为字符串形式，真是搞笑
简单的逻辑
```asm
asm2:
	<+0>:	push   ebp
	<+1>:	mov    ebp,esp
	<+3>:	sub    esp,0x10
	<+6>:	mov    eax,DWORD PTR [ebp+0xc]
	<+9>:	mov    DWORD PTR [ebp-0x4],eax  ;0x4 :0x4
	<+12>:	mov    eax,DWORD PTR [ebp+0x8]  ;eax:0x21
	<+15>:	mov    DWORD PTR [ebp-0x8],eax  ；0x8：0x21
	<+18>:	jmp    0x509 <asm2+28>  
	<+20>:	add    DWORD PTR [ebp-0x4],0x1 ;0x4 +0x1
	<+24>:	add    DWORD PTR [ebp-0x8],0x74 ;0x21+0x74
	<+28>:	cmp    DWORD PTR [ebp-0x8],0xfb46
	<+35>:	jle    0x501 <asm2+20>
	<+37>:	mov    eax,DWORD PTR [ebp-0x4]
	<+40>:	leave  
	<+41>:	ret    


```
用python写一下逻辑,题目给了两个参数，但不知道这两个参数的地址，所以互换的都试一下
```python
# 输入并转换为整数  
a = int(input('请输入a: '), 16)  # 假设用户输入的是十六进制字符串  
b = int(input('请输入b: '), 16)  # 同样假设用户输入的是十六进制字符串  
  
# 循环条件  
while b < 0xfb46:  
    a += 1  # 十六进制的加法等同于十进制的加法  
    b += 0x74  
  
# 输出结果  
print(hex(a))  # 将结果转换为十六进制字符串并输出
```
得到结果
```
0x24c
```