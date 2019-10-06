/**
 * JavaScript是什么？
 * 是一门脚本语言
 * 是一门解释性语言
 * 是一门动态类型的语言
 * 是一门基于对象的语言
 */
// top:
// for (var i = 0; i < 3; i++) {
//     for (var j = 0; j < 3; j++) {
//         if (i === 1 && j === 1) break top;
//         console.log('i=' + i + '; j=' + j);
//     }
// }
/**
 * ES5 中的数据类型：Number String Boolean Null Undefined Object
 * Object 可以分成三个子类型：Object Array Function
 * 检查值是什么类型： typeof instanceof Object.prototype.toString
 */
// if (typeof v === "undefined") {
//     console.log('v is undefined');
// }
// console.log(Number(null));  // 0
// console.log(Number(undefined));  // NaN
// console.log(5 + null);  // 5
// console.log(5 + undefined);  // NaN

/**
 * 转换成布尔值为 false 的有6个： undefined null false 0 NaN ""或''(空字符串)
 */
// console.log(Boolean(undefined) + Boolean(null) + Boolean(NaN) + Boolean(0) + Boolean(false) + Boolean('')); // 0
/**
 * 浮点数精度最多只能到53个二进制位,-253到253，都可以精确表示,超过就丢失精度
 */
// console.log(Math.pow(2, 53));  // 9007199254740992
// console.log(Math.pow(2, 53) + 1);  // 9007199254740992
// console.log(Math.pow(2, 53) + 2);  // 9007199254740994
// console.log(Math.pow(2, 53) + 3);  // 9007199254740996
// console.log(Math.pow(2, 1023));  // 8.98846567431158e+307
// console.log(Math.pow(2, 1024));  // Infinity
// console.log(Math.pow(2, -1075));  // 0
// console.log(Math.pow(2, -1074));  // 5e-324
// console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
// console.log(Number.MIN_VALUE);  // 5e-324

// console.log(1 / 0);  // Infinity
// console.log(0 / 0);  // NaN
// console.log(NaN === NaN);  // false
// console.log([NaN].indexOf(NaN));  // -1

// console.log(0 * Infinity); // NaN
// console.log(0 / Infinity); // 0
// console.log(Infinity / 0); // Infinity
// console.log(Infinity - Infinity); // NaN
// console.log(Infinity / Infinity); // NaN
// console.log(null / Infinity); // 0
// console.log(Infinity / null); // Infinity
// console.log(undefined / Infinity); // NaN

// console.log(parseInt('1546', 2));  // 1

// console.log(parseFloat('0.0314E+2'));  // 3.14
// console.log(parseFloat(true));   // NaN
// console.log(Number(true));  // 1
// console.log(parseFloat(null));  // NaN
// console.log(Number(null));  // 0
// console.log(parseFloat(''));  // NaN
// console.log(Number(''));  // 0
// console.log(parseFloat('123.45#'));  // 123.45
// console.log(Number('123.45#'));  // NaN

// console.log(isNaN('Hello'));  // true
// console.log(isNaN({}));  // true
// console.log(isNaN([]));  // false
// console.log(isNaN(['xzy']));  // true
// console.log(isNaN(['123']));  // false

// console.log('Hello \
// world!');

// var str = (function () { /*
// line 1
// line 2
// line 3
// */}).toString().split('\n').slice(1, -1).join(' ');
// console.log(str);  // line 1 line 2 line 3

/**
 * JavaScript 原生提供两个 Base64 相关的方法:
 * btoa()：任意值转为 Base64 编码
 * atob()：Base64 编码转为原来的值
 */
// var string = 'Hello World!';
// console.log(btoa(string));  // "SGVsbG8gV29ybGQh"
// console.log(atob('SGVsbG8gV29ybGQh'));  // "Hello World!"
// console.log(btoa('你好世界'));  // 报错，不支持非 ASCII 码
// 调用 encodeURIComponent 与 decodeURIComponent 可以实现转码
// function b64Encode(str) {
//     return btoa(encodeURIComponent(str));
// }

