---
icon: pen-to-square
date: 2025-06-07
tags: 
title: socket库
category:
  - 领域
---
```python
scoket(family,type[,protocol])
```
创建套接字
第一个参数 family 是指定应用程序使用的通信协议的协议族，有：

|                 |                     |
| --------------- | ------------------- |
| Family参数        | 描述                  |
| socket.AF_UNIX  | 只能够用于单一的Unix系统进程间通信 |
| socket.AF_INET  | 服务器之间网络通信           |
| socket.AF_INET6 | IPv6                |
默认值为 AF_INET
Type参数

描述
socket.SOCK_STREAM
流式socket , 当使用TCP时选择此参数

socket.SOCK_DGRAM
数据报式socket ,当使用UDP时选择此参数

socket.SOCK_RAW
原始套接字，允许对底层协议如IP、ICMP进行直接访问

Type参数

描述
socket.IPPROTO_RAW
相当于protocol=255，此时socket只能用来发送IP包，而不能接收任何的数据。发送的数据需要自己填充IP包头，并且自己计算校验和。

socket.IPPROTO_IP
相当于protocol=0，此时用于接收任何的IP数据包。其中的校验和和协议分析由程序自己完成。
