---
icon: pen-to-square
date: 2025-06-13
tags: 
title: 内网方法论
category:
  - 项目
---
先
```bash
cat /etc/passwd |grep sh$
```
查看具体有哪些用户

然后id
```bash
id
```

查看当前用户的组策略
```bash
/home$ id
uid=1001(tim) gid=1001(tim) groups=1001(tim),4(adm)
```

查看arp路由
```bash
 arp-scan -l
```
