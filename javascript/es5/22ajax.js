/**
 * 浏览器安全的基石是“同源政策”（same-origin policy）。
 * 最初，它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页“同源”。所谓“同源”指的是“三个相同”。
 *     协议相同  域名相同  端口相同
 *
 * 目前，如果非同源，共有三种行为受到限制。
 *     （1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
 *     （2） 无法接触非同源网页的 DOM。
 *     （3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。
 *
 * 如果是非同源的网页，目前允许一个窗口可以接触其他网页的window对象的九个属性和四个方法。
 *   window.closed
 *   window.frames
 *   window.length
 *   window.location  // 可读写的 非同源的情况下，也只允许调用location.replace方法和写入location.href属性
 *   window.opener
 *   window.parent
 *   window.self
 *   window.top
 *   window.window
 *   window.blur()
 *   window.close()
 *   window.focus()
 *   window.postMessage()
 *
 * Cookie
 * Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置document.domain共享 Cookie。
 *   A 网页的网址是http://w1.example.com/a.html，B 网页的网址是http://w2.example.com/b.html
 *   document.domain = 'example.com';  // 两个网页都需要设置
 * 服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如.example.com
 *   Set-Cookie: key=value; domain=.example.com; path=/ // 二级域名和三级域名不用做任何设置，都可以读取这个 Cookie
 *
 * iframe 和多窗口通信
 * 每个iframe元素形成自己的窗口，即有自己的window对象。iframe窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM。
 * 比如，父窗口运行下面的命令，如果iframe窗口不是同源，就会报错。
 *   document.getElementById("myIFrame").contentWindow.document
 *   // Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
 *   window.parent.document.body // 子窗口获取主窗口的 DOM 也会报错
 *
 * 对于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题：
 *     片段识别符（fragment identifier）
 *     跨文档通信API（Cross-document messaging）
 *
 * 片段标识符（fragment identifier）指的是，URL 的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。
 *   父窗口可以把信息，写入子窗口的片段标识符。
 *       var src = originURL + '#' + data;
 *       document.getElementById('myIFrame').src = src; // ，父窗口把所要传递的信息，写入 iframe 窗口的片段标识符
 *   子窗口通过监听hashchange事件得到通知
 *       window.onhashchange = checkMessage;
 *       function checkMessage() { var message = window.location.hash; ... }
 *   子窗口也可以改变父窗口的片段标识符
 *       parent.location.href = target + '#' + hash;
 *
 * window.postMessage() 上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）
 *   var popup = window.open('http://bbb.com', 'title');  // 父窗口打开一个子窗口
 *   popup.postMessage('Hello World!', 'http://bbb.com');  // 父窗口向子窗口发消息
 *   postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为*，表示不限制域名，向所有窗口发送。
 *   window.opener.postMessage('Nice to see you', 'http://aaa.com'); // 子窗口向父窗口发消息
 * 父窗口和子窗口都可以通过message事件，监听对方的消息:
 *   window.addEventListener('message', function (e) {
 *       console.log(e.data);
 *   },false);
 *   //  event.source：发送消息的窗口
 *   //  event.origin: 消息发向的网址
 *   //  event.data: 消息内容
 *   //  event.source.postMessage('Nice to see you!', '*');
 *   //  event.origin属性可以过滤不是发给本窗口的消息  event.origin !== 'http://aaa.com'
 *
 * LocalStorage
 * 通过window.postMessage，读写其他窗口的 LocalStorage 也成为了可能
 *
 * AJAX
 * 同源政策规定，AJAX 请求只能发给同源的网址，否则就报错
 * 除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。
 *     JSONP
 *     WebSocket
 *     CORS
 *
 * JSONP
 * 服务器与客户端跨源通信的常用方法。最大特点就是简单易用，没有兼容性问题，老式浏览器全部支持，服务端改造非常小
 *   第一步，网页添加一个<script>元素，向服务器请求一个脚本，这不受同源政策限制，可以跨域请求。
 *       <script src="http://api.foo.com?callback=bar"></script>
 *       请求的脚本网址有一个callback参数（?callback=bar），用来告诉服务器，客户端的回调函数名称（bar）
 *   第二步，服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（bar({...})）
 *   第三步，客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是<script>标签请求的脚本内容。
 *       这时，客户端只要定义了bar()函数，就能在该函数体内，拿到服务器返回的 JSON 数据
 * 由于<script>元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。
 * 作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用JSON.parse的步骤
 *
 * WebSocket
 * WebSocket 是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
 * 下面是一个例子，浏览器发出的 WebSocket 请求的头信息:
 *    GET /chat HTTP/1.1
 *    Host: server.example.com
 *    Upgrade: websocket
 *    Connection: Upgrade
 *    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
 *    Sec-WebSocket-Protocol: chat, superchat
 *    Sec-WebSocket-Version: 13
 *    Origin: http://example.com  // Origin，表示该请求的请求源（origin），即发自哪个域名
 * 正是因为有了Origin这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。
 * 如果该域名在白名单内，服务器就会做出如下回应。
 *    HTTP/1.1 101 Switching Protocols
 *    Upgrade: websocket
 *    Connection: Upgrade
 *    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
 *    Sec-WebSocket-Protocol: chat
 *
 * CORS
 * CORS 是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发GET请求，CORS 允许任何类型的请求。
 * 整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与普通的 AJAX 通信没有差别，代码完全一样。
 *
 * CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。
 * 只要同时满足以下两大条件，就属于简单请求:
 *    (1) 请求方法是以下三种方法之一 : HEAD  GET  POST
 *    (2) HTTP 的头信息不超出以下几种字段:
 *        Accept
 *        Accept-Language
 *        Content-Language
 *        Last-Event-ID
 *        Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
 * 简单请求
 * 基本流程
 *    GET /cors HTTP/1.1
 *    Origin: http://api.bob.com // Origin字段用来说明，本次请求来自哪个域（协议 + 域名 + 端口）
 *    Host: api.alice.com
 *    Accept-Language: en-US
 *    Connection: keep-alive
 *    User-Agent: Mozilla/5.0...
 * 如果Origin指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。
 * 浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。
 * 注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是200。
 * 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
 *    Access-Control-Allow-Origin: http://api.bob.com  // 必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
 *    Access-Control-Allow-Credentials: true  // 可选,表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中
 *    Access-Control-Expose-Headers: FooBar
 *          // 可选,CORS 请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个服务器返回的基本字段：
 *          // Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma
 *          // 如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值
 *    Content-Type: text/html; charset=utf-8
 *
 * 某些场合，服务器可能需要拿到 Cookie，这时需要服务器显式指定Access-Control-Allow-Credentials字段，告诉浏览器可以发送 Cookie。
 * 同时，开发者必须在 AJAX 请求中打开withCredentials属性:
 *    var xhr = new XMLHttpRequest();
 *    xhr.withCredentials = true;
 * 如果服务器要求浏览器发送 Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。
 * 同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨域）原网页代码中的document.cookie也无法读取服务器域名下的 Cookie。
 *
 * 非简单请求
 * 非简单请求是那种对服务器提出特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json
 * 非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为“预检”请求（preflight）。
 *   var url = 'http://api.alice.com/cors';
 *   var xhr = new XMLHttpRequest();
 *   xhr.open('PUT', url, true);
 *   xhr.setRequestHeader('X-Custom-Header', 'value');
 *   xhr.send();
 * 浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。
 *    OPTIONS /cors HTTP/1.1  // 预检”请求用的请求方法是OPTIONS，表示这个请求是用来询问的
 *    Origin: http://api.bob.com
 *    Access-Control-Request-Method: PUT  // 必须的
 *    Access-Control-Request-Headers: X-Custom-Header // 一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段
 *    Host: api.alice.com
 *    Accept-Language: en-US
 *    Connection: keep-alive
 *    User-Agent: Mozilla/5.0...
 * 预检请求的回应:
 *    HTTP/1.1 200 OK
 *    Date: Mon, 01 Dec 2008 01:15:39 GMT
 *    Server: Apache/2.0.61 (Unix)
 *    Access-Control-Allow-Origin: http://api.bob.com // 表示http://api.bob.com可以请求数据。设为星号，表示同意任意跨源请求。
 *    Access-Control-Allow-Methods: GET, POST, PUT
 *    Access-Control-Allow-Headers: X-Custom-Header
 *    Content-Type: text/html; charset=utf-8
 *    Content-Encoding: gzip
 *    Content-Length: 0
 *    Keep-Alive: timeout=2, max=100
 *    Connection: Keep-Alive
 *    Content-Type: text/plain
 * 如果服务器否定了“预检”请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段，或者明确表示请求不符合条件
 *    OPTIONS http://api.bob.com HTTP/1.1
 *    Status: 200
 *    Access-Control-Allow-Origin: https://notyourdomain.com
 *    Access-Control-Allow-Method: POST
 * 浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获
 * “预检”请求之后，浏览器的正常 CORS 请求:
 *    PUT /cors HTTP/1.1
 *    Origin: http://api.bob.com
 *    Host: api.alice.com
 *    X-Custom-Header: value
 *    Accept-Language: en-US
 *    Connection: keep-alive
 *    User-Agent: Mozilla/5.0...
 * 服务器正常的回应:
 *    Access-Control-Allow-Origin: http://api.bob.com
 *    Content-Type: text/html; charset=utf-8
 */
