import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as i,o}from"./app-D2VfrRUu.js";const r={};function n(c,e){return o(),a("div",null,e[0]||(e[0]=[i('<p>check_MDhead是一个检查.md元数据是否正确的工具，当然，这只是个简单的实现</p><h1 id="_00-实现思路" tabindex="-1"><a class="header-anchor" href="#_00-实现思路"><span>00. 实现思路</span></a></h1><p>在python中写出代码，然后用pyinstaller进行exe打包</p><ol><li>输入需要检查的category项</li><li>读取category分类文件夹下的每个文件，包括子文件夹文件</li><li>检查文件头</li><li>输出检测结果，正确或错误</li></ol><h1 id="_01-遇到的困难-经验" tabindex="-1"><a class="header-anchor" href="#_01-遇到的困难-经验"><span>01. 遇到的困难/经验</span></a></h1><h2 id="经验" tabindex="-1"><a class="header-anchor" href="#经验"><span>经验</span></a></h2><p>使用<code>readline()</code>意外将读取指针下调，这时使用<br><code>line = str(file.readline())</code>,就可以隔离readline()的作用</p><h2 id="困难" tabindex="-1"><a class="header-anchor" href="#困难"><span>困难</span></a></h2><ol><li>正则匹配汉字出现了困难，没有解决</li><li><code>for root, dirs, files in os.walk(...)</code>的作用还需要研究</li></ol><h1 id="_02-待改进的部分" tabindex="-1"><a class="header-anchor" href="#_02-待改进的部分"><span>02. 待改进的部分</span></a></h1>',10)]))}const h=t(r,[["render",n],["__file","在check_MDhead项目中的经验.html.vue"]]),d=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/Python/%E5%9C%A8check_MDhead%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E7%BB%8F%E9%AA%8C.html","title":"在check_MDhead项目中的经验","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-02-28T00:00:00.000Z","tags":null,"title":"在check_MDhead项目中的经验","category":["领域"],"description":"check_MDhead是一个检查.md元数据是否正确的工具，当然，这只是个简单的实现 00. 实现思路 在python中写出代码，然后用pyinstaller进行exe打包 输入需要检查的category项 读取category分类文件夹下的每个文件，包括子文件夹文件 检查文件头 输出检测结果，正确或错误 01. 遇到的困难/经验 经验 使用read...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/Python/%E5%9C%A8check_MDhead%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E7%BB%8F%E9%AA%8C.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"在check_MDhead项目中的经验"}],["meta",{"property":"og:description","content":"check_MDhead是一个检查.md元数据是否正确的工具，当然，这只是个简单的实现 00. 实现思路 在python中写出代码，然后用pyinstaller进行exe打包 输入需要检查的category项 读取category分类文件夹下的每个文件，包括子文件夹文件 检查文件头 输出检测结果，正确或错误 01. 遇到的困难/经验 经验 使用read..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T08:22:00.000Z"}],["meta",{"property":"article:published_time","content":"2025-02-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T08:22:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在check_MDhead项目中的经验\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-02-28T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-01T08:22:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"经验","slug":"经验","link":"#经验","children":[]},{"level":2,"title":"困难","slug":"困难","link":"#困难","children":[]}],"git":{"createdTime":1740803376000,"updatedTime":1740817320000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":12,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.67,"words":201},"filePathRelative":"article/02_领域/Python/在check_MDhead项目中的经验.md","localizedDate":"2025年2月28日","excerpt":"<p>check_MDhead是一个检查.md元数据是否正确的工具，当然，这只是个简单的实现</p>\\n<h1>00. 实现思路</h1>\\n<p>在python中写出代码，然后用pyinstaller进行exe打包</p>\\n<ol>\\n<li>输入需要检查的category项</li>\\n<li>读取category分类文件夹下的每个文件，包括子文件夹文件</li>\\n<li>检查文件头</li>\\n<li>输出检测结果，正确或错误</li>\\n</ol>\\n<h1>01. 遇到的困难/经验</h1>\\n<h2>经验</h2>\\n<p>使用<code>readline()</code>意外将读取指针下调，这时使用<br>\\n<code>line = str(file.readline())</code>,就可以隔离readline()的作用</p>","autoDesc":true}');export{h as comp,d as data};
