// function Cat(name, color) {
//     this.name = name;
//     this.color = color;
//     this.meow = function () {
//         console.log('喵喵');
//     };
// }
// var cat1 = new Cat('大毛', '白色');
// var cat2 = new Cat('二毛', '黑色');
// console.log(cat1.name); // '大毛'
// console.log(cat1.color); // '白色'
// // 每新建一个实例，就会新建一个meow方法
// console.log(cat1.meow === cat2.meow); // false

/**
 * prototype 属性的作用
 */
// function Animal(name) {
//     this.name = name;
// }
// Animal.prototype.color = 'white';
// var cat1 = new Animal('大毛');
// var cat2 = new Animal('二毛');
// console.log(cat1.color); // 'white'
// console.log(cat2.color); // 'white'
// Animal.prototype.color = 'yellow';
// console.log(cat1.color); // "yellow"
// console.log(cat2.color); // "yellow"
// cat1.color = 'black';
// console.log(cat1.color); // "black"
// console.log(cat2.color); // "yellow"

/**
 * 原型链
 * 一方面，任何一个对象，都可以充当其他对象的原型
 * 另一方面，由于原型对象也是对象，所以它也有自己的原型
 */
// var MyArray = function () {};
// MyArray.prototype = new Array();
// MyArray.prototype.constructor = MyArray;

// var mine = new MyArray();
// mine.push(1, 2, 3);
// console.log(mine); // [1, 2, 3]
// console.log(mine.length); // 3
// console.log(mine instanceof Array); // true

/**
 * constructor 属性
 */
// function P() {}
// var p = new P();

// console.log(p.constructor === P); // true
// console.log(p.constructor === P.prototype.constructor); // true
// console.log(p.hasOwnProperty('constructor')); // false
// console.dir(p);

// function Person(name) {
//     this.name = name;
// }
// Person.prototype.constructor === Person // true
// Person.prototype = {
//     method: function () { }
// };
// // 如果修改了原型对象，一般会同时修改constructor属性
// console.log(Person.prototype.constructor === Person );// false
// console.log(Person.prototype.constructor === Object); // true

// function C() { }
// // 坏的写法
// C.prototype = {
//     method1: function () { }
// };
// // 好的写法
// C.prototype = {
//     constructor: C,
//     method1: function () { },
// };
// // 更好的写法
// C.prototype.method1 = function () { };

/**
 * instanceof 运算符
 */
// var d = new Date();
// console.log(d instanceof Date); // true
// console.log(d instanceof Object); // true
// // 除了null和undefined，其他对象的instanceOf Object的运算结果都是true
// console.log(null instanceof Object); // false
// console.log(undefined instanceof Object); // false

// var obj = Object.create(null);
// console.log(typeof obj); // "object"
// console.log(obj instanceof Object); // false

// 在函数体内部判断this关键字是否为构造函数Fubar的实例。如果不是，就表明忘了加new命令
// function Fubar(foo, bar) {
//     if (this instanceof Fubar) {
//         this._foo = foo;
//         this._bar = bar;
//     } else {
//         return new Fubar(foo, bar);
//     }
// }

/**
 * 构造函数的继承
 * 第一步是在子类的构造函数中，调用父类的构造函数
 * 第二步，是让子类的原型指向父类的原型
 */
// function Sub(value) {
//     Super.call(this);
//     this.prop = value;
// }
// Sub.prototype = Object.create(Super.prototype);
// Sub.prototype.constructor = Sub;
// Sub.prototype.method = function () { };
// // 另一种写法，但是子类会具有父类实例的方法
// Sub.prototype = new Super();

/**
 * 多重继承
 */
// function M1() {
//     this.hello = 'hello';
// }
// function M2() {
//     this.world = 'world';
// }
// function S() {
//     M1.call(this);
//     M2.call(this);
// }
// // 继承 M1
// S.prototype = Object.create(M1.prototype);
// // 继承链上加入 M2
// Object.assign(S.prototype, M2.prototype);
// // 指定构造函数
// S.prototype.constructor = S;
// var s = new S();
// console.log(s.hello); // 'hello'
// console.log(s.world); // 'world'
// console.dir(s);
// console.log(s instanceof M2); // false
// console.log(s instanceof M1); // true

