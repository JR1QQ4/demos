/**
 * HTML 元素的 style 属性:
 *     操作 CSS 样式最简单的方法，就是使用网页元素节点的getAttribute方法、setAttribute方法和removeAttribute方法，直接读写或删除网页元素的style属性。
 *
 * CSSStyleDeclaration 接口，用来操作元素的样式。三个地方部署了这个接口。
 *     元素节点的style属性（Element.style），返回的只是行内样式，并不是该元素的全部样式
 *     CSSStyle实例的style属性
 *     window.getComputedStyle()的返回值
 * CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。
 * 
 * CSSStyleDeclaration 实例属性：
 * CSSStyleDeclaration.cssText 用来读写当前规则的所有样式声明文本，属性值不用改写 CSS 属性名
 * CSSStyleDeclaration.length 返回一个整数值，表示当前规则包含多少条样式声明。
 * CSSStyleDeclaration.parentRule 返回当前规则所属的那个样式块（CSSRule 实例）。如果不存在所属的样式块，该属性返回null。
 * 
 * CSSStyleDeclaration 实例方法:
 * CSSStyleDeclaration.getPropertyPriority() 接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置important优先级。如果有就返回important，否则返回空字符串。
 * CSSStyleDeclaration.getPropertyValue() 接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。
 * CSSStyleDeclaration.item() 接受一个整数值作为参数，返回该位置的 CSS 属性名。
 * CSSStyleDeclaration.removeProperty() 接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值
 * CSSStyleDeclaration.setProperty() 用来设置新的 CSS 属性。该方法没有返回值。
 *     可以接受三个参数:
 *     第一个参数：属性名，该参数是必需的
 *     第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
 *     第三个参数：优先级，该参数可选。如果设置，唯一的合法值是important，表示 CSS 规则里面的!important。
 * 
 * CSS 模块的侦测:
 * 一个比较普遍适用的方法是，判断元素的style对象的某个属性值是否为字符串。
 * 如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回undefined。
 * 
 * CSS 对象:
 * CSS.escape() 用于转义 CSS 选择器里面的特殊字符
 *     <div id="foo#bar"> 不能直接写成document.querySelector('#foo#bar')，只能写成document.querySelector('#foo\\#bar')
 *     document.querySelector('#' + CSS.escape('foo#bar'))
 * CSS.supports() 返回一个布尔值，表示当前环境是否支持某一句 CSS 规则。
 *     参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；另一种是整个参数就是一行完整的 CSS 语句
 *     CSS.supports('transform-origin', '5px') // true
 *     第二种写法的参数结尾不能带有分号，否则结果不准确
 *     CSS.supports('display: table-cell') // true
 * 
 * window.getComputedStyle() : 用来返回浏览器计算后得到的最终规则
 *     可以接受第二个参数，表示当前元素的伪元素（比如:before、:after、:first-line、:first-letter等）。
 *     var result = window.getComputedStyle(div, ':before');
 * 
 * CSS 伪元素: 主要是通过:before和:after选择器生成，然后用content属性指定伪元素的内容
 * 
 * StyleSheet 接口:
 *     document对象的styleSheets属性，可以返回当前页面的所有StyleSheet实例（即所有样式表）。它是一个类似数组的对象
 *     如果是<style>元素嵌入的样式表，还有另一种获取StyleSheet实例的方法，就是这个节点元素的sheet属性。
 * 实例属性:
 *     StyleSheet.disabled 表示该样式表是否处于禁用状态.手动设置disabled属性为true，等同于在<link>元素里面，将这张样式表设为alternate stylesheet，即该样式表将不会生效。
 *     Stylesheet.href 返回样式表的网址。对于内嵌样式表，该属性返回null。该属性只读。
 *     StyleSheet.media 返回一个类似数组的对象（MediaList实例），成员是表示适用媒介的字符串。表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。该属性只读，默认值是screen。
 *         MediaList实例的appendMedium方法，用于增加媒介；deleteMedium方法用于删除媒介。
 *     StyleSheet.title 返回样式表的title属性。
 *     StyleSheet.type 返回样式表的type属性，通常是text/css
 *     StyleSheet.parentStyleSheet 返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回null。
 *         @import命令允许在样式表中加载其他样式表
 *     StyleSheet.ownerNode 返回StyleSheet对象所在的 DOM 节点，通常是<link>或<style>。对于那些由其他样式表引用的样式表，该属性为null。
 *     CSSStyleSheet.cssRules 指向一个类似数组的对象（CSSRuleList实例），里面每一个成员就是当前样式表的一条 CSS 规则。使用该规则的cssText属性，可以得到 CSS 规则对应的字符串
 *     CSSStyleSheet.ownerRule 返回一个CSSRule实例，代表那行@import规则。如果当前样式表不是通过@import引入的，ownerRule属性返回null。
 * 实例方法:
 *     CSSStyleSheet.insertRule() 用于在当前样式表的插入一个新的 CSS 规则
 *         可以接受两个参数，第一个参数是表示 CSS 规则的字符串，这里只能有一条规则，否则会报错。第二个参数是该规则在样式表的插入位置（从0开始），该参数可选，默认为0（即默认插在样式表的头部）。注意，如果插入位置大于现有规则的数目，会报错。
 *     CSSStyleSheet.deleteRule() 用来在样式表里面移除一条规则，它的参数是该条规则在cssRules对象中的位置。该方法没有返回值。
 * 
 */
// var divStyle = document.querySelector('div').style;
// divStyle.backgroundColor = 'red';
// divStyle.border = '1px solid black';
// divStyle.width = '100px';
// divStyle.height = '100px';
// divStyle.fontSize = '10em';
// // 改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写。
// // 如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串css，比如float写成cssFloat。
// divStyle.backgroundColor // red
// divStyle.border // 1px solid black
// divStyle.height // 100px
// divStyle.width // 100px

// var divStyle = document.querySelector('div').style;
// divStyle.cssText = 'background-color: red;'
//     + 'border: 1px solid black;'
//     + 'height: 100px;'
//     + 'width: 100px;';
// 删除一个元素的所有行内样式，最简便的方法就是设置cssText为空字符串
// divStyle.cssText = '';

// var declaration = document.styleSheets[0].rules[0].style;
// console.log(declaration.parentRule === document.styleSheets[0].rules[0]); // true

// HTML 代码为
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
// var style = document.getElementById('myDiv').style;
// style.margin // "10px"
// style.getPropertyPriority('margin') // "important"
// style.getPropertyPriority('color') // "

// HTML 代码为
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
// var style = document.getElementById('myDiv').style;
// style.margin // "10px"
// style.getPropertyValue("margin") // "10px"

// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;">
//   111
// </div>
// var style = document.getElementById('myDiv').style;
// style.removeProperty('color') // 'red'
// HTML 代码变为
// <div id="myDiv" style="background-color: white;">

// typeof element.style.animationName === 'string';
// typeof element.style.transform === 'string';
// document.body.style['maxWidth'] // ""
// document.body.style['maximumWidth'] // undefined

// window.onload = function () {
//     function isPropertySupported(property) {
//         if (property in document.body.style) return true;
//         var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
//         var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);
//         for (var i = 0; i < prefixes.length; i++) {
//             if ((prefixes[i] + prefProperty) in document.body.style) return true;
//         }
//         return false;
//     }
//     console.log(isPropertySupported('background-clip'));  // true
// }

// var elem = document.getElementById('elem-container');
// var styleObj = window.getComputedStyle(elem, null)
// var height = styleObj.height;
// // 等同于
// var height = styleObj['height'];
// var height = styleObj.getPropertyValue('height');

// var test = document.querySelector('#test');
// JavaScript 获取伪元素
// var result = window.getComputedStyle(test, ':before').content;
// var color = window.getComputedStyle(test, ':before').color;

// 也可以使用 CSSStyleDeclaration 实例的getPropertyValue方法，获取伪元素的属性
// var result = window.getComputedStyle(test, ':before')
//     .getPropertyValue('content');
// var color = window.getComputedStyle(test, ':before')
//     .getPropertyValue('color');

// HTML 代码为 <style id="myStyle"></style>
// var myStyleSheet = document.getElementById('myStyle').sheet;
// myStyleSheet instanceof StyleSheet // true

// var sheet = document.querySelector('#styleElement').sheet;
// sheet.cssRules[0].cssText  // "body { background-color: red; margin: 20px; }"
// sheet.cssRules[1].cssText  // "p { line-height: 1.4em; color: blue; }"

// var sheet = document.querySelector('#styleElement').sheet;
// sheet.insertRule('#block { color: white }', 0);
// sheet.insertRule('p { color: red }', 1);

// document.styleSheets[0].deleteRule(1);

// 添加样式表
// 写法一
// var style = document.createElement('style');
// style.setAttribute('media', 'screen');
// style.innerHTML = 'body{color:red}';
// document.head.appendChild(style);

// // 写法二
// var style = (function () {
//     var style = document.createElement('style');
//     document.head.appendChild(style);
//     return style;
// })();
// style.sheet.insertRule('.foo{color:red;}', 0);

/**
 * CSSRuleList 接口 一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例。
 * 每一条规则（CSSRule 实例）可以通过rules.item(index)或者rules[index]拿到。CSS 规则的条数通过rules.length拿到
 */
// HTML 代码如下
// <style id="myStyle">
//   h1 { color: red; }
//   p { color: blue; }
// </style>
// var myStyleSheet = document.getElementById('myStyle').sheet;
// var crl = myStyleSheet.cssRules;
// crl instanceof CSSRuleList // true

/**
 * CSSRule 接口: 一般通过 CSSRuleList 接口（StyleSheet.cssRules）获取 CSSRule 实例。
 * 一条 CSS 规则包括两个部分：CSS 选择器和样式声明
 * 
 * 实例的属性:
 *     CSSRule.cssText 返回当前规则的文本
 *     CSSRule.parentStyleSheet 返回当前规则所在的样式表对象（StyleSheet 实例)
 *     CSSRule.parentRule 返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回null。
 *     CSSRule.type 返回一个整数值，表示当前规则的类型
 *        最常见的类型有以下几种:
 *        1：普通样式规则（CSSStyleRule 实例）
 *        3：@import规则
 *        4：@media规则（CSSMediaRule 实例）
 *        5：@font-face规则
 * 
 * CSSStyleRule 接口:有以下两个属性。
 * CSSStyleRule.selectorText 返回当前规则的选择器
 * CSSStyleRule.style 返回一个对象（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。
 * 
 * CSSMediaRule 接口
 * 该接口主要提供media属性和conditionText属性。前者返回代表@media规则的一个对象（MediaList 实例），后者返回@media规则的生效条件。
 * 
 * window.matchMedia() 
 * 用来将 CSS 的MediaQuery条件语句，转换成一个 MediaQueryList 实例。
 * 实例属性:
 * MediaQueryList.media  返回一个字符串，表示对应的 MediaQuery 条件语句。
 * MediaQueryList.matches 返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句。
 * MediaQueryList.onchange 如果 MediaQuery 条件语句的适配环境发生变化，会触发change事件
 * 实例方法:
 * 有两个方法MediaQueryList.addListener()和MediaQueryList.removeListener()，用来为change事件添加或撤销监听函数。
 */
// var mdl = window.matchMedia('(min-width: 400px)');
// mdl instanceof MediaQueryList // true
// window.matchMedia('bad string') instanceof MediaQueryList // true

// if (window.matchMedia('(min-width: 400px)').matches) {
//     /* 当前视口不小于 400 像素 */
// } else {
//     /* 当前视口小于 400 像素 */
// }

// 根据mediaQuery是否匹配当前环境，加载相应的 CSS 样式表
// var result = window.matchMedia("(max-width: 700px)");
// if (result.matches) {
//     var linkElm = document.createElement('link');
//     linkElm.setAttribute('rel', 'stylesheet');
//     linkElm.setAttribute('type', 'text/css');
//     linkElm.setAttribute('href', 'small.css');
//     document.head.appendChild(linkElm);
// }

// var mql = window.matchMedia('(max-width: 600px)');
// mql.onchange = function (e) {
//     if (e.matches) {
//         /* 视口不超过 600 像素 */
//     } else {
//         /* 视口超过 600 像素 */
//     }
// }

// var mql = window.matchMedia('(max-width: 600px)');
// // 指定监听函数
// mql.addListener(mqCallback);
// // 撤销监听函数
// mql.removeListener(mqCallback);
// function mqCallback(e) {
//     if (e.matches) {
//         /* 视口不超过 600 像素 */
//     } else {
//         /* 视口超过 600 像素 */
//     }
// }

