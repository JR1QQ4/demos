/**
 * 代码嵌入网页的方法
 * 
 * (1) script 元素嵌入代码:
 *   <script type="application/javascript"></script>
 *   <script type="text/javascript"></script>
 * 如果type属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在<script>标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的type属性即可。
 * 
 * (2) script 元素加载外部脚本:
 *   <script src="https://www.example.com/script.js"></script>
 *   <script charset="utf-8" src="https://www.example.com/script.js"></script>
 *   所加载的脚本必须是纯的 JavaScript 代码，不能有HTML代码和<script>标签。
 *   为了防止攻击者篡改外部脚本，script标签允许设置一个integrity属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性
 *     <script src="/assets/application.js"
 *        integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
 *     </script>
 * 
 * (3) 事件属性: <button id="myBtn" onclick="console.log(this.id)">点击</button>
 * 
 * (4) URL 协议: 
 *     <a href="javascript:console.log('Hello')">点击</a>
 *       浏览器的地址栏也可以执行javascript:协议。将javascript:console.log('Hello')放入地址栏，按回车键也会执行这段代码。
 *     <a href="javascript: new Date().toLocaleTimeString();">点击</a>
 *       用户点击链接以后，会打开一个新文档，里面有当前时间。
 *     <a href="javascript: console.log(new Date().toLocaleTimeString())">点击</a>
 *       如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。用户点击链接后，网页不会跳转，只会在控制台显示当前时间。
 *     javascript:协议的常见用途是书签脚本 Bookmarklet。由于浏览器的书签保存的是一个网址，所以javascript:网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本前加上void，或者在脚本最后加上void 0。
 *     <a href="javascript: void new Date().toLocaleTimeString();">点击</a>
 *     <a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
 * 
 * script 元素
 * 工作原理:
 *   1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
 *   2. 解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
 *   3. 如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
 *   4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
 * 
 * defer 属性: 作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。
 *   1. 浏览器开始解析 HTML 网页
 *   2. 解析过程中，发现带有defer属性的<script>元素
 *   3. 浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
 *   4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本
 * 
 * async 属性,解决“阻塞效应”的另一个方法:
 *   1. 浏览器开始解析 HTML 网页
 *   2. 解析过程中，发现带有async属性的script标签
 *   3. 浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本
 *   4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本
 *   5. 脚本执行完毕，浏览器恢复解析 HTML 网页
 * 
 * 如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定
 * 
 * 脚本的动态加载: <script>元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
 * 动态生成的script标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。
 * 如果想避免这个问题，可以设置async属性为false。
 * 
 * 加载使用的协议: 浏览器默认采用 HTTP 协议下载
 * <script src="//example.js"></script> 根据页面本身的协议来决定加载协议
 * 
 * 浏览器的组成:  渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。
 * 渲染引擎处理网页，通常分成四个阶段: 并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了
 *   1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
 *   2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）
 *   3. 布局：计算出渲染树的布局（layout）
 *   4. 绘制：将渲染树绘制到屏幕
 * 
 * 重流和重绘:
 * 渲染树转换为网页布局，称为“布局流”（flow）；布局显示到页面的这个过程，称为“绘制”（paint）。
 * 页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。用户的互动也会触发重流和重绘，比如设置了鼠标悬停（a:hover）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。
 * 重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。
 * 
 * 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
 * 缓存 DOM 信息
 * 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式
 * 使用documentFragment操作 DOM
 * 动画使用absolute定位或fixed定位，这样可以减少对其他元素的影响。
 * 只在必要时才显示隐藏元素。
 * 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流
 * 使用虚拟 DOM（virtual DOM）库
 * 
 * JavaScript 引擎
 * 早期，浏览器内部对 JavaScript 的处理过程如下：
 *   1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
 *   2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
 *   3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
 *   4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。
 * 为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。
 * 字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。
 * 
 */
