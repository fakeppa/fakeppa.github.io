---
icon: pen-to-square
date: 2024-12-20
tags: 
title: Most Cookies
category:
  - 项目
---
# Most cookies
Author: madStacks
#### Description
Alright, enough of using my own encryption. Flask session cookies should be plenty secure! [server.py](https://mercury.picoctf.net/static/c135543530f7dc24c3a6ecaeb44a81b8/server.py) [http://mercury.picoctf.net:65344/](http://mercury.picoctf.net:65344/)

#### Hints 
How secure is a flask cookie?

----
# 前言
## Flask
flask是Python编写的轻量级web应用框架
### Flask会话管理机制
flask框架下的cookie是这样的结构
```
eyJ2ZXJ5X2F1dGgiOiJibGFuayJ9.Z2Uskg.uziKYJ0zcZE4j4toa_S8dqE_auA
```
但是不重要，base64解码后可以看到我们的信息
```
{"very_auth":"blank"}ge,3&	S7x6qZj`
```
通过查资料发现
flask框架加密cookie用的是签名机制而非加密机制
这意味着，我们可以查看cookie的序列化内容，只是不能随意更改，因为在服务端
在flask框架中进行签名
通过研究，flask在服务端设置签名密钥是这个逻辑：
需要设置一个secret_key，用于加密和解密cookie的会话数据
示例：
```
from flask import Flask

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 设置密钥
```
现在我们有思路了，我们只需要从python源代码获取secret，然后自己构造cookie就可以进行越权操作


# 代码审计
首先对server.py文件进行代码审计，主要是secret_key的定义部分
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241220173823.png)
发现了逻辑是从这些明文里进行随机选择作为密钥
