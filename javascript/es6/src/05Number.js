// 二进制
// let binary = 0b111110111;
// console.log(binary === 503); // true

// 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示
// 八进制
// let octal = 0o666;
// console.log(octal === 438); // true

// 将0b和0o前缀的字符串数值转为十进制
// console.log(Number('0b111')); // 7
// console.log(Number('0o10')); // 8

// 是不是数字
// let a = 11 / 4;
// console.log(Number.isFinite(a)); // true
// console.log(Number.isFinite(undefined)); // false
// console.log(Number.isFinite(null)); // false
// console.log(Number.isFinite('str')); // false
// console.log(Number.isFinite(123)); // true
// console.log(Number.isFinite(Infinity)); // false

// 是不是NaN
// console.log(Number.isNaN(NaN)); // true
// console.log(Number.isNaN(15)); // false
// console.log(Number.isNaN(true)); // false
// console.log(Number.isNaN(9 / NaN)); // true
// console.log(Number.isNaN('true' / 0)); // true

// ES5 与 ES6 差别
// console.log(isFinite(25)); // true
// console.log(isFinite('25')); // true
// console.log(Number.isFinite("25")); // false
// console.log(isNaN(NaN)); // true
// console.log(isNaN('NaN')); // true
// console.log(Number.isNaN("NaN")); // false

// console.log(parseInt('12.35')); // 12
// console.log(parseFloat('12.35a')); // 12.35
// console.log(Number.parseInt('12.34')); // 12
// console.log(Number.parseFloat('12.34#')); // 12.35

// 是不是整数
// console.log(Number.isInteger(123)); // true
// console.log(Number.isInteger(123.12)); // false
// console.log(Number.isInteger(123.0)); // true

// JavaScript 能够表示的最小精度
// console.log(Number.EPSILON);
// console.log(Number.EPSILON === Math.pow(2, -52)); // true
// console.log(0.1 + 0.2 - 0.3); // 5.551115123125783e-17
// console.log((5.551115123125783e-17).toFixed(20));
// console.log(0.1 + 0.2 === 0.3); // false

// Number.EPSILON可以用来设置“能够接受的误差范围”,误差范围设为 2 的-50 次方
// console.log(5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)); // true

// JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点）
// console.log(Math.pow(2, 53)); // 9007199254740992
// console.log(Math.pow(2, 53) + 1); // 9007199254740992
// console.log(Math.pow(2, 53) - 1); // 9007199254740991
// console.log(Math.pow(2, -53)); // 1.1102230246251565e-16

// 最大和最小安全整数
// console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
// console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
// console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true

// 是不是安全整数
// console.log(Number.isSafeInteger(Math.pow(2, 53) - 1)); // true
// console.log(Number.isSafeInteger(Math.pow(2, 53))); // false
// console.log(Number.isSafeInteger(1.2)); // false
// console.log(Number.isSafeInteger(-1.2)); // false

// Number.isSafeInteger = function(n) {
//   return (
//     typeof n === 'number' &&
//     Math.round(n) === n &&
//     Number.MIN_SAFE_INTEGER <= n &&
//     n <= Number.MAX_SAFE_INTEGER
//   );
// };

// console.log(9007199254740993 - 990); // 9007199254740002

// 去除小数部分
// console.log(Math.trunc(4.1)); // 4
// console.log(Math.trunc(-4.9)); // -4
// console.log(Math.trunc(true)); // 1
// console.log(Math.trunc(false)); // 0
// console.log(Math.trunc(null)); // 0
// console.log(Math.trunc(undefined)); // NaN
// console.log(Math.trunc('213')); // 213

//判断正数、负数、零
// console.log(Math.sign(-5)); // -1
// console.log(Math.sign(0)); // 0
// console.log(Math.sign(-0)); // -0
// console.log(Math.sign(5)); // 1
// console.log(Math.sign(null)); // 0
// console.log(Math.sign(NaN)); // NaN
// console.log(Math.sign(undefined)); // NaN
// console.log(Math.sign('123')); // 1

// 计算一个数的立方根
// console.log(Math.cbrt(-1)); // -1
// console.log(Math.cbrt(0)); // 0
// console.log(Math.cbrt(2)); // 1.2599210498948732
// console.log(Math.cbrt(1)); // 1

// 将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0
// console.log(Math.clz32(0)); // 32
// console.log(Math.clz32(1)); // 31
// console.log(Math.clz32(10)); // 28
// console.log(Math.clz32(0b01000000000000000000000000000000)); // 1

// 返回两个数以 32 位带符号整数形式相乘的结果
// console.log(Math.imul(2, 4)); // 8
// console.log(Math.imul(-1, 8)); // -8
// console.log(Math.imul(-2, -2)); // 4

// 将64位双精度浮点数转为32位单精度浮点数
// console.log(Math.fround(0)); // 0
// console.log(Math.fround(1)); // 1
// console.log(Math.fround(2 ** 24 - 1)); // 16777215
// console.log(Math.fround(2 ** 24 + 1)); // 16777216
// console.log(Math.fround(2 ** 24)); // 16777216

// 返回所有参数的平方和的平方根
// console.log(Math.hypot(3, 4)); // 5

// 返回 ex - 1，即Math.exp(x) - 1
// console.log(Math.expm1(-1)); // -0.6321205588285577
// console.log(Math.expm1(0)); // 0
// console.log(Math.expm1(1)); // 1.718281828459045

// 返回1 + x的自然对数，即Math.log(1 + x)
// console.log(Math.log1p(1)); // 0.6931471805599453
// console.log(Math.log1p(0)); // 0

// console.log(Math.log10(1)); // 0
// console.log(Math.log10(10)); // 1

// console.log(Math.log2(1)); // 0
// console.log(Math.log2(2)); // 1

// console.log(2 ** (3 ** 2)); // 512
