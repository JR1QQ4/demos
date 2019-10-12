// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// ES5
// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }
// Point.prototype.toString = function() {
//   return '(' + this.x + ', ' + this.y + ')';
// };
// var p = new Point(1, 2);
// console.log(p); // Point {x: 1, y: 2}

// ES6
// constructor方法 - 构造方法
// 定义“类”的方法的时候，前面不需要加上function这个关键字
// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//   toString() {
//     return '(' + this.x + ', ' + this.y + ')';
//   }
// }
// let p = new Point(1, 2);
// console.log(p); // Point {x: 1, y: 2}

// class B {}
// let b = new B();
// console.log(b.constructor === B.prototype.constructor); // true

// class Point {
//   constructor() {
//     // ...
//   }
// }
// Object.assign(Point.prototype, {
//   toString() {},
//   toValue() {}
// });
// console.dir(Point);
// console.log(Point.prototype.constructor === Point); // true

// class Point {
//   constructor(x, y) {
//     // ...
//   }
//   toString() {
//     // ...
//   }
// }
// console.log(Object.keys(Point.prototype)); // []
// console.log(Object.getOwnPropertyNames(Point.prototype)); // ["constructor", "toString"]

// var Point = function(x, y) {
//   // ...
// };
// Point.prototype.toString = function() {
//   // ...
// };
// console.log(Object.keys(Point.prototype)); // ["toString"]
// console.log(Object.getOwnPropertyNames(Point.prototype)); // ["constructor", "toString"]

// 等同于
// class Point {}
// class Point {
//   constructor() {}
// }

// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
// class Foo {
//   constructor() {
//     return Object.create(null);
//   }
// }
// console.log(new Foo() instanceof Foo); // false

// 类必须使用new调用，否则会报错
// class Foo {
//   constructor() {
//     return Object.create(null);
//   }
// }
// Foo(); // Class constructor Foo cannot be invoked without 'new'

// class MyClass {
//   constructor() {}
//   get prop() {
//     return 'getter';
//   }
//   set prop(value) {
//     console.log('setter: ' + value);
//   }
// }
// let inst = new MyClass();
// inst.prop = 123; // setter: 123
// console.log(inst.prop); // getter

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的
// class CustomHTMLElement {
//   constructor(element) {
//     this.element = element;
//   }
//   get html() {
//     return this.element.innerHTML;
//   }
//   set html(value) {
//     this.element.innerHTML = value;
//   }
// }
// var descriptor = Object.getOwnPropertyDescriptor(
//   CustomHTMLElement.prototype,
//   'html'
// );
// console.log('get' in descriptor); // true
// console.log('set' in descriptor); // true
// console.log(descriptor);

// const MyClass = class Me {
//   getClassName() {
//     return Me.name;
//   }
// };
// let inst = new MyClass();
// console.log(inst.getClassName()); // Me
// console.log(Me.name); // Me is not defined

// let person = new (class {
//   constructor(name) {
//     this.name = name;
//   }
//   sayName() {
//     console.log(this.name);
//   }
// })('张三');
// person.sayName(); // 张三

// class Foo {
//   constructor(...args) {
//     this.args = args;
//   }
//   *[Symbol.iterator]() {
//     for (let arg of this.args) {
//       yield arg;
//     }
//   }
// }
// for (let x of new Foo('hello', 'world')) {
//   console.log(x); // hello world
// }

// class Obj {
//   constructor() {
//     this.getThis = () => this;
//   }
// }
// const myObj = new Obj();
// console.log(myObj.getThis() === myObj); // true

// 静态方法
// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }
// console.log(Foo.classMethod()); // 'hello'
// var foo = new Foo();
// console.log(foo.classMethod()); // foo.classMethod is not a function

// 这里的this指的是Foo类，而不是Foo的实例，
// class Foo {
//   static bar() {
//     this.baz();
//   }
//   static baz() {
//     console.log('hello');
//   }
//   baz() {
//     console.log('world');
//   }
// }
// Foo.bar(); // hello

// 父类的静态方法，可以被子类继承
// class Foo {
//   static classMethod() {
//     console.log('hello');
//   }
// }
// class Bar extends Foo {}
// Bar.classMethod(); // hello

