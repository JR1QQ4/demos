// {
//   let a = 10;
//   var b = 1;
// }
// console.log(a); // a is not defined
// console.log(b);

// let arr1 = [];
// let arr2 = [];
// for (var i = 0; i < 3; i++) {
//     arr1[i] = () => {console.log(i);}
// }
// for (let j = 0; j < 3; j++) {
//     arr2[j] = () => {console.log(j);}
// }
// arr1[1](); // 3
// arr2[1](); // 1
// console.log(i);
// console.log(j); // j is not defined

// for (let k = 0; k < 3; k++) {
//   let k = 'abc';
//   console.log(k); // abc abc abc
// }

// console.log(foo);
// console.log(bar); // 报错ReferenceError
// var foo = 2;
// let bar = 2;

// var tmp = 123;
// if (true) {
//   tmp = 'abc'; // ReferenceError
//   let tmp;
// }

// console.log(typeof x); // ReferenceError
// let x;

// console.log(typeof undeclared_variable); // undefined

// let y = y;

// function func(arg) {
//   let arg;
// }
// func() // 报错

// function f1() {
//   let n = 5;
//   if (true) {
//     let n = 10;
//   }
//   console.log(n); // 5
// }
// f1();

// function f() {
//   console.log('I am outside!');
// }
// (function () {
//   if (false) {
//     function f() {
//       console.log('I am inside!');
//     }
//   }
//   f();
// }());

// 块级作用域内部，优先使用函数表达式
// {
//   let a = 'secret';
//   let f = function () {
//     return a;
//   };
// }

// const PI = 3.1415;
// console.log(PI); // 3.1415
// PI = 3; // "PI" is read-only

// if (true) {
//   console.log(MAX); // ReferenceError
//   const MAX = 5;
// }

// var message = "Hello!";
// let age = 25;
// const message = "Goodbye!"; //Identifier 'message' has already been declared
// const age = 30; // Identifier 'age' has already been declared

// const foo = {};
// foo.prop = 123;
// console.log(foo);

// const a = [];
// a.push('Hello'); // 可执行
// a.length = 0;    // 可执行
// a = ['Dave'];    // 报错

// let b = 1;
// console.log(window.b); // undefined

// var getGlobal = function () {
//   if (typeof self !== 'undefined') {
//     return self;
//   }
//   if (typeof window !== 'undefined') {
//     return window;
//   }
//   if (typeof global !== 'undefined') {
//     return global;
//   }
//   throw new Error('unable to locate global object');
// };
// console.log(getGlobal());
