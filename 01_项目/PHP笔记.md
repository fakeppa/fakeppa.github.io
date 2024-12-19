---
icon: pen-to-square
date: 2024-12-19
tags: 
title: PHP笔记
category:
  - 项目
---
# 写在前面
通过web题学习PHP，《项目驱动》，可以这么说吧

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
  
- 在html中通常以`<input type="text" id="user" name="user">`中的name来定义POST中键的内容，input

- 常用这样的形式进行判断`if (isset($_POST["user"]) && isset($_POST["pass"]))`可以判断user和pass键是否为空