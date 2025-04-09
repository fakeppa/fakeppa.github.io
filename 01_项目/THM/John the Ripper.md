---
icon: pen-to-square
date: 2025-04-02
tags: 
title: John the Ripper
category:
  - 项目
---
# word-list字典模式
```bash
john [options] [file path]
```

## 识别哈希 hash-identifier
```bash
wget https://gitlab.com/kalilinux/packages/hash-identifier/-/raw/kali/master/hash-id.py
```
获取 [hash-identifier](https://gitlab.com/kalilinux/packages/hash-identifier/-/tree/kali/master)
`python hash-identifier`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250402142710.png)

## 破解基本格式的hash
需要提供哈希的类型
```bash
john --format=[format] --wordlist=[path to wordlist] [path to file]
```
- `--format=`：这是告诉 John 您正在为其提供特定格式的哈希值并使用以下格式破解它的标志
- `[format]`：哈希值的格式


## 实例---破解windows身份验证哈希
windows身份验证所用的哈希技术为NTHash
在破解NTLM时需要设置--FORMAT为 nt

## 实例--破解linux密码哈希
`/etc/passwd`部分的哈希需要用unshadow进行处理，才能与john进行交互
```bash
unshadow [path to passwd] [path to shadow]
```

示例用法：
```bash
unshadow local_passwd local_shadow > unshadowed.txt
```
然后再进行john破解即可

# Single Crack 模式
单词修饰
解释 Single Crack 模式和单词修饰的最好方法是通过一个例子：

考虑用户名 “Markus”。

一些可能的密码可能是：

Markus1、Markus2、Markus3 （等）
MArkus、MARkus、MARKus （等）
Markus！， Markus$， Markus* （等）

```bash
john --single --format=[format] [path to file]
```

示例
`john --single --format=raw-sha256 hashes.txt`

## 自定义规则
自定义规则通常定义在`john.conf`文件中。
###  定义规则名称
在`john.conf`文件中，首先定义规则的名称，格式如下：

`[List.Rules:CustomRuleName]`
其中`CustomRuleName`是你自定义的规则名称，后续在命令行中会用到。
然后添加规则
Az：获取单词并附加您定义的字符
A0：获取单词并在其前面加上您定义的字符
c：按位置将字符大写

最后，我们必须定义应该附加、前置或以其他方式包含哪些字符。我们通过在应该使用它们的地方的方括号中添加字符集来实现这一点。这些遵循双引号内的修饰符模式。以下是一些常见示例:
`[0-9]`：将包含数字 0-9
`[0]`：将仅包含数字 0
`[A-z]`：将同时包括大写和小写
`[A-Z]`：将仅包含大写字母
`[a-z]`：将仅包含小写字母
规则示例
```conf
# 自定义规则示例
[List.Rules:MyRules]
# 用户名后添加2023
$2$0$2$3
# 首字母大写并添加!
c$!
# 替换所有a为@
sa@
# 用户名反转后添加数字
r$1
```

# 破解受密码保护的 zip 文件
使用Zip2John将 Zip 文件转换为 John 可以理解并希望破解的哈希格式
```bash
zip2john [options] [zip file] > [output file]
```
`[options]`：允许您将特定的校验和选项传递给 ;这通常不是必需的zip2john
`[zip file]`：要获取其哈希值的 Zip 文件的路径
`>`：这会将此命令的输出重定向到另一个文件
`[output file]`：这是将存储输出的文件

示例用法

zip2john zipfile.zip > zip_hash.txt

然后使用john破解即可
# 破解受密码保护的 RAR 文件
rar2john
```
rar2john [rar file] > [output file]
```

# 破解SSH密钥密码
```bash
ssh2john [id_rsa private key file] > [output file]
```

**示例用法**

`/opt/john/ssh2john.py id_rsa > id_rsa_hash.txt`