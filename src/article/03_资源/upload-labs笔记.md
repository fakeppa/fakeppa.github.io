---
title: upload-labs笔记
icon: pen-to-square
date: 2022-01-01
category:
  - 资源
tags: []
---

- pass-01 ：
	本关上传漏洞由js验证，禁用js即可
- pass-02：
	查看提示看到是在服务端对数据的MIME进行检查，MIME验证就是验证文件的类型。修改文件类型即可，![Pasted image 20241128205732](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/Pasted%20image%2020241128205732.png)
	MIME类型（多用途互联网邮件扩展类型），是一种标准，用来表示文档、文件或字节流的本质和格式。这个标准在互联网上广泛应用，最初是为了解决电子邮件中文档的不同数据格式问题而设计的，后来它的应用扩展到了HTTP协议中，用于定义网络中传输数据的类型。

	- MIME类型在HTTP协议中通过Content-Type头部字段来指定，格式通常为类型/子类型，例如：
	
		text/html：表示HTML格式的文本文档
		image/jpeg：表示JPEG格式的图片
		application/json：表示JSON格式的数据
		audio/mpeg：表示MP3或其他MPEG音频
		video/mp4：表示MP4视频文件d
- pass-03：后缀黑名单绕过
	用php3格式上传即可
- pass-04：.htaccess文件绕过
  htaccess文件是Apache服务器中的一个配置文件，它负责相关目录下的网页配置。
  1. 先上传一个png格式的一句话木马，不做改变
  2. 创建.htaccess文件，内容：
```
SetHandler application/x-httpd-php
```
- pass-05:大小写绕过
  上传php文件时将php替换为Php或其他即可
- pass-06：空格绕过
  可以通过对文件后缀名末尾进行添加空格的方式来进行绕过。
- pass-07：加点绕过
  没有过滤后缀名之后的点，加点即可绕过
- pass-08：字符串绕过
  没有过滤字符串后缀名的字符串
  用添加::$DATA绕过
- pass-09: 这是一个代码逻辑错误，正则表达式只匹配一次，所以可以多加点和空格绕过
- pass-10:复写绕过
  由于只是把黑名单内的后缀删除，但是正常上传，所以可以用复写后缀的方式上传
