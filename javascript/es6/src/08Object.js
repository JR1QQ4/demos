// const foo = 'bar';
// const baz = { foo };
// console.log(baz); // {foo: "bar"}

// function f(x, y) {
//   return { x, y }; // 等价于 return {x: x, y: y};
// }
// console.log(f(1, 2)); // {x: 1, y: 2}

// const o = {
//   method: function() {
//     return 'Hello!';
//   }
// };
// 等同于
// const o = {
//   method() {
//     return 'Hello!';
//   }
// };

// let user = {
//   name: 'test'
// };
// let foo = {
//   bar: 'baz'
// };
// console.log(user, foo); // {name: "test"} {bar: "baz"}
// console.log({ user, foo }); // {user: {name: "test"}, foo: {bar: "baz"}}

// let propKey = 'foo';
// let obj = {
//   [propKey]: true,
//   ['a' + 'bc']: 123
// };
// console.log(obj); // {foo: true, abc: 123}

// let lastWord = 'last word';
// const a = {
//   'first word': 'hello',
//   [lastWord]: 'world'
// };
// console.log(a['first word']); // hello
// console.log(a['last word']); // world
// console.log(a[lastWord]); // world

// name
// const person = {
//   sayName() {
//     console.log('hello!');
//   }
// };
// console.log(person.sayName.name); // sayName

// console.log(new Function().name); // anonymous

// let doSomething = function() {
//   // ...
// };
// console.log(doSomething.name); // doSomething
// console.log(doSomething.bind().name); // bound doSomething

// let obj = { foo: 123 };
// console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
// {value: 123, writable: true, enumerable: true, configurable: true}

// console.log(
//   Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// ); // false
// console.log(Object.getOwnPropertyDescriptor([], 'length').enumerable); // false

// ES6 一共有 5 种方法可以遍历对象的属性
// for...in
// Object.keys(obj)
// Object.getOwnPropertyNames(obj)
// Object.getOwnPropertySymbols(obj)
// Reflect.ownKeys(obj)

// const proto = {
//   foo: 'hello'
// };
// const obj = {
//   foo: 'world',
//   find() {
//     return super.foo; // 等同于Object.getPrototypeOf(this).foo
//   }
// };
// Object.setPrototypeOf(obj, proto);
// console.log(obj.find()); // "hello"

// let obj = { a: { b: 1 } };
// let { ...x } = obj;
// obj.a.b = 2;
// console.log(x); // { a: {b: 2} }

// let o1 = { a: 1 };
// let o2 = { b: 2 };
// o2.__proto__ = o1;
// let { ...o3 } = o2;
// console.log(o2); // {b: 2}
// console.log(o3); // {b: 2}

// const o = Object.create({ x: 1, y: 2 });
// o.z = 3;
// let { x, ...newObj } = o;
// let { y, z } = newObj;
// console.log(o); // {z: 3}
// console.log(newObj); // {z: 3}
// console.log(x, y, z); // 1 undefined 3

// let z = { a: 3, b: 4 };
// let n = { ...z };
// console.log(n); // { a: 3, b: 4 }

// let foo = { ...['a', 'b', 'c'] };
// console.log(foo); // {0: "a", 1: "b", 2: "c"}

// console.log({ ...{}, a: 1 }); // {a: 1}
// console.log({ ...1 }); // {}
// console.log({ ...true }); // {}
// console.log({ ...null }); // {}
// console.log({ ...undefined }); // {}

// 四个等同
// let aWithOverrides = { ...a, x: 1, y: 2 };
// let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// let x = 1,
//   y = 2,
//   aWithOverrides = { ...a, x, y };
// let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

// 等同
// let aWithDefaults = { x: 1, y: 2, ...a };
// let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);

// Object.is()
// ES6 提出“Same-value equality”（同值相等）算法
// let obj1 = {
//   name: 'zs'
// };
// let obj2 = {
//   name: 'zs'
// };
// console.log(obj1.name === obj2.name); // true
// console.log(Object.is(obj1.name, obj2.name)); // true
// console.log(Object.is({}, {})); // false