// 子窗口通过event.source属性引用父窗口，然后发送消息
// window.addEventListener('message', receiveMessage);
// function receiveMessage(event) {
//     // 该信息可以向任意网址发送
//     event.source.postMessage('Nice to see you!', '*');
// }

// window.addEventListener('message', receiveMessage);
// function receiveMessage(event) {
//     if (event.origin !== 'http://aaa.com') return;
//     if (event.data === 'Hello World') {
//         event.source.postMessage('Hello', event.origin);
//     } else {
//         console.log(event.data);
//     }
// }

// 子窗口将父窗口发来的消息，写入自己的 LocalStorage
// window.onmessage = function (e) {
//     if (e.origin !== 'http://bbb.com') {
//         return;
//     }
//     var payload = JSON.parse(e.data);
//     localStorage.setItem(payload.key, JSON.stringify(payload.data));
// };

// 父窗口发送消息
// var win = document.getElementsByTagName('iframe')[0].contentWindow;
// var obj = { name: 'Jack' };
// win.postMessage(
//     JSON.stringify({ key: 'storage', data: obj }),
//     'http://bbb.com'
// );

// 加强版的子窗口接收消息
// window.onmessage = function (e) {
//     if (e.origin !== 'http://bbb.com') return;
//     var payload = JSON.parse(e.data);
//     switch (payload.method) {
//         case 'set':
//             localStorage.setItem(payload.key, JSON.stringify(payload.data));
//             break;
//         case 'get':
//             var parent = window.parent;
//             var data = localStorage.getItem(payload.key);
//             parent.postMessage(data, 'http://aaa.com');
//             break;
//         case 'remove':
//             localStorage.removeItem(payload.key);
//             break;
//     }
// };

