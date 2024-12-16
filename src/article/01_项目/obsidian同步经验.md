---
icon: pen-to-square
date: 2024-12-16
tags: 
title: obsidian同步经验
---
1. 首先设置用户名和邮箱```
```
git config --global user.name 用户名
git config --global user.email 邮箱
```
2. 用https克隆仓库笔记
```
git clone https 链接
```
3. 合并分支，防止报错
```
git pull 刚才复制的地址 master --allow-unrelated-histories
```
4. 设置obsidian git，让它可以进行https同步，并设置(密码/token)和账户即可