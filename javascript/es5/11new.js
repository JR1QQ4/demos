/**
 * 对象
 * （1）对象是单个实物的抽象。
 * （2）对象是一个容器，封装了属性（property）和方法（method）。
 * 构造函数
 * 所谓“类”就是对象的模板，对象就是“类”的实例。
 * 构造函数的特点有两个：
 *     函数体内部使用了this关键字，代表了所要生成的对象实例
 *     生成对象的时候，必须使用new命令
 */
// var Vehicle = function () {
//     this.price = 1000;
// };
// // 没使用new命令, price属性变成了全局变量
// var v = Vehicle();
// console.log(v); // undefined
// console.log(price); // 1000

// 为了保证构造函数必须与new命令一起使用，一个解决办法是，构造函数内部使用严格模式
// 严格模式中，函数内部的this不能指向全局对象，默认等于undefined
// function Fubar(foo, bar) {
//     'use strict';
//     this._foo = foo;
//     this._bar = bar;
// };
// Fubar() //  Cannot set property '_foo' of undefined

// 另一个解决办法，构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象
// function Fubar(foo, bar) {
//     if (!(this instanceof Fubar)) {
//         return new Fubar(foo, bar);
//     }
//     this._foo = foo;
//     this._bar = bar;
// }
// console.log(Fubar(1, 2)._foo); // 1
// console.log((new Fubar(1, 2))._foo); // 1

/**
 * 使用new命令时，它后面的函数依次执行下面的步骤:
 *     创建一个空对象，作为将要返回的对象实例。
 *     将这个空对象的原型，指向构造函数的prototype属性
 *     将这个空对象赋值给函数内部的this关键字
 *     开始执行构造函数内部的代码
 */
// 如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；
// 否则，就会不管return语句，返回this对象。
// var Vehicle = function () {
//     this.price = 1000;
//     return 1000;
// };
// console.log((new Vehicle()) === 1000); // false

// var Vehicle = function () {
//     this.price = 1000;
//     return { price: 2000 };
// };
// console.log((new Vehicle()).price); // 2000

// function getMessage() {
//     return 'this is a message';
// }
// var msg = new getMessage();
// console.log(msg); // {}
// console.log(typeof msg); // "object"

// 使用new.target属性,如果当前函数是new命令调用，new.target指向当前函数，否则为undefined
// function f() {
//     console.log(new.target === f);
//     // // 判断函数调用的时候，是否使用new命令
//     // if (!new.target) {
//     //     throw new Error('请使用 new 命令调用！');
//     // }
// }
// f(); // false
// new f(); // true

// Object.create() 创建实例对象
// 对象person1是person2的模板，后者继承了前者的属性和方法
// var person1 = {
//     name: '张三',
//     age: 38,
//     greeting: function () {
//         console.log('Hi! I\'m ' + this.name + '.');
//     }
// };
// var person2 = Object.create(person1); 
// console.log(person2.name); // 张三
// console.log(person2.greeting()); // Hi! I'm 张三.

/**
 * this就是属性或方法“当前”所在的对象
 * JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）。
 * 但是 JavaScript 支持运行环境动态切换，也就是说，this的指向是动态的
 */

/**
 * this使用场合
 * （1）全局环境 指的就是顶层对象window
 * （2）构造函数 指的是实例对象
 * （3）对象的方法 指向就是方法运行时所在的对象
 */
// console.log(this === window); // true
// function f() {
//     console.log(this === window);
// }
// f(); // true

// var Obj = function (p) {
//     this.p = p;
// };
// var o = new Obj('Hello World!');
// console.log(o.p); // Hello World!

// var obj = {
//     foo: function () {
//         console.log(this); // {foo: ƒ}
//         return this;
//     }
// };
// console.log(obj.foo() == obj); // true

/**
 * 改变 this 的指向
 * JavaScript 引擎内部，obj和obj.foo储存在两个内存地址，称为地址一和地址二
 * obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj
 * 但是，下面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此this指向全局环境
 */
var obj = {
    foo: function () {
        // console.log(this);
    }
};
// 情况一
// (obj.foo = obj.foo)() // window
// 等同于
// (obj.foo = function () {
//     console.log(this);
// })()

// 情况二
// (false || obj.foo)() // window
// 等同于
// (false || function () {
//     console.log(this);
// })()

// 情况三
// (1, obj.foo)() // window
// 等同于
// (1, function () {
//     console.log(this);
// })()

// a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b
// var a = {
//     p: 'Hello',
//     b: {
//         m: function () {
//             console.log(this.p);
//         }
//     }
// };
// a.b.m() // undefined

// 等同于
// var b = {
//     m: function () {
//         console.log(this.p);
//     }
// };
// var a = {
//     p: 'Hello',
//     b: b
// };
// (a.b).m() // 等同于 b.m()

