---
aliases:
tags:
icon: pen-to-square
date: 2025-12-15
title: Tkinter库
category:
  - 领域
---
### 创建窗口
```python
import tkinter as tk # 在代码里面导入库，起一个别名，以后代码里面就用这个别名 
root = tk.Tk() # 这个库里面有Tk()这个方法，这个方法的作用就是创建一个窗口
```
### 窗口维持
```python
root.mainloop() # 加上这一句，就可以看见窗口了
```
### 窗口标题

```python
root.title('演示窗口')
```

### 窗口设置
```python
root.geometry("300x100+630+80")  # (宽度x高度)+(x轴+y轴)
```

### 创建按钮
并且给按钮添加点击事件
```python
btn1 = tk.Button(root)
```

### 给按钮取一个名称
```python
btn1["text"] = "点击"
```

- 我们创建的按钮组件，已经放到窗口里面了，但是放到窗口的哪个位置，东南西北哪个地方，我们就可以用pack()去定位(后面会介绍其它定位方法)

```python
btn1.pack()  # 按钮在窗口里面的定位
```

- 创建点击按钮事件的弹窗，先导入messagebox，这个必须单独导入

```python
from tkinter import messagebox
def test(e):
    messagebox.showinfo("窗口名称","点击成功")
```

### 事件绑定
- 现在有了按钮，有了方法，我想要做的是一点击按钮，就执行这个方法，那么就需要将按钮和方法进行绑定

```python
btn1.bind("<Button-1>",test) #第一个参数为：按鼠标左键的事件 第二个参数为：要执行的方法的名字
```
