import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as a,o as n}from"./app-CcUypSFY.js";const i={};function r(o,e){return n(),s("div",null,e[0]||(e[0]=[a(`<p>7,056 users solved</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>Can you figure out what is in the <code>eax</code> register? Put your answer in the picoCTF flag format: <code>picoCTF{n}</code> where <code>n</code> is the contents of the <code>eax</code> register in the decimal number base. If the answer was <code>0x11</code> your flag would be <code>picoCTF{17}</code>.Download the assembly dump <a href="https://artifacts.picoctf.net/c/509/disassembler-dump0_a.txt" target="_blank" rel="noopener noreferrer">here</a>.</p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><p>As with most assembly, there is a lot of noise in the instruction dump. Find the one line that pertains to this question and don&#39;t second guess yourself!</p><hr><h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h1><p>有一个新的mov指令没见过，这是一个x86架构的mov</p><h1 id="解题过程" tabindex="-1"><a class="header-anchor" href="#解题过程"><span>解题过程</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;+0&gt;:     endbr64 </span></span>
<span class="line"><span>&lt;+4&gt;:     push   rbp</span></span>
<span class="line"><span>&lt;+5&gt;:     mov    rbp,rsp</span></span>
<span class="line"><span>&lt;+8&gt;:     mov    DWORD PTR [rbp-0x4],edi</span></span>
<span class="line"><span>&lt;+11&gt;:    mov    QWORD PTR [rbp-0x10],rsi</span></span>
<span class="line"><span>&lt;+15&gt;:    mov    eax,0x30</span></span>
<span class="line"><span>&lt;+20&gt;:    pop    rbp</span></span>
<span class="line"><span>&lt;+21&gt;:    ret</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接看</p>`,11)]))}const l=t(i,[["render",r],["__file","Bit-O-Asm-1.html.vue"]]),d=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/Bit-O-Asm-1.html","title":"Bit-O-Asm-1","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-01-02T00:00:00.000Z","tags":null,"title":"Bit-O-Asm-1","category":["项目"],"description":"7,056 users solved Description Can you figure out what is in the eax register? Put your answer in the picoCTF flag format: picoCTF{n} where n is the contents of the eax register...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/Bit-O-Asm-1.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"Bit-O-Asm-1"}],["meta",{"property":"og:description","content":"7,056 users solved Description Can you figure out what is in the eax register? Put your answer in the picoCTF flag format: picoCTF{n} where n is the contents of the eax register..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-02T04:43:03.000Z"}],["meta",{"property":"article:published_time","content":"2025-01-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-02T04:43:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Bit-O-Asm-1\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-02T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-02T04:43:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1735792983000,"updatedTime":1735792983000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":1,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.56,"words":167},"filePathRelative":"article/01_项目/picoCTF/逆向reverse/Bit-O-Asm-1.md","localizedDate":"2025年1月2日","excerpt":"<p>7,056&nbsp;users solved</p>\\n<h4>Description</h4>\\n<p>Can you figure out what is in the&nbsp;<code>eax</code>&nbsp;register? Put your answer in the picoCTF flag format:&nbsp;<code>picoCTF{n}</code>&nbsp;where&nbsp;<code>n</code>&nbsp;is the contents of the&nbsp;<code>eax</code>&nbsp;register in the decimal number base. If the answer was&nbsp;<code>0x11</code>&nbsp;your flag would be&nbsp;<code>picoCTF{17}</code>.Download the assembly dump&nbsp;<a href=\\"https://artifacts.picoctf.net/c/509/disassembler-dump0_a.txt\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">here</a>.</p>","autoDesc":true}');export{l as comp,d as data};
