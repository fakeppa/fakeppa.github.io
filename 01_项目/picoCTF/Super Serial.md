---
icon: pen-to-square
date: 2024-12-19
tags: 
title: Super Serial
category:
  - 项目
---
# Super Serial
首先进入robots.txt的网页查看，发现admin.phps这样一段话
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219204250.png)
访问后发现不存在
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219204334.png)
但是将登录页index.php改为index.phps发现可以看到源代码(也就是所谓的“php script”,是一种嵌入html的php脚本)


在这页代码中可以发现很多关键的php代码，我们可以尝试进行查看
在cookie.phps代码中，发现了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219205005.png)
分析代码后可以发现，赋给$log_file路径就可以读取服务器文件

在authentication.phps发现了
