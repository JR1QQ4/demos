// Generator 函数是 ES6 提供的一种异步编程解决方案
// 两个特征：
// 一是，function关键字与函数名之间有一个星号
// 二是，函数体内部使用yield表达式，定义不同的内部状态，产出

// function* helloWorldGenerator() {
//   yield 'hello';
//   yield 'world';
//   return 'ending';
// }
// var hw = helloWorldGenerator();
// console.log(hw); // helloWorldGenerator {<suspended>}
// console.log(hw.next()); // {value: "hello", done: false}

// var arr = [1, [[2, 3], 4], [5, 6]];
// var flat = function*(a) {
//   var length = a.length;
//   for (var i = 0; i < length; i++) {
//     var item = a[i];
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   }
// };
// for (var f of flat(arr)) {
//   console.log(f); // 1 2 3 4 5 6
// }

// function* demo() {
//   // console.log('Hello' + yield); // SyntaxError
//   // console.log('Hello' + yield 123); // SyntaxError

//   console.log('Hello' + (yield)); // OK
//   console.log('Hello' + (yield 123)); // OK
// }

// var myIterable = {};
// myIterable[Symbol.iterator] = function*() {
//   yield 1;
//   yield 2;
//   yield 3;
// };
// console.log([...myIterable]); // [1, 2, 3]

// function* fibonacci() {
//   let [prev, curr] = [0, 1];
//   for (;;) {
//     yield curr;
//     [prev, curr] = [curr, prev + curr];
//   }
// }
// for (let n of fibonacci()) {
//   if (n > 20) break;
//   console.log(n); // 1 1 2 3 5 8 13
// }

// function* numbers() {
//   yield 1;
//   yield 2;
//   return 3;
//   yield 4;
// }
// console.log([...numbers()]); // [1, 2]

// function* gen() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// var g = gen();
// console.log(g.next()); // { value: 1, done: false }
// console.log(g.return()); // {value: undefined, done: true}

// next()是将yield表达式替换成一个值
// throw()是将yield表达式替换成一个throw语句
// return()是将yield表达式替换成一个return语句