// 静态方法可以从super对象上调用的
// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }
// class Bar extends Foo {
//   static classMethod() {
//     return super.classMethod() + ', too';
//   }
// }
// console.log(Bar.classMethod()); // hello, too

// 实例属性this._count定义在constructor()方法里面
// 也可以定义在类的最顶层，其他都不变
// class IncreasingCounter {
//   _count = 0;
// // 等同
// //   constructor() {
// //     this._count = 0;
// //   }
//   get value() {
//     console.log('Getting the current value!');
//     return this._count;
//   }
//   increment() {
//     this._count++;
//   }
// }

// ES6 明确规定，Class 内部只有静态方法，没有静态属性
// class Foo {}
// Foo.prop = 1;

// ES6 新提案
// class MyClass {
//   static myStaticProp = 42;
//   constructor() {
//     console.log(MyClass.myStaticProp); // 42
//   }
// }

// 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问
// ES6 不提供，只能通过变通方法模拟实现
// 一种做法是在命名上加以区别
// class Widget {
//   // 公有方法
//   foo(baz) {
//     this._bar(baz);
//   }
//   // 私有方法
//   _bar(baz) {
//     return (this.snaf = baz);
//   }
// }

// 另一种方法就是索性将私有方法移出模块
// class Widget {
//   foo(baz) {
//     bar.call(this, baz);
//   }
// }
// function bar(baz) {
//   return (this.snaf = baz);
// }

// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
// const bar = Symbol('bar');
// const snaf = Symbol('snaf');
// export default class myClass {
//   // 公有方法
//   foo(baz) {
//     this[bar](baz);
//   }
//   // 私有方法
//   [bar](baz) {
//     return (this[snaf] = baz);
//   }
// }

// but Reflect.ownKeys()依然可以拿到它们
// const inst = new myClass();
// Reflect.ownKeys(myClass.prototype); // [ 'constructor', 'foo', Symbol(bar) ]

// class ColorPoint extends Point {
//   constructor(x, y, color) {
//     super(x, y); // 调用父类的constructor(x, y)
//     this.color = color;
//   }
//   toString() {
//     return this.color + ' ' + super.toString(); // 调用父类的toString()
//   }
// }

// ColorPoint继承了父类Point，但是它的构造函数没有调用super方法
// class Point {}
// class ColorPoint extends Point {
//   constructor() {}
// }
// let cp = new ColorPoint(); //  Must call super constructor

// class ColorPoint extends Point {}

// // 等同于
// class ColorPoint extends Point {
//   constructor(...args) {
//     super(...args);
//   }
// }

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }
// class ColorPoint extends Point {
//   constructor(x, y, color) {
//     // 子类的constructor方法没有调用super之前，就使用this关键字
//     // this.color = color; // ReferenceError
//     super(x, y);
//     this.color = color; // 正确
//   }
// }
// let cp = new ColorPoint(25, 8, 'green');
// console.log(cp instanceof ColorPoint); // true
// console.log(cp instanceof Point); // true

// Object.getPrototypeOf方法可以用来从子类上获取父类
// 以使用这个方法判断，一个类是否继承了另一个类
// console.log(Object.getPrototypeOf(ColorPoint) === Point); // true

// 父类的静态方法，也会被子类继承
// class A {
//   static hello() {
//     console.log('hello world');
//   }
// }
// class B extends A {}
// B.hello(); // hello world

// super()只能用在子类的构造函数之中，用在其他地方就会报错
// class A {
//   constructor() {
//     // new.target指向当前正在执行的函数
//     console.log(new.target.name);
//   }
// }
// class B extends A {
//   constructor() {
//     super();
//   }
// }
// new A(); // B
// new B(); // B

// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
// class A {
//   p() {
//     return 2;
//   }
// }
// class B extends A {
//   constructor() {
//     super();
//     // super.p()就相当于A.prototype.p()
//     console.log(super.p()); // 2
//   }
// }
// let b = new B();

// p是父类A实例的属性，super.p就引用不到它
// class A {
//   constructor() {
//     this.p = 2;
//   }
// }
// class B extends A {
//   get m() {
//     return super.p;
//   }
// }
// let b = new B();
// console.log(b.m); // undefined

