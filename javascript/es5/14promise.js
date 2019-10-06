/**
 * Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。
 * 它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。
 * Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。
 */
// Promise 是一个对象，也是一个构造函数
// function f1(resolve, reject) {
//     // 异步代码...
// }
// var p1 = new Promise(f1);
// // f1的异步操作执行完成，就会执行f2
// p1.then(f2);

// // 传统写法
// step1(function (value1) {
//     step2(value1, function (value2) {
//         step3(value2, function (value3) {
//             step4(value3, function (value4) {
//                 // ...
//             });
//         });
//     });
// });
// // Promise 的写法
// (new Promise(step1))
//     .then(step2)
//     .then(step3)
//     .then(step4);

/**
 * Promise 对象的状态:
 *    异步操作未完成（pending）
 *    异步操作成功（fulfilled）
 *    异步操作失败（rejected）
 * fulfilled和rejected合在一起称为resolved（已定型）。
 *
 * 这三种的状态的变化途径只有两种:
 *    从“未完成”到“成功”
 *    从“未完成”到“失败”
 *
 * Promise 的最终结果只有两种:
 *   异步操作成功，Promise 实例传回一个值（value），状态变为fulfilled
 *   异步操作失败，Promise 实例抛出一个错误（error），状态变为rejected
 */

// 该函数的两个参数分别是resolve和reject,它们是两个函数，由 JavaScript 引擎提供，不用自己实现。
// resolve函数的作用是，将Promise实例的状态从“未完成”变为“成功”（即从pending变为fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
// reject函数的作用是，将Promise实例的状态从“未完成”变为“失败”（即从pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
// var promise = new Promise(function (resolve, reject) {
//     // ...
//     if (/* 异步操作成功 */) {
//         resolve(value);
//     } else { /* 异步操作失败 */
//         reject(new Error());
//     }
// });

// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//     });
// }
// // timeout(100)返回一个 Promise 实例。100毫秒以后，该实例的状态会变为fulfilled
// timeout(100);  

/**
 * Promise.prototype.then()
 * then方法可以接受两个回调函数，第一个是异步操作成功时（变为fulfilled状态）的回调函数
 * 第二个是异步操作失败（变为rejected）时的回调函数（该参数可以省略）
 */
// var p1 = new Promise(function (resolve, reject) {
//     resolve('成功');
// });
// p1.then(console.log, console.error);
// // "成功"

// var p2 = new Promise(function (resolve, reject) {
//     reject(new Error('失败'));
// });
// p2.then(console.log, console.error);
// // Error: 失败

// console.log只显示step3的返回值，而console.error可以显示p1、step1、step2、step3之中任意一个发生的错误
// p1
//     .then(step1)
//     .then(step2)
//     .then(step3)
//     .then(
//         console.log,
//         console.error
//     );

// 下面这四种写法都再用then方法接一个回调函数f3
// // 写法一  f3回调函数的参数，是f2函数的运行结果
// f1().then(function () {
//     return f2();
// }).then(f3);

// // 写法二 f3回调函数的参数是undefined
// f1().then(function () {
//     f2();
//     return;
// }).then(f3);

// // 写法三 f3回调函数的参数，是f2函数返回的函数的运行结果
// f1().then(f2())
//     .then(f3);

// // 写法四 与写法一只有一个差别，f2会接收到f1()返回的结果
// f1().then(f2)
//     .then(f3);

/**
 * 图片加载
 */
// var preloadImage = function (path) {
//     return new Promise(function (resolve, reject) {
//         var image = new Image();
//         image.onload = resolve;
//         image.onerror = reject;
//         image.src = path;
//     });
// };
// // onload属性会返回一个事件对象，因此第一个then()方法的回调函数，会接收到这个事件对象。该对象的target属性就是图片加载后生成的 DOM 节点
// preloadImage('https://example.com/my.jpg')
//     .then(function (e) { document.body.append(e.target) })
//     .then(function () { console.log('加载成功') })

/**
 * Promise 的回调函数属于异步任务，会在同步任务之后执行
 */
// new Promise(function (myresolve, myreject) {
//     myresolve(1);
//     // myreject("错误");
// }).then(function (s, j) {
//     console.log(s);
//     console.log(3);
//     // console.log(j);
//     return 4;
// })
//     .then(console.log);

// console.log(2); // 2  1  3  4


