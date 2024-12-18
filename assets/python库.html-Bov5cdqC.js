import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,b as a,o as t}from"./app-CAkMjlJ4.js";const n={};function l(p,s){return t(),i("div",null,s[0]||(s[0]=[a(`<h1 id="写出你想学的库" tabindex="-1"><a class="header-anchor" href="#写出你想学的库"><span>写出你想学的库：</span></a></h1><ol><li>sys</li></ol><h1 id="_0x01-sys" tabindex="-1"><a class="header-anchor" href="#_0x01-sys"><span>0x01 sys</span></a></h1><h2 id="_1-获取命令行参数" tabindex="-1"><a class="header-anchor" href="#_1-获取命令行参数"><span>1. 获取命令行参数</span></a></h2><h3 id="sys-argv" tabindex="-1"><a class="header-anchor" href="#sys-argv"><span>sys.argv</span></a></h3><p>返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数</p><h2 id="_2-查找模块路径" tabindex="-1"><a class="header-anchor" href="#_2-查找模块路径"><span>2. 查找模块路径</span></a></h2><h3 id="sys-path" tabindex="-1"><a class="header-anchor" href="#sys-path"><span>sys.path</span></a></h3><p>返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用import 模块名，来导入模块</p><h2 id="_3-查找和操作已导入的模块" tabindex="-1"><a class="header-anchor" href="#_3-查找和操作已导入的模块"><span>3.查找和操作已导入的模块</span></a></h2><h3 id="sys-modules" tabindex="-1"><a class="header-anchor" href="#sys-modules"><span>sys.modules</span></a></h3><p>返回一个字典，包含了已导入的模块，例如可以用sys.modules检查已导入的模块if...</p><h2 id="_4-重定向标准输入输出流" tabindex="-1"><a class="header-anchor" href="#_4-重定向标准输入输出流"><span>4. 重定向标准输入输出流</span></a></h2><p>sys提供了三个特殊的对象：<code>sys.stdin</code>、<code>sys.stderr</code>、<code>sys.stderr</code>，分别表示标准输入、标准输出和标准错误 。<br> 可以重定向这些流到其他<strong>文件</strong>或者<strong>设备</strong>上，从而改变输入来源和输出目标。<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png" alt="image.png" loading="lazy"></p><ul><li><p>以“<strong>写</strong>“的方式将输出重定向到文档&#39;output.txt&#39;上，会覆盖原先的内容，没有则会创建新文档<br> 打印&#39;This is a file&#39;，会重定向标准输出流到文档，不会在命令行显示<br><code>sys.stdout.close()</code> 关闭了对 <code>output.txt</code> 文件的写入，确保所有数据都被正确写入并释放了文件资源。</p></li><li><p><strong>当重定向操作结束后，需要退出重定向模式。</strong></p></li></ul><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">sys.stdout </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> sys.__stdout__</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="扩展知识" tabindex="-1"><a class="header-anchor" href="#扩展知识"><span>扩展知识：</span></a></h3><ul><li><p>文件<strong>对象</strong>的创建并打开<br> 格式：<code>file = open(filename[,mode[,buffering]])</code></p></li><li><p>文件的打开模式<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2342sdf9a.png" alt="886e8f574b1711eac2c626a680538e9a.png" loading="lazy"></p></li><li><p>文件的关闭<br> (<strong>对文件进行读写操作后，关闭文件是一个很好的习惯</strong>):fiel.close()</p></li><li><p>文件的读取</p><h5 id="read-size" tabindex="-1"><a class="header-anchor" href="#read-size"><span>read(size):</span></a></h5><p>返回一个从指定文件中读取指定数据。如果size不填写，则读取全部内容</p></li><li><p>文件的写入</p><h5 id="write-string" tabindex="-1"><a class="header-anchor" href="#write-string"><span>write(string):</span></a></h5><p>接受一个字符串，从文件写入数据<br> tips：write语句不会自动换行，如果需要换行，则要使用换行符&#39;\\n&#39;<br> 按行对文件进行读写</p></li><li><p>按行对文件进行写入</p><h5 id="writelines-对象" tabindex="-1"><a class="header-anchor" href="#writelines-对象"><span>writelines(对象)</span></a></h5><p>接受一个列表，可以输出到文件，但是仍然需要加换行符进行换行，本质是对列表中的文件进行遍历写入</p></li><li><p>按行对文件进行读取</p><h5 id="readline-方法" tabindex="-1"><a class="header-anchor" href="#readline-方法"><span>readline()方法</span></a></h5><p>该方法返回一个字符串，用于文件指针当前位置读取一行文本，即遇到行结束符停止读取文本，但读取的内容包含了结束符。</p></li></ul><h2 id="_5-退出程序" tabindex="-1"><a class="header-anchor" href="#_5-退出程序"><span>5. 退出程序</span></a></h2><h3 id="sys-exit" tabindex="-1"><a class="header-anchor" href="#sys-exit"><span>sys.exit()</span></a></h3><p>通过调用<code>sys.exit()</code>退出Python程序，可以提供一个整数作为参数，用于指定退出码。</p><h2 id="_6-获取python解释器的信息" tabindex="-1"><a class="header-anchor" href="#_6-获取python解释器的信息"><span>6. 获取Python解释器的信息</span></a></h2><p>sys模块还提供了一些函数和变量来获取Python解释器的信息，如版本号、平台和系统路径。</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> sys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 打印Python版本号</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Python版本号:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, sys.version)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 打印平台信息</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;平台信息:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, sys.platform)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 打印系统路径</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;系统路径:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, sys.path)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24)]))}const d=e(n,[["render",l],["__file","python库.html.vue"]]),o=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/python%E5%BA%93.html","title":"python库","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-15T00:00:00.000Z","tags":["目标"],"title":"python库","description":"写出你想学的库： sys 0x01 sys 1. 获取命令行参数 sys.argv 返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数 2. 查找模块路径 sys.path 返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/python%E5%BA%93.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"python库"}],["meta",{"property":"og:description","content":"写出你想学的库： sys 0x01 sys 1. 获取命令行参数 sys.argv 返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数 2. 查找模块路径 sys.path 返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-18T11:57:21.000Z"}],["meta",{"property":"article:tag","content":"目标"}],["meta",{"property":"article:published_time","content":"2024-12-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-18T11:57:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"python库\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2342sdf9a.png\\"],\\"datePublished\\":\\"2024-12-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-18T11:57:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1. 获取命令行参数","slug":"_1-获取命令行参数","link":"#_1-获取命令行参数","children":[{"level":3,"title":"sys.argv","slug":"sys-argv","link":"#sys-argv","children":[]}]},{"level":2,"title":"2. 查找模块路径","slug":"_2-查找模块路径","link":"#_2-查找模块路径","children":[{"level":3,"title":"sys.path","slug":"sys-path","link":"#sys-path","children":[]}]},{"level":2,"title":"3.查找和操作已导入的模块","slug":"_3-查找和操作已导入的模块","link":"#_3-查找和操作已导入的模块","children":[{"level":3,"title":"sys.modules","slug":"sys-modules","link":"#sys-modules","children":[]}]},{"level":2,"title":"4. 重定向标准输入输出流","slug":"_4-重定向标准输入输出流","link":"#_4-重定向标准输入输出流","children":[{"level":3,"title":"扩展知识：","slug":"扩展知识","link":"#扩展知识","children":[]}]},{"level":2,"title":"5. 退出程序","slug":"_5-退出程序","link":"#_5-退出程序","children":[{"level":3,"title":"sys.exit()","slug":"sys-exit","link":"#sys-exit","children":[]}]},{"level":2,"title":"6. 获取Python解释器的信息","slug":"_6-获取python解释器的信息","link":"#_6-获取python解释器的信息","children":[]}],"git":{"createdTime":1734341801000,"updatedTime":1734523041000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":44,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":2.51,"words":753},"filePathRelative":"article/02_领域/python库.md","localizedDate":"2024年12月15日","excerpt":"\\n<ol>\\n<li>sys</li>\\n</ol>\\n<h1>0x01 sys</h1>\\n<h2>1. 获取命令行参数</h2>\\n<h3>sys.argv</h3>\\n<p>返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数</p>\\n<h2>2. 查找模块路径</h2>\\n<h3>sys.path</h3>\\n<p>返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用import 模块名，来导入模块</p>\\n<h2>3.查找和操作已导入的模块</h2>\\n<h3>sys.modules</h3>","autoDesc":true}');export{d as comp,o as data};
