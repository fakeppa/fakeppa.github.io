---
icon: pen-to-square
date: 2024-12-19
tags: 
title: PHP笔记
category:
  - 项目
---
# 1. 写在前面
**通过web题学习PHP，只是为了培养PHP代码审计的能力罢了，《项目驱动》，可以这么说吧**

# 2. 注释符
`//`

# 3. POST
**超级全局数组，返回一个数组，用于接收通过 HTTP POST 方法提交的数据。以`$_POST`的形式检索或引用其中的数据**
- 例如
```
Array
(
    [user] => 用户输入的用户名
    [pass] => 用户输入的密码
)
```

- 在表单的前端通常是以这种形式对接php代码的，在form标签的属性中展示
  `<form method="post" action="submit.php"> 内容 </form>`
  
- 在html中通常以`<input type="text" id="user" name="user">`中的name来定义POST中键的内容

- 常用这样的形式进行判断`if (isset($_POST["user"]) && isset($_POST["pass"]))`可以判断user和pass键是否为空
  
- 用`$username = $_POST["user"];`的方式提取POST内容
  - `$_POST[" 键 "]`:来检索键的内容,并赋值给username

# 3. 对象
**用`$con = new SQLite3("../users.db");`类似于这样的形式创建一个SQLite3的对象**

- 调用对象的方法
  `$con->query(...)`：调用$con的query方法,(...)内填写参数，例如这个可以填写sql语句

# 4. 函数

### 4x01. 
一个简单的建立cookie的PHP代码

```php
setcookie("login", urlencode(base64_encode(serialize($perm_res))), time() + (86400 * 30), "/");
```

-  **`setcookie(...)`**：这是 PHP 的一个内置函数，用于设置 HTTP cookie。
  1. **`time() + (86400 * 30)`**：这是`setcookie(...)`的一个参数，用于设置 cookie 的过期时间。`time()` 函数返回当前的 Unix 时间戳（自 1970 年 1 月 1 日以来的秒数）。`86400` 是一天的秒数（24小时 × 60分钟 × 60秒），因此 `86400 * 30` 表示 30 天的秒数。将当前时间戳加上 30 天的秒数，得到 cookie 的过期时间。
  2. **`"/"`**：这是`setcookie(...)`的一个参数,用于设置cookie 的路径，表示该 cookie 在整个网站上都有效。
  
- **`"login"`**：这是 cookie 的名称。在这里，cookie 被命名为 `login`。
  
- **`urlencode(...)`**：这是一个函数，用于对字符串进行 URL 编码，以确保在 URL 中安全传输。它会对特殊字符进行编码。
  
- **`base64_encode(...)`**：这是一个函数，用于将数据进行 Base64 编码。Base64 编码可以将二进制数据转换为 ASCII 字符串，通常用于在 URL 或 cookie 中传输数据。
  
- ==**`serialize($perm_res)`**：这是一个函数，用于将对象或数组转换为字符串格式，以便存储。这里将 `$perm_res` 对象序列化为字符串。==

### 4x02.
实现页面重定向的 PHP 代码行，常用于控制用户流向特定页面，确保用户在访问敏感资源之前进行身份验证。
```php
header("Location: authentication.php");
```
- **`header(...)`**：这是 PHP 的一个内置函数，用于发送原始 HTTP 头部信息。它必须在任何输出（如 HTML 或空格）之前调用，因为 HTTP 头部必须在响应体之前发送。
  
- **`"Location: authentication.php"`**：这是传递给 `header` 函数的字符串参数。它指定了一个 HTTP 头部，表示客户端（通常是浏览器）应该重定向到的 URL。
  
  1. **`Location:`**：这是一个 HTTP 头部字段，指示浏览器应该重定向到另一个页面。

  2. - **`authentication.php`**：这是目标页面的相对路径或 URL。在这个例子中，用户将被重定向到名为 `authentication.php` 的页面。