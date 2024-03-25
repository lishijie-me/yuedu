import{_ as e,o as i,c as n,b as s}from"./app-PrvqUoBY.js";const d={},a=s(`<h1 id="centos9-安装-mysql8-x-离线安装-亲测可用" tabindex="-1"><a class="header-anchor" href="#centos9-安装-mysql8-x-离线安装-亲测可用" aria-hidden="true">#</a> CentOS9 安装 MySQL8.x（离线安装，亲测可用）</h1><h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><blockquote><p>CentOS Stream 9<br> MySQL-8.0.26</p></blockquote><h2 id="安装包获取" tabindex="-1"><a class="header-anchor" href="#安装包获取" aria-hidden="true">#</a> 安装包获取</h2><p>官网查询</p><h2 id="查看是否已安装过-mysql-或-mariadb" tabindex="-1"><a class="header-anchor" href="#查看是否已安装过-mysql-或-mariadb" aria-hidden="true">#</a> 查看是否已安装过 MySQL 或 MariaDB</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看是否安装
rpm -qa | grep mariadb
rpm -qa | grep mysql

# 强制删除

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解压" tabindex="-1"><a class="header-anchor" href="#解压" aria-hidden="true">#</a> 解压</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 解压
tar -xvf mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz
# 重命名文件夹
mv mysql-8.0.36-linux-glibc2.28-x86_64 /opt/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改-mysql-配置文件" tabindex="-1"><a class="header-anchor" href="#修改-mysql-配置文件" aria-hidden="true">#</a> 修改 MySQL 配置文件</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>my.cnf 内容如下</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=/opt/mysql
# 设置mysql数据库的数据存放目录
datadir=/opt/mysql/data
# 允许最大连接数
max_connections=10000
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8MB4
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装目录赋权" tabindex="-1"><a class="header-anchor" href="#安装目录赋权" aria-hidden="true">#</a> 安装目录赋权</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>chmod -R 777 /opt/mysql/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建用户组及用户并赋权" tabindex="-1"><a class="header-anchor" href="#创建用户组及用户并赋权" aria-hidden="true">#</a> 创建用户组及用户并赋权</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 进入安装目录
cd /opt/mysql
=============================第一种方式（推荐上线生产用）=====================================
# 创建用户组
groupadd mysql
# 创建用户(-s /bin/false参数指定mysql用户仅拥有所有权，而没有登录权限)
useradd -r -g mysql -s /bin/false mysql

# 将用户添加到用户组
chown -R mysql:mysql ./
PS：上面的操作是进行权限分离，确保数据库的安全
=============================第二种方式（推荐自我测试用）=====================================
# 创建用户组
groupadd mysql

# 将用户添加到用户组
useradd -g mysql mysql

# 查看用户及用户组
id mysql
=============================我是结束线=====================================
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建数据文件夹" tabindex="-1"><a class="header-anchor" href="#创建数据文件夹" aria-hidden="true">#</a> 创建数据文件夹</h2><blockquote><p>后续所有的库表信息都会存放在这里</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 创建文件夹
mkdir /opt/mysql/data
# 赋权
chmod -R 777 /opt/mysql/data
# 变更所属用户
chown -R mysql:mysql /opt/mysql/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开始安装" tabindex="-1"><a class="header-anchor" href="#开始安装" aria-hidden="true">#</a> 开始安装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 更改用户密码（如果需要的话。默认创建用户无密码，这里我没执行下面的修改命令）
# 修改用户密码（这里要输入两次新密码）
# passwd 用户名

# 变更目录所属用户
chown -R mysql:mysql /opt/mysql/

# 切换用户
su mysql

# 进入目录
cd /opt/mysql/bin/
# 安装mysql，并记住初始化随机密码
./mysqld --initialize --console


# 出现如下日志，记录临时密码
[mysql@localhost bin]$ ./mysqld --initialize --console
2024-03-24T06:03:30.168919Z 0 [Warning] [MY-010918] [Server] &#39;default_authentication_plugin&#39; is deprecated and will be removed in a future release. Please use authentication_policy instead.
2024-03-24T06:03:30.168934Z 0 [System] [MY-013169] [Server] /opt/mysql/bin/mysqld (mysqld 8.0.36) initializing of server in progress as process 5952
2024-03-24T06:03:30.173166Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-03-24T06:03:30.323156Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-03-24T06:03:32.111075Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: qaRu0ID*tby=
2024-03-24T06:03:32.199360Z 6 [Warning] [MY-013360] [Server] Plugin mysql_native_password reported: &#39;&#39;mysql_native_password&#39; is deprecated and will be removed in a future release. Please use caching_sha2_password instead&#39;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动-mysql-服务" tabindex="-1"><a class="header-anchor" href="#启动-mysql-服务" aria-hidden="true">#</a> 启动 MySQL 服务</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 启动 MySQL 服务
cd /opt/mysql/support-files
./mysql.server start

# 打印日志（启动成功）
Starting MySQL. SUCCESS! 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改-root-用户密码" tabindex="-1"><a class="header-anchor" href="#修改-root-用户密码" aria-hidden="true">#</a> 修改 root 用户密码</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /opt/mysql/bin/

# 登录 mysql
./mysql -u root -p

执行后，输入初始化时记录下的随机密码，就会进入mysql

# 修改密码
ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED WITH mysql_native_password BY &#39;12345&#39;;

# 刷新让密码生效
flush privileges;

# 选择 mysql 数据库，查看用户数据
use mysql;
select host, user, plugin, authentication_string from user;

# 允许用户远程连接并生效
update user set host=&#39;%&#39; where user=&#39;root&#39;;

flush privileges;

# 退出并用新密码登录，确认新密码生效
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置自启动" tabindex="-1"><a class="header-anchor" href="#设置自启动" aria-hidden="true">#</a> 设置自启动</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 将 MySQL 添加到系统进程中
cp /opt/mysql/support-files/mysql.server /etc/init.d/mysqld
此时我们就可以使用服务进程操作mysql了

# 设置 MySQL 自启动
chmod +x /etc/init.d/mysqld
systemctl enable mysqld

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在防火墙中将3306端口开放" tabindex="-1"><a class="header-anchor" href="#在防火墙中将3306端口开放" aria-hidden="true">#</a> 在防火墙中将3306端口开放</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># --permanent 为永久生效，没有此参数 服务器重启后配置失效
firewall-cmd --zone=public --add-port=3306/tcp --permanent
# 重载生效
firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用客户端进行连接测试即可" tabindex="-1"><a class="header-anchor" href="#使用客户端进行连接测试即可" aria-hidden="true">#</a> 使用客户端进行连接测试即可</h2><p>[root@localhost opt]# su mysql [mysql@localhost opt]$ cd /opt/mysql/bin/ [mysql@localhost bin]$ ./mysql -u root -p Enter password: Welcome to the MySQL monitor. Commands end with ; or \\g. Your MySQL connection id is 8 Server version: 8.0.36</p><p>Copyright (c) 2000, 2024, Oracle and/or its affiliates.</p><p>Oracle is a registered trademark of Oracle Corporation and/or its affiliates. Other names may be trademarks of their respective owners.</p><p>Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.</p><p>mysql&gt;</p><h2 id="设置mysql开机自启-创建systemctl管理mysql的配置文件" tabindex="-1"><a class="header-anchor" href="#设置mysql开机自启-创建systemctl管理mysql的配置文件" aria-hidden="true">#</a> 设置mysql开机自启，创建systemctl管理mysql的配置文件</h2><p>https://blog.csdn.net/DT_FlagshipStore/article/details/131312452</p><p>nbxxflnnavwmdjfh</p>`,39),l=[a];function r(v,t){return i(),n("div",null,l)}const m=e(d,[["render",r],["__file","3-CentOS9-MySQL8.html.vue"]]);export{m as default};
