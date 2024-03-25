import{_ as a,r as i,o as l,c as d,d as e,e as s,f as r,b as t}from"./app-PrvqUoBY.js";const c={},o=e("h1",{id:"centos-stream-9-远程连接被拒绝问题",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#centos-stream-9-远程连接被拒绝问题","aria-hidden":"true"},"#"),s(" CentOS Stream 9 远程连接被拒绝问题")],-1),u=e("blockquote",null,[e("p",null,"CentOS Stream 9 安装完成，需要安装一些软件，在这之前得先联网。 本文就是连接过程中遇到的一些问题总结")],-1),v=e("h2",{id:"环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#环境","aria-hidden":"true"},"#"),s(" 环境")],-1),m=e("blockquote",null,[e("p",null,[s("VMware 17.5.1"),e("br"),s(" CentOS Stream 9")])],-1),b={href:"https://www.centos.org/centos-stream/",target:"_blank",rel:"noopener noreferrer"},p=e("li",null,[e("p",null,"查看系统版本号")],-1),h=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看 CentOS 版本号
cat /etc/redhat-release

# 查看 Linux 内核版本号
uname -r
或 
uname -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看防火墙状态</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看已开放的端口列表</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd --list-port
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>开启 <code>80</code> 端口权限并让端口生效</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开启端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token parameter variable">--permanent</span>
<span class="token comment"># 重载防火墙，让端口权限生效</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>ssh用户密码正确但是登录时却报被拒绝</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 打开配置文件
cd /etc/ssh/
vi sshd_config

# 在文件中添加如下配置
PermitRootLogin yes

# 重启 ssh 服务
systemctl restart sshd

# 注意：这里可能会报错，我因为写错了命令，报错如下：
Job for sshd.service failed because the control process exited with error code.
See &quot;systemctl status sshd.service&quot; and &quot;journalctl -xeu sshd.service&quot; for details.

# 如果找不到问题所在，可以在当前目录下执行以下命令，会显示出来具体错误位置
sshd -T

按如上操作后，再次连接即可完成登录成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function _(g,x){const n=i("ExternalLinkIcon");return l(),d("div",null,[o,u,v,m,e("ul",null,[e("li",null,[e("p",null,[s("获取"),e("a",b,[s("安装包"),r(n)]),s("进行安装")])]),p]),h])}const k=a(c,[["render",_],["__file","1-CentOS9-远程连接问题.html.vue"]]);export{k as default};
