import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,b as r,a as t,o as d}from"./app-Du7glDYj.js";const a={};function o(p,l){return d(),e("div",null,l[0]||(l[0]=[r('<h1 id="python-正则表达式" tabindex="-1"><a class="header-anchor" href="#python-正则表达式"><span>Python 正则表达式</span></a></h1><h2 id="re-match" tabindex="-1"><a class="header-anchor" href="#re-match"><span>re.match</span></a></h2><p>尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match() 就返回 none。</p><p><strong>函数语法</strong>：<br><strong>re.match</strong>(pattern,string,flags=0)<br> 函数参数说明：</p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>pattern</td><td>匹配的正则表达式</td></tr><tr><td>string</td><td>要匹配的字符串。</td></tr><tr><td>flags</td><td>标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等。参见：<a href="https://www.runoob.com/python/python-reg-expressions.html#flags" target="_blank" rel="noopener noreferrer">正则表达式修饰符 - 可选标志</a></td></tr></tbody></table><p>匹配成功 re.match 方法返回一个匹配的对象，否则返回 None。<br> 我们可以使用 group(num) 或 groups() 匹配对象函数来获取匹配表达式。</p><table><thead><tr><th>匹配对象方法</th><th>描述</th></tr></thead><tbody><tr><td>group(num=0)</td><td>匹配的整个表达式的字符串，group() 可以一次输入多个组号，在这种情况下它将返回一个包含那些组所对应值的元组。</td></tr><tr><td>groups()</td><td>返回一个包含所有小组字符串的元组，从 1 到 所含的小组号。</td></tr></tbody></table><h2 id="re-search方法" tabindex="-1"><a class="header-anchor" href="#re-search方法"><span>re.search方法</span></a></h2><p>re.search 扫描整个字符串并返回第一个成功的匹配。</p><p>函数语法：</p><p>re.search(pattern, string, flags=0)<br> 函数参数说明：</p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>pattern</td><td>匹配的正则表达式</td></tr><tr><td>string</td><td>要匹配的字符串。</td></tr><tr><td>flags</td><td>标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等。</td></tr></tbody></table><p>匹配成功re.search方法返回一个匹配的对象，否则返回None。</p><h3 id="检索和替换" tabindex="-1"><a class="header-anchor" href="#检索和替换"><span>检索和替换</span></a></h3><p>Python 的 re 模块提供了re.sub用于替换字符串中的匹配项。</p><p>语法：</p><p>re.sub(pattern\\w, repl, string, count=0, flags=0)</p><p>参数：</p><ul><li>pattern : 正则中的模式字符串。</li><li>repl : 替换的字符串，也可为一个函数。</li><li>string : 要被查找替换的原始字符串。</li><li>count : 模式匹配后替换的最大次数，默认 0 表示替换所有的匹配。</li></ul><h3 id="re-compile-函数" tabindex="-1"><a class="header-anchor" href="#re-compile-函数"><span>re.compile 函数</span></a></h3><p>compile 函数用于编译正则表达式，生成一个正则表达式（ Pattern ）对象，供 match() 和 search() 这两个函数使用。</p><p>语法格式为：</p><p>re.compile(pattern[, flags])</p><p>参数：</p><ul><li><p>pattern : 一个字符串形式的正则表达式</p></li><li><p>flags : 可选，表示匹配模式，比如忽略大小写，多行模式等，具体参数为：</p><ol><li><strong>re.I</strong> 忽略大小写</li><li><strong>re.L</strong> 表示特殊字符集 \\w, \\W, \\b, \\B, \\s, \\S 依赖于当前环境</li><li><strong>re.M</strong> 多行模式</li><li><strong>re.S</strong> 即为 . 并且包括换行符在内的任意字符（. 不包括换行符）</li><li><strong>re.U</strong> 表示特殊字符集 \\w, \\W, \\b, \\B, \\d, \\D, \\s, \\S 依赖于 Unicode 字符属性数据库</li><li><strong>re.X</strong> 为了增加可读性，忽略空格和 # 后面的注释<br> 在上面，当匹配成功时返回一个 Match 对象，其中：</li></ol></li><li><p><code>group([group1, …])</code> 方法用于获得一个或多个分组匹配的字符串，当要获得整个匹配的子串时，可直接使用 <code>group()</code> 或 <code>group(0)</code>；</p></li><li><p><code>start([group])</code> 方法用于获取分组匹配的子串在整个字符串中的起始位置（子串第一个字符的索引），参数默认值为 0；</p></li><li><p><code>end([group])</code> 方法用于获取分组匹配的子串在整个字符串中的结束位置（子串最后一个字符的索引+1），参数默认值为 0；</p></li><li><p><code>span([group])</code> 方法返回 <code>(start(group), end(group))</code>。</p></li></ul><h3 id="findall" tabindex="-1"><a class="header-anchor" href="#findall"><span>findall</span></a></h3><p>在字符串中找到正则表达式所匹配的所有子串，并返回一个列表，如果有多个匹配模式，则返回元组列表，如果没有找到匹配的，则返回空列表。</p><p><strong>注意：</strong> match 和 search 是匹配一次 findall 匹配所有。</p><p>语法格式为：</p><p>findall(string[, pos[, endpos]])</p><p>参数：</p><ul><li>string : 待匹配的字符串。</li><li>pos : 可选参数，指定字符串的起始位置，默认为 0。</li><li>endpos : 可选参数，指定字符串的结束位置，默认为字符串的长度。</li></ul><h3 id="re-split" tabindex="-1"><a class="header-anchor" href="#re-split"><span>re.split</span></a></h3><p>split 方法按照能够匹配的子串将字符串分割后返回列表，它的使用形式如下：</p><p>re.split(pattern, string[, maxsplit=0, flags=0])</p><p>参数：</p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>pattern</td><td>匹配的正则表达式</td></tr><tr><td>string</td><td>要匹配的字符串。</td></tr><tr><td>maxsplit</td><td>分隔次数，maxsplit=1 分隔一次，默认为 0，不限制次数。</td></tr><tr><td>flags</td><td>标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等。参见：<a href="https://www.runoob.com/python/python-reg-expressions.html#flags" target="_blank" rel="noopener noreferrer">正则表达式修饰符 - 可选标志</a></td></tr></tbody></table><h2 id="正则表达式模式" tabindex="-1"><a class="header-anchor" href="#正则表达式模式"><span>正则表达式模式</span></a></h2><p>模式字符串使用特殊的语法来表示一个正则表达式：</p><p>字母和数字表示他们自身。一个正则表达式模式中的字母和数字匹配同样的字符串。</p><p>多数字母和数字前加一个反斜杠时会拥有不同的含义。</p><p>标点符号只有被转义时才匹配自身，否则它们表示特殊的含义。</p><p>反斜杠本身需要使用反斜杠转义。</p><p>由于正则表达式通常都包含反斜杠，所以你最好使用原始字符串来表示它们。模式元素(如 r&#39;\\t&#39;，等价于 &#39;\\t&#39;)匹配相应的特殊字符。</p><p>下表列出了正则表达式模式语法中的特殊元素。如果你使用模式的同时提供了可选的标志参数，某些模式元素的含义会改变。</p>',45),t("table",null,[t("thead",null,[t("tr",null,[t("th",null,"模式"),t("th",null,"描述")])]),t("tbody",null,[t("tr",null,[t("td",null,"^"),t("td",null,"匹配字符串的开头")]),t("tr",null,[t("td",null,"$"),t("td",null,"匹配字符串的末尾。")]),t("tr",null,[t("td",null,"."),t("td",null,"匹配任意字符，除了换行符，当re.DOTALL标记被指定时，则可以匹配包括换行符的任意字符。")]),t("tr",null,[t("td",null,"[...]"),t("td",null,"用来表示一组字符,单独列出：[amk] 匹配 'a'，'m'或'k'")]),t("tr",null,[t("td",null,"[^...]"),t("td",null,"不在[]中的字符：[^abc] 匹配除了a,b,c之外的字符。")]),t("tr",null,[t("td",null,"re*"),t("td",null,"匹配0个或多个的表达式。")]),t("tr",null,[t("td",null,"re+"),t("td",null,"匹配1个或多个的表达式。")]),t("tr",null,[t("td",null,"re?"),t("td",null,"匹配0个或1个由前面的正则表达式定义的片段，非贪婪方式")]),t("tr",null,[t("td",{n:""},"re"),t("td",null,'精确匹配 n 个前面表达式。例如， o{2} 不能匹配 "Bob" 中的 "o"，但是能匹配 "food" 中的两个 o。')]),t("tr",null,[t("td",{"n,":""},"re"),t("td",null,'匹配 n 个前面表达式。例如， o{2,} 不能匹配"Bob"中的"o"，但能匹配 "foooood"中的所有 o。"o{1,}" 等价于 "o+"。"o{0,}" 则等价于 "o*"。')]),t("tr",null,[t("td",{"n,":"",m:""},"re"),t("td",null,"匹配 n 到 m 次由前面的正则表达式定义的片段，贪婪方式")]),t("tr",null,[t("td",null,"a| b"),t("td",null,"匹配a或b")]),t("tr",null,[t("td",null,"(re)"),t("td",null,"对正则表达式分组并记住匹配的文本")]),t("tr",null,[t("td",null,"(?imx)"),t("td",null,"正则表达式包含三种可选标志：i, m, 或 x 。只影响括号中的区域。")]),t("tr",null,[t("td",null,"(?-imx)"),t("td",null,"正则表达式关闭 i, m, 或 x 可选标志。只影响括号中的区域。")]),t("tr",null,[t("td",null,"(?: re)"),t("td",null,"类似 (...), 但是不表示一个组")]),t("tr",null,[t("td",null,"(?imx: re)"),t("td",null,"在括号中使用i, m, 或 x 可选标志")]),t("tr",null,[t("td",null,"(?-imx: re)"),t("td",null,"在括号中不使用i, m, 或 x 可选标志")]),t("tr",null,[t("td",null,"(?#...)"),t("td",null,"注释.")]),t("tr",null,[t("td",null,"(?= re)"),t("td",null,"前向肯定界定符。如果所含正则表达式，以 ... 表示，在当前位置成功匹配时成功，否则失败。但一旦所含表达式已经尝试，匹配引擎根本没有提高；模式的剩余部分还要尝试界定符的右边。")]),t("tr",null,[t("td",null,"(?! re)"),t("td",null,"前向否定界定符。与肯定界定符相反；当所含表达式不能在字符串当前位置匹配时成功")]),t("tr",null,[t("td",null,"(?> re)"),t("td",null,"匹配的独立模式，省去回溯。")]),t("tr",null,[t("td",null,"\\w"),t("td",null,"匹配字母数字及下划线")]),t("tr",null,[t("td",null,"\\W"),t("td",null,"匹配非字母数字及下划线")]),t("tr",null,[t("td",null,"\\s"),t("td",null,"匹配任意空白字符，等价于 [ \\t\\n\\r\\f]。")]),t("tr",null,[t("td",null,"\\S"),t("td",null,"匹配任意非空字符")]),t("tr",null,[t("td",null,"\\d"),t("td",null,"匹配任意数字，等价于 [0-9].")]),t("tr",null,[t("td",null,"\\D"),t("td",null,"匹配任意非数字")]),t("tr",null,[t("td",null,"\\A"),t("td",null,"匹配字符串开始")]),t("tr",null,[t("td",null,"\\Z"),t("td",null,"匹配字符串结束，如果是存在换行，只匹配到换行前的结束字符串。")]),t("tr",null,[t("td",null,"\\z"),t("td",null,"匹配字符串结束")]),t("tr",null,[t("td",null,"\\G"),t("td",null,"匹配最后匹配完成的位置。")]),t("tr",null,[t("td",null,"\\b"),t("td",null,`匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。`)]),t("tr",null,[t("td",null,"\\B"),t("td",null,`匹配非单词边界。'er\\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。`)]),t("tr",null,[t("td",null,"\\n, \\t, 等."),t("td",null,"匹配一个换行符。匹配一个制表符。等")]),t("tr",null,[t("td",null,"\\1...\\9"),t("td",null,"匹配第n个分组的内容。")]),t("tr",null,[t("td",null,"\\10"),t("td",null,"匹配第n个分组的内容，如果它经匹配。否则指的是八进制字符码的表达式。")]),t("tr",null,[t("td"),t("td")])])],-1),r('<hr><h2 id="正则表达式实例" tabindex="-1"><a class="header-anchor" href="#正则表达式实例"><span>正则表达式实例</span></a></h2><h4 id="字符匹配" tabindex="-1"><a class="header-anchor" href="#字符匹配"><span>字符匹配</span></a></h4><table><thead><tr><th>实例</th><th>描述</th></tr></thead><tbody><tr><td>python</td><td>匹配 &quot;python&quot;.</td></tr></tbody></table><h4 id="字符类" tabindex="-1"><a class="header-anchor" href="#字符类"><span>字符类</span></a></h4><table><thead><tr><th>实例</th><th>描述</th></tr></thead><tbody><tr><td>[Pp]ython</td><td>匹配 &quot;Python&quot; 或 &quot;python&quot;</td></tr><tr><td>rub[ye]</td><td>匹配 &quot;ruby&quot; 或 &quot;rube&quot;</td></tr><tr><td>[aeiou]</td><td>匹配中括号内的任意一个字母</td></tr><tr><td>[0-9]</td><td>匹配任何数字。类似于 [0123456789]</td></tr><tr><td>[a-z]</td><td>匹配任何小写字母</td></tr><tr><td>[A-Z]</td><td>匹配任何大写字母</td></tr><tr><td>[a-zA-Z0-9]</td><td>匹配任何字母及数字</td></tr><tr><td>[^aeiou]</td><td>除了aeiou字母以外的所有字符</td></tr><tr><td>[^0-9]</td><td>匹配除了数字外的字符</td></tr></tbody></table><h4 id="特殊字符类" tabindex="-1"><a class="header-anchor" href="#特殊字符类"><span>特殊字符类</span></a></h4><table><thead><tr><th>实例</th><th>描述</th></tr></thead><tbody><tr><td>.</td><td>匹配除 &quot;\\n&quot; 之外的任何单个字符。要匹配包括 &#39;\\n&#39; 在内的任何字符，请使用象 &#39;[.\\n]&#39; 的模式。</td></tr><tr><td>\\d</td><td>匹配一个数字字符。等价于 [0-9]。</td></tr><tr><td>\\D</td><td>匹配一个非数字字符。等价于 [^0-9]。</td></tr><tr><td>\\s</td><td>匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \\f\\n\\r\\t\\v]。</td></tr><tr><td>\\S</td><td>匹配任何非空白字符。等价于 [^ \\f\\n\\r\\t\\v]。</td></tr><tr><td>\\w</td><td>匹配包括下划线的任何单词字符。等价于&#39;[A-Za-z0-9_]&#39;。</td></tr><tr><td>\\W</td><td>匹配任何非单词字符。等价于 &#39;[^A-Za-z0-9_]&#39;。</td></tr></tbody></table>',8)]))}const s=n(a,[["render",o],["__file","python正则表达式.html.vue"]]),i=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/Python/python%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html","title":"python正则表达式","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-18T00:00:00.000Z","tags":["python"],"title":"python正则表达式","category":["领域"],"description":"Python 正则表达式 re.match 尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match() 就返回 none。 函数语法： re.match(pattern,string,flags=0) 函数参数说明： 匹配成功 re.match 方法返回一个匹配的对象，否则返回 None。 我们可以使用 group(num) 或 ...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/Python/python%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"python正则表达式"}],["meta",{"property":"og:description","content":"Python 正则表达式 re.match 尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match() 就返回 none。 函数语法： re.match(pattern,string,flags=0) 函数参数说明： 匹配成功 re.match 方法返回一个匹配的对象，否则返回 None。 我们可以使用 group(num) 或 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"python"}],["meta",{"property":"article:published_time","content":"2024-12-18T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"python正则表达式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-18T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"re.match","slug":"re-match","link":"#re-match","children":[]},{"level":2,"title":"re.search方法","slug":"re-search方法","link":"#re-search方法","children":[{"level":3,"title":"检索和替换","slug":"检索和替换","link":"#检索和替换","children":[]},{"level":3,"title":"re.compile 函数","slug":"re-compile-函数","link":"#re-compile-函数","children":[]},{"level":3,"title":"findall","slug":"findall","link":"#findall","children":[]},{"level":3,"title":"re.split","slug":"re-split","link":"#re-split","children":[]}]},{"level":2,"title":"正则表达式模式","slug":"正则表达式模式","link":"#正则表达式模式","children":[]},{"level":2,"title":"正则表达式实例","slug":"正则表达式实例","link":"#正则表达式实例","children":[]}],"git":{},"readingTime":{"minutes":7.98,"words":2394},"filePathRelative":"article/02_领域/Python/python正则表达式.md","localizedDate":"2024年12月18日","excerpt":"\\n<h2>re.match</h2>\\n<p>尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match() 就返回 none。</p>\\n<p><strong>函数语法</strong>：<br>\\n<strong>re.match</strong>(pattern,string,flags=0)<br>\\n函数参数说明：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>参数</th>\\n<th>描述</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>pattern</td>\\n<td>匹配的正则表达式</td>\\n</tr>\\n<tr>\\n<td>string</td>\\n<td>要匹配的字符串。</td>\\n</tr>\\n<tr>\\n<td>flags</td>\\n<td>标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等。参见：<a href=\\"https://www.runoob.com/python/python-reg-expressions.html#flags\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">正则表达式修饰符 - 可选标志</a></td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{s as comp,i as data};
