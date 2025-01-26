import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as i,o}from"./app-BxtqKo-W.js";const n={};function s(r,e){return o(),a("div",null,e[0]||(e[0]=[i(`<p>3,953 users solved</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>Now for something a little different. <code>0x2262c96b</code> is loaded into memory in the <code>main</code> function. Examine byte-wise the memory that the constant is loaded in by using the GDB command <code>x/4xb addr</code>. The flag is the four bytes as they are stored in memory. If you find the bytes <code>0x11 0x22 0x33 0x44</code> in the memory location, your flag would be: <code>picoCTF{0x11223344}</code>.</p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><ul><li>You&#39;ll need to breakpoint the instruction after the memory load.</li><li>Use the gdb command <code>x/4xb addr</code> with the memory location as the address <code>addr</code> to examine. <a href="https://ftp.gnu.org/old-gnu/Manuals/gdb/html_node/gdb_55.html" target="_blank" rel="noopener noreferrer">GDB manual page</a>.</li><li>Any registers in <code>addr</code> should be prepended with <code>$</code> like <code>$rbp</code>.</li><li>Don&#39;t use square brackets for <code>addr</code></li><li>What is <a href="https://en.wikipedia.org/wiki/Endianness" target="_blank" rel="noopener noreferrer">endianness</a>?</li></ul><hr><h1 id="_00-前言" tabindex="-1"><a class="header-anchor" href="#_00-前言"><span>00. 前言</span></a></h1><p>这题有一个简单的知识，字节序，在x86架构中，数据的低字存放在低地址，高字存放在高地址<br> 数字：123456，字节序：56 34 12.</p><h1 id="_01-解题过程" tabindex="-1"><a class="header-anchor" href="#_01-解题过程"><span>01. 解题过程</span></a></h1><p>关键</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>        00401115 c7  45  fc       MOV        dword ptr [RBP  + local_c ],0x2262c96b</span></span>
<span class="line"><span>                 6b  c9  62 </span></span>
<span class="line"><span>                 22</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>6b c9 62 22</code>就是答案，<br> 另外<code>c7</code>为mov<br><code>45 fc</code>为寄存器与偏移量（二进制补码形式）</p><p>flag</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>picoCTF{0x6bc96222}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,14)]))}const p=t(n,[["render",s],["__file","GDB baby step 3.html.vue"]]),l=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/picoCTF/%E9%80%86%E5%90%91%20reverse/GDB%20baby%20step%203.html","title":"GDB baby step 3","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-01-17T00:00:00.000Z","tags":null,"title":"GDB baby step 3","category":["领域"],"description":"3,953 users solved Description Now for something a little different. 0x2262c96b is loaded into memory in the main function. Examine byte-wise the memory that the constant is loa...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/picoCTF/%E9%80%86%E5%90%91%20reverse/GDB%20baby%20step%203.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"GDB baby step 3"}],["meta",{"property":"og:description","content":"3,953 users solved Description Now for something a little different. 0x2262c96b is loaded into memory in the main function. Examine byte-wise the memory that the constant is loa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-26T13:31:11.000Z"}],["meta",{"property":"article:published_time","content":"2025-01-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-26T13:31:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GDB baby step 3\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-17T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-26T13:31:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1737706909000,"updatedTime":1737898271000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":11,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.83,"words":249},"filePathRelative":"article/02_领域/picoCTF/逆向 reverse/GDB baby step 3.md","localizedDate":"2025年1月17日","excerpt":"<p>3,953&nbsp;users solved</p>\\n<h4>Description</h4>\\n<p>Now for something a little different.&nbsp;<code>0x2262c96b</code>&nbsp;is loaded into memory in the&nbsp;<code>main</code>&nbsp;function. Examine byte-wise the memory that the constant is loaded in by using the GDB command&nbsp;<code>x/4xb addr</code>. The flag is the four bytes as they are stored in memory. If you find the bytes&nbsp;<code>0x11 0x22 0x33 0x44</code>&nbsp;in the memory location, your flag would be:&nbsp;<code>picoCTF{0x11223344}</code>.</p>","autoDesc":true}');export{p as comp,l as data};