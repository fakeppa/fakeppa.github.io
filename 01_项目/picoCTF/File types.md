---
icon: pen-to-square
date: 2024-12-19
tags: 
title: File types
category:
  - 项目
---
Author: Geoffrey Njogu
#### Description

This file was found among some files marked confidential but my pdf reader cannot read it, maybe yours can.You can download the file from [here](https://artifacts.picoctf.net/c/82/Flag.pdf).
##### hint
Remember that some file types can contain and nest other files

## 解题
本文提供了一个pdf文件，但是打不开，尝试文本文档打开，发现似乎是一个脚本，在linux终端的脚本
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219140541.png)
随后更改文件后缀为.sh去执行这个文件

```
mv flag.pdf flag.sh
./flag.sh
```

发现一个flag文件,查看文件类型发现是一个ar归档文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141031.png)

用递归`ar -x file`去提取文件得到 `cpio` 归档文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141205.png)

用`cpio -i < flag`去提取文件,但是要先改名，之后再提取，否则会重名冲突
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142028.png)


发现bzip文件,用`bzip2 -d flag`解压缩bzip文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142516.png)


发现gzip文件flag.out
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142652.png)

先把flag.out文件改为flag.gz，然后用`gzip -d filename.gz`解压gzip文件即可

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219143642.png)
获得lzip文件

先对lzip文件进行改名，再用`lzip -d flag.lz`对文件进行提取
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219143938.png)
获得LZ4文件



