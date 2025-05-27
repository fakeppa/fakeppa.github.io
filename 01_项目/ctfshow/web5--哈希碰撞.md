---
icon: pen-to-square
date: 2025-04-30
tags: 
title: web5
category:
  - 项目
---


```php
if(isset($v1) && isset($v2)){
            if(!ctype_alpha($v1)){
                die("v1 error");
            }
            if(!is_numeric($v2)){
                die("v2 error");
            }
            if(md5($v1)==md5($v2)){
                echo $flag;
            }
        }else{
        
            echo "where is flag?";
        }
```

若相等会把数字统一为相同类型进行比较
- **常见转换规则**：
    - 字符串与数字比较 → 字符串转为数字（如`"123" == 123`为`true`）。
    - 布尔值与字符串比较 → `true`转为`1`，`false`转为`0`（如`"1" == true`为`true`）。
    - 以`0e`开头的数字字符串 → 按科学计数法解析为`0`（如`"0e123" == "0e456"`为`true`）。

弱相等
```
==
```

会把科学计数法如0e12312313转化为0然后在进行比较
一下两个参数均为0e开头的科学计数法

```url
?v1=QNKCDZO&v2=240610708
```
前面接上url再访问传参

即可获得flag
```
ctfshow{dc6590d6-3254-4ffe-85d0-fef338e775e7}
```