import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as p,o as i}from"./app-DoZmFgbr.js";const n={};function g(o,e){return i(),a("div",null,e[0]||(e[0]=[p('<p>带宽即传输数据的频率的宽度，单位为HZ<br><code>传输数据量=传输速率*传输时间</code>理论上的公式，实际上还要考虑停等协议这类协议，需要进行额外的等待</p><p><code>传播速率=0.7*0.3*10^8=2.1*10^7</code>,明白数据发送，传输过程所消耗的时间就很好计算这类型题了</p><h1 id="_01" tabindex="-1"><a class="header-anchor" href="#_01"><span>01</span></a></h1><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250225144326.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>公式：<code>信道数量*每个信道带宽*各个信道的利用率=主线路带宽*主线路利用率</code></p><h1 id="_02" tabindex="-1"><a class="header-anchor" href="#_02"><span>02</span></a></h1><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226123423.png" alt="image.png" loading="lazy"><br> 解析：<code>停等协议下，两次发送数据之间的间隔=2*传播时延+发送时间，传播时延是与光的速度有关，传播速度即0.7倍光速</code></p><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226123913.png" alt="image.png" loading="lazy"><br> 来回就是20ms<br> 发送时间即数据切成数据帧然后发送的时间<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226124107.png" alt="image.png" loading="lazy"><br> 每个发送时间为16毫秒，每次的间隔都会消耗两倍传输时延和一倍的发送时间，于是把发送时间刚和传输时延相加为16ms+20ms=26ms,20kb的数据会分成157个数据包，则<code>36*157=5652ms=5.6s</code></p><h1 id="_03" tabindex="-1"><a class="header-anchor" href="#_03"><span>03</span></a></h1><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226132248.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p><code>有效传输速率=100mb/s*(传输有效数据的时间/总时间)</code><br> 由于没给数据帧大小，就以以太网最大帧1518字节表示有效数据量<br><code>传输有效数据的时间=发送时间+传播时间+回显时间(64kb)+回显数据传播时间</code><br> 单数据帧发送时间为<code>1518字节*8bit/字节/100mb/s=121.44us</code>，<br> 单数据帧传播时间为<code>10us</code>(与上题不同，本题给出了传播速率)<br> 回显数据帧发送时间为<code>64字节*8bit/字节/100mb/s=5.12us</code><br> 数据帧传播时间为10us<br> 单数据帧传播总时间为10+121.44+10+5.12=146.56us<br> 这中间，有效数据传输时间仅为单数据帧发送时间<br> 用传输有效数据的时间/总时间可以获得一个比值，用这个比值<code>*</code>线路的时间即可</p><h1 id="_04" tabindex="-1"><a class="header-anchor" href="#_04"><span>04</span></a></h1><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226140829.png" alt="image.png" loading="lazy"><br> 解析：求单个信道的传输速率<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226141641.png" alt="image.png" loading="lazy"></p><h1 id="_05" tabindex="-1"><a class="header-anchor" href="#_05"><span>05</span></a></h1><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250227170729.png" alt="image.png" loading="lazy"><br> 解析：在CSMA/CD协议中，存在一个最小数据片段，在以太网中，这个长度是64bit，低于这个长度将被视为是碰撞后的无效帧，而在这条线路中需要另算，<br> 规定发送最小帧数的时间不小于往返时间，可以依照这个时间计算数据帧长度<br> 数据率，单位时间内通过该数据链路的数据多少，把数据在链路上视为均匀分布的，并算出1比特的数据的长度，然后与最小数据帧的数据量相乘，即可得到每个信号占据的介质长度<br> 转换数据率=10bit/us，穿过整条线路的时间为<code>2000m/200m/us=10us</code>,单bit占据的时间:<code>1us</code>,单bit占据的长度：<code>2000m/10=200m</code></p>',15)]))}const d=t(n,[["render",g],["__file","第六章第一节.html.vue"]]),s=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E7%BD%91%E5%B7%A5%E9%A2%98/%E7%AC%AC%E5%85%AD%E7%AB%A0/%E7%AC%AC%E5%85%AD%E7%AB%A0%E7%AC%AC%E4%B8%80%E8%8A%82.html","title":"第六章第一节","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-02-25T00:00:00.000Z","tags":null,"title":"第六章第一节","category":["项目"],"description":"带宽即传输数据的频率的宽度，单位为HZ 传输数据量=传输速率*传输时间理论上的公式，实际上还要考虑停等协议这类协议，需要进行额外的等待 传播速率=0.7*0.3*10^8=2.1*10^7,明白数据发送，传输过程所消耗的时间就很好计算这类型题了 01 image.pngimage.png 公式：信道数量*每个信道带宽*各个信道的利用率=主线路带宽*主线...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E7%BD%91%E5%B7%A5%E9%A2%98/%E7%AC%AC%E5%85%AD%E7%AB%A0/%E7%AC%AC%E5%85%AD%E7%AB%A0%E7%AC%AC%E4%B8%80%E8%8A%82.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"第六章第一节"}],["meta",{"property":"og:description","content":"带宽即传输数据的频率的宽度，单位为HZ 传输数据量=传输速率*传输时间理论上的公式，实际上还要考虑停等协议这类协议，需要进行额外的等待 传播速率=0.7*0.3*10^8=2.1*10^7,明白数据发送，传输过程所消耗的时间就很好计算这类型题了 01 image.pngimage.png 公式：信道数量*每个信道带宽*各个信道的利用率=主线路带宽*主线..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250225144326.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-27T09:37:20.000Z"}],["meta",{"property":"article:published_time","content":"2025-02-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-27T09:37:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第六章第一节\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250225144326.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226123423.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226123913.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226124107.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226132248.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226140829.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250226141641.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250227170729.png\\"],\\"datePublished\\":\\"2025-02-25T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-27T09:37:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1740466462000,"updatedTime":1740649040000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":43,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":2.51,"words":752},"filePathRelative":"article/01_项目/网络工程师考试/网工题/第六章/第六章第一节.md","localizedDate":"2025年2月25日","excerpt":"<p>带宽即传输数据的频率的宽度，单位为HZ<br>\\n<code>传输数据量=传输速率*传输时间</code>理论上的公式，实际上还要考虑停等协议这类协议，需要进行额外的等待</p>\\n<p><code>传播速率=0.7*0.3*10^8=2.1*10^7</code>,明白数据发送，传输过程所消耗的时间就很好计算这类型题了</p>\\n<h1>01</h1>\\n<figure><img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250225144326.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>","autoDesc":true}');export{d as comp,s as data};