// 加强版的父窗口发送消息
// var win = document.getElementsByTagName('iframe')[0].contentWindow;
// var obj = { name: 'Jack' };
// // 存入对象
// win.postMessage(
//     JSON.stringify({ key: 'storage', method: 'set', data: obj }),
//     'http://bbb.com'
// );
// // 读取对象
// win.postMessage(
//     JSON.stringify({ key: 'storage', method: "get" }),
//     "*"
// );
// window.onmessage = function (e) {
//     if (e.origin != 'http://aaa.com') return;
//     console.log(JSON.parse(e.data).name);
// };

// 网页动态插入<script>元素，由它向跨域网址发出请求
// function addScriptTag(src) {
//     var script = document.createElement('script');
//     script.setAttribute('type', 'text/javascript');
//     script.src = src;
//     document.body.appendChild(script);
// }
// window.onload = function () {
//     addScriptTag('http://example.com/ip?callback=foo');
// }
// function foo(data) {
//     console.log('Your public IP address is: ' + data.ip);
// };

// 服务器收到这个请求以后，会将数据放在回调函数的参数位置返回
// foo({
//     'ip': '8.8.8.8'
// });

/**
 * Storage 接口
 * 用于脚本在浏览器保存数据。两个对象部署了这个接口：window.sessionStorage和window.localStorage。
 *   sessionStorage保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空
 *   localStorage保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的其他方面都一致。
 *
 * 属性和方法:
 *   Storage.length：返回保存的数据项个数
 *       window.localStorage.setItem('foo', 'a');
 *       window.localStorage.setItem('bar', 'b');
 *       window.localStorage.setItem('baz', 'c');
 *       window.localStorage.length // 3
 *   Storage.setItem() // 用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。
 *       两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。
 *   Storage.getItem() 方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回null。
 *   Storage.removeItem() 方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。
 *   Storage.clear() 方法用于清除所有保存的数据。该方法的返回值是undefined。
 *   Storage.key() 接受一个整数作为参数（从零开始），返回该位置对应的键值。
 *       window.sessionStorage.setItem('key', 'value');
 *       window.sessionStorage.key(0) // "key"
 *       // 遍历所有的键
 *       for (var i = 0; i < window.localStorage.length; i++) {
 *        console.log(localStorage.key(i));
 *       }
 *
 * storage 事件
 * window.addEventListener('storage', onStorageChange);
 * 监听函数接受一个event实例对象作为参数。这个实例对象继承了 StorageEvent 接口，有几个特有的属性，都是只读属性:
 *   StorageEvent.key：字符串，表示发生变动的键名。如果 storage 事件是由clear()方法引起，该属性返回null。
 *   StorageEvent.newValue：字符串，表示新的键值。如果 storage 事件是由clear()方法或删除该键值对引发的，该属性返回null。
 *   StorageEvent.oldValue：字符串，表示旧的键值。如果该键值对是新增的，该属性返回null。
 *   StorageEvent.storageArea：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。
 *   StorageEvent.url：字符串，表示原始触发 storage 事件的那个网页的网址
 */

