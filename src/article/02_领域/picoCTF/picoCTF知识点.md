---
icon: pen-to-square
date: 2024-12-18
tags:
  - picoCTF
title: picoCTF知识点
category:
  - 领域
---

# 知识点：
- ssh连接命令 #Super_SSH
```
	ssh username@adress -p password yes
```
----
- 检查文件是否被篡改后缀 #Secret
```
file 文件名
```
----
- git仓库 #git
		回溯到之前的版本
```
git checkout 哈希值
```
- **运行以下命令**，将目录添加到安全目录列表中:

```bash
git config --global --add safe.directory /home/kali/drop-in
```
- 将让您看到可用的分支
```
git branch -a
```
- 显示指定文件或所有项目的变更历史，包括每次提交的内容差异。
```
git log -p -- message.py
```
- grep用法: #grep
	以下是 `grep` 命令的一些基本用法：
	
	1. **基本搜索**：
	    
	    sh
	    
	    ```text
	    grep "pattern" filename
	    ```
	    
	    这个命令会在 `filename` 文件中搜索包含 "pattern" 的所有行，并将这些行打印到标准输出。
	    
	2. **递归搜索**：
	    
	    sh
	    
	    ```text
	    grep -r "pattern" directory
	    ```
	    
	    这个命令会在 `directory` 目录及其所有子目录中搜索包含 "pattern" 的所有文件，并打印匹配的行。
	    
	3. **忽略大小写**：
	    
	    sh
	    
	    ```text
	    grep -i "pattern" filename
	    ```
	    
	    使用 `-i` 选项，`grep` 会忽略字母的大小写。
	    
	4. **使用正则表达式**：
	    
	    sh
	    
	    ```text
	    grep -E "pattern" filename
	    ```
	    
	    `-E` 选项允许使用扩展正则表达式，这提供了更多的模式匹配选项。
	    
	5. **排除文件**：
	    
	    sh
	    
	    ```text
	    grep --exclude="*.txt" "pattern" directory
	    ```
	    
	    这个命令会在 `directory` 目录中搜索所有文件，但不包括以 `.txt` 结尾的文件。
	    
	6. **只打印文件名**：
	    
	    sh
	    
	    ```text
	    grep -l "pattern" directory
	    ```
	    
	    `-l` 选项会让 `grep` 只打印包含匹配行的文件名，而不是打印匹配的行本身。
	    
	7. **行号**：
	    
	    sh
	    
	    ```text
	    grep -n "pattern" filename
	    ```
	    
	    `-n` 选项会在输出中包括匹配行的行号。
	    
	
	`grep` 是一个非常基础的工具，几乎所有的 Unix 和 Linux 发行版都预装了它，它也是许多其他文本处理工具和脚本的基础。
----
- netcat #netcat
	**nc**（或 **netcat**）实用程序几乎用于任何涉及 TCP 或 UDP 的事情。它可以打开 TCP 连接、发送 UDP 数据包、 侦听任意 TCP 和 UDP 端口，执行端口扫描，并处理 IPv4 和 IPv6。与 **[telnet](https://linux.die.net/man/1/telnet)**（1） 不同，**nc** 脚本很好，并且可以分离错误 messages 发送到 standard 错误，而不是像 **[telnet](https://linux.die.net/man/1/telnet)**（1） 那样将它们发送到 standard output。

	- 数据传输
	
		上一节中的示例可以扩展以构建基本的数据传输模型。输入到连接一端的任何信息都将是 output 到另一端，并且可以轻松捕获输入和输出以模拟文件传输。
		
		首先使用 **nc** 侦听特定端口，并将输出捕获到文件中：
		
		$ nc -l 1234 > filename.out
		
		使用第二台机器，连接到侦听 **nc** 进程，将要传输的文件送入该进程：
		
		$ nc host.example.com 1234 < filename.in
		
		传输文件后，连接将自动关闭。
----
#ssh连接
	ssh连接命令：
```
	ssh [username]@[hostname] -p [port]
```

----
#nosql-inject 
- 重言注入：
  利用条件为真的语句来进行注入，绕过条件验证
  ```
  {"$ne": null}
	```
	$ne：不等于
	null：空
	意思是查询并返回所有不为空的特定数据库或表中的数据
- xxe外部实体注入
#xml外部实体注入 
- 什么是xxe？
- **基本payload结构**
  ![2c](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2c.png)
  
  基本命令
 - 如何识别xxe注入
   抓包或者观察URL是否以'ashx'为后缀
- 构造访问外部资源的payload
```
<!DOCTYPE foo [<!ELEMENT foo ANY >  
<!ENTITY  xxe SYSTEM "file:///c:/2024.txt" >]>  
<foo>&xxe;</foo>
```
其中foo为key
- #JWT
  ![weq21](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/weq21.png)
  - xor:x读作位，
- CBC位翻攻击 #CBC位翻攻击
	加密过程：
	![CBCATTACK.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/CBCATTACK.png)
	
	1. Plaintext：待加密的数据。
	2. IV：用于随机化加密的比特块，保证即使对相同明文多次加密，也可以得到不同的密文。
	3. Ciphertext：加密后的数据。
	
	
	**整个加密的过程简单说来就是：**
	
	1. 首先将明文分组(常见的以16字节为一组)，位数不足的使用特殊字符填充。
	2. 生成一个随机的初始化向量(IV)和一个密钥。
	3. 将IV和第一组明文异或。
	4. 用密钥对3中xor后产生的密文加密。
	5. 用4中产生的密文对第二组明文进行xor操作。
	6. 用密钥对5中产生的密文加密。
	7. 重复4-7，到最后一组明文。
	8. 将IV和加密后的密文拼接在一起，得到最终的密文。
	   
	   
	![CBCREAVERSE.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/CBCREAVERSE.png)
	
	这是解密过程，解密的过程其实只要理解了加密，反过来看解密过程就也很简单了，同样的，**_前一块密文参与下一块密文的还原_**。
	
	1. 从密文中提取出IV，然后将密文分组。
	2. 使用密钥对第一组的密文解密，然后和IV进行xor得到明文。
	3. 使用密钥对第二组密文解密，然后和2中的密文xor得到明文。
	4. 重复2-3，直到最后一组密文。

- MD5 #MD5 
**MD5**（Message-Digest Algorithm 5）是一种广泛使用的哈希函数，它可以产生一个128位（16字节）的哈希值。在**PDF**文件中，**MD5**值并不是存储在文件结构的特定部分，而是通过对整个PDF文件的内容进行**MD5**哈希计算得出的。这意味着，如果两个PDF文件的**MD5**值相同，这表明这两个文件在字节级别上是完全相同的。

**MD5**值是对整个**PDF**文件内容的哈希计算结果，而不是存储在**PDF**文件结构中的某个特定部分。因此，当你计算一个**PDF**文件的**MD5**值时，你是在对整个文件的内容（包括上述所有部分）进行哈希计算。如果两个**PDF**文件的**MD5**值相同，这意味着它们的内容完全相同，没有任何差异。
#mmls
- 一种查看磁盘映像文件的大小的命令行工具，检测分区
```
mmls 文件名
```
