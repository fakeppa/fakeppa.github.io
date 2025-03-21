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
创建并进入20地址池
```
ip pool 20
```
这个指令告诉设备，IP地址池将从 `192.168.20.0/24` 网络中分配IP地址。
```
network 192.168.20.0 mask 24
```

配网关(基于接口不用配网关，基于全局需要配置)
```
gateway-list 192.168.20.254
```
配置dns
```
dns-list 9.9.9.9
```
 
配置租期，天
```
lease 10
```
排除地址
```
excluded-ip-address 192.168.20.151 192.168.20.253
```
cmd命令----刷新ip
```
ipconfig /renew
```
![](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250306181309.png)
- PC与DHCP服务器相隔多个网段，用DHCP rely功能将广播转化为单播
- DHCP snooping可以将接口设置为untrust，不会接受不信任的链路的DHCP服务器包
- DHCPoption43：分配IP地址同时，gaosuAP,AC的地址是多少，无线经常用
