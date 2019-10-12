// 防止属性名的冲突,ES6 引入Symbol
// JavaScript 七种原始数据类型:
//   undefined、
//   null、
//   布尔值（Boolean）、
//   字符串（String）、
//   数值（Number）、
//   对象（Object）
//   Symbol

// let f = Symbol();
// console.log(typeof f); // symbol

// console.log(Symbol(123)); // Symbol(123)
// console.log(Symbol('symbol')); // Symbol(symbol)
// console.log(Symbol('symbol').toString()); // "Symbol(symbol)"

// 参数是一个对象，就会调用该对象的 toString 方法
// const obj = {
//   toString() {
//     return 'abc';
//   }
// };
// const sym = Symbol(obj);
// console.log(sym); // Symbol(abc)

// let s1 = Symbol();
// let s2 = Symbol();
// console.log(s1 === s2); // false

// let sym = Symbol('My symbol');
// console.log('your symbol is ' + sym);
// Cannot convert a Symbol value to a string

// let sym = Symbol();
// console.log(Boolean(sym)); // true

// const sym = Symbol('foo');
// console.log(sym.description); // foo

// 作为属性名,Symbol 值作为对象属性名时，不能用点运算符
// let mySymbol = Symbol();
// let a = {};
// a[mySymbol] = 'Hello!';
// console.log(a); // {Symbol(): "Hello!"}
// let b = {
//   [mySymbol]: 'Hello!'
// };
// console.log(b); // {Symbol(): "Hello!"}
// let c = {};
// Object.defineProperty(c, mySymbol, { value: 'Hello!' });
// console.log(c); // {Symbol(): "Hello!"}

// const log = {};
// log.levels = {
//   DEBUG: Symbol('debug'),
//   INFO: Symbol('info'),
//   WARN: Symbol('warn')
// };
// console.log(log.levels.DEBUG); // Symbol(debug)
// console.log(log.levels.INFO); // Symbol(info)
// console.log(log.levels.WARN); // Symbol(warn)

// const obj = {};
// let a = Symbol('a');
// let b = Symbol('b');
// obj[a] = 'Hello';
// obj[b] = 'World';
// const objectSymbols = Object.getOwnPropertySymbols(obj);
// console.log(objectSymbols); // [Symbol(a), Symbol(b)]

// let obj = {
//   [Symbol('my_key')]: 1,
//   enum: 2,
//   nonEnum: 3
// };
// console.log(Reflect.ownKeys(obj)); // ["enum", "nonEnum", Symbol(my_key)]

// let obj1 = {
//   name: 'zs',
//   skill: 'web'
// };
// let age = Symbol();
// obj1[age] = 18;
// for (const item in obj1) {
//   console.log(obj1[item]); // zs web
// }
// console.log(obj1); // {name: "zs", skill: "web", Symbol(): 18}
// console.log(obj1[age]); // 18

// let s1 = Symbol.for('foo');
// let s2 = Symbol.for('foo');
// console.log(s1); // Symbol(foo)
// console.log(s1 === s2); // true

// let s1 = Symbol.for('foo');
// console.log(Symbol.keyFor(s1)); // foo

// function A() {
//   this.foo = 'hello';
// }
// if (!global._foo) {
//   global._foo = new A();
// }
// console.log(global._foo); // {foo: "hello"}

// const FOO_KEY = Symbol.for('foo');
// function A() {
//   this.foo = 'hello';
// }
// if (!global[FOO_KEY]) {
//   global[FOO_KEY] = new A();
// }
// console.log(global[FOO_KEY]); // {foo: "hello"}

// class MyClass {
//   [Symbol.hasInstance](foo) {
//     return foo instanceof Array;
//   }
// }
// console.log([1, 2, 3] instanceof new MyClass()); // true

// let obj = { length: 2, 0: 'c', 1: 'd' };
// console.log(['a', 'b'].concat(obj, 'e')); // ['a', 'b', obj, 'e']
