import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as i,o as n}from"./app-Brh6NIvn.js";const p={};function o(r,e){return n(),a("div",null,e[0]||(e[0]=[i(`<p>Author: Geoffrey Njogu</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>This file was found among some files marked confidential but my pdf reader cannot read it, maybe yours can.You can download the file from <a href="https://artifacts.picoctf.net/c/82/Flag.pdf" target="_blank" rel="noopener noreferrer">here</a>.</p><h5 id="hint" tabindex="-1"><a class="header-anchor" href="#hint"><span>hint</span></a></h5><p>Remember that some file types can contain and nest other files</p><h2 id="解题" tabindex="-1"><a class="header-anchor" href="#解题"><span>解题</span></a></h2><p>本文提供了一个pdf文件，但是打不开，尝试文本文档打开，发现似乎是一个脚本，在linux终端的脚本<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219140541.png" alt="image.png" loading="lazy"><br> 随后更改文件后缀为.sh去执行这个文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>mv flag.pdf flag.sh</span></span>
<span class="line"><span>./flag.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>发现一个flag文件,查看文件类型发现是一个ar归档文件<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141031.png" alt="image.png" loading="lazy"></p><p>用递归<code>ar -x file</code>去提取文件得到 <code>cpio</code> 归档文件<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141205.png" alt="image.png" loading="lazy"></p><p>用<code>cpio -i &lt; flag</code>去提取文件,但是要先改名，之后再提取，否则会重名冲突<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142028.png" alt="image.png" loading="lazy"></p><p>发现bzip文件,用<code>bzip2 -d lfag</code>解压缩bzip文件<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142516.png" alt="image.png" loading="lazy"></p><p>发现gzip文件flag.out<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142652.png" alt="image.png" loading="lazy"></p>`,13)]))}const d=t(p,[["render",o],["__file","File types.html.vue"]]),c=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/File%20types.html","title":"File types","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-19T00:00:00.000Z","tags":null,"title":"File types","category":["项目"],"description":"Author: Geoffrey Njogu Description This file was found among some files marked confidential but my pdf reader cannot read it, maybe yours can.You can download the file from here...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/File%20types.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"File types"}],["meta",{"property":"og:description","content":"Author: Geoffrey Njogu Description This file was found among some files marked confidential but my pdf reader cannot read it, maybe yours can.You can download the file from here..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219140541.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-19T06:28:41.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-19T06:28:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"File types\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219140541.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141031.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219141205.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142028.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142516.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241219142652.png\\"],\\"datePublished\\":\\"2024-12-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-19T06:28:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"解题","slug":"解题","link":"#解题","children":[]}],"git":{"createdTime":1734588827000,"updatedTime":1734589721000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":5,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.78,"words":234},"filePathRelative":"article/01_项目/picoCTF/File types.md","localizedDate":"2024年12月19日","excerpt":"<p>Author:&nbsp;Geoffrey Njogu</p>\\n<h4>Description</h4>\\n<p>This file was found among some files marked confidential but my pdf reader cannot read it, maybe yours can.You can download the file from&nbsp;<a href=\\"https://artifacts.picoctf.net/c/82/Flag.pdf\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">here</a>.</p>","autoDesc":true}');export{d as comp,c as data};
