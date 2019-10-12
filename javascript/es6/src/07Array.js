// 扩展运算符
// console.log(...[1, 2, 3]); // 1 2 3
// console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
// [...document.querySelectorAll('div')]; // [<div>, <div>, <div>]

// function push(array, ...items) {
//   array.push(...items);
// }
// function add(x, y) {
//   return x + y;
// }
// const numbers = [4, 38];
// console.log(add(...numbers)); // 42

// console.log([...[], 1]); // [1]
// console.log((...[1, 2])); // 报错

// ES5 与 ES6 区别
// function f(x, y, z) {
//   // ...
// }
// var args = [0, 1, 2];
// f.apply(null, args);
// function f(x, y, z) {
//   // ...
// }
// let args = [0, 1, 2];
// f(...args);

// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);
// let arr1 = [0, 1, 2];
// let arr2 = [3, 4, 5];
// arr1.push(...arr2);

// new (Date.bind.apply(Date, [null, 2015, 1, 1]));
// new Date(...[2015, 1, 1]);

// const a1 = [1, 2];
// const a2 = a1;
// a2[0] = 2;
// console.log(a1, a2); // [2, 2] [2, 2]

// const a1 = [1, 2];
// const a2 = a1.concat();
// a2[0] = 2;
// console.log(a1, a2); // [1, 2] [2, 2]

// const a1 = [1, 2];
// const a2 = [...a1];
// const [...a3] = a1;
// console.log(a2, a3); // [1, 2] [1, 2]

// const arr1 = ['a', 'b'];
// const arr2 = ['c'];
// const arr3 = ['d', 'e'];
// console.log(arr1.concat(arr2, arr3)); // ["a", "b", "c", "d", "e"]
// console.log([...arr1, ...arr2, ...arr3]); // ["a", "b", "c", "d", "e"]
// console.log(arr1); // ["a", "b"]

// const a1 = [{ foo: 1 }];
// const a2 = [{ bar: 2 }];
// const a3 = a1.concat(a2);
// const a4 = [...a1, ...a2];
// console.log(a3); // [{ foo: 1 }, { bar: 2 }]
// console.log(a4); // [{ foo: 1 }, { bar: 2 }]
// console.log(a3[0] === a1[0]); // 浅拷贝,true

// const [first, ...rest] = [];
// console.log(first, rest); // undefined []
// const [first, ...rest] = ['foo'];
// console.log(first, rest); // foo []

// console.log([...'hello']); // ["h", "e", "l", "l", "o"]

// let map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
// let arr = [...map.keys()];
// console.log(arr); // [1, 2, 3]

// const obj = { a: 1, b: 2 };
// let arr = [...obj]; // object is not iterable

// let arrayLike = {
//   '0': 'a',
//   '1': 'b',
//   '2': 'c',
//   length: 3
// };
// var arr1 = [].slice.call(arrayLike);
// console.log(arr1); // ["a", "b", "c"]
// let arr2 = Array.from(arrayLike);
// console.log(arr2); // ["a", "b", "c"]

// console.log(Array.from({ length: 3 })); // [undefined, undefined, undefined]

// 转换成数组
// const toArray = (() => (Array.from ? Array.from : obj => [].slice.call(obj)))();

// Array.from还可以接受第二个参数，作用类似于数组的map方法
// console.log(Array.from([1, 2, 3], x => x * x)); // [1, 4, 9]
// console.log(Array.from([1, , 2, , 3], n => n || 0)); // [1, 0, 2, 0, 3]
// console.log(Array.from({ length: 2 }, () => 'jack')); // ["jack", "jack"]

// Array.of将一组值转为数组
// console.log(Array.of(3, 11, 8)); //  [3, 11, 8]
// console.log(Array.of(3)); // [3]
// console.log(Array.of(3).length); // 1

// ES5 中的 Array
// console.log(Array()); // []
// console.log(Array(3)); // [, , ,]
// console.log(Array(3, 11, 8)); // [3, 11, 8]

// copyWithin
// console.log([1, 2, 3, 4, 5].copyWithin(0)); // [1, 2, 3, 4, 5]
// console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
// console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5]
// console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1)); // [4, 2, 3, 4, 5]

// let i32a = new Int32Array([1, 2, 3, 4, 5]);
// console.log(i32a.copyWithin(0, 2)); // [3, 4, 5, 4, 5]

// find
// console.log([1, 4, -5, 10].find(n => n < 0)); // -5
// let value = [1, 5, 10, 15].find(function(value, index, arr) {
//   return value > 9;
// });
// console.log(value); // 10

// let index = [1, 5, 10, 15].findIndex(function(value, index, arr) {
//   return value > 9;
// });
// console.log(index); // 2

// 接受第二个参数，用来绑定回调函数的this对象
// function f(v) {
//   return v > this.age;
// }
// let person = { name: 'John', age: 20 };
// console.log([10, 12, 26, 15].find(f, person)); // 26

