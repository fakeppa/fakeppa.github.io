---
icon: pen-to-square
date: 2024-12-10
category:
  - 项目
tags: 
title: linux学习笔记
---

# linux学习笔记

1.使用proxychains连接socks服务器：proxychains curl http://example.com

2.用proxychains连接服务器proxychains sudo npm install -D vuepress

# 命令:
- date:查看当前时间
- #### 4. 启动 SSH 服务

如果 SSH 服务未运行，可以启动它。使用以下命令：

```bash
sudo service ssh start
```
# 给予权限的命令
- 给予root看读写文件权限
	1. **给予root用户对文件的读写权限**：
	    
	    bash
	    
	    ```bash
	    sudo chmod 644 filename
	    ```
	    
	    这里，`6` 表示用户（owner）有读写权限，`4` 表示组（group）有读权限，`4` 表示其他用户（others）有读权限。`filename` 是你想要改变权限的文件名。
	    
	2. **给予root用户对目录的读写权限**：
	    
	    bash
	    
	    ```bash
	    sudo chmod 755 directoryname
	    ```
	    
	    这里，`7` 表示用户有读、写和执行权限，`5` 表示组有读和执行权限，`5` 表示其他用户有读和执行权限。`directoryname` 是你想要改变权限的目录名。
	    
	3. **递归地给予root用户对目录及其内容的读写权限**：
	    
	    bash
	    
	    ```bash
	    sudo chmod -R 755 directoryname
	    ```
	    
	    `-R` 选项表示递归地应用权限更改，即目录下的所有文件和子目录都将获得相同的权限。
	    
	4. **给予所有用户对文件的读写权限**：
	    
	    bash
	    
	    ```bash
	    sudo chmod 666 filename
	    ```
	    
	    这将给予文件所有者、组和其他用户读写权限。
- ls操作指南
	1. . `-l`：长格式列出信息。显示文件的详细信息，包括文件权限、所有者、大小和最后修改时间。
	    
	2. `-a`：显示所有文件，包括以`.`开头的隐藏文件。默认情况下，`ls` 不会显示隐藏文件。
	    
	3. `-A`：显示所有文件，但不包括 `.` 和 `..`。
	    
	4. `-h`：以易读的格式显示文件大小（例如，以 K、M、G 为单位）。
	    
	5. `-R`：递归地列出所有子目录中的文件。
	    
	6. `-S`：根据文件大小排序。
	    
	7. `-t`：根据文件的修改时间排序，最新的文件在前。
	    
	8. `-r`：逆序排序。
	    
	9. `-v`：版本排序，如果文件名包含版本号，则按版本号排序。
	    
	10. `-i`：显示文件的inode号。
	    
	11. `-s`：显示文件大小（以 512 字节块为单位）。
	    
	12. `-F` 或 `-p`：在每个文件名后加上一个字符以表示文件类型（/ 表示目录，* 表示可执行文件等）。
	    
	13. `--color=<when>`：控制何时使用颜色。`<when>` 可以是 `never`、`always` 或 `auto`。
	    
	14. `-1`：使输出结果一行一个文件，方便管道到其他命令。
	    
	15. `-G` 或 `--no-group`：在长格式输出中不显示文件的所有者组。
	    
	16. `-H`：将符号链接的目标文件以文件名的形式显示，而不是显示为链接。
	    
	17. `--time-style=<style>`：指定时间的显示格式。
	    
	18. `-X`：根据文件扩展名排序。
	    
	19. `--full-time`：在长格式输出中显示完整的时间信息。
	    
	20. `-L`：如果遇到符号链接，就列出链接指向的文件的信息，而不是链接本身的信息。
	    
	21. `--`：表示参数列表的结束，之后的参数不会被视为 `ls` 的参数。

# proxychains

配置：socks4 ip+端口号
36.151.65.234 密码：5d03e096-378e-4bb8-8d63-9325447db70f

# docker 教程

sudo systemctl start docker启动docker

docker run 镜像id

docker ps查看已运行程序

docker仓库配置位置/etc/docker/daemon.json，修改地址即可

docker镜像拉取:	1.docker镜像搜索docker research 镜像名称

​				   2.docker镜像拉取：docker pull [name]

# 创建并运行容器

接下来，您可以使用以下命令创建并运行 SQLi Labs 的 Docker 容器：