/**
 * History 对象
 * window.history属性指向 History 对象，它表示当前窗口的浏览历史
 * History 对象保存了当前窗口访问过的所有页面网址
 *    window.history.length // 3,表示当前窗口一共访问过3个网址。
 *    history.back() // 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航
 *    history.go(-1) // 后退到前一个网址
 * 
 * 属性:
 * History.length：当前窗口访问过的网址数量（包括当前网页）
 * History.state：History 堆栈最上层的状态值,通常是 undefined，即未设置
 * 
 * 方法:
 * History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
 * History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
 * History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()
 *    history.go(0); // 刷新当前页面
 * window.history.pushState(state, title, url)
 *    state：一个与添加的记录相关联的状态对象，主要用于popstate事件。
 *       该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填null。
 *    title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串
 *    url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址
 * 
 *    假定当前网址是example.com/1.html，使用pushState()方法在浏览记录（History 对象）中添加一个新记录
 *        var stateObj = { foo: 'bar' };
 *        history.pushState(stateObj, 'page 2', '2.html');
 *        添加新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。
 *        这时，在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，页面的 URL 将显示2.html；你再点击一次倒退按钮，URL 将显示1.html。
 *    总之，pushState()方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应
 *    使用该方法之后，就可以用History.state属性读出状态对象
 *        history.state // {foo: "bar"}
 *    如果pushState的 URL 参数设置了一个新的锚点值（即hash），并不会触发hashchange事件。反过来，如果 URL 的锚点值变了，则会在 History 对象创建一条浏览记录。
 *    如果pushState()方法设置了一个跨域网址，则会报错
 *        history.pushState(null, '', 'https://twitter.com/hello');
 * History.replaceState() 方法用来修改 History 对象的当前记录，其他都与pushState()方法一模一样。
 * 
 * popstate 事件
 * 每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件
 *   仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，
 *   或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发
 * 使用的时候，可以为popstate事件指定回调函数
 */
