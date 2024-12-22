---
icon: pen-to-square
date: 2024-12-15
tags:
  - 这下不得不学了吧
  - 投机取巧
  - 现在立刻停止重新造轮子
title: JAVA学习笔记
category:
  - 项目
---
Math.abs():取绝对值
.equals():比较两个字符串是否相等
str.substring(0, 3):提取前3个字符串
逻辑运算符：
![495280310e08f893cd1fb31b1e56658c.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/c9312309123.png)
这个的异或逻辑是错误的，都是0或者1的话，会返回True

setter方法快捷键：
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/IHASDwdwd6.png)
学eclipse就是学快捷键：（靠北啦，只是应付考试而已了）
# 快捷键
## 一、常用快捷键

### 1、代码注释快捷键

1）Ctrl + / ：注释或取消当前行。

2）Ctrl + Shift + / ：注释多行。

3）Ctrl + Shift + \ ：取消多行注释。

4）Alt+Shift+J(方法注释) ：

在方法上按Alt+Shift+J可以添加Javadoc 注释 ，或者不用快捷键，先敲“/”在敲两个**，然后回车也可以。

### 2、代码格式化快捷键

Ctrl + Shift + F ：书写格式规范的代码是每一个程序员的必修之课，当看见某段代码极不顺眼时，选定后按此快捷键可以格式化这段代码，如果不选定代码则默认格式化当前文件。

### 3、代码自动提示快捷键

Alt + /

### 4、快速修正快捷键

Ctrl + 1

### 5、编辑快捷键

1）Ctrl + D ：删除当前行。

2）Ctrl + Alt + ↓ 和 Ctrl + Alt + ↑ ：

复制当前行 ，Ctrl+Alt+↓复制当前行到下一行，Ctrl+Alt+↑复制当前行到上一行。需要说明的是，这个快捷键在Ubuntu下与工作区切换冲突，建议改为Ctrl+↑。

3）Ctrl + M ：窗口最大化和还原，用户在窗口中进行操作时，总会觉得当前窗口小，这时可以使用这个快捷键。

4）Ctrl + Shift + S ：

全局保存，用来检查XML错误和提供资源。Eclipse在编写XML文档时不能实时检查语法错误，如果编写了Resource、Layout方面的信息不保存的话Eclipse也不会智能提示。

5）Alt + ↑ 和 Alt + ↓ ：

上下两行交换位置。可以将上下两行的位置对调，也可以是选中的几行与上下一行对调，与上一行对调的快捷键是Alt+↑，与下一行对调的快捷键是Alt+↓。

6）Ctrl + Shift + M ：(先把光标放在需导入包的类名上) 作用是加[Import语句](https://so.csdn.net/so/search?q=Import%E8%AF%AD%E5%8F%A5&spm=1001.2101.3001.7020)。

### 6、查看和定位快捷键

1）Ctrl + K 和 Ctrl + Shift + K ：

快速向下和向上查找选定的内容，从此不再需要用鼠标单击查找对话框了。

2）Ctrl + Shift + T ：

查找工作空间（Workspace）构建路径中的可找到Java类文件，不要为找不到类而痛苦，而且可以使用“*”、“？”等通配符。

3）Ctrl + Shift + R ：

查找工作空间（Workspace）中的所有文件（包括Java文件），也可以使用通配符。

4）Ctrl + G ：查找当前元素的声明

5）Ctrl + Shift + G ：

查找类、方法和属性的引用。这是一个非常实用的快捷键，例如要修改引用某个方法的代码，可以通过此快捷键迅速定位所有引用此方法的位置。

6）Ctrl + Shift + O ：

快速生成import，当从网上拷贝一段程序后，不知道如何import进所调用的类，试试【Ctrl+Shift+O】快捷键。也可以移除未使用的import引用。当我们之前添加的import，现在没有用到就会出现一些感叹号，使用快捷键可以移除所有未使用的。

7）ALT + Shift + W ：

查找当前文件所在项目中的路径，可以快速定位浏览器视图的位置，如果想查找某个文件所在的包时，此快捷键非常有用（特别在比较大的项目中）。

8）Ctrl + L ：定位到当前编辑器的某一行，对非Java文件也有效。

9）Alt + ←和 Alt + → ：

后退历史记录和前进历史记录，在跟踪代码时非常有用，用户可能查找了几个有关联的地方，但可能记不清楚了，可以通过这两个快捷键定位查找的顺序。

10）F3 : 快速定位光标位置的某个类、方法和属性。

11）F4 ：显示[类的继承](https://so.csdn.net/so/search?q=%E7%B1%BB%E7%9A%84%E7%BB%A7%E6%89%BF&spm=1001.2101.3001.7020)关系，并打开类继承视图。

12）Ctrl + H ：查找 ，可以在整个工程查找或者查找替换

### 7、调试快捷键

1）Ctrl + Shift + B ：在当前行设置断点或取消设置的断点。

2）F11 ：调试最后一次执行的程序。

3）Ctrl + F11 ：运行最后一次执行的程序。

4）F5 ：单步跟踪到方法中。

5）Ctrl + F5 ：单步跳入选择。

6）Shift + F5 ：使用过滤器单步执行。

7）F6 ：单步执行程序。

8）F7 ：执行完方法，返回到调用此方法的后一条语句。

9）F8 ：继续执行，到下一个断点或程序结束。

## 二、常用设置

### 1、设置Workspace中文件编码

在eclipse中，默认的Text file encoding是GBK（操作系统是中文简体）；如果操作系统是中文繁体，默认是MS950（Big5）

项目中大多使用的是UTF-8

通过在eclipse中对workspace修改编码格式，如下：

Window -> Preferences -> General -> Workspace -> Text file encoding -> Other , 修改成 UTF-8

### 2、代码自动提示

Window -> Preferences -> Java -> Editor -> Content Assist -> Auto Activation

默认设置是输入“.” 后，才会出现提示。想要输入什么都提示，可以修改这里的第二项“Auto Activation Triggers for Java”,

把"."修改为"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"， 这样就会 输入每个字母都提示。

同样的方法，可以修改Javascript和HTML页面的代码提示：

Window -> Preferences -> JavaScript-> Editor -> Content Assist -> Auto-Activation

Window -> Preferences -> Web -> HTML Files -> Editor -> Content Assist -> Auto Activation

### 3、设置JSP文件编码

Window -> Preferences -> Web -> JSP Files -> Encoding (一般是设置为UTF-8)

### 4、如何在Eclipse中调整package的上下顺序

设置： 右键项目 -> Build Path -> Configure Build Path -> 右侧，Order and Export -> Up or Down。