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
### flask会话管理机制
在flask框架中中，首先需要设置一个secret_key，用于加密和解密cookie的会话数据
示例：
```
from flask import Flask

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 设置密钥
```



# 代码审计
首先对server.py文件进行代码审计