// console.log([NaN].indexOf(NaN)); // -1
// console.log([NaN].findIndex(y => Object.is(NaN, y))); // 0

// fill
// console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]
// console.log(new Array(3).fill(7)); // [7, 7, 7]
// console.log(['a', 'b', 'c'].fill(7, 1, 2)); // ["a", 7, "c"]

// let arr3 = ['vue', 'vue-router', 'vue-vuex'];
// for (let item of arr3) {
//   console.log(item); // vue vue-router vue-vuex
// }

// for (let index of ['a', 'b'].keys()) {
//   console.log(index); // 0 1
// }

// for (let elem of ['a', 'b'].values()) {
//   console.log(elem); // a b
// }

// for (let [index, elem] of ['a', 'b'].entries()) {
//   console.log(index, elem);
// }
// 0 'a'
// 1 'b'

// 手动调用遍历器对象的next方法，进行遍历
// let letter = ['a', 'b', 'c'];
// let entries = letter.entries();
// console.log(entries); // Array Iterator {}
// console.log(entries.next()); // {value: [0, "a"], done: false}
// console.log(entries.next().value); // [1, "b"]
// console.log(entries.next().value); // [2, "c"]
// console.log(entries.next()); // {value: undefined, done: true}

// includes
// console.log([1, 2, 3].includes(2)); // true
// console.log([1, 2, 3].includes(4)); // false
// console.log([1, 2, NaN].includes(NaN)); // true

// 第二个参数表示搜索的起始位置
// console.log([1, 2, 3].includes(3, 3)); // false

// console.log([NaN].indexOf(NaN)); // -1
// console.log([NaN].includes(NaN)); // true

// flat
// console.log([1, 2, [3, [4, 5]]].flat()); // [1, 2, 3, [4, 5]]
// console.log([1, 2, [3, [4, 5]]].flat(2)); // [1, 2, 3, 4, 5]
// console.log([1, [2, [3]]].flat(Infinity)); // [1, 2, 3]
// console.log([1, 2, , 4, 5].flat()); // [1, 2, 4, 5]

// flatMap
// console.log([2, 3, 4].flatMap(x => [x, x * 2])); // [2, 4, 3, 6, 4, 8]
// console.log([1, 2, 3, 4].flatMap(x => [[x * 2]])); // [[2], [4], [6], [8]]

// in
// console.log(0 in [undefined, undefined, undefined]); // true
// console.log(0 in [, , ,]); // false

// ES5 对空位的处理:
// forEach(), filter(), reduce(), every() 和some()都会跳过空位
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串

// [, 'a'].forEach((x, i) => console.log(i)); // 1

// console.log(['a', , 'b'].filter(x => true)); // ["a", "b"]

// console.log([, 'a'].every(x => x === 'a')); // true

// console.log([1, , 2].reduce((x, y) => x + y)); // 3

// console.log([, 'a'].some(x => x !== 'a')); // false

// console.log([, 'a'].map(x => 1)); // [, 1]

// console.log([, 'a', undefined, null].join('#')); // #a##

// console.log([, 'a', undefined, null].toString()); // ,a,,

// ES6 则是明确将空位转为undefined
// console.log(Array.from(['a', , 'b'])); // ["a", undefined, "b"]
// console.log([...['a', , 'b']]); // ["a", undefined, "b"]
// console.log([, 'a', 'b', ,].copyWithin(2, 0)); // [empty, "a", empty, "a"]
// console.log(new Array(3).fill('a')); // ["a", "a", "a"]
// let arr = [, ,];
// for (let i of arr) {
//   console.log(1); // 1 1
// }

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined
// console.log([...[, 'a'].entries()]); // [[0,undefined], [1,"a"]]
// console.log([...[, 'a'].keys()]); // [0, 1]
// console.log([...[, 'a'].values()]); // [undefined, "a"]
// console.log([, 'a'].find(x => true)); // undefined
// console.log([, 'a'].findIndex(x => true)); // 0

// stableSorting
// const arr = ['peach', 'straw', 'apple', 'spork'];
// const stableSorting = (s1, s2) => {
//   if (s1[0] < s2[0]) return -1;
//   return 1;
// };
// console.log(arr.sort(stableSorting));
// ["apple", "peach", "straw", "spork"]

// unstableSorting
// const arr2 = ['peach', 'straw', 'apple', 'spork'];
// const unstableSorting = (s1, s2) => {
//   if (s1[0] <= s2[0]) return -1;
//   return 1;
// };
// console.log(arr2.sort(unstableSorting));
// ["apple", "peach", "spork", "straw"]

// function getSort(a, b) {
//   if (a < b) {
//     return -1;
//   } else if (a === b) {
//     return 0;
//   } else {
//     return 1;
//   }
// }
// let a = [2, 5, 1, 8, 3].sort(getSort);
// console.log(a); // [1, 2, 3, 5, 8]
