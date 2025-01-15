import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as i}from"./app-dEkPy6dK.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>4,177 users solved</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>For what argument does this program print <code>win</code> with variables <code>87</code>, <code>3</code> and <code>3</code>? File: <a href="https://mercury.picoctf.net/static/52fa2dfbc7fb145f0a4bf7fd2a89fc49/chall_1.S" target="_blank" rel="noopener noreferrer">chall_1.S</a> Flag format: picoCTF{XXXXXXXX} -&gt; (hex, lowercase, no 0x, and 32 bits. ex. 5614267 would be picoCTF{0055aabb})</p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><p>Shifts</p><hr><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>w0 &gt;[12]=初始值 </span></span>
<span class="line"><span>&gt;87 &gt;[16]=87</span></span>
<span class="line"><span>&gt;3 &gt;[20]=3 &gt;[24]=3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0 </span></span>
<span class="line"><span>=[20] =3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w1=[16]=87</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0=w1&lt;&lt;w0=87&lt;&lt;3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0 &gt;[28]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w1=[28]=87&lt;&lt;3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0=[24]=3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0=w1/w0=(87&lt;&lt;3)/3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0 &gt;[28]=(87&lt;&lt;3)/3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后一次更改：w1=[28]=(87&lt;&lt;3)/3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0=[12]=初始值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后一次更改：w0=w1-w0=((87&lt;&lt;3)/3)-初始值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w0&gt;[28]=((87&lt;&lt;3)/3)-初始值</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)]))}const o=n(l,[["render",p],["__file","ARMssembly 1.html.vue"]]),d=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/ARMssembly%201.html","title":"ARMssembly 1","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-01-15T00:00:00.000Z","tags":null,"title":"ARMssembly 1","category":["项目"],"description":"4,177 users solved Description For what argument does this program print win with variables 87, 3 and 3? File: chall_1.S Flag format: picoCTF{XXXXXXXX} -> (hex, lowercase, no 0x...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/ARMssembly%201.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"ARMssembly 1"}],["meta",{"property":"og:description","content":"4,177 users solved Description For what argument does this program print win with variables 87, 3 and 3? File: chall_1.S Flag format: picoCTF{XXXXXXXX} -> (hex, lowercase, no 0x..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T15:15:22.000Z"}],["meta",{"property":"article:published_time","content":"2025-01-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T15:15:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ARMssembly 1\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-15T15:15:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1736949557000,"updatedTime":1736954122000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":14,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.46,"words":139},"filePathRelative":"article/01_项目/picoCTF/逆向reverse/ARMssembly 1.md","localizedDate":"2025年1月15日","excerpt":"<p>4,177&nbsp;users solved</p>\\n<h4>Description</h4>\\n<p>For what argument does this program print <code>win</code> with variables&nbsp;<code>87</code>,&nbsp;<code>3</code>&nbsp;and&nbsp;<code>3</code>? File:&nbsp;<a href=\\"https://mercury.picoctf.net/static/52fa2dfbc7fb145f0a4bf7fd2a89fc49/chall_1.S\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">chall_1.S</a>&nbsp;Flag format: picoCTF{XXXXXXXX} -&gt; (hex, lowercase, no 0x, and 32 bits. ex. 5614267 would be picoCTF{0055aabb})</p>","autoDesc":true}');export{o as comp,d as data};
