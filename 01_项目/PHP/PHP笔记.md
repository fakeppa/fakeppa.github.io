---
icon: pen-to-square
date: 2024-12-19
tags: 
title: PHP笔记
category:
  - 项目
---
# 00. 前言
**通过web题学习PHP，只是为了培养PHP代码审计的能力罢了，可以这么说吧**

# 01. 注释符
`//`

# 02. POST
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

# 03. 对象
### 3x01
**用`$con = new SQLite3("../users.db");`类似于这样的形式创建一个SQLite3的对象**
- 创建对象的函数
```
$con->query(...)`：调用$con的query方法,(...)内填写参数，例如这个可以填写sql语句
```
- 也可以用这种方式创建
```
$config = new Config([
    "site_name" => "My Website",
    "debug_mode" => true,
]);
```
### 3x02
**构造方法**
`__construct(参数)`，在没有时会默认添加
例如
```
public function __construct() { $this->username = "default_user"; // 设置默认用户名 $this->email = "default@example.com"; // 设置默认邮箱 }
```
# 04. 函数

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

#### x7p1. 序列化
- PHP 会将对象的类名和所有公共、保护和私有属性的名称和值转换为字符串。
- 例如，假设 `$perm_res` 对象的 `username` 属性为 "user1"，`password` 属性为 "pass123"。序列化后的字符串可能看起来像这样：
```php
O:10:"permissions":2:{s:8:"username";s:6:"user1";s:8:"password";s:8:"pass123";}
```
O:4:"perm":2:{s:8:"username";s:18:"admin" or "1"="1--";s:8:"password";s:1:"1";}
1. **O:10:"permissions"**:
    - `O` 表示这是一个对象（Object）。
    - `10` 是对象类名的长度（即 "permissions" 的长度为 10）。
    - `"permissions"` 是对象的类名。

2. **:2:**:
    - `2` 表示这个对象有两个属性。

3. **{...}**:
    - 大括号 `{}` 包含了对象的属性及其值。

4. **s:8:"username";**:
    - `s` 表示这是一个字符串（string）。
    - `8` 是字符串的长度（即 "username" 的长度为 8）。
    - `"username"` 是属性的名称。

5. **s:6:"user1";**:
    - `s` 表示这是一个字符串。
    - `6` 是字符串的长度（即 "user1" 的长度为 6）。
    - `"user1"` 是属性的值。

6. **s:8:"password";**:
    - `s` 表示这是一个字符串。
    - `8` 是字符串的长度（即 "password" 的长度为 8）。
    - `"password"` 是属性的名称。

1. **s:8:"pass123";**:
    - `s` 表示这是一个字符串。
    - `8` 是字符串的长度（即 "pass123" 的长度为 8）。
    - `"pass123"` 是属性的值。

#### x7p2. 反序列化
在 PHP 中，`unserialize()` 函数用于将一个序列化的字符串转换回原来的 PHP 值，包括对象、数组等。具体来说，当您调用 `unserialize($serialized_string)` 时，函数会执行以下操作：

1. **解析字符串**: `unserialize()` 会解析传入的序列化字符串，识别其中的类名、属性和它们的值。
    
2. **创建对象**: 如果序列化字符串表示的是一个对象，`unserialize()` 会根据字符串中的类名创建一个该类的实例。
    
3. **恢复属性**: 函数会将序列化字符串中存储的属性值恢复到新创建的对象中。

- ##### 返回值
  - **返回对象**: 如果序列化字符串有效且表示一个对象，`unserialize()` 将返回该对象的实例。
  - **返回数组**: 如果序列化字符串表示一个数组，`unserialize()` 将返回该数组。
  - **返回 `false`**: 如果序列化字符串无效或无法解析，`unserialize()` 将返回 `false`。这通常发生在字符串格式不正确或类未定义的情况下。
### 4x08. 读取文件
返回一个字符串，用于读取指定文件的内容并将其作为字符串返回
```
file_get_contents(文件路径)
```


# 05. 闲话多序
#### PHP与html联合实现逻辑

1. **用户请求**：用户在浏览器中输入 URL，向 Web 服务器发送请求。
2. **Web 服务器接收请求**：Web 服务器（如 Apache、Nginx 等）接收到请求后，识别请求的文件类型。
3. **PHP 解析**：如果请求的文件是 PHP 文件，Web 服务器会将该文件传递给 PHP 解析器。PHP 解析器会执行文件中的 PHP 代码。
4. **执行逻辑**：在 PHP 代码中，处理用户输入、进行数据库查询、设置 cookie、生成消息等逻辑。
5. **生成 HTML**：PHP 代码执行完毕后，生成最终的 HTML 内容。此时，所有的 PHP 代码已经被处理，用户只会看到生成的 HTML。
6. **返回响应**：Web 服务器将生成的 HTML 内容返回给用户的浏览器。
7. **浏览器渲染**：用户的浏览器接收到 HTML 内容后，进行渲染，显示给用户。

## 5x01接受数据并处理的流程和一些全局变量应用
在服务器后端的数据处理中，代码解释器（或运行时环境）需要根据请求的特定信息来决定执行哪一段代码。这种决策通常是基于 **URL 路径**、**请求方法**（如 GET、POST）以及其他请求参数（如查询字符串、表单数据等）。以下是一个典型的流程，解释服务器如何根据请求信息执行特定代码。

---

### x1p1. **请求到达服务器**
当用户在浏览器中输入一个 URL 或提交一个表单时，HTTP 请求会被发送到服务器。请求中包含以下关键信息：
- **URL**：请求的路径（如 `/index.php`、`/user/profile`）。
- **请求方法**：GET、POST、PUT、DELETE 等。
- **请求参数**：如查询字符串（`?id=123`）、表单数据（通过 POST 提交）。
- **其他信息**：如 HTTP 头部（`Content-Type`、`Referer` 等）。

---

### x1p2. **服务器解析请求**
服务器（如 Apache、Nginx）接收到请求后，会根据配置将请求转发到相应的处理程序（如 PHP、Python、Node.js 等）。例如：
- 如果服务器配置为使用 PHP 处理 `.php` 文件，那么请求 `/index.php` 时，Apache 或 Nginx 会将请求转发到 PHP 解释器。
- 如果是动态路由（如使用框架），服务器会根据 URL 路径和请求方法进一步解析。

---

### x1p3. **代码解释器决定执行逻辑**
代码解释器（如 PHP、Python 等）会根据请求信息来决定执行哪一段代码。以下是几种常见的机制：

#### **(1) 文件路径映射**
最简单的方式是根据 URL 路径直接映射到文件系统中的代码文件。例如：
- 请求 `/index.php` 时，服务器会加载并执行 `/var/www/html/index.php` 文件。
- 请求 `/user/profile.php` 时，服务器会加载 `/var/www/html/user/profile.php` 文件。

这种方式的优点是简单直接，缺点是扩展性差，不适合复杂的项目。

#### **(2) 动态路由（使用框架）**
现代 Web 项目通常使用框架（如 Laravel、Django、Express.js 等），通过动态路由来决定执行逻辑。框架会根据 URL 路径、请求方法等信息来匹配路由规则，并调用相应的控制器或处理函数。例如：

```php
// Laravel 路由示例
Route::get('/home', 'HomeController@index');
Route::post('/user/login', 'UserController@login');
```

当请求 `/home` 时，框架会调用 `HomeController` 类的 `index` 方法；当请求 `/user/login` 时，框架会调用 `UserController` 类的 `login` 方法。

#### **(3) 基于请求方法**
有些服务器端代码会根据请求方法（GET、POST 等）来决定执行逻辑。例如：

```php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // 处理 GET 请求
    showPage();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 处理 POST 请求
    processForm();
}
```

#### **(4) 基于请求参数**
服务器端代码还可以根据请求参数来决定执行逻辑。例如：

```php
if (isset($_GET['id'])) {
    // 根据 ID 查询数据
    $id = $_GET['id'];
    showItem($id);
} else {
    // 显示所有数据
    showAllItems();
}
```

---

### x1p4. **执行代码并返回响应**
根据上述逻辑，代码解释器会执行相应的代码，并生成响应内容（如 HTML 页面、JSON 数据等）。然后，服务器将响应内容返回给客户端（浏览器或 API 调用者）。

---

### x1p5. **示例：一个简单的 PHP 项目**
假设服务器上有以下文件结构：
```
/var/www/html/
├── index.php
├── user/
│   ├── profile.php
│   └── login.php
└── api/
    └── data.php
```

#### **(1) 请求 `/index.php`**
- 服务器加载 `/var/www/html/index.php` 文件。
- 执行其中的代码，生成 HTML 页面并返回给客户端。

#### **(2) 请求 `/user/login.php`**
- 服务器加载 `/var/www/html/user/login.php` 文件。
- 执行其中的代码，处理用户登录逻辑。

#### **(3) 请求 `/api/data.php?id=123`**
- 服务器加载 `/var/www/html/api/data.php` 文件。
- 执行其中的代码，根据 `$_GET['id']` 查询数据并返回 JSON。

---

### x1p6. **总结：代码解释器的执行逻辑**
代码解释器（如 PHP、Python 等）根据以下信息来决定执行特定代码：
- **URL 路径**：决定加载哪个文件或调用哪个路由。
- **请求方法**：决定执行 GET、POST、PUT 等逻辑。
- **请求参数**：决定具体的操作，如查询数据库、处理表单等。
- **服务器配置**：如 `.htaccess` 文件、Nginx 配置等，决定如何转发请求。

通过这些机制，服务器能够根据不同的请求执行相应的代码，从而实现复杂的后端逻辑。