---
icon: pen-to-square
date: 2025-04-02
tags: 
title: Hydra
category:
  - 项目
---
Hydra是一个互联网协议爆破工具，支持ssh和web表单
## ssh
```bash
hydra -l <username> -P <full path to pass> MACHINE_IP -t 4 ssh
```
-l:指定用于登录的(SSH)用户名
-P:表示密码列表
-t:设置要生成的线程数

## web表单
```bash
sudo hydra <username> <wordlist> MACHINE_IP http-post-form "<path>:<login_credentials>:<invalid_response>"
```
-l:web表单登录的用户名
-P:要使用的怒那课表
http-post-form:表单类型为POST
`<PATH>`:登录页面的url
`<login_credentials>`:用于登录的·1用户名和密码的POST形式
<invalid_response>:登录失败时的响应
-V:详细输出
