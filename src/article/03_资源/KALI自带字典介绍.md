---
icon: pen-to-square
date: 2025-06-07
tags: 
title: KALI自带字典介绍
category:
  - 资源
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




## 生成自定义字典

密码生成工具
Kali Linux 提供了多个强大的工具来生成自定义密码字典，下面将介绍其中几款常用的工具，包括 Crunch、cewl 和 CUPP。这些工具可以帮助渗透测试人员根据不同场景定制密码字典，从而提高攻击效率。

1. Crunch
Crunch 是一款功能强大且灵活的密码字典生成工具，广泛用于生成基于自定义规则的密码组合。它支持用户指定字符集、密码长度、格式规则以及外部字符集文件，适用于密码破解、渗透测试等场景。

语法格式：
crunch <最小长度> <最大长度> [字符集] [选项]
AI写代码
bash
1
核心功能：
根据指定的字符集和长度生成所有可能的密码组合。
支持通过规则文件（字符集列表）自定义复杂字符集。
提供格式化模板（如 -t）生成特定模式的密码。
可限制输出文件大小，适合生成大型字典。
常见选项：
-o <文件路径>：指定字典输出文件（如 password_list.txt）。
-b <大小>：限制输出文件大小（支持 KB、MB、GB，如 -b 500mb）。
-t <模板>：定义密码格式，常用占位符包括：
@：小写字母（a-z）。
,：大写字母（A-Z）。
%：数字（0-9）。
^：特殊字符（!@#$ 等）。
-f <字符集文件>：从外部文件加载字符集（如 /usr/share/crunch/charset.lst）。
-l <字符集>：与 -t 配合，指定占位符的自定义字符集。
-z <压缩格式>：将输出文件压缩为 gzip、bzip2 或 lzma 格式，节省存储空间。
规则文件说明：
Crunch 内置的字符集文件（如 /usr/share/crunch/charset.lst）包含多种预定义字符集，例如：

mixalpha: 混合大小写字母（a-zA-Z）。
mixalpha-numeric: 混合大小写字母和数字（a-zA-Z0-9）。
mixalpha-numeric-space: 混合大小写字母、数字和空格。
symbols: 特殊字符（如 !@#$%^&*）。


通过 -f 选项加载这些字符集，可以快速生成符合特定需求的密码字典。例如，mixalpha-numeric-space 适用于生成包含字母、数字和空格的复杂密码。

示例 1：基本用法
生成密码长度为 8 到 10 位的字典，字符集为大写字母、小写字母和数字，输出到桌面：

crunch 8 10 ABCDEFGabcdefg0123456789 -o ~/Desktop/password_list.txt
AI写代码
bash
1
说明：此命令生成包含指定字符集的所有可能组合，适合简单密码猜测。

示例 2：使用规则文件和模板
生成 6 位密码，格式为 bfs 开头，后跟 3 个占位符，基于 mixalpha-numeric-space 字符集：

crunch 6 6 -t bfs@@@ -f /usr/share/crunch/charset.lst mixalpha-numeric-space -o dict.txt
AI写代码
bash
1
命令解析：

6 6：生成固定 6 位密码。
-t bfs@@@：密码前 3 位固定为 bfs，后 3 位为小写字母（@ 表示 a-z），但是实际上是占位符，以加载的字符集为准。
-f /usr/share/crunch/charset.lst mixalpha-numeric-space：从字符集文件中加载 mixalpha-numeric-space（包含 a-zA-Z0-9 和空格）。
-o dict.txt：将生成的字典保存到 dict.txt。
注意事项：
生成的字典可能占用大量磁盘空间，建议使用 -b 限制文件大小或 -z 压缩输出。
使用规则文件时，需确保字符集文件路径正确（如 /usr/share/crunch/charset.lst）。
对于复杂模板，建议先测试小规模生成以验证格式。
2. CeWL
CeWL（Custom Word List Generator）是一款针对网站内容的爬虫工具，专门用于从目标网站提取单词并生成定制化密码字典。它通过分析网页内容，提取有意义的单词，特别适合社会工程攻击或针对特定目标的密码猜测。

基本用法：
cewl -w <输出文件> -d <爬取深度> <目标网址>
AI写代码
bash
1
示例：从目标网站爬取单词，生成字典：

cewl -w ~/Desktop/website_wordlist.txt -d 5 http://example.com
AI写代码
bash
1
说明：爬取 http://example.com 及其链接页面（深度 5 层），将提取的单词保存到 website_wordlist.txt。

