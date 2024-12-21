---
icon: pen-to-square
date: 2024-12-10
category:
  - 项目
tags:
  - 只学了一点
title: JavaScript笔记
---
找时间重启这个项目

## 先插一嘴
js的异步函数：

## JavaScript 显示数据

JavaScript 可以通过不同的方式来输出数据：

- 使用 **window.alert()** 弹出警告框。
- 使用 **document.write()** 方法将内容写到 HTML 文档中。
- 使用 **innerHTML** 写入到 HTML 元素。
- 使用 **console.log()** 写入到浏览器的控制台。

## JavaScript 变量

在编程语言中，变量用于存储数据值。

JavaScript 使用关键字 **var** 来定义变量， 使用等号来为变量赋值：

```js
<script>
var length;
length = 6;
document.getElementById("demo").innerHTML = length;
</script>
```

JavaScript语言有多种类型的运算符：

| 类型          | 实例        | 描述            |
| ----------- | :-------- | :------------ |
| 赋值，算术和位运算符  | = + - * / | 在 JS 运算符中描述   |
| 条件，比较及逻辑运算符 | == != < > | 在 JS 比较运算符中描述 |

## JavaScript 关键字

| **abstract** | **else**       | **instanceof** | **super**        |
| ------------ | -------------- | -------------- | ---------------- |
|              |                |                |                  |
| **boolean**  | **enum**       | **int**        | **switch**       |
|              |                |                |                  |
| **break**    | **export**     | **interface**  | **synchronized** |
|              |                |                |                  |
| **byte**     | **extends**    | **let**        | **this**         |
|              |                |                |                  |
| **case**     | **false**      | **long**       | **throw**        |
|              |                |                |                  |
| **catch**    | **final**      | **native**     | **throws**       |
|              |                |                |                  |
| **char**     | **finally**    | **new**        | **transient**    |
|              |                |                |                  |
| **class**    | **float**      | **null**       | **true**         |
|              |                |                |                  |
| **const**    | **for**        | **package**    | **try**          |
|              |                |                |                  |
| **continue** | **function**   | **private**    | **typeof**       |
|              |                |                |                  |
| **debugger** | **goto**       | **protected**  | **var**          |
|              |                |                |                  |
| **default**  | **if**         | **public**     | **void**         |
|              |                |                |                  |
| **delete**   | **implements** | **return**     | **volatile**     |
|              |                |                |                  |
| **do**       | **import**     | **short**      | **while**        |
|              |                |                |                  |
| **double**   | **in**         | **static**     | **with**         |

## JavaScript 数据类型

JavaScript 有多种数据类型：数字，字符串，数组，对象等等：

var length = 16;                  // Number 通过数字字面量赋值
var points = x * 10;               // Number 通过表达式字面量赋值
var lastName = "Johnson";             // String 通过字符串字面量赋值
var cars = ["Saab", "Volvo", "BMW"];       // Array 通过数组字面量赋值
var person = {firstName:"John", lastName:"Doe"}; // Object 通过对象字面量赋值