---
icon: pen-to-square
date: 2024-12-18
tags: 
title: RSA加密算法
category:
  - 归档
---
# 加密过程
1. 选出两个质数 `p=3;q=11`
2. 质数相乘： `N=p*q=3*11=33`
3. 欧拉函数： `T=(p-1)*(q-1)=2*10=20`
4. 选公钥E（条件）：质数;1<公钥<T;不是T的因子 E=(3,33)
5. 计算私钥`(D*E)%T=1 D=(7,33)`

##### ***这玩意不和数学一样吗，过段时间再搞***



