---
icon: pen-to-square
date: 2025-06-08
tags: 
title: threading库
category:
  - 领域
---
## 进程与线程
- 进程是程序的一次执行过程，是一个动态概念，是程序在执行过程中分配和管理资源的基本单位
- 进程拥有自己独立的内存空间
- 程序本身只是指令、数据及其组织形式的描述，进程才是程序的真正运行实例
### 进程与线程之间的联系

线程是进程的一部分，一个线程只能属于一个进程，而一个进程可以有多个线程，且至少有一个线程

线程的建立
```python
import threading
import time

def run(n):
    print("task", n)
    time.sleep(1)
    print('2s')
    time.sleep(1)
    print('1s')
    time.sleep(1)
    print('0s')
    time.sleep(1)

if __name__ == '__main__':
    t1 = threading.Thread(target=run, args=("t1",))
    t2 = threading.Thread(target=run, args=("t2",))
    t1.start()
    t2.start()
```
这段代码会创立两个子线程，也就是一个主线程和两个子线程呢个三个线程，且会同时进行两个线程

### 守护线程
关键函数:`t.setDaemon(True)`
```python
import threading
import time
  
def run(n):
    print("task", n)
    time.sleep(1)       #此时子线程停1s
    print('3')
    time.sleep(1)
    print('2')
    time.sleep(1)
    print('1')
  
if __name__ == '__main__':
    t = threading.Thread(target=run, args=("t1",))
    t.setDaemon(True)   #把子进程设置为守护线程，必须在start()之前设置
    t.start()
    print("end")
```

#### 主线程等待守护线程执行结束再结束
关键函数：`t.setDaemon(True)`
这个函数会指示主线程阻塞等待，直到守护线程结束zhixingwan
```python
import threading
import time

def run(n):
    print("task", n)
    time.sleep(1)       #此时子线程停1s
    print('3')
    time.sleep(1)
    print('2')
    time.sleep(1)
    print('1')

if __name__ == '__main__':
    t = threading.Thread(target=run, args=("t1",))
    t.setDaemon(True)   #把子进程设置为守护线程，必须在start()之前设置
    t.start()
    t.join() # 设置主线程等待子线程结束
    print("end")
```
