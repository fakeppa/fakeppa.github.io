---
icon: pen-to-square
date: 2025-06-07
tags: 
title: KALI自带字典介绍
category:
  - 项目
---

## 1. **wordlists 目录**

路径：`/usr/share/wordlists/`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250607164116.png)
这是 Kali Linux 中的主要字典存储路径，包含了多种用途的字典文件。此外，还有一些项目字典的软链接。

主要字典：
rockyou.txt
路径: /usr/share/wordlists/rockyou.txt
用途: 这是一个非常著名的密码破解字典，包含超过 1400 万条真实密码数据，广泛应用于暴力破解和字典攻击。
备注: 默认情况下，rockyou.txt 是压缩格式（.gz），使用前需要解压。解压命令如下：
```bash
gzip -d /usr/share/wordlists/rockyou.txt.gz
```

## 2. seclists字典库

seclists 可以被认为是 Kali Linux 中最全面、最强大的字典库。它不仅仅局限于密码破解，而是覆盖了渗透测试的各个环节，从初步的信息收集、Web 应用漏洞扫描，到文件包含、SQL 注入等各种漏洞利用场景，都可以在 seclists 中找到对应的字典资源。需要注意的是，seclists 默认情况下可能不会安装，你可能需要通过以下命令进行安装：
```bash
sudo apt update && sudo apt install seclists
```
### 常见字典：
1. 枚举 CGI 服务

路径: ./seclists/Discovery/Web_Content/cgis.txt
	用途: 用于枚举 Web 应用中的 CGI 脚本。

2. 路径枚举大字典

路径: ./seclists/Discovery/Web_Content/directory-list-2.3-medium.txt
	用途: 用于路径枚举，较为全面，是 HackTheBox 和 OSCP 常用的大字典。

3. 常见目录字典
路径:
/usr/share/dirb/wordlists/common.txt
/usr/share/seclists/Discovery/Web_Content/common.txt
/usr/share/seclists/Discovery/Web_Content/raft-medium-directories-lowercase.txt
	用途: 这些字典适用于常见目录的枚举，帮助发现常见的 Web 应用目录和文件。


4. 扩展名字典
路径: /usr/share/seclists/Discovery/Web_Content/raft-large-extensions.txt
	用途: 用于枚举常见的文件扩展名，帮助识别网站中可能存在的文件类型。

5. Fuzzing 字典
路径:
/usr/share/seclists/Fuzzing/alphanum-case-extra.txt
/usr/share/seclists/Fuzzing/special-chars.txt
	用途: 用于 fuzz 测试时输入特殊字符，查找可能的漏洞。

6. LFI 漏洞字典
路径: /usr/share/seclists/Fuzzing/LFI/LFI-gracefulsecurity-linux.txt
	用途: 专门用于本地文件包含（LFI）漏洞的测试，帮助渗透测试人员检查目标系统是否存在文件包含漏洞。












[Kali 自带字典及密码生成工具介绍_kali字典-CSDN博客](https://blog.csdn.net/2301_79518550/article/details/145257558)