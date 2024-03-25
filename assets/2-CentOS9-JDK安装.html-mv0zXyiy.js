import{_ as e,o as n,c as a,b as s}from"./app-PrvqUoBY.js";const i={},l=s(`<h1 id="centos9-jdk-安装" tabindex="-1"><a class="header-anchor" href="#centos9-jdk-安装" aria-hidden="true">#</a> CentOS9 JDK 安装</h1><h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><blockquote><p>CentOS Stream 9<br> Jdk-21.0.2</p></blockquote><h2 id="获取安装包" tabindex="-1"><a class="header-anchor" href="#获取安装包" aria-hidden="true">#</a> 获取安装包</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装配置" tabindex="-1"><a class="header-anchor" href="#安装配置" aria-hidden="true">#</a> 安装配置</h2><ul><li>解压</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> jdk-21_linux-x64_bin.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>移动到指定位置</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 我一般都把软件安装在 /opt 目录下</span>
<span class="token function">mv</span> jdk-21.0.2 /opt/jdk-21
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置 JDK</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打开配置文件</span>
<span class="token function">vim</span> /etc/profile
<span class="token comment">## 在最后 添加如下配置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/opt/jdk-21
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span>.:<span class="token variable">$JAVA_HOME</span>/jre/lib/rt.jar:<span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">$JAVA_HOME</span>/bin:<span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>让配置生效</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>source /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>验证是否安装完成</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看版本号
java -version

## 出现如下信息，则表示安装成功
java version &quot;21.0.2&quot; 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 21.0.2+13-LTS-58)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.2+13-LTS-58, mixed mode, sharing)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>安装完成后 验证 <code>JDK</code> 是否有效</p></blockquote><ul><li>编写个 Java文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class JdkInstall {
    public static void main(String[] args) {
        JdkInstall ins = new JdkInstall();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>进入源文件所在目录，命令行编译，生成 .class 文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>javac JdkInstall.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看class文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@localhost ~]# javap -c JdkInstall
警告: 文件 .\\JdkInstall.class 不包含类 JdkInstall
Compiled from &quot;JdkInstall.java&quot;
public class io.adam.demo.controller.JdkInstall {
  public io.shj.demo.controller.JdkInstall();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: new           #2                  // class io/shj/demo/controller/JdkInstall
       3: dup
       4: invokespecial #3                  // Method &quot;&lt;init&gt;&quot;:()V
       7: astore_1
       8: return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此安装验证完成，整个环境也算是搭建完成了，后面可以上代码了，可以开心的玩耍了，哈哈~~</p>`,24),d=[l];function t(r,c){return n(),a("div",null,d)}const o=e(i,[["render",t],["__file","2-CentOS9-JDK安装.html.vue"]]);export{o as default};
