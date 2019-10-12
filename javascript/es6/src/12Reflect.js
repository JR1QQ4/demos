// Reflect

// 老写法
// try {
//   Object.defineProperty(target, property, attributes);
// } catch (e) {}

// 新写法
// if (Reflect.defineProperty(target, property, attributes)) {
//   // success
// } else {
//   // failure
// }

// 老写法
// 'assign' in Object; // true

// 新写法
// Reflect.has(Object, 'assign'); // true

// 老写法
// Function.prototype.apply.call(Math.floor, undefined, [1.75]); // 1

// 新写法
// Reflect.apply(Math.floor, undefined, [1.75]); // 1

// var myObject = {
//   foo: 1,
//   bar: 2,
//   get baz() {
//     return this.foo + this.bar;
//   }
// };
// console.log(Reflect.get(myObject, 'foo')); // 1
// console.log(Reflect.get(myObject, 'bar')); // 2
// console.log(Reflect.get(myObject, 'baz')); // 3

// var myObject = {
//   foo: 1,
//   bar: 2,
//   get baz() {
//     return this.foo + this.bar;
//   }
// };
// var myReceiverObject = {
//   foo: 4,
//   bar: 4
// };
// console.log(Reflect.get(myObject, 'baz', myReceiverObject)); // 8

// 如果第一个参数不是对象，Reflect.get方法会报错
// Reflect.get(1, 'foo');
// Reflect.get(false, 'foo');

// var myObject = {
//   foo: 1,
//   set bar(value) {
//     return (this.foo = value);
//   }
// };
// console.log(myObject.foo); // 1
// Reflect.set(myObject, 'foo', 2);
// console.log(myObject.foo); // 2

// var myObject = {
//   foo: 4,
//   set bar(value) {
//     return (this.foo = value);
//   }
// };
// var myReceiverObject = {
//   foo: 0
// };
// Reflect.set(myObject, 'bar', 1, myReceiverObject);
// console.log(myObject.foo); // 4

// let p = {
//   a: 'a'
// };
// let handler = {
//   set(target, key, value, receiver) {
//     console.log('set');
//     Reflect.set(target, key, value, receiver);
//   },
//   defineProperty(target, key, attribute) {
//     console.log('defineProperty');
//     Reflect.defineProperty(target, key, attribute);
//   }
// };
// let obj = new Proxy(p, handler);
// obj.a = 'A'; // set defineProperty

// let p = {
//   a: 'a'
// };
// let handler = {
//   set(target, key, value, receiver) {
//     console.log('set');
//     Reflect.set(target, key, value);
//   },
//   defineProperty(target, key, attribute) {
//     console.log('defineProperty');
//     Reflect.defineProperty(target, key, attribute);
//   }
// };
// let obj = new Proxy(p, handler);
// obj.a = 'A'; // set

// const myObj = { foo: 'bar' };
// 旧写法
// delete myObj.foo;
// 新写法
// Reflect.deleteProperty(myObj, 'foo');

// function Greeting(name) {
//   this.name = name;
// }
// new 的写法
// const instance = new Greeting('张三');

// Reflect.construct 的写法
// const instance = Reflect.construct(Greeting, ['张三']);
// console.log(instance); // {name: "张三"}