// ['a.js', 'b.js'].forEach(function (src) {
//     var script = document.createElement('script');
//     script.src = src;
//     // 可以保证b.js在a.js后面执行
//     script.async = false;
//     document.head.appendChild(script);
// });

// // 重绘代价高 每读一次 DOM，就写入新的值，会造成不停的重排和重流
// function doubleHeight(element) {
//     var currentHeight = element.clientHeight;
//     element.style.height = (currentHeight * 2) + 'px';
// }
// all_my_elements.forEach(doubleHeight);

// // 重绘代价低 把所有的写操作，都累积在一起
// function doubleHeight(element) {
//     var currentHeight = element.clientHeight;
//     window.requestAnimationFrame(function () {
//         element.style.height = (currentHeight * 2) + 'px';
//     });
// }
// all_my_elements.forEach(doubleHeight);

/**
 * window 对象
 * 
 * 属性:
 * window.name 一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的target属性使用
 * window.closed 属性返回一个布尔值，表示窗口是否关闭
 * window.opener 属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回null。
 *   var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
 *   newWin.opener = null;
 *   <a>元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险
 * window.self和window.window属性都指向窗口本身
 * window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。window.frames[0]表示页面中第一个框架窗口。
 *   frames === window // true frames属性实际上是window对象的别名
 * window.length属性返回当前网页包含的框架总数
 * window.frameElement 属性主要用于当前窗口嵌在另一个网页的情况（嵌入<object>、<iframe>或<embed>元素），返回当前窗口所在的那个元素节点
 * window.top 属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。
 * window.parent 属性指向父窗口。如果当前窗口没有父窗口，window.parent指向自身。
 * window.status 属性用于读写浏览器状态栏的文本
 * window.devicePixelRatio 属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率
 *   它表示一个 CSS 像素由多少个物理像素组成
 * 位置大小属性:
 *   window.screenX 和 window.screenY 属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）
 *   window.innerHeight 和 window.innerWidth 属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）
 *       包括滚动条的高度和宽度
 *   window.outerHeight和window.outerWidth属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框
 *   window.scrollX属性返回页面的水平滚动距离，window.scrollY属性返回页面的垂直滚动距离
 *   window.pageXOffset，window.pageYOffset 是window.scrollX和window.scrollY别名。
 * 组件属性:
 *   window.locationbar：地址栏对象
 *   window.menubar：菜单栏对象
 *   window.scrollbars：窗口的滚动条对象
 *   window.toolbar：工具栏对象
 *   window.statusbar：状态栏对象
 *   window.personalbar：用户安装的个人工具栏对象
 * 全局对象属性:
 *   window.document：指向document对象
 *   window.location：指向Location对象
 *   window.navigator：指向Navigator对象
 *   window.history：指向History对象
 *   window.localStorage：指向本地储存的 localStorage 数据
 *   window.sessionStorage：指向本地储存的 sessionStorage 数据
 *   window.console：指向console对象，用于操作控制台
 *   window.screen：指向Screen对象，表示屏幕信息
 * window.isSecureContext属性返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，就是true，否则就是false
 * 
 * 方法：
 * window.alert()、window.prompt()、window.confirm()
 * window.open方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项
 *   window.open(url, windowName, [windowFeatures])
 * window.close方法用于关闭当前窗口，一般只用来关闭window.open方法新建的窗口
 * window.stop()方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象
 * window.moveTo()方法用于移动浏览器窗口到指定位置
 * window.moveBy方法将窗口移动到一个相对位置
 * window.resizeTo()方法用于缩放窗口到指定大小
 * window.resizeBy()方法用于缩放窗口。它与window.resizeTo()的区别是，它按照相对的量缩放，window.resizeTo()需要给出缩放后的绝对大小
 * window.scrollTo方法用于将文档滚动到指定位置
 * window.scroll()方法是window.scrollTo()方法的别名
 * window.scrollBy()方法用于将网页滚动指定距离
 * window.print方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同
 * window.focus()方法会激活窗口，使其获得焦点，出现在其他窗口的前面
 * window.blur()方法将焦点从窗口移除
 * window.getSelection方法返回一个Selection对象，表示用户现在选中的文本。
 * window.getComputedStyle()方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象
 * window.matchMedia()方法用来检查 CSS 的mediaQuery语句
 * window.requestAnimationFrame()方法跟setTimeout类似，都是推迟某个函数的执行。
 *   不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘
 *   返回值是一个整数，这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行
 * window.requestIdleCallback() 跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。
 *   也就是说，如果某个任务不是很关键，就可以使用window.requestIdleCallback()将其推迟执行，以保证网页性能
 * 
 * 事件:
 * load 事件发生在文档在浏览器窗口加载完毕时。
 * window.onload 属性可以指定这个事件的回调函数
 * 浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数。
 * window 对象的事件监听属性:
 *   window.onafterprint：afterprint事件的监听函数
 *   window.onbeforeprint：beforeprint事件的监听函数
 *   window.onbeforeunload：beforeunload事件的监听函数
 *   window.onhashchange：hashchange事件的监听函数
 *   window.onlanguagechange: languagechange的监听函数
 *   window.onmessage：message事件的监听函数
 *   window.onmessageerror：MessageError事件的监听函数。
 *   window.onoffline：offline事件的监听函数
 *   window.ononline：online事件的监听函数。
 *   window.onpagehide：pagehide事件的监听函数。
 *   window.onpageshow：pageshow事件的监听函数。
 *   window.onpopstate：popstate事件的监听函数。
 *   window.onstorage：storage事件的监听函数。
 *   window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
 *   window.onunload：unload事件的监听函数
 * 
 * 多窗口操作: 网页可以使用iframe元素，嵌入其他网页
 *   top：顶层窗口，即最上层的那个窗口
 *   parent：父窗口
 *   self：当前窗口，即自身
 * 浏览器还提供一些特殊的窗口名，供window.open()方法、<a>标签、<form>标签等引用:
 *   _top：顶层窗口
 *   _parent：父窗口
 *   _blank：新窗口
 * iframe 元素:
 *   var frame = document.getElementById('theFrame');
 *   使用contentWindow属性获得iframe节点包含的window对象
 *   var frameWindow = frame.contentWindow;
 * 
 *   // HTML 代码为 <iframe id="myFrame">
 *   window.myFrame // [HTMLIFrameElement]
 *   frames.myframe === myFrame // true
 */
