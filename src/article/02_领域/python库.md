---
icon: pen-to-square
date: 2024-12-15
tags:
  - 目标
title: python库
---
# 写出你想学的库：
1. sys
# 0x01 sys
## 1. 获取命令行参数sys.argv
返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数
## 2. 查找模块路径sys.path
返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用import 模块名，来导入模块
## 3. sys.modules
返回一个字典，包含了已导入的模块，例如可以用sys.modules检查已导入的模块if...
## 4. 重定向标准输入输出流 
sys提供了三个特殊的对象：`sys.stdin`、`sys.stderr`、`sys.stderr`，分别表示标准输入、标准输出和标准错误 。
可以重定向这些流到其他**文件**或者**设备**上，从而改变输入来源和输出目标。
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png)
以“**写**“的方式将输出重定向到文档'output.txt'上，会覆盖原先的内容，没有则会创建新文档
打印'This is a file'，会重定向标准输出流到文档，不会在命令行显示
`sys.stdout.close()` 关闭了对 `output.txt` 文件的写入，确保所有数据都被正确写入并释放了文件资源。
扩展知识：
- 文件对象的创建并打开：`file = open(filename[,mode[,buffering]])`
- 文件的打开模式
![886e8f574b1711eac2c626a680538e9a.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2342sdf9a.png)

- 文件的关闭(**对文件进行读写操作后，关闭文件是一个很好的习惯**):fiel.close()
- 文件的读取：read(size):从指定文件中读取指定数据。如果size不填写，则读取全部内容
- 文件的写入：write(string)：从文件写入数据
	tips：write语句不会自动换行，如果需要换行，则要使用换行符'\n'
按行对文件进行读写
- 按行对文件进行写入：writelines()
