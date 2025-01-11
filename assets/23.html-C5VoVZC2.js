import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,b as a,o as s}from"./app-DA3rbz0F.js";const n={};function r(p,e){return s(),t("div",null,e[0]||(e[0]=[a('<p>6,804 users solved</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>Can you get the flag?Reverse engineer this <a href="https://artifacts.picoctf.net/c/46/bbbbloat" target="_blank" rel="noopener noreferrer">binary</a>.</p><hr><h1 id="_00-前言" tabindex="-1"><a class="header-anchor" href="#_00-前言"><span>00. 前言</span></a></h1><p>这题是一个二进制逆向问题,也包含了一些C语言</p><hr><h1 id="_01-解题过程" tabindex="-1"><a class="header-anchor" href="#_01-解题过程"><span>01. 解题过程</span></a></h1><p>用<code>file bbbbloat</code>我们可以发现这是一个elf可执行二进制程序<br><code>./bbbbloat</code><br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231903.png" alt="image.png" loading="lazy"></p><p>输入任意数字提示<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231950.png" alt="image.png" loading="lazy"></p><p>于是我们需要进行反编译，查看这里的判断条件<br> 下载安装GHIDRA，这是一个二进制反编译工具，可以将二进制文件反汇编并进行反编译。<br> 继续，可以发现这是一个C语言文件，C语言是以函数为基础的<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250111194635.png" alt="image.png" loading="lazy"><br> 发现主程序</p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">__isoc99_scanf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">DAT_00102020</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">local_48</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>有一个输入逻辑<br> 并且这个变量48在接下来进行了判断</p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (local_48 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;"> 0x</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">86187</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>',14)]))}const o=i(n,[["render",r],["__file","23.html.vue"]]),c=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/23.html","title":"Bbbbloat","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-01-03T00:00:00.000Z","tags":null,"title":"Bbbbloat","category":["项目"],"description":"6,804 users solved Description Can you get the flag?Reverse engineer this binary. 00. 前言 这题是一个二进制逆向问题,也包含了一些C语言 01. 解题过程 用file bbbbloat我们可以发现这是一个elf可执行二进制程序 ./bbbbloat image.png...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/23.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"Bbbbloat"}],["meta",{"property":"og:description","content":"6,804 users solved Description Can you get the flag?Reverse engineer this binary. 00. 前言 这题是一个二进制逆向问题,也包含了一些C语言 01. 解题过程 用file bbbbloat我们可以发现这是一个elf可执行二进制程序 ./bbbbloat image.png..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231903.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-11T11:55:34.000Z"}],["meta",{"property":"article:published_time","content":"2025-01-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-11T11:55:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Bbbbloat\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231903.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231950.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250111194635.png\\"],\\"datePublished\\":\\"2025-01-03T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-11T11:55:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1736596534000,"updatedTime":1736596534000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":1,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.73,"words":219},"filePathRelative":"article/01_项目/picoCTF/逆向reverse/23.md","localizedDate":"2025年1月3日","excerpt":"<p>6,804&nbsp;users solved</p>\\n<h4>Description</h4>\\n<p>Can you get the flag?Reverse engineer this&nbsp;<a href=\\"https://artifacts.picoctf.net/c/46/bbbbloat\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">binary</a>.</p>\\n<hr>\\n<h1>00. 前言</h1>\\n<p>这题是一个二进制逆向问题,也包含了一些C语言</p>\\n<hr>\\n<h1>01. 解题过程</h1>\\n<p>用<code>file bbbbloat</code>我们可以发现这是一个elf可执行二进制程序<br>\\n<code>./bbbbloat</code><br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250110231903.png\\" alt=\\"image.png\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{o as comp,c as data};
