import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,b as o,o as c}from"./app-DjZ-ErqM.js";const a={};function t(d,e){return c(),i("div",null,e[0]||(e[0]=[o('<p>来学wasm</p><h1 id="什么是webassembly" tabindex="-1"><a class="header-anchor" href="#什么是webassembly"><span>什么是webassembly？</span></a></h1><p>是一个虚拟机，对比js是一个文本型的，而webassembly是以堆栈为基础的二进制机器码的虚拟机</p><h1 id="指令表" tabindex="-1"><a class="header-anchor" href="#指令表"><span>指令表</span></a></h1><h3 id="局部变量和全局变量操作符" tabindex="-1"><a class="header-anchor" href="#局部变量和全局变量操作符"><span>局部变量和全局变量操作符</span></a></h3><ul><li><code>local.get</code>：从局部变量中加载一个值到栈上。</li><li><code>local.set</code>：将栈顶的值存储到指定的局部变量中。</li><li><code>local.tee</code>：将栈顶的值存储到指定的局部变量中，并且将该值保留在栈上。</li><li><code>global.get</code>：从全局变量中加载一个值到栈上。</li><li><code>global.set</code>：将栈顶的值存储到指定的全局变量中。</li></ul><h3 id="常量加载操作符" tabindex="-1"><a class="header-anchor" href="#常量加载操作符"><span>常量加载操作符</span></a></h3><ul><li><code>i32.const</code>：将一个 32 位整数常量加载到栈上。</li><li><code>i64.const</code>：将一个 64 位整数常量加载到栈上。</li><li><code>f32.const</code>：将一个 32 位浮点数常量加载到栈上。</li><li><code>f64.const</code>：将一个 64 位浮点数常量加载到栈上。</li></ul><h3 id="数学运算操作符-对栈顶的数据操作" tabindex="-1"><a class="header-anchor" href="#数学运算操作符-对栈顶的数据操作"><span>数学运算操作符--对栈顶的数据操作</span></a></h3><ul><li><code>i32.add</code>：两个 32 位整数相加。</li><li><code>i32.sub</code>：两个 32 位整数相减。</li><li><code>i32.mul</code>：两个 32 位整数相乘。</li><li><code>i32.div_s</code>：两个 32 位整数相除（有符号）。</li><li><code>i32.div_u</code>：两个 32 位整数相除（无符号）。</li><li><code>i32.rem_s</code>：两个 32 位整数求余（有符号）。</li><li><code>i32.rem_u</code>：两个 32 位整数求余（无符号）。</li></ul><h3 id="位运算操作符" tabindex="-1"><a class="header-anchor" href="#位运算操作符"><span>位运算操作符</span></a></h3><ul><li><code>i32.and</code>：两个 32 位整数进行按位与运算。</li><li><code>i32.or</code>：两个 32 位整数进行按位或运算。</li><li><code>i32.xor</code>：两个 32 位整数进行按位异或运算。</li><li><code>i32.shl</code>：对一个 32 位整数进行左移位运算。</li><li><code>i32.shr_s</code>：对一个 32 位整数进行有符号右移位运算。</li><li><code>i32.shr_u</code>：对一个 32 位整数进行无符号右移位运算。</li><li><code>i32.rotl</code>：对一个 32 位整数进行左旋转运算。</li><li><code>i32.rotr</code>：对一个 32 位整数进行右旋转运算。</li></ul><h3 id="比较和关系运算操作符" tabindex="-1"><a class="header-anchor" href="#比较和关系运算操作符"><span>比较和关系运算操作符</span></a></h3><ul><li><code>i32.eq</code>：比较两个 32 位整数是否相等。</li><li><code>i32.ne</code>：比较两个 32 位整数是否不相等。</li><li><code>i32.lt_s</code>：比较第一个 32 位整数是否小于第二个（有符号）。</li><li><code>i32.lt_u</code>：比较第一个 32 位整数是否小于第二个（无符号）。</li><li><code>i32.gt_s</code>：比较第一个 32 位整数是否大于第二个（有符号）。</li><li><code>i32.gt_u</code>：比较第一个 32 位整数是否大于第二个（无符号）。</li><li><code>i32.le_s</code>：比较第一个 32 位整数是否小于等于第二个（有符号）。</li><li><code>i32.le_u</code>：比较第一个 32 位整数是否小于等于第二个（无符号）。</li><li><code>i32.ge_s</code>：比较第一个 32 位整数是否大于等于第二个（有符号）。</li><li><code>i32.ge_u</code>：比较第一个 32 位整数是否大于等于第二个（无符号）。</li></ul><h3 id="控制流操作符" tabindex="-1"><a class="header-anchor" href="#控制流操作符"><span>控制流操作符</span></a></h3><ul><li><code>block</code>：开始一个代码块，可以包含多条指令。</li><li><code>loop</code>：开始一个循环，可以包含多条指令。</li><li><code>if</code>：条件执行，如果栈顶的值不为零，则执行 <code>if</code> 块中的指令。</li><li><code>else</code>：与 <code>if</code> 配合使用，如果 <code>if</code> 条件不满足，则执行 <code>else</code> 块中的指令。</li><li><code>br</code>：无条件跳转到指定的标签。</li><li><code>br_if</code>：条件跳转，如果栈顶的值不为零，则跳转到指定的标签。</li><li><code>br_table</code>：多路跳转，根据栈顶的值跳转到多个标签中的一个。</li><li><code>return</code>：从函数返回。</li></ul>',16)]))}const r=l(a,[["render",t],["__file","WEBassembly.html.vue"]]),p=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/WEBassembly.html","title":"WEBassembly","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-21T00:00:00.000Z","tags":null,"title":"WEBassembly","category":["项目"],"description":"来学wasm 什么是webassembly？ 是一个虚拟机，对比js是一个文本型的，而webassembly是以堆栈为基础的二进制机器码的虚拟机 指令表 局部变量和全局变量操作符 local.get：从局部变量中加载一个值到栈上。 local.set：将栈顶的值存储到指定的局部变量中。 local.tee：将栈顶的值存储到指定的局部变量中，并且将该值保...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/WEBassembly.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"WEBassembly"}],["meta",{"property":"og:description","content":"来学wasm 什么是webassembly？ 是一个虚拟机，对比js是一个文本型的，而webassembly是以堆栈为基础的二进制机器码的虚拟机 指令表 局部变量和全局变量操作符 local.get：从局部变量中加载一个值到栈上。 local.set：将栈顶的值存储到指定的局部变量中。 local.tee：将栈顶的值存储到指定的局部变量中，并且将该值保..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-21T10:42:11.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-21T10:42:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WEBassembly\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-21T10:42:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":3,"title":"局部变量和全局变量操作符","slug":"局部变量和全局变量操作符","link":"#局部变量和全局变量操作符","children":[]},{"level":3,"title":"常量加载操作符","slug":"常量加载操作符","link":"#常量加载操作符","children":[]},{"level":3,"title":"数学运算操作符--对栈顶的数据操作","slug":"数学运算操作符-对栈顶的数据操作","link":"#数学运算操作符-对栈顶的数据操作","children":[]},{"level":3,"title":"位运算操作符","slug":"位运算操作符","link":"#位运算操作符","children":[]},{"level":3,"title":"比较和关系运算操作符","slug":"比较和关系运算操作符","link":"#比较和关系运算操作符","children":[]},{"level":3,"title":"控制流操作符","slug":"控制流操作符","link":"#控制流操作符","children":[]}],"git":{"createdTime":1734775597000,"updatedTime":1734777731000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":4,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":2.68,"words":804},"filePathRelative":"article/01_项目/WEBassembly.md","localizedDate":"2024年12月21日","excerpt":"<p>来学wasm</p>\\n<h1>什么是webassembly？</h1>\\n<p>是一个虚拟机，对比js是一个文本型的，而webassembly是以堆栈为基础的二进制机器码的虚拟机</p>\\n<h1>指令表</h1>\\n<h3>局部变量和全局变量操作符</h3>\\n<ul>\\n<li><code>local.get</code>：从局部变量中加载一个值到栈上。</li>\\n<li><code>local.set</code>：将栈顶的值存储到指定的局部变量中。</li>\\n<li><code>local.tee</code>：将栈顶的值存储到指定的局部变量中，并且将该值保留在栈上。</li>\\n<li><code>global.get</code>：从全局变量中加载一个值到栈上。</li>\\n<li><code>global.set</code>：将栈顶的值存储到指定的全局变量中。</li>\\n</ul>","autoDesc":true}');export{r as comp,p as data};