// 如果页面向下滚动的距离小于75像素，那么页面向下滚动75像素
// if (window.scrollY < 75) {
//     window.scroll(0, 75);
// }

// if (typeof window.print === 'function') {
//     // 支持打印功能
// }

// 出错信息 出错脚本的网址 行号 列号 错误对象
// window.onerror = function (message, filename, lineno, colno, error) {
//     console.log("出错了！--> %s", error.stack);
// };

// crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要 cookie 和 HTTP 认证信息
// 如果设为crossorigin="use-credentials"，就表示浏览器会上传 cookie 和 HTTP 认证信息，同时还需要服务器端打开 HTTP 头信息Access-Control-Allow-Credentials
{/* <script crossorigin="anonymous" src="//example.com/file.js"></script> */ }

/**
 * Navigator 对象
 *
 * 属性：
 * Navigator.userAgent 通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串
 *     不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串
 *     如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串
 *     /mobi|android|touch|mini/i.test(ua)
 * Navigator.plugins 返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等
 * Navigator.platform 返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等
 * Navigator.onLine 返回一个布尔值，表示用户当前在线还是离线（浏览器断线）
 * Navigator.language属性返回一个字符串，表示浏览器的首选语言。该属性只读。
 * Navigator.languages属性返回一个数组，表示用户可以接受的语言
 * Navigator.geolocation属性返回一个 Geolocation 对象，包含用户地理位置的信息
 *     该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错。
 *     Geolocation.getCurrentPosition()：得到用户的当前位置
 *     Geolocation.watchPosition()：监听用户位置变化
 *     Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数
 * Navigator.cookieEnabled属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
 *
 * 方法：
 * Navigator.javaEnabled()方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
 * Navigator.sendBeacon()方法用于向服务器异步发送数据
 *
 * Screen 对象：
 * 属性：
 * Screen.height：浏览器窗口所在的屏幕的高度
 * Screen.width：浏览器窗口所在的屏幕的宽度
 * Screen.availHeight：浏览器窗口可用的屏幕高度
 * Screen.availWidth：浏览器窗口可用的屏幕宽度
 * Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
 * Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事
 * Screen.orientation：返回一个对象，表示屏幕的方向
 *   该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary。
 *
 *
 *
 *
 */
