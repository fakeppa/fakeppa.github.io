---
icon: pen-to-square
date: 2025-03-10
tags: 
title: PHP手册
category:
  - 资源
---
在 PHP 中，超全局变量（Superglobals）是一类特殊的预定义变量，它们在脚本的任何地方都可以访问，而无需通过全局作用域声明（如 `global`）。这些变量以数组的形式存在，通常用于存储与请求、会话、服务器信息等相关的数据。

以下是 PHP 中的超全局变量及其用途：

### 1. **`$GLOBALS`**
- **用途**：包含脚本中所有全局变量的数组，键是变量名，值是变量的值。
- **示例**：
  ```php
  $a = 10;
  echo $GLOBALS['a']; // 输出 10
  ```

### 2. **`$_SERVER`**
- **用途**：包含服务器环境变量和运行环境信息。
- **常见用途**：
  - 获取服务器的协议（`$_SERVER['SERVER_PROTOCOL']`）
  - 获取当前脚本的完整路径（`$_SERVER['PHP_SELF']`）
  - 获取客户端的 IP 地址（`$_SERVER['REMOTE_ADDR']`）
  - 获取 HTTP 请求方法（`$_SERVER['REQUEST_METHOD']`）
- **示例**：
  ```php
  echo $_SERVER['REMOTE_ADDR']; // 输出客户端 IP 地址
  ```

### 3. **`$_GET`**
- **用途**：用于接收通过 URL 参数传递的数据（GET 方法）。
- **示例**：
  ```php
  // URL: http://example.com/?name=Kimi&age=25
  echo $_GET['name']; // 输出 Kimi
  echo $_GET['age'];  // 输出 25
  ```

### 4. **`$_POST`**
- **用途**：用于接收通过表单提交的数据（POST 方法）。
- **示例**：
  ```php
  // 表单提交后
  echo $_POST['username']; // 输出表单中 name="username" 的值
  ```

### 5. **`$_FILES`**
- **用途**：用于接收通过表单上传的文件信息。
- **结构**：
  - `$_FILES['file_name']['name']`：上传文件的原始文件名。
  - `$_FILES['file_name']['type']`：上传文件的 MIME 类型。
  - `$_FILES['file_name']['size']`：上传文件的大小（字节）。
  - `$_FILES['file_name']['tmp_name']`：上传文件存储的临时路径。
  - `$_FILES['file_name']['error']`：上传文件时的错误代码。
- **示例**：
  ```php
  echo $_FILES['upload_file']['name']; // 输出上传文件的原始文件名
  ```

### 6. **`$_COOKIE`**
- **用途**：用于存储和访问通过 HTTP Cookies 发送的数据。
- **示例**：
  ```php
  setcookie('user', 'Kimi', time() + 3600); // 设置一个 Cookie
  echo $_COOKIE['user']; // 输出 Kimi
  ```

### 7. **`$_SESSION`**
- **用途**：用于存储和访问会话数据。会话数据在用户访问网站期间保持持久化。
- **示例**：
  ```php
  session_start();
  $_SESSION['user'] = 'Kimi';
  echo $_SESSION['user']; // 输出 Kimi
  ```

### 8. **`$_REQUEST`**
- **用途**：是一个组合数组，包含通过 `$_GET`、`$_POST` 和 `$_COOKIE` 发送的数据（默认顺序为 GPC）。  
- **注意**：由于它包含多种来源的数据，使用时需要谨慎，避免安全问题。
- **示例**：
  ```php
  echo $_REQUEST['name']; // 可能来自 GET 或 POST
  ```

### 9. **`$_ENV`**
- **用途**：包含服务器的环境变量。
- **示例**：
  ```php
  echo $_ENV['PATH']; // 输出环境变量 PATH 的值
  ```

---

### 总结
这些超全局变量在 PHP 开发中非常常用，它们提供了方便的方式来访问请求数据、服务器信息、会话数据等。然而，使用这些变量时需要注意安全性，尤其是 `$_GET`、`$_POST` 和 `$_REQUEST`，因为它们直接接收用户输入的数据，容易成为安全漏洞的来源。