/**
 * 模块
 */
// 这样的写法会暴露所有模块成员，内部状态可以被外部改写
// var module1 = new Object({
//     _count: 0,
//     m1: function () {

//     },
//     m2: function () {

//     }
// });
// module1._count = 5;
// console.dir(module1);

// 封装私有变量：构造函数的写法
// 这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除
// function StringBuilder() {
//     var buffer = [];
//     this.add = function (str) {
//         buffer.push(str);
//     };
//     this.toString = function () {
//         return buffer.join('');
//     };
// }
// StringBuilder.buffer = 12;
// console.dir(StringBuilder);

// 这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全
// function StringBuilder() {
//     this._buffer = [];
// }
// StringBuilder.prototype = {
//     constructor: StringBuilder,
//     add: function (str) {
//         this._buffer.push(str);
//     },
//     toString: function () {
//         return this._buffer.join('');
//     }
// };
// StringBuilder._buffer = 12;
// console.dir(StringBuilder);

// 封装私有变量：立即执行函数的写法
// var module1 = (function () {
//     var _count = 0;
//     var m1 = function () {

//     };
//     var m2 = function () {

//     };
//     return {
//         m1: m1,
//         m2: m2
//     };
// })();
// console.dir(module1);
// console.info(module1._count); // //undefined

/**
 * 模块的放大模式
 * 如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“放大模式”（augmentation）
 */
// 为module1模块添加了一个新方法m3()，然后返回新的module1模块
// 第一个执行的部分有可能加载一个不存在空对象
// var module1 = (function (mod) {
//     mod.m3 = function () {
//...
//     };
//     return mod;
// })(module1);

// "宽放大模式", 立即执行函数”的参数可以是空对象
// var module2 = (function (mod) {
//     //...
//     return mod;
// })(window.module1 || {});

/**
 * 输入全局变量
 */
// module1模块需要使用 jQuery 库和 YUI 库，就把这两个库（其实是两个模块）当作参数输入module1
// var module1 = (function ($, YAHOO) {
//     //...
// })(jQuery, YAHOO);

// 立即执行函数还可以起到命名空间的作用
// finalCarousel对象输出到全局，对外暴露init和destroy接口，内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的。
// (function ($, window, document) {
//     function go(num) {
//     }
//     function handleEvents() {
//     }
//     function initialize() {
//     }
//     function dieCarouselDie() {
//     }
//     //attach to the global scope
//     window.finalCarousel = {
//         init: initialize,
//         destroy: dieCarouselDie
//     }
// })(jQuery, window, document);

/**
 * Object 对象的相关方法
 * Object.getPrototypeOf方法返回参数对象的原型
 * Object.setPrototypeOf方法为参数对象设置原型，返回该参数对象
 * Object.create() 该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象
 * Object.prototype.isPrototypeOf() 用来判断该对象是否为参数对象的原型
 * Object.getOwnPropertyNames() 返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名
 */
// var F = function () {};
// var f = new F();
// console.log(Object.getPrototypeOf(f) === F.prototype); // true

// 空对象的原型是 Object.prototype
// console.log(Object.getPrototypeOf({}) === Object.prototype); // true

// // Object.prototype 的原型是 null
// console.log(Object.getPrototypeOf(Object.prototype) === null); // true

// // 函数的原型是 Function.prototype
// function f() { }
// console.log(Object.getPrototypeOf(f) === Function.prototype); // true
// console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype); // true

// var a = {};
// var b = {x: 1};
// Object.setPrototypeOf(a, b);
// console.log(Object.getPrototypeOf(a) === b); // true
// console.log(a.x); // 1

// new命令可以使用Object.setPrototypeOf方法模拟
// var F = function () {
//     this.foo = 'bar';
// };
// var f = new F();
// 等同于
// var f = Object.setPrototypeOf({}, F.prototype);
// F.call(f);