// 假定当前网页是example.com/example.html
// history.pushState({ page: 1 }, 'title 1', '?page=1') // URL 显示为 http://example.com/example.html?page=1
// history.pushState({ page: 2 }, 'title 2', '?page=2'); // URL 显示为 http://example.com/example.html?page=2
// history.replaceState({ page: 3 }, 'title 3', '?page=3'); // URL 显示为 http://example.com/example.html?page=3
// history.back() // URL 显示为 http://example.com/example.html?page=1
// history.back() // URL 显示为 http://example.com/example.html
// history.go(2) // URL 显示为 http://example.com/example.html?page=3

// window.onpopstate = function (event) {
//     console.log('location: ' + document.location);
//     console.log('state: ' + JSON.stringify(event.state));
// };
// // 或者
// window.addEventListener('popstate', function (event) {
//     console.log('location: ' + document.location);
//     console.log('state: ' + JSON.stringify(event.state));
// });

/**
 * Location 对象
 * 属性:
 * Location.href：整个 URL
 * Location.protocol：当前 URL 的协议，包括冒号（:）
 * Location.host：主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口
 * Location.hostname：主机名，不包括端口
 * Location.port：端口号
 * Location.pathname：URL 的路径部分，从根路径/开始
 * Location.search：查询字符串部分，从问号?开始
 * Location.hash：片段字符串部分，从#开始
 * Location.username：域名前面的用户名
 * Location.password：域名前面的密码
 * Location.origin：URL 的协议、主机名和端口
 * 
 * 方法:
 * Location.assign() 接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错
 * Location.replace() 接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错
 *     与assign方法的差异在于，replace会在浏览器的浏览历史History里面删除当前网址
 * Location.reload() 使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮
 *     它接受一个布尔值作为参数。如果参数为true，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即scrollTop === 0）
 *     如果参数是false或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。
 * Location.toString() 返回整个 URL 字符串，相当于读取Location.href属性
 * 
 * URL 的编码和解码
 * 网页的 URL 只能包含合法的字符。合法字符分成两类:
 *    URL 元字符：分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
 *    语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（'），圆括号（()）
 *    除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母
 * JavaScript 提供四个 URL 的编码/解码方法:
 *    encodeURI() 用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义
 *    encodeURIComponent() 用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。
 *    decodeURI() 用于整个 URL 的解码。它是encodeURI()方法的逆运算。它接受一个参数，就是转码后的 URL。
 *    decodeURIComponent() 用于URL 片段的解码。它是encodeURIComponent()方法的逆运算。它接受一个参数，就是转码后的 URL 片段
 * 
 * encodeURI('http://www.example.com/q=春节') // "http://www.example.com/q=%E6%98%A5%E8%8A%82"
 * encodeURIComponent('春节') // "%E6%98%A5%E8%8A%82"
 * encodeURIComponent('http://www.example.com/q=春节') // "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
 * decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82') // "http://www.example.com/q=春节"
 * decodeURIComponent('%E6%98%A5%E8%8A%82')  // "春节"
 * 
 * URL 对象
 * 浏览器的原生对象，可以用来构造、解析和编码 URL。一般情况下，通过window.URL可以拿到这个对象
 * <a>元素和<area>元素都部署了这个接口。这就是说，它们的 DOM 节点对象可以使用 URL 的实例属性和方法。
 * 
 * 构造函数 
 * URL对象本身是一个构造函数，可以生成 URL 实例
 *    var url = new URL('http://www.example.com/index.html');
 *    url.href  // "http://www.example.com/index.html"
 * 如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。
 *    var url1 = new URL('index.html', 'http://example.com');
 * 
 * 实例属性
 *    URL.href：返回整个 URL
 *    URL.protocol：返回协议，以冒号:结尾
 *    URL.hostname：返回域名
 *    URL.host：返回域名与端口，包含:号，默认的80和443端口会省略
 *    URL.port：返回端口
 *    URL.origin：返回协议、域名和端口  // 只读的，其他属性都可写
 *    URL.pathname：返回路径，以斜杠/开头
 *    URL.search：返回查询字符串，以问号?开头
 *    URL.searchParams：返回一个URLSearchParams实例，该属性是Location对象没有的
 *    URL.hash：返回片段识别符，以井号#开头
 *    URL.password：返回域名前面的密码
 *    URL.username：返回域名前面的用户名
 * 
 * 静态方法
 * URL.createObjectURL 方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了File对象或Blob对象的 URL
 *    每次使用URL.createObjectURL方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用URL.revokeObjectURL()方法释放这个实例
 * URL.revokeObjectURL 方法用来释放URL.createObjectURL方法生成的 URL 实例。它的参数就是URL.createObjectURL方法返回的 URL 字符串
 * 
 * URLSearchParams 对象
 * 用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。
 *    var params = new URLSearchParams({'foo': '你好'});
 *    params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
 *    浏览器向服务器发送表单数据时，可以直接使用URLSearchParams实例作为表单数据。
 * URLSearchParams.toString() 返回实例的字符串形式
 * URLSearchParams.append() 用来追加一个查询参数。它接受两个参数，第一个为键名，第二个为键值，没有返回值。
 * URLSearchParams.delete() 用来删除指定的查询参数。它接受键名作为参数
 * URLSearchParams.has() 返回一个布尔值，表示查询字符串是否包含指定的键名
 * URLSearchParams.set() 用来设置查询字符串的键值
 *    var params = new URLSearchParams('?foo=1');  params.set('foo', 2);
 *    var params = new URLSearchParams(location.search.slice(1)); params.set('version', 2.0);
 * URLSearchParams.get() 用来读取查询字符串里面的指定键
 * URLSearchParams.getAll() 返回一个数组，成员是指定键的所有键值。它接受键名作为参数。
 * URLSearchParams.sort() 对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列。
 * URLSearchParams.keys() 返回的是键名的遍历器
 * URLSearchParams.values() 返回的是键值的遍历器
 * URLSearchParams.entries() 返回的是键值对的遍历器
 */

