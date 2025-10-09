---
aliases:
cssclasses:
tags:
icon: pen-to-square
date: 2025-10-09
title: allsafe
category:
  - 项目
---
首先运行靶场应用或者用以下命令启动程序
```bash
adb shell am start -n infosecadventures.allsafe/.MainActivity

>Starting: Intent { cmp=infosecadventures.allsafe/.MainActivity }
```
首先查找应用pid
```bash
adb shell pidof infosecadventures.allsafe

>21612
```
然后利用`logcat`过滤应用日志
```bash
adb logcat --pid=

日志。。。
```
不安全的日志记录复现成功
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20251009184511.png)
