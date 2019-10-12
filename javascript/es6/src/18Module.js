// 块加载方案：
// （1）CommonJS 用于服务器，运行时加载
// （2）AMD 用于浏览器
// （3）ES6 模块功能浏览器和服务器通用的模块解决方案，编译时加载

// // CommonJS模块，整体加载fs模块
// let { stat, exists, readFile } = require('fs');

// // 等同于
// let _fs = require('fs');
// let stat = _fs.stat;
// let exists = _fs.exists;
// let readfile = _fs.readfile;

// ES6模块，从fs模块加载 3 个方法，其他方法不加载
// ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入
// import { stat, exists, readFile } from 'fs';

// 由于 ES6 模块是编译时加载，使得静态分析成为可能。
// 有了它，就能进一步拓宽 JavaScript 的语法，
// 比如引入宏（macro）和类型检验（type system）

// ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
// 严格模式主要有以下限制：
//   变量必须声明后再使用
//   函数的参数不能有同名属性，否则报错
//   不能使用with语句
//   不能对只读属性赋值，否则报错
//   不能使用前缀 0 表示八进制数，否则报错
//   不能删除不可删除的属性，否则报错
//   不能删除变量delete prop，会报错，只能删除属性delete global[prop]
//   eval不会在它的外层作用域引入变量
//   eval和arguments不能被重新赋值
//   arguments不会自动反映函数参数的变化
//   不能使用arguments.callee
//   不能使用arguments.caller
//   禁止this指向全局对象
//   不能使用fn.caller和fn.arguments获取函数调用的堆栈
//   增加了保留字（比如protected、static和interface）

// ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this

// 模块功能主要由两个命令构成：export和import
// export命令用于规定模块的对外接口
// import命令用于输入其他模块提供的功能

// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;

// 等同，优先考虑
// var firstName = 'Michael';
// var lastName = 'Jackson';
// var year = 1958;
// export { firstName, lastName, year };

// export function multiply(x, y) {
//   return x * y;
// }

// function v1() { ... }
// function v2() { ... }
// // 使用as关键字重命名
// export {
//   v1 as streamV1,
//   v2 as streamV2,
//   v2 as streamLatestVersion
// };

// 报错1,没有提供对外的接口
// export 1;

// 报错2,没有提供对外的接口
// var m = 1;
// export m;

// export 必须与模块内部的变量建立一一对应关系

// 写法一
// export var m = 1;

// 写法二
// var m = 1;
// export {m};

// 写法三
// var n = 1;
// export {n as m};

// 报错
// function f() {}
// export f;

// 正确
// export function f() {}

// 正确
// function f() {}
// export { f };

// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
// export var foo = 'bar';
// setTimeout(() => (foo = 'baz'), 500);

// function foo() {
//   export default 'bar'; // SyntaxError
// }
// foo();

// import { firstName, lastName, year } from './profile.js';
// function setName(element) {
//   element.textContent = firstName + ' ' + lastName;
// }

// 使用as关键字，将输入的变量重命名
// import { lastName as surname } from './profile.js';

// import { a } from './xxx.js';
// a = {}; // Syntax Error : 'a' is read-only;

// 但是，如果a是一个对象，改写a的属性是允许的

// import后面的from指定模块文件的位置，
// 可以是相对路径，也可以是绝对路径
// .js后缀可以省略
// 如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置

// import命令具有提升效果，会提升到整个模块的头部，首先执行
// foo();
// import { foo } from 'my_module';

// 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构
// 报错
// import { 'f' + 'oo' } from 'my_module';

// 报错
// let module = 'my_module';
// import { foo } from module;

// 报错
// if (x === 1) {
//   import { foo } from 'module1';
// } else {
//   import { foo } from 'module2';
// }

// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
// import 'lodash';
// import 'lodash';

// import { foo } from 'my_module';
// import { bar } from 'my_module';

// 等同于
// import { foo, bar } from 'my_module';

// 通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，
// 但是最好不要这样做
// 因为import在静态解析阶段执行，所以它是一个模块之中最早执行的
// require('core-js/modules/es6.symbol');
// require('core-js/modules/es6.promise');
// import React from 'React';

// export function area(radius) {
//   return Math.PI * radius * radius;
// }
// export function circumference(radius) {
//   return 2 * Math.PI * radius;
// }

// 指定加载
// import { area, circumference } from './circle';
// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(14));

// 整体加载
// import * as circle from './circle';
// console.log('圆面积：' + circle.area(4));
// console.log('圆周长：' + circle.circumference(14));

// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出
// export default function() {
//   console.log('foo');
// }

// import命令，可以用任意名称指向export-default.js输出的方法
// 这时import命令后面，不使用大括号
// import customName from './export-default';
// customName();