// HTML 代码如下
// <div id="display"/>
// <input
//   type="file"
//   id="fileElem"
//   multiple
//   accept="image/*"
//   onchange="handleFiles(this.files)"
//  >

// var div = document.getElementById('display');
// function handleFiles(files) {
//     for (var i = 0; i < files.length; i++) {
//         var img = document.createElement('img');
//         img.src = window.URL.createObjectURL(files[i]);
//         div.appendChild(img);
//     }
// }
// blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1

// var div = document.getElementById('display');
// function handleFiles(files) {
//     for (var i = 0; i < files.length; i++) {
//         var img = document.createElement('img');
//         img.src = window.URL.createObjectURL(files[i]);
//         div.appendChild(img);
//         img.onload = function () {
//             window.URL.revokeObjectURL(this.src);
//         }
//     }
// }

// // 方法一：传入字符串
// var params = new URLSearchParams('?foo=1&bar=2');
// // 等同于
// var params = new URLSearchParams(document.location.search);

// // 方法二：传入数组
// var params = new URLSearchParams([['foo', 1], ['bar', 2]]);

// // 方法三：传入对象
// var params = new URLSearchParams({ 'foo': 1, 'bar': 2 });

// const params = new URLSearchParams({ foo: 1, bar: 2 });
// fetch('https://example.com/api', {
//     method: 'POST',
//     body: params
// }).then(...)

// var a = document.createElement('a');
// a.href = 'https://example.com?filter=api';
// a.searchParams.get('filter') // "api"

// append方法不会识别是否键名已经存在,会追加一个同名键。
// var params = new URLSearchParams({'foo': 1 , 'bar': 2});
// params.append('baz', 3);
// params.toString() // "foo=1&bar=2&baz=3"

