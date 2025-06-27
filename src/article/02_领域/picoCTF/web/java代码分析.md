---
icon: pen-to-square
date: 2024-12-10
category:
  - 领域
tags:
  - picoCTF
title: java代码分析
---

通过抓包我们了解了本体JWT的构造：
![3231](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/3231.png)
有效载荷：
![屏幕截图 2024-12-02 173036](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-12-02%20173036.png)
发现有一本flag书，但是只有admin才可以查看
然后分析java代码
利用grep递归搜索JWT可以发现![55r](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/55r.png)
JwtService.java是关键的
随后看到在这里进行JWT的密钥创建，需要研究密钥的生成规则![asdwd3](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/asdwd3.png)
随后查看secretGenerator类的源代码
![eqwe](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/eqwe.png)
发现他会从本地读取密钥，如果本地密钥不存在就会使用固定字符串1234
还不知道userId和email字段生成规则
随后grep搜索admin的，发现adminRole(admin角色)的java文件，浏览源代码可以发现userid越大，权限越高
adminrole.java：:![wds](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/wds.png)
在grep中还发现了setEmail("字段")
![sdw2](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdw2.png)
推测是email的值为admin
构造JWT![sdt1](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdt1.png)
最后再修改本地存储中的JWT——auth-token和token-payload即可![df1](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/df1.png)