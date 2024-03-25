import{_ as e,o as i,c as s,b as n}from"./app-PrvqUoBY.js";const a={},l=n(`<h1 id="centos7安装elasticsearch-8-12-1-亲测可用" tabindex="-1"><a class="header-anchor" href="#centos7安装elasticsearch-8-12-1-亲测可用" aria-hidden="true">#</a> CentOS7安装elasticsearch-8.12.1（亲测可用）</h1><blockquote><p>又到了春分了，今天阳光正好，晒晒被子，晚上肯定睡得香。现在咱们继续更新《Java小白的第一台Linux服务器》，</p><p>今天安装 elasticsearch，闲话少叙，开干！！！</p></blockquote><h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><blockquote><p>jdk-17.0.9</p><p>CentOS-7.9</p></blockquote><blockquote><p>以下使用 root 或高权限用户进行操作</p></blockquote><h2 id="获取安装包" tabindex="-1"><a class="header-anchor" href="#获取安装包" aria-hidden="true">#</a> 获取安装包</h2><ul><li>下载 &amp;&amp; 解压</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 下载（直接去官网下载安装包，或者使用如下命令下载）
elasticsearch-8.12.1-linux-x86_64.tar.gz
cd /usr/local
wget -c https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.12.1-linux-x86_64.tar.gz

# 解压
tar -zxvf elasticsearch-8.12.1-linux-x86_64.tar.gz

# 重命名
mv ./elasticsearch-8.12.1  /usr/local/elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h2><blockquote><p>进入 /usr/local/elasticsearch/conf/</p></blockquote><ul><li>修改 jvm.options</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-Xms4g
-Xmx4g
这里按照实际情况修改，最重要的一点是，两个值一定要一致，否则会报错
这里我一般都修改成1g，如下
-Xms1g
-Xmx1g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改 elasticsearch.yml</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># ---------------------------------- Network -----------------------------------
#
# By default Elasticsearch is only accessible on localhost. Set a different
# address here to expose this node on the network:
#
network.host: 0.0.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新增用户组和用户" tabindex="-1"><a class="header-anchor" href="#新增用户组和用户" aria-hidden="true">#</a> 新增用户组和用户</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#创建用户组
groupadd es
#创建用户并加入用户组
useradd -g es es
#修改用户密码（新增的用户务必要执行这一步，防止后面密码无法修改，这里要输入两次新密码）
passwd 用户名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改-elasticsearch-目录权限" tabindex="-1"><a class="header-anchor" href="#修改-elasticsearch-目录权限" aria-hidden="true">#</a> 修改 elasticsearch 目录权限</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 修改刚才重命名后的权限
chown -R es:es xxx目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改文件数量最大值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#打开文件，在文件的末尾 End of file 位置加上如下两行内容

xxx hard nofile 65536
xxx soft nofile 65536
# End of file

# 注意：上面的 xxx 指的是启动 es 的用户，我们教程里面的用户名是 es，所以这里写作
es hard nofile 65536
es soft nofile 65536
# End of file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以下使用新增的 es 用户操作</p></blockquote><h2 id="修改-elasticsearch-默认读取的-jdk-配置" tabindex="-1"><a class="header-anchor" href="#修改-elasticsearch-默认读取的-jdk-配置" aria-hidden="true">#</a> 修改 elasticsearch 默认读取的 JDK 配置</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 切换到 es 用户
su es
# 修改 .bash_profile 
cd 
vim .bash_profile
#新增一行
export ES_JAVA_HOME=$JAVA_HOME
#使之生效
source .bash_profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>切换到 es 用户
su es

#直接启动
/usr/local/elasticsearch/bin/elasticsearch

#后台启动
/usr/local/elasticsearch/bin/elasticsearch -d
# 查看是否启动成功
ps aux|grep elasticsearch 

#退出后台启动
#查看JVM进程号
jps
#结束进程
kill -9 进程号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="遇到的异常" tabindex="-1"><a class="header-anchor" href="#遇到的异常" aria-hidden="true">#</a> 遇到的异常</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#启动的时候遇到的异常一箩筐（如下），按我上面的步骤来，基本上就都能解决、避免

java.nio.file.NoSuchFileException: /usr/local/jdk-17/lib/rt.jar
node validation exception

node validation exception
[1] bootstrap checks failed. You must address the points described in the following [1] lines before starting Elasticsearch.

You must address the points described in the following [2] lines before starting Elasticsearch

max file descriptors [4096] for elasticsearch process is too low, increase to at least [65535]

max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),d=[l];function r(c,t){return i(),s("div",null,d)}const u=e(a,[["render",r],["__file","centos7.9安装elasticsearch-8.12.1.html.vue"]]);export{u as default};
