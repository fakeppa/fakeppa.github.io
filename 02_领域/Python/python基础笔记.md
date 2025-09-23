---
icon: pen-to-square
date: 2024-12-10
category:
  - 领域
tags: 
title: python笔记
---

## 字典
### 创建字典

```python
# 方法1：直接定义
my_dict = {"name": "Alice", "age": 30, "city": "New York"}

# 方法2：使用 dict() 构造函数
my_dict = dict(name="Bob", age=25, city="London")  # 键自动转为字符串，无需引号

# 方法3：通过键值对列表转换
my_dict = dict([("name", "Charlie"), ("age", 28), ("city", "Paris")])

# 方法4：字典推导式（动态生成）
squares = {x: x**2 for x in range(1, 6)}  # {1:1, 2:4, 3:9, 4:16, 5:25}
```

### 二、索引与访问元素
```python
# 1. 通过键访问值
print(my_dict["name"])  # 输出: Alice

# 2. 使用 get() 方法（避免 KeyError）
print(my_dict.get("age"))       # 输出: 30
print(my_dict.get("country"))   # 输出: None（键不存在）
print(my_dict.get("country", "默认值"))  # 输出: 默认值
```

### 三、添加/修改元素


```python
# 1. 直接赋值（添加或修改）
my_dict["email"] = "alice@example.com"  # 新增键值对
my_dict["age"] = 31                     # 修改已有键的值

# 2. 合并字典（update()）
new_data = {"country": "USA", "job": "Engineer"}
my_dict.update(new_data)  # 将 new_data 的键值对合并到 my_dict
```

### 四、删除元素

```python
# 1. 删除指定键值对
del my_dict["city"]         # 直接删除，若键不存在会报错
value = my_dict.pop("job")  # 删除并返回键对应的值

# 2. 清空字典
my_dict.clear()  # 清空所有键值对，得到空字典 {}

# 3. 删除整个字典
del my_dict      # 删除字典对象，后续访问会报错
```

### 五、遍历字典

```python
# 遍历所有键
for key in my_dict:
    print(key, my_dict[key])

# 遍历所有键（等效写法）
for key in my_dict.keys():
    print(key)

# 遍历所有值
for value in my_dict.values():
    print(value)

# 遍历所有键值对
for key, value in my_dict.items():
    print(f"{key}: {value}")
```



# 字节串
在python中字节串以`b""`闭合，以`\x ASCII码`形式存储，在遍历时会遍历每一个`\x`块，那么这样的话就可以避免unicode存储时看见迷惑的字符，可以更加直观地处理数据
# 大小写转换
###### **1. 使用 `str.lower()` 或 `str.upper()`**

将字符串转换为小写或大写，然后进行比较。这是最常见的方法。

# zip():
- `zip()` 函数将两个可迭代对象 `x` 和 `y` 组合成一个迭代器，返回一个元组的列表，其中每个元组包含来自 `x` 和 `y` 的对应元素。
	- for i,j in zip(x,y)
 join() 方法是 Python 中字符串对象的一个方法，用于将可迭代对象（如列表、元组等）中的元素连接成一个字符串。这个方法非常灵活，可以使用任何字符串作为分隔符。

### 语法

```python
str.join(iterable)
```

- **`str`**: 这是用作分隔符的字符串。
- **`iterable`**: 这是一个可迭代对象，通常是一个列表或元组，包含要连接的字符串元素。

# strip()

- **功能**：`strip()` 方法用于去除字符串开头和结尾的空白字符或指定字符。

- 语法

  ：

  ```
  str.strip([chars])
  ```

  - `chars`：可选参数，指定要去除的字符集合。如果不提供，默认去除空白字符（如空格、制表符、换行符等）

print() 输出函数      print(value,.......,sep=' ',end='\n',file=None)

                                                             结束符                                               

# lstrip()

- **功能**：`lstrip()` 方法用于去除字符串左侧（开头）的空白字符或指定字符。

