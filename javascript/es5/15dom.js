/**
 * DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。
 * 节点的类型有七种:
 *   Document：整个文档树的顶层节点
 *   DocumentType：doctype标签（比如<!DOCTYPE html>）
 *   Element：网页的各种HTML标签（比如<body>、<a>等）
 *   Attribute：网页元素的属性（比如class="right"）
 *   Text：标签之间或标签包含的文本
 *   Comment：注释
 *   DocumentFragment：文档的片段
 * 浏览器提供一个原生的节点对象Node，上面这七种节点都继承了Node，因此具有一些共同的属性和方法。
 */

// 节点树
// 文档的第一层有两个节点，第一个是文档类型节点（<!doctype html>），第二个是 HTML 网页的顶层容器标签<html> 树结构的根节点（root node）
// 除了根节点，其他节点都有三种层级关系:
//   父节点关系（parentNode）：直接的那个上级节点
//   子节点关系（childNodes）：直接的下级节点 firstChild lastChild
//   同级节点关系（sibling）：拥有同一个父节点的节点 nextSibling previousSibling

/**
 * 属性：
 * Node.prototype.nodeType
 * Node.prototype.nodeName
 * Node.prototype.nodeValue
 * Node.prototype.textContent 返回当前节点和它的所有后代节点的文本内容
 * Node.prototype.baseURI 表示当前网页的绝对路径
 * Node.prototype.ownerDocument 返回当前节点所在的顶层文档对象，即document对象
 * Node.prototype.nextSibling 返回紧跟在当前节点后面的第一个同级节点, 如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格
 * Node.prototype.previousSibling 返回当前节点前面的、距离最近的一个同级节点, 如果当前节点前面没有同级节点，则返回null
 * Node.prototype.parentNode 返回当前节点的父节点,父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）
 * Node.prototype.parentElement 返回当前节点的父元素节点 如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null
 * Node.prototype.firstChild 返回的除了元素节点，还可能是文本节点或注释节点
 * Node.prototype.lastChild
 * Node.prototype.childNodes 返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点
 * Node.prototype.isConnected 返回一个布尔值，表示当前节点是否在文档之中
 */
// 文档节点的类型值为 9
// console.log(document.nodeType); // 9
// 文档节点的nodeType属性等于常量Node.DOCUMENT_NODE
// console.log(document.nodeType === Node.DOCUMENT_NODE); // true

/**
 * nodeType属性值和对应的常量如下:
 * 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
 * 元素节点（element）：1，对应常量Node.ELEMENT_NODE
 * 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
 * 文本节点（text）：3，对应常量Node.TEXT_NODE
 * 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
 * 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
 * 注释节点（Comment）：8，对应常量Node.COMMENT_NODE
 */
// var node = document.documentElement.firstChild;
// if (node.nodeType === Node.ELEMENT_NODE) {
//     console.log('该节点是元素节点');
// }

/**
 * 不同节点的nodeName属性值如下:
 * 文档节点（document）：#document
 * 元素节点（element）：大写的标签名
 * 属性节点（attr）：属性的名称
 * 文本节点（text）：#text
 * 文档片断节点（DocumentFragment）：#document-fragment
 * 文档类型节点（DocumentType）：文档的类型
 * 注释节点（Comment）：#comment
 */

/**
 * nodeValue属性返回一个字符串，表示当前节点本身的文本值，该属性可读写
 * 只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。
 */
// // HTML 代码如下
// // <div id="d1">hello world</div>
// var div = document.getElementById('d1');
// div.nodeValue // null
// div.firstChild.nodeValue // "hello world"

/**
 * 文档节点（document）和文档类型节点（doctype）的textContent属性为null。
 * 如果要读取整个文档的内容，可以使用document.documentElement.textContent。
 */
// HTML 代码为
// 它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容。
// <div id="divA">This is <span>some</span> text</div>
// document.getElementById('divA').textContent // This is some text

// 当前网页的网址为
// http://www.example.com/index.html
// document.baseURI // "http://www.example.com/index.html"