```bash
docker run -d -p 80:80 --name sqli-labs citizenstig/sqli-labs
```

- `-d`：表示以分离模式运行容器。（后台运行）

- `-p 80:80`：将容器的 80 端口映射到主机的 80 端口。

- `--name sqli-labs`：为容器指定一个名称。

  # docker help

  旗帜简写 -h 已被弃用，请使用 --help。

  用法：docker [选项] 命令

  一个自给自足的容器运行时

  常用命令：
    run         从镜像创建并运行一个新容器

   exec        在运行中的容器中执行命令

   ps          列出容器

   build      根据Dockerfile构建镜像

   pull       从注册中心下载镜像

   push       将镜像上传到注册中心

   images      列出镜像

   login       登录到注册中心

   logout      从注册中心注销

   search      在Docker Hub搜索镜像

   version    显示Docker版本信息

    info        显示系统范围的信息

  管理命令：

  builder     管理构建

  buildx*     Docker Buildx
    compose*    Docker Compose
    container   管理容器
    context     管理上下文
    image       管理镜像
    manifest    管理Docker镜像清单和清单列表
    network     管理网络
    plugin      管理插件
    system      管理Docker
    trust       管理Docker镜像的信任
    volume      管理卷

  Swarm命令：

   swarm       管理Swarm

  命令：

   attach      将本地标准输入、输出和错误流附加到运行中的容器

  commit      根据容器的更改创建新镜像

    cp          在容器和本地文件系统之间复制文件/文件夹

   create      创建一个新容器

    diff        检查容器文件系统上的文件或目录的更改

   events      从服务器获取实时事件

    export      将容器的文件系统导出为tar归档

   history     显示镜像的历史

    import      从tar球导入内容以创建文件系统镜像

  inspect     返回Docker对象的低级信息

    kill        杀死一个或多个运行中的容器

  load        从tar归档或STDIN加载镜像

    logs        获取容器的日志

   pause       暂停一个或多个容器中的所有进程

  port        列出端口映射或容器的特定映射

  rename      重命名容器

  restart     重启一个或多个容器

  rm          移除一个或多个容器

  rmi         移除一个或多个镜像

  save        将一个或多个镜像保存到tar归档（默认流式传输到STDOUT）

  start       启动一个或多个已停止的容器

  stats       显示一个或多个容器资源使用情况的实时流

  stop        停止一个或多个运行中的容器

  tag         创建一个指向源镜像的目标镜像的标签

  top         显示容器的运行进程

  unpause     取消暂停一个或多个容器中的所有进程

   update      更新一个或多个容器的配置

  wait        阻塞直到一个或多个容器停止，然后打印它们的退出代码

  全局选项：
        --config string      客户端配置文件的位置（默认 "/root/.docker"）
    -c, --context string     用于连接守护进程的上下文名称（覆盖DOCKER_HOST环境变量和默认上下文设置 "docker context use"）
    -D, --debug              启用调试模式
    -H, --host list          连接到守护进程的守护套接字
    -l, --log-level string   设置日志级别（"debug", "info", "warn", "error", "fatal"）(默认 "info")
        --tls                使用TLS；由 --tlsverify 暗示
        --tlscacert string   仅信任由这个CA签名的证书（默认 "/root/.docker/ca.pem"）
        --tlscert string     TLS证书文件的路径（默认 "/root/.docker/cert.pem"）
        --tlskey string      TLS密钥文件的路径（默认 "/root/.docker/key.pem"）
        --tlsverify          使用TLS并验证远程
    -v, --version            打印版本信息并退出

# 要进入Docker容器的目录，
你可以使用以下指令：

1. **首先，找到正在运行的容器的ID或名称**：
    
    ```bash
    docker ps
    ```
    
2. **使用`docker exec`命令进入容器**：
    
    ```bash
    docker exec -it <container_id_or_name> /bin/bash
    ```
    
    这里，`<container_id_or_name>`是你在第一步中找到的容器ID或名称。`/bin/bash`是你要进入的Shell类型，通常大多数Linux容器都支持。
    
3. **如果容器中没有`bash`，可以尝试使用`sh`**：
    
    ```bash
    docker exec -it <container_id_or_name> /bin/sh
    ```

# tmux常用命令

以下是一些常用的 `tmux` 命令和快捷键：

