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
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219205640.png)
在这页有很多关键代码：
1. 导入了cookie.php，以及提到了会重定向到authentication.php页面
2. ==发现了产生cookie的逻辑==，这非常关键


在authentication.phps代码中，发现了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219205005.png)
分析代码后可以发现，赋给$log_file路径就可以读取服务器文件

在cookie.phps中发现了
