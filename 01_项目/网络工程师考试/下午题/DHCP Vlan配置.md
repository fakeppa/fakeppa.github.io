---
icon: pen-to-square
date: 2025-03-06
tags: 
title: DHCP Vlan配置
category:
  - 项目
---
```shell
undo info-center enable
```
关闭信息弹显

vlan的网关要在vlan接口内配置

接口内配置：属于的vlan，接口类型



---

# DHCP
## 基于接口
```
dhcp enable
```
开启dhcp服务
然后进入vlan内,基于接口配置
```
dhcp select interface
```
基于接口配置
```
dhcp server dns-list 8.8.8.8
```
dhcp服务器，在收到分配的IP地址时也会被分配dns数据
```
dhcp server excluded-ip-address list <ip1> <ip2>
```
排除，哪些IP不会被DHCP服务器分配

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250306172100.png)
 华为默认从最大的地址开始分配，思科则是最小的开始
 

##  基于全局
进入vlan后用全局配置
```
dhcp select global
```

