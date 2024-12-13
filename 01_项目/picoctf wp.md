---
icon: pen-to-square
date: 2024-12-10
category:
  - 项目
tags:
  - 持续进行
title: picoctf wp
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


# picoCTF
1. introtoburp 二次验证界面修改参数名
2. bookmarklet 复制js代码到浏览器控制台执行即可
3. local authority 查看源代码
4. cookie 用开发者工具更改cookie并刷新
5. Scavenger Hunt 查看源代码拼凑即可，但是js界面提示这个/* How can I keep Google from indexing my website? */
	要防止Google索引您的网站，可以采取以下几种方法：

6. **使用robots.txt文件**： 在网站的根目录下创建一个名为`robots.txt`的文件，并添加以下内容：
    
    ```bash
    User-agent: *
    Disallow: /
    ```
    
    这将告诉所有搜索引擎的爬虫不允许访问您网站的任何页面。

	所以用url进入robots.txt文档,但是发现文字,提示使用apache组为服务器
	 那么访问.htaccess
		 `.htaccess` 文件是 Apache 服务器中用于配置目录级别的设置的文件。它允许用户在不修改主配置文件的情况下，控制网站的行为。
	继续发现文字：I love making websites on my Mac, I can Store a lot of information there.
	提示mac系统则用到一个.DS_Store目录
		`.DS_Store` 是 macOS 操作系统自动生成的隐藏文件，用于存储文件夹的自定义属性和设置，例如图标位置、窗口大小和背景图像等。
	随后拼接即可
7. GET aHEAD:将POST或GET请求改为HEAD请求即可
8. logon:修改cookie值，但是抓包改头也行:把admin：FALSE改为 admin:TRUE即可
9. #Secret of the Polyglot:下载文件后用file检查文件格式即可
10. #Super_SSH :直接连接ssh即可
11. #git Collaborative Development：查看分支并切换即可
12. #git  Blame Game:查看日志时候添加查看内容的参数即可
13. binhexa：注意二进制添加0b
14.  #grep Big Zip:用grep进行递归搜索
15. Tab, Tab, Attack:在多级的冗杂文件目录中，可以通过tab键自动补全文件名，elf为linux的可执行文件，在用`chmod +x filename`赋予权限后，可以用`./filename`执行程序
16. #netcat what's a net cat?:学习更多关于netcat的知识
17. Trickster:抓包然后在png图片末尾另起一行写入木马
18. #nosql-inject No Sql Injection:查看server.js观察源码，获得账户邮件，随后运用{"$ne": null}言注入
19. #xml外部实体注入 SOAP:xml注入即可，有回显，需要找key
20. #java代码分析  #JWT Java Code Analysis!?!
21. #JWT JAuth：JWT在cookie中，可以更改保存网站没有验证：空加密算法的设计初衷是用于调试的，但是如果某天开发人员脑阔瓦特了，在生产环境中开启了空加密算法，缺少签名算法，jwt保证信息不被篡改的功能就失效了。攻击者只需要把alg字段设置为None，就可以在payload中构造身份信息，伪造用户身份，这样甚至不用填写加密签名了
22. #xor Some Assembly Required 2:查看源代码，查看wasm，获得xor密文
23.  Web Gauntlet:sql注入题，有5管关，每关的禁用字符都不同
    - 第一关（**or**）：直接输入username的`admin‘ --`，即可
    - 第二关（**or and like = –**）：需要构造语句：`admin' union select * from users where '1`       where后面语句一直为真，所以从 `users` 表中选择所有用户名为 `admin` 的记录。
    - 第三关（**or and = like > < –**）：直接构造语句`admin';`，因为启用了多语句设置，可以进行分号，将AND password='1’进行无效化
    - 第四关（**or and = like > < – admin**）：`ad'||'min';` 延续第三关的思路，将admin进行连接操作，||为字符串连接操作符
    - 第五关（**or and = like > < – union admin**）：`ad'||'min';`延续上一关的输入，以不变应万变
24. Web Gauntlet2（**`or and true false union like = > < ; -- /* */ admin`**）：
    username:`ad'||'min`但是不能用分号了，所以构造密码语句。
    password:`' glob '*`
    `glob '*'`：这一条件使用了 `glob` 操作符，表示匹配所有密码。
25.  Web Gauntlet3(**`or and true false union like = > < ; -- /* */ admin`**）：和2一样的过滤条件，只是好像火狐浏览器有正确无法
26. #CBC位翻攻击 More Cookies：不知为何，这题的提示指向了同态加密，显然是不对的，这题需要借助CBC位翻攻击，攻击cookie
27. #MD5 It is my Birthday:提交两个相同md5的pdf即可
28. #sql Irish-Name-Repo 3:先抓包，发现有debug关键词，然后设置值为0，放，看到回显，然后发现有简单的加密，构造万能密码即可`'or 1=1--`
29. #exiftool Mob psycho:这是一道misc题，需要在本地更改图片原信息，然后上传到服务器验证，本关以闯关形式展示
    前六关可以用exiftool更改元数据，所以不做赘述
    ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/S127S.png)

    最后一关按照惯例更改，发现不可以改，于是搜索exiftool官网不可改的标签[三星标签](https://exiftool.org/TagNames/Samsung.html) ![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/U31289467128617293541.png)
    了解到不能写可能是因为读写策略。。。，但是可以在16进制编辑工具中更改
    最后在图片的最后发现了Image Date，很奇怪的日期1700513181420，百度一下可以发现是纪元时间，纪元时间从 1970 年开始，因此要设置为0，随后用0占位，更改为0000000000001即可[世纪时间戳阅读工具](https://www.epochconverter.com/) 
    
    通关图片:
    https://cdn.jsdelivr.net/gh/fakeppa/blog-img/original.jpg
    
30. Mob psycho：本题用unzip 解压apk包，然后用find命令递归查找flag
```bash
find . -type f -name "flag*"
```
打开，发现是一串十六进制数字，解密发现flag
31. 