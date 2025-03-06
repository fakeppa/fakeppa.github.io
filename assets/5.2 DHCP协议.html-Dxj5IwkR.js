import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,b as a,o as i}from"./app-DXil5AkV.js";const r={};function n(g,e){return i(),p("div",null,e[0]||(e[0]=[a('<p>DHCP 服务器端口68<br> 客户端端口67<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302124558.png" alt="image.png" loading="lazy"><br> 注意发现阶段和选择阶段均为广播<br> DHCP DISCOVER，泛洪广播域，请求DHCP服务器提供地址<br> DHCP OFFER,为请求来源提供IP地址，主要由广播发送(思科，华为单播)<br> DHCP REQUEST，广播给所有的DHCP服务器，表示自己使用了什么IP地址<br> DHCP ACK，给客户端确认了这个使用请求，主要为广播(思科，华为单播)</p><p>DHCP报文格式<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302130816.png" alt="image.png" loading="lazy"></p><p>op:表示报文的类型，取值为1客户端请求，取值为2服务器响应<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302131312.png" alt="image.png" loading="lazy"><br> heype:硬件类型<br> hlen:MAC地址<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302131452.png" alt="image.png" loading="lazy"><br> hops：跳数，意思是讲过了几个中继服务器<br> flags：单播或者广播响应标志位，0单播，1广播<br> ciaddr:表示客户端的IP地址，初始化状态时没有IP地址，此字段为0.0.0.0<br> yiaddr:服务器分配给客户端的ip地址<br> siaddr:DHCP客户端获得启动配置信息的服务器IP地址<br> giaddr：表示第一个DHCP中继的IP地址<br> file：表示客户端需要获取的启动配置文件名<br> options:表示DHCP的选项字段<br> - options字段由Type、Length和Value三部分组成<br> options预定义的选项自字段介绍<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302132815.png" alt="image.png" loading="lazy"><br> 这些字段包含了DHCP报文类型，服务端分配给终端的配置信息，如：网关IP，DNS服务器的IP地址，客户端可以使用IP地址的有效租期等信息</p><p>DHCP报文通过Options选项中的Type=53来表示DHCP的报文类型。<br> 当Type=53，Length=1，Value取值从01到08分别表示不同的DHCP类型，如下图<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302133242.png" alt="image.png" loading="lazy"></p><ul><li>4-DHCP DECLINE：在客户端收到了来自服务器的ACK请求后，这时客户端会检测Ip地址是否冲突，如果冲突，则会发送DHCP DECLINE，表示客户端不会使用这个IP</li><li>6-DHCP NAK：不同意使用，在发送request后由服务器端回复</li><li>7-DHCP REALEASE：由客户端发出，主动放弃现有的IP地址</li><li>8-DHCP INFORM：由客户端发出，请求服务器提供详细的IP地址，扩展信息等，服务器会回复一个ACK信息，携带详细信息</li></ul><p>除了以上标准协议中规定的字段选项外 ，还有部分选项内容没有。。。</p><p>DHCP地址续租<br> 租期达到50%(T1)时，DHCP客户端会自动以单播方式想DHCP服务器发送DHCP REQUEST报文。如果DHCP服务器会用DHCP ACK报文，则租期更新成功</p><p>租期达到87.5(T2)时，如果仍未收到DHCP服务器的应答，DHCP客户端会自动以广播方式向DHCP服务器发送DHCP REQUEST报文，请求更新IP地址租期。恢复DHCP ACK报文则租期更新成功。</p><p>如果租期时间倒是都没有收到服务器的回应，客户端停止使用此IP地址，重新发送DHCP DISCOVER报文请求新的IP地址。</p>',9)]))}const C=t(r,[["render",n],["__file","5.2 DHCP协议.html.vue"]]),P=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E7%BD%91%E5%B7%A5%E8%AF%BE%E7%A8%8B/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.2%20DHCP%E5%8D%8F%E8%AE%AE.html","title":"5.2 DHCP协议","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-03-02T00:00:00.000Z","tags":null,"title":"5.2 DHCP协议","category":["项目"],"description":"DHCP 服务器端口68 客户端端口67 image.png 注意发现阶段和选择阶段均为广播 DHCP DISCOVER，泛洪广播域，请求DHCP服务器提供地址 DHCP OFFER,为请求来源提供IP地址，主要由广播发送(思科，华为单播) DHCP REQUEST，广播给所有的DHCP服务器，表示自己使用了什么IP地址 DHCP ACK，给客户端确认...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B%E5%B8%88%E8%80%83%E8%AF%95/%E7%BD%91%E5%B7%A5%E8%AF%BE%E7%A8%8B/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.2%20DHCP%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"5.2 DHCP协议"}],["meta",{"property":"og:description","content":"DHCP 服务器端口68 客户端端口67 image.png 注意发现阶段和选择阶段均为广播 DHCP DISCOVER，泛洪广播域，请求DHCP服务器提供地址 DHCP OFFER,为请求来源提供IP地址，主要由广播发送(思科，华为单播) DHCP REQUEST，广播给所有的DHCP服务器，表示自己使用了什么IP地址 DHCP ACK，给客户端确认..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302124558.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-06T09:25:11.000Z"}],["meta",{"property":"article:published_time","content":"2025-03-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-06T09:25:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"5.2 DHCP协议\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302124558.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302130816.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302131312.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302131452.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302132815.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302133242.png\\"],\\"datePublished\\":\\"2025-03-02T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-06T09:25:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1740891175000,"updatedTime":1741253111000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":72,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":2.64,"words":792},"filePathRelative":"article/01_项目/网络工程师考试/网工课程/第五章/5.2 DHCP协议.md","localizedDate":"2025年3月2日","excerpt":"<p>DHCP 服务器端口68<br>\\n客户端端口67<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250302124558.png\\" alt=\\"image.png\\" loading=\\"lazy\\"><br>\\n注意发现阶段和选择阶段均为广播<br>\\nDHCP DISCOVER，泛洪广播域，请求DHCP服务器提供地址<br>\\nDHCP OFFER,为请求来源提供IP地址，主要由广播发送(思科，华为单播)<br>\\nDHCP REQUEST，广播给所有的DHCP服务器，表示自己使用了什么IP地址<br>\\nDHCP ACK，给客户端确认了这个使用请求，主要为广播(思科，华为单播)</p>","autoDesc":true}');export{C as comp,P as data};
