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
先来看这些，id填写模组的命名空间(只能填写_和阿拉伯数字以及小写字母)，name为你的模组的名称，然后添加描述和作者，然后添加

# 04. 注册一个物品
## 001. 注册表
注册内容时，需要指定加入那个注册表，基本的游戏提供所有原版内容的注册表

### 0001. 注册你的内容
使用
```
Registry.register(registry,id,content);
```
注册物品
- **registry** - 你需要添加内容进的注册表的实例。
- **id** - 你的内容在注册表内的 ID。
- **content** - 你需要注册的内容的实例。

### 0002. 通过 ID 获取对象
get返回注册表内与ID关联的内容。如果内容不存在，SimpleDefaultedRegistry会返回默认注册表，而`SimpleRegistry` 就返回 null。可以使用 `containsId` 或 `getOrEmpty` 方法检测 ID 是否存在
```
Registries.ITEM.containsId(Identifier.ofVanilla("diamond")); // 返回 true
 
Registries.ITEM.containsId(Identifier.ofVanilla("invalid_name")); // 返回 false
```
- **Registries.ITEM**：这是 Minecraft 中用于注册和管理物品的注册表。它是一个 `Registry<Item>` 类型的对象，包含了游戏中所有注册的物品.
- **Identifier.ofVanilla("diamond")**：创建一个指向原版 Minecraft 中的物品的标识符。`"diamond"` 是原版 Minecraft 中钻石物品的路径，其完整的标识符是 `"minecraft:diamond"`.
- **containsId**：这是 `Registry` 接口的一个方法，用于检查注册表中是否包含指定的标识符。如果注册表中存在该标识符对应的物品，则返回 `true`；否则返回 `false`.
- **返回 true**：因为原版 Minecraft 中确实存在名为 `"minecraft:diamond"` 的物品（钻石），所以这行代码返回 `true`，表示物品注册表中包含这个标识符.

```
Registries.ITEM.get(Identifier.ofVanilla("diamond"))
```

- **`Registries.ITEM.get` 方法**：用于从物品注册表中获取与指定标识符关联的物品实例。
- **`Identifier.ofVanilla("diamond")`**：创建一个指向原版 Minecraft 中的物品的标识符，即 `"minecraft:diamond"`。
- **返回 `Items.DIAMOND`**：因为原版 Minecraft 中存在名为 `"minecraft:diamond"` 的物品（钻石），所以这行代码返回 `Items.DIAMOND`，即钻石物品的实例。

```
Registries.ITEM.get(Identifier.ofVanilla("invalid_name"))
```

- **返回 `Items.AIR`**：当尝试获取一个不存在的标识符时，`SimpleDefaultedRegistry` 返回注册表的默认值。在物品注册表中，默认值通常是 `Items.AIR`，表示空气物品。因此，这行代码返回 `Items.AIR`。

```
Registries.ITEM.getOrEmpty(Identifier.ofVanilla("diamond"))
```

- **`getOrEmpty` 方法**：用于从注册表中获取与指定标识符关联的实例，返回一个 `Optional` 对象。
- **返回 `Optional.of(Items.DIAMOND)`**：因为 `"minecraft:diamond"` 存在，所以返回一个包含 `Items.DIAMOND` 的 `Optional` 对象。`Optional.of` 表示找到了有效的实例。

```
Registries.ITEM.getOrEmpty(Identifier.ofVanilla("invalid_name"))
```

- **返回 `Optional.empty()`**：当尝试获取一个不存在的标识符时，`getOrEmpty` 方法返回一个空的 `Optional` 对象。`Optional.empty()` 表示没有找到对应的实例。

### 0003. 获取对象的 ID

`getId` 返回注册表内与对象关联的 `Identifier`，如果这个项不存在， `SimpleDefaultedRegistry` 返回默认的注册表 ID，`SimpleRegistry` 返回 null。例如：

    Registries.BLOCK.getId(Blocks.STONE);  // 返回 Identifier.ofVanilla("stone"))

## 002. 添加物品
### 0001. 创建物品
```java
public class ExampleMod implements ModInitializer {

    // 创建一个自定义食物物品

    public static final Item CUSTOM_FOOD = new ItemFood(

        new FabricItemSettings().maxCount(1), // 设置最大堆叠数为1

        24, // 恢复4点饥饿值

        14.4f, // 饱和度

        false, // 是否可以堆叠

        new MobEffectInstance[]{} // 没有食用效果

    );
   
.....其它代码

}
```
这是一个简单的食物创建代码，不包括导包

### 0002. 注册这个物品
