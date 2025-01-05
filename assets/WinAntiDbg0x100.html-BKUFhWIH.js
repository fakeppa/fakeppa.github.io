import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,b as n,o as a}from"./app-COulVrQe.js";const o={};function r(p,e){return a(),i("div",null,e[0]||(e[0]=[n('<p><em>段位还是不够 :&lt;</em><br> Author: Nandan Desai</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>This challenge will introduce you to &#39;Anti-Debugging.&#39; Malware developers don&#39;t like it when you attempt to debug their executable files because debugging these files reveals many of their secrets! That&#39;s why, they include a lot of code logic specifically designed to interfere with your debugging process.Now that you&#39;ve understood the context, go ahead and debug this Windows executable!This challenge binary file is a Windows console application and you can start with running it using on Windows.<code>cmd</code>Challenge can be downloaded <a href="https://artifacts.picoctf.net/c_titan/55/WinAntiDbg0x100.zip" target="_blank" rel="noopener noreferrer">here</a>. Unzip the archive with the password <code>picoctf</code></p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><p>Hints will be displayed to the Debug console. Good luck!</p><hr><h1 id="_00-前言" tabindex="-1"><a class="header-anchor" href="#_00-前言"><span>00. 前言</span></a></h1><p><em>第一次接触逆向，这是前所未有的挑战</em></p><h1 id="_01-解题过程" tabindex="-1"><a class="header-anchor" href="#_01-解题过程"><span>01. 解题过程</span></a></h1><p>尝试运行给定文件<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133402.png" alt="image.png" loading="lazy"><br> 提示我们用debugger打开<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133650.png" alt="image.png" loading="lazy"><br> 在互联网上看到的应用，先下载这个调试工具试试<br> 拖到debug中发现这些都是32位寄存器<br><em>32位寄存器通常由E开头，64位由R开头</em></p><p>利用调试器进行逐步分析，可以看到输出了log日志<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222140047.png" alt="image.png" loading="lazy"><br> 意思是检测到我们正在使用debugger了，我们需要绕过检查</p>',11)]))}const c=t(o,[["render",r],["__file","WinAntiDbg0x100.html.vue"]]),d=JSON.parse(`{"path":"/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/WinAntiDbg0x100.html","title":"WinAntiDbg0x100","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-22T00:00:00.000Z","tags":null,"title":"WinAntiDbg0x100","category":["项目"],"description":"段位还是不够 :< Author: Nandan Desai Description This challenge will introduce you to 'Anti-Debugging.' Malware developers don't like it when you attempt to debug their executable fil...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/picoCTF/%E9%80%86%E5%90%91reverse/WinAntiDbg0x100.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"WinAntiDbg0x100"}],["meta",{"property":"og:description","content":"段位还是不够 :< Author: Nandan Desai Description This challenge will introduce you to 'Anti-Debugging.' Malware developers don't like it when you attempt to debug their executable fil..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133402.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-05T08:38:39.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-05T08:38:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WinAntiDbg0x100\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133402.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222133650.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222140047.png\\"],\\"datePublished\\":\\"2024-12-22T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-05T08:38:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1734936677000,"updatedTime":1736066319000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":284,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.93,"words":280},"filePathRelative":"article/01_项目/picoCTF/逆向reverse/WinAntiDbg0x100.md","localizedDate":"2024年12月22日","excerpt":"<p><em>段位还是不够 :&lt;</em><br>\\nAuthor:&nbsp;Nandan Desai</p>\\n<h4>Description</h4>\\n<p>This challenge will introduce you to 'Anti-Debugging.' Malware developers don't like it when you attempt to debug their executable files because debugging these files reveals many of their secrets! That's why, they include a lot of code logic specifically designed to interfere with your debugging process.Now that you've understood the context, go ahead and debug this Windows executable!This challenge binary file is a Windows console application and you can start with running it using&nbsp;on Windows.<code>cmd</code>Challenge can be downloaded&nbsp;<a href=\\"https://artifacts.picoctf.net/c_titan/55/WinAntiDbg0x100.zip\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">here</a>. Unzip the archive with the password&nbsp;<code>picoctf</code></p>","autoDesc":true}`);export{c as comp,d as data};