// var ua = navigator.userAgent.toLowerCase();
// if (/mobi/i.test(ua)) {
//     // 手机浏览器
// } else {
//     // 非手机浏览器
// }

// window.screen.orientation // { angle: 0, type: "landscape-primary", onchange: null }

// 保证屏幕分辨率大于 1024 x 768
// if (window.screen.width >= 1024 && window.screen.height >= 768) {
//     // 分辨率不低于 1024x768
// }

// 根据屏幕的宽度，将用户导向不同网页的代码
// if ((screen.width <= 800) && (screen.height <= 600)) {
//     window.location.replace('small.html');
// } else {
//     window.location.replace('wide.html');
// }

/**
 * Cookie
 *
 * Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。
 * Cookie 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些。
 *     对话（session）管理：保存登录、购物车等需要记录的信息。
 *     个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
 *     追踪：记录和分析用户行为。
 * Cookie 包含以下几方面的信息：
 *     Cookie 的名字
 *     Cookie 的值（真正的数据写在这里面）
 *     到期时间
 *     所属域名（默认是当前域名） 如果路径设为/forums，那么这个 Cookie 只有在访问www.example.com/forums及其子路径时才有效
 *     生效的路径（默认是当前网址）
 * 浏览器可以设置不接受 Cookie，也可以设置不向服务器发送 Cookie
 *   window.navigator.cookieEnabled 回一个布尔值，表示浏览器是否打开 Cookie 功能
 * document.cookie属性返回当前网页的 Cookie
 * 一般来说，单个域名设置的 Cookie 不应超过30个，每个 Cookie 的大小不能超过4KB。超过限制以后，Cookie 将被忽略，不会被设置。
 * 浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie。
 * 这里不要求协议相同。也就是说，http://example.com设置的 Cookie，可以被https://example.com读取。
 *
 *
 * Cookie 与 HTTP 协议 ： Cookie 由 HTTP 协议生成，也主要是供 HTTP 协议使用
 * 服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个Set-Cookie字段
 *     Set-Cookie:foo=bar
 * HTTP 回应可以包含多个Set-Cookie字段，即在浏览器生成多个 Cookie。
 *     HTTP/1.0 200 OK
 *     Content-type: text/html
 *     Set-Cookie: yummy_cookie=choco
 *     Set-Cookie: tasty_cookie=strawberry
 *     [page content]
 *
 * 除了 Cookie 的值，Set-Cookie字段还可以附加 Cookie 的属性
 *     Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
 *     Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
 *     Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
 *     Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
 *     Set-Cookie: <cookie-name>=<cookie-value>; Secure
 *     Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
 *
 * 一个Set-Cookie字段里面，可以同时包括多个属性，没有次序的要求
 *     Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
 *     Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
 *
 * 如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。
 *     Set-Cookie: key1=value1; domain=example.com; path=/blog
 *     Set-Cookie: key1=value2; domain=example.com; path=/
 *     下一次访问example.com/blog的时候，浏览器将向服务器发送两个同名的 Cookie。
 *     Cookie: key1=value1; key1=value2
 *
 * HTTP 请求：Cookie 的发送
 * 浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的Cookie字段。
 *     Cookie: foo=bar
 * Cookie字段可以包含多个 Cookie，使用分号（;）分隔
 *     Cookie: name=value; name2=value2; name3=value3
 * GET /sample_page.html HTTP/1.1
 * Host: www.example.org
 * Cookie: yummy_cookie=choco; tasty_cookie=strawberry
 *
 * 服务器收到浏览器发来的 Cookie 时，有两点是无法知道的：
 *     Cookie 的各种属性，比如何时过期
 *     哪个域名设置的 Cookie，到底是一级域名设的，还是某一个二级域名设的。
 *
 * Cookie 的属性：
 * Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式，可以使用Date.prototype.toUTCString()进行格式转换
 *     如果不设置该属性，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。
 * Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。
 *     如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效。
 *     如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。
 * Domain属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie。如果没有指定该属性，浏览器会默认将其设为当前域名，这时子域名将不会附带这个 Cookie。
 *     如果指定了domain属性，那么子域名也会附带这个 Cookie。如果服务器指定的域名不属于当前域名，浏览器会拒绝这个 Cookie。
 * Path属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。只要浏览器发现，Path属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。
 * Secure属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的Secure属性。
 *     该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。
 * HttpOnly属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是document.cookie属性、XMLHttpRequest对象和 Request API 都拿不到该属性。
 * document.cookie属性用于读写当前网页的 Cookie。
 *     document.cookie // "foo=bar;baz=bar" 一次性读出两个 Cookie,它们之间使用分号分隔
 *     document.cookie属性是可写的，可以通过它为当前网站添加 Cookie。  document.cookie = 'fontSize=14';
 *     写入的时候，Cookie 的值必须写成key=value的形式
 *     document.cookie一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加。
 *     document.cookie读写行为的差异（一次可以读出全部 Cookie，但是只能写入一个 Cookie），与 HTTP 协议的 Cookie 通信格式有关。
 *
 * 删除一个现存 Cookie 的唯一方法，是设置它的expires属性为一个过去的日期。
 * document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
 */