- 语法

  ：

  ```
  str.lstrip([chars])
  ```

  - `chars`：可选参数，指定要去除的字符集合。如果不提供，默认去除空白字符（如空格、制表符、换行符等）。

#### 示例

```python
text = "   Hello, World!   "
result = text.lstrip()
print(result)  # 输出: "Hello, World!   "

text_with_chars = "xxxyHello, World!xxxy"
result_with_chars = text_with_chars.lstrip('xy')
print(result_with_chars)  # 输出: "Hello, World!xxxy"
```

# rstrip()

- **功能**：`rstrip()` 方法用于去除字符串右侧（结尾）的空白字符或指定字符。

- 语法

  ：

  ```
  str.rstrip([chars])
  ```

  - `chars`：可选参数，指定要去除的字符集合。如果不提供，默认去除空白字符。

#### 示例

```python
text = "   Hello, World!   "
result = text.rstrip()
print(result)  # 输出: "   Hello, World!"

text_with_chars = "xxxyHello, World!xxxy"
result_with_chars = text_with_chars.rstrip('xy')
print(result_with_chars)  # 输出: "xxxyHello, World!"
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

id（）序列的内存地址
input() 输入函数
' '  内的数据为字符串

range()函数    产生（n,m） 的整数序列
if 选择结构     可以与取反not结合
   else，选择，可在同一行使用   True(语句块1)     if(条件)        False(语句块2)
   elif       多分支结构      True则在执行语句块后结束，False则继续判断下一个条件
   and    连接多个条件判断时，都满足才执行if后面的语句块
   or       只要有一个正确，则执行if语句块

for变量in...    遍历结构   后续步进语句块对每一次遍历进行操作   遍历函数   
       后接else函数，可在正常循环结束后执行语句块

while   无限循环结构 包括四个部分：1.初始化变量  
                                                     2.条件判断
                                                     3.语句块
                                                     4.改变变量

break   跳出循环结构，与if搭配使用
continue 跳过本次循环的后续代码，从而执行下一次循环操作
pass 只占位，不报错，可用在if for while，函数的定义，类的定义中

----------------------------------序列-----------------------------------------------------
序列是一个存储多个值的连续空间
       属于组合数据类型/列表的还有 1.列表
                              2.元组    以上有序
                              3.集合
                              4.字典    以上无序

序列和索引
in   判断函数    print(序列1,in,序列2)    序列2里是否含有序列1    有为True，无则False
not in  与上述判断布尔值相反
len(x)函数    序列x的长度（即序列的长度）
max（s）  序列s中的最大值
min（s）序列s中元素最小值
s.index(x)  序列s中第一次出现元素x的位置
s.count(x)   序列s中出现x的次数

序列的切片操作
1.序列名[起始位置:结束位置:步长]

列表
1.内置的可变序列
2.列表元素是任意数据类型
3.列表的删除   del 列表名

列表创建方法
1.使用[]直接创建
列表名=[element1,element2,.......elementN]
2.使用内置函数list()创建列表
列表名=list(序列)

枚举
enumerate(iterable, start=0)  

start为制定起始值常用在for循环中，

for index，序列名 in enumerate(iterable, start=0) 

# 列表的相关操作

1. lst.append(x)  在列表lst最后增加一个元素
2. lst.insert(index,x)  在列表中第index位置增加一个元素
3. lst.clear()   清除lst中所有元素
4. lst.pop(index)  将列表lst中第index元素取出，并从列表中删除
5. lst.remove(x)   将列表lst中出现的第一个元素x删除
6. lst.reverse(x)   将列表lst中的元素反转
7. lst.copy（）    拷贝lst中的所有元素，生成一个新的列表
当需要索引许多列表中的一个时，可以进行列表套列表操作
空列表在布尔上下文中被视为 `False`

## --------类型转化函数------

1. int 将字符串转为整数的函数
2. float(x)  将x转换为浮点数类型,float类型转换成int类型，只保留整数部分
3. chr(x)   将整数x转为一个字符
4. ord(x)  将字符x转为其对应的整数值
5. hex(x)  将一个整数x转换为一个十六进制字符串
6. oct(x)  将一个整数x转换为一个八进制字符串
7. bin(x)  将一个整数x转换为一个二进制字符串
8. eval(x)  去掉字符串左右的引号，使字符串内进行运算    例：对字符串进行命名
   str(x)   将x转化为字符串类型

# 单行注释

""" """或''' ''' 多行注释

进制前缀
1、二进制以0b开头。

2、八2113进制5261在输出4102的时候以0开头，例如：0123十进制的83。

3、十进制正常输出，1653无特别表示。

4、十六进制在输出的时候以0X或者0x开头，例如0x123 十进制的291。

四则运算符

+ 连接符/加法
- 减法
* 重复n次字符串/乘法
  /  除法
  //  整除
  %  取余
  **  幂运算

赋值运算
x+=y  #  40   相当于x=x+y
x-=y  # 相当于x=x-y
x*=y   相当于x=x*y
x*=y    同理
x%=2  #  相当于  x=x%2
y//=z   # 相当于y=y//z
y**=2  #  相当于 y=y**2

逻辑运算符
and      与      从左到右计算
or         或      从左到右
not        非        从右到左

比较运算符

> 

<
==      等于
!=        不等于

> =        大于或等于
> <=       小于或等于

位运算符
位与            &
位或             |
位异或         ^
位取反         ~   

运算符的优先级
1. **
2. ·,+,-                      取反，正号，负号
3. *,/,%,//
4. +,-                          
5. <<,>>                   左移位和右移位
6. &                          按位与
7. ^                           异或
8. |                            按位或
9. <,<=,>,>=,!=,==    比较运算符

数值类型
1.数值型 2.字符串型 3.布尔型

1： 整数，浮点数，复数 三类

       整数为不可变数据类型
    
             整数的三种表示形式：1.默认为十进制
                                             2.0b或0B为魏晋至
                                             3.0o或0O为八进制
                                             4.0x或0X为十六进制

转义字符1.\n       换行符
2./t        水平制表位
3.\"         双引号
4.\'         单引号
5.\\         一个反斜杠
    r可以使以上转义字符失效

print(round(0.1+0.2,1))  round可以对括号内的数字进行保留小数运算，避免不确定的位数问题“,1"  表示保留一位小数

字符串的切片和索引，格式print(字符串[N;M])，意思是输出字符串中从N到M的字符，也可去掉N：变为输出单个字符

格式化输入

**字符串格式化**： 使用 `%s` 来格式化字符串。

**整数格式化**： 使用 `%d` 来格式化整数。
### 用 `%` 在一个字符串格式化多个变量

这种方法是较旧的字符串格式化方式，使用 `%` 操作符来插入变量。

```python
name = "Charlie"
age = 28
formatted_string = "My name is %s and I am %d years old." % (name, age)
print(formatted_string)
```

----

# 自定义函数
1. 定义函数
	- 形式：def name(n1,n2,n3...):
	- def:关键字
	- name:函数名
	- n1,n2...:获取的输入函数内部的外部数据
	- 需要返回值时用return (需要返回的数据)   来进行返回数据操作
	- 定义函数的时候可以def name(n1=None)来定义无输入时的默认变量数值
		- eg: def name(data=None):
			 if data is None:
				 express 

2. 函数的调用
	- 形式：函数名( n1,n2 )
	- 解释：这个整体本身具有函数return的值，可以进行赋值，判断等操作
	- 可以以name(n2= ,n1=  ,...)的形式进行传参，不需要依赖传参的顺序
# sorted函数（列表排序）

```python
sorted(iterable, key=None, reverse=False)
```

- **iterable**: 需要排序的可迭代对象，例如列表、元组、字符串等。
- **key**: 一个函数，用于从每个元素中提取一个用于比较的值。默认值为 `None`，表示直接比较元素。
- **reverse**: 一个布尔值，如果设置为 `True`，则结果将按降序排列；如果为 `False`（默认值），则按升序排列。

# ***count函数***

`count` 函数在 Python 中是一个非常有用的方法，通常用于计算某个元素在列表、字符串或其他可迭代对象中出现的次数。下面是关于 `count` 函数的详细说明和示例。

### 1. 在列表中的使用

在列表中，`count` 方法可以用来计算某个特定元素出现的次数。其语法如下：

```python
list.count(element)
```

- **element**: 你想要计算的元素。

#### 示例：

```python
my_list = [1, 2, 3, 1, 2, 1]
count_of_1 = my_list.count(1)
print(count_of_1)  # 输出: 3
```

在这个例子中，`1` 在 `my_list` 中出现了三次，因此 `count_of_1` 的值为 `3`。

### 2. 在字符串中的使用

在字符串中，`count` 方法用于计算子字符串出现的次数。其语法如下：

```python
string.count(substring)
```

- **substring**: 你想要计算的子字符串。

#### 示例：

```python
my_string = "hello world, hello everyone"
count_of_hello = my_string.count("hello")
print(count_of_hello)  # 输出: 2
```

在这个例子中，子字符串 `"hello"` 在 `my_string` 中出现了两次。

### 3. 其他可迭代对象

`count` 方法也可以用于其他可迭代对象，如元组等。用法与列表类似。

#### 示例：

```python
my_tuple = (1, 2, 3, 1, 2, 1)
count_of_1_in_tuple = my_tuple.count(1)
print(count_of_1_in_tuple)  # 输出: 3
```

### 4. 注意事项

- `count` 方法是区分大小写的。在字符串中，`"Hello"` 和 `"hello"` 被视为不同的字符串。
- 如果元素在列表或字符串中不存在，`count` 方法将返回 `0`。

### 总结

`count` 函数是一个简单而强大的工具，可以帮助开发者快速统计元素的出现次数。无论是在列表、字符串还是其他可迭代对象中，它都能提供方便的计数功能。希望这些信息对你理解 `count` 函数有所帮助！如果你有其他问题或需要更多示例，请随时问我。

# 忽略字符串中的空格

使用 `str.replace()` 方法

如果你想要删除字符串中的所有空格，可以使用 `replace()` 方法将空格替换为空字符串。

```python
text = "这 是 一 个 测 试 字 符 串"
result = text.replace(" ", "")
print(result)  # 输出: 这是一个测试字符串
```

# **随机数**

在Python中，生成随机数可以使用内置的 `random` 模块。这个模块提供了多种方法来生成随机数，包括整数、浮点数和从序列中随机选择元素。以下是一些常用的随机数生成方法：

### 1. 生成随机浮点数

使用 `random.random()` 方法可以生成一个在 `[0.0, 1.0)` 范围内的随机浮点数。

```bash
import random