// function b64Decode(str) {
//     return decodeURIComponent(atob(str));
// }
// console.log(b64Encode('你好世界'));  // 'JUU0JUJEJUEwJUU1JUE1JUJEJUU0JUI4JTk2JUU3JTk1JThD'
// console.log(b64Decode('JUU0JUJEJUEwJUU1JUE1JUJEJUU0JUI4JTk2JUU3JTk1JThD'));  // '你好世界'


/**
 * 函数
 */
// var print = function x() {
//     console.log(typeof x);
// };
// console.log(x);  //  x is not defined
// print();  // function
// var f = function f() { };  // 这样定义有利于排错

/**
 * Function 只有最后一个参数会被当做函数体
 */
// var add = new Function(
//     'x',
//     'y',
//     'return x + y'
// );
// console.log(add(2, 3));

// function fib(num) {
//     if (num === 0) return 0;
//     if (num === 1) return 1;
//     return fib(num - 2) + fib(num - 1);
// }
// console.log(fib(6));  // 8

// var f = function ff(a, b) {
//     console.log('1');
// }
// function f() {
//     console.log('2');
// }
// console.log(f()); // 1
// console.log(f.name);  // 'ff'
// console.log(f.length);  // 2

// 原生函数，返回 function sqrt() { [native code] }
// console.log(Math.sqrt.toString());

// x 声明在函数 y 外部，作用域绑定外层，因此找不到函数y的内部变量a
// var x = function () {
//     console.log(a);
// };
// function y(f) {
//     var a = 2;
//     f();
// }
// y(x)  // a is not defined

// 闭包，函数foo内部声明了一个函数bar，bar的作用域绑定foo
// function foo() {
//     var x = 1;
//     function bar() {
//         console.log(x);
//     }
//     return bar;
// }
// var x = 2;
// var f = foo();
// f() // 1

// 函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递
// 函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递
// var obj = { p: 1 };
// function f(o) {
//     o.p = 2;
// }
// f(obj);
// console.log(obj.p); // 2

// 如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值
// 形式参数（o）的值实际是参数obj的地址，重新对o赋值导致o指向另一个地址，保存在原地址上的值不受影响
// var obj = [1, 2, 3];
// function f(o) {
//   o = [2, 3, 4];
// }
// f(obj);
// console.log(obj);  // [1, 2, 3]

// 正常模式下，arguments对象可以在运行时修改
// var f = function (a, b) {
//     arguments[0] = 3;
//     arguments[1] = 2;
//     return a + b;
// }
// console.log(f(1, 1));  // 5
// 严格模式下，arguments对象与函数参数不具有联动关系
// var f = function (a, b) {
//     'use strict'; // 开启严格模式
//     arguments[0] = 3;
//     arguments[1] = 2;
//     return a + b;
// }
// console.log(f(1, 1)); // 2

// 闭包inc使得函数createIncrementor的内部环境，一直存在。所以，闭包可以看作是函数内部作用域的一个接口。
// inc始终在内存中，而inc的存在依赖于createIncrementor，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收。
// function createIncrementor(start) {
//     return function () {
//         return start++;
//     };
// }
// var inc = createIncrementor(5);
// console.log(inc());  // 5
// console.log(inc());  // 6
// console.log(inc());  // 7
// 闭包的另一个用处，是封装对象的私有属性和私有方法。
// 外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。
// function Person(name) {
//     var _age;
//     function setAge(n) {
//         _age = n;
//     }
//     function getAge() {
//         return _age;
//     }
//     return {
//         name: name,
//         getAge: getAge,
//         setAge: setAge
//     };
// }
// var p1 = Person('张三');
// p1.setAge(25);
// console.dir(p1);
// console.log(p1.getAge());  // 25

// eval
// eval('var a = 1;');
// console.log(a); // 1

/**
 * 数组的本质是一种特殊对象
 */
// console.log(typeof [1, 2, 3]);  // object

// Object.keys方法返回数组的所有键名,默认总是0、1、2...
// JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。
// var arr = ['a', 'b', 'c'];
// console.log(Object.keys(arr));  // ["0", "1", "2"]
// console.log(arr['0']);  // a
// console.log(arr[0]);  // a