- **创建新窗口**：
    
    - 在 `tmux` 会话中，按下 `Ctrl + b`，然后按 `c`。
- **切换窗口**：
    
    - 按下 `Ctrl + b`，然后按 `n` 切换到下一个窗口。
    - 按下 `Ctrl + b`，然后按 `p` 切换到上一个窗口。
- **分割窗格**：
    
    - 垂直分割：按下 `Ctrl + b`，然后按 `%`。
    - 水平分割：按下 `Ctrl + b`，然后按 `"`。
- **在窗格之间切换**：
    
    - 按下 `Ctrl + b`，然后使用方向键（上、下、左、右）切换到不同的窗格。
- **关闭窗格或窗口**：
    
    - 在窗格中输入 `exit` 或按 `Ctrl + d` 关闭当前窗格。
    - 要关闭整个窗口，您可以在窗口中输入 `exit`。
- **分离会话**：
    
    - 按下 `Ctrl + b`，然后按 `d`，这将分离当前会话并返回到普通终端。
- **重新连接会话**：
    
    - 使用以下命令列出所有会话：
        
        ```bash
        tmux ls
        ```
        
    - 重新连接到会话：
        
        ```bash
        tmux attach-session -t <session_name>
        ```
        

### 退出 tmux

要完全退出 `tmux` 会话，您可以在所有窗格中输入 `exit`，或者按下 `Ctrl + b`，然后按 `d` 分离会话后再关闭终端。
# git基本操作 #git
 以下是 Git 的一些基本操作，包括初始化仓库、添加文件、提交更改、查看状态和历史记录等。这些操作是使用 Git 进行版本控制的基础。

### 1. 初始化 Git 仓库

在项目目录中初始化一个新的 Git 仓库：

```bash
git init
```

### 2. 查看当前状态

查看当前工作目录和暂存区的状态，包括未跟踪的文件、已修改的文件等：

```bash
git status
```

### 3. 添加文件到暂存区

将文件添加到暂存区，以便在下次提交时包含这些更改：

```bash
git add <file_name>
```

例如，添加一个名为 `example.txt` 的文件：

```bash
git add example.txt
```

要添加所有更改的文件，可以使用：

```bash
git add .
```

### 4. 提交更改

将暂存区的更改提交到本地仓库，并附上提交信息：

```bash
git commit -m "Your commit message"
```

例如：

```bash
git commit -m "Add example.txt with initial content"
```

### 5. 查看提交历史

查看项目的提交历史记录：

```bash
git log
```

可以使用 `--oneline` 选项以简洁的格式查看：

```bash
git log --oneline
```

### 6. 查看文件的更改

查看某个文件的具体更改：

```bash
git diff <file_name>
```

### 7. 创建分支

创建一个新的分支：

```bash
git branch <branch_name>
```

例如：

```bash
git branch feature-branch
```

### 8. 切换分支

切换到指定的分支：

```bash
git checkout <branch_name>
```

例如：

```bash
git checkout feature-branch
```

### 9. 合并分支

将一个分支的更改合并到当前分支：

```bash
git merge <branch_name>
```

例如，将 `feature-branch` 合并到当前分支：

```bash
git merge feature-branch
```

### 10. 删除分支

删除一个不再需要的分支：

```bash
git branch -d <branch_name>
```

例如：

```bash
git branch -d feature-branch
```

### 11. 克隆远程仓库

从远程仓库克隆一个项目到本地：

```bash
git clone <repository_url>
```

例如：

```bash
git clone https://github.com/user/repo.git
```

### 12. 推送更改到远程仓库

将本地的提交推送到远程仓库：

```bash
git push origin <branch_name>
```

例如：

```bash
git push origin main
```

### 13. 拉取远程仓库的更改

从远程仓库拉取最新的更改并合并到当前分支：

```bash
git pull origin <branch_name>
```

例如：

```bash
git pull origin main
```

# 查看dns解析后的ip地址
**使用`dig`命令**：`dig`（Domain Information Groper）是一个功能强大的命令行工具，用于查询DNS信息。例如，要查询域名`example.com`的DNS解析结果，可以使用以下命令：

复制

```text
dig example.com
```

# 杀掉指定进程
1. 查找进程
	```bash
	ps aux | grep 进程名
	```
2. 杀掉进程
	```
	kill -9 PID
	```