核心功能：
爬取目标网站，提取页面中的单词。
支持过滤单词长度和出现频率。
可结合社会工程信息生成高度针对性的字典。
常用选项：
-w <文件路径>：指定输出字典文件。
-d <深度>：设置爬取深度（默认 2，值越大爬取范围越广）。
-m <长度>：过滤小于指定长度的单词（如 -m 5 仅保留 5 字符以上的单词）。
-n：包含数字（如电话号码、日期等）。
-v：启用详细模式，显示爬取进度和详细信息。
-e：提取电子邮件地址并包含在字典中。
-a：爬取元数据（如作者、关键字），丰富字典内容。
示例
爬取目标网站，生成包含 5 字符以上单词的字典，并提取元数据：

cewl -w ~/Desktop/website_wordlist.txt -d 5 -m 5 -a http://example.com
AI写代码
bash
1
说明：

-d 5：爬取 5 层深度的页面。
-m 5：仅保留长度 ≥ 5 的单词。
-a：提取页面元数据（如 <meta> 标签中的关键字）。
输出保存到 ~/Desktop/website_wordlist.txt。
使用场景：
社会工程攻击：通过分析公司网站提取员工姓名、产品名称等生成字典。
目标定制化：结合目标网站的行业术语生成高相关性密码。
组合使用：将 CeWL 生成的字典与 Crunch 结合，进一步扩展密码组合。
3. CUPP
CUPP （Common User Passwords Profiler）是一款社交工程学字典生成工具，专门用于根据目标用户的个人信息生成定制的密码字典。它可以根据目标的个人信息（如姓名、生日、邮箱、兴趣等）生成可能的密码组合，并提高暴力破解攻击的成功率。CUPP 可以通过交互式的问答方式，帮助渗透测试人员快速生成密码字典。

常用选项
-i: 启动交互模式，引导输入目标信息。
-q: 安静模式，减少输出信息。
-l: 加载预定义单词列表，扩展字典。
-a: 结合外部文件（如 CeWL 生成的单词列表）生成字典。
可选信息
姓名：目标全名（如 John Smith）。
昵称：目标常用昵称或ID（如 Johnny）。
生日：目标出生日期（如 1990-05-15）。
兴趣：目标兴趣爱好或常用单词（如 football、music）。
宠物：目标宠物名称（如 Max）。
其他：配偶、孩子、公司名称等。
CUPP 根据输入信息生成字典，包含：

名字、昵称的变体（大小写、拼写变化）。
生日相关组合（如 1990、0515、90）。
兴趣、宠物名称的组合。
Leet 变换（如 password → p4ssw0rd、John → J0hn）。
常见后缀（如 123、!）和替换规则。
基本用法
cupp -i
AI写代码
bash
1
运行后，CUPP 进入交互模式，提示用户输入目标信息以生成字典。



交互过程示例：

[+] Insert information about the victim to make a dictionary
[+] What's his/her full name? John Smith
[+] What's his/her nickname? Johnny
[+] Birthdate (DDMMYYYY)? 15051990
[+] Any hobbies? football
[+] Pet's name? Max
[+] Output file: johnsmith.txt

生成结果（johnsmith.txt 可能包含）：

John1990
JohnnyMax
SmithFootball123
Leet 变体：J0hnSm1th、F00tb4ll、M4x1990
使用场景
社会工程攻击：基于目标公开信息（如社交媒体）生成密码。
靶机测试：当靶机提示 leet 变换，CUPP 是首选工具，快速生成变体密码。
渗透测试：生成特定用户的潜在密码列表，结合 leet 规则提升效率。
注意事项
输入信息越详细，字典越精准，但需确保信息来源合法。
Leet 变体会显著增加字典大小，建议结合工具（如 grep）过滤无关条目。
使用前确认测试环境合法性，避免违反法律或道德规范。
综合对比
Crunch：适合生成包含各种字符组合的字典，灵活性高，适用于需要自定义规则的场景。
cewl：通过爬取网站内容生成字典，适合针对特定网站或目标进行定制化攻击。
CUPP：针对社工攻击场景，基于目标的个人信息生成密码字典，能提高攻击成功率。
总结
Kali Linux 提供了丰富的字典资源和强大的密码字典生成工具，适用于各种渗透测试和密码破解任务。通过合理选择字典文件和工具，渗透测试人员能够快速高效地进行密码攻击和漏洞测试。

字典资源：wordlists 和 seclists 提供了广泛的字典，适用于不同的渗透测试场景。
密码生成工具：Crunch 和 cewl 等工具能够帮助用户根据具体需求生成定制化的密码字典。
结合具体的测试目标和需求，渗透测试人员可以选择合适的字典文件和工具，提升攻击的成功率。希望本文的介绍能帮助您更好地理解和使用 Kali Linux 提供的字典资源与工具，提升渗透测试的效率和效果。




## 参考链接：
[Kali 自带字典及密码生成工具介绍_kali字典-CSDN博客](https://blog.csdn.net/2301_79518550/article/details/145257558)