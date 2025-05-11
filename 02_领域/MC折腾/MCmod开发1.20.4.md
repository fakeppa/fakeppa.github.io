---
icon: pen-to-square
date: 2025-01-04
tags: 
title: MCmod开发1.20.4
category:
  - 领域
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

### 注意：更改其他包名及所有java代码的包名
注意以下包名设置是否正确，
client\java\com\模组id\ExampleModClient.java
client\java\com\模组id\mixin\client\ExampleClientMixin.java
main\java\com\模组id\ExampleMod.java
main\java\com\模组id\mixin\ExampleMixin.java
以及mixin的配置文件
main\example\mixins.json中的package参数是否正确
**正确一般是指这些路径是否指向正确的文件**


*其他内容待续，暂时只用到这些*
# 04. 创建一个物品
*现在开始实践，制作一个普通的物品，这些代码需要在入口点指定的main字段添加*
## 001. 实例化物品
```java
public static final Item CUSTOM_ITEM = new Item(new FabricItemSettings());
```
- CUSTOM_ITEM:你实例化物品的名称，也就是一个Item类的对象，*其他的参数暂时不看*

## 002. 注册表（）
注册内容时，需要指定加入那个注册表，基本的游戏提供所有原版内容的注册表

### 0001. 添加内容到注册表
**注册代码要在`public void onInitialize()`抽象方法（初始化器）内具体实现**
```
Registry.register(registry,id,conten);
```
- registry: 你的物品要添加到的那个注册表的对象
- id：你的内容在注册表中的id
  **关于id**
  使用`new Identifier("namespace", "path")`来添加id
	- namespace：是我们在入口点定义的modid
	- path：在namespace中定义一个唯一标识符，类比一下，假如命名空间是一个箱子，那么path就是这个箱子里的物品的名称。
- content：你需要注册的内容的对象。（也就是上文的CUSTOM_ITEM对象）

## 002. 为物品添加纹理
假如我的命名空间为tl_ppie,物品名为tlppie。纹理文件和模型文件的结构是这样的
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250107221129.png)
贴图文件路径:`resources\assets\命名空间\textures\item\贴图文件名.png`
注意这里的贴图文件名可以是任何文件名。不必要是物品名

模型文件路径:`resources\assets\命名空间\models\item\物品名.json`
注意这里的json文件名只能是物品名，也就是创建的物品对象的名字
json内容：
```json
{
    "parent": "item/generated",
    "textures": {
      "layer0": "tl_ppie:item/tlppie"
    }
  }
```
`parent`：模型的形式，这里是物品形式，由指向的贴图文件构造模型
接下来的两行是贴图文件的路径
`"textures": {`：这个代表了与models同级的文件夹的名称。
`"layer0": "tl_ppie:item/tlppie"`:  内容是`命名空间:文件夹/贴图图片的名称`


## 003. 为物品添加配方
路径：
resources\data\模组ID\配方名.json
内容：
```json
{
    "type": "minecraft:crafting_shaped",
    "pattern": [
        "#",
        "#",
        "#"
    ],
    "key": {
        "#": {
            "item": "minecraft:pumpkin_pie"
        }
    },
    "result": {
        "item": "tl_ppie:tlppie",
        "count": 1
      }
}
```
按照形状制作配方
`"type":`:文件的类型
`"pattern":`:配方形状
`"key":`:符号代表的物品
`"result":`：合成的结果是什么物品

## 004. 
