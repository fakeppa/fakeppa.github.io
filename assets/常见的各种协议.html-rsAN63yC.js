import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,b as a,o as p}from"./app-CEsliIry.js";const r={};function d(n,t){return p(),i("div",null,t[0]||(t[0]=[a('<figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228140958.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>当LLC-PDU中携带的是数据的时候，那么左侧的2字节表示的就是长度；当然，以太帧可以携带其他协议，当LLC-PDU中是协议的时候，2字节就代表了类型。</li><li>CRC为校验码。CRC实际上是生成FCS的算法</li><li>以太网帧最小为64字节，数据区取左侧46字节；最长为1518字节。</li><li>接口收到以太MAC帧时，接口自动校验后四个字节，传入设备时会自动去掉，所以抓不到<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228143412.png" alt="image.png" loading="lazy"></li><li>以太网V2和802.3标准MAC帧</li><li>下面的最大长度1536，超过Length无法表示</li></ul><h1 id="ip协议" tabindex="-1"><a class="header-anchor" href="#ip协议"><span>IP协议</span></a></h1><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228144328.png" alt="image.png" loading="lazy"><br> 20字节</p><table><thead><tr><th>IP报文字段</th><th>具体作用</th></tr></thead><tbody><tr><td>版本</td><td>ip报文中，版本占了4位，用来表示该协议采用的是那一个版本的ip，相同版本的ip才能进行通信。一般此处的值为4，表示ipv4</td></tr><tr><td>首部长度（头长度）<mark>可变部分为变数</mark></td><td>该字段用四位表示，表示整个ip包头的长度，其中数的<mark>单位是4字节!!!!</mark>。即二进制数0000-1111（十进制数0-15），其中一个最小长度为0字节，最大长度为60字节。一般来说此处的值为0101，表示头长度为20字节。有可选部分的话就会变成24个字节</td></tr><tr><td>区分服务 （Tos服务字段）</td><td>该字段用8位表示。该字段一般情况下不使用。</td></tr><tr><td>总长度</td><td>该字段表示整个ip报文的长度，单位是1字节。能表示的最大字节为2^16-1=65535字节。不过由于链路层的MTU限制。超过1480字节后就会被分片（以太帧MTU为1500的情况下，除去20字节的包头）</td></tr><tr><td>标识（<mark>具备唯一性</mark>）</td><td>该字段是ip软件实现的时候自动产生的，该字段的目的不是为了接受方的按序接受而设置的，而是在ip分片以后，用来标识同一片分片的。方便ip分片的重组。</td></tr><tr><td>标志</td><td>该字段是与ip分片有关的。其中有三位，但只有两位是有效的，分别为MF，DF。MF标识后面是否还有分片，为1时，表示后面还有分片。DF标识是否能分片，为0表示可以分片。</td></tr><tr><td>片偏移</td><td>该字段是与ip分片后，相应的ip片在总的ip片的位置。该字段的单位是8字节 （下面有举例说明）</td></tr><tr><td>生存时间（TTL）</td><td>ip分片每经过一个路由器该值减一，它的出现是为了防止路由环路，浪费带宽的问题。比如，该ip在R1 路由器发送到R2路由器。R2路由器又发给R1路由器。防止这种循环。window系统默认为128.</td></tr><tr><td>协议</td><td><mark>该值标识上层的协议</mark>。占8位，255种。其中1，标识ICMP、2标识IGMP、6标识TCP、17标识UDP、89标识OSPF。</td></tr><tr><td>校验和（首部校验和）</td><td>该值是对整个数据包的包头进行的校验。占16位。<mark>由于重复建设，IPV6没有了校验</mark></td></tr><tr><td>源地址和目的地址</td><td>标识发送ip片的源和目的ip，32位</td></tr><tr><td>可选部分</td><td>一般一些特殊的要求会加在这个部分。</td></tr></tbody></table><ul><li>IP进行分片时，会把来自于上层的数据包切成MTU格式，然后去除掉原本的首部，这就是<mark>标记上层协议的原因</mark></li></ul>',6)]))}const g=e(r,[["render",d],["__file","常见的各种协议.html.vue"]]),m=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E5%B8%B8%E8%A7%81%E7%9A%84%E5%90%84%E7%A7%8D%E5%8D%8F%E8%AE%AE.html","title":"常见的各种协议","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-02-28T00:00:00.000Z","tags":null,"title":"常见的各种协议","category":["项目"],"description":"当LLC-PDU中携带的是数据的时候，那么左侧的2字节表示的就是长度；当然，以太帧可以携带其他协议，当LLC-PDU中是协议的时候，2字节就代表了类型。 CRC为校验码。CRC实际上是生成FCS的算法 以太网帧最小为64字节，数据区取左侧46字节；最长为1518字节。 接口收到以太MAC帧时，接口自动校验后四个字节，传入设备时会自动去掉，所以抓不到 i...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E5%B8%B8%E8%A7%81%E7%9A%84%E5%90%84%E7%A7%8D%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"常见的各种协议"}],["meta",{"property":"og:description","content":"当LLC-PDU中携带的是数据的时候，那么左侧的2字节表示的就是长度；当然，以太帧可以携带其他协议，当LLC-PDU中是协议的时候，2字节就代表了类型。 CRC为校验码。CRC实际上是生成FCS的算法 以太网帧最小为64字节，数据区取左侧46字节；最长为1518字节。 接口收到以太MAC帧时，接口自动校验后四个字节，传入设备时会自动去掉，所以抓不到 i..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228140958.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-28T07:19:32.000Z"}],["meta",{"property":"article:published_time","content":"2025-02-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-28T07:19:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常见的各种协议\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228140958.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228143412.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228144328.png\\"],\\"datePublished\\":\\"2025-02-28T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-28T07:19:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1740724142000,"updatedTime":1740727172000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":9,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":3.01,"words":902},"filePathRelative":"article/01_项目/网络工程师考试/常见的各种协议.md","localizedDate":"2025年2月28日","excerpt":"<figure><img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228140958.png\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<ul>\\n<li>当LLC-PDU中携带的是数据的时候，那么左侧的2字节表示的就是长度；当然，以太帧可以携带其他协议，当LLC-PDU中是协议的时候，2字节就代表了类型。</li>\\n<li>CRC为校验码。CRC实际上是生成FCS的算法</li>\\n<li>以太网帧最小为64字节，数据区取左侧46字节；最长为1518字节。</li>\\n<li>接口收到以太MAC帧时，接口自动校验后四个字节，传入设备时会自动去掉，所以抓不到<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250228143412.png\\" alt=\\"image.png\\" loading=\\"lazy\\"></li>\\n<li>以太网V2和802.3标准MAC帧</li>\\n<li>下面的最大长度1536，超过Length无法表示</li>\\n</ul>","autoDesc":true}');export{g as comp,m as data};
