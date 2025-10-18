---
icon: pen-to-square
date: 2024-12-19
tags: 
title: Super Serial
category:
  - 领域
---
# Super Serial
Author: madStacks
#### Description
Try to recover the flag stored on this website [http://mercury.picoctf.net:8404/](http://mercury.picoctf.net:8404/)
#### Hints
The flag is at ../flag

----
## 01. 代码审计
首先进入robots.txt的网页查看，发现admin.phps这样一段话
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219204250.png)
访问后发现不存在
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219204334.png)
但是将登录页index.php改为index.phps发现可以看到源代码(也就是所谓的“php script”,是一种嵌入html的php脚本)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219205640.png)
在这页有很多关键代码：
1. 导入了cookie.php，以及提到了会重定向到authentication.php页面
2. ==发现了产生cookie的逻辑==，这非常关键，当验证通过的时候会产生一个经过url和base64编码的序列化字符串cookie


在authentication.phps代码中，发现了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219205005.png)
分析代码后可以发现，赋给$log_file路径就可以读取服务器文件

在cookie.phps中发现了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219210714.png)
这会读取当前的cookie值
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219210507.png)
这串代码会反序列化cookie并在die()函数中进行打印，这时候便可以执行函数

回看authentication.phps
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219211019.png)
又发现了$perm变量的判断，所以authentication.php页面就是整个漏洞的入口

## 02. 构造cookie
我们已经了解了cookie的构造方法
```php
setcookie("login", urlencode(base64_encode(serialize($perm_res))), time() + (86400 * 30), "/");
```
进入php沙箱

构造一恶意序列化cookie，调用access_log类，并赋上flag路径../flag
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219211636.png)

用新的cookie值创建一个名为login的cookie，并赋值`TzoxMDoiYWNjZXNzX2xvZyI6MTp7czo4OiJsb2dfZmlsZSI7czo3OiIuLi9mbGFnIjt9`

设置cookie的适用范围，随后进入authentication.php页面进行刷新即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219211852.png)
这样就可以看到被外带打印出来的access_log类的对象
```
picoCTF{th15_vu1n_1s_5up3r_53r1ous_y4ll_66832978}
```