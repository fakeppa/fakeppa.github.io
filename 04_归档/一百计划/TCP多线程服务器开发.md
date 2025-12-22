---
tags: 
icon: pen-to-square
date: 2025-06-09
title: TCP多线程服务器开发
category:
  - 项目
---
## 创建一个Queue
```
name=Queue()
```
放入队列
```
name.put(neirong)
```
取出队列内容
```
na=name.get()
```


## 创建多线程队列
`import multiprocessing`导包语句
```python
q = multiprocessing.Queue()
```
其余方法无异