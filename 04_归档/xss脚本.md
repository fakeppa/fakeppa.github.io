---
icon: pen-to-square
date: 2025-03-16
tags: 
title: xss脚本
category:
  - 归档
---
xss攻击发送后访问这个脚本服务器，窃取cookie，这只是最初的设想
[[urlparse#urlparse1|关于urlparse库]] 
self是http对象
启用一个`parsed_path = urlparse(self.path)`的对象，这是一个url对象
打印
```python
		print(f"\n[请求路径] {parsed_path.path}")
        print(f"[查询参数] {json.dumps(query_params, indent=2)}")
        print("[请求头]")
        for header, value in self.headers.items():
            print(f"  {header}: {value}")
```

- `self`是http请求对象
内容如下
```http
Host: example.com
Content-Type: application/json
User-Agent: Mozilla/5.0
```

- `self.headers`
`self.headers` 是一个字典（`dict`）对象，存储了 HTTP 请求或响应头的键值对。内容示例
```python
self.headers = {
    "Host": "example.com",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0"
}
```

- `self.headers.items()`
`self.headers.items()` 是字典的 `items()` 方法，返回一个包含字典中所有键值对的迭代器（`key, value` 对）内容实例
```python
[("Host", "example.com"), ("Content-Type", "application/json"), ("User-Agent", "Mozilla/5.0")]
```


