// var a = new Array(3);
// var b = [undefined, undefined, undefined];
// // a的键位都是空的，b的键位是有值的
// console.log(0 in a); // false
// console.log(0 in b); // true

// var arr = [1, 2, 3];
// console.log(typeof arr); // "object"
// console.log(Array.isArray(arr));  // true

// console.log(Array.prototype.join.call('hello', '-')); // h-e-l-l-o

// var obj = { 0: 'a', 1: 'b', length: 2 };
// console.log(obj); // {0: "a", 1: "b", length: 2}
// console.log(Array.prototype.join.call(obj, '-')); // a-b

// 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝
// var obj = { a: 1 };
// var oldArray = [obj];
// var newArray = oldArray.concat();
// obj.a = 2;
// console.log(newArray[0].a);  // 2

/**
 * slice方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
 */
// var a = ['a', 'b', 'c'];
// console.log(a.slice());  // ["a", "b", "c"]
// console.log(a.slice(1));  // ["b", "c"]
// console.log(a.slice(1,2));  // ["b"]
// console.log(a.slice(-2));  // ["b", "c"]
// console.log(a);  // ["a", "b", "c"]

/**
 * splice方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。
 * 注意，该方法会改变原数组。
 */
// var a = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(a.splice());  // []
// console.log(a.splice(1));  // ["b", "c", "d", "e", "f"]
// console.log(a.splice(1,1)); // ["b"]
// console.log(a.splice(-2)); // ["e", "f"]
// console.log(a);  // ["a", "b", "c", "d"]

/**
 * sort方法对数组成员进行排序，默认是按照字典顺序排序。
 * 排序后，原数组将被改变。
 */
// var a = ['d', 'c', 'b', 'a'];
// console.log(a.sort()); // ["a", "b", "c", "d"]
// var b = [4, 3, 2, 1];
// console.log(b.sort()); // [1, 2, 3, 4]
// var c = [10111, 1101, 111];
// console.log(c.sort()); // [10111, 1101, 111]
// var d = [10111, 1101, 111, 1];
// d.sort(function (a,b) {
//     return a -b;
// });
// console.log(d); // [1, 111, 1101, 10111]

// var e = [
//     { age: 30 },
//     { age: 24 },
//     { age: 28 }
// ];
// e.sort(function (o1, o2) {
//     return o1.age - o2.age;
// });
// console.log(e); // [{age: 24},{age: 28},{age: 30}]

/**
 * map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
 * 原数组没有变化
 * 当前成员、当前位置和数组本身
 */
// var numbers = [1, 2, 3];
// var newArr = numbers.map(function (n,index,arr) {
//     return n + 1;
// });
// console.log(numbers); // [1, 2, 3]
// console.log(newArr); // [2, 3, 4]

// var arr = ['a', 'b', 'c'];
// var a = [1, 2];
// var c = a.map(function (e) {
//     return this[e]
// }, arr);
// console.log(a); //  [1, 2]
// console.log(c); // ["b", "c"]
// console.log(arr); // ["a", "b", "c"]

// 如果数组有空位，map方法的回调函数在这个位置不会执行，会跳过数组的空位
// var f = function (n) { return 'a' };
// console.log([1, undefined, 2].map(f)); // ["a", "a", "a"]
// console.log([1, null, 2].map(f)); // ["a", "a", "a"]
// console.log([1, , 2].map(f)); // ["a", empty, "a"]

/**
 * forEach方法不返回值，只用来操作数据
 */
// function log(element, index, array) {
//     console.log('[' + index + '] = ' + element);
// }
// var a = [2, 5, 9].forEach(log); // [0] = 2 [1] = 5 [2] = 9
// console.log(a); // undefined

// forEach方法无法中断执行，总是会将所有成员遍历完
// var arr = [1, 2, 3];
// for (var i = 0; i < arr.length; i++) {
//   if (arr[i] === 2) break;
//   console.log(arr[i]); // 1
// }
// arr.forEach(function (v,i,a) {
//     if(i==1) return;
//     console.log(v); // 1 3
// })

// forEach方法不会跳过undefined和null，但会跳过空位
// var log = function (n) {
//     console.log(n + 1);
// };
// [1, undefined, 2].forEach(log); // 2 NaN 3
// [1, null, 2].forEach(log); // 2 1 3
// [1, , 2].forEach(log); // 2 3

