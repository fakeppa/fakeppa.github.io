---
icon: pen-to-square
date: 2025-04-22
tags: 
title: Metasploit小技巧
category:
  - 项目
---
## search小技巧
**一、基础语法拆解**
  ```bash
  search [过滤条件1] [过滤条件2] ... [过滤条件N]
  ```
  • `type:post`  

    限定搜索后渗透模块（Post-Exploitation），排除其他类型（如`exploit`、`auxiliary`）。
  
  • `platform:windows`  

    仅显示支持Windows平台的模块。

  • `name:meterpreter`  

    筛选模块名称中包含`meterpreter`的模块（模糊匹配）。

---

**二、高级搜索技巧**
**1. 多条件组合筛选**
  ```bash
  # 组合类型、平台、名称、作者
  search type:post platform:windows name:hashdump author:hdm
  ```

**2. 按漏洞利用等级过滤**
  ```bash
  # 仅显示"excellent"或"great"级别的模块
  search type:post platform:windows rank:excellent
  ```

**3. 按模块功能描述搜索**
  ```bash
  # 在模块描述中搜索关键词（如"hash"）
  search type:post platform:windows -S hash
  ```

**4. 通配符模糊匹配**
  ```bash
  # 搜索名称以"persist"开头的模块
  search type:post name:persist*
  ```

**5. 排除特定条件**
  ```bash
  # 排除"linux"平台模块
  search type:post platform:-linux
  ```

---

**三、实战场景示例**
**场景1：快速查找Windows哈希提取模块**
  ```bash
  msf6 > search type:post platform:windows name:hashdump

  Matching Modules
  ================

     #  Name                          Disclosure Date  Rank    Check  Description
     -  ----                          ---------------  ----    -----  -----------
     0  post/windows/gather/hashdump                   normal  No     Windows Gather Local User Account Password Hashes (Registry)
  ```

**场景2：查找所有支持Meterpreter的提权模块**
  ```bash
  msf6 > search type:post name:escalate platform:windows -S meterpreter

  # 输出示例
  post/windows/escalate/golden_ticket          normal  No  Windows Escalate Golden Ticket (需Meterpreter会话)
  ```

---

**四、搜索优化建议**
1. 优先使用短关键词  
   如`name:persist`比`name:persistence`更高效。

2. 活用描述搜索`-S`  
   当不记得模块名时，用功能描述关键词（如`-S "dump password"`）。

3. 按模块更新时间排序  
   ```bash
   # 显示最近更新的前10个模块
   search type:post platform:windows -o /tmp/results.txt
   cat /tmp/results.txt | head -n 10
   ```

4. 保存常用搜索条件  
   将高频命令写入`.msf4/history`文件快速调用。

---

**五、常见错误排查**
| 问题现象                    | 解决方案                          |
|----------------------------|-----------------------------------|
| 无匹配结果                 | 放宽条件（如移除`name`限制）       |
| 模块名称部分匹配失效        | 检查拼写或改用通配符（`name:hash*`） |
| 描述搜索`-S`不生效         | 确保关键词在模块描述中存在         |

---

**六、扩展知识：其他过滤条件**
| 条件            | 作用                          | 示例                   |
|-----------------|-------------------------------|------------------------|
| `author:`       | 按作者过滤                    | `author:metasploit`    |
| `path:`         | 按模块路径过滤                | `path:gather/`         |
| `check:true`    | 仅显示支持检查的模块          | `type:exploit check:true` |
| `app:server`     | 针对服务器应用的模块          | `platform:windows app:server` |



## 后台session小技巧
#### 1. ​**​列出所有会话​**​

```bash
msf6 > sessions
```

#### 2. ​**​切换到指定会话（前台激活）​**​

```bash
msf6 > sessions -i 1   # 激活ID为1的会话
```

#### 3. ​**​将当前会话放入后台​**​

```bash
meterpreter > background  # 快捷键Ctrl+Z
```

### **二、高级技巧：会话管理与升级​**​

#### 1. ​**​会话筛选（按类型/平台）​**​


```bash
msf6 > sessions -u       # 仅显示可升级的会话
msf6 > sessions -v       # 按平台过滤（如windows,linux）
```

#### 2. ​**​普通Shell升级为Meterpreter​**​


```bash
msf6 > use post/multi/manage/shell_to_meterpreter
msf6 post(shell_to_meterpreter) > set SESSION 2  # 目标会话ID
msf6 post(shell_to_meterpreter) > run
```

#### 3. ​**​会话路由设置​**​


```bash
meterpreter > run autoroute -s 10.10.111.0/24  # 添加内网路由
meterpreter > run autoroute -p                  # 查看当前路由表
```

## 