// export default function foo() {
//   console.log('foo');
// }

// 或者写成
// function foo() {
//   console.log('foo');
// }
// export default foo;

// 第一组
// export default function crc32() {}
// import crc32 from 'crc32';

// 第二组
// export function crc32() {}
// import { crc32 } from 'crc32';

// 一个模块只能有一个默认输出，因此export default命令只能使用一次

// function add(x, y) {
//   return x * y;
// }
// export { add as default };
// 等同于
// export default add;

// import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';

// 正确
// export var a = 1;

// 正确
// var a = 1;
// export default a;

// 错误
// export default var a = 1;

// 正确
// export default 42;

// 报错
// export 42;

// export { es6 as default } from './someModule';

// 等同于
// import { es6 } from './someModule';
// export default es6;

// constants.js 模块
// export const A = 1;
// export const B = 3;
// export const C = 4;

// test1.js 模块
// import * as constants from './constants';
// console.log(constants.A); // 1
// console.log(constants.B); // 3

// test2.js 模块
// import { A, B } from './constants';
// console.log(A); // 1
// console.log(B); // 3

// 由于浏览器脚本的默认语言是 JavaScript，因此type="application/javascript"可以省略
{
  /* <script type="application/javascript" src="path/to/myModule.js"></script> */
}

// 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应
// 这显然是很不好的体验，所以浏览器允许脚本异步加载
// 两种异步加载的语法
{
  /* <script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script> */
}
// defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行
// async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染
// defer是“渲染完再执行”，async是“下载完就执行”
// 如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的

// 浏览器加载 ES6 模块,异步加载
// 等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性
{
  /* <script type="module" src="./foo.js"></script> */
}

// <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行
{
  /* <script type="module" src="./foo.js" async></script> */
}

// ES6 模块也允许内嵌在网页中
{
  /* <script type="module">
  import utils from "./utils.js";
</script> */
}
// 注意:
// 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
// 模块脚本自动采用严格模式，不管有没有声明use strict。
// 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
// 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
// 同一个模块如果加载多次，将只执行一次。

// import utils from 'https://example.com/js/utils.js';
// const x = 1;
// console.log(x === window.x); //false
// console.log(this === undefined); // true

// 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中
// const isNotModuleScript = this !== undefined;

// ES6 模块与 CommonJS 模块的差异
// CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
// CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

// lib.js
// var counter = 3;
// function incCounter() {
//   counter++;
// }
// module.exports = {
//   counter: counter,
//   incCounter: incCounter
// };

// main.js
// var mod = require('./lib');
// console.log(mod.counter); // 3
// mod.incCounter();
// console.log(mod.counter); // 3

// lib.js
// export let counter = 3;
// export function incCounter() {
//   counter++;
// }

// main.js
// import { counter, incCounter } from './lib';
// console.log(counter); // 3
// incCounter();
// console.log(counter); // 4

// Node 要求 ES6 模块采用.mjs后缀文件名
// Node 只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名
// require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件
// 反过来，.mjs文件里面也不能使用require命令，必须使用import。

// ES6 模块之中，顶层的this指向undefined；
// CommonJS 模块的顶层this指向当前模块

// CommonJS 模块的输出都定义在module.exports这个属性上面
// Node 的import命令加载 CommonJS 模块，Node 会自动将module.exports属性，当作模块的默认输出，即等同于export default xxx

// module.exports = {
//   foo: 'hello',
//   bar: 'world'
// };

// 等同于
// export default {
//   foo: 'hello',
//   bar: 'world'
// };

// module.exports会被视为默认输出，即import命令实际上输入的是这样一个对象{ default: module.exports }

// b.js
// module.exports = null;

// es.js
// import foo from './b';
// foo = null;

// import * as bar from './b';
// bar = { default:null };

// c.js
// module.exports = function two() {
//   return 2;
// };

// es.js
// import foo from './c';
// foo(); // 2

// import * as bar from './c';
// // bar本身是一个对象，不能当作函数调用，只能通过bar.default调用
// bar.default(); // 2
// bar(); // throws, bar is not a function

// CommonJS 模块加载 ES6 模块
// es.mjs
// let foo = { bar: 'my-default' };
// export default foo;

// cjs.js
// const es_namespace = await import('./es.mjs');
// es_namespace = {
//   get default() {
//     ...
//   }
// }
// console.log(es_namespace.default);
// { bar:'my-default' }

// es.js
// export let foo = { bar: 'my-default' };
// export { foo as bar };
// export function f() {}
// export class c {}

// cjs.js
// const es_namespace = await import('./es');
// es_namespace = {
//   get foo() {return foo;}
//   get bar() {return foo;}
//   get f() {return f;}
//   get c() {return c;}
// }
