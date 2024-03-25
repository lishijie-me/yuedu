import{_ as i,r as p,o as c,c as o,d as n,f as a,w as t,e as s,b as u}from"./app-PrvqUoBY.js";const r={},d=n("h1",{id:"springboot3-x-二-整合mybatis3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#springboot3-x-二-整合mybatis3","aria-hidden":"true"},"#"),s(" SpringBoot3.x(二)：整合Mybatis3")],-1),k={class:"table-of-contents"},v=u(`<p>案例环境：</p><blockquote><p>Maven-3.9.4；</p><p>JDK-21.0.1（注意，这里JDK版本至少为JDK17）</p><p>Spring-Boot：3.2.1</p><p>MySQL：8.0.27</p></blockquote><h2 id="一、导入依赖" tabindex="-1"><a class="header-anchor" href="#一、导入依赖" aria-hidden="true">#</a> 一、导入依赖</h2><p>导入Mybatis3以及一些必要依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>		<span class="token comment">&lt;!-- mybatis3 依赖 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.0.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
		<span class="token comment">&lt;!-- MySQL 依赖 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mysql-connector-j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、编写配置文件" tabindex="-1"><a class="header-anchor" href="#二、编写配置文件" aria-hidden="true">#</a> 二、编写配置文件</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8010</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/trade<span class="token punctuation">?</span>useSSL=false<span class="token important">&amp;useUnicode=true&amp;characterEncoding=utf-8&amp;allowMultiQueries=true&amp;serverTimezone=Asia/Shanghai</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">12345</span>
<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token comment">#  mapper映射文件包扫描 (这里是对应 resources 的文件路径)</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>/mappers/<span class="token important">*.xml</span>
  <span class="token comment">#  实体类别名包扫描</span>
  <span class="token key atrule">type-aliases-package</span><span class="token punctuation">:</span> io.shijiev.trade.mapper

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、定义实体类-bean" tabindex="-1"><a class="header-anchor" href="#三、定义实体类-bean" aria-hidden="true">#</a> 三、定义实体类 bean</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : 成行(shijiev)
 * <span class="token keyword">@version</span> : v1.0
 * <span class="token keyword">@createTime</span> : 2024/1/18 20:55
 * <span class="token keyword">@description</span> : 订单实体类
 */</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * id
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 用户ID
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 用户名称
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 联系电话
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> phone<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 地址
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 商品总价
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> totalPrice<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、在启动类上添加注解-扫描mapper接口所在位置" tabindex="-1"><a class="header-anchor" href="#四、在启动类上添加注解-扫描mapper接口所在位置" aria-hidden="true">#</a> 四、在启动类上添加注解，扫描mapper接口所在位置</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span><span class="token string">&quot;io.shijiev.trade.mapper&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringBootDemoMybatisApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringBootDemoMybatisApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、定义mapper接口" tabindex="-1"><a class="header-anchor" href="#五、定义mapper接口" aria-hidden="true">#</a> 五、定义mapper接口</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : 成行(lishijie-me)
 * <span class="token keyword">@version</span> : v1.0
 * <span class="token keyword">@createTime</span> : 2024/1/18 20:05
 * <span class="token keyword">@description</span> : 订单mapper接口
 */</span>
<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span> <span class="token function">selectOrderAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、定义mapper-xml映射文件" tabindex="-1"><a class="header-anchor" href="#六、定义mapper-xml映射文件" aria-hidden="true">#</a> 六、定义mapper.xml映射文件</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span> <span class="token name">PUBLIC</span> <span class="token string">&quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;</span> <span class="token string">&quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;</span> <span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.shijiev.trade.mapper.OrderMapper<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>selectOrderAll<span class="token punctuation">&quot;</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.shijiev.trade.bean.Order<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        select * from trade_order
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、service层" tabindex="-1"><a class="header-anchor" href="#七、service层" aria-hidden="true">#</a> 七、service层</h2><ul><li>先定义接口</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : 成行(lishijie-me)
 * <span class="token keyword">@version</span> : v1.0
 * <span class="token keyword">@createTime</span> : 2024/1/18 21:32
 * <span class="token keyword">@description</span> : 订单service层接口
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span> <span class="token function">selectOrderAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>再来编写实现类</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : 成行(lishijie-me)
 * <span class="token keyword">@version</span> : v1.0
 * <span class="token keyword">@createTime</span> : 2024/1/18 21:32
 * <span class="token keyword">@description</span> : 订单service层实现类
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderMapper</span> orderMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span> <span class="token function">selectOrderAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> orderMapper<span class="token punctuation">.</span><span class="token function">selectOrderAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、测试" tabindex="-1"><a class="header-anchor" href="#八、测试" aria-hidden="true">#</a> 八、测试</h2><ul><li>注意，这里的测试类是写在工程的 <code>/test</code> 目录下</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">SpringBootDemoMybatisApplicationTests</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">contextLoads</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span> orders <span class="token operator">=</span> orderService<span class="token punctuation">.</span><span class="token function">selectOrderAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>orders<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),m={href:"https://github.com/lishijie-me/spring-boot-demos",target:"_blank",rel:"noopener noreferrer"};function b(g,h){const e=p("router-link"),l=p("ExternalLinkIcon");return c(),o("div",null,[d,n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#一、导入依赖"},{default:t(()=>[s("一、导入依赖")]),_:1})]),n("li",null,[a(e,{to:"#二、编写配置文件"},{default:t(()=>[s("二、编写配置文件")]),_:1})]),n("li",null,[a(e,{to:"#三、定义实体类-bean"},{default:t(()=>[s("三、定义实体类 bean")]),_:1})]),n("li",null,[a(e,{to:"#四、在启动类上添加注解-扫描mapper接口所在位置"},{default:t(()=>[s("四、在启动类上添加注解，扫描mapper接口所在位置")]),_:1})]),n("li",null,[a(e,{to:"#五、定义mapper接口"},{default:t(()=>[s("五、定义mapper接口")]),_:1})]),n("li",null,[a(e,{to:"#六、定义mapper-xml映射文件"},{default:t(()=>[s("六、定义mapper.xml映射文件")]),_:1})]),n("li",null,[a(e,{to:"#七、service层"},{default:t(()=>[s("七、service层")]),_:1})]),n("li",null,[a(e,{to:"#八、测试"},{default:t(()=>[s("八、测试")]),_:1})])])]),v,n("ul",null,[n("li",null,[s("更多代码请关注我的"),n("a",m,[s("【github仓库】"),a(l)])])])])}const w=i(r,[["render",b],["__file","01-mybatis3.html.vue"]]);export{w as default};
