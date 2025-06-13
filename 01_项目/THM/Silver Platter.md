---
icon: pen-to-square
date: 2025-05-11
tags: 
title: Silver Platter
category:
  - 项目
---
nmap,dirsearch爆破之后没有成果，但是在CONCAT发现了Silverpeas关键字，这是一个
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613164849.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613165159.png)

我们尝试访问/silverpeas发现了其登录界面

```url
http://10.10.249.27:8080/silverpeas
```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613165515.png)

查阅资料，`SilverAdmin/SilverAdmin`是其默认凭据，但是登录失败

但是获得了这个silverpeas的版本发行时间，我们直接去搜索这个软件的CVE漏洞

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613171742.png)
发现可以在抓包时直接删掉password字段，从而登录系统