// nextSibling属性可以用来遍历所有子节点
// var el = document.getElementById('div1').firstChild;
// while (el !== null) {
//     console.log(el.nodeName);
//     el = el.nextSibling;
// }

// 通过node.parentNode属性将node节点从文档里面移除
// 文档节点（document）和文档片段节点（documentfragment）的父节点都是null,对于那些生成后还没插入 DOM 树的节点，父节点也是null
// if (node.parentNode) {
//     node.parentNode.removeChild(node);
// }

// 文档节点（document）就有两个子节点：文档类型节点（docType）和 HTML 根元素节点
// var children = document.childNodes;
// for (var i = 0; i < children.length; i++) {
//   console.log(children[i].nodeType); // 10 1
// }

// window.onload = function () {
//     var test = document.createElement('p');
//     console.log(test.isConnected); // false

//     document.body.appendChild(test);
//     console.log(test.isConnected); // true
// }

/**
 * 方法：
 * Node.prototype.appendChild() 法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点
 * Node.prototype.hasChildNodes() 返回一个布尔值，表示当前节点是否有子节点
 * Node.prototype.cloneNode() 接受一个布尔值作为参数，表示是否同时克隆子节点
 * Node.prototype.insertBefore(newNode, referenceNode) 某个节点插入父节点内部的指定位置
 * Node.prototype.removeChild() 接受一个子节点作为参数，用于从当前节点移除该子节点。
 * Node.prototype.replaceChild(newChild, oldChild) 将一个新的节点，替换当前节点的某一个子节点
 * Node.prototype.contains()  返回一个布尔值
 * Node.prototype.compareDocumentPosition() 用法，与contains方法完全一致
 * Node.prototype.isEqualNode() 用于检查两个节点是否相等 类型相同、属性相同、子节点相同
 * Node.prototype.isSameNode() 表示两个节点是否为同一个节点
 * Node.prototype.normalize() 用于清理当前节点内部的所有文本节点（text）它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。
 * Node.prototype.getRootNode()  返回当前节点所在文档的根节点document，与ownerDocument属性的作用相同
 */

// 如果参数节点是 DOM 已经存在的节点，appendChild()方法会将其从原来的位置，移动到新位置
// 该节点会从原来的位置，移动到document.body的尾部
// var div = document.getElementById('myDiv');
// document.body.appendChild(div);

// 如果foo节点有子节点，就移除第一个子节点
// var foo = document.getElementById('foo');
// if (foo.hasChildNodes()) {
//   foo.removeChild(foo.childNodes[0]);
// } 

// 判断一个节点有没有子节点，有许多种方法，下面是其中的三种
// node.hasChildNodes()
// node.firstChild !== null
// node.childNodes && node.childNodes.length > 0

// 遍历当前节点的所有后代节点
// window.onload = function () {
//     function DOMComb(parent, callback) {
//         if (parent.hasChildNodes()) {
//             for (var node = parent.firstChild; node; node = node.nextSibling) {
//                 DOMComb(node, callback);
//             }
//         }
//         if (parent.nodeType == 1) {
//             callback(parent);
//         }
//     }
//     DOMComb(document.body, console.log)
// }

// cloneNode方法使用注意点:
// （1）克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on-属性（即node.onclick = fn），添加在这个节点上的事件回调函数。
// （2）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如Node.appendChild这样的方法添加到文档之中。
// （3）克隆一个节点之后，DOM 有可能出现两个有相同id属性（即id="xxx"）的网页元素，这时应该修改其中一个元素的id属性。如果原节点有name属性，可能也需要修改。
// var cloneUL = document.querySelector('ul').cloneNode(true);

// 如果insertBefore方法的第二个参数为null，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点
// var insertedNode = parentNode.insertBefore(newNode, referenceNode);

// 移除当前节点的所有子节点
// var element = document.getElementById('top');
// while (element.firstChild) {
//     element.removeChild(element.firstChild);
// }

