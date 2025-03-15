import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as a,o as n}from"./app-0Mbjmo0r.js";const t={};function l(d,e){return n(),s("div",null,e[0]||(e[0]=[a(`<p><s><strong><strong>知识和金钱都不允许，只能云渗透一手了</strong></strong></s></p><h1 id="初始侦查" tabindex="-1"><a class="header-anchor" href="#初始侦查"><span>初始侦查</span></a></h1><p>建立一个存放日志的文件夹nmapscan</p><ol><li>扫端口</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo nmap -sT --min-rate 10000 -p- 10.129.40.36 -oA nmapscan/ports</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>同时udp扫描</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo nmap -sU --top-port 20 10.129.40.36 -oA nmapscan/udp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol><li>端口详细信息扫描</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo nmap -sT -sV -sC -O -p80,135,445,1985 10.129.40.36 -0A nmapscan/detail</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>-sT:指定以TCP协议扫描<br> -sV:扫描各服务的版本<br> -o:探测操作系统的版本<br> 同时查看udp端口扫描结果<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163309.png" alt="image.png" loading="lazy"><br> 所有端口都是开放或被过滤的状态，应该没有开放</p><ol><li>漏洞脚本扫描</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo nmap --script=vuln -p80,135,445,5985 10.129.40.36 -0A nmapscan/detail</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这个爆破经过很长时间才结束<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121633.png" alt="image.png" loading="lazy"></p><p>一会确定那个端口是开放的，再执行扫描<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163659.png" alt="image.png" loading="lazy"><br> 在80端口提示我们输入admin的密码<br> 访问靶机的80端口试试</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo bash -c &#39;echo &quot;10.129.40.36 driver.htb&quot; &gt;&gt; /etc/hosts&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>将一个IP地址和主机名的映射关系添加到系统的<code>/etc/hosts</code>文件中</strong></p><ul><li><p><code>/etc/hosts</code>文件的作用</p><p><code>/etc/hosts</code>是一个系统文件，用于将主机名（或域名）映射到IP地址。它在DNS解析之前被系统优先使用，因此可以覆盖DNS解析的结果。</p></li><li><p>一长串字符串的作用，重定向无法把权限延伸过去，需要用把命令和重定向位置作为一个整体执行<br> 确认一下</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>	tail -n 1 /etc/hosts</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>一般来说ip和域名指向同一个位置，但如果说主机头做了不同的站点路由，解析域名才能访问不同的站点<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309115225.png" alt="image.png" loading="lazy"><br> 第三个菜单项----Firmware Updates，y有新内容<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309115339.png" alt="image.png" loading="lazy"><br> 可以上传文件，有可能有文件上传相关漏洞</p><p>crackMapexec是一款渗透工具，可以用来信息收集，密码爆破等等<br> 这个工具下一代是nxc</p><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120036.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>先尝试一下445端口的SMB服务</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo nxc smb driver.htb --shares -u RedteamNotes -p &#39;&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>该命令的作用是尝试连接目标主机 <code>driver.htb</code> 的 SMB 服务，并列出所有可用的共享资源。如果目标主机的 SMB 服务允许匿名访问，命令将成功列出共享资源；否则，可能会提示访问被拒绝。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>smbclient -L driver.htb -N</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>该命令的作用是尝试以匿名用户的身份连接到目标主机 <code>driver.htb</code>，并列出其上所有可访问的 SMB 共享资源。这些共享资源可能包括文件共享、打印机共享等。<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120538.png" alt="image.png" loading="lazy"><br> 如果命令成功执行，输出可能类似于以下内容：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Domain=[DRIVER] OS=[Windows Server 2019 Standard] Server=[Windows Server 2019 Standard 17763]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Sharename       Type      Comment</span></span>
<span class="line"><span>        ---------       ----      -------</span></span>
<span class="line"><span>        ADMIN$          Disk      Remote Admin</span></span>
<span class="line"><span>        C$              Disk      Default share</span></span>
<span class="line"><span>        IPC$            IPC       Remote IPC</span></span>
<span class="line"><span>        PRINT$          Disk      Printer Drivers</span></span>
<span class="line"><span>        SharedDocs      Disk      Shared Documents</span></span>
<span class="line"><span>        Users           Disk      User directories</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是失败了<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120638.png" alt="image.png" loading="lazy"></p><p>然后尝试一下135端口</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>rpcclient -U &quot;&quot; -N driver.htb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>enum4linux-ng driver.htb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这个命令会尝试枚举目标主机的用户、组、共享资源、域信息等，主要是SMB相关的信息的枚举<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121404.png" alt="image.png" loading="lazy"><br> SMB的相关版本<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121438.png" alt="image.png" loading="lazy"><br> 操作系统地相关版本，win10企业版<br> 没有更多的信息，意味着SMB无法访问<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121708.png" alt="image.png" loading="lazy"><br> 在爆破出来的信息中发现了已经尝试过的弱密码</p><p>现在回到80端口<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309122153.png" alt="image.png" loading="lazy"><br> 如果能上传一个反弹shell，这是最后的目标<br> 制作一个fantanshell的payload</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo updatedb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>更新一下数据库</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>locate reverse-shell</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>选择一个反弹shell的payload<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309122449.png" alt="image.png" loading="lazy"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>cp /usr/share/ludanum/php/php-reverse-shell.php shell.php</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这个需要事先准备到本地<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123447.png" alt="image.png" loading="lazy"><br> 更改一下信息<br> 能不能找到反弹shell需要目录爆破才能发现<br> 上传文件并bp抓包<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123212.png" alt="image.png" loading="lazy"><br> 这个Authorization应该是admin的验证，下面提示了上传到fileshare<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123543.png" alt="image.png" loading="lazy"><br> 下面进行目录爆破</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo feroxbuster -u http://driver.htb -x php -H &quot;Authorization: Basic YWRtaW46YWRtaW4=&quot; -w /usr/share/seclists/Discovery/Web-Content/dir......</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><code>feroxbuster</code> 是一个快速的目录枚举工具，类似于 <code>dirb</code> 或 <code>gobuster</code>，但通常速度更快且功能更强大。它通过发送 HTTP 请求，尝试访问目标网站上的各种路径，以发现隐藏的目录和文件。、</li><li><code>-x</code> 参数用于指定扩展名过滤器。这里指定 <code>php</code>，表示 <code>feroxbuster</code> 会尝试访问以 <code>.php</code> 结尾的文件，例如 <code>/index.php</code>、<code>/admin.php</code> 等。</li><li><code>-H</code> 参数用于添加自定义的 HTTP 头部。<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309151104.png" alt="image.png" loading="lazy"><br> 随后交叉验证</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>gobuster dir -u http://driver.htb -U admin -P admin -x php -w /字典路径</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>gobuster</code> 是一款流行的目录枚举工具，常用于安全测试和渗透测试。</p><ul><li><p><code>-u</code> 参数用于指定目标 URL。</p></li><li><p><code>-U</code> 参数用于指定用户名（<code>admin</code>）。</p></li><li><p><code>-P</code> 参数用于指定密码（<code>admin</code>）。</p></li><li><p><code>-x</code> 参数用于指定扩展名过滤器。</p></li><li><p><code>-w /字典路径</code></p></li></ul><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309151705.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ffuf -c -H &#39;Authorization: Basic YWRtaW46YWRtaW4&#39; -w 字典路径 -u http://driver.htb/FUZZ -e php,.zip,.txt,.pdf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol><li><strong><code>ffuf</code></strong>：这是命令行工具的名称，通常用于快速模糊测试（Fuzzing）。</li><li><strong><code>-c</code></strong>：启用颜色输出，使结果更直观。</li><li><strong><code>-H &#39;Authorization: Basic YWRtaW46YWRtaW4&#39;</code></strong>：通过 HTTP 头部发送授权信息。这里使用了 Basic Auth，<code>YWRtaW46YWRtaW4</code> 是经过 Base64 编码的用户名和密码（<code>admin:admin</code>）。</li><li><strong><code>-w 字典路径</code></strong>：指定字典文件的路径，字典文件中包含了要测试的目录或文件名列表。</li><li><strong><code>-u http://driver.htb/FUZZ</code></strong>：指定目标 URL，<code>FUZZ</code> 是一个占位符，<code>ffuf</code> 会用字典文件中的内容替换它。</li><li><strong><code>-e php,.zip,.txt,.pdf</code></strong>：指定扩展名过滤器，<code>ffuf</code> 会尝试将字典中的内容与这些扩展名组合，以发现更多可能的资源。<br> 多换字典，多尝试有更多收获</li></ol><div class="language-思路 line-numbers-mode" data-highlighter="shiki" data-ext="思路" data-title="思路" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>1. 找到上传的脚本 ----正在解决</span></span>
<span class="line"><span>2. 上传的脚本能不能执行</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309153459.png" alt="image.png" loading="lazy"><br> 等待。。。快慢取决于字典大小<br> 最后，以上手段都发现不了上传的脚本，只能放弃这个思路</p><p>5985是VRM的端口，只有有凭据才能交互，但我们没有<br> 先要继续就需要对内网认证机制，SMB，内网协议 有一定认识</p>`,50)]))}const g=i(t,[["render",l],["__file","Drive.html.vue"]]),o=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/%E6%B8%97%E9%80%8F/Drive.html","title":"Drive","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-03-08T00:00:00.000Z","tags":null,"title":"Drive","category":["项目"],"description":"初始侦查 建立一个存放日志的文件夹nmapscan 扫端口 同时udp扫描 端口详细信息扫描 -sT:指定以TCP协议扫描 -sV:扫描各服务的版本 -o:探测操作系统的版本 同时查看udp端口扫描结果 image.png 所有端口都是开放或被过滤的状态，应该没有开放 漏洞脚本扫描 这个爆破经过很长时间才结束 image.png 一会确定那个端口是开放...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/%E6%B8%97%E9%80%8F/Drive.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"Drive"}],["meta",{"property":"og:description","content":"初始侦查 建立一个存放日志的文件夹nmapscan 扫端口 同时udp扫描 端口详细信息扫描 -sT:指定以TCP协议扫描 -sV:扫描各服务的版本 -o:探测操作系统的版本 同时查看udp端口扫描结果 image.png 所有端口都是开放或被过滤的状态，应该没有开放 漏洞脚本扫描 这个爆破经过很长时间才结束 image.png 一会确定那个端口是开放..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163309.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-15T08:03:04.000Z"}],["meta",{"property":"article:published_time","content":"2025-03-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-15T08:03:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Drive\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163309.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121633.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250308163659.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309115225.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309115339.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120036.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120538.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309120638.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121404.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121438.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309121708.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309122153.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309122449.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123447.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123212.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309123543.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309151104.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309151705.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250309153459.png\\"],\\"datePublished\\":\\"2025-03-08T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-15T08:03:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1741423121000,"updatedTime":1742025784000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":3,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":5.17,"words":1552},"filePathRelative":"article/01_项目/渗透/Drive.md","localizedDate":"2025年3月8日","excerpt":"<p><s><strong><strong>知识和金钱都不允许，只能云渗透一手了</strong></strong></s></p>\\n<h1>初始侦查</h1>\\n<p>建立一个存放日志的文件夹nmapscan</p>\\n<ol>\\n<li>扫端口</li>\\n</ol>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>sudo nmap -sT --min-rate 10000 -p- 10.129.40.36 -oA nmapscan/ports</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{g as comp,o as data};