// document.cookie = 'fontSize=14; '
//     + 'expires=' + someDate.toGMTString() + '; '
//     + 'path=/subdirectory; '
//     + 'domain=*.example.com';

/**
 * XMLHttpRequest 对象
 * 
 * AJAX 包括以下几个步骤:
 *   1. 创建 XMLHttpRequest 实例
 *   2. 发出 HTTP 请求
 *   3. 接收服务器传回的数据
 *   4. 更新网页数据
 * XMLHttpRequest 实际上可以使用多种协议（比如file或ftp），发送任何格式的数据（包括字符串和二进制）
 * XMLHttpRequest本身是一个构造函数，可以使用new命令生成实例
 * 
 * var xhr = new XMLHttpRequest(); // 新建实例，就可以使用open()方法指定建立 HTTP 连接的一些细节
 * xhr.open('GET', 'http://www.example.com/page.php', true); // 使用 GET 方法，跟指定的服务器网址建立连接;第三个参数true，表示请求是异步的
 * xhr.onreadystatechange = handleStateChange; // 指定回调函数，监听通信状态（readyState属性）的变化
 * function handleStateChange() { ...  }
 * xhr.send(null); // 最后使用send()方法，实际发出请求;null，表示发送请求的时候，不带有数据体
 * 
 * AJAX 只能向同源网址（协议、域名、端口都相同）发出 HTTP 请求，如果发出跨域请求，就会报错
 * 
 * 实例属性:
 * XMLHttpRequest.readyState返回一个整数，表示实例对象的当前状态。该属性只读。它可能返回以下值:
 *     0，表示 XMLHttpRequest 实例已经生成，但是实例的open()方法还没有被调用。
 *     1，表示open()方法已经调用，但是实例的send()方法还没有调用，仍然可以使用实例的setRequestHeader()方法，设定 HTTP 请求的头信息。
 *     2，表示实例的send()方法已经调用，并且服务器返回的头信息和状态码已经收到。
 *     3，表示正在接收服务器传来的数据体（body 部分）。这时，如果实例的responseType属性等于text或者空字符串，responseText属性就会包含已经收到的部分信息。
 *     4，表示服务器返回的数据已经完全接收，或者本次接收已经失败。
 *     通信过程中，每当实例对象发生状态变化，它的readyState属性的值就会改变。这个值每一次变化，都会触发readyStateChange事件
 * XMLHttpRequest.onreadystatechange 属性指向一个监听函数。readystatechange事件发生时（实例的readyState属性变化），就会执行这个属性。
 *     如果使用实例的abort()方法，终止 XMLHttpRequest 请求，也会造成readyState属性变化，导致调用XMLHttpRequest.onreadystatechange属性
 * XMLHttpRequest.response 属性表示服务器返回的数据体（即 HTTP 回应的 body 部分）。它可能是任何数据类型，比如字符串、对象、二进制对象等等，具体的类型由XMLHttpRequest.responseType属性决定。该属性只读。
 *     如果本次请求没有成功或者数据不完整，该属性等于null。但是，如果responseType属性等于text或空字符串，在请求没有结束之前（readyState等于3的阶段），response属性包含服务器已经返回的部分数据。
 * XMLHttpRequest.responseType 属性是一个字符串，表示服务器返回数据的类型。这个属性是可写的，可以在调用open()方法之后、调用send()方法之前，设置这个属性的值，告诉服务器返回指定类型的数据。
 *     如果responseType设为空字符串，就等同于默认值text。可以等于以下值:
 *     ""（空字符串）：等同于text，表示服务器返回文本数据
 *     "arraybuffer"：ArrayBuffer 对象，表示服务器返回二进制数组
 *     "blob"：Blob 对象，表示服务器返回二进制对象,比如图片文件
 *     document"：Document 对象，表示服务器返回一个文档对象,适合返回 HTML / XML 文档的情况
 *     "json"：JSON 对象。浏览器会自动对返回数据调用JSON.parse()方法
 *     "text"：字符串。
 * XMLHttpRequest.responseText 返回从服务器接收到的字符串，该属性为只读。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据。
 * XMLHttpRequest.responseXML 属性返回从服务器接收到的 HTML 或 XML 文档对象，该属性为只读。如果本次请求没有成功，或者收到的数据不能被解析为 XML 或 HTML，该属性等于null。
 *     该属性生效的前提是 HTTP 回应的 Content-Type 头信息等于 text/xml 或 application/xml。
 *     如果 HTTP 回应的Content-Type头信息不等于text/xml和application/xml，但是想从responseXML拿到数据（即把数据按照 DOM 格式解析），那么需要手动调用XMLHttpRequest.overrideMimeType()方法，强制进行 XML 解析。
 * XMLHttpRequest.responseURL 属性是字符串，表示发送数据的服务器的网址。
 *     这个属性的值与open()方法指定的请求网址不一定相同
 * XMLHttpRequest.status 属性返回一个整数，表示服务器回应的 HTTP 状态码。
 *     200, OK，访问正常.如果服务器没有返回状态码，那么这个属性默认是200。请求发出之前，该属性为0。
 *     301, Moved Permanently，永久移动
 *     302, Moved temporarily，暂时移动
 *     304, Not Modified，未修改
 *     307, Temporary Redirect，暂时重定向
 *     401, Unauthorized，未授权
 *     403, Forbidden，禁止访问
 *     404, Not Found，未发现指定网址
 *     500, Internal Server Error，服务器发生错误
 * XMLHttpRequest.timeout 属性返回一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于0，就表示没有时间限制。
 * XMLHttpRequestEventTarget.ontimeout 属性用于设置一个监听函数，如果发生 timeout 事件，就会执行这个监听函数
 * 
 * 事件监听属性:
 * XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
 * XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
 * XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了abort()方法）的监听函数
 * XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
 * XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
 * XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
 * XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数
 * 
 * XMLHttpRequest.withCredentials 属性是一个布尔值，表示跨域请求时，用户信息（比如 Cookie 和认证的 HTTP 头信息）是否会包含在请求之中，
 *     默认为false，即向example.com发出跨域请求时，不会发送example.com设置在本机上的 Cookie
 * XMLHttpRequest.upload 不仅可以发送请求，还可以发送文件，这就是 AJAX 文件上传
 *     发送文件以后，通过XMLHttpRequest.upload属性可以得到一个对象，通过观察这个对象，可以得知上传的进展。
 *     主要方法就是监听这个对象的各种事件：loadstart、loadend、load、abort、error、progress、timeout。
 * 
 * XMLHttpRequest 的实例方法
 * XMLHttpRequest.open() 方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。它一共可以接受五个参数
 *     void open(
 *        string method, // 表示 HTTP 动词方法，比如GET、POST、PUT、DELETE、HEAD等
 *        string url, // 请求发送目标 URL
 *        optional boolean async, // 请求是否为异步，默认为true
 *        optional string user, // 用于认证的用户名，默认为空字符串。该参数可选
 *        optional string password // 用于认证的密码，默认为空字符串。该参数可选
 *     );
 * XMLHttpRequest.send() 用于实际发出 HTTP 请求。
 *     它的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体，典型例子就是 GET 请求.
 *     如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。
 *     send(null | ArrayBufferView data | Blob data | Document data | String data | FormData data)
 * XMLHttpRequest.setRequestHeader() 设置浏览器发送的 HTTP 请求的头信息。该方法必须在open()之后、send()之前调用
 *     xhr.setRequestHeader('Content-Type', 'application/json');
 *     xhr.setRequestHeader('Content-Length', JSON.stringify(data).length)
 *     xhr.send(JSON.stringify(data));
 * XMLHttpRequest.overrideMimeType() 用来指定 MIME 类型，覆盖服务器返回的真正的 MIME 类型，从而让浏览器进行不一样的处理
 * XMLHttpRequest.getResponseHeader()方法返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，返回null
 * XMLHttpRequest.getAllResponseHeaders()  返回一个字符串，表示服务器发来的所有 HTTP 头信息。
 * XMLHttpRequest.abort() 用来终止已经发出的 HTTP 请求。调用这个方法以后，readyState属性变为4，status属性变为0
 * 
 * XMLHttpRequest 实例的事件
 * readyState属性的值发生改变，就会触发 readyStateChange 事件
 * progress 事件上传文件时，XMLHttpRequest 实例对象本身和实例的upload属性，都有一个progress事件，会不断返回上传的进度
 * load 事件表示服务器传来的数据接收完毕，error 事件表示请求出错，abort 事件表示请求被中断
 * abort、load和error这三个事件，会伴随一个loadend事件，表示请求结束，但不知道其是否成功。
 * 服务器超过指定时间还没有返回结果，就会触发 timeout 事件
 * Navigator.sendBeacon() 这个方法还是异步发出请求，但是请求与当前页面线程脱钩，作为浏览器进程的任务，因此可以保证会把数据发出去，不拖延卸载流程。
 *     navigator.sendBeacon(url, data)
 * 
 */
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     // 通信成功时，状态值为4
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             console.log(xhr.responseText);
//         } else {
//             console.error(xhr.statusText);
//         }
//     }
// };
// xhr.onerror = function (e) {
//     console.error(xhr.statusText);
// };
// xhr.open('GET', '/endpoint', true);
// xhr.send(null);

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://example.com', true);
// xhr.onreadystatechange = function () {
//     if (xhr.readyState !== 4 || xhr.status !== 200) {
//         return;
//     }
//     console.log(xhr.responseText);
// };
// xhr.send();

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/path/to/image.png', true);
// xhr.responseType = 'blob';
// xhr.onload = function (e) {
//     if (this.status === 200) {
//         var blob = new Blob([xhr.response], { type: 'image/png' });
//         // 或者
//         var blob = xhr.response;
//     }
// };
// xhr.send();

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/path/to/image.png', true);
// xhr.responseType = 'arraybuffer';
// xhr.onload = function (e) {
//     var uInt8Array = new Uint8Array(this.response);
//     for (var i = 0, len = uInt8Array.length; i < len; ++i) {
//         // var byte = uInt8Array[i];
//     }
// };
// xhr.send();

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/server', true);
// xhr.responseType = 'document';
// xhr.overrideMimeType('text/xml');
// xhr.onload = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseXML);
//     }
// };
// xhr.send(null);

