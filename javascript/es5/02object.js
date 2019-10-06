// Object 对象本身的方法
// Object.print = function (o) { console.log(o) };
// Object.print('123');

// Object 的实例方法
// Object.prototype.print = function (o) {
//     console.log(o);
// };
// var obj = new Object();
// obj.print('123') // 123

// var obj1 = Object();  // {}
// var obj2 = Object(undefined);  // {}
// var obj3 = Object(null);  // {}
// console.log(obj3 instanceof Object); // true

// var obj = Object(1);
// console.log(obj instanceof Object); // true
// console.log(obj instanceof Number); // true
// var obj = Object('foo');
// console.log(obj instanceof Object);  // true
// console.log(obj instanceof String);  // true
// var obj = Object(true);
// console.log(obj instanceof Object);  // true
// console.log(obj instanceof Boolean);  // true

// 如果Object方法的参数是一个对象，它总是返回该对象
// var arr = [];
// var obj = Object(arr); // 返回原数组
// console.log(obj === arr); // true
// var value = {};
// var obj = Object(value) // 返回原对象
// console.log(obj === value); // true
// var fn = function () { };
// var obj = Object(fn); // 返回原函数
// console.log(obj === fn);  // true

// function isObject(value) {
//     return value === Object(value);
// }
// console.log(isObject([])); // true
// console.log(isObject(true)); // false

/**
 * 如果该参数是一个对象，则直接返回这个对象；
 * 如果是一个原始类型的值，则返回该值对应的包装对象
 */
// var o1 = {a: 1};
// var o2 = new Object(o1);
// console.log(o1 === o2); // true
// var obj = new Object(123);
// console.log(obj instanceof Number); // true

// var obj = {
//     p1: 123,
//     p2: 456
// };
// // Object.keys方法只返回可枚举的属性
// console.log(Object.keys(obj));  // ["p1", "p2"]
// // Object.getOwnPropertyNames方法还返回不可枚举的属性名
// console.log(Object.getOwnPropertyNames(obj));  // ["p1", "p2"]
// console.log(Object.keys(obj).length);  // 2
// console.log(Object.getOwnPropertyNames(obj).length); // 2

/**
 * 静态方法
 * (1) 对象属性模型的相关方法:
 * Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
 * Object.defineProperty()：通过描述对象，定义某个属性。
 * Object.defineProperties()：通过描述对象，定义多个属性。
 *
 * (2) 控制对象状态的方法:
 * Object.preventExtensions()：防止对象扩展。
 * Object.isExtensible()：判断对象是否可扩展。
 * Object.seal()：禁止对象配置。
 * Object.isSealed()：判断一个对象是否可配置。
 * Object.freeze()：冻结一个对象。
 * Object.isFrozen()：判断一个对象是否被冻结。
 *
 * (3) 原型链相关方法:
 * Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
 * Object.getPrototypeOf()：获取对象的Prototype对象。
 */

/**
 * 实例方法：
 * Object.prototype.valueOf()：返回当前对象对应的值。
 * Object.prototype.toString()：返回当前对象对应的字符串形式。
 * Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
 * Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
 * Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
 * Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。
 */

/**
 * 判断数据类型
 * Object.prototype.toString.call(value)
 */
// console.log(Object.prototype.toString.call(213));  // [object Number]
// console.log(Object.prototype.toString.call('abc'));  // [object String]
// console.log(Object.prototype.toString.call(false));  // [object Boolean]
// console.log(Object.prototype.toString.call(undefined));  // [object Undefined]
// console.log(Object.prototype.toString.call(null));  // [object Null]
// console.log(Object.prototype.toString.call([1]));  // [object Array]
// var f = function () {
//     return arguments;
// };
// console.log(Object.prototype.toString.call(f));  // [object Function]
// console.log(Object.prototype.toString.call(f()));  // [object Arguments]
// console.log(Object.prototype.toString.call(new Error('错误')));  // [object Error]
// console.log(Object.prototype.toString.call(new Date()));  // [object Date]
// console.log(Object.prototype.toString.call(/abcd/));  // [object RegExp]
// console.log(Object.prototype.toString.call(Math));  // [object Math]
// console.log(Object.prototype.toString.call({}));  // [object Object]

// var type = function (o) {
//     var s = Object.prototype.toString.call(o);
//     return s.match(/\[object (.*?)\]/)[1].toLowerCase();
// };
// console.log(type({})); // "object"
// console.log(type([])); // "array"
// console.log(type(5)); // "number"
// console.log(type(null)); // "null"
// console.log(type()); // "undefined"
// console.log(type(/abcd/)); // "regex"
// console.log(type(new Date())); // "date"