// 数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值。
// var a = [];
// a['p'] = 'abc';
// console.log(a);  // [p: "abc"]
// console.log(a.length); // 0

// 检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
// var arr = [ 'a', 'b', 'c' ];
// console.log(2 in arr);  // true
// console.log('2' in arr );  // true
// console.log(4 in arr );  // false

// 如果数组的某个位置是空位，in运算符返回false
// arr[100] = 'a';
// console.log(100 in arr); // true
// console.log(50 in arr); // false

// for...in循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。
// for...in不仅会遍历数组所有的数字键，还会遍历非数字键
// 不推荐使用for...in遍历数组。
// var a = [1, 2, 3];
// a.foo = true;
// console.log(a);  // [1, 2, 3, foo: true]
// for (var key in a) {
//   console.log(key);  // 0 1 2 foo
// }

// 使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性
// 在遍历的时候。空位会被跳过
// 如果某个位置是undefined，遍历的时候就不会被跳过。
// var a = [1, 2, 3];
// delete a[1];
// console.log(a); // [1, empty, 3]
// console.log(a[1]); // undefined
// console.log(a.length); // 3

// 数组的slice方法可以将“类似数组的对象”变成真正的数组
// function args() { return arguments }
// var arrayLike = args('a', 'b');
// console.log(arrayLike); // Arguments(2) ["a", "b", callee: ƒ, Symbol(Symbol.iterator): ƒ]
// console.log(arrayLike[0]); // 'a'
// console.log(arrayLike.length); // 2
// console.log(arrayLike instanceof Array); // false
// var arr = Array.prototype.slice.call(arrayLike);
// console.log(arr);  //  ["a", "b"]
// console.log(arrayLike);  //  Arguments(2) ["a", "b", callee: ƒ, Symbol(Symbol.iterator): ƒ]
// Array.prototype.forEach.call 直接遍历“类似数组”会很慢
// var arr = Array.prototype.slice.call 可以先转换成真正的数组

// var obj = { p: 1 };
// console.log(obj + 2);  // [object Object]2
// console.log(obj.valueOf()); // { p: 1 }
// console.log(obj.valueOf().toString()); // [object Object]

// var obj = {
//     valueOf: function () {
//         return 1;
//     }
// };
// console.log(obj + 2); // 3
// var obj = {
//     toString: function () {
//         return 'hello';
//     }
// };
// console.log(obj + 2); // "hello2"

// 优先执行 valueOf
// var obj = {
//     toString: function () {
//         return 'hello';
//     },
//     valueOf: function () {
//         return 1;
//     }
// };
// console.log(obj + 2); // 3

// 如果运算子是一个Date对象的实例，那么会优先执行toString方法
// var obj = new Date();
// obj.valueOf = function () { return 1 };
// obj.toString = function () { return 'hello' };
// console.log(obj + 2); // "hello2"

// console.log(1 % -2);  // 1
// console.log(-1 % -2);  // -1
// console.log(6.5 % 2.1);  // 0.19999999999999973
// console.log(+true);  // 1
// console.log(+[]);  // 0
// console.log(+{});  // NaN
// console.log(2**3);  // 8

// 字符串按照字典顺序进行比较
// 任何值（包括NaN本身）与NaN比较，返回的都是false
// 如果两个运算子都是原始类型的值，则是先转成数值再比较
// console.log('cat' > 'dog');  // false
// console.log(NaN > NaN); // false
// console.log(true > false); // true
// 如果运算子是对象，会转为原始类型的值，再进行比较
// var x = [2];
// console.log(x > '11');  // true,等于 [2].valueOf().toString() > '11'
// console.log('2' > '11');  // true
// x.valueOf = function () { return '1' };
// console.log(x > '11');  // false

// console.log({ x: 2 } >= { x: 1 }); // true, 等同于 ({ x: 2 }).valueOf().toString() >= ({ x: 1 }).valueOf().toString()
// console.log('[object Object]' >= '[object Object]');  // true