// class A {
//   constructor() {
//     this.x = 1;
//   }
//   print() {
//     console.log(this.x);
//   }
// }
// class B extends A {
//   constructor() {
//     super();
//     this.x = 2;
//   }
//   m() {
//     // A.prototype.print()内部的this指向子类B的实例
//     super.print();
//   }
// }
// let b = new B();
// b.m(); // 2

// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象
// class Parent {
//   static myMethod(msg) {
//     console.log('static', msg);
//   }
//   myMethod(msg) {
//     console.log('instance', msg);
//   }
// }
// class Child extends Parent {
//   static myMethod(msg) {
//     super.myMethod(msg);
//   }
//   myMethod(msg) {
//     super.myMethod(msg);
//   }
// }
// Child.myMethod(1); // static 1
// var child = new Child();
// child.myMethod(2); // instance 2

// ES5 每一个对象都有__proto__属性，指向对应的构造函数的prototype属性

// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
// 子类的__proto__属性，表示构造函数的继承，总是指向父类
// 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
// class A {}
// class B extends A {}
// console.log(B.__proto__ === A); // true
// console.log(B.prototype.__proto__ === A.prototype); // true
// console.dir(A);
// console.dir(B);

// class A {}
// class B {}
// // B 的实例继承 A 的实例
// Object.setPrototypeOf(B.prototype, A.prototype);
// // B 继承 A 的静态属性
// Object.setPrototypeOf(B, A);
// const b = new B();
// console.dir(b);

// Object.setPrototypeOf = function(obj, proto) {
//   obj.__proto__ = proto;
//   return obj;
// };

// Object.setPrototypeOf(B.prototype, A.prototype);
// // 等同于
// B.prototype.__proto__ = A.prototype;

// Object.setPrototypeOf(B, A);
// // 等同于
// B.__proto__ = A;

// B.prototype = Object.create(A.prototype);
// // 等同于
// B.prototype.__proto__ = A.prototype;

// class A {}
// console.log(A.__proto__ === Function.prototype); // true
// console.log(A.prototype.__proto__ === Object.prototype); // true

// 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
// p2.__proto__.__proto__.printName = function() {
//   console.log('Ha');
// };

// 原生构造函数是无法继承的:
// Boolean Number String Array Date Function RegExp Error Object

// ES6 允许继承原生构造函数定义子类
// 因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承

// class MyArray extends Array {
//   constructor(...args) {
//     super(...args);
//   }
// }
// var arr = new MyArray();
// arr[0] = 12;
// console.log(arr.length); // 1
// arr.length = 0;
// console.log(arr[0]); // undefined

// class VersionedArray extends Array {
//   constructor() {
//     super();
//     this.history = [[]];
//   }
//   commit() {
//     this.history.push(this.slice());
//   }
//   revert() {
//     this.splice(0, this.length, ...this.history[this.history.length - 1]);
//   }
// }
// var x = new VersionedArray();
// console.log(x); // [history: Array(1)]
// console.log(x.slice()); // [history: Array(1)]
// x.push(1);
// x.push(2);
// console.log(x); // [1, 2, history: Array(1)]
// console.log(x.history); // [[]]
// x.commit();
// console.log(x.history); // [[], [1, 2]]
// x.revert();
// console.log(x); // [1, 2, history: Array(2)]

// Mixin 模式的实现
// const a = {
//   a: 'a'
// };
// const b = {
//   b: 'b'
// };
// const c = { ...a, ...b };
// console.log(c); // {a: "a", b: "b"}

// 将多个类的接口“混入”（mix in）另一个类
// function mix(...mixins) {
//   class Mix {
//     constructor() {
//       for (let mixin of mixins) {
//         copyProperties(this, new mixin()); // 拷贝实例属性
//       }
//     }
//   }
//   for (let mixin of mixins) {
//     copyProperties(Mix, mixin); // 拷贝静态属性
//     copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
//   }
//   return Mix;
// }

// function copyProperties(target, source) {
//   for (let key of Reflect.ownKeys(source)) {
//     if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
//       let desc = Object.getOwnPropertyDescriptor(source, key);
//       Object.defineProperty(target, key, desc);
//     }
//   }
// }