// var type = function (o) {
//     var s = Object.prototype.toString.call(o);
//     return s.match(/\[object (.*?)\]/)[1].toLowerCase();
// };
// ['Null',
//     'Undefined',
//     'Object',
//     'Array',
//     'String',
//     'Number',
//     'Boolean',
//     'Function',
//     'RegExp'
// ].forEach(function (t) {
//     type['is' + t] = function (o) {
//         return type(o) === t.toLowerCase();
//     };
// });
// console.log(type.isObject({})); // true
// console.log(type.isNumber(NaN)); // true
// console.log(type.isRegExp(/abc/)); // true

// toLocaleString，用来返回针对某些地域的特定的值
// var person = {
//     toString: function () {
//         return 'Henry Norman Bethune';
//     },
//     toLocaleString: function () {
//         return '白求恩';
//     }
// };
// console.log(person.toString()); // Henry Norman Bethune
// console.log(person.toLocaleString()); // 白求恩

/**
 * 属性描述对象提供6个元属性:
 * value: 123, 属性的属性值，默认为undefined
 * writable: false, 布尔值, 表示属性值（value）是否可改变（即是否可写），默认为true
 * enumerable: true,布尔值，表示该属性是否可遍历，默认为true。
 * configurable: false,布尔值，表示可配置性，默认为true
 * get: undefined, 是一个函数，表示该属性的取值函数（getter），默认为undefined
 * set: undefined, 是一个函数，表示该属性的存值函数（setter），默认为undefined
 * 
 * Object.getOwnPropertyDescriptor()方法只能用于对象自身的属性，不能用于继承的属性
 * Object.defineProperty()和Object.defineProperties()参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false
 */
// var obj = { p: 'a' };
// console.log(Object.getOwnPropertyDescriptor(obj, 'p'));
// {
//     value: "a", 
//     writable: true, 
//     enumerable: true, 
//     configurable: true
// }

// Object.getOwnPropertyNames方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历
// var obj = Object.defineProperties({}, {
//     p1: { value: 1, enumerable: true },
//     p2: { value: 2, enumerable: false }
// });
// console.log(Object.getOwnPropertyNames(obj)); //  ["p1", "p2"]

// console.log(Object.keys([]));  // []
// console.log(Object.getOwnPropertyNames([]));  // ["length"]
// console.log(Object.keys(Object.prototype));  // []
// console.log(Object.getOwnPropertyNames(Object.prototype));
// ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]

/**
 * Object.defineProperty()方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象
 * Object.defineProperty(object, propertyName, attributesObject)
 * object：属性所在的对象
 * propertyName：字符串，表示属性名
 * attributesObject：属性描述对象
 */
// var obj = Object.defineProperty({}, 'p', {
//     value: 123,
//     writable: false,  // 不可以更改
//     enumerable: true,
//     configurable: false
// });
// console.log(obj);  // {p: 123}

// Object.defineProperties 定义多个
// var obj = Object.defineProperties({}, {
//     p1: { value: 123, enumerable: true },
//     p2: { value: 'abc', enumerable: true },
//     p3: {
//         get: function () { return this.p1 + this.p2 },
//         enumerable: true,
//         configurable: true
//     }
// });
// // p3属性定义了取值函数get，即每次读取该属性，都会调用这个取值函数
// // 一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错
// console.log(obj);  // {p1: 123, p2: "abc", p3: "123abc"}

// 实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历
// var obj = {};
// obj.p = 123;
// console.log(obj.propertyIsEnumerable('p')); // true
// console.log(obj.propertyIsEnumerable('toString')); // false


// var proto = Object.defineProperty({}, 'foo', {
//     value: 'a',
//     writable: false
// });
// var obj = Object.create(proto);
// proto是原型对象，它的foo属性不可写。obj对象继承proto，也不可以再自定义这个属性了
// obj.foo = 'b';
// console.log(obj.foo);  // a
// 这种情况下，原型链会被完全忽视
// Object.defineProperty(obj, 'foo', {
//     value: 'b'
// });
// console.log(obj.foo);  // b

// 这导致了toString属性也会被for...in循环遍历
// var obj = {};
// console.log('toString' in obj);  // true

// 如果一个属性的enumerable为false，下面三个操作不会取到该属性。
// for..in循环
// Object.keys方法
// JSON.stringify方法
// var obj = {};
// Object.defineProperty(obj, 'x', {
//     value: 123,
//     enumerable: false
// });
// console.log(obj.x); // 123
// for (var key in obj) {
//     console.log('in:' + key); // undefined
// }
// console.log(Object.keys(obj)); // []
// console.log(JSON.stringify(obj));  // {}

