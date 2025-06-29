---
icon: pen-to-square
date: 2024-12-26
tags: 
title: vault-door-3
category:
  - 领域
---
9,751 users solved
#### Description

This vault uses for-loops and byte arrays. The source code for this vault is here: [VaultDoor3.java](https://jupiter.challenges.picoctf.org/static/a648ca6dd275b9454c5d0de6d0f6efd3/VaultDoor3.java)
#### Hints
Make a table that contains each value of the loop variables and the corresponding buffer index that it writes to.

----
# 01. 解题过程
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241226140358.png)
发现了关键的判断部分，发现一个排序逻辑
我这里想要用大脑排序，但是试了两次失败了，随后转用java排序，主要是就近，就不用python了

```java
public class asdasd {  
    public static void main(String[] args) {  
        char[] password=new char[32];  
        String buffer="jU5t_a_sna_3lpm18gb41_u_4_mfr340";  
        int i;  
        for (i = 0; i < 8; i++) {  
            password[i]=buffer.charAt(i);  
        }  
        for (; i < 16; i++) {  
            password[23-i]=buffer.charAt(i);  
        }  
        for (; i < 32; i += 2) {  
            password[46 - i]=buffer.charAt(i);  
        }  
        for (i = 31; i >= 17; i -= 2) {  
            password[i]=buffer.charAt(i);  
        }  
        System.out.println(password);  
    }  
}
```
获得flag