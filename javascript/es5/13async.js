/**
 * 异步操作
 * 单线程模型: avaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。
 * 程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）
 * 任务队列（task queue）和事件循环（Event Loop）
 * 回调函数是异步操作最基本的方法
 * 事件监听，采用事件驱动模式，异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
 * ”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）
 */

// 异步操作的流程控制
// function async(arg, callback) {
//     console.log('参数为 ' + arg + ' , 1秒后返回结果');
//     setTimeout(function () { callback(arg * 2); }, 1000);
// }
// function final(value) {
//     console.log('完成: ', value);
// }
// async(1, function (value) {
//     async(2, function (value) {
//         async(3, function (value) {
//             async(4, function (value) {
//                 async(5, function (value) {
//                     async(6, final);
//                 });
//             });
//         });
//     });
// });

// 串行执行，需要六秒，才能完成整个脚本
// var items = [1, 2, 3, 4, 5, 6];
// var results = [];
// function async(arg, callback) {
//     console.log('参数为 ' + arg + ' , 1秒后返回结果');
//     setTimeout(function () { callback(arg * 2); }, 1000);
// }
// function final(value) {
//     console.log('完成: ', value);
// }
// function series(item) {
//     if (item) {
//         async(item, function (result) {
//             results.push(result);
//             return series(items.shift());
//         });
//     } else {
//         return final(results[results.length - 1]);
//     }
// }
// series(items.shift());

// 并行执行， 只要一秒，就能完成整个脚本。
// var items = [1, 2, 3, 4, 5, 6];
// var results = [];
// function async(arg, callback) {
//     console.log('参数为 ' + arg + ' , 1秒后返回结果');
//     setTimeout(function () { callback(arg * 2); }, 1000);
// }
// function final(value) {
//     console.log('完成: ', value);
// }
// items.forEach(function (item) {
//     async(item, function (result) {
//         results.push(result);
//         if (results.length === items.length) {
//             final(results[results.length - 1]);
//         }
//     })
// });

// 并行与串行的结合
// var items = [1, 2, 3, 4, 5, 6];
// var results = [];
// var running = 0;
// var limit = 2;
// function async(arg, callback) {
//     console.log('参数为 ' + arg + ' , 1秒后返回结果');
//     setTimeout(function () { callback(arg * 2); }, 1000);
// }
// function final(value) {
//     console.log('完成: ', value);
// }
// function launcher() {
//     while (running < limit && items.length > 0) {
//         var item = items.shift();
//         async(item, function (result) {
//             results.push(result);
//             running--;
//             if (items.length > 0) {
//                 launcher();
//             } else if (running == 0) {
//                 final(results);
//             }
//         });
//         running++;
//     }
// }
// launcher();

/**
 * 定时器
 */
// console.log(1);
// setTimeout('console.log(2)',1000);
// console.log(3);

// setTimeout(function (a, b) {
//     console.log(a + b);
// }, 1000, 1, 1); // 2

// var x = 1;
// var obj = {
//     x: 2,
//     y: function () {
//         console.log(this.x);
//     }
// };
// setTimeout(obj.y, 1000) // 1
// setTimeout(function () {
//     obj.y();
// }, 1000); // 2
// setTimeout(obj.y.bind(obj), 1000); // 2

// setInterval的一个常见用途是实现轮询
// var hash = window.location.hash;
// var hashWatcher = setInterval(function () {
//     if (window.location.hash != hash) {
//         updatePage();
//     }
// }, 1000);

// 为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间
// var i = 1;
// var timer = setTimeout(function f() {
//   // ...
//   timer = setTimeout(f, 2000);
// }, 2000);

// 连续调用三次setTimeout，返回值都比上一次大了1
// function f() {}
// console.log(setTimeout(f, 1000)); // 2
// console.log(setTimeout(f, 1000)); // 3
// console.log(setTimeout(f, 1000)); // 4

// (function () {
//     // 每轮事件循环检查一次
//     var gid = setInterval(clearAllTimeouts, 0); // 2
//     console.log("gid:" + gid);
//     function clearAllTimeouts() {
//         var id = setTimeout(function () { }, 0);
//         console.log("id:" + id);
//         while (id > 0) {
//             if (id !== gid) {
//                 clearTimeout(id);
//             }
//             id--;
//         }
//     }
// })();

/**
 * debounce（防抖动）不希望回调函数被频繁调用
 * 比如，用户填入网页输入框的内容，希望通过 Ajax 方法传回服务器
 */
// $('textarea').on('keydown', debounce(ajaxAction, 2500));
// function debounce(fn, delay) {
//     var timer = null; // 声明计时器
//     return function () {
//         var context = this;
//         var args = arguments;
//         clearTimeout(timer);
//         timer = setTimeout(function () {
//             fn.apply(context, args);
//         }, delay);
//     };
// }

/**
 * 运行机制
 */
// setInterval必须推迟到3000毫秒之后才开始生效
// setInterval(function () {
//     console.log(2);
// }, 1000);
// sleep(3000);
// function sleep(ms) {
//     var start = Date.now();
//     while ((Date.now() - start) < ms) {
//         console.log((Date.now() - start));
//     }
// }

// HTML 代码如下
// <input type="button" id="myButton" value="click">
// ，先触发回调函数A，然后触发函数C。函数A中，setTimeout将函数B推迟到下一轮事件循环执行，这样就起到了，先触发父元素的回调函数C的目的了
// var input = document.getElementById('myButton');
// input.onclick = function A() {
//     setTimeout(function B() {
//         input.value += ' input';
//     }, 0)
// };
// document.body.onclick = function C() {
//     input.value += ' body'
// };


// HTML 代码如下
// <input type="text" id="input-box">
// keypress事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。
// // document.getElementById('input-box').onkeypress = function (event) {
// //     this.value = this.value.toUpperCase();
// // }
// document.getElementById('input-box').onkeypress = function () {
//     var self = this;
//     setTimeout(function () {
//         self.value = self.value.toUpperCase();
//     }, 0);
// }

// 由于setTimeout(f, 0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f, 0)里面执行。
// var div = document.getElementsByTagName('div')[0];

// // 写法一, 造成浏览器“堵塞”，因为 JavaScript 执行速度远高于 DOM，会造成大量 DOM 操作“堆积”
// for (var i = 0xA00000; i < 0xFFFFFF; i++) {
//     div.style.backgroundColor = '#' + i.toString(16);
// }

// 写法二
// var timer;
// var i = 0x100000;
// function func() {
//     timer = setTimeout(func, 0);
//     div.style.backgroundColor = '#' + i.toString(16);
//     if (i++ == 0xFFFFFF) clearTimeout(timer);
// }
// timer = setTimeout(func, 0);