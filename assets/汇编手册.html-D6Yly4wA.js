import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as r,o as s}from"./app-DJLJQJ0_.js";const l={};function i(n,e){return s(),a("div",null,e[0]||(e[0]=[r('<h1 id="速记" tabindex="-1"><a class="header-anchor" href="#速记"><span>速记</span></a></h1><p><code>sp</code>指向栈顶<br><code>bp</code>为基指针<br> 当基址针被赋予栈顶的值时，会进行新的栈帧创建s<br><code>[]</code>:代表内存地址，里面还可以写寄存器。表示寄存器指向的内存地址</p><h1 id="arm" tabindex="-1"><a class="header-anchor" href="#arm"><span>arm</span></a></h1><h2 id="add" tabindex="-1"><a class="header-anchor" href="#add"><span>add</span></a></h2><p><code>add 目标寄存器 第一个操作数寄存器 第二个操作数寄存器或立即数</code></p><h2 id="存值" tabindex="-1"><a class="header-anchor" href="#存值"><span>存值</span></a></h2><h3 id="str" tabindex="-1"><a class="header-anchor" href="#str"><span>str</span></a></h3><ul><li>str将一个寄存器的值存储到连续的内存地址中<br><code>str 寄存器 [寄存器,偏移量]</code></li></ul><h3 id="stp" tabindex="-1"><a class="header-anchor" href="#stp"><span>stp</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>stp 寄存器1 寄存器2 [存储的内存位置]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>stp将一对寄存器的值存储到连续的内存地址中<br> tips：若以<code>[内存地址]!</code>为结尾还可以进行更新栈指针sp</li></ul><h2 id="取值" tabindex="-1"><a class="header-anchor" href="#取值"><span>取值</span></a></h2><h3 id="ldr" tabindex="-1"><a class="header-anchor" href="#ldr"><span>ldr</span></a></h3><ul><li>从指定的内存地址取一个<em><strong>双字</strong></em>给予寄存器</li></ul><h2 id="条件分支" tabindex="-1"><a class="header-anchor" href="#条件分支"><span>条件分支</span></a></h2><p>bne：不等于</p><h1 id="条件分支-1" tabindex="-1"><a class="header-anchor" href="#条件分支-1"><span>条件分支</span></a></h1><h3 id="cmp-指令的行为" tabindex="-1"><a class="header-anchor" href="#cmp-指令的行为"><span><code>cmp</code> 指令的行为</span></a></h3><ul><li><p><strong>相减操作</strong>：<code>cmp</code> 指令执行 <code>operand1 - operand2</code> 的操作。</p></li><li><p><strong>设置标志位</strong>：根据相减的结果设置标志寄存器中的标志位，主要的标志位包括：</p><ul><li><p><strong>ZF（Zero Flag）</strong>：如果结果为零，则 ZF 设置为 1，否则为 0。</p></li><li><p><strong>SF（Sign Flag）</strong>：如果结果为负数，则 SF 设置为 1，否则为 0。</p></li><li><p><strong>CF（Carry Flag）</strong>：如果发生借位，则 CF 设置为 1，否则为 0。</p></li><li><p><strong>OF（Overflow Flag）</strong>：如果结果溢出，则 OF 设置为 1，否则为 0。</p></li></ul></li></ul><p>相减的结果会影响这些标志位</p><h3 id="常见的条件跳转指令" tabindex="-1"><a class="header-anchor" href="#常见的条件跳转指令"><span>常见的条件跳转指令</span></a></h3><p>等于：</p><ul><li><strong><code>je</code>（Jump if Equal）</strong>：如果 ZF 为 1，则跳转。<br> 不等于：</li><li><strong><code>jne</code>（Jump if Not Equal）</strong>：如果 ZF 为 0，则跳转。<br> 大于：</li><li><strong><code>jg</code>（Jump if Greater）</strong>：如果 SF 为 0 且 ZF 为 0，则跳转。<br> 小于：</li><li><strong><code>jl</code>（Jump if Less）</strong>：如果 SF 为 1 且 ZF 为 0，则跳转。<br> 大于或等于：</li><li><strong><code>jge</code>（Jump if Greater or Equal）</strong>：如果 SF 为 0，则跳转。<br> 小于或等于</li><li><strong><code>jle</code>（Jump if Less or Equal）</strong>：如果 SF 为 1 或 ZF 为 1，则跳转。<br> 标志位存放在标志位寄存器中</li></ul>',23)]))}const p=t(l,[["render",i],["__file","汇编手册.html.vue"]]),c=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/%E6%B1%87%E7%BC%96/%E6%B1%87%E7%BC%96%E6%89%8B%E5%86%8C.html","title":"汇编手册","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-01-13T00:00:00.000Z","tags":null,"title":"汇编手册","category":["项目"],"description":"速记 sp指向栈顶 bp为基指针 当基址针被赋予栈顶的值时，会进行新的栈帧创建s []:代表内存地址，里面还可以写寄存器。表示寄存器指向的内存地址 arm add add 目标寄存器 第一个操作数寄存器 第二个操作数寄存器或立即数 存值 str str将一个寄存器的值存储到连续的内存地址中 str 寄存器 [寄存器,偏移量] stp stp将一对寄存器...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/%E6%B1%87%E7%BC%96/%E6%B1%87%E7%BC%96%E6%89%8B%E5%86%8C.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"汇编手册"}],["meta",{"property":"og:description","content":"速记 sp指向栈顶 bp为基指针 当基址针被赋予栈顶的值时，会进行新的栈帧创建s []:代表内存地址，里面还可以写寄存器。表示寄存器指向的内存地址 arm add add 目标寄存器 第一个操作数寄存器 第二个操作数寄存器或立即数 存值 str str将一个寄存器的值存储到连续的内存地址中 str 寄存器 [寄存器,偏移量] stp stp将一对寄存器..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T14:46:37.000Z"}],["meta",{"property":"article:published_time","content":"2025-01-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T14:46:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"汇编手册\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-13T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-15T14:46:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"add","slug":"add","link":"#add","children":[]},{"level":2,"title":"存值","slug":"存值","link":"#存值","children":[{"level":3,"title":"str","slug":"str","link":"#str","children":[]},{"level":3,"title":"stp","slug":"stp","link":"#stp","children":[]}]},{"level":2,"title":"取值","slug":"取值","link":"#取值","children":[{"level":3,"title":"ldr","slug":"ldr","link":"#ldr","children":[]}]},{"level":2,"title":"条件分支","slug":"条件分支","link":"#条件分支","children":[{"level":3,"title":"cmp 指令的行为","slug":"cmp-指令的行为","link":"#cmp-指令的行为","children":[]},{"level":3,"title":"常见的条件跳转指令","slug":"常见的条件跳转指令","link":"#常见的条件跳转指令","children":[]}]}],"git":{"createdTime":1736749739000,"updatedTime":1736952397000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":33,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":1.68,"words":504},"filePathRelative":"article/01_项目/汇编/汇编手册.md","localizedDate":"2025年1月13日","excerpt":"\\n<p><code>sp</code>指向栈顶<br>\\n<code>bp</code>为基指针<br>\\n当基址针被赋予栈顶的值时，会进行新的栈帧创建s<br>\\n<code>[]</code>:代表内存地址，里面还可以写寄存器。表示寄存器指向的内存地址</p>\\n<h1>arm</h1>\\n<h2>add</h2>\\n<p><code>add 目标寄存器 第一个操作数寄存器 第二个操作数寄存器或立即数</code></p>\\n<h2>存值</h2>\\n<h3>str</h3>\\n<ul>\\n<li>str将一个寄存器的值存储到连续的内存地址中<br>\\n<code>str 寄存器 [寄存器,偏移量]</code></li>\\n</ul>","autoDesc":true}');export{p as comp,c as data};
