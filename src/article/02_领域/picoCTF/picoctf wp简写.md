---
icon: pen-to-square
date: 2024-12-10
category:
  - 领域
tags:
  - 持续进行
title: picoctf wp
---

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
24. 图片隐写：zesteg直接一把梭
- 第一关（**or**）：直接输入username的`admin‘ --`，即可

- 第二关（**or and like = –**）：需要构造语句：`admin' union select * from users where '1`       where后面语句一直为真，所以从 `users` 表中选择所有用户名为 `admin` 的记录。

- 第三关（**or and = like > < –**）：直接构造语句`admin';`，因为启用了多语句设置，可以进行分号，将AND password='1’进行无效化

- 第四关（**or and = like > < – admin**）：`ad'||'min';` 延续第三关的思路，将admin进行连接操作，||为字符串连接操作符

- 第五关（**or and = like > < – union admin**）：`ad'||'min';`延续上一关的输入，以不变应万变

25. Web Gauntlet2（**`or and true false union like = > < ; -- /* */ admin`**）：
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
31. endianness-v2：根据描述可知，从32位的系统中恢复的文件，还说到字节组织的方式很奇怪，可知，这个文件应该通过交换字节序解决。
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241213192402.png)
32. MSB:打开附件图片发现有图片颜色有问题，所以可以判断这是一道图片rgb通道隐写题，通过StegSolve-1.4工具，可以单独查看图片的颜色通道，随后用内置的16进制查看器，发现rgb通道7有数据，导出后搜索pico可以发现flag
33. #binwalk hideme:发现一张图片，尝试16进制查看，查看颜色通道，查看exif，都没有发现有用信息，最后用了binwalk查看隐写压缩文件，最后发现文件
34. #流量分析 FindAndOpen：本题需要观察每一个流量包，查看date内容是否可疑，然后可以发现一个全部由base64编码的文件，解码文件后可以看到picoCTF字段的内容，这就是密码，解开zip文件可以看到flag
35. #python代码审计 Python Wrangling：对源码进行审计，输入对应的参数及解密文档，可以获得flag