---
icon: pen-to-square
date: 2024-12-10
category:
  - 归档
tags: 
title: vuepress搭建博客教程
---

在Ubuntu系统中使用VuePress搭建博客的步骤如下：

1. **环境准备**：
   - 确保你的Ubuntu系统已经安装了Node.js和npm。如果没有安装，可以从Node官网下载安装包进行安装。
   - 安装Git，可以从git官网下载安装包进行安装。

2. **创建项目目录**：
   - 在Ubuntu中创建一个新的目录，用于存放博客项目，例如：
     ```
     mkdir my-blog
     cd my-blog
     ```
   - 使用npm初始化项目：
     ```
     npm init -y
     ```
   - 安装VuePress作为本地依赖：
     ```
     npm install -D vuepress
     ```

3. **创建文档目录和内容**：
   - 创建`docs`目录，并在其中创建`README.md`文件作为博客的首页：
     ```
     mkdir docs
     echo '# Hello VuePress' > docs/README.md
     ```
   - 确保`README.md`的编码格式为UTF-8，以避免乱码问题。

4. **配置VuePress**：
   - 在`docs`目录下创建`.vuepress`目录，并在其中创建`config.js`文件，用于配置网站的标题、描述等信息：
     ```javascript
     module.exports = {
       title: 'My Blog',
       description: 'A simple VuePress blog',
       base: '/', // 这是部署到github相关的配置
       markdown: {
       
         lineNumbers: false // 代码块显示行号
       },
       themeConfig: {
         nav: [ // 导航栏配置
           { text: 'Home', link: '/' },
           { text: 'About', link: '/about/' }
         ],
         sidebar: 'auto', // 侧边栏配置
         sidebarDepth: 2, // 侧边栏显示2级
       }
     };
     ```
   - 在`package.json`文件中添加启动命令：
     ```json
     {
       "scripts": {
         "dev": "vuepress dev docs",
         "build": "vuepress build docs"
       }
     }
     ```

5. **启动本地服务器**：
   - 运行以下命令启动本地开发服务器：
     ```
     npm run dev
     ```
   - VuePress会在`http://localhost:8080`启动一个热重载的开发服务器。

6. **编写文章**：
   - 在`docs`目录下新建`.md`文件来编写博客文章，使用Markdown语法。

7. **部署博客**：
   - 你可以选择将博客部署到GitHub Pages或者自己的服务器上。如果是部署到GitHub Pages，需要将代码推送到GitHub仓库，并在`config.js`中设置正确的`base`路径。

以上步骤可以帮助你在Ubuntu系统中使用VuePress搭建一个个人博客。更多高级配置和主题定制，可以参考VuePress的官方文档和相关主题的文档。
