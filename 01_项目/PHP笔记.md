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

### 4x03.
终止程序执行
```php
die();
```
- 这是一个 PHP 函数，用于终止当前脚本的执行。调用 `die()` 后，脚本将停止运行，后续的代码将不会被执行。这个函数通常用于在发生错误或满足特定条件时，立即停止程序的执行。

### 4x04.
引入文件,这个引入了名为cookie.php的外部文件
```php
require_once("cookie.php");
```

### 4x05. 
用于启动一个新的会话或恢复一个已存在的会话。会话管理是Web开发中用于跟踪用户状态的一种机制，它允许在多个页面请求之间保持用户数据。
```php
session_start()
```

### 4x06. 反序列化函数
==使用 `urldecode()` 解码 cookie 值，然后使用 `base64_decode()` 解码，再使用 `unserialize()` 反序列化，恢复 `permissions` 对象。==
```
$g = $perm->is_guest();
		$a = $perm->is_admin();
	}
```

### 4x07. 序列化和反序列化
曾提到过`unserialize()`和`serialize()`函数，在这里讲一讲序列化和反序列化

#### 07p1序列化
- PHP 会将对象的类名和所有公共、保护和私有属性的名称和值转换为字符串。
- 例如，假设 `$perm_res` 对象的 `username` 属性为 "user1"，`password` 属性为 "pass123"。序列化后的字符串可能看起来像这样：
```php
O:10:"permissions":2:{s:8:"username";s:6:"user1";s:8:"password";s:8:"pass123";}
```
- 这里的 `O:10:"permissions"` 表示这是一个名为 `permissions` 的对象，`2` 表示有两个属性。接下来的部分描述了每个属性的名称和对应的值。

#### 07p2反序列化
在 PHP 中，`unserialize()` 函数用于将一个序列化的字符串转换回原来的 PHP 值，包括对象、数组等。具体来说，当您调用 `unserialize($serialized_string)` 时，函数会执行以下操作：

1. **解析字符串**: `unserialize()` 会解析传入的序列化字符串，识别其中的类名、属性和它们的值。
    
2. **创建对象**: 如果序列化字符串表示的是一个对象，`unserialize()` 会根据字符串中的类名创建一个该类的实例。
    
3. **恢复属性**: 函数会将序列化字符串中存储的属性值恢复到新创建的对象中。

- ##### 返回值
  - **返回对象**: 如果序列化字符串有效且表示一个对象，`unserialize()` 将返回该对象的实例。
  - **返回数组**: 如果序列化字符串表示一个数组，`unserialize()` 将返回该数组。
  - **返回 `false`**: 如果序列化字符串无效或无法解析，`unserialize()` 将返回 `false`。这通常发生在字符串格式不正确或类未定义的情况下。

# 5. 闲话多序
#### PHP与html联合实现逻辑

1. **用户请求**：用户在浏览器中输入 URL，向 Web 服务器发送请求。
2. **Web 服务器接收请求**：Web 服务器（如 Apache、Nginx 等）接收到请求后，识别请求的文件类型。
3. **PHP 解析**：如果请求的文件是 PHP 文件，Web 服务器会将该文件传递给 PHP 解析器。PHP 解析器会执行文件中的 PHP 代码。
4. **执行逻辑**：在 PHP 代码中，处理用户输入、进行数据库查询、设置 cookie、生成消息等逻辑。
5. **生成 HTML**：PHP 代码执行完毕后，生成最终的 HTML 内容。此时，所有的 PHP 代码已经被处理，用户只会看到生成的 HTML。
6. **返回响应**：Web 服务器将生成的 HTML 内容返回给用户的浏览器。
7. **浏览器渲染**：用户的浏览器接收到 HTML 内容后，进行渲染，显示给用户。