// === 同值相等，is 严格相等
// console.log(+0 === -0); // true
// console.log(NaN === NaN); // false
// console.log(Object.is(+0, -0)); // false
// console.log(Object.is(NaN, NaN)); // true

// Object.defineProperty(Object, 'is', {
//   value: function(x, y) {
//     if (x === y) {
//       return x !== 0 || 1 / x === 1 / y;
//     }
//     return x !== x && y !== y;
//   },
//   configurable: true,
//   enumerable: false,
//   writable: true
// });

// Object.assign()
// const target = { a: 1 };
// const source1 = { b: 2 };
// const source2 = { c: 3 };
// Object.assign(target, source1, source2);
// console.log(target); // {a: 1, b: 2, c: 3}

// const target = { a: 1, b: 1 };
// const source1 = { b: 2, c: 2 };
// const source2 = { c: 3 };
// Object.assign(target, source1, source2);
// console.log(target); // {a: 1, b: 2, c: 3}

// const obj = { a: 1 };
// console.log(Object.assign(obj) === obj); // true
// console.log(Object.assign(obj, undefined) === obj); // true
// console.log(Object.assign(obj, null) === obj); // true

// const v1 = 'abc';
// const v2 = true;
// const v3 = 10;
// const obj = Object.assign({}, v1, v2, v3);
// console.log(obj); // {0: "a", 1: "b", 2: "c"}
// console.log(Object(true)); // Boolean {true}
// console.log(Object(10)); // Number {10}
// console.log(Object('abc')); // String {"abc"}

// Object.assign方法实行的是浅拷贝，而不是深拷贝
// const target = { a: { b: 'c', d: 'e' } };
// const source = { a: { b: 'hello' } };
// Object.assign(target, source);
// console.log(target); // { a: {b: "hello"} }

// console.log(Object.assign([1, 2, 3], [4, 5])); // [4, 5, 3]

// const source = {
//   get foo() {
//     return 1;
//   }
// };
// const target = {};
// console.log(Object.assign(target, source)); // {foo: 1}

// function clone(origin) {
//   let originProto = Object.getPrototypeOf(origin);
//   return Object.assign(Object.create(originProto), origin);
// }

// const o = Object.setPrototypeOf({}, null);
// console.log(o); // {}

// console.log(Object.setPrototypeOf(1, {}) === 1); // true
// console.log(Object.setPrototypeOf('foo', {}) === 'foo'); // true
// console.log(Object.setPrototypeOf(true, {}) === true); // true

// console.log(Object.getPrototypeOf(1)); // Number {[[PrimitiveValue]]: 0}
// console.log(Object.getPrototypeOf('foo')); // String {length: 0, [[PrimitiveValue]]: ""}
// console.log(Object.getPrototypeOf(true)); // Boolean {[[PrimitiveValue]]: false}

// var obj = { foo: 'bar', baz: 42 };
// console.log(Object.keys(obj)); // ["foo", "baz"]

// Object.keys()，Object.values()，Object.entries()
// let { keys, values, entries } = Object;
// let obj = { a: 1, b: 2, c: 3 };
// for (let key of keys(obj)) {
//   console.log(key); // 'a', 'b', 'c'
// }
// for (let value of values(obj)) {
//   console.log(value); // 1, 2, 3
// }
// for (let [key, value] of entries(obj)) {
//   console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
// }

// Object.values只返回对象自身的可遍历属性
// const obj = Object.create({}, { p: { value: 42 } });
// console.log(Object.values(obj)); // []

// const obj = Object.create(
//   {},
//   {
//     p: {
//       value: 42,
//       enumerable: true
//     }
//   }
// );
// console.log(Object.values(obj)); // [42]

// console.log(Object.fromEntries([['foo', 'bar'], ['baz', 42]]));
// {foo: "bar", baz: 42}

// const map = new Map().set('foo', true).set('bar', false);
// console.log(Object.fromEntries(map));
// {foo: true, bar: false}

// let a = new URLSearchParams('foo=bar&baz=qux');
// let b = Object.fromEntries(a);
// console.log(a); // URLSearchParams {}
// console.log(b); // {foo: "bar", baz: "qux"}
