---
icon: pen-to-square
date: 2025-01-09
tags: 
title: MCmod开发1.21.0
category:
  - 领域
---
# 01. 环境配置
mc转换时的Java环境配置，明明环境配置了java21，但是grandle还是指向Java17
解决方法：
在vscode左下角设置，然后点击子菜单的设置，然后搜索JAVA HOME,左侧栏选择grandle，在右侧选择中间的java home输入框，将本机的jdk21路径输入进去即可配置成功
