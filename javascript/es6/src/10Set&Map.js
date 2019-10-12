// Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数

// const s = new Set();
// [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
// for (let i of s) {
//   console.log(i); // 2 3 5 4
// }

// const set = new Set([1, 2, 3, 4, 4]);
// console.log(set); // {1, 2, 3, 4}
// console.log([...set]); // [1, 2, 3, 4]
// console.log(set.size); // 4

// 去除数组重复成员的方法
// [...new Set(array)]

// 去除字符串里面的重复字符
// console.log([...new Set('ababbc')].join('')); // abc

// let setArr = new Set([123, 'str']);

// 增
// let set = new Set();
// set.add({});
// set.add({});
// console.log(set); // {{…}, {…}}
// console.log(set.size); // 2

// 查
// let s = new Set();
// s.add(1)
//   .add(2)
//   .add(2);
// console.log(s.size); // 2
// console.log(s.has(1)); // true
// console.log(s.has(2)); // true
// console.log(s.has(3)); // false

// 删
// let s = new Set([2, 3, 4]);
// console.log(s); // {2, 3, 4}
// s.delete(3);
// console.log(s); // {2, 4}

// const items = new Set([1, 2, 3, 4, 5]);
// const array = Array.from(items);
// console.log(array); // [1, 2, 3, 4, 5]

// 遍历
// let set = new Set(['red', 'green', 'blue']);
// for (let item of set) {
//   console.log(item); // red green blue
// }
// for (let item of set.keys()) {
//   console.log(item); // red green blue
// }
// for (let item of set.values()) {
//   console.log(item); // red green blue
// }
// for (let item of set.entries()) {
//   console.log(item);
// }
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true

// let set = new Set([1, 4, 9]);
// set.forEach((value, key) => console.log(key + ' : ' + value));
// 1 : 1
// 4 : 4
// 9 : 9

// let set = new Set(['red', 'green', 'blue']);
// let arr = [...set];
// console.log(arr); // ["red", "green", "blue"]

// let arr = [3, 5, 2, 2, 5, 5];
// let unique = [...new Set(arr)];
// console.log(unique); // [3, 5, 2]

// let set = new Set([1, 2, 3]);
// set = new Set([...set].map(x => x * 2));
// console.log(set); // {2, 4, 6}

// let set = new Set([1, 2, 3, 4, 5]);
// set = new Set([...set].filter(x => x % 2 == 0));
// console.log(set); // {2, 4}

// WeakSet 的成员只能是对象，而不能是其他类型的值

// const a = [[1, 2], [3, 4]];
// const ws = new WeakSet(a);
// console.log(ws); // {[1, 2], [3, 4]}

// const b = [3, 4];
// const ws = new WeakSet(b);
//  Invalid value used in weak set(…)

// const ws = new WeakSet();
// const obj = {};
// const foo = {};
// ws.add(foo);
// ws.add(obj);

// console.log(ws.has(foo)); // true
// console.log(ws.has(obj)); // true
// console.log(ws.has(window)); // false
// ws.delete(window);
// console.log(ws.has(window)); // false

// Map

// const m = new Map();
// const o = { p: 'Hello World' };
// m.set(o, 'content');
// console.log(m); // {{…} => "content"}
// console.log(m.size); // 1
// console.log(m.get(o)); // content
// console.log(m.has(o)); // true
// m.delete(o);
// console.log(m.has(o)); // false

// const set = new Set([['foo', 1], ['bar', 2]]);
// const m1 = new Map(set);
// console.log(m1.get('foo')); // 1

// const m2 = new Map([['baz', 3]]);
// const m3 = new Map(m2);
// console.log(m3.get('baz')); // 3

// let map = new Map();
// map.set('foo', true);
// map.set('bar', false);

// console.log(map.size); // 2
// map.clear();
// console.log(map.size); // 0

// WeakMap,只接受对象作为键名（null除外），不接受其他类型的值作为键名

// const map = new WeakMap();
// map.set(1, 2); // 报错

// const wm = new WeakMap();
// let key = {};
// let obj = { foo: 1 };

// wm.set(key, obj);
// obj = null;
// console.log(wm.get(key)); // {foo: 1}
