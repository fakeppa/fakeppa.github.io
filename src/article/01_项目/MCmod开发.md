---
icon: pen-to-square
date: 2025-01-04
tags: 
title: MCmod开发
category:
  - 项目
---
# 01. 模版构建与环境搭建
首先在fbric官网进行模版模组的拉取，随后在vscode中进行打开，然后配置gradle代理，才能正确处理gradle的依赖
```
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=10809
systemProp.https.nonProxyHosts=10.*|localhost

  

systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=10809
systemProp.https.nonProxyHosts=10.*|localhost
```
在系统的.gradle文件加内创建gradle.properties文件，填写以上内容，这样在系统范围内都会走代理

# 02. 注册一个物品
## 001. 注册表
注册内容时，需要指定加入那个注册表，基本的游戏提供所有原版内容的注册表

## 002. 注册你的内容
使用
```
Registry.register(registry,id,content);
```
注册物品
- **registry** - 你需要添加内容进的注册表的实例。
- **id** - 你的内容在注册表内的 ID。
- **content** - 你需要注册的内容的实例。

## 003. 通过 ID 获取对象
get返回注册表内与ID关联的内容。如果内容不存在，