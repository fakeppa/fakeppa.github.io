---
icon: pen-to-square
date: 2024-12-21
tags: 
title: Some Assembly Required 2
category:
  - 领域
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
```js

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
    
    //- 遍历输入字符：使用 for 循环遍历输入值的每个字符。
//    - inputValue.charCodeAt(i)：获取输入值中第 i 个字符的 Unicode 编码。
//    - exports.copy_char(...)：调用 WebAssembly 模块的 `copy_char` 方法，将字符的 Unicode 编码和索引传递给它。

    exports.copy_char(0, inputValue.length);
    if (exports.check_flag() === 1) {
        document.getElementById(getString(219)).innerHTML = getString(10);
    } else {
        document.getElementById(getString(219)).innerHTML = getString(14);
    }
}

//- `exports.check_flag()`：调用 WebAssembly 模块的 `check_flag` 方法，检查输入是否正确。
//- `if` 语句：根据 `check_flag` 的返回值判断输入是否正确。
//    - 如果返回值为 1，更新页面中 ID 为 `getString(219)` 的元素的 `innerHTML` 为 `getString(10)`（通常是“正确！”）。
//    - 否则，将 `innerHTML` 更新为 `getString(14)`（通常是“错误！”）。

```
注意到验证输入的逻辑在wasm文件里
现在分析wasm文件
找到了check_flag函数
```
(func $check_flag (;2;) (export "check_flag") (result i32)
    (local $var0 i32)
    (local $var1 i32)
    (local $var2 i32)
    (local $var3 i32)
    (local $var4 i32)
    (local $var5 i32)
    (local $var6 i32)
    (local $var7 i32)
    (local $var8 i32)
    (local $var9 i32)
    (local $var10 i32)
    i32.const 0
    local.set $var0
    i32.const 1072
    local.set $var1
    i32.const 1024
    local.set $var2
    local.get $var2
    local.get $var1
    call $strcmp
    local.set $var3
    local.get $var3
    local.set $var4
    local.get $var0
    local.set $var5
    local.get $var4
    local.get $var5
    i32.ne
    local.set $var6
    i32.const -1
    local.set $var7
    local.get $var6
    local.get $var7
    i32.xor
    local.set $var8
    i32.const 1
    local.set $var9
    local.get $var8
    local.get $var9
    i32.and
    local.set $var10
    local.get $var10
    return
  )
```
*好吧，我承认没什么驱动力去学wasm逆向了*，

~~反正，这里有一个xor，然后对这个进行异或爆破就可以爆出字符串~~

即使你不知道什么是异步，不会用浏览器调试工具依旧可以，等等，调试工具？，我还没用那个

*哈哈，现在有了，在使用了调试工具之后，在懂得了栈的概念之后，我终于有动力去学习wasm是个什么东西了*


***提起精神来，从js混淆到web调试工具使用的学习，你已经坚持了6个小时去研究这一道题了，为什么要在这最后一步放弃呢***

实际上关键的部分在于copy_char的逻辑，他会给每一个字节对8进行xor操作，并传回js进行储存，最后通过check以及$strcmp进行检查

最终用8以及字符串进行xor就可以获得flag