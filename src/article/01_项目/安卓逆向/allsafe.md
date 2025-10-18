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
## 不安全的日志
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
或者动态获取应用pid
```bash
for /f %i in ('adb shell pidof infosecadventures.allsafe') do adb logcat --pid=%i
```

## 密码硬编码
打开jadx，找到当前关卡的代码，定义了一个超长的SOAP体
```SOAP
public static final String BODY = "\n            <soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n            <soap:Header>\n                 <UsernameToken xmlns=\"http://siebel.com/webservices\">superadmin</UsernameToken>\n                 <PasswordText xmlns=\"http://siebel.com/webservices\">supersecurepassword</PasswordText>\n                 <SessionType xmlns=\"http://siebel.com/webservices\">None</SessionType>\n            </soap:Header>\n            <soap:Body>\n                 <!-- data goes here -->\n            </soap:Body>\n            </soap:Envelope>\n        ";
```
- xmlns:soap=\"`http://schemas.xmlsoap.org/soap/envelope/\SOAP`是SOAP协议声明
- 发现在`UsernameToken`和`PasswordText`中硬编码了密码和用户名




## 
