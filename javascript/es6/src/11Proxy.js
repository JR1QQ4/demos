// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
// 所以属于一种“元编程”（meta programming），即对编程语言进行编程。

// let obj = new Proxy(
//   {},
//   {
//     get: function(target, key, receiver) {
//       console.log(`getting ${key}!`);
//       return Reflect.get(target, key, receiver);
//     },
//     set: function(target, key, value, receiver) {
//       console.log(`setting ${key}!`);
//       return Reflect.set(target, key, value, receiver);
//     }
//   }
// );
// console.log(obj); // Proxy {}
// obj.count = 1; // setting count!
// ++obj.count; // getting count! setting count!
// console.log(obj.count); // 2

// var target = {};
// var handler = {};
// var proxy = new Proxy(target, handler);
// proxy.a = 'b';
// console.log(target.a); // b