/**
 * ArrayBuffer 对象
 * 表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达
 *     var buffer = new ArrayBuffer(8); // 实例对象buffer占用8个字节
 *     buffer.byteLength // 8,当前实例占用的内存长度（单位字节）
 *     var buf2 = buf1.slice(0); // 实例方法slice()，用来复制一部分内存
 * 
 * Blob 对象
 * 表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写
 * 它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。
 *     new Blob(array [, options])
 *     var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
 *     var myBlob = new Blob(htmlFragment, {type : 'text/html'});
 *        myBlob.size // 32
 *        myBlob.type // "text/html"
 *     var obj = { hello: 'world' };
 *     var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
 * Blob具有两个实例属性size和type，分别返回数据的大小和类型
 * Blob具有一个实例方法slice，用来拷贝原来的数据，返回的也是一个Blob实例
 *     myBlob.slice(start，end, contentType)    
 * 
 * 获取文件信息
 * 文件选择器<input type="file">用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的value属性，即文件必须是用户手动选取的，不能是脚本指定的。
 * 一旦用户选好了文件，脚本就可以读取这个文件。
 * 文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。
 * File 实例对象是一个特殊的 Blob 实例，增加了name和lastModifiedDate属性。
 * 
 * 下载文件
 * AJAX 请求时，如果指定responseType属性为blob，下载下来的就是一个 Blob 对象。
 * 
 * 生成 URL
 * 浏览器允许使用URL.createObjectURL()方法，针对 Blob 对象生成一个临时 URL，以便于某些 API 使用。
 * 这个 URL 以blob://开头，表明对应一个 Blob 对象，协议头后面是一个识别符，用来唯一对应内存里面的 Blob 对象。
 * 这一点与data://URL（URL 包含实际数据）和file://URL（本地文件系统里面的文件）都不一样。
 * 
 * 读取文件 
 * 取得 Blob 对象以后，可以通过FileReader对象，读取 Blob 对象的内容，即文件内容。
 * FileReader 对象提供四个方法，处理 Blob 对象。Blob 对象作为参数传入这些方法，然后以指定的格式返回。
 *     FileReader.readAsText()：返回文本，需要指定文本编码，默认为 UTF-8。
 *     FileReader.readAsArrayBuffer()：返回 ArrayBuffer 对象。
 *     FileReader.readAsDataURL()：返回 Data URL。
 *     FileReader.readAsBinaryString()：返回原始的二进制字符串
 * 
 * 
 */
// HTML 代码如下
// <input type="file" accept="image/*" multiple onchange="fileinfo(this.files)"/>
// function fileinfo(files) {
//     for (var i = 0; i < files.length; i++) {
//         var f = files[i];
//         console.log(
//             f.name, // 文件名，不含路径
//             f.size, // 文件大小，Blob 实例属性
//             f.type, // 文件类型，Blob 实例属性
//             f.lastModifiedDate // 文件的最后修改时间
//         );
//     }
// }

// xhr.response拿到的就是一个 Blob 对象
// function getBlob(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.onload = function () {
//         callback(xhr.response);
//     }
//     xhr.send(null);
// }

// 通过为拖放的图片文件生成一个 URL，产生它们的缩略图，从而使得用户可以预览选择的文件
// var droptarget = document.getElementById('droptarget');
// droptarget.ondrop = function (e) {
//     var files = e.dataTransfer.files;
//     for (var i = 0; i < files.length; i++) {
//         var type = files[i].type;
//         if (type.substring(0, 6) !== 'image/')
//             continue;
//         var img = document.createElement('img');
//         img.src = URL.createObjectURL(files[i]);
//         img.onload = function () {
//             this.width = 100;
//             document.body.appendChild(this);
//             URL.revokeObjectURL(this.src);
//         }
//     }
// }

// HTML 代码如下 用来读取文本文件
// <input type=’file' onchange='readfile(this.files[0])'></input>
// <pre id='output'></pre>
// function readfile(f) {
//     var reader = new FileReader();
//     reader.readAsText(f);
//     reader.onload = function () {
//         var text = reader.result;
//         var out = document.getElementById('output');
//         out.innerHTML = '';
//         out.appendChild(document.createTextNode(text));
//     }
//     reader.onerror = function (e) {
//         console.log('Error', e);
//     };
// }

