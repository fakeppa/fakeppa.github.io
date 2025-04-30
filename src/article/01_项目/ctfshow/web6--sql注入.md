---
icon: pen-to-square
date: 2025-04-30
tags: 
title: web6--sql注入
category:
  - 项目
---
#### 1.绕过空格（注释符/* */，%a0）：

　　`两个空格代替一个空格，用Tab代替空格，%a0=空格：`

```
%20 %09 %0a %0b %0c %0d %a0 %00 /**/  /*!*/
```

