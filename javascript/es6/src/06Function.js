// function log(x, y) {
//   if (typeof y === 'undefined') {
//     y = 'World';
//   }
//   console.log(x, y);
// }
// log('hello'); // hello world

// function log(x, y = 'world') {
//   console.log(x, y);
// }
// log('hello'); // hello world

// function foo(x = 5) {
//   let x = 1; // error
//   const x = 2; // error
// }

// let x = 99;
// function foo(p = x + 1) {
//   console.log(p);
// }
// foo(); // 100
// x = 100;
// foo(); // 101

// function foo({ x, y = 5 }) {
//   console.log(x, y);
// }
// foo({}); // undefined 5
// foo({ x: 1 }); // 1 5
// foo({ x: 1, y: 2 }); // 1 2
// foo(); // 报错

// function foo({ x, y = 5 } = {}) {
//   console.log(x, y);
// }
// foo(); // undefined 5

// function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
//   console.log(method);
// }
// fetch('http://example.com'); // GET

// 两种写法比较
// function m1({ x = 0, y = 0 } = {}) {
//   console.log([x, y]);
// }
// function m2({ x, y } = { x: 0, y: 0 }) {
//   console.log([x, y]);
// }
// m1(); // [0, 0]
// m2(); // [0, 0]
// m1({ x: 1, y: 2 }); // [1, 2]
// m2({ x: 1, y: 2 }); // [1, 2]
// m1({ x: 1 }); // [1, 0]
// m2({ x: 1 }); // [1, undefined]
// m1({}); // [0, 0]
// m2({}); // [undefined, undefined]
// m1({ z: 3 }); // [0, 0]
// m2({ z: 3 }); // [undefined, undefined]

// function f(x = 1, y) {
//   console.log([x, y]);
// }
// f(); // [1, undefined]
// f(2); // [2, undefined]
// f(undefined, 1); // [1, 1]
// f(null, 1); // [null, 1]
// f(,2) // 报错

// function f(x, y = 5, z) {
//   console.log([x, y, z]);
// }
// f(); // [undefined, 5, undefined]
// f(1); // [1, 5, undefined]
// f(1, undefined, 2); // [1, 5, 2]
// f(1, ,2) //报错

// (function (a, b, c = 5) {}).length
// console.log(function(a) {}.length); // 1
// console.log(function(a = 5) {}.length); // 0
// console.log(function(a, b, c = 5) {}.length); // 2
// console.log(function(a = 0, b, c) {}.length); // 0
// console.log(function(a, b = 1, c) {}.length); // 1

// console.log(function(...args) {}.length); // 0

// let x = 1;
// function f(y = x) {
//   let x = 2;
//   console.log(y); // 1
// }
// f();

// function f(y = x) {
//   let x = 2;
//   console.log(y);
// }
// f(); // x is not defined

// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }
// function foo(mustBeProvided = throwIfMissing()) {
//   return mustBeProvided;
// }
// foo(); // Error: Missing parameter

// arguments变量的写法
// function sortNumbers() {
//   return Array.prototype.slice.call(arguments).sort();
// }
// rest参数的写法
// const sortNumbers = (...numbers) => numbers.sort();

// function push(array, ...items) {
//   items.forEach(function(item) {
//     array.push(item);
//     console.log(item);
//   });
// }
// let a = [];
// push(a, 1, 2, 3); // 1 2 3

// console.log(function(a, ...b) {}.length); // 1

// 只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错
// function doSomething(a, b = a) {
//     'use strict';
//     // code
//   }

// console.log(function foo() {}.name); // foo
// console.log(new Function().name); // anonymous

// function foo() {}
// console.log(foo.bind({}).name); // bound foo

// var sum = (num1, num2) => num1 + num2;
// // 等同于
// var sum = function(num1, num2) {
//   return num1 + num2;
// };
// console.log(sum === sum); // true

// let getTempItem = id => { id: id, name: "Temp" }; // 报错
// let getTempItem = id => ({ id: id, name: 'Temp' }); // 不报错

// 如果箭头函数只有一行语句，且不需要返回值
// const full = ({ first, last }) => first + ' ' + last;

// const numbers = (...nums) => nums;
// console.log(numbers(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]

// 箭头函数注意点：
// 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
// 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
// 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
// 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

// function Timer() {
//   this.s1 = 0;
//   this.s2 = 0;
//   setInterval(() => this.s1++, 1000);
//   setInterval(function() {
//     this.s2++;
//   }, 1000);
// }
// var timer = new Timer();
// setTimeout(() => console.log('s1: ', timer.s1), 3100); // s1:  3
// setTimeout(() => console.log('s2: ', timer.s2), 3100); // s2:  0

// let x = function() {
//   return [(() => this.x).bind({ x: 'inner' })()];
// }.call({ x: 'outer' });
// console.log(x); // ["outer"]
