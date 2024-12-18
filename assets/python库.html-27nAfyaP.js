import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as a,o as p}from"./app-0fi_4W5l.js";const n={};function o(r,e){return p(),s("div",null,e[0]||(e[0]=[a('<h1 id="写出你想学的库" tabindex="-1"><a class="header-anchor" href="#写出你想学的库"><span>写出你想学的库：</span></a></h1><ol><li>sys</li></ol><h1 id="_0x01-sys" tabindex="-1"><a class="header-anchor" href="#_0x01-sys"><span>0x01 sys</span></a></h1><h2 id="_1-获取命令行参数sys-argv" tabindex="-1"><a class="header-anchor" href="#_1-获取命令行参数sys-argv"><span>1. 获取命令行参数sys.argv</span></a></h2><p>返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数</p><h2 id="_2-查找模块路径sys-path" tabindex="-1"><a class="header-anchor" href="#_2-查找模块路径sys-path"><span>2. 查找模块路径sys.path</span></a></h2><p>返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用import 模块名，来导入模块</p><h2 id="_3-sys-modules" tabindex="-1"><a class="header-anchor" href="#_3-sys-modules"><span>3. sys.modules</span></a></h2><p>返回一个字典，包含了已导入的模块，例如可以用sys.modules检查已导入的模块if...</p><h2 id="_4-重定向标准输入输出流" tabindex="-1"><a class="header-anchor" href="#_4-重定向标准输入输出流"><span>4. 重定向标准输入输出流</span></a></h2><p>sys提供了三个特殊的对象：<code>sys.stdin</code>、<code>sys.stderr</code>、<code>sys.stderr</code>，分别表示标准输入、标准输出和标准错误 。<br> 可以重定向这些流到其他<strong>文件</strong>或者<strong>设备</strong>上，从而改变输入来源和输出目标。<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png" alt="image.png" loading="lazy"><br> 以“<strong>写</strong>“的方式将输出重定向到文档&#39;output.txt&#39;上，会覆盖原先的内容，没有则会创建新文档<br> 打印&#39;This is a file&#39;，会重定向标准输出流到文档，不会在命令行显示<br><code>sys.stdout.close()</code> 关闭了对 <code>output.txt</code> 文件的写入，确保所有数据都被正确写入并释放了文件资源。<br> 扩展知识：</p><ul><li><p>文件对象的创建并打开：<code>file = open(filename[,mode[,buffering]])</code></p></li><li><p>文件的打开模式<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2342sdf9a.png" alt="886e8f574b1711eac2c626a680538e9a.png" loading="lazy"></p></li><li><p>文件的关闭(<strong>对文件进行读写操作后，关闭文件是一个很好的习惯</strong>):fiel.close()</p></li><li><p>文件的读取：read(size):从指定文件中读取指定数据。</p></li></ul>',12)]))}const h=t(n,[["render",o],["__file","python库.html.vue"]]),d=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/python%E5%BA%93.html","title":"python库","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-15T00:00:00.000Z","tags":["目标"],"title":"python库","description":"写出你想学的库： sys 0x01 sys 1. 获取命令行参数sys.argv 返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数 2. 查找模块路径sys.path 返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用i...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/python%E5%BA%93.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"python库"}],["meta",{"property":"og:description","content":"写出你想学的库： sys 0x01 sys 1. 获取命令行参数sys.argv 返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数 2. 查找模块路径sys.path 返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用i..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-18T11:06:39.000Z"}],["meta",{"property":"article:tag","content":"目标"}],["meta",{"property":"article:published_time","content":"2024-12-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-18T11:06:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"python库\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241218185249.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/2342sdf9a.png\\"],\\"datePublished\\":\\"2024-12-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-18T11:06:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1. 获取命令行参数sys.argv","slug":"_1-获取命令行参数sys-argv","link":"#_1-获取命令行参数sys-argv","children":[]},{"level":2,"title":"2. 查找模块路径sys.path","slug":"_2-查找模块路径sys-path","link":"#_2-查找模块路径sys-path","children":[]},{"level":2,"title":"3. sys.modules","slug":"_3-sys-modules","link":"#_3-sys-modules","children":[]},{"level":2,"title":"4. 重定向标准输入输出流","slug":"_4-重定向标准输入输出流","link":"#_4-重定向标准输入输出流","children":[]}],"git":{"createdTime":1734341801000,"updatedTime":1734519999000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":36,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":1.37,"words":411},"filePathRelative":"article/02_领域/python库.md","localizedDate":"2024年12月15日","excerpt":"\\n<ol>\\n<li>sys</li>\\n</ol>\\n<h1>0x01 sys</h1>\\n<h2>1. 获取命令行参数sys.argv</h2>\\n<p>返回一个列表，第一个元素为本文件路径（或者本python文件名称），其余为命令行传递的参数</p>\\n<h2>2. 查找模块路径sys.path</h2>\\n<p>返回一个列表，包含了模块的所有路径，可以用sys.path.append(模块名(对象名))来导入自定义模块(对象名指向的)的路径，随后直接用import 模块名，来导入模块</p>\\n<h2>3. sys.modules</h2>\\n<p>返回一个字典，包含了已导入的模块，例如可以用sys.modules检查已导入的模块if...</p>","autoDesc":true}');export{h as comp,d as data};