// 至于value，只要writable和configurable有一个为true，就允许改动
// var o1 = Object.defineProperty({}, 'p', {
//     value: 1,
//     writable: true,
//     configurable: false
// });
// Object.defineProperty(o1, 'p', { value: 2 })
// console.log(o1);  // {p: 2}

// var obj = Object.defineProperty({}, 'p', {
//     get: function () {
//         return 'getter';
//     },
//     set: function (value) {
//         console.log('setter: ' + value);
//     }
// });
// console.log(obj);  // { p: "getter" }
// console.log(obj.p);  // getter
// obj.p = 123 // "setter: 123"
// console.log(obj.p);  // getter

// 另一种写法
// var obj = {
//     get p() {
//         return 'getter';
//     },
//     set p(value) {
//         console.log('setter: ' + value);
//     }
// };

// var obj = {
//     $n: 5,
//     get next() { return this.$n++ },
//     set next(n) {
//         if (n >= this.$n) this.$n = n;
//         else throw new Error('新的值必须大于当前值');
//     }
// };
// console.log(obj.next);  // 5
// obj.next = 10;
// console.log(obj.next);  // 10
// obj.next = 5;  // 02object.js:303 Uncaught Error: 新的值必须大于当前值

// 对象的拷贝
// var extend = function (to, from) {
//     for (var property in from) {
//         to[property] = from[property];
//     }
//     return to;
// }
// var to = extend({}, { a: 1 });
// console.log(to);  // {a: 1}
// 遇到存取器定义的属性，会只拷贝值
// var to2 = extend({}, {
//     get a() { return 1 }
// });
// console.log(to2);  // {a: 1}

// var extend = function (to, from) {
//     for (var property in from) {
//         if (!from.hasOwnProperty(property)) continue;
//         Object.defineProperty(
//             to,
//             property,
//             Object.getOwnPropertyDescriptor(from, property)
//         );
//     }
//     return to;
// }
// var to3 = extend({}, { get a(){ return 1 } })
// console.log(to3);  // {a: 1, get a: ƒ a() ...}

// Object.preventExtensions方法可以使得一个对象无法再添加新的属性
// var obj = new Object();
// Object.preventExtensions(obj);
// Object.defineProperty(obj, 'p', {
//   value: 'hello'
// });  // Cannot define property p, object is not extensible
// obj.p = 1;
// console.log(obj.p);  // undefined

// var obj = new Object();
// console.log(Object.isExtensible(obj)); // true
// Object.preventExtensions(obj);
// console.log(Object.isExtensible(obj));  // false

// Object.seal方法使得一个对象既无法添加新属性，也无法删除旧属性
// var obj = { p: 'hello' };
// Object.seal(obj);
// delete obj.p;
// console.log(obj.p);  // hello
// // 禁止新增或删除属性，并不影响修改某个属性的值
// obj.p = 12;
// console.log(obj.p);  // 12
// obj.x = 'world';
// console.log(obj.x);  // undefined

// var obj = { p: 'a' };
// console.log(Object.isSealed(obj));  // false
// Object.seal(obj);
// console.log(Object.isSealed(obj));  // true
// console.log(Object.isExtensible(obj));  // false

// 对obj对象进行Object.freeze()以后，修改属性、新增属性、删除属性都无效了
// var obj = {
//     p: 'hello'
// };
// Object.freeze(obj);
// obj.p = 'world';
// console.log(obj.p);  // hello
// obj.t = 'hello';
// console.log(obj.t);  // undefined
// delete obj.p;
// console.log(obj.p);  // hello

// var obj = {
//     p: 'hello'
// };
// Object.freeze(obj);
// console.log(Object.isFrozen(obj));  // true
// console.log(Object.isSealed(obj)); // true
// console.log(Object.isExtensible(obj)); // false

// 确认obj没有被冻结后，再对它的属性赋值，就不会报错了
// var obj = {
//     p: 'hello'
// };
// Object.freeze(obj);
// if (!Object.isFrozen(obj)) {
//     obj.p = 'world';
// }

/**
 * 局限性:
 * 上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。
 */
// var obj = new Object();
// Object.preventExtensions(obj);
// var proto = Object.getPrototypeOf(obj);
// proto.t = 'hello';
// console.log(obj.t);  // hello
// console.log(obj);  // {}
// // 解决办法:把obj的原型也冻结住
// Object.preventExtensions(proto);
// obj.p = 'world';
// console.log(obj.p);  // undefined

/**
 * 另一种局限性:
 * 如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。
 */
// var obj = {
//     foo: 1,
//     bar: ['a', 'b']
// };
// Object.freeze(obj);
// obj.foo = 2;
// console.log(obj.foo);  // 1
// obj.bar.push('c');
// console.log(obj.bar);  // ["a", "b", "c"]
