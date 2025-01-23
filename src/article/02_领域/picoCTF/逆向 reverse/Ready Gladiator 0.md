---
icon: pen-to-square
date: 2025-01-11
tags: 
title: Ready Gladiator 0
category:
  - 领域
---
6,642 users solved
Author: LT 'syreal' Jones

#### Description

Can you make a CoreWars warrior that always loses, no ties?

Additional details will be available after launching your challenge instance.

----
# 00. 前言
本关是关于一个corewar的内容，corewar是一个游戏，玩家在内存中复制自己，并杀死敌方。

# 01. 解题过程
本关只是要求在corewar中杀死自己，这不难办到
 `nc saturn.picoctf.net 55684`
 提示输入我的战士
 ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250111230531.png)
让我们的战士死掉只需要输入除了mov 0,1以外的其他指令，比如mov 1,2
然后获得flag

```
picoCTF{h3r0_t0_z3r0_4m1r1gh7_7c030e56}
```


***参考链接***
- [图形化corewar项目](https://github.com/aramachandran7/corewars?tab=readme-ov-file)
