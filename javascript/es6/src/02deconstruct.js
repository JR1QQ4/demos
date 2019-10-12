// let [a, b, c] = [1, 2, 3];
// console.log(a, b, c);

// let [foo, [[bar], baz]] = [1, [[2], 3]];
// console.log(foo, bar, baz);

// let [ , , third] = ["foo", "bar", "baz"];
// console.log(third); // "baz"

// let [head, ...tail] = [1, 2, 3, 4];
// console.log(head); // 1
// console.log(tail); // [2, 3, 4]

// let [bar, foo] = [1];
// console.log(bar, foo); // 1 undefined

// let [foo, bar] = 'abc';
// console.log(foo, bar); // a b

// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// let [x, y, z] = new Set(['a', 'b', 'c']);
// console.log(x); // a

// function* fibs() {
//   let a = 0;
//   let b = 1;
//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }
// let [first, second, third, fourth, fifth, sixth, seven] = fibs();
// console.log(sixth); // 5
// console.log(second); // 1
// console.log(seven); // 8

// let [x, y = 'b'] = ['a', undefined];
// console.log(x, y); // a b

// let [x = 1] = [null];
// console.log(x); // null

// function f() {
//   console.log('aaa');
// }
// let [x = f()] = [1];
// console.log(x); // 1

// let x;
// if ([1][0] === undefined) {
//   x = f();
// } else {
//   x = [1][0];
// }
// console.log(x); // 1

// let {
//   foo,
//   bar
// } = {
//   foo: 'aaa',
//   bar: 'bbb'
// };
// console.log(foo, bar); // aaa bbb

// let {
//   baz
// } = {
//   foo: 'aaa',
//   bar: 'bbb'
// };
// console.log(baz); // undefined

// let { log, sin, cos } = Math;
// console.log(log);
// const {
//   log
// } = console;
// log('hello');

// let obj = { first: 'hello', last: 'world' };
// let { first: f, last: l } = obj;
// console.log(f, l); // hello world

// let a;
// ({
//   a
// } = {
//   a: 'aa',
//   b: 'bb'
// });
// console.log(a); // aa

// let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// console.log(baz); // 'aaa'
// console.log(foo); // foo is not defined

// let obj = {
//   p: [
//     'Hello',
//     {
//       y: 'World'
//     }
//   ]
// };
// let {
//   p: [x, { y }]
// } = obj;
// console.log(p); // p is not defined

// let obj = {
//   p: ['Hello', { y: 'World' }]
// };
// let {
//   p,
//   p: [x, { y }]
// } = obj;
// console.log(p); // ["Hello", {y: "World"}]

// let { length: len } = 'hello';
// console.log(len); // 5

// let {toString: s} = 123;
// console.log(s === Number.prototype.toString ); // true

// function move({ x = 0, y = 0 } = {}) {
//   return [x, y];
// }
// console.log(move({ x: 3, y: 8 })); // [3, 8]
// console.log(move()); // [0, 0]
// console.log(move({})); // [0, 0]

// [(b)] = [3];
// console.log(b); // 3
// let [(b)] = [3]; // 报错
