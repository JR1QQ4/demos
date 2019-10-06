/**
 * Element节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个Element节点对象（简称元素节点）
 * Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在
 * 元素节点不是一种对象，而是一组对象，这些对象除了继承Element的属性和方法，还有各自构造函数的属性和方法
 */

/**
 * 实例属性:
 * 
 * 元素特性的相关属性:
 * Element.id 返回指定元素的id属性，该属性可读写
 * Element.tagName 返回指定元素的大写标签名，与nodeName属性的值相等
 * Element.dir 用于读写当前元素的文字方向，可能是从左到右（"ltr"），也可能是从右到左（"rtl"）
 * Element.accessKey 属性用于读写分配给当前元素的快捷键
 * Element.draggable 返回一个布尔值，表示当前元素是否可拖动。该属性可读写。
 * Element.lang 返回当前元素的语言设置。该属性可读写
 * Element.tabIndex 返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
 * Element.title 用来读写当前元素的 HTML 属性title
 * 
 * 元素状态的相关属性:
 * Element.hidden属性返回一个布尔值，表示当前元素的hidden属性，用来控制当前元素是否可见。该属性可读写
 *    该属性与 CSS 设置是互相独立的。CSS 对这个元素可见性的设置，Element.hidden并不能反映出来。也就是说，这个属性并不能用来判断当前元素的实际可见性。
 * Element.contentEditable，Element.isContentEditable 可以设置contentEditable属性，使得元素的内容可以编辑
 * 
 * 其它：
 * Element.attributes 返回一个类似数组的对象，成员是当前元素节点的所有属性节点
 * Element.className 用来读写当前元素节点的class属性。它的值是一个字符串，每个class之间用空格分割
 * Element.classList 返回一个类似数组的对象，当前元素节点的每个class就是这个对象的一个成员
 *   classList对象有下列方法：
 *      add()：增加一个 class。
 *      remove()：移除一个 class。
 *      contains()：检查当前元素是否包含某个 class。
 *      toggle()：将某个 class 移入或移出当前元素。
 *      item()：返回指定索引位置的 class。
 *      toString()：将 class 的列表转为字符串。
 * Element.dataset 网页元素可以自定义data-属性，用来添加数据
 * Element.innerHTML 返回一个字符串，等同于该元素包含的所有 HTML 代码
 * Element.outerHTML 返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素
 * Element.clientHeight Element.clientWidth 返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回0。如果块级元素没有设置 CSS 高度，则返回实际高度
 *     除了元素本身的高度，它还包括padding部分，但是不包括border、margin
 *     如果有垂直滚动条，还要减去垂直滚动条的宽度
 *     document.documentElement的clientHeight属性，返回当前视口的高度（即浏览器窗口的高度），等同于window.innerHeight属性减去水平滚动条的高度（如果有的话）
 *     document.body的高度则是网页的实际高度。一般来说，document.body.clientHeight大于document.documentElement.clientHeight
 * Element.clientLeft，Element.clientTop  等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的padding和margin
 *     如果没有设置左边框，或者是行内元素（display: inline），该属性返回0。该属性总是返回整数值，如果是小数，会四舍五入
 * Element.scrollHeight Element.scrollWidth 返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分
 *     包括padding，但是不包括border、margin以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（::before或::after）的高度
 *     整张网页的总高度可以从document.documentElement或document.body上读取
 *     如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，scrollHeight属性仍然返回元素的总高度
 * Element.scrollLeft Element.scrollTop 表示当前元素的水平滚动条向右侧滚动的像素数量，垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于0。
 *     如果要查看整张网页的水平的和垂直的滚动距离，要从document.documentElement元素上读取
 * Element.offsetParent 返回最靠近当前元素的、并且 CSS 的position属性不等于static的上层元素
 * Element.offsetHeight Element.offsetWidth 返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）
 * Element.offsetLeft Element.offsetTop 返回当前元素左上角相对于Element.offsetParent节点的水平 垂直位移，通常，这两个值是指相对于父节点的位移。
 * Element.style 用来读写该元素的行内样式信息
 * Element.children Element.childElementCount 返回一个类似数组的对象（HTMLCollection实例），包括当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员。
 * Element.firstElementChild Element.lastElementChild 返回当前元素的第一个元素子节点,返回最后一个元素子节点
 * Element.nextElementSibling Element.previousElementSibling 返回当前元素节点的后一个同级元素节点，如果没有则返回null
 */

// 遍历p元素的所有属性
// var p = document.querySelector('p');
// var attrs = p.attributes;
// for (var i = attrs.length - 1; i >= 0; i--) {
//     console.log(attrs[i].name + '->' + attrs[i].value);
// }

