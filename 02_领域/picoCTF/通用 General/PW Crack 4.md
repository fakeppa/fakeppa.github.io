---
icon: pen-to-square
date: 2024-12-30
tags: 
title: PW Crack 4
category:
  - 领域
---
32,673 users solved
#### Description

Can you crack the password to get the flag?Download the password checker [here](https://artifacts.picoctf.net/c/21/level4.py) and you'll need the encrypted [flag](https://artifacts.picoctf.net/c/21/level4.flag.txt.enc) and the [hash](https://artifacts.picoctf.net/c/21/level4.hash.bin) in the same directory too.There are 100 potential passwords with only 1 being correct. You can find these by examining the password checker script.
#### Hints
1. A for loop can help you do many things very quickly.
2. The `str_xor` function does not need to be reverse engineered for this challenge.
---
# 解题过程
这题很有意思
在每次运行程序时会进行输入提示
稍加改动，会自动进行输入

注释这行![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241230211656.png)
然后在最后添加这些内容
```python
for i in pos_pw_list:  
    level_4_pw_check(i)
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241230211753.png)

```
picoCTF{fl45h_5pr1ng1ng_d770d48c}
```
太有趣了