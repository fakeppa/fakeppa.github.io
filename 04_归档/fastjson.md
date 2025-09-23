---
icon: pen-to-square
date: 2024-12-10
category:
  - 归档
tags:
  - 漏洞
title: fastjson
---
# 搭建环境时出现的问题：
## SSL证书：因为直接恢复快照导致时间不对，从而导致ssl验证失败
	 ### 1. 安装`ntp`服务

	首先，确保你的系统安装了`ntp`（网络时间协议）服务。可以使用以下命令安装：
	
	```bash
	sudo yum install ntp
	```
	
	### 2. 启动并启用`ntp`服务
	
	安装完成后，启动`ntp`服务并设置为开机自启：
	
	```bash
	sudo systemctl start ntpd
	sudo systemctl enable ntpd

- # pip不好用，直接用pip3可以解决问题
	1. **安装 Python 3 和 pip3**：接下来，安装 Python 3 和 `pip3`。运行以下命令：
	    
	    ```bash
	    sudo yum install python3
	    ```
	    
	    这将同时安装 Python 3 和 `pip3`。
	    
	2. **验证安装**：安装完成后，你可以通过以下命令验证 `pip3` 是否成功安装：
	    
	    ```bash
	    pip3 --version
	    ```
	    
	    如果安装成功，你将看到 `pip3` 的版本信息。
## 搭建vulhub可用的方法：
在 CentOS 上不使用 Git 拉取 Vulhub，你可以通过直接下载其压缩包的方式来获取。以下是详细步骤：

### 步骤 1：安装 `wget`（如果尚未安装）

首先，确保你的 CentOS 系统上安装了 `wget` 工具。你可以通过以下命令来安装：

```bash
sudo yum install wget
```

### 步骤 2：下载 Vulhub 压缩包

使用 `wget` 命令直接从 GitHub 下载 Vulhub 的压缩包。打开终端并输入以下命令：

```bash
wget https://github.com/vulhub/vulhub/archive/refs/heads/master.zip
```

### 步骤 3：安装 `unzip`（如果尚未安装）

如果你的系统上没有安装 `unzip` 工具，可以通过以下命令安装：

```bash
sudo yum install unzip
```

### 步骤 4：解压缩下载的文件

下载完成后，使用 `unzip` 命令解压缩文件：

```bash
unzip master.zip
```

这将会创建一个名为 `vulhub-master` 的文件夹，里面包含了所有的 Vulhub 文件。

### 步骤 5：进入 Vulhub 目录

解压缩后，进入到 Vulhub 目录：

```bash
cd vulhub-master
```

### 步骤 6：使用 Vulhub

现在你可以根据需要使用其中的 Docker 配置文件和其他资源。

### 总结

通过以上步骤，你可以在 CentOS 上不使用 Git 的情况下成功下载和使用 Vulhub。如果你有其他问题或需要进一步的帮助，请随时告诉我！

----
# 面向对象

类是创建对象的模版：（以一套特定的规则来创建对象的模版）
对象是类的实例（在特定的规则下所创建的对象）

#非primitive变量只会将变量名保存在栈上，而对象在堆上

子类继承的方法可以被覆盖，实例变量不可以被覆盖


## super关键字(了解了前两个使用方法)
在 Java 中，`super` 关键字是一个非常重要的概念，主要用于访问父类的属性和方法。它在继承关系中起着关键作用，允许子类与父类之间进行交互。以下是对 `super` 关键字的详细解释：

### 1. 访问父类的属性

当子类和父类中有同名的实例变量时，可以使用 `super` 关键字来区分它们。通过 `super`，子类可以访问父类的实例变量。

### 2. 访问父类的方法

如果子类重写了父类的方法，但在某些情况下仍然需要调用父类的方法，可以使用 `super` 关键字来实现。

### 3. 调用父类的构造函数

在子类的构造函数中，可以使用 `super()` 来调用父类的构造函数。这通常用于初始化父类的属性。


## this关键字：
前提：this的使用在一个方法里，且存在一个类，用this.变量名来访问实例变量的值
目的：改变实例变量，然后可以用改变后的实例变量进行操作

# new关键字：
格式：类名 对象名(这会将dog类的实例化对象的引用传递给这个变量名，即可以将此变量名当成类名使用) = new 方法名(在指定类中的方法)  参数
# fastjson序列化
主要的 API ：JSON.toJSONString
本质：将实例化的对象进行单独构建一个类（因为json不支持多态），并且会在构建时调用getter方法来获取此时的实例变量

# fastjson反序列化
主要的 API ：JSON.parseObject()和JSON.parse()，前者会调用get方法，后者不会
本质：会执行json中@type的指定类的setter和getter(如果是JSON.parseObject())方法，并转换为jsonobject类
# 注意事项
**使用 `JSON.parse(jsonString)` 和 `JSON.parseObject(jsonString, Target.class)`，两者调用链一致，前者会在 jsonString 中解析字符串获取 `@type` 指定的类，后者则会直接使用参数中的class。**
# 自动调用setter或getter的条件
- 其中 getter 方法需满足条件：方法名长于 4、不是静态方法、以 `get` 开头且第4位是大写字母、方法不能有参数传入、继承自特定类，此属性没有 setter 方法；
	特定类：`Collection|Map|AtomicBoolean|AtomicInteger|AtomicLong`
- setter 方法需满足条件：方法名长于 4，以 `set` 开头且第4位是大写字母、非静态方法、返回类型为 void 或当前类、参数个数为 1 个。具体逻辑在 `com.alibaba.fastjson.util.JavaBeanInfo.build()` 中。
若是没有setter方法，依旧想在反序列化时给变量赋值，则用`Feature.SupportNonPublicField` 参数。
fastjson因为引进了AutoType功能，在对json字符串反序列化的时候，会读取到type到内容，将json内容反序列化为java对象并**调用这个类的setter方法。**