// var div = document.getElementById('myDiv');
// div.classList.add('myCssClass');
// div.classList.add('foo', 'bar');
// div.classList.remove('myCssClass');
// div.classList.toggle('myCssClass'); // 如果 myCssClass 不存在就加入，否则移除
// div.classList.contains('myCssClass'); // 返回 true 或者 false
// div.classList.item(0); // 返回第一个 Class
// div.classList.toString();

// className和classList在添加和删除某个 class 时的写法
// var foo = document.getElementById('foo');

// 添加class
// foo.className += 'bold';
// foo.classList.add('bold');

// 删除class
// foo.classList.remove('bold');
// foo.className = foo.className.replace(/^bold$/, '');

// toggle方法可以接受一个布尔值，作为第二个参数。如果为true，则添加该属性；如果为false，则去除该属性。
// el.classList.toggle('abc', boolValue);
// // 等同于
// if (boolValue) {
//     el.classList.add('abc');
// } else {
//     el.classList.remove('abc');
// }

// <article
//   id="foo"
//   data-columns="3"
//   data-index-number="12314"
//   data-parent="cars">
//   ...
// </article>
// data-abc-def对应dataset.abcDef，data-abc-1对应dataset["abc-1"]
// var article = document.getElementById('foo');
// article.dataset.columns // "3"
// article.dataset.indexNumber // "12314"
// article.dataset.parent // "cars"

// 除了使用dataset读写data-属性，也可以使用Element.getAttribute()和Element.setAttribute()，通过完整的属性名读写这些属性
// var mydiv = document.getElementById('mydiv');
// mydiv.dataset.foo = 'bar';
// mydiv.getAttribute('data-foo') // "bar"

// HTML 代码如下
// <div id="d"><p>Hello</p></div>
// 如果一个节点没有父节点，设置outerHTML属性会报错
// var d = document.getElementById('d');
// d.outerHTML  // '<div id="d"><p>Hello</p></div>'

// span元素的offsetParent属性就是div元素。
{/* <div style="position: absolute;">
    <p>
        <span>Hello</span>
    </p>
</div> */}

// 如果该元素是不可见的（display属性为none），或者位置是固定的（position属性为fixed），则offsetParent属性返回null。
// span元素的offsetParent属性是null
{/* <div style="position: absolute;">
    <p>
        <span style="display: none;">Hello</span>
    </p>
</div> */}

// 元素左上角相对于整张网页的坐标
// function getElementPosition(e) {
//     var x = 0;
//     var y = 0;
//     while (e !== null) {
//         x += e.offsetLeft;
//         y += e.offsetTop;
//         e = e.offsetParent;
//     }
//     return { x: x, y: y };
// }

// 这个属性与Node.childNodes属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点
// 遍历了para元素的所有子元素
// if (para.children.length) {
//     var children = para.children;
//     for (var i = 0; i < children.length; i++) {
//         // ...
//     }
// }

// HTML 代码如下
// <div id="div-01">Here is div-01</div>
// <div id="div-02">Here is div-02</div>
// var el = document.getElementById('div-01');
// el.nextElementSibling  // <div id="div-02">Here is div-02</div>

/**
 * 实例方法
 *
 * 属性相关方法: 元素节点提供六个方法，用来操作属性
 * getAttribute()：读取某个属性的值
 * getAttributeNames()：返回当前元素的所有属性名
 * setAttribute()：写入属性值
 * hasAttribute()：某个属性是否存在
 * hasAttributes()：当前元素是否有属性
 * removeAttribute()：删除属性
 *
 * 其它：
 * Element.querySelector() 接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素。如果没有找到匹配的子元素，就返回null。
 * Element.querySelectorAll() 接受 CSS 选择器作为参数，返回一个NodeList实例，包含所有匹配的子元素
 * Element.getElementsByClassName() 返回一个HTMLCollection实例，成员是当前元素节点的所有具有指定 class 的子元素节点
 *     与document.getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点
 * Element.getElementsByTagName() 返回一个HTMLCollection实例，成员是当前节点的所有匹配指定标签名的子元素节点
 *     该方法与document.getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点
 * Element.closest() 接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）。如果没有任何节点匹配 CSS 选择器，则返回null。
 * Element.matches() 返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器
 * 
 * 事件相关方法: 都继承自EventTarget接口
 * Element.addEventListener()：添加事件的回调函数
 * Element.removeEventListener()：移除事件监听函数
 * Element.dispatchEvent()：触发事件
 * 
 * Element.scrollIntoView() 滚动当前元素，进入浏览器的可见区域，类似于设置window.location.hash的效果
 *     该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。
 * Element.getBoundingClientRect() 返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息
 *     getBoundingClientRect方法返回的rect对象，具有以下属性（全部为只读）:
 *     x：元素左上角相对于视口的横坐标
 *     y：元素左上角相对于视口的纵坐标
 *     height：元素高度
 *     width：元素宽度
 *     left：元素左上角相对于视口的横坐标，与x属性相等
 *     right：元素右边界相对于视口的横坐标（等于x + width）
 *     top：元素顶部相对于视口的纵坐标，与y属性相等
 *     bottom：元素底部相对于视口的纵坐标（等于y + height）
 *     由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将left属性加上window.scrollX，top属性加上window.scrollY
 *     width和height包括了元素本身 + padding + border
 * Element.getClientRects() 返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形
 *     每个矩形都有bottom、height、left、right、top和width六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。
 *     和Element.getBoundingClientRect()方法的主要区别，后者对于行内元素总是返回一个矩形
 *     这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移
 * Element.insertAdjacentElement() 在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回null
 *     element.insertAdjacentElement(position, element); 第二个参数是将要插入的节点,第一个参数只可以取如下的值:
 *     beforebegin：当前元素之前
 *     afterbegin：当前元素内部的第一个子节点前面
 *     beforeend：当前元素内部的最后一个子节点后面
 *     afterend：当前元素之后
 * Element.insertAdjacentHTML() Element.insertAdjacentText()  用于将一个 HTML 字符串，解析生成 DOM 结构，插入相对于当前节点的指定位置
 *     element.insertAdjacentHTML(position, text); 第一个是一个表示指定位置的字符串，第二个是待解析的 HTML 字符串
 *     beforebegin：当前元素之前
 *     afterbegin：当前元素内部的第一个子节点前面
 *     beforeend：当前元素内部的最后一个子节点后面
 *     afterend：当前元素之后
 * Element.remove() 继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除
 * Element.focus()，Element.blur() 用于将当前页面的焦点，转移到指定元素上;用于将焦点从当前元素移除
 * Element.click() 用于在当前元素上模拟一次鼠标点击，相当于触发了click事件。
 */
// Element.querySelector方法可以接受任何复杂的 CSS 选择器
// 注意，这个方法无法选中伪元素
// document.body.querySelector("style[type='text/css'], style:not([type])");

// 浏览器执行querySelector方法时，是先在全局范围内搜索给定的 CSS 选择器，然后过滤出哪些属于当前元素的子元素。因此，会有一些违反直觉的结果
{/* <div>
    <blockquote id="outer">
        <p>Hello</p>
        <div id="inner">
            <p>World</p>
        </div>
    </blockquote>
</div> */}
// 实际上返回的是第一个p元素，而不是第二个
// var outer = document.getElementById('outer');
// outer.querySelector('div p')

// HTML 代码如下
// <article>
//   <div id="div-01">Here is div-01
//     <div id="div-02">Here is div-02
//       <div id="div-03">Here is div-03</div>
//     </div>
//   </div>
// </article>
// var div03 = document.getElementById('div-03');
// // div-03 最近的祖先节点
// div03.closest("#div-02") // div-02
// div03.closest("div div") // div-03
// div03.closest("article > div") //div-01
// div03.closest(":not(div)") // article

// element.addEventListener('click', listener, false);
// element.removeEventListener('click', listener, false);
// var event = new Event('click');
// element.dispatchEvent(event);

// el.scrollIntoView(); // 等同于el.scrollIntoView(true)
// el.scrollIntoView(false);

// 这些属性，都是继承自原型的属性，Object.keys会返回一个空数组，这一点也需要注意
// var rect = obj.getBoundingClientRect();
// window.onload = function () {
//     var rect = document.body.getBoundingClientRect();
//     console.log(Object.keys(rect)); // []
//     console.dir(rect);
// }

{/* <span id="inline">Hello World Hello World Hello World</span> */ }
// 如果它在页面上占据三行，getClientRects方法返回的对象就有三个成员，如果它在页面上占据一行，getClientRects方法返回的对象就只有一个成员。
// var el = document.getElementById('inline');
// el.getClientRects().length // 3
// el.getClientRects()[0].left // 8
// el.getClientRects()[0].right // 113.908203125
// el.getClientRects()[0].bottom // 31.200000762939453
// el.getClientRects()[0].height // 23.200000762939453
// el.getClientRects()[0].width // 105.908203125

// HTML 代码：<div id="one">one</div>
// var d1 = document.getElementById('one');
// d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
// 执行后的 HTML 代码：
// <div id="one">one</div><div id="two">two</div>

// 参数对象的preventScroll属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域
// function getFocus() {
//     document.getElementById('btn').focus({ preventScroll: false });
// }