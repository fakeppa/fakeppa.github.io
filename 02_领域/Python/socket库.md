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

### 1、bind 函数

该函数是服务端函数，会将之前创建的套接字与指定的IP地址和端口进行绑定，使用点直接调用该方法，**以元组（host, port）的形式表示地址**。

比如我们绑定本地的 12345 端口：

```python
s.bind(('127.0.0.1', 12345))
```

### 2、listen 函数

该函数也是服务端函数，用于在使用TCP的服务端开启监听模式，只有一个参数，指定在拒绝连接之前，操作系统可以挂起的最大连接数量，该值至少为1，大部分应用程序设为 5 即可。

```python
s.listen(5)
```

3、accept 函数
当套接字处于监听状态时，可以通过 accept() 函数来接收客户端请求，该函数也是服务端函数，接受 TCP 连接并返回（conn,address），返回一个新的套接字来和客户端通信，其中 conn 是新的套接字对象，可以用来接收和发送数据，address 是连接客户端的地址。

比如我们就使用 conn 和 address 这两个参数（可自定义）来接收 accept 函数返回的值
```python
conn, address = s.accept()
```

4、connect 与 connect_ex 函数
connect() 是客户端程序用来连接服务端的方法，客户端连接到 address 处的套接字，一般 address 的格式为元组（host, port），如果连接出错，会返回 socket.error 错误。

比如我们连接到刚才创建的套接字，即本地的 12345 端口：

```python
import socket
 
c = socket.socket()
c.connect(('127.0.0.1', 12345))
```
