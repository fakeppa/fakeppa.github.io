---
icon: pen-to-square
date: 2025-02-28
tags: 
title: 在check_MDhead项目中的经验
category:
  - 领域
---
check_MDhead是一个检查.md元数据是否正确的工具，当然，这只是个简单的实现
# 00. 实现思路
在python中写出代码，然后用pyinstaller进行exe打包
1. 输入需要检查的category项
2. 读取category分类文件夹下的每个文件，包括子文件夹文件
3. 检查文件头
4. 输出检测结果，正确或错误

# 01. 遇到的困难/经验
##  经验
使用`readline()`意外将读取指针下调，这时使用
`line = str(file.readline())`,然后再调用line变量，就可以隔离readline()的作用
## 困难
1. 正则匹配汉字出现了困难，没有解决
2. `for root, dirs, files in os.walk(...)`的作用还需要研究

# 02. 待改进的部分
