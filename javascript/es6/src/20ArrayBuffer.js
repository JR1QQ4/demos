// 相等运算符（==）
// 判断一共有 12 步:
// 1.如果x不是正常值（比如抛出一个错误），中断执行。
// 2.如果y不是正常值，中断执行。
// 3.如果Type(x)与Type(y)相同，执行严格相等运算x === y。
// 4.如果x是null，y是undefined，返回true。
// 5.如果x是undefined，y是null，返回true。
// 6.如果Type(x)是数值，Type(y)是字符串，返回x == ToNumber(y)的结果。
// 7.如果Type(x)是字符串，Type(y)是数值，返回ToNumber(x) == y的结果。
// 8.如果Type(x)是布尔值，返回ToNumber(x) == y的结果。
// 9.如果Type(y)是布尔值，返回x == ToNumber(y)的结果。
// 10.如果Type(x)是字符串或数值或Symbol值，Type(y)是对象，返回x == ToPrimitive(y)的结果。
// 11.如果Type(x)是对象，Type(y)是字符串或数值或Symbol值，返回ToPrimitive(x) == y的结果。
// 12.返回false。

// 二进制数组由三类对象组成：
// （1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
// （2）TypedArray视图：共包括 9 种类型的视图
// （3）DataView视图：可以自定义复合格式的视图

// const buf = new ArrayBuffer(32);
// const dataView = new DataView(buf);
// console.log(dataView.getUint8(0));; // 0
// console.log(buf);
// console.log(dataView);

// let xhr = new XMLHttpRequest();
// xhr.open('GET', someUrl);
// xhr.responseType = 'arraybuffer';
// xhr.onload = function() {
//   let arrayBuffer = xhr.response;
//   // ···
// };
// xhr.send();

// xhr.onreadystatechange = function() {
//   if (req.readyState === 4) {
//     const arrayResponse = xhr.response;
//     const dataView = new DataView(arrayResponse);
//     const ints = new Uint32Array(dataView.byteLength / 4);

//     xhrDiv.style.backgroundColor = '#00FF00';
//     xhrDiv.innerText = 'Array is ' + ints.length + 'uints long';
//   }
// };

// WebSocket
// let socket = new WebSocket('ws://127.0.0.1:8081');
// socket.binaryType = 'arraybuffer';

// // Wait until socket is open
// socket.addEventListener('open', function(event) {
//   // Send binary data
//   const typedArray = new Uint8Array(4);
//   socket.send(typedArray.buffer);
// });

// // Receive binary data
// socket.addEventListener('message', function(event) {
//   const arrayBuffer = event.data;
//   // ···
// });

// Fetch
// fetch(url)
//   .then(function(response) {
//     return response.arrayBuffer();
//   })
//   .then(function(arrayBuffer) {
//     // ...
//   });

// File API
// const fileInput = document.getElementById('fileInput');
// const file = fileInput.files[0];
// const reader = new FileReader();
// reader.readAsArrayBuffer(file);
// reader.onload = function() {
//   const arrayBuffer = reader.result;
//   // ···
// };

// function processimage(e) {
//   const buffer = e.target.result;
//   const datav = new DataView(buffer);
//   const bitmap = {};
//   // 具体的处理步骤
// }
