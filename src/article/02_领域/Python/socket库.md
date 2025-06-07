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

### 3、accept 函数
当套接字处于监听状态时，可以通过 accept() 函数来接收客户端请求，该函数也是服务端函数，接受 TCP 连接并返回（conn,address），返回一个新的套接字来和客户端通信，其中 conn 是新的套接字对象，可以用来接收和发送数据，address 是连接客户端的地址。

比如我们就使用 conn 和 address 这两个参数（可自定义）来接收 accept 函数返回的值
```python
conn, address = s.accept()
```

### 4、connect 与 connect_ex 函数
connect() 是客户端程序用来连接服务端的方法，客户端连接到 address 处的套接字，一般 address 的格式为元组（host, port），如果连接出错，会返回 socket.error 错误。

比如我们连接到刚才创建的套接字，即本地的 12345 端口：

```python
import socket
 
c = socket.socket()
c.connect(('127.0.0.1', 12345))
```

### 5、send 、 sendall 、sendto 函数
#### `send()` ：用于发送 TCP 数据

用法：s.send(string[,flag])

将 string 中的数据发送到连接的套接字，返回值是要发送的字节数量，该数量可能小于 string 的字节大小。

#### `sendall()` ：完整发送TCP数据

用法：`s.sendall(string[,flag])`

与 send() 类似，将 string 中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据，成功返回None，失败则抛出异常。

**关于参数的说明：**

`string`: 这是要发送的数据，通常是一个字符串。这是必需的参数。

`flag` : 这是一个可选的参数，用于指定发送数据的附加选项，在大多数情况下可以省略。

比如我们将 "Hello, server!" 字符串通过UTF-8编码转换为字节数据，然后使用套接字的 send 方法发送这些字节数据到连接的服务端：

```python
c.send("Hello, server!".encode('utf-8'))
```

#### sendto ：用于发送 UDP 数据

用法：s.sendto(string[,flag],address) 

将数据发送到套接字，address是形式为（ipaddr，port）的元组，指定远程地址，返回值是发送的字节数。

### 6、recv 与 recvfrom 函数
#### recv ：接受TCP套接字的数据，数据以字符串形式返回。

用法：`s.recv(bufsize[,flag])`

参数说明：

bufsize: 这是一个整数，表示要接收的最大字节数。接收的实际数据可能少于或等于这个值，取决于发送端发送的数据量。

flag（可选）: 这是一个可选的参数，用于指定接收数据的附加选项。在大多数情况下，可以省略这个参数。