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

# 02. 入口点和初始化器
Fabric Load用fabric.mod.json来检测和加载你的模组，一个模组通常包含至少一个初始化器类
初始化器至少实现了这个类应该实现了 `ModInitializer`、`ClientModInitializer` 和 `DedicatedServerModInitializer` 这三个接口中的一个。这三个接口都在net.fabricmc.api包内。
在三个接口中必须具体实现`onInitialize()`的抽象方法。（对于 Client 是 `onInitializeClient()`，对于 Server 是 `onInitializeServer()`）

# 03. 创建你的工程
## 001. 目录结构
src\main\java\你的包名\你的模组名.java
在包名这里需要展示出你的从包名到上一级目录的内容，假如我的文件结构为com\example\文件.java
那么在文件里就该这么声明包
```java
package com.example;
```
*在我们的模组主程序中，就可以进行模组的编写*


## 002. 入口点的设置
```json
{

    "schemaVersion": 1,
    "id": "tl_ppie",
    "version": "${version}",
    "name": "Triple Layer Pumpkin Pie",
    "description": "you can eat Triple Layer Pumpkin Pie!",
    "authors": [
        "fakeppa"
    ],
    "contact": {
        "homepage": "https://fakeppa.github.io/",
        "sources": "https://github.com/FabricMC/fabric-example-mod"
    },
```
先来看这些，id填写模组的命名空间(只能填写_和阿拉伯数字以及小写字母)，name为你的模组的名称，然后添加描述和作者，然后添加联系方式

```json
    "license": "CC0-1.0",
    "icon": "assets/modid/icon.png",
    "environment": "*",
    "entrypoints": {
        "main": [
            "com.example.ExampleMod"
        ],
        "client": [
            "com.example.ExampleModClient"
        ]
```
- icon：具体的图标资源地址
- "main"：包名，最后一个是类名
- "client"：客户端加载的内容，先不管

*其他内容待续，暂时只用到这些*
# 04. 注册一个物品
## 001. 注册表
注册内容时，需要指定加入那个注册表，基本的游戏提供所有原版内容的注册表