// var a = {
//     b: {
//         m: function () {
//             console.log(this.p);
//         },
//         p: 'Hello'
//     }
// };
// var hello = a.b.m;
// hello() // undefined
// var hello = a.b;
// hello.m() // Hello

/**
 * 使用注意点：
 *  避免多层 this
 *  避免数组处理方法中的 this
 *  避免回调函数中的 this
 */
// var o = {
//     f1: function () {
//         console.log(this);
//         var f2 = function () {
//             console.log(this);
//         }();
//     }
// }
// o.f1(); // {f1: ƒ}  Window 

// var temp = function () {
//     console.log(this);
// };
// var o = {
//     f1: function () {
//         console.log(this);
//         var f2 = temp();
//     }
// }
// o.f1(); // {f1: ƒ}  Window 

// var o = {
//     f1: function () {
//         console.log(this);
//         var that = this;
//         var f2 = function () {
//             console.log(that);
//         }();
//     }
// };
// o.f1(); // Object  Object

// 严格模式下，如果函数内部的this指向顶层对象，就会报错
// 用于检查 this
// var counter = {
//     count: 0
// };
// counter.inc = function () {
//     'use strict';
//     this.count++
// };
// var f = counter.inc;
// f(); // Cannot read property 'count' of undefined

// 避免数组处理方法中的 this
// var o = {
//     v: 'hello',
//     p: ['a1', 'a2'],
//     f: function f() {
//         this.p.forEach(function (item) {
//             // console.log(this); // window
//             console.log(this.v + ' ' + item);
//         });
//     }
// }
// o.f() // undefined a1  undefined a2

// 避免回调函数中的 this
// var o = new Object();
// o.f = function () {
//     console.log(this); // document
//     console.log(this === o); // false
// }
// document.addEventListener("click", o.f);

/**
 * 绑定 this 的方法
 *   Function.prototype.call(thisValue, arg1, arg2, ...)
 *   Function.prototype.apply(thisValue, [arg1, arg2, ...])
 *   Function.prototype.bind()
 */
// var n = 123;
// var obj = { n: 456 };
// function a() {
//     console.log(this.n);
// }
// a.call() // 123
// a.call(null) // 123
// a.call(undefined) // 123
// a.call(window) // 123
// a.call(obj) // 456
// a.call(5); // undefined  包装对象 Number {[[PrimitiveValue]]: 5}

// （1）找出数组最大元素
// var a = [10, 2, 4, 15, 9];
// console.log(Math.max.apply(null, a)); // 15

// (2) 将数组的空元素变为undefined
// console.log(Array.apply(null, ['a', ,'b'])); // [ 'a', undefined, 'b' ]

// （3）转换类似数组的对象
// console.log(Array.prototype.slice.apply({0: 1, length: 1})); // [1]
// console.log(Array.prototype.slice.apply({0: 1})); // []
// console.log(Array.prototype.slice.apply({0: 1, length: 2})); // [1, undefined]
// console.log(Array.prototype.slice.apply({length: 1})); // [undefined]

// （4）绑定回调函数的对象
// var o = new Object();
// o.f = function () {
//     console.log(this === o);
// }
// var f = function () {
//     o.f.apply(o);
//     // 或者 o.f.call(o);
// };
// document.addEventListener("click",f)

// bind
// var counter = {
//     count: 0,
//     inc: function () {
//         this.count++;
//     }
// };
// var func = counter.inc.bind(counter);
// func();
// console.log(counter.count); // 1

// var counter = {
//     count: 0,
//     inc: function () {
//         this.count++;
//     }
// };
// var obj = {
//     count: 100
// };
// var func = counter.inc.bind(obj);
// func();
// console.log(obj.count);  // 101

// var add = function (x, y) {
//     return x * this.m + y * this.n;
// }
// var obj = {
//     m: 2,
//     n: 2
// };
// var newAdd = add.bind(obj, 5);
// console.log(newAdd(5)); // 20

/**
 * bind方法有一些使用注意点:
 *   （1）每一次返回一个新函数, 这样会导致无法取消绑定
 *   （2）结合回调函数使用
 *   （3）结合call方法使用
 */
// var o = {
//     m: function () {
//         console.log(123);
//     }
// };
// document.addEventListener('click', o.m.bind(o)); // 123
// document.removeEventListener('click', o.m.bind(o)); // 123

// var o = {
//     m: function () {
//         console.log(123);
//     }
// };
// var listener = o.m.bind(o);
// document.addEventListener('click', listener);
// document.removeEventListener('click', listener);

// var push = Function.prototype.call.bind(Array.prototype.push);
// var pop = Function.prototype.call.bind(Array.prototype.pop);
// var a = [1, 2, 3];
// push(a, 4)
// console.log(a); // [1, 2, 3, 4]
// pop(a)
// console.log(a); // [1, 2, 3]
