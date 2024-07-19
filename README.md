## 脚本优势

### 很多同类插件在解决诸如bing，搜狗等对重定向链接进行加密的情况时，采取的方法是插件在后台模拟你本人点击链接，等到在后台它重定向结束得到最终链接后，再帮你贴到当前页面上来，这样你就能点击到去重后的链接了。然而这样是非常缓慢的，并且和网速强关联，有可能你在当前网页已经浏览到很下面了，后台还没结束上面链接的操作过程，此时你仍然会点击到重定向链接。在本插件中，凡是能够将加密链接解析或用未加密链接替代的情况，一律优先解析而不会在后台访问，这使得本脚本在很多时候加载速度相较于同类型脚本有巨大提升

### 🤗目前已加入自动跳转功能并大幅度重构了代码结构，效率更高，解析速度更快🤗

### 去除链接重定向

去除各搜索引擎/常用网站的重定向

> 注意事项：
>
> 重定向一般有两种目的
>
> 1. 追踪用户打开了哪些 URL（bing的/ck/重定向就属于这一种）
> 2. 在用户跳转到站外之前进行确认地址，防止打开不明的页面（知乎的“您正在跳转到其他页面”就属于这一种）
>
> 在使用脚本[东方永页机](https://greasyfork.org/zh-CN/scripts/438684-pagetual)时，如果遇到没有去除重定向的问题，请尝试右击屏幕右侧的侧边栏开启“动态加载”

### 脚本特点

1. 链接反重定向的高准确性和高稳定性，以及相比同类插件更低的时间占用，平均时间在0.02ms~0.05ms之间
2. 适配诸如东方永页机一类的瀑布流插件，不会出现第二页及之后的页没有移除链接重定向的问题
3. 没有多余的onHover操作判断，没有setInterval间隔执行的操作
4. 可自定义自己添加的站点逻辑，或是反映在GreasyFork反馈区内，或是下面的github反馈区链接
5. 采用直接恢复到重定向前的原链接的逻辑，而不是进入跳转页面后自动跳转，优化用户体验

### 反馈问题 / 支持新站点

> 反馈问题或支持新站点请带上网页地址，谢谢

- [greasyfork反馈区](https://greasyfork.org/zh-CN/scripts/483475-%E5%8E%BB%E9%99%A4%E9%93%BE%E6%8E%A5%E9%87%8D%E5%AE%9A%E5%90%91/feedback)
- [github反馈区](https://github.com/MerielVaren/remove-link-redirects/issues/new/choose)

### 如果这能够帮助到你, 请不吝给github项目点一个 star, 你的支持就是我更新的动力，感谢🙏

### 工作原理

1. 根据 URL 上暴露出来的跳转链接，正则匹配提取真实的地址，例如知乎，Google
2. 如果 A 标签的内容为真实的地址，则替换，例如百度贴吧
3. 逐一发送请求，获取真实的地址，例如百度搜索
4. 根据请求特殊页面，这个特殊页面没有重定向地址，然后覆盖当前页，例如百度搜索，搜狗搜索
5. 覆盖原本的链接点击事件，比如 qq 邮箱

### 支持的站点

- ✔️ 必应国内版
- ✔️ 必应国际版
- ✔️ 知乎
- ✔️ 知乎专栏
- ✔️ 知乎日报
- ✔️ Google 搜索
- ✔️ Google 文档
- ✔️ Google Play
- ✔️ Google Gmail
- ✔️ Google Youtube
- ✔️ Steam
- ✔️ 360 搜索
- ✔️ 新浪微博
- ✔️ Twitter
- ✔️ 搜狗搜索
- ✔️ 百度搜索
- ✔️ 百度视频
- ✔️ 百度学术
- ✔️ 百度贴吧
- ✔️ 掘金
- ✔️ QQ 邮箱
- ✔️ Mozilla
- ✔️ 简书
- ✔️ 豆瓣
- ✔️ Pocket
- ✔️ CSDN
- ✔️ 开源中国
- ✔️ 印象笔记
- ✔️ 标志情报局
- ✔️ 爱发电
- ✔️ 51 CTO
- ✔️ InfoQ
- ✔️ Gitee
- ✔️ 少数派
- ✔️ 如有乐享
- ✔️ 力扣
- ✔️ 腾讯开发者社区
- ✔️ 酷安
- ✔️ 腾讯兔小巢
- ✔️ 微信开放社区
- ✔️ pc6下载站
- ✔️ QQ
- ✔️ UrlShare

### 用户自定义

#### 😊欢迎有编程经验的用户编写自定义的provider然后提交到[greasyfork反馈区](https://greasyfork.org/zh-CN/scripts/483475-%E5%8E%BB%E9%99%A4%E9%93%BE%E6%8E%A5%E9%87%8D%E5%AE%9A%E5%90%91/feedback)或是[github反馈区](https://github.com/MerielVaren/remove-link-redirects/issues/new/choose)😊

对于有编程经验的用户，可以自定义自己的provider并使用  
  
插件中有两个类，AutoJumpApp负责处理自动跳转的情况，RedirectApp负责处理原地替换重定向链接的情况，这两个类里面都有providers这个数组，用户可以在这个数组里面添加对应的provider  
  
当RedirectApp比较难处理（比如CSDN博客上的外链，但是一般RedirectApp不能处理的情况很少）或是用户不太理解RedirectApp作用方式的时候可以自定义AutoJumpApp的provider，这个provider的定义简单且直接，其结构为
```
{
  name: string,
  urlTest: RegExp
}
```
其中name为用户自己取的名字，urlTest为跳转链接的url，如[https://link.csdn.net/?target=https%3A%2F%2F3.jetbra.in%2F](https://link.csdn.net/?target=https%3A%2F%2F3.jetbra.in%2F)，需要用户将target=后面对应的最终链接的部分写成```(.*)```，比如```urlTest: /link\.csdn\.net\/\?target=(.*)/```  
  
<strong>举个例子</strong> 
```
{
  name: "CSDN",
  urlTest: /link\.csdn\.net\/\?target=(.*)/,
},
```
其中CSDN是我给这个provider起的名字，这个名字是任意的，```urlTest: /link\.csdn\.net\/\?target=(.*)/,```表示这个形式的网页是跳转网页，比如[https://link.csdn.net/?target=https%3A%2F%2F3.jetbra.in%2F](https://link.csdn.net/?target=https%3A%2F%2F3.jetbra.in%2F)，当然你也可以写成```/https:\/\/link\.csdn\.net\/\?target=(.*)```，只要不要忘记转义就可以了，如果你不知道转义的意思，也可以简单的理解为 <strong>在. * + ? / ( ) [ ] { }这些字符前面加上\，变成\\. \\* \\+ \\? \\/ \\( \\) \\[ \\] \\{ \\}的形式</strong>

RedirectApp处理的是原地替换链接的情况，当用户可以获取到重定向链接时可以自定义RedirectApp的provider，其基础结构为
```
{
  name: string,
  urlTest: RegExp | Boolean | Function
  linkTest: RegExp | Boolean | Function,
  resolveRedirect: Function
}
```
其中name为用户自己取的名字，urlTest为一个返回布尔值的属性，表示“是否要在当前域名上启用”，linkTest为一个返回布尔值的属性，表示“什么样的链接要在当前网页上被替换”，resolveRedirect内部会调用RedirectApp.removeLinkRedirect(element, realUrl, this)，其中element和this是固定值不需要改，realUrl表示“要被替换的链接最终的形式是什么”  

<strong>举个例子</strong>
```
{
  name: "知乎专栏",
  urlTest: /zhuanlan\.zhihu\.com/,
  linkTest: /link\.zhihu\.com\/\?target=(.*)/,
  resolveRedirect: function (element) {
    RedirectApp.removeLinkRedirect(
      element,
      new URL(element.href).searchParams.get("target"),
      this
    );
  },
},
```
这里“知乎专栏”是我给provider起的名字，这个名字是任意的，```urlTest: /zhuanlan\.zhihu\.com/,```表示我要在zhuanlan.zhihu.com上启用这个provider，```linkTest: /link\.zhihu\.com\/\?target=(.*)/```表示符合```/link\.zhihu\.com\/\?target=(.*)/```这个正则形式的链接要被替换掉
```
resolveRedirect: function (element) {
  RedirectApp.removeLinkRedirect(
    element,
    new URL(element.href).searchParams.get("target"),
    this
  );
},
```
表示这些链接最终要被替换成```new URL(element.href).searchParams.get("target")```的形式，其中element.href是符合的链接
