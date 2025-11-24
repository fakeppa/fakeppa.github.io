---
icon: pen-to-square
date: 2025-03-16
tags: 
title: urlparse
category:
  - 领域
---

urlparse是 Python 标准库 urllib.parse 模块中的一个函数，用于解析 URL 并将其分解为多个组成部分。它返回一个 ParseResult 对象，包含 URL 的各个部分，例如协议、主机名、路径、查询参数等。导包
```python
from urllib.parse import urlparse
```

```python
parsed_url = urlparse(url_string)
```


- 这行代码的作用是将 `self.path`（假设它是一个 URL 字符串）解析为一个结构化的对象，方便后续处理。
- **返回值**：
    - 返回一个 `ParseResult` 对象，包含以下属性：
        1. **`scheme`**：URL 的协议部分（例如 `http`、`https`、`ftp` 等）。
        2. **`netloc`**：网络位置部分，通常是主机名（例如 `example.com`）。
        3. **`path`**：路径部分（例如 `/path/to/resource`）。
        4. **`params`**：路径参数（在某些 URL 中可能出现在路径后，例如 `/path/to/resource;param`）。
        5. **`query`**：查询字符串部分（例如 `param=value`）。
        6. **`fragment`**：锚点部分（例如 `#fragment`）。^URLPARSE1