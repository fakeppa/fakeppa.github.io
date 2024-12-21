---
icon: pen-to-square
date: 2024-12-21
tags: 
title: Some Assembly Required 2
category:
  - 项目
---
Author: Sears Schulz

#### Description
[http://mercury.picoctf.net:7319/index.html](http://mercury.picoctf.net:7319/index.html)

# 00. 前言
## 什么是wasm？
WebAssembly是一种可以在现代Web浏览器中运行的低级语言，它提供了一种高效的方式来执行代码，同时具有良好的安全性和可移植性。

在浏览器中可以运行以下三种编程语言
1. **WebAssembly (Wasm)** ：
   - 类似于汇编的二进制指令格式，但是具有更好的移植性
   - 可以被编译成各种高级语言(C、C++、Rust等)，然后在浏览器高效运行
   - WebAssembly模块可以与JavaScript互操作、利用浏览器Web API执行复杂的计算密集型任务，同时保持良好的性能
1. **JavaScript (JS)**：
2. **TypeScript**：在js的基础上，增加支持了面向对象（虽然在js之后的更行中增加了面向对象支持）

  *进行不下去了，先系统学web开发者工具和js代码混淆和wasm逆向*和简单了解什么是异步* ~~,haha幽默~~

# 01. 解题过程
## 代码审计
首先查看源代码，发现其指向了一个js文件
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221141301.png)

发现了混淆后的js代码，~~fuck-js~~
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221141409.png)
*~~代码缩小和十六进制混淆~~*

问了AI，怎么发现这么多重混淆技术？~~人类的能力果然还是 有限的~~
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241221141733.png)

代码不是人能看的，直接让AI进行反混淆
```

const strings = [
    'copy_char', 'value', '207aLjBod', '1301420SaUSqf', 
    '233ZRpipt', '2224QffgXU', 'check_flag', '408533hsoVYx', 
    'instance', '278338GVFUrH', 'Correct!', '549933ZVjkwI', 
    'innerHTML', 'charCodeAt', './aD8SvhyVkb', 'result', 
    '977AzKzwq', 'Incorrect!', 'exports', 'length', 
    'getElementById', '1jIrMBu', 'input', '615361geljRK'
];
//定义字符串数组：创建一个名为 `strings` 的数组，包含了一系列字符串。这些字符串在后续代码中用于替代混淆的标识符和文本。

const getString = (index) => strings[index - 195];
//索引函数：定义一个函数 `getString`，接受一个索引参数 `index`。该函数将输入的索引减去 195，然后返回 `strings` 数组中对应的字符串。这是反混淆的关键部分，使得代码更易读。

(async () => {
    const response = await fetch(getString(210));
    const { instance } = await WebAssembly.instantiate(await response.arrayBuffer());
    exports = instance.exports;
})();

function onButtonPress() {
    const inputValue = document.getElementById(getString(218)).value;
    
    //获取输入值：通过 `getElementById` 获取页面中 ID 为 `getString(218)` 的元素（通常是一个输入框），并获取其值。
    
    for (let i = 0; i < inputValue.length; i++) {
        exports.copy_char(inputValue.charCodeAt(i), i);
    }
    exports.copy_char(0, inputValue.length);
    if (exports.check_flag() === 1) {
        document.getElementById(getString(219)).innerHTML = getString(10);
    } else {
        document.getElementById(getString(219)).innerHTML = getString(14);
    }
}
```

