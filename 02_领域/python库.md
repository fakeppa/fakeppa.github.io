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
1. sys.argv:返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数
2. sys.path:返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(变量名))来导入自定义模块(变量名指向的变量)的路径，随后直接用import 模块名，来导入模块
3. sys.modules:返回一个字典，包含了已导入的模块，例如可以用sys.modules检查已导入的模块if...
4. 