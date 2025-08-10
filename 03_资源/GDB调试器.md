---
icon: pen-to-square
date: 2025-01-03
tags:
  - TOOL
title: GDB调试器
category:
  - 资源
---
***GDB**是**Linux**下非常好用且强大的**调试工具**。GDB可以调试C、C++、Go、java、 objective-c、PHP等语言。* **GDB** 是由 GUN 软件系统社区提供的**调试工具**，同 GCC 配套组成了一套完整的开发环境，GDB 是 Linux 和许多 类Unix系统的标准开发环境。

# GDB调试代码----指令学习
括号内是指令全称
`l(list)`                            -----行号/函数名显示对应的code，每次十行
r(run)                                  ----F5 【无断点直接运行、右端点从第一个断点开始运行】
b(breakpoint) + 行号         ----在那一行打断点
b 源文件：函数名              ----在该函数的第一行打上断点
b 源文件：行号                  ----在该源文件中的这行加上一个断点
info b                                  ----查看断点信息
	breakpoint already hit 1 time【此断点被命中一次】
d(delete) + 当前要删除断点的编号        ----删除一个断点【不可以d+行号】
- 若当前没有跳出过gdb，则断点的编号会持续累加
d +breakpoints                   ----删除所有的断点
disable  b(breakpoints)       ----使所有的断点无效【默认缺省】
enable  b(breakpoints)       ----使所有断点有效【默认缺省】
disable  b(breakpoints)  +  编号                  ----使一个断点无效【禁用断点】
  - 相当于VS中的空断点
enable   b(breakpoint )   +  编号                 ----使一个断点有效【开启断点】
enable breakpoint   ----  是一个断点有效【开启断点】
n(next)                               ----逐过程【为了查找那个函数出错了】
s(step)                               ---- 逐语句
bt                                      ----看底层函数调用的过程【函数压栈】
set  var                              ----修改变量的值
p(print)  变量名                 ----打印变量值
display                               ----跟踪查看同一个变量，每次停下来都显示他的值【变量/结构体】
undisplay  +  变量名编号  ----取消对先前设置的那些变量的追踪
排查问题三剑客\
undisplay   +   行号           ----进行指定位置跳转，执行完区间代码
finish                                  ----在一个函数内部，执行当前函数返回，然后停下来等待命令
c(continue)                         ----从一个断点处，直接运行至下一个断点处


# 参考链接
[【Linux】GDB保姆级调试指南（什么是GDB？GDB如何使用？）_gdb教程-CSDN博客](https://blog.csdn.net/weixin_45031801/article/details/134399664?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522ed9619238481455b323ade1e13941f03%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=ed9619238481455b323ade1e13941f03&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-134399664-null-null.142^v100^pc_search_result_base3&utm_term=GDB&spm=1018.2226.3001.4187)