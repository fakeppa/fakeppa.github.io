import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as s,o as t}from"./app-DhqK3zu6.js";const n={};function l(d,e){return t(),a("div",null,e[0]||(e[0]=[s('<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">undo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> info-center</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> enable</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>关闭信息弹显</p><p>vlan的网关要在vlan接口内配置</p><p>接口内配置：属于的vlan，接口类型</p><hr><h1 id="dhcp" tabindex="-1"><a class="header-anchor" href="#dhcp"><span>DHCP</span></a></h1><h2 id="基于接口" tabindex="-1"><a class="header-anchor" href="#基于接口"><span>基于接口</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dhcp enable</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>开启dhcp服务<br> 然后进入vlan内,基于接口配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dhcp select interface</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>基于接口配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dhcp server dns-list 8.8.8.8</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>dhcp服务器，在收到分配的IP地址时也会被分配dns数据</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dhcp server excluded-ip-address list &lt;ip1&gt; &lt;ip2&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>排除，哪些IP不会被DHCP服务器分配</p><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250306172100.png" alt="image.png" loading="lazy"><br> 华为默认从最大的地址开始分配，思科则是最小的开始</p><h2 id="基于全局" tabindex="-1"><a class="header-anchor" href="#基于全局"><span>基于全局</span></a></h2><p>进入vlan后用全局配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dhcp select global</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ip pool 20</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>创建一个地址池</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>network 192.168.20.0 mask 24</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>',22)]))}const p=i(n,[["render",l],["__file","DHCP Vlan配置.html.vue"]]),c=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E4%B8%8B%E5%8D%88%E9%A2%98/DHCP%20Vlan%E9%85%8D%E7%BD%AE.html","title":"DHCP Vlan配置","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-03-06T00:00:00.000Z","tags":null,"title":"DHCP Vlan配置","category":["项目"],"description":"关闭信息弹显 vlan的网关要在vlan接口内配置 接口内配置：属于的vlan，接口类型 DHCP 基于接口 开启dhcp服务 然后进入vlan内,基于接口配置 基于接口配置 dhcp服务器，在收到分配的IP地址时也会被分配dns数据 排除，哪些IP不会被DHCP服务器分配 image.png 华为默认从最大的地址开始分配，思科则是最小的开始 基于全局...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E4%B8%8B%E5%8D%88%E9%A2%98/DHCP%20Vlan%E9%85%8D%E7%BD%AE.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"DHCP Vlan配置"}],["meta",{"property":"og:description","content":"关闭信息弹显 vlan的网关要在vlan接口内配置 接口内配置：属于的vlan，接口类型 DHCP 基于接口 开启dhcp服务 然后进入vlan内,基于接口配置 基于接口配置 dhcp服务器，在收到分配的IP地址时也会被分配dns数据 排除，哪些IP不会被DHCP服务器分配 image.png 华为默认从最大的地址开始分配，思科则是最小的开始 基于全局..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250306172100.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-06T09:37:22.000Z"}],["meta",{"property":"article:published_time","content":"2025-03-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-06T09:37:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DHCP Vlan配置\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250306172100.png\\"],\\"datePublished\\":\\"2025-03-06T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-06T09:37:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"基于接口","slug":"基于接口","link":"#基于接口","children":[]},{"level":2,"title":"基于全局","slug":"基于全局","link":"#基于全局","children":[]}],"git":{"createdTime":1741249312000,"updatedTime":1741253842000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":13,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.64,"words":192},"filePathRelative":"article/01_项目/网络工程师考试/下午题/DHCP Vlan配置.md","localizedDate":"2025年3月6日","excerpt":"<div class=\\"language-shell line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"shell\\" data-title=\\"shell\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">undo</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> info-center</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> enable</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{p as comp,c as data};