// var divA = document.getElementById('divA');
// var newSpan = document.createElement('span');
// newSpan.textContent = 'Hello World!';
// divA.parentNode.replaceChild(newSpan, divA);

// contains方法返回一个布尔值，表示参数节点是否满足以下三个条件之一:
// 参数节点为当前节点。
// 参数节点为当前节点的子节点。
// 参数节点为当前节点的后代节点。

// 检查参数节点node，是否包含在当前文档之中,返回一个六个比特位的二进制值
// document.body.contains(node)

// var wrapper = document.createElement('div');
// wrapper.appendChild(document.createTextNode('Part 1 '));
// wrapper.appendChild(document.createTextNode('Part 2 '));
// wrapper.childNodes.length // 2
// wrapper.normalize();
// wrapper.childNodes.length // 1

// document.body.firstChild.getRootNode() === document // true
// document.body.firstChild.getRootNode() === document.body.firstChild.ownerDocument // true


/**
 * 节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：NodeList和HTMLCollection
 * NodeList可以包含各种类型的节点，HTMLCollection只能包含 HTML 元素节点
 */
// NodeList 接口
// NodeList实例是一个类似数组的对象，它的成员是节点对象
// 以下方法可以得到NodeList实例
//   Node.childNodes
//   document.querySelectorAll()等节点搜索方法

// document.body.childNodes instanceof NodeList // true

// 目前，只有Node.childNodes返回的是一个动态集合，其他的 NodeList 都是静态集合。
// var children = document.body.childNodes;
// children.length // 18
// document.body.appendChild(document.createElement('p'));
// children.length // 19

/**
 * NodeList.prototype.length
 * NodeList.prototype.forEach()  用法与数组实例的forEach方法完全一致
 * NodeList.prototype.item() 接受一个整数值作为参数，表示成员的位置，返回该位置上的成员
 * NodeList.prototype.keys() 返回键名的遍历器
 * NodeList.prototype.values() 返回键值的遍历器
 * NodeList.prototype.entries() 回的遍历器同时包含键名和键值的信息
 */
// var children = document.body.childNodes;
// for (var key of children.keys()) {
//     console.log(key);
// }
// for (var value of children.values()) {
//     console.log(value);
// }
// for (var entry of children.entries()) {
//     console.log(entry);
// }

// HTMLCollection 接口
// HTMLCollection是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点
// 它的返回值是一个类似数组的对象，但是与NodeList接口不同，HTMLCollection没有forEach方法，只能使用for循环遍历。
// 返回HTMLCollection实例的，主要是一些Document对象的集合属性，比如document.links、document.forms、document.images等。
// HTMLCollection实例都是动态集合，节点的变化会实时反映在集合中。

/**
 * HTMLCollection.prototype.length
 * HTMLCollection.prototype.item() 接受一个整数值作为参数，表示成员的位置，返回该位置上的成员
 * HTMLCollection.prototype.namedItem() 参数是一个字符串，表示id属性或name属性的值，返回对应的元素节点。如果没有对应的节点，则返回null
 */
// console.log(document.links instanceof HTMLCollection); // true

// HTML 代码如下
// <img id="pic" src="http://example.com/foo.jpg">
// var pic = document.getElementById('pic');
// console.log(document.images.namedItem('pic') === pic); // true


/**
 * ParentNode 接口:如果当前节点是父节点，就会继承ParentNode接口
 *   ParentNode.children 返回一个HTMLCollection实例，成员是当前节点的所有元素子节点
 *   ParentNode.firstElementChild
 *   ParentNode.lastElementChild
 *   ParentNode.childElementCount
 *   ParentNode.append() 为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面
 *   ParentNode.prepend() 为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面
 * ChildNode 接口
 *   ChildNode.remove() 从父节点移除当前节点
 *   ChildNode.before() 在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
 *   ChildNode.after() 不仅可以插入元素节点，还可以插入文本节点
 *   ChildNode.replaceWith() 使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。
 */