/**
 * filter方法用于过滤数组成员，满足条件的成员组成一个新数组返回
 */
// var a = [1, 2, 3, 4, 5];
// var b = a.filter(function (elem) {
//     return (elem > 3);
// })
// console.log(a); // [1, 2, 3, 4, 5]
// console.log(b); // [4, 5]

// var arr = [0, 1, 'a', false];
// console.log(arr.filter(Boolean)); //  [1, "a"]

// filter方法还可以接受第二个参数，用来绑定参数函数内部的this变量
// var obj = { MAX: 3 };
// var myFilter = function (item) {
//   if (item > this.MAX) return true;
// };
// var arr = [2, 8, 3, 4, 1, 3, 2, 9];
// console.log(arr.filter(myFilter, obj)); // [8, 4, 9]

/**
 * some()，every()
 * 类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件
 * 当前成员、当前位置和整个数组，然后返回一个布尔值
 */
// var arr = [1, 2, 3, 4, 5];
// var b = arr.some(function (elem, index, arr) {
//     return elem >= 3;
// });
// console.log(b); // true

// var arr = [1, 2, 3, 4, 5];
// var b = arr.every(function (elem, index, arr) {
//     return elem >= 3;
// });
// console.log(b); // false

// 对于空数组，some方法返回false，every方法返回true，回调函数都不会执行
// function isEven(x) {
//     console.log(12);
//     return x % 2 === 0;
// }
// console.log([].some(isEven)); // false
// console.log([].every(isEven)); // true

/**
 * reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值
 * reduce是从左到右处理（从第一个成员到最后一个成员）
 * reduceRight则是从右到左（从最后一个成员到第一个成员）
 * a 累积变量，默认为数组的第一个成员
 * b 当前变量，默认为数组的第二个成员
 * c 当前位置（从0开始）
 * d 原数组
 */
// var a = [1, 2, 3, 4, 5];
// var b = a.reduce(function (a, b, c, d) {
//     console.log(a, b, c); // 1 2,3 3,6 4,10 5
//     return a + b;
// });
// console.log(b); // 15

// 由于空数组取不到初始值，reduce方法会报错,第二个参数，就能保证总是会返回一个值
// function add(prev, cur) {
//     return prev + cur;
// };
// // console.log([].reduce(add)); // Reduce of empty array with no initial value
// console.log([].reduce(add, 1)); // 1

// function subtract(prev, cur) {
//     return prev - cur;
// }
// console.log([3, 2, 1].reduce(subtract)); // 0
// console.log([3, 2, 1].reduceRight(subtract)); // -4

// var a = [1,2,3,4];
// a.reduce(function (a,b) {
//     console.log(b); // 2 3 4
//     if(a == 1) return;
// });

// function findLongest(entries) {
//     return entries.reduce(function (longest, entry) {
//         return entry.length > longest.length ? entry : longest;
//     }, '');
// }
// console.log(findLongest(['aaa', 'bb', 'c'])); // aaa
// console.log(findLongest(['aaa', 'bbbb', 'ccccc'])); // ccccc

/**
 * indexOf()，lastIndexOf()
 * indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
 * lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1
 * 这两个方法内部，使用严格相等运算符（===）进行比较
 */
// var a = ['a', 'b', 'c'];
// console.log(a.indexOf('b')); // 1
// console.log(a.indexOf('y')); // -1
// console.log(a.indexOf('b', 2)); // -1

// var b = [2, 5, 9, 2];
// console.log(b.lastIndexOf(2)); // 3
// console.log(b.lastIndexOf(9)); // 2

// console.log([NaN].indexOf(NaN)); // -1
// console.log([NaN].lastIndexOf(NaN)); // -1

/**
 * 链式使用,有不少返回的还是数组，所以可以链式使用
 */
// var users = [
//     { name: 'tom', email: 'tom@example.com' },
//     { name: 'peter', email: 'peter@example.com' }
// ];
// users
//     .map(function (user) {
//         return user.email;
//     })
//     .filter(function (email) {
//         return /^t/.test(email);
//     })
//     .forEach(function (email) {
//         console.log(email);
//     }); // tom@example.com

