// const fs = require('fs');

// const readFile = function(fileName) {
//   return new Promise(function(resolve, reject) {
//     fs.readFile(fileName, function(error, data) {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
// };

//  Generator 函数，依次读取两个文件
// const gen = function*() {
//   const f1 = yield readFile('/etc/fstab');
//   const f2 = yield readFile('/etc/shells');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };

// gen函数写成async函数
// const asyncReadFile = async function() {
//   const f1 = await readFile('/etc/fstab');
//   const f2 = await readFile('/etc/shells');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };

// 指定 50 毫秒以后，输出hello world
// function timeout(ms) {
//   return new Promise(resolve => {
//     setTimeout(resolve, ms);
//   });
// }
// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value);
// }
// asyncPrint('hello world', 50); // hello world

// 等同
// async function timeout(ms) {
//   await new Promise(resolve => {
//     setTimeout(resolve, ms);
//   });
// }
// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value);
// }
// asyncPrint('hello world', 50); // hello world

// async function f() {
//   return 'hello world';
// }
// f().then(v => console.log(v)); // hello world

// async function getTitle(url) {
//   let response = await fetch(url);
//   let html = await response.text();
//   return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }
// getTitle('https://tc39.github.io/ecma262/').then(console.log);

// async function f() {
//   try {
//     await Promise.reject('出错了');
//   } catch (e) {}
//   return await Promise.resolve('hello world');
// }
// f().then(v => console.log(v)); // hello world
