---
icon: pen-to-square
date: 2024-12-21
tags: 
title: JS代码混淆
category:
  - 资源
---
*包含了几种JS代码混淆技术*
# 1. 十六进制字符串编码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221140010.png)
*很好理解*

# 2. 死代码注入
这句话
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221140138.png)
用了github上的DfendJS包
变成了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221140202.png)

# 3. Mangling(代码撕裂)
依旧是hello world
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221140457.png)
把每一个部分进行拆分，用新的变量代替，最后再组合起来

# 4. 代码缩小
从代码包删除所有空格、空行、缩进、注释的技术

# 5.[js fuck](http://www.jsfuck.com)
将js代码转换为类似于Brainfuck编程语言深奥风格的方法
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221140947.png)
