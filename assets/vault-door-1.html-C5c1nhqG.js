import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,b as o,o as r}from"./app-BBdimx1S.js";const s={};function i(p,e){return r(),t("div",null,e[0]||(e[0]=[o('<p>30,353 users solved<br> Author: Mark E. Haase</p><h4 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h4><p>This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is here: <a href="https://jupiter.challenges.picoctf.org/static/29b91e638ccbd76aaa8c0462d1c64d8d/VaultDoor1.java" target="_blank" rel="noopener noreferrer">VaultDoor1.java</a></p><h4 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h4><p>Look up the charAt() method online.</p><hr><h1 id="解题过程" tabindex="-1"><a class="header-anchor" href="#解题过程"><span>解题过程</span></a></h1><p>很简单的逻辑<br><code>VaultDoor1</code>是一个验证用户输入的flag是否正确的方法,会将picoCTF<code>{</code>后以及<code>}</code>以前的部分传入<code>checkPassword</code><br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223145952.png" alt="image.png" loading="lazy"><br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223150256.png" alt="image.png" loading="lazy"></p><p>flag明文在<code>checkPassword</code>中，直接人脑读取即可</p><div class="language-flag line-numbers-mode" data-highlighter="shiki" data-ext="flag" data-title="flag" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>picoCTF{d35cr4mbl3_tH3_cH4r4cT3r5_ff63b0}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>',10)]))}const l=a(s,[["render",i],["__file","vault-door-1.html.vue"]]),d=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/picoCTF/%E9%80%86%E5%90%91%20reverse/vault-door-1.html","title":"vault-door-1","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-23T00:00:00.000Z","tags":null,"title":"vault-door-1","category":["领域"],"description":"30,353 users solved Author: Mark E. Haase Description This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is ...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/picoCTF/%E9%80%86%E5%90%91%20reverse/vault-door-1.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"vault-door-1"}],["meta",{"property":"og:description","content":"30,353 users solved Author: Mark E. Haase Description This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223145952.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-26T04:37:03.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-26T04:37:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vault-door-1\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223145952.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241223150256.png\\"],\\"datePublished\\":\\"2024-12-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-26T04:37:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1734952038000,"updatedTime":1735187823000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":72,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.42,"words":127},"filePathRelative":"article/02_领域/picoCTF/逆向 reverse/vault-door-1.md","localizedDate":"2024年12月23日","excerpt":"<p>30,353&nbsp;users solved<br>\\nAuthor:&nbsp;Mark E. Haase</p>\\n<h4>Description</h4>\\n<p>This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is here:&nbsp;<a href=\\"https://jupiter.challenges.picoctf.org/static/29b91e638ccbd76aaa8c0462d1c64d8d/VaultDoor1.java\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">VaultDoor1.java</a></p>","autoDesc":true}');export{l as comp,d as data};
