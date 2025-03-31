---
icon: pen-to-square
date: 2024-12-18
tags:
  - python
title: 0x01sys库
category:
  - 领域
---
# 0x01 sys
## 1. 获取命令行参数
### `sys.argv`
返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数
## 2. 查找模块路径
### `sys.path`
返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用import 模块名，来导入模块
## 3.查找和操作已导入的模块 
### `sys.modules`
返回一个字典，包含了已导入的模块，例如可以用sys.modules检查已导入的模块if...
## 4. 重定向标准输入输出流 
sys提供了三个特殊的对象：`sys.stdin`、`sys.stderr`、`sys.stderr`，分别表示标准输入、标准输出和标准错误 。
可以重定向这些流到其他**文件**或者**设备**上，从而改变输入来源和输出目标。
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png)


- 以“**写**“的方式将输出重定向到文档'output.txt'上，会覆盖原先的内容，没有则会创建新文档
	打印'This is a file'，会重定向标准输出流到文档，不会在命令行显示
	`sys.stdout.close()` 关闭了对 `output.txt` 文件的写入，确保所有数据都被正确写入并释放了文件资源。

- **当重定向操作结束后，需要退出重定向模式。**
```python
sys.stdout = sys.__stdout__
```


### 扩展知识：文件的读写

- 文件**对象**的创建并打开
  格式：`file = open(filename[,mode[,buffering]])`
  
- 文件的打开模式
![886e8f574b1711eac2c626a680538e9a.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2342sdf9a.png)
还有rb模式是读二进制文件

- 文件的关闭(**对文件进行读写操作后，关闭文件是一个很好的习惯**):
  ##### `fiel.close()`

- 文件的读取
   ##### `read(size)`
   返回一个从指定文件中读取指定数据。如果size不填写，则读取全部内容
  
- 文件的写入
  ##### `write(string)`
  接受一个字符串，从文件写入数据
	tips：write语句不会自动换行，如果需要换行，则要使用换行符'\n'
	按行对文件进行读写

- 按行对文件进行写入
  ##### `writelines(对象)`
  接受一个列表，可以输出到文件，但是仍然需要加换行符进行换行，本质是对列表中的文件进行遍历写入

- 按行对文件进行读取
  ##### 1. `readline()`方法
  该方法返回一个字符串，默认读取指针在第一行，用于读取文件指针当前位置读取一行文本，即遇到行结束符停止读取文本，但读取的内容包含了结束符。
  ```python
	  f = open("test.txt")  
	while True:  
	    line = f.readline()  
	    if line == '':  
	        break  
	    else:  
	        print(line,end="")  
	f.close()
	```
  ##### 2. `readlines()`方法
  该方法返回一个列表，读取当前指针以后得所有数据，并按照换行结束符分隔后，放到列表中返回。
  tips：指针默认在第一行，指针位置不会在不同函数调用之间继承

  



## 5. 退出程序
### `sys.exit()`
通过调用`sys.exit()`退出Python程序，可以提供一个整数作为参数，用于指定退出码。

## 6. 获取Python解释器的信息
sys模块还提供了一些函数和变量来获取Python解释器的信息，如版本号、平台和系统路径。

```python
import sys

# 打印Python版本号
print("Python版本号:", sys.version)

# 打印平台信息
print("平台信息:", sys.platform)

# 打印系统路径
print("系统路径:", sys.path)

```

## 7. 获取递归调用深度
### `sys.getrecursionlimit()`和`sys.setrecursionlimit()`

`get..`:返回当前的递归深度限制。
`set...`:设置当前的递归深度限制。

### 扩展知识：递归调用深度为何限制
*它直接关系到程序的内存使用和性能。每次递归调用都需要在调用栈上分配空间，如果递归调用深度过大，可能会导致栈溢出错误（stack overflow），这是一种运行时错误，发生在调用栈空间耗尽时。*

*参考链接：*
[Python的sys模块的作用和常用方法_python sys库作用-CSDN博客](https://blog.csdn.net/m0_64140139/article/details/136572607)

[Python--文件的基本操作_-CSDN博客](https://blog.csdn.net/I_r_o_n_M_a_n/article/details/115438288?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522307949e22ab817876da76510d54ea2eb%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=307949e22ab817876da76510d54ea2eb&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-115438288-null-null.142^v100^pc_search_result_base8&utm_term=close%28%29%E6%96%B9%E6%B3%95&spm=1018.2226.3001.4187)
