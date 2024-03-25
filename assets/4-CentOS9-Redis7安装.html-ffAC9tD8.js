import{_ as e,o as i,c as d,b as s}from"./app-PrvqUoBY.js";const n={},a=s(`<h1 id="centos9-redis7安装" tabindex="-1"><a class="header-anchor" href="#centos9-redis7安装" aria-hidden="true">#</a> CentOS9 Redis7安装</h1><blockquote><p>咱们今天就继续安装起来</p></blockquote><h2 id="安装环境" tabindex="-1"><a class="header-anchor" href="#安装环境" aria-hidden="true">#</a> 安装环境</h2><blockquote><p>CentOS Stream 9<br> Redis-7.2.4</p></blockquote><h2 id="获取安装包" tabindex="-1"><a class="header-anchor" href="#获取安装包" aria-hidden="true">#</a> 获取安装包</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://download.redis.io/releases/redis-7.2.4.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果官网安装包不好取，安装包我放在文末了</p><h2 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖" aria-hidden="true">#</a> 安装依赖</h2><blockquote><p>由于Redis是使用C语言进行编写的，所以想要能成功的进行编译和运行，肯定少不了要进行环境的检查和安装</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 检查是否安装 gcc
gcc -v
# 如显示没有安装，执行以下命令安装
yum install -y gcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解压" tabindex="-1"><a class="header-anchor" href="#解压" aria-hidden="true">#</a> 解压</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 解压
tar -zxvf redis-7.2.4.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进入解压目录并编译安装" tabindex="-1"><a class="header-anchor" href="#进入解压目录并编译安装" aria-hidden="true">#</a> 进入解压目录并编译安装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 进入解压目录
cd /opt/redis
# 编译(这里执行之后要稍微等待一分钟左右，等待编译完成)
make
# 指定安装目录并进行安装(/opt/redis目录不存在，会自动创建)
make install PREFIX=/opt/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动-redis-服务-两种方式" tabindex="-1"><a class="header-anchor" href="#启动-redis-服务-两种方式" aria-hidden="true">#</a> 启动 <code>Redis</code> 服务(两种方式)</h2><h3 id="_1-直接启动" tabindex="-1"><a class="header-anchor" href="#_1-直接启动" aria-hidden="true">#</a> 1 直接启动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 进入 Redis 安装目录
cd /opt/redis
# 启动服务
./redis-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种直接启动操作简单，成功后会直接出现一个图标，但是有个问题，这种线程必须一直保持，干不了别的了，所以一般用下面这种</p><h3 id="_2-通过守护进程方式启动" tabindex="-1"><a class="header-anchor" href="#_2-通过守护进程方式启动" aria-hidden="true">#</a> 2 通过守护进程方式启动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 从刚才解压完编译后的 源码目录中复制 redis.conf 到 redis 安装目录
cp /opt/redis-7.2.4 /opt/redis/bin

# 复制完成后，修改 redis.conf
cd /opt/redis/bin
vi redis.conf

# 修改内容有以下几点
## 1.开启守护线程
#daemonize 的值从 no 修改成 yes
## 2.修改连接IP
#如果想要设置指定IP连接redis，只需要修改redis.conf文件中bind配置项即可。如果不限IP，将127.0.0.1修改成0.0.0.0即可
#redis默认端口为 6379
#bind 127.0.0.1 -::1
## 3.启动服务
./redis-server redis.conf
## 4.查看进程来确定 redis 是否启动成功
ps -ef | grep redis

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-开机自启动" tabindex="-1"><a class="header-anchor" href="#_3-开机自启动" aria-hidden="true">#</a> 3 开机自启动</h3><blockquote><p>切换到/lib/systemd/system/目录，创建redis.service文件</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /lib/systemd/system/
vim redis.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>文件内容如下</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
# ExecStart需要按照实际情况修改成自己的地址
ExecStart=/opt/redis/bin/redis-server /opt/redis/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>设置开机自启动</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 开机自动启动
systemctl enable redis.service
# 启动redis服务
systemctl start redis.service
# 查看服务状态
systemctl status redis.service
# 停止服务
systemctl stop redis.service
# 取消开机自动启动(卸载服务)
systemctl disabled redis.service

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="">Redis安装包</a></p>`,28),r=[a];function l(c,t){return i(),d("div",null,r)}const u=e(n,[["render",l],["__file","4-CentOS9-Redis7安装.html.vue"]]);export{u as default};
