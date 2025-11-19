---
icon: pen-to-square
date: 2024-12-23
tags: 
title: vault-door-1
category:
  - 领域
---
30,353 users solved
Author: Mark E. Haase
#### Description
This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is here: [VaultDoor1.java](https://jupiter.challenges.picoctf.org/static/29b91e638ccbd76aaa8c0462d1c64d8d/VaultDoor1.java)

#### Hints
Look up the charAt() method online.

----
# 解题过程
很简单的逻辑
`VaultDoor1`是一个验证用户输入的flag是否正确的方法,会将picoCTF`{`后以及`}`以前的部分传入`checkPassword`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223145952.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223150256.png)

flag明文在`checkPassword`中，直接人脑读取即可
```flag
picoCTF{d35cr4mbl3_tH3_cH4r4cT3r5_ff63b0}
```
