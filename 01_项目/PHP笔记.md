---
icon: pen-to-square
date: 2024-12-19
tags: 
title: PHP笔记
category:
  - 项目
---
# 写在前面
通过web题学习PHP，只是为了培养PHP代码审计的能力罢了，《项目驱动》，可以这么说吧

# POST
超级全局数组，返回一个数组，用于接收通过 HTTP POST 方法提交的数据。以`$_POST`的形式检索或引用其中的数据
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

# 对象
用`$con = new SQLite3("../users.db");`类似于这样的形式创建一个SQLite3的对象

- 调用对象的方法
  `$con->query(...)`：调用$con的query方法,(...)内填写参数，例如这个可以填写sql语句