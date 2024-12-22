---
icon: pen-to-square
date: 2024-12-10
category:
  - 资源
tags:
  - 可能用到
title: 主题vue常用命令
---

- `pnpm docs:dev` 启动开发服务器
- `pnpm docs:build` 构建项目并输出
- `pnpm docs:clean-dev` 清除缓存并启动开发服务器
# 文章常用标头
```md
---
cover: /assets/images/cover2.jpg   这是文章大图片
icon: pen-to-square   这是标题左侧的小icon
date: 2022-01-12    这是写作的日期，默认图标
category:    分类
  - 蔬菜
tag:    标签
  - 红
  - 圆
star: true   是否标星
sticky: true  不知道这是干啥的
---
```
# 主页标头
```js
另外的：
bgImage 和 bgImageDark 设置背景图片，
---
home: true 是否设置为主页
layout: BlogHome 是否为主页
icon: home 
title: 主页
heroImage: https://theme-hope-assets.vuejs.press/logo.svg --logo，可以用                                                                heroImageDark在夜间换一个logo
heroText: fake-blog 主标题
heroFullScreen: true
tagline: Be quite 副标题
projects:
  - icon: project
    name: 项目名称
    desc: 项目详细描述
    link: https://你的项目链接
  - icon: link
    name: 链接名称
    desc: 链接详细描述
    link: https://链接地址
  - icon: book
    name: 书籍名称
    desc: 书籍详细描述
    link: https://你的书籍链接
  - icon: article
    name: 文章名称
    desc: 文章详细描述
    link: https://你的文章链接
  - icon: friend
    name: 伙伴名称
    desc: 伙伴详细介绍
    link: https://你的伙伴链接
  - icon: https://theme-hope-assets.vuejs.press/logo.svg
    name: 自定义项目
    desc: 自定义详细介绍
    link: https://你的自定义链接
footer: 到底了:D
---
```
导航栏配置
```js
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
```