// 原型对象
// var A = {
//     print: function () {
//         console.log('hello');
//     }
// };
// // 实例对象
// var B = Object.create(A);
// console.log(Object.getPrototypeOf(B) === A); // true
// B.print() // hello
// console.log(B.print === A.print); // true

// Object.create方法可以用下面的代码代替
// if (typeof Object.create !== 'function') {
//     Object.create = function (obj) {
//         function F() { }
//         F.prototype = obj;
//         return new F();
//     };
// }

// 下面三种方式生成的新对象是等价的
// var obj1 = Object.create({});
// var obj2 = Object.create(Object.prototype);
// var obj3 = new Object();

// 生成一个不继承任何属性（比如没有toString和valueOf方法）的对象
// var obj = Object.create(null);
// obj.valueOf() //  obj.valueOf is not a function

// var o1 = {};
// var o2 = Object.create(o1);
// var o3 = Object.create(o2);
// console.log(o2.isPrototypeOf(o3)); // true
// console.log(o1.isPrototypeOf(o3)); // true


/**
 * 实例对象 Object.prototype.__proto__ 返回该对象的原型
 */
// var obj = {};
// var p = {};
// obj.__proto__ = p;
// console.log(Object.getPrototypeOf(obj) === p); // true

/**
 * 获取原型对象方法的比较
 * __proto__属性指向当前对象的原型对象，即构造函数的prototype属性
 */
// var obj = new Object();
// console.log(obj.__proto__ === Object.prototype); // true
// console.log(obj.__proto__ === obj.constructor.prototype); // true

// 获取实例对象obj的原型对象，有三种方法
// obj.__proto__
// obj.constructor.prototype
// Object.getPrototypeOf(obj) 推荐

// console.log(Object.getOwnPropertyNames(Date)); // ["length", "name", "prototype", "now", "parse", "UTC"]

// Object.prototype.hasOwnProperty 断某个属性定义在对象自身，还是定义在原型链上

// console.log(Date.hasOwnProperty('length')); // true
// console.log(Date.hasOwnProperty('toString')); // false

// 获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举）
// function inheritedPropertyNames(obj) {
//     var props = {};
//     while (obj) {
//         Object.getOwnPropertyNames(obj).forEach(function (p) {
//             props[p] = true;
//         });
//         obj = Object.getPrototypeOf(obj);
//     }
//     return Object.getOwnPropertyNames(props);
// }
// console.log(inheritedPropertyNames(Date));


/**
 * 对象的拷贝
 * 确保拷贝后的对象，与原对象具有同样的原型。
 * 确保拷贝后的对象，与原对象具有同样的实例属性。
 */

// function copyObject(orig) {
//     var copy = Object.create(Object.getPrototypeOf(orig));
//     copyOwnPropertiesFrom(copy, orig);
//     return copy;
// }

// function copyOwnPropertiesFrom(target, source) {
//     Object
//         .getOwnPropertyNames(source)
//         .forEach(function (propKey) {
//             var desc = Object.getOwnPropertyDescriptor(source, propKey);
//             Object.defineProperty(target, propKey, desc);
//         });
//     return target;
// }

// 另一种更简单的写法，是利用 ES2017 才引入标准的Object.getOwnPropertyDescriptors方法
// function copyObject(orig) {
//     return Object.create(
//         Object.getPrototypeOf(orig),
//         Object.getOwnPropertyDescriptors(orig)
//     );
// }

/**
 * 严格模式
 * 严格模式是从 ES5 进入标准的，主要目的有以下几个:
 *   明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。
 *   增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
 *   提高编译器效率，增加运行速度。
 *   为未来新版本的 JavaScript 语法做好铺垫。
 */
// 'use strict';
// var eval = 17;
// var arguments = 17;
// var obj = { set p(arguments) { } };
// try { } catch (arguments) { }
// function x(eval) { }
// function arguments() { }
// var y = function eval() { };
// var f = new Function('arguments', "'use strict'; return 17;");

// function f(a) {
//     a = 2;
//     return [a, arguments[0]];
// }
// f(1); // 正常模式为[2, 2]

// function f(a) {
//     'use strict';
//     a = 2;
//     return [a, arguments[0]];
// }
// f(1); // 严格模式为[2, 1]

