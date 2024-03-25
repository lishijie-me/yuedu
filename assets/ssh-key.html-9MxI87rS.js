import{_ as e,o as s,c as t,b as a}from"./app-PrvqUoBY.js";const c={},o=a(`<h1 id="生成-ssh-key" tabindex="-1"><a class="header-anchor" href="#生成-ssh-key" aria-hidden="true">#</a> 生成 SSH key</h1><ul><li>生成 <code>ssh key</code> 命令</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ssh-keygen -t rsa -C &quot;your_email@example.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>连续按三次回车，即可生成</p><p><strong>注意</strong> 这里如果之前已经生成过 key ，按回车的时候会提示你，是否要覆盖？你选是（y）就行。</p><ul><li>进入 <code>~/.ssh/id_rsa.pub</code> 文件，获取公钥</li><li>配置公钥到 <code>Github</code> 或 <code>gitee</code> 中</li></ul>`,6),d=[o];function i(l,n){return s(),t("div",null,d)}const u=e(c,[["render",i],["__file","ssh-key.html.vue"]]);export{u as default};