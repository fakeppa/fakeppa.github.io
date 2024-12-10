import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as n,o as e}from"./app-C5Kn8Wy6.js";const l={};function t(h,i){return e(),a("div",null,i[0]||(i[0]=[n(`<p>在Ubuntu系统中使用VuePress搭建博客的步骤如下：</p><ol><li><p><strong>环境准备</strong>：</p><ul><li>确保你的Ubuntu系统已经安装了Node.js和npm。如果没有安装，可以从Node官网下载安装包进行安装。</li><li>安装Git，可以从git官网下载安装包进行安装。</li></ul></li><li><p><strong>创建项目目录</strong>：</p><ul><li>在Ubuntu中创建一个新的目录，用于存放博客项目，例如：<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>mkdir my-blog</span></span>
<span class="line"><span>cd my-blog</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>使用npm初始化项目：<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm init -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>安装VuePress作为本地依赖：<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm install -D vuepress</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>创建文档目录和内容</strong>：</p><ul><li>创建<code>docs</code>目录，并在其中创建<code>README.md</code>文件作为博客的首页：<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>mkdir docs</span></span>
<span class="line"><span>echo &#39;# Hello VuePress&#39; &gt; docs/README.md</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>确保<code>README.md</code>的编码格式为UTF-8，以避免乱码问题。</li></ul></li><li><p><strong>配置VuePress</strong>：</p><ul><li>在<code>docs</code>目录下创建<code>.vuepress</code>目录，并在其中创建<code>config.js</code>文件，用于配置网站的标题、描述等信息：<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">module</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">exports</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  title</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;My Blog&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  description</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;A simple VuePress blog&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  base</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 这是部署到github相关的配置</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  markdown</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    lineNumbers</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 代码块显示行号</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  themeConfig</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    nav</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 导航栏配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">text</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;Home&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">link</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">text</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;About&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">link</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/about/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ],</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    sidebar</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;auto&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 侧边栏配置</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    sidebarDepth</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 侧边栏显示2级</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>在<code>package.json</code>文件中添加启动命令：<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  &quot;scripts&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;dev&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;vuepress dev docs&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;build&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;vuepress build docs&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p><strong>启动本地服务器</strong>：</p><ul><li>运行以下命令启动本地开发服务器：<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm run dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>VuePress会在<code>http://localhost:8080</code>启动一个热重载的开发服务器。</li></ul></li><li><p><strong>编写文章</strong>：</p><ul><li>在<code>docs</code>目录下新建<code>.md</code>文件来编写博客文章，使用Markdown语法。</li></ul></li><li><p><strong>部署博客</strong>：</p><ul><li>你可以选择将博客部署到GitHub Pages或者自己的服务器上。如果是部署到GitHub Pages，需要将代码推送到GitHub仓库，并在<code>config.js</code>中设置正确的<code>base</code>路径。</li></ul></li></ol><p>以上步骤可以帮助你在Ubuntu系统中使用VuePress搭建一个个人博客。更多高级配置和主题定制，可以参考VuePress的官方文档和相关主题的文档。</p>`,3)]))}const d=s(l,[["render",t],["__file","vuepress搭建博客教程.html.vue"]]),r=JSON.parse(`{"path":"/article/04_%E5%BD%92%E6%A1%A3/vuepress%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2%E6%95%99%E7%A8%8B.html","title":"","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-10T00:00:00.000Z","category":["归档"],"tags":null,"description":"在Ubuntu系统中使用VuePress搭建博客的步骤如下： 环境准备： 确保你的Ubuntu系统已经安装了Node.js和npm。如果没有安装，可以从Node官网下载安装包进行安装。 安装Git，可以从git官网下载安装包进行安装。 创建项目目录： 在Ubuntu中创建一个新的目录，用于存放博客项目，例如： 使用npm初始化项目： 安装VuePres...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/04_%E5%BD%92%E6%A1%A3/vuepress%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2%E6%95%99%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"fakeppa"}],["meta",{"property":"og:description","content":"在Ubuntu系统中使用VuePress搭建博客的步骤如下： 环境准备： 确保你的Ubuntu系统已经安装了Node.js和npm。如果没有安装，可以从Node官网下载安装包进行安装。 安装Git，可以从git官网下载安装包进行安装。 创建项目目录： 在Ubuntu中创建一个新的目录，用于存放博客项目，例如： 使用npm初始化项目： 安装VuePres..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-10T17:37:58.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-10T17:37:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-10T17:37:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1733762599000,"updatedTime":1733852278000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":2,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":1.71,"words":512},"filePathRelative":"article/04_归档/vuepress搭建博客教程.md","localizedDate":"2024年12月10日","excerpt":"<p>在Ubuntu系统中使用VuePress搭建博客的步骤如下：</p>\\n<ol>\\n<li>\\n<p><strong>环境准备</strong>：</p>\\n<ul>\\n<li>确保你的Ubuntu系统已经安装了Node.js和npm。如果没有安装，可以从Node官网下载安装包进行安装。</li>\\n<li>安装Git，可以从git官网下载安装包进行安装。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>创建项目目录</strong>：</p>\\n<ul>\\n<li>在Ubuntu中创建一个新的目录，用于存放博客项目，例如：<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>mkdir my-blog</span></span>\\n<span class=\\"line\\"><span>cd my-blog</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n<li>使用npm初始化项目：<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>npm init -y</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div></li>\\n<li>安装VuePress作为本地依赖：<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>npm install -D vuepress</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div></li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>创建文档目录和内容</strong>：</p>\\n<ul>\\n<li>创建<code>docs</code>目录，并在其中创建<code>README.md</code>文件作为博客的首页：<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>mkdir docs</span></span>\\n<span class=\\"line\\"><span>echo '# Hello VuePress' &gt; docs/README.md</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n<li>确保<code>README.md</code>的编码格式为UTF-8，以避免乱码问题。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>配置VuePress</strong>：</p>\\n<ul>\\n<li>在<code>docs</code>目录下创建<code>.vuepress</code>目录，并在其中创建<code>config.js</code>文件，用于配置网站的标题、描述等信息：<div class=\\"language-javascript line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"javascript\\" data-title=\\"javascript\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\">module</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\">exports</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  title</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> 'My Blog'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">,</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  description</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> 'A simple VuePress blog'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">,</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  base</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> '/'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\">// 这是部署到github相关的配置</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  markdown</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  </span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">    lineNumbers</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> false</span><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\"> // 代码块显示行号</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  },</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  themeConfig</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">    nav</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> [ </span><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\">// 导航栏配置</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">      { </span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">text</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> 'Home'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">link</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> '/'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> },</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">      { </span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">text</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> 'About'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">link</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> '/about/'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    ],</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">    sidebar</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> 'auto'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\">// 侧边栏配置</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">    sidebarDepth</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 2</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\">// 侧边栏显示2级</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">};</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n<li>在<code>package.json</code>文件中添加启动命令：<div class=\\"language-json line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"json\\" data-title=\\"json\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  \\"scripts\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">: {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">    \\"dev\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"vuepress dev docs\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">,</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">    \\"build\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"vuepress build docs\\"</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>启动本地服务器</strong>：</p>\\n<ul>\\n<li>运行以下命令启动本地开发服务器：<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>npm run dev</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div></li>\\n<li>VuePress会在<code>http://localhost:8080</code>启动一个热重载的开发服务器。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>编写文章</strong>：</p>\\n<ul>\\n<li>在<code>docs</code>目录下新建<code>.md</code>文件来编写博客文章，使用Markdown语法。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>部署博客</strong>：</p>\\n<ul>\\n<li>你可以选择将博客部署到GitHub Pages或者自己的服务器上。如果是部署到GitHub Pages，需要将代码推送到GitHub仓库，并在<code>config.js</code>中设置正确的<code>base</code>路径。</li>\\n</ul>\\n</li>\\n</ol>","autoDesc":true}`);export{d as comp,r as data};
