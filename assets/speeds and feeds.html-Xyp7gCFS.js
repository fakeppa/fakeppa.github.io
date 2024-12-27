import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,b as a,o as r}from"./app-C4gyFheg.js";const s={};function p(o,e){return r(),n("div",null,e[0]||(e[0]=[a('<p>17,154 users solved<br> Author: Ryan Ramseyer</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>There is something on my shop network running at <code>nc mercury.picoctf.net 7032</code>, but I can&#39;t tell what it is. Can you?</p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><p>What language does a CNC machine use?</p><hr><h1 id="解题过程" tabindex="-1"><a class="header-anchor" href="#解题过程"><span>解题过程</span></a></h1><p>这题真的有意思<br> 我们查看题目给的nc的时候发现了这一坨<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152242.png" alt="image.png" loading="lazy"><br> 通过提示可以知道这个是CNC数控机床<br> 顺着CNC这个关键词查，发现了这个编程语言叫做G-code，粗浅了解了什么是G语言的</p><ul><li>G语言就是控制器械到从一个位置到另一个位置的简单的语言<br> 找一个可以运行G-code的网站，把这些代码粘到里面试试<br><a href="https://ncviewer.com/" target="_blank" rel="noopener noreferrer">NC Viewer // GCode Viewer and Machine Simulator</a><br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152613.png" alt="image.png" loading="lazy"></li></ul><p>哈，出来了，真是有趣.</p>',10)]))}const d=t(s,[["render",p],["__file","speeds and feeds.html.vue"]]),h=JSON.parse(`{"path":"/article/02_%E9%A2%86%E5%9F%9F/picoCTF/%E9%80%86%E5%90%91%20reverse/speeds%20and%20feeds.html","title":"speeds and feeds","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-24T00:00:00.000Z","tags":null,"title":"speeds and feeds","category":["领域"],"description":"17,154 users solved Author: Ryan Ramseyer Description There is something on my shop network running at nc mercury.picoctf.net 7032, but I can't tell what it is. Can you? Hints W...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/picoCTF/%E9%80%86%E5%90%91%20reverse/speeds%20and%20feeds.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"speeds and feeds"}],["meta",{"property":"og:description","content":"17,154 users solved Author: Ryan Ramseyer Description There is something on my shop network running at nc mercury.picoctf.net 7032, but I can't tell what it is. Can you? Hints W..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152242.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-27T09:08:53.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-27T09:08:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"speeds and feeds\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152242.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241224152613.png\\"],\\"datePublished\\":\\"2024-12-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-27T09:08:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1735112295000,"updatedTime":1735290533000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":85,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.7,"words":210},"filePathRelative":"article/02_领域/picoCTF/逆向 reverse/speeds and feeds.md","localizedDate":"2024年12月24日","excerpt":"<p>17,154&nbsp;users solved<br>\\nAuthor:&nbsp;Ryan Ramseyer</p>\\n<h4>Description</h4>\\n<p>There is something on my shop network running at&nbsp;<code>nc mercury.picoctf.net 7032</code>, but I can't tell what it is. Can you?</p>\\n<h4>Hints</h4>\\n<p>What language does a CNC machine use?</p>\\n<hr>\\n<h1>解题过程</h1>","autoDesc":true}`);export{d as comp,h as data};