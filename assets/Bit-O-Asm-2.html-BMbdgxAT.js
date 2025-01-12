import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,b as i,o as a}from"./app-CbTaSfqD.js";const n={};function r(o,e){return a(),t("div",null,e[0]||(e[0]=[i(`<p>6,086 users solved</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>Can you figure out what is in the <code>eax</code> register? Put your answer in the picoCTF flag format: <code>picoCTF{n}</code> where <code>n</code> is the contents of the <code>eax</code> register in the decimal number base. If the answer was <code>0x11</code> your flag would be <code>picoCTF{17}</code>.Download the assembly dump <a href="https://artifacts.picoctf.net/c/510/disassembler-dump0_b.txt" target="_blank" rel="noopener noreferrer">here</a>.</p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><p><code>PTR</code>&#39;s or &#39;pointers&#39;, reference a location in memory where values can be stored.</p><hr><h1 id="_01-解题过程" tabindex="-1"><a class="header-anchor" href="#_01-解题过程"><span>01. 解题过程</span></a></h1><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+0&gt;:     endbr64 </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+4&gt;:     push   rbp</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+5&gt;:     mov    rbp,rsp</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+8&gt;:     mov    DWORD PTR [rbp-0x14],edi</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+11&gt;:    mov    QWORD PTR [rbp-0x20],rsi</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+15&gt;:    mov    DWORD PTR [rbp-0x4],0x9fe1a</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+22&gt;:    mov    eax,DWORD PTR [rbp-0x4]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+25&gt;:    pop    rbp</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;+26&gt;:    ret</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单的一段x86架构汇编代码<br><code>eax,DWORD PTR [rbp-0x4]</code>在这里可以看到rbp-0x4地址的内容使我们想要的，<br><code>[rbp-0x4],0x9fe1a</code>,这段代码吧0x9fe1a移动到了rbp-0x4的位置，我们可以知道，这就是flag<br> dec：<code>654874</code><br> 获得flag</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>picoCTF{654874}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,10)]))}const c=s(n,[["render",r],["__file","Bit-O-Asm-2.html.vue"]]),d=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/Bit-O-Asm-2.html","title":"Bit-O-Asm-2","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-01-12T00:00:00.000Z","tags":null,"title":"Bit-O-Asm-2","category":["项目"],"description":"6,086 users solved Description Can you figure out what is in the eax register? Put your answer in the picoCTF flag format: picoCTF{n} where n is the contents of the eax register...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/Bit-O-Asm-2.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"Bit-O-Asm-2"}],["meta",{"property":"og:description","content":"6,086 users solved Description Can you figure out what is in the eax register? Put your answer in the picoCTF flag format: picoCTF{n} where n is the contents of the eax register..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-12T13:30:10.000Z"}],["meta",{"property":"article:published_time","content":"2025-01-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-12T13:30:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Bit-O-Asm-2\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-12T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-12T13:30:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1736688267000,"updatedTime":1736688610000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":2,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.7,"words":211},"filePathRelative":"article/01_项目/picoCTF/逆向reverse/Bit-O-Asm-2.md","localizedDate":"2025年1月12日","excerpt":"<p>6,086&nbsp;users solved</p>\\n<h4>Description</h4>\\n<p>Can you figure out what is in the&nbsp;<code>eax</code>&nbsp;register? Put your answer in the picoCTF flag format:&nbsp;<code>picoCTF{n}</code>&nbsp;where&nbsp;<code>n</code>&nbsp;is the contents of the&nbsp;<code>eax</code>&nbsp;register in the decimal number base. If the answer was&nbsp;<code>0x11</code>&nbsp;your flag would be&nbsp;<code>picoCTF{17}</code>.Download the assembly dump&nbsp;<a href=\\"https://artifacts.picoctf.net/c/510/disassembler-dump0_b.txt\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">here</a>.</p>","autoDesc":true}');export{c as comp,d as data};