/**
 * Document 节点
 * document对象有不同的办法可以获取:
 *   正常的网页，直接使用document或window.document
 *   iframe框架里面的网页，使用iframe节点的contentDocument属性
 *   Ajax 操作返回的文档，使用XMLHttpRequest对象的responseXML属性
 *   内部节点的ownerDocument属性
 * document对象继承了EventTarget接口、Node接口、ParentNode接口
 */

/**
 * 属性:
 * 快捷方式属性:
 * （1）document.defaultView 返回document对象所属的window对象。如果当前文档不属于window对象，该属性返回null
 * （2）document.doctype 如果网页没有声明文档类型 DTD，该属性返回null
 * （3）document.documentElement 返回当前文档的根元素节点（root）。它通常是document节点的第二个子节点，紧跟在document.doctype节点后面。HTML网页的该属性，一般是<html>节点。
 * （4）document.body，document.head
 * （5）document.scrollingElement 返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。标准模式下，这个属性返回的文档的根元素document.documentElement（即<html>）。兼容（quirk）模式下，返回的是<body>元素，如果该元素不存在，返回null。
 * （6）document.activeElement 返回获得当前焦点（focus）的 DOM 元素
 * （7）document.fullscreenElement 返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null。
 *
 * 节点集合属性:返回一个HTMLCollection实例，表示文档内部特定元素的集合,都是动态的
 * （1）document.links 返回当前文档所有设定了href属性的<a>及<area>节点。
 * （2）document.forms 返回所有<form>表单节点
 * （3）document.images 返回页面所有<img>图片节点
 * （4）document.embeds，document.plugins 返回所有<embed>节点
 * （5）document.scripts 返回所有<script>节点
 * （6）document.styleSheets 返回文档内嵌或引入的样式表集合
 */
// if (document.fullscreenElement.nodeName == 'VIDEO') {
//     console.log('全屏播放视频');
// }

// var scripts = document.scripts;
// if (scripts.length !== 0) {
//     console.log('当前网页有脚本');
// }

// console.log(document.links instanceof HTMLCollection); // true
// console.log(document.images instanceof HTMLCollection); // true
// console.log(document.forms instanceof HTMLCollection); // true
// console.log(document.embeds instanceof HTMLCollection); // true
// console.log(document.scripts instanceof HTMLCollection); // true

/**
 * 文档静态信息属性:
 * （1）document.documentURI，document.URL 返回一个字符串，表示当前文档的网址
 * （2）document.domain 返回当前文档的域名，不包含协议和端口。
 * （3）document.location 浏览器提供的原生对象，提供 URL 相关的信息和操作方法
 * （4）document.lastModified 返回一个字符串，表示当前文档最后修改的时间
 * （5）document.title 返回当前文档的标题。默认情况下，返回<title>节点的值.但是该属性是可写的，一旦被修改，就返回修改后的值。
 * （6）document.characterSet 返回当前文档的编码，
 * （7）document.referrer 返回一个字符串，表示当前文档的访问者来自哪里。如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，document.referrer返回一个空字符串
 * （8）document.dir 返回一个字符串，表示文字方向。它只有两个可能的值：rtl表示文字从右到左，阿拉伯文是这种方式；ltr表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式
 * （9）document.compatMode 返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）
 */

/**
 * 文档状态属性:
 * （1）document.hidden 返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得document.hidden返回true
 * （2）document.visibilityState 返回文档的可见状态
 * （3）document.readyState 返回当前文档的状态，共有三种可能的值
 *     loading：加载 HTML 代码阶段
 *     interactive：加载外部资源阶段
 *     complete：加载完成
 */

// 检查网页是否加载成功
// // 基本检查
// if (document.readyState === 'complete') {
//     // ...
// }
// // 轮询检查
// var interval = setInterval(function () {
//     if (document.readyState === 'complete') {
//         clearInterval(interval);
//         // ...
//     }
// }, 100);


/**
 * document.cookie
 * document.designMode 属性控制当前文档是否可编辑。该属性只有两个值on和off，默认值为off。一旦设为on，用户就可以编辑整个文档的内容
 * document.implementation 返回一个DOMImplementation对象。该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象:
 *   DOMImplementation.createDocument()：创建一个 XML 文档。
 *   DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
 *   DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。
 */


