---
icon: pen-to-square
tags:
date: 2025-12-13
title: requests库
category:
  - 领域
---
## GET方法
```python
res = requests.get(url,headers=headers,params,timeout)
```

参数说明如下：

- • url：要抓取的 url 地址。
    
- • headers：用于包装请求头信息。
    
- • params：请求时携带的查询字符串参数。
    
- • timeout：超时时间，超过时间会抛出异常。

示例
```python
import requests
url = 'http://baidu.com'
response = requests.get(url)
print(response)
```

### 接受数据的处理
假设返回json数据
```json
{
  "args": {
    "name": "\u7f16\u7a0b\u5e2e",
    "url": "www.biancheng.net"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.23.0",
    "X-Amzn-Trace-Id": "Root=1-60420026-236f9205646b68706d0fafa7"
  },
  "origin": "121.17.25.194",
  "url": "http://httpbin.org/get?name=\u7f16\u7a0b\u5e2e&url=www.biancheng.net"
}
```
使用`response.json`格式化为字典结构
```python
data = response.json()
print(data["args"]["name"])  
print(data["headers"]["Host"])  # httpbin.org
```
## POST方法
```python
response=requests.post(url,data={请求体的字典})
```

示例
```python
import requests
#百度翻译
headers = {'Content-Type': 'application/json'}
url = 'https://fanyi.baidu.com'
#post请求体携带的参数，可通过开发者调试工具查看
#查看步骤：NetWork选项->Headers选项->Form Data
data = {'from': 'zh',
        'to': 'en',
        'query': '编程帮www.biancheng.net你好'
        }
response = requests.post(url,headers=headers, json=data)
print(response)
```
注意一定要设置`headers`和`json`能进行发送数据