// 复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址
// console.log({} == {});  // false
// console.log({} === {});  // false

// console.log(undefined === undefined);  // true
// console.log(null === null);  // true

// 原始类型的值会转换成数值再进行比较
// console.log(2 == true);  // false, 等同于 2 === Number(true)
// console.log('true' == true);  // false, 等同于 Number('true') == Number(true), NaN == 1

// 对象（这里指广义的对象，包括数组和函数）与原始类型的值比较时，对象转换成原始类型的值，再进行比较
// console.log([1] == 1);  // false, 等同于 Number([1]) == 1
// console.log([1, 2] == '1,2'); // true,等同于 String([1, 2]) == '1,2'
// console.log([1] == true); // true,等同于 Number([1]) == Number(true)
// console.log([1] == '1'); // true,等同于 String([1]) == '1'

// undefined和null与其他类型的值比较时，结果都为false，它们互相比较时结果为true
// console.log(false == null); // false
// console.log(false == undefined); // false
// console.log(0 == null);  // false
// console.log(undefined == null);  // true

// RGB to HEX
// (1 << 24)的作用为保证结果是6位数
// var color = {r: 186, g: 218, b: 85};
// var rgb2hex = function(r, g, b) {
//   return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
//     .toString(16) // 先转成十六进制，然后返回字符串
//     .substr(1);   // 去除字符串的最高位，返回后面六个字符串
// }
// console.log(rgb2hex(color.r, color.g, color.b));  // #bada55

// console.log(4 << 1);  // 4 * 2 = 8
// console.log(4 << 2);  // 4 * 2 * 2 = 16
// console.log(4 >> 1);  // 4 /2 = 2

// 
// console.log(void 0);  // undefined
// console.log(void(0));  // undefined
// var x = 3;
// console.log(void (x = 5)); //undefined
// console.log(x);  // 5

// function f() {
//     console.log('Hello World');
// }
// console.log(void(f()));  // undefined

// 阻止默认跳转
// <a href="javascript: void(f())">文字</a>
// <a href="javascript: void(document.form.submit())">提交但不跳转</a>

// Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组
// [5].valueOf().toString()
// obj.valueOf().toString(),如果toString返回的不是原始类型，就会报错
// obj.valueOf().toString() 一般会返回"[object Object]"
// valueOf 和 toString 都是可以自定义的
// var obj = {
//     valueOf: function () {
//         return {};
//     },
//     toString: function () {
//         return {};
//     }
// };
// console.log(Number(obj));  // Cannot convert object to primitive value

// String 和 Number 执行顺序不同，第一步转换就变为原始数据类型，就不会执行第二步
// Number： valueOf() -> toString()
// String： toString() -> valueOf()
// console.log(String({a: 1}));  // [object Object]

/**
 * Error实例对象的属性：
 * message：错误提示信息
 * name：错误名称（非标准属性）
 * stack：错误的堆栈（非标准属性）
 */
// var err = new Error('出错了');
// console.log(err.message);  // "出错了"
// console.dir(err);  // name: "Error"

/**
 * 原生错误类型：
 * SyntaxError 对象是解析代码时发生的语法错误
 * ReferenceError对象是引用一个不存在的变量时发生的错误
 * RangeError对象是一个值超出有效范围时发生的错误
 * TypeError对象是变量或参数不是预期类型时发生的错误
 * URIError对象是 URI 相关函数的参数不正确时抛出的错误
 * EvalError 对象eval函数没有被正确执行
 */
// var err1 = new Error('出错了！');
// var err2 = new RangeError('出错了，变量超出有效范围！');
// var err3 = new TypeError('出错了，变量类型无效！');
// console.log(err1.message); // "出错了！"
// console.log(err2.message); // "出错了，变量超出有效范围！"
// console.log(err3.message); // "出错了，变量类型无效！"

// 自定义错误
// function UserError(message) {
//     this.message = message || '默认信息';
//     this.name = 'UserError';
// }
// UserError.prototype = new Error();
// UserError.prototype.constructor = UserError;
// console.log(new UserError('这是自定义的错误！'));