/**
 * 方法:
 * document.open() document.close() 清除当前文档所有内容，使得文档处于可写状态，供document.write方法写入内容; 用来关闭document.open()打开的文档
 * document.write() document.writeln() 用于向当前文档写入内容; 除了会在输出内容的尾部添加换行符。
 * document.querySelector() document.querySelectorAll() 接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点
 *   它们不支持 CSS 伪元素的选择器（比如:first-line和:first-letter）和伪类的选择器（比如:link和:visited），即无法选中伪元素和伪类。
 * document.getElementsByTagName() 搜索 HTML 标签名，返回符合条件的元素
 * document.getElementsByClassName() 返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中
 * document.getElementsByName() 用于选择拥有name属性的 HTML 元素（比如<form>、<radio>、<img>、<frame>、<embed>和<object>等），返回一个类似数组的的对象（NodeList实例），因为name属性相同的元素可能不止一个
 * document.getElementById() 返回匹配指定id属性的元素节点。如果没有发现匹配的节点，则返回null
 *    document.getElementById()比document.querySelector()效率高得多; 这个方法只能在document对象上使用
 * document.elementFromPoint() document.elementsFromPoint() 返回位于页面指定位置最上层的元素节点
 * document.createElement() 用来生成元素节点，并返回该节点
 * document.createTextNode() 用来生成文本节点（Text实例），并返回该节点。它的参数是文本节点的内容
 * document.createAttribute() 生成一个新的属性节点（Attr实例），并返回它。
 * document.createComment() 生成一个新的注释节点，并返回该节点。
 * document.createDocumentFragment() 生成一个空的文档片段对象（DocumentFragment实例）
 * document.createEvent() 生成一个事件对象（Event实例），该对象可以被element.dispatchEvent方法使用，触发指定事件。
 * document.addEventListener() document.removeEventListener() document.dispatchEvent()
 * document.hasFocus() 返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点
 * document.adoptNode() document.importNode() 将某个节点及其子节点，从原来所在的文档或DocumentFragment里面移除，归属当前document对象，返回插入后的新节点
 * document.createNodeIterator() 返回一个子节点遍历器
 * document.createTreeWalker() 返回一个 DOM 的子树遍历器
 * document.execCommand() document.queryCommandSupported() document.queryCommandEnabled()
 * document.getSelection()
 */
// 如果页面已经解析完成（DOMContentLoaded事件发生之后），再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入
// 在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行document.close()），document.write写入的内容就会追加在已有内容的后面。
// document.open();
// document.write('hello world');
// document.close();

// 选中在(50, 50)这个坐标位置的最上层的那个 HTML 元素
// var element = document.elementFromPoint(50, 50);

// 添加事件监听函数
// document.addEventListener('click', listener, false);
// // 移除事件监听函数
// document.removeEventListener('click', listener, false);
// // 触发事件
// var event = new Event('click');
// document.dispatchEvent(event);

// document.adoptNode方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所以，还要再用appendChild方法或insertBefore方法，将新节点插入当前文档树。
// var node = document.adoptNode(externalNode);
// document.appendChild(node);
// document.importNode方法则是从原来所在的文档或DocumentFragment里面，拷贝某个节点及其子节点，让它们归属当前document对象。拷贝的节点对象的ownerDocument属性，会变成当前的document对象，而parentNode属性是null。
// var node = document.importNode(externalNode, deep);

// 遍历所有子节点
// var nodeIterator = document.createNodeIterator(document.body);
// var pars = [];
// var currentNode;
// while (currentNode = nodeIterator.nextNode()) {
//     pars.push(currentNode);
// }

// command：字符串，表示所要实施的样式。
// showDefaultUI：布尔值，表示是否要使用默认的用户界面，建议总是设为false。
// input：字符串，表示该样式的辅助内容，比如生成超级链接时，这个参数就是所要链接的网址。
// document.execCommand(command, showDefaultUI, input)