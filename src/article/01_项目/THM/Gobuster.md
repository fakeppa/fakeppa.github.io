---
icon: pen-to-square
date: 2025-04-02
tags: 
title: Gobuster
category:
  - 项目
---
Gobuster是一个web目录爆破工具
```
Usage: gobuster [command]
```
用法，gobuster加参数
```bash
Available Commands:
completion Generate the autocompletion script for the specified     shell 
dir     Uses  directory/file enumeration mode 
dns     Uses DNS subdomain enumeration mode 
fuzz     Uses fuzzing mode. Replaces the keyword FUZZ in the URL, Headers and the request body 
gcs     Uses gcs bucket enumeration mode 
help     Help about any command 
s3     Uses aws bucket enumeration mode 
tftp     Uses TFTP enumeration mode 
version     shows the current version 
vhost     Uses VHOST enumeration mode (you most probably want to     use the IP address as the URL parameter)
```
可用命令：可以使用多个命令来帮助我们枚举目录、文件、DNS 子域等

|短标志|长旗|描述|
|---|---|---|
|`-t`|`--threads`|此标志配置用于扫描的线程数。这些线程中的每一个都以轻微的延迟发送请求。默认线程数为 10。使用大型单词列表时，此数字可能会很慢。您可以根据可用的系统资源增加或减少线程数。|
|`-w`|`--wordlist`|该标志配置用于迭代的 wordlist。每个单词列表条目都附加到您在命令中包含的 URL。|
||`--delay`|此标志定义在发送请求之间等待的时间。一些 Web 服务器包括通过查看在特定时间段内收到的请求数来检测枚举的机制。我们可以增加后续请求之间的延迟，使其看起来像正常的 Web 流量。|
||`--debug`|此标志可帮助我们在命令给出意外错误时进行故障排除。|
|`-o`|`--output`|此标志将枚举结果写入我们选择的文件。|
## web目录和文件枚举
gobuster

| flag | long-flag                  | 描述                                                                                 |
| ---- | -------------------------- | ---------------------------------------------------------------------------------- |
| `-c` | `--cookies`                | 此标志配置一个 Cookie 来传递每个请求，例如会话 ID。                                                    |
| `-x` | `--extensions`             | 此标志指定要扫描的文件扩展名。例如，.PHP、.js                                                         |
| `-H` | `--headers`                | 此标志配置一个完整的标头以与每个请求一起传递。                                                            |
| `-k` | `--no-tls-validation`      | 此标志跳过在使用 https 时检查证书的过程。CTF 活动或测试室（如 THM 上的活动或测试室）通常会使用自签名证书。这会导致在 TLS 检查期间出错。     |
| `-n` | `--no-status`              | 当您不想看到每个 收到响应。这有助于保持屏幕上的输出清晰。                                                      |
| `-P` | `password`                 | 您可以将此标志与 --username 标志一起设置，以执行经过身份验证的请求。当您从用户那里获取凭证时，这非常方便。                        |
| `-s` | `--status-codes`           | 使用此标志，您可以配置要显示的已接收响应的状态代码，例如 200，或者范围（如 300-400）。                                  |
| `-b` | `--status-codes-blacklist` | 此标志允许您配置不想显示的已接收响应的状态代码。配置此标志将覆盖 -s 标志。                                            |
| `-U` | `--username`               | 您可以将此标志与标志一起设置，以执行经过身份验证的请求。当您从用户那里获取凭证时，这非常方便。`--password`                        |
| `-r` | `--followredirect`         | 此标志将 Gobuster 配置为遵循它收到的重定向，作为对已发送请求的响应。HTTP 重定向状态代码（例如 301 或 302）用于将客户端重定向到其他 URL。 |
```
gobuster dir -u "http://www.example.thm" -w /path/to/wordlist
```
- `gobuster dir`：配置 Gobuster 使用目录和文件枚举模式。
- `-u http://www.example.thm`:
	该 URL 将是 Gobuster 开始查找的基本路径。
	- URL 必须包含使用的协议，在本例中为 HTTP。这很重要，也是必需的。如果传递了错误的协议，扫描将失败。
	  
	- 在 URL 的主机部分，您可以填写 IP 或 HOSTNAME。但是，值得一提的是，在使用 IP 时，您可能会定位与预期不同的网站。Web 服务器可以使用一个 IP 托管多个网站（这种技术也称为虚拟托管）。如果要确定，请使用 HOSTNAME。
	  
	- Gobuster 不会递归枚举。因此，如果结果显示您感兴趣的目录路径，则必须枚举该特定目录。

- `-w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`配置 Gobuster 以使用 _directory-list-2.3-medium.txt_ wordlist 进行枚举。单词列表的每个条目都附加到配置的 URL 中。

- `-r`将 Gobuster 配置为跟踪从发送的请求中收到的重定向响应。如果收到状态代码 301，Gobuster 将导航到响应中包含的重定向 URL。

## 子域枚举
gobuster dns

| flag | long-flag      | 描述                          |
| ---- | -------------- | --------------------------- |
| `-c` | `--show-cname` | 显示 CNAME 记录（不能与标志一起使用）。`-i` |
| `-i` | `--show-ips`   | 包含此标志会显示域和子域解析到的 IP 地址。     |
| `-r` | `--resolver`   | 此标志配置用于解析的自定义 DNS 服务器。      |
| `-d` | `--domain`     | 此标志配置要枚举的域。                 |