random_float = random.random()
print(random_float)  # 输出: 例如 0.37444887175646646
```

### 2. 生成指定范围内的随机整数

使用 `random.randint(a, b)` 方法可以生成一个在 `[a, b]` 范围内的随机整数，包括 `a` 和 `b`。

```bash
import random

random_int = random.randint(1, 10)
print(random_int)  # 输出: 例如 7
```

### 3. 生成指定范围内的随机浮点数

使用 `random.uniform(a, b)` 方法可以生成一个在 `[a, b]` 范围内的随机浮点数。

```bash
import random

random_float_range = random.uniform(1.5, 5.5)
print(random_float_range)  # 输出: 例如 3.141592653589793
```

### 4. 从序列中随机选择元素

使用 `random.choice()` 方法可以从一个序列（如列表、元组等）中随机选择一个元素。

```bash
import random

items = ['apple', 'banana', 'cherry']
random_item = random.choice(items)
print(random_item)  # 输出: 例如 'banana'
```

### 5. 生成多个随机数

使用 `random.sample()` 方法可以从一个序列中随机选择多个不重复的元素。

```bash
import random

items = ['apple', 'banana', 'cherry', 'date']
random_samples = random.sample(items, 2)
print(random_samples)  # 输出: 例如 ['banana', 'date']
```

### 6. 生成随机数种子

为了确保每次运行程序时生成的随机数相同，可以使用 `random.seed()` 方法设置随机数种子。

```bash
import random

random.seed(42)  # 设置种子
print(random.random())  # 输出: 例如 0.6394267984578837
```

### 总结

Python 的 `random` 模块提供了多种生成随机数的方法，可以根据需要选择合适的函数来生成随机数。无论是生成浮点数、整数，还是从序列中选择元素，`random` 模块都能满足需求。

# 定义一个函数

你可以定义一个由自己想要功能的函数，以下是简单的规则：

- 函数代码块以 **def** 关键词开头，后接函数标识符名称和圆括号**()**。

- 任何传入参数和自变量必须放在圆括号中间。圆括号之间可以用于定义参数。

- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。

- 函数内容以冒号起始，并且缩进。

- **return [表达式]** 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None。

  # 自定义函数

  **创建一个自定义函数**

  def 函数名（变量名1，变量名2，。。。变量名n）

  ​	表达式

  ​	return

**引用一个自定义函数**

​	函数名（参数1，参数2.。。）

# Python 元组

Python 的元组与列表类似，不同之处在于元组的元素不能修改。

元组使用小括号，列表使用方括号。

元组创建很简单，只需要在括号中添加元素，并使用逗号隔开即可。

如下实例：

## 实例(Python 2.0+)

tup1 = ('physics', 'chemistry', 1997, 2000) tup2 = (1, 2, 3, 4, 5 ) tup3 = "a", "b", "c", "d"

### 元组中只包含一个元素时，**需要在元素后面添加逗号**

```
tup1 = (50,)
```

## 修改元组

元组中的元素值是不允许修改的，但我们可以对元组进行连接组合

## 删除元组

元组中的元素值是不允许删除的，但我们可以使用del语句来删除整个元组

## 元组内置函数

Python元组包含了以下内置函数

| 序号 | 方法及描述                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | [cmp(tuple1, tuple2)](https://www.runoob.com/python/att-tuple-cmp.html) 比较两个元组元素。 |
| 2    | [len(tuple)](https://www.runoob.com/python/att-tuple-len.html) 计算元组元素个数。 |
| 3    | [max(tuple)](https://www.runoob.com/python/att-tuple-max.html) 返回元组中元素最大值。 |
| 4    | [min(tuple)](https://www.runoob.com/python/att-tuple-min.html) 返回元组中元素最小值。 |
| 5    | [tuple(seq)](https://www.runoob.com/python/att-tuple-tuple.html) 将列表转换为元组。 |



## 删除字典元素

能删单一的元素也能清空字典，清空只需一项操作。

tinydict.clear()      # 清空字典所有条目

 del tinydict          # 删除字典

列表推导式是 Python 中一种简洁而强大的语法，用于从可迭代对象（如列表、元组、字符串等）生成新的列表。它允许你在一行代码中创建列表，通常比使用传统的 `for` 循环更简洁和可读。

# 列表推导式

### 基本语法

列表推导式的基本语法如下：

```python
[expression for item in iterable if condition]
```

- **expression**：对每个 `item` 应用的表达式，生成新列表的元素。
- **item**：可迭代对象中的每个元素。
- **iterable**：可以迭代的对象（如列表、元组、字符串等）。
- **condition**（可选）：一个可选的条件，用于过滤元素，只有满足条件的元素才会被包含在新列表中。
eg:groups = [group for group in groups if group]
	知识点：if group，只有当group非空才会为True
