---
icon: pen-to-square
date: 2024-12-16
tags: 
title: obsidian同步经验
category:
  - 资源
---
1. 首先设置用户名和邮箱
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
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/asodk12312341.png)
### enough
刚开始不知道ssh不能再安卓端使用，于是按照之前的教程重走一遍，但是报错，最后发现手机端git插件居然提供了https连接所需要的设置，恍然大悟
两个小时的研究成果。。。
### 参考链接

[用git使obsidian多端笔记互联/同步保存笔记（基于gitee）_obsidian git-CSDN博客](https://blog.csdn.net/m0_56544579/article/details/143241452?ops_request_misc=&request_id=&biz_id=102&utm_term=obsidian%20git&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-143241452.nonecase&spm=1018.2226.3001.4187)