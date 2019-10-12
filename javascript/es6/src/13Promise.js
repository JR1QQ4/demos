// Promise对象有以下两个特点:
// (1)对象的状态不受外界影响;有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
// (2)一旦状态改变，就不会再变;Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected

// const promise = new Promise(function(resolve, reject) {
//     // ... some code
//     if (/* 异步操作成功 */){
//       resolve(value);
//     } else {
//       reject(error);
//     }
//   });

// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done');
//   });
// }
// timeout(100).then(value => {
//   console.log(value); // done
// });

// var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);
// param1, ..., paramN 附加参数，一旦定时器到期，它们会作为参数传递给function

// let promise = new Promise(function(resolve, reject) {
//   console.log('Promise');
//   resolve();
// });
// promise.then(function() {
//   console.log('resolved.');
// });
// console.log('Hi!');
// Promise
// Hi!
// resolved

// 异步加载图片
// function loadImageAsync(url) {
//   return new Promise(function(resolve, reject) {
//     const image = new Image();

//     image.onload = function() {
//       resolve(image);
//     };

//     image.onerror = function() {
//       reject(new Error('Could not load image at ' + url));
//     };

//     image.src = url;
//   });
// }

// 用Promise对象实现的 Ajax 操作
// const getJSON = function(url) {
//   const promise = new Promise(function(resolve, reject) {
//     const handler = function() {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.status === 200) {
//         resolve(this.response);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     };
//     const client = new XMLHttpRequest();
//     client.open('GET', url);
//     client.onreadystatechange = handler;
//     client.responseType = 'json';
//     client.setRequestHeader('Accept', 'application/json');
//     client.send();
//   });

//   return promise;
// };
// getJSON('/posts.json').then(
//   function(json) {
//     console.log('Contents: ' + json);
//   },
//   function(error) {
//     console.error('出错了', error);
//   }
// );

// const p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => reject(new Error('fail')), 3000);
// });
// const p2 = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve(p1), 1000);
// });
// p2.then(result => console.log(result)).catch(error => console.log(error));
// Error: fail

// new Promise((resolve, reject) => {
//   resolve(1);
//   console.log(2);
// }).then(r => {
//   console.log(r);
// }); // 2 1

// p.then(val => console.log('fulfilled:', val)).catch(err =>
//   console.log('rejected', err)
// );

// 等同于
// p.then(val => console.log('fulfilled:', val)).then(null, err =>
//   console.log('rejected:', err)
// );

// 写法一
// const promise = new Promise(function(resolve, reject) {
//   try {
//     throw new Error('test');
//   } catch (e) {
//     reject(e);
//   }
// });
// promise.catch(function(error) {
//   console.log(error);
// });

// 写法二
// const promise = new Promise(function(resolve, reject) {
//   reject(new Error('test'));
// });
// promise.catch(function(error) {
//   console.log(error);
// });

// bad
// promise.then(
//   function(data) {
//     // success
//   },
//   function(err) {
//     // error
//   }
// );

// good
// promise
//   .then(function(data) {
//     //cb
//     // success
//   })
//   .catch(function(err) {
//     // error
//   });

// const promise = new Promise(function(resolve, reject) {
//   resolve('ok');
//   setTimeout(function() {
//     throw new Error('test');
//   }, 0);
// });
// promise.then(function(value) {
//   console.log(value);
// }); // ok   Uncaught Error: test

// Promise.resolve()
//   .catch(function(error) {
//     console.log('oh no', error);
//   })
//   .then(function() {
//     console.log('carry on');
//   }); // carry on

// promise
// .then(result => {···})
// .catch(error => {···})
// .finally(() => {···});

// Promise.all()
// p1、p2、p3都是 Promise 实例
// 如果不是，就会先调用下面讲到的Promise.resolve方法
// Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例

// 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled
// 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected
// const p = Promise.all([p1, p2, p3]);

// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
// })
//   .then(result => result)
//   .catch(e => e);
// const p2 = new Promise((resolve, reject) => {
//   throw new Error('报错了');
// })
//   .then(result => result)
//   .catch(e => e);
// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(e => console.log(e));
// ["hello", Error: 报错了]

// 如果p2没有自己的catch方法，就会调用Promise.all()的catch方法
// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
// }).then(result => result);
// const p2 = new Promise((resolve, reject) => {
//   throw new Error('报错了');
// }).then(result => result);
// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(e => console.log(e));
// Error: 报错了

// Promise.race()
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变
// 如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve
// const p = Promise.race([p1, p2, p3]);

// ，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数
// const p = Promise.race([
//     // h5 方法，用于发送请求，返回一个 promise 对象
//   fetch('/resource-that-may-take-a-while'),
//   new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error('request timeout')), 5000);
//   })
// ]);
// p.then(console.log).catch(console.error);

// Promise.any()
// 只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled

// const promises = [
//   fetch('/endpoint-a').then(() => 'a'),
//   fetch('/endpoint-b').then(() => 'b'),
//   fetch('/endpoint-c').then(() => 'c')
// ];
// try {
//   const first = await Promise.any(promises);
//   console.log(first);
// } catch (error) {
//   console.log(error);
// }

// var resolved = Promise.resolve(42);
// var rejected = Promise.reject(-1);
// var alsoRejected = Promise.reject(Infinity);
// Promise.any([resolved, rejected, alsoRejected]).then(function(result) {
//   console.log(result); // 42
// });
// Promise.any([rejected, alsoRejected]).catch(function(results) {
//   console.log(results); // [-1, Infinity]
// });

// Promise.resolve('foo');
// 等价于
// new Promise(resolve => resolve('foo'));

// const p = Promise.reject('出错了');
// 等同于
// const p = new Promise((resolve, reject) => reject('出错了'))

// const preloadImage = function(path) {
//   return new Promise(function(resolve, reject) {
//     const image = new Image();
//     image.onload = resolve;
//     image.onerror = reject;
//     image.src = path;
//   });
// };
