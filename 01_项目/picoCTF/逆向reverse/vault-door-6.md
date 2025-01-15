---
icon: pen-to-square
date: 2025-01-15
tags: 
title: vault-door-6
category:
  - 项目
---
4,815 users solved
#### Description

This vault uses an XOR encryption scheme. The source code for this vault is here: [VaultDoor6.java](https://jupiter.challenges.picoctf.org/static/86e94cc555b2ca7375424c884ef581a6/VaultDoor6.java)
#### Hints
If X ^ Y = Z, then Z ^ Y = X. Write a program that decrypts the flag based on this fact.

---
# 01. 解题过程
经过前几题的沉淀，我们直接来到检查部分
```java
public boolean checkPassword(String password) {
        if (password.length() != 32) {
            return false;
        }
        byte[] passBytes = password.getBytes();
        byte[] myBytes = {
            0x3b, 0x65, 0x21, 0xa , 0x38, 0x0 , 0x36, 0x1d,
            0xa , 0x3d, 0x61, 0x27, 0x11, 0x66, 0x27, 0xa ,
            0x21, 0x1d, 0x61, 0x3b, 0xa , 0x2d, 0x65, 0x27,
            0xa , 0x66, 0x36, 0x30, 0x67, 0x6c, 0x64, 0x6c,
        };
        for (int i=0; i<32; i++) {
            if (((passBytes[i] ^ 0x55) - myBytes[i]) != 0) {
                return false;
            }
        }
        return true;
    }
}
```
`^`：这个符号的意思是异或，而异或是可逆的运算，这减少了我们的工作量
