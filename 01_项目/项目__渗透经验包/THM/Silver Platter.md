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
发现可以在登录时抓包直接删掉password字段，从而登录系统

进入系统后再找找有没有可以利用的CVE
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613181143.png)
这个漏洞可以重复构造
http://localhost:8080/silverpeas/RSILVERMAIL/jsp/ReadMessage.jsp?ID=[messageID]
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613182001.png)

可以随意更改messageID访问不同人发送的信息
最后我们可以得到ssh连接用户名和密码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613182116.png)

直接用ssh连接
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613182203.png)
获得user.txt
```bash
tim@silver-platter:~$ id
uid=1001(tim) gid=1001(tim) groups=1001(tim),4(adm)
```
- ​**​`uid=1001(tim)`​**​
    - `uid`（用户ID）：`1001`，是系统分配给用户 `tim` 的唯一数字标识。
    - `(tim)`：用户名，与 `uid` 对应。
- ​**​`gid=1001(tim)`​**​
    - `gid`（主组ID）：`1001`，表示用户 `tim` 的默认组是同名的 `tim` 组。
- ​**​`groups=1001(tim),4(adm)`​**​
    - 用户 `tim` 所属的所有组（包括附加组）：
        - `1001(tim)`：主组。
        - `4(adm)`：附加组 `adm`（组ID为4），通常用于系统管理权限（如访问日志文件）。

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613183230.png)

发现疑似tyler的密码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613183638.png)

登录查看内容

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250613183816.png)
```bash
THM{098f6bcd4621d373cade4e832627b4f6}
```