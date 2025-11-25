---
icon: pen-to-square
date: 2024-12-10
category:
  - 归档
tags:
  - 漏洞
title: fastjson
---
#标记重构 
## fastjson序列化
主要的 API ：JSON.toJSONString
本质：将实例化的对象进行单独构建一个类（因为json不支持多态），并且会在构建时调用getter方法来获取此时的实例变量

## fastjson反序列化
主要的 API ：JSON.parseObject()和JSON.parse()，前者会调用get方法，后者不会
本质：会执行json中@type的指定类的setter和getter(如果是JSON.parseObject())方法，并转换为jsonobject类

## 注意事项
**使用 `JSON.parse(jsonString)` 和 `JSON.parseObject(jsonString, Target.class)`，两者调用链一致，前者会在 jsonString 中解析字符串获取 `@type` 指定的类，后者则会直接使用参数中的class。**