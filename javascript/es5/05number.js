// var n = new Number(1);
// console.log(typeof n); // "object"
// console.log(Number(true)); // 1

// 静态属性
// console.log(Number.POSITIVE_INFINITY); // Infinity
// console.log(Number.NEGATIVE_INFINITY); // -Infinity
// console.log(Number.NaN); // NaN
// console.log(Number.MIN_VALUE); // 5e-324
// console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
// console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

/**
 * 实例方法:
 * Number.prototype.toString()
 * Number.prototype.toFixed()
 * Number.prototype.toExponential()
 * Number.prototype.toPrecision()
 */
// console.log((10).toString(2)); // "1010"
// console.log((10).toString(8)); // "12"
// console.log((10).toString(16)); // "a"
// console.log(10.5.toString(2)); // 1010.1

// 由于浮点数的原因，小数5的四舍五入是不确定的
// console.log((10).toFixed(2)); // 10.00
// console.log(10.005.toFixed(2)); // 10.01
// console.log((10.055).toFixed(2)); // 10.05

// console.log((10).toExponential()); // "1e+1"
// console.log((10).toExponential(1)); // "1.0e+1"
// console.log((10).toExponential(2)); // "1.00e+1"
// console.log((1234).toExponential());  // "1.234e+3"
// console.log((1234).toExponential(1)); // "1.2e+3"
// console.log((1234).toExponential(2)); // "1.23e+3"

// toPrecision方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关
// console.log((12.34).toPrecision(1)); // "1e+1"
// console.log((12.34).toPrecision(2)); // "12"
// console.log((12.34).toPrecision(3)); // "12.3"
// console.log((12.34).toPrecision(4)); // "12.34"
// console.log((12.34).toPrecision(5)); // "12.340"

// 自定义方法
// Number.prototype.add = function (x) {
//     return this + x;
// };
// console.log(8['add'](2)); // 10

// Number.prototype.subtract = function (x) {
//     return this - x;
// };
// console.log((8).add(2).subtract(4)); // 6

// Number.prototype.iterate = function () {
//     var result = [];
//     for (var i = 0; i <= this; i++) {
//       result.push(i);
//     }
//     return result;
// };
// console.log((8).iterate()); // [0, 1, 2, 3, 4, 5, 6, 7, 8]




