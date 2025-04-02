---
icon: pen-to-square
date: 2025-04-02
tags: 
title: John the Ripper
category:
  - 项目
---
```bash
john [options] [file path]
```

## 识别哈希 hash-identifier
```bash
wget https://gitlab.com/kalilinux/packages/hash-identifier/-/raw/kali/master/hash-id.py
```
获取 [hash-identifier](https://gitlab.com/kalilinux/packages/hash-identifier/-/tree/kali/master)


## 破解基本格式的hash
```bash
john --format=[format] --wordlist=[path to wordlist] [path to file]
```
- `--format=`：这是告诉 John 您正在为其提供特定格式的哈希值并使用以下格式破解它的标志
- `[format]`：哈希值的格式



