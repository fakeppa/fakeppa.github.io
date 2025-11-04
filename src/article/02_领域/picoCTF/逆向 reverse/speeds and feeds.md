---
icon: pen-to-square
date: 2024-12-24
tags: 
title: speeds and feeds
category:
  - 领域
---
17,154 users solved
Author: Ryan Ramseyer

#### Description

There is something on my shop network running at `nc mercury.picoctf.net 7032`, but I can't tell what it is. Can you?

#### Hints
What language does a CNC machine use?

----
# 解题过程
这题真的有意思
我们查看题目给的nc的时候发现了这一坨
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152242.png)
通过提示可以知道这个是CNC数控机床
顺着CNC这个关键词查，发现了这个编程语言叫做G-code，粗浅了解了什么是G语言的
- G语言就是控制器械到从一个位置到另一个位置的简单的语言
找一个可以运行G-code的网站，把这些代码粘到里面试试
[NC Viewer // GCode Viewer and Machine Simulator](https://ncviewer.com/)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152613.png)

哈，出来了，真是有趣.