// var xhr = new XMLHttpRequest();
// var url = '/server';
// xhr.ontimeout = function () {
//     console.error('The request for ' + url + ' timed out.');
// };
// xhr.onload = function () {
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             // 处理服务器返回的数据
//         } else {
//             console.error(xhr.statusText);
//         }
//     }
// };
// xhr.open('GET', url, true);
// // 指定 10 秒钟超时
// xhr.timeout = 10 * 1000;
// xhr.send(null);

// xhr.onload = function () {
//     var responseText = xhr.responseText;
//     console.log(responseText);
//     // process the response.
// };
// xhr.onabort = function () {
//     console.log('The request was aborted');
// };
// xhr.onprogress = function (event) {
//     console.log(event.loaded); // loaded属性返回已经传输的数据量
//     console.log(event.total); // total属性返回总的数据量
// };
// xhr.onerror = function () {
//     console.log('There was an error!');
// };

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://example.com/', true);
// xhr.withCredentials = true;
// xhr.send(null);
// // 为了让这个属性生效，服务器必须显式返回Access-Control-Allow-Credentials这个头信息
// Access-Control-Allow-Credentials: true

{/* <progress min="0" max="100" value="0">0% complete</progress> */ }
// function upload(blobOrFile) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/server', true);
//     xhr.onload = function (e) { };
//     var progressBar = document.querySelector('progress');
//     xhr.upload.onprogress = function (e) {
//         if (e.lengthComputable) { // 表示加载的进度是否可以计算
//             progressBar.value = (e.loaded / e.total) * 100;
//             // 兼容不支持 <progress> 元素的老式浏览器
//             progressBar.textContent = progressBar.value;
//         }
//     };
//     xhr.send(blobOrFile);
// }
// upload(new Blob(['hello world'], { type: 'text/plain' }));

// var xhr = new XMLHttpRequest();
// var data = 'email='
//     + encodeURIComponent(email)
//     + '&password='
//     + encodeURIComponent(password);
// xhr.open('POST', 'http://www.example.com', true);
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr.send(data);

// var formData = new FormData();
// formData.append('username', '张三');
// formData.append('email', 'zhangsan@example.com');
// formData.append('birthDate', 1940);
// var xhr = new XMLHttpRequest();
// xhr.open('POST', '/register');
// xhr.send(formData);

{/* <form id='registration' name='registration' action='/register'>
  <input type='text' name='username' value='张三'>
  <input type='email' name='email' value='zhangsan@example.com'>
  <input type='number' name='birthDate' value='1940'>
  <input type='submit' onclick='return sendForm(this.form);'>
</form> */}
// function sendForm(form) {
//     var formData = new FormData(form);
//     formData.append('csrf', 'e69a18d7db1286040586e6da1950128c');
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', form.action, true);
//     xhr.onload = function () {
//     };
//     xhr.send(formData);
//     return false;
// }
// var form = document.querySelector('#registration');
// sendForm(form);