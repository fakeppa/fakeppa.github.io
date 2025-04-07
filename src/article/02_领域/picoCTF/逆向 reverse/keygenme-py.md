---
icon: pen-to-square
date: 2024-12-23
tags: 
title: keygenme-py
category:
  - 领域
---
29,953 users solved
Author: syreal

#### Description

[keygenme-trial.py](https://mercury.picoctf.net/static/a6d9cac3bfa4935ceb50c145d3ff5586/keygenme-trial.py)
# 00. 前言
本题用python编程，很抱歉的是，我的python功底很差，还有就是python环境还是不全，以后要补齐环境，并且有些函数仍然需要上互联网查询，也被这些无用代码干扰到了，所以这题也浪费了很长时间

----
# 01. 解题过程
## 1x01. 代码审计
分析代码入口点`ui_flow()`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223174546.png)
根据函数摸到了menu逻辑部分`menu_trial()`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223174631.png)

从menu的逻辑部分摸到了a,b,c,d具体的作用
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223174721.png)
`随后根据a,b,d调用的函数发现了a,b,d都是空壳，只有c程序有用`

这是c的代码
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223174854.png)
发现了输入密钥的逻辑，他会拿着我们的user_key去进行一个check_key的操作,并传入一个全局变量bUsername_trial
于是我们去看看`bUsername_trial`是什么东西
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223175251.png)
发现了字节码`b"PRITCHARD"`

好了，让我们进入`check_key`吧
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223175418.png)
这看起来有些复杂，让我们从头开始
首先他声明了一个全局变量`key_full_template_trial`
去找`key_full_template_trial`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223175634.png)
发现了`key_full_template_trial`由三部分组成，如上图

我们把它组合起来：`picoCTF{1n_7h3_|<3y_of_xxxxxxxx}`这看起来是flag格式
同时我们注意到了`key_part_static1_trial`这也是需要用到的内容。
别忘了传入的`bUsername_trial`=`b"PRITCHARD"`

## 1x02. 获得flag
我把check_key代码分成三部分


### 第一部分
  ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223175928.png)
  *检查key的长度是否和`key_full_template_trial`相等*
  
### 第二部分
  ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223180212.png)
  检查key的第一部分(`key_full_template_trial`被分成了三部分)是否与`key_full_template_trial`的第一部分，也就是`key_part_static1_trial`相等，于是，我们便获得了第一部分key：`picoCTF{1n_7h3_|<3y_of_
  
### 第三部分
  ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223180454.png)
这里的i是从上面传递下来的，也就是检查key第一部分之后的内容
可以看到它对`bUsername_trial`计算了SHA-256值，并将结果转化为16进制，然后分别取了4、5、3、6、2、7、1、8索引的位置
于是我们写这样一个简单的脚本提取这些位置的字符串

```python
import hashlib  
username_trial = b"PRITCHARD"  
n=hashlib.sha256(username_trial).hexdigest()  
s=username_trial.decode()  
print(n[4]+n[5]+n[3]+n[6]+n[2]+n[7]+n[1]+n[8])
```
`54ef6292`
然后将他添加到我们的key中，最后用}闭合：`picoCTF{1n_7h3_|<3y_of_54ef6292}`
## 1x03. 检查
它与key_full_template_trial的长度恰好相等
我们在程序里检查一下
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223181722.png)
完美，获得flag
```
picoCTF{1n_7h3_|<3y_of_54ef6292}
```
