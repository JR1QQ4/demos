// 四种数据集合
// JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set
// 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制
// 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

// function makeIterator(array) {
//   var nextIndex = 0;
//   return {
//     next: function() {
//       return nextIndex < array.length
//         ? { value: array[nextIndex++], done: false }
//         : { value: undefined, done: true };
//     }
//   };
// }
// var it = makeIterator(['a', 'b']);
// console.log(it.next()); // { value: "a", done: false }
// console.log(it.next()); // { value: "b", done: false }
// console.log(it.next()); // { value: undefined, done: true }

// function makeIterator(array) {
//   var nextIndex = 0;
//   return {
//     next: function() {
//       return nextIndex < array.length
//         ? { value: array[nextIndex++] }
//         : { done: true };
//     }
//   };
// }
// var it = makeIterator(['a', 'b']);
// console.log(it.next()); // {value: "a"}
// console.log(it.next()); // {value: "b"}
// console.log(it.next()); // {done: true}

// function idMaker() {
//   var index = 0;
//   return {
//     next: function() {
//       return { value: index++, done: false };
//     }
//   };
// }
// var it = idMaker();
// console.log(it.next()); // {value: 0, done: false}
// console.log(it.next()); // {value: 1, done: false}

// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，
// 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）
// const obj = {
//   [Symbol.iterator]: function() {
//     return {
//       next: function() {
//         return {
//           value: 1,
//           done: true
//         };
//       }
//     };
//   }
// };

// 原生具备 Iterator 接口的数据结构:
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象

// let arr = ['a', 'b', 'c'];
// let iter = arr[Symbol.iterator]();
// console.log(iter.next()); // {value: "a", done: false}
// console.log(iter.next()); // {value: "b", done: false}
// console.log(iter.next()); // {value: "c", done: false}
// console.log(iter.next()); // {value: undefined, done: true}

// 一个对象如果要具备可被for...of循环调用的 Iterator 接口，
// 必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）

// class RangeIterator {
//   constructor(start, stop) {
//     this.value = start;
//     this.stop = stop;
//   }
//   [Symbol.iterator]() {
//     return this;
//   }
//   next() {
//     var value = this.value;
//     if (value < this.stop) {
//       this.value++;
//       return { done: false, value: value };
//     }
//     return { done: true, value: undefined };
//   }
// }
// function range(start, stop) {
//   return new RangeIterator(start, stop);
// }
// for (var value of range(0, 3)) {
//   console.log(value); // 0, 1, 2
// }

// let iterable = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); // 'a', 'b', 'c'
// }

// 普通对象部署数组的Symbol.iterator方法，并无效果
// let iterable = {
//   a: 'a',
//   b: 'b',
//   c: 'c',
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); // undefined, undefined, undefined
// }

// let set = new Set()
//   .add('a')
//   .add('b')
//   .add('c');
// let [x, y] = set;
// console.log(x, y); // a b
// let [first, ...rest] = set;
// console.log(first, rest); // a ["b", "c"]

// let generator = function*() {
//   yield 1;
//   yield* [2, 3];
//   yield 5;
// };
// var iterator = generator();
// console.log(iterator.next()); // {value: 1, done: false}
// console.log(iterator.next()); // {value: 2, done: false}
// console.log(iterator.next()); // {value: 3, done: false}
// console.log(iterator.next()); // {value: 5, done: false}
// console.log(iterator.next()); // {value: undefined, done: true}

// var someString = 'hi';
// console.log(typeof someString[Symbol.iterator]); // function
// var iterator = someString[Symbol.iterator]();
// console.log(iterator.next()); // {value: "h", done: false}
// console.log(iterator.next()); // {value: "i", done: false}
// console.log(iterator.next()); // {value: undefined, done: false}

// var str = new String('hi');
// console.log([...str]); // ["h", "i"]
// console.log(str); // {"hi"}
// str[Symbol.iterator] = function() {
//   return {
//     next: function() {
//       if (this._first) {
//         this._first = false;
//         return { value: 'bye', done: false };
//       } else {
//         return { done: true };
//       }
//     },
//     _first: true
//   };
// };
// console.log([...str]); // ["bye"]
// console.log(str); // {"hi", Symbol(Symbol.iterator): ƒ}

// let myIterable = {
//   [Symbol.iterator]: function*() {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// };
// console.log([...myIterable]); // [1, 2, 3]

// 等同

// let obj = {
//   *[Symbol.iterator]() {
//     yield 'hello';
//     yield 'world';
//   }
// };
// for (let x of obj) {
//   console.log(x); // hello world
// }

// for...of循环可以使用的范围包括数组、Set 和 Map 结构、
// 类似数组（比如arguments对象、DOM NodeList 对象）、 Generator 对象，以及字符串

// const arr = ['red', 'green', 'blue'];
// for (let v of arr) {
//   console.log(v); // red green blue
// }

// const obj = {};
// obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
// for (let v of obj) {
//   console.log(v); // red green blue
// }

// for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性
// let arr = [3, 5, 7];
// arr.foo = 'hello';

// for (let i in arr) {
//   console.log(i); // "0", "1", "2", "foo"
// }
// for (let i of arr) {
//   console.log(i); //  "3", "5", "7"
// }

// let map = new Map().set('a', 1).set('b', 2);
// for (let pair of map) {
//   console.log(pair); // ["a", 1] ["b", 2]
// }
// for (let [key, value] of map) {
//   console.log(key + ' : ' + value); // a: 1  b: 2
// }

// let arr = ['a', 'b', 'c'];
// for (let pair of arr.entries()) {
//   console.log(pair); // [0, 'a'] [1, 'b'] [2, 'c']
// }

// let paras = document.querySelectorAll('p');
// for (let p of paras) {
//   p.classList.add('test');
// }

// let arrayLike = { length: 2, 0: 'a', 1: 'b' };
// for (let x of Array.from(arrayLike)) {
//   console.log(x); // a b
// }
// for (let x of arrayLike) {
//   console.log(x); // arrayLike is not iterable
// }

// let es6 = {
//   edition: 6,
//   committee: 'TC39',
//   standard: 'ECMA-262'
// };
// for (let e in es6) {
//   console.log(e); // edition committee standard
// }
// for (let e of es6) {
//   console.log(e); // es6 is not iterable
// }
// for (var key of Object.keys(es6)) {
//   console.log(key + ': ' + es6[key]);
// }
// edition: 6
// committee: TC39
// standard: ECMA-262

// forEach 循环无法中途跳出，break命令或return命令都不能奏效
// for...in 循环主要是为遍历对象而设计的，不适用于遍历数组
// for...of 提供了遍历所有数据结构的统一操作接口