// HTML 代码如下  用于读取二进制文件
// <input type="file" onchange="typefile(this.files[0])"></input>
// function typefile(file) {
//     // 文件开头的四个字节，生成一个 Blob 对象
//     var slice = file.slice(0, 4);
//     var reader = new FileReader();
//     // 读取这四个字节
//     reader.readAsArrayBuffer(slice);
//     reader.onload = function (e) {
//         var buffer = reader.result;
//         // 将这四个字节的内容，视作一个32位整数
//         var view = new DataView(buffer);
//         var magic = view.getUint32(0, false);
//         // 根据文件的前四个字节，判断它的类型
//         switch (magic) {
//             case 0x89504E47: file.verified_type = 'image/png'; break;
//             case 0x47494638: file.verified_type = 'image/gif'; break;
//             case 0x25504446: file.verified_type = 'application/pdf'; break;
//             case 0x504b0304: file.verified_type = 'application/zip'; break;
//         }
//         console.log(file.name, file.verified_type);
//     };
// }

/**
 * File 对象
 * 代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它
 * 最常见的使用场合是表单的文件上传控件（<input type="file">），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。
 *   new File(array, name [, options])
 * File()构造函数接受三个参数:
 *   array：一个数组，成员可以是二进制对象或字符串，表示文件的内容
 *   name：字符串，表示文件名或文件路径
 *   options：配置对象，设置实例的属性。该参数可选
 *      type：字符串，表示实例对象的 MIME 类型，默认值为空字符串
 *      lastModified：时间戳，表示上次修改的时间，默认为Date.now()。
 * 实例属性和实例方法:
 *   File.lastModified：最后修改时间
 *   File.name：文件名或文件路径
 *   File.size：文件大小（单位字节）
 *   File.type：文件的 MIME 类型
 */
// HTML 代码如下
// <input id="fileItem" type="file">
// var file = document.getElementById('fileItem').files[0];
// file instanceof File // true

// var file = new File(
//     ['foo'],
//     'foo.txt',
//     {
//         type: 'text/plain',
//     }
// );

/**
 * FileList 对象
 * 一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。
 *     文件控件节点（<input type="file">）的files属性，返回一个 FileList 实例。
 *     拖拉一组文件时，目标区的DataTransfer.files属性，返回一个 FileList 实例。
 */

/**
 * FileReader 对象
 * 用于读取 File 对象或 Blob 对象所包含的文件内容
 *    var reader = new FileReader();
 * FileReader 有以下的实例属性:
 *    FileReader.error：读取文件时产生的错误对象
 *    FileReader.readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，0表示尚未加载任何数据，1表示数据正在加载，2表示加载完成。
 *    FileReader.result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
 *    FileReader.onabort：abort事件（用户终止读取操作）的监听函数。
 *    FileReader.onerror：error事件（读取错误）的监听函数
 *    FileReader.onload：load事件（读取操作完成）的监听函数，通常在这个函数里面使用result属性，拿到文件内容。
 *    FileReader.onloadstart：loadstart事件（读取操作开始）的监听函数
 *    FileReader.onloadend：loadend事件（读取操作结束）的监听函数
 *    FileReader.onprogress：progress事件（读取操作进行中）的监听函数。
 * 
 * FileReader 有以下实例方法:
 *    FileReader.abort()：终止读取操作，readyState属性将变成2
 *    FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后result属性将返回一个 ArrayBuffer 实例。
 *    FileReader.readAsBinaryString()：读取完成后，result属性将返回原始的二进制字符串。
 *    FileReader.readAsDataURL()：读取完成后，result属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容
 *    FileReader.readAsText()：读取完成后，result属性将返回文件内容的文本字符串。   
 *        第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。
 */
// HTML 代码如下
// <input type="file" onchange="onChange(event)">
// function onChange(event) {
//     var file = event.target.files[0];
//     var reader = new FileReader();
//     reader.onload = function (event) {
//         console.log(event.target.result)
//     };
//     reader.readAsText(file);
// }

/* HTML 代码如下 用户选中图片文件以后，脚本会自动读取文件内容
  <input type="file" onchange="previewFile()">
  <img src="" height="200">
*/
// function previewFile() {
//     var preview = document.querySelector('img');
//     var file = document.querySelector('input[type=file]').files[0];
//     var reader = new FileReader();
//     reader.addEventListener('load', function () {
//         preview.src = reader.result;
//     }, false);
//     if (file) {
//         reader.readAsDataURL(file);
//     }
// }