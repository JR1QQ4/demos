/**
 * 属性本身是一个对象（Attr对象），但是实际上，这个对象极少使用。一般都是通过元素节点对象（HTMlElement对象）来操作属性
 *
 * Element.attributes 属性:返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上
 *     属性节点对象有name和value属性，对应该属性的属性名和属性值，等同于nodeName属性和nodeValue属性。
 *
 * 元素的标准属性
 * 有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个:
 *     for属性改为htmlFor
 *     class属性改为className
 * HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将字符串true转为布尔值，将onClick的值转为一个函数，将style属性的值转为一个CSSStyleDeclaration对象。因此，可以对这些属性赋予各种类型的值。
 *
 * 属性操作的标准方法:
 * getAttribute()  只返回字符串，不会返回其他类型的值
 * getAttributeNames()
 * setAttribute()
 * hasAttribute()
 * hasAttributes()
 * removeAttribute()
 *
 * dataset 属性: 一种解决方法是自定义属性。 data-*属性
 *     删除一个data-*属性，可以直接使用delete命令
 *     <div id="mydiv" data-foo="bar">
 *     var n = document.getElementById('mydiv');
 *     n.dataset.foo // bar
 *     delete document.getElementById('myDiv').dataset.foo;
 *     data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_)
 *     而且，属性名不应该使用A到Z的大写字母，比如不能有data-helloWorld这样的属性名，而要写成data-hello-world。
 *     转成dataset的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变.
 *     反过来，dataset的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，dataset.helloWorld会转成data-hello-world
 */
// 返回的都是属性节点对象，而不是属性值
// HTML 代码如下
// <body bgcolor="yellow" onload="">
// document.body.attributes[0]
// document.body.attributes.bgcolor
// document.body.attributes['ONLOAD']

// HTML代码为
// <div id="mydiv">
// var n = document.getElementById('mydiv');

// n.attributes[0].name // "id"
// n.attributes[0].nodeName // "id"

// n.attributes[0].value // "mydiv"
// n.attributes[0].nodeValue // "mydiv"

// 遍历一个元素节点的所有属性
// var para = document.getElementsByTagName('p')[0];
// var result = document.getElementById('result');
// if (para.hasAttributes()) {
//     var attrs = para.attributes;
//     var output = '';
//     for (var i = attrs.length - 1; i >= 0; i--) {
//         output += attrs[i].name + '->' + attrs[i].value;
//     }
//     result.textContent = output;
// } else {
//     result.textContent = 'No attributes to show';
// }

// var mydiv = document.getElementById('mydiv');
// // 遍历某个节点的所有属性
// mydiv.getAttributeNames().forEach(function (key) {
//     var value = mydiv.getAttribute(key);
//     console.log(key, value);
// })

/**
 * Text 节点和 DocumentFragment 节点
 *
 * 文本节点（Text）代表元素节点（Element）和属性节点（Attribute）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。
 * 通常我们使用父节点的firstChild、nextSibling等属性获取文本节点，或者使用Document节点的createTextNode方法创造一个文本节点
 * 浏览器原生提供一个Text构造函数。它返回一个文本节点实例。它的参数就是该文本节点的文本内容。
 *     var text1 = new Text();
 *     var text2 = new Text('This is a text node');
 * Text 节点的属性:
 *     data属性等同于nodeValue属性，用来设置或读取文本节点的内容
 *     wholeText 将当前文本节点与毗邻的文本节点，作为一个整体返回。大多数情况下，wholeText属性的返回值，与data属性和textContent属性相同。但是，某些特殊情况会有差异。
 *     length属性返回当前文本节点的文本长度
 *     nextElementSibling previousElementSibling
 * Text 节点的方法:
 *     appendData() 在Text节点尾部追加字符串
 *     deleteData()：删除Text节点内部的子字符串，第一个参数为子字符串开始位置，第二个参数为子字符串长度
 *     insertData()：在Text节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。
 *     replaceData()：用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串
 *     subStringData()：用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度
 *     remove() 移除当前Text节点
 *     splitText() 将Text节点一分为二，变成两个毗邻的Text节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。
 *
 * DocumentFragment 节点：代表一个文档的片段，本身就是一个完整的 DOM 树形结构
 *     它没有父节点，parentNode返回null，但是可以插入任意数量的子节点。它不属于当前文档，操作DocumentFragment节点，要比直接操作 DOM 树快得多。
 *     它一般用于构建一个 DOM 结构，然后插入当前文档。document.createDocumentFragment方法，以及浏览器原生的DocumentFragment构造函数，可以创建一个空的DocumentFragment节点。然后再使用其他 DOM 方法，向其添加子节点。
 * DocumentFragment节点对象没有自己的属性和方法，全部继承自Node节点和ParentNode接口。DocumentFragment节点比Node节点多出以下四个属性。     
 *     children：返回一个动态的HTMLCollection集合对象，包括当前DocumentFragment对象的所有子元素节点。
 *     firstElementChild：返回当前DocumentFragment对象的第一个子元素节点，如果没有则返回null。
 *     lastElementChild：返回当前DocumentFragment对象的最后一个子元素节点，如果没有则返回null。
 *     childElementCount：返回当前DocumentFragment对象的所有子元素数量。
 */
// 获取文本节点
// var textNode = document.querySelector('p').firstChild;

// 创造文本节点
// var textNode = document.createTextNode('Hi');
// document.querySelector('div').appendChild(textNode);

// 读取文本内容
// document.querySelector('p').firstChild.data
// 等同于
// document.querySelector('p').firstChild.nodeValue

// 设置文本内容
// document.querySelector('p').firstChild.data = 'Hello World';

// HTML 代码为
// <p>Hello World</p>
// var pElementText = document.querySelector('p').firstChild;
// pElementText.appendData('!'); // 页面显示 Hello World!
// pElementText.deleteData(7, 5); // 页面显示 Hello W
// pElementText.insertData(7, 'Hello '); // 页面显示 Hello WHello
// pElementText.replaceData(7, 5, 'World'); // 页面显示 Hello WWorld
// pElementText.substringData(7, 10); // 页面显示不变，返回"World "

// html 代码为 <p id="p">foobar</p>
// var p = document.getElementById('p');
// var textnode = p.firstChild;
// var newText = textnode.splitText(3);
// newText // "bar"
// textnode // "foo"
// 父元素的normalize方法可以实现逆操作，将它们合并
// p.childNodes.length // 2
// 将毗邻的两个 Text 节点合并
// p.normalize();
// p.childNodes.length // 1

// var docFrag = document.createDocumentFragment();
// // 等同于
// var docFrag = new DocumentFragment();

// var li = document.createElement('li');
// li.textContent = 'Hello World';
// docFrag.appendChild(li);
// document.querySelector('ul').appendChild(docFrag);

// DocumentFragment节点本身不能被插入当前文档。当它作为appendChild()、insertBefore()、replaceChild()等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦DocumentFragment节点被添加进当前文档，它自身就变成了空节点（textContent属性为空字符串），可以被再次使用。如果想要保存DocumentFragment节点的内容，可以使用cloneNode方法。

// document
//     .querySelector('ul')
//     .appendChild(docFrag.cloneNode(true));

// 使用DocumentFragment反转一个指定节点的所有子节点的顺序
// function reverse(n) {
//     var f = document.createDocumentFragment();
//     while (n.lastChild) f.appendChild(n.lastChild);
//     n.appendChild(f);
// }