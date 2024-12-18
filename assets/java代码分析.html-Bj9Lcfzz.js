import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,b as n,o as p}from"./app-BHsH7A1Y.js";const g={};function r(i,a){return p(),t("div",null,a[0]||(a[0]=[n('<p>通过抓包我们了解了本体JWT的构造：<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/3231.png" alt="3231" loading="lazy"><br> 有效载荷：<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/屏幕截图 2024-12-02 173036.png" alt="屏幕截图 2024-12-02 173036" loading="lazy"><br> 发现有一本flag书，但是只有admin才可以查看<br> 然后分析java代码<br> 利用grep递归搜索JWT可以发现<img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/55r.png" alt="55r" loading="lazy"><br> JwtService.java是关键的<br> 随后看到在这里进行JWT的密钥创建，需要研究密钥的生成规则<img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/asdwd3.png" alt="asdwd3" loading="lazy"><br> 随后查看secretGenerator类的源代码<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/eqwe.png" alt="eqwe" loading="lazy"><br> 发现他会从本地读取密钥，如果本地密钥不存在就会使用固定字符串1234<br> 还不知道userId和email字段生成规则<br> 随后grep搜索admin的，发现adminRole(admin角色)的java文件，浏览源代码可以发现userid越大，权限越高<br> adminrole.java：:<img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/wds.png" alt="wds" loading="lazy"><br> 在grep中还发现了setEmail(&quot;字段&quot;)<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdw2.png" alt="sdw2" loading="lazy"><br> 推测是email的值为admin<br> 构造JWT<img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdt1.png" alt="sdt1" loading="lazy"><br> 最后再修改本地存储中的JWT——auth-token和token-payload即可<img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/df1.png" alt="df1" loading="lazy"></p>',1)]))}const s=e(g,[["render",r],["__file","java代码分析.html.vue"]]),o=JSON.parse('{"path":"/article/02_%E9%A2%86%E5%9F%9F/picoCTF/java%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90.html","title":"java代码分析","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-10T00:00:00.000Z","category":["领域"],"tags":null,"title":"java代码分析","description":"通过抓包我们了解了本体JWT的构造： 3231 有效载荷： 屏幕截图 2024-12-02 173036 发现有一本flag书，但是只有admin才可以查看 然后分析java代码 利用grep递归搜索JWT可以发现55r JwtService.java是关键的 随后看到在这里进行JWT的密钥创建，需要研究密钥的生成规则asdwd3 随后查看secret...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/02_%E9%A2%86%E5%9F%9F/picoCTF/java%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"java代码分析"}],["meta",{"property":"og:description","content":"通过抓包我们了解了本体JWT的构造： 3231 有效载荷： 屏幕截图 2024-12-02 173036 发现有一本flag书，但是只有admin才可以查看 然后分析java代码 利用grep递归搜索JWT可以发现55r JwtService.java是关键的 随后看到在这里进行JWT的密钥创建，需要研究密钥的生成规则asdwd3 随后查看secret..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/3231.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-18T13:27:34.000Z"}],["meta",{"property":"article:published_time","content":"2024-12-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-18T13:27:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java代码分析\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/3231.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-12-02%20173036.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/55r.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/asdwd3.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/eqwe.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/wds.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdw2.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdt1.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/df1.png\\"],\\"datePublished\\":\\"2024-12-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-18T13:27:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1734528454000,"updatedTime":1734528454000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":1,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":0.97,"words":290},"filePathRelative":"article/02_领域/picoCTF/java代码分析.md","localizedDate":"2024年12月10日","excerpt":"<p>通过抓包我们了解了本体JWT的构造：<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/3231.png\\" alt=\\"3231\\" loading=\\"lazy\\"><br>\\n有效载荷：<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/屏幕截图 2024-12-02 173036.png\\" alt=\\"屏幕截图 2024-12-02 173036\\" loading=\\"lazy\\"><br>\\n发现有一本flag书，但是只有admin才可以查看<br>\\n然后分析java代码<br>\\n利用grep递归搜索JWT可以发现<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/55r.png\\" alt=\\"55r\\" loading=\\"lazy\\"><br>\\nJwtService.java是关键的<br>\\n随后看到在这里进行JWT的密钥创建，需要研究密钥的生成规则<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/asdwd3.png\\" alt=\\"asdwd3\\" loading=\\"lazy\\"><br>\\n随后查看secretGenerator类的源代码<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/eqwe.png\\" alt=\\"eqwe\\" loading=\\"lazy\\"><br>\\n发现他会从本地读取密钥，如果本地密钥不存在就会使用固定字符串1234<br>\\n还不知道userId和email字段生成规则<br>\\n随后grep搜索admin的，发现adminRole(admin角色)的java文件，浏览源代码可以发现userid越大，权限越高<br>\\nadminrole.java：:<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/wds.png\\" alt=\\"wds\\" loading=\\"lazy\\"><br>\\n在grep中还发现了setEmail(\\"字段\\")<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdw2.png\\" alt=\\"sdw2\\" loading=\\"lazy\\"><br>\\n推测是email的值为admin<br>\\n构造JWT<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/sdt1.png\\" alt=\\"sdt1\\" loading=\\"lazy\\"><br>\\n最后再修改本地存储中的JWT——auth-token和token-payload即可<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/df1.png\\" alt=\\"df1\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{s as comp,o as data};