// throw 可以抛出任何类型的值
// throw new UserError('出错了！');
// try {
//     throw new Error('出错了!');
// } catch (e) {
//     console.log(e.name + ": " + e.message);
//     console.log(e.stack);
//     if (e instanceof EvalError) {
//         console.log(e.name + ": " + e.message);
//     } else if (e instanceof RangeError) {
//         console.log(e.name + ": " + e.message);
//     }
// }

// openFile();
// try {
//   writeFile(Data);
// } catch(e) {
//   handleError(e);
// } finally {
//   closeFile();
// }

// function doAction(action) {
//     switch (action) {
//         case 'hack':
//             return 'hack';
//         case 'slash':
//             return 'slash';
//         case 'run':
//             return 'run';
//         default:
//             throw new Error('Invalid action.');
//     }
// }

// function doAction(action) {
//     var actions = {
//         'hack': function () {
//             return 'hack';
//         },
//         'slash': function () {
//             return 'slash';
//         },
//         'run': function () {
//             return 'run';
//         }
//     };
//     if (typeof actions[action] !== 'function') {
//         throw new Error('Invalid action.');
//     }
//     return actions[action]();
// }

// console.log('a', 'b', 'c'); // a b c
// console.log(' %s + %s = %s', 1, 1, 2);  //  1 + 1 = 2
// console.log(
//     '%cThis text is styled!',
//     'color: red; background: yellow; font-size: 24px;'
// )

// 自定义 console
// ['log', 'info', 'warn', 'error'].forEach(function (method) {
//     console[method] = console[method].bind(
//         console,
//         new Date().toISOString()
//     );
// });
// console.log("出错了！");  // 2019-08-30T20:11:39.860Z 出错了！

// var languages = [
//     { name: "JavaScript", fileExtension: ".js" },
//     { name: "TypeScript", fileExtension: ".ts" },
//     { name: "CoffeeScript", fileExtension: ".coffee" }
// ];
// console.table(languages);

// function greet(user) {
//     console.count(user);
//     console.count();
//     return 'hi ' + user;
// }
// greet('bob');  // bob: 1   default: 1
// greet('alice');  // alice: 1  default: 2
// greet('bob');  // bob: 2   default: 3

// var obj = {f1: 'foo', f2: 'bar'};
// console.dir(obj, {colors: true});
// console.dirxml(document.body);

// console.assert(false, '判断条件不成立');  // Assertion failed: 判断条件不成立
// console.assert(document.childNodes.length < 500, '节点个数大于等于500');  // 

// console.time('Array initialize');
// var array = new Array(1000000);
// for (var i = array.length - 1; i >= 0; i--) {
//     array[i] = new Object();
// };
// console.timeEnd('Array initialize');  // Array initialize: 418.838134765625ms

// console.group('一级分组');
// console.log('一级分组的内容');
// console.group('二级分组');
// console.log('二级分组的内容');
// console.groupEnd(); // 二级分组结束
// console.groupEnd(); // 一级分组结束

// console.trace();  // 显示当前执行的代码在堆栈中的调用路径

// console.clear();  // 清屏

/**
 * 在浏览器控制台使用的console对象
 * $_属性返回上一个表达式的值
 * $0 - $4： 控制台保存了最近5个在 Elements 面板选中的 DOM 元素
 * $(selector)返回第一个匹配的元素，等同于document.querySelector()
 * $$(selector)返回选中的 DOM 对象，等同于document.querySelectorAll
 * $x(path)方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素
 * $x("//p[a]")
 * inspect(object)方法打开相关面板，并选中相应的元素，显示它的细节
 * getEventListeners(object)方法返回一个对象，该对象的成员为object登记了回调函数的各种事件
 * keys(o) values(o)  包含object的所有键名 键值
 * monitorEvents(window, "resize");  监听特定对象上发生的特定事件
 * monitorEvents(object[, events]) ，unmonitorEvents(object[, events])
 */ 
// var o = { 'p1': 'a', 'p2': 'b' };

// Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面
// debugger