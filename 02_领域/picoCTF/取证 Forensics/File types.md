---
icon: pen-to-square
date: 2024-12-19
tags:
  - picoCTF
title: File types
category:
  - 领域
---
# File types
Author: Geoffrey Njogu
#### Description
This file was found among some files marked confidential but my pdf reader cannot read it, maybe yours can.You can download the file from [here](https://artifacts.picoctf.net/c/82/Flag.pdf).
#### Hints
Remember that some file types can contain and nest other files

----
## 解题
本文提供了一个pdf文件，但是打不开，尝试文本文档打开，发现似乎是一个脚本，在linux终端的脚本
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219140541.png)
1. 随后更改文件后缀为.sh去执行这个文件

```
mv flag.pdf flag.sh
./flag.sh
```

2. 发现一个flag文件,查看文件类型发现是一个ar归档文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141031.png)

3. 用递归`ar -x file`去提取文件得到 `cpio` 归档文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141205.png)

4. 用`cpio -i < flag`去提取文件,但是要先改名，之后再提取，否则会重名冲突
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142028.png)


5. 发现bzip文件,用`bzip2 -d flag`解压缩bzip文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142516.png)
 
 
 6. 发现gzip文件flag.out
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142652.png)
7. 先把flag.out文件改为flag.gz，然后用`gzip -d filename.gz`解压gzip文件即可
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219143642.png)
获得lzip文件

8. 先对lzip文件进行改名，再用`lzip -d flag.lz`对文件进行提取
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219143938.png)
获得LZ4文件

9. 先对flag进行改名>flag.lz4,然后执行`lz4 -dv flag.lz4`
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219144335.png)
获得LZMA文件

10. 先对flag进行改名，在用`lzma -dv flag.lzma`提取lzma文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219144649.png)
获得lzop文件

11. 先对文件进行改名lzop，再用`lzop -d filename`提取文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219145137.png)
获得lzip文件

12. 先对文件进行改名lzip，再用`lzip -d filename`提取文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219145639.png)
获得XZ文件

13. 先对文件进行改名xz,然后用`xz -d filename`提取文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219145903.png)

14. 发现ASCII text文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219150104.png)
不能直接查看

```bash
cat flag | xxd -r -d > original_file
```
- :这个符号是管道符，它将前一个命令的输出作为下一个命令的输入。
- **`xxd -r -p`**：这个命令用于将十六进制转储还原为原始数据。
	
    - `-r` 选项表示 "reverse"，即从十六进制转储还原为原始数据。
    - `-p` 选项表示输出格式为纯十六进制数据，没有地址偏移和ASCII表示。

15. `cat original_file`获得flag

`picoCTF{f1len@m3_m@n1pul@t10n_f0r_0b2cur17y_950c4fee}`

## 总结：
1. **.sh为shell脚本**：用./filename来执行脚本
   
2. **不需要改后缀就可以解压的**：ar归档文件，cpio归档文件（这个格式的文件很特别，他会覆盖掉原本的文件，因此会产生命名冲突），bzip2文件
   
3. **需要改后缀才能解压的**：`.gz`，`.lz`，`.lz4`，`.lzma`，`.lzop`，`.lzip`，`.xz`
   
4. **关于解压命令**：
   `-d`:`.gz`，`.lz`，`.lz4`，`.lzma`，`.lzop`，`.lzip`，`.xz`。
   `-x`:`ar`
   `-i`:`cpio`
