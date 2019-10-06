/**
 * JSON 对值的类型和格式有严格的规定:
 * 1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
 * 2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
 * 3. 字符串必须使用双引号表示，不能使用单引号。
 * 4. 对象的键名必须放在双引号里面。
 * 5. 数组或对象最后一个成员的后面，不能加逗号。
 */

/**
 * JSON 对象
 * JSON.stringify() 将一个值转为 JSON 字符串
 * 
 */
// console.log(JSON.stringify('abc')); // "abc"
// console.log(JSON.stringify(1)); // 1
// console.log(JSON.stringify(false)); // false
// console.log(JSON.stringify([])); // []
// console.log(JSON.stringify({})); // {}
// console.log(JSON.stringify([1, "false", false])); // [1,"false",false]
// console.log(JSON.stringify({ name: "张三" })); // {"name":"张三"}

// console.log(JSON.stringify('foo') === "foo"); // false
// console.log(JSON.stringify('foo') === "\"foo\""); // true

// 对象obj的a属性是undefined，而b属性是一个函数，结果都被JSON.stringify过滤
// var obj = {
//     a: undefined,
//     b: function () { }
// };
// console.log(JSON.stringify(obj)); // "{}"

// 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null
// var arr = [undefined, function () { }];
// console.log(JSON.stringify(arr)); // "[null,null]"
// var obj2 = { a: 12 };
// console.log(JSON.stringify(obj2)); // {"a":12}

// 正则对象会被转成空对象
// console.log(JSON.stringify(/foo/)); // {}

// bar是obj对象的不可遍历属性，JSON.stringify方法会忽略这个属性
// var obj = {};
// Object.defineProperties(obj, {
//     'foo': {
//         value: 1,
//         enumerable: true
//     },
//     'bar': {
//         value: 2,
//         enumerable: false
//     }
// });
// console.log(JSON.stringify(obj)); // {"foo":1}

// JSON.stringify方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性
// var obj = {
//     'prop1': 'value1',
//     'prop2': 'value2',
//     'prop3': 'value3'
// };
// var selectedProperties = ['prop1', 'prop2'];
// console.log(JSON.stringify(obj, selectedProperties)); // {"prop1":"value1","prop2":"value2"}

// 二个参数指定 JSON 格式只转0号属性，实际上对数组是无效的，只对对象有效
// console.log(JSON.stringify(['a', 'b'], ['0'])); // ["a","b"]
// console.log(JSON.stringify({0: 'a', 1: 'b'}, ['0'])); // {"0":"a"}

// 第二个参数还可以是一个函数，用来更改JSON.stringify的返回值
// function f(key, value) {
//     if (typeof value === "number") {
//         value = 2 * value;
//     }
//     return value;
// };
// console.log(JSON.stringify({ a: 1, b: 2 }, f)); // {"a":2,"b":4}

// var o = {a: {b: 1}};
// function f(key, value) {
//   console.log("["+ key +"]:" + value);
//   return value;
// } // []:[object Object]  [a]:[object Object]  [b]:1
// console.log(JSON.stringify(o, f)); // {"a":{"b":1}}

// var o = { a: 1 };
// function f(key, value) {
//     // console.log(key); // '' b
//     // console.log(value); // {a: 1} 2
//     if (typeof value === 'object') {
//         return { b: 2 };
//     }
//     return value * 2;
// }
// console.log(JSON.stringify(o, f)); // {"b":4}

// function f(key, value) {
//     if (typeof (value) === "string") {
//         return undefined;
//     }
//     return value;
// }
// console.log(JSON.stringify({ a: "abc", b: 123 }, f)); // {"b":123}

// JSON.stringify还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性
// 如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面。

// console.log(JSON.stringify({ p1: 1, p2: 2 }, null, 2));
// {
//     "p1": 1,
//     "p2": 2
// }
// console.log(JSON.stringify({ p1:1, p2:2 }, null, '|-'));
// {
//     |-"p1": 1,
//     |-"p2": 2
// }

/**
 * 参数对象的 toJSON 方法
 */
// var user = {
//     firstName: '三',
//     lastName: '张',
//     get fullName() {
//         return this.lastName + this.firstName;
//     }
// };
// console.log(JSON.stringify(user)); // {"firstName":"三","lastName":"张","fullName":"张三"}

// var user = {
//     firstName: '三',
//     lastName: '张',
//     get fullName() {
//         return this.lastName;
//     },
//     toJSON: function () {
//         return {
//             name: this.lastName + this.firstName
//         };
//     }
// };
// console.log(JSON.stringify(user)); // {"name":"张三"}

// var date = new Date('2015-01-01');
// console.log(date.toJSON()); // "2015-01-01T00:00:00.000Z"
// console.log(JSON.stringify(date)); // "2015-01-01T00:00:00.000Z"

/**
 * JSON.parse() 用于将 JSON 字符串转换成对应的值
 */
// console.log(JSON.parse('{}')); // {}
// console.log(JSON.parse('true')); // true
// console.log(JSON.parse('"foo"')); // foo
// console.log(JSON.parse('[1, 5, "false"]')); //  [1, 5, "false"]
// console.log(JSON.parse('null') ); // null
// var o = JSON.parse('{"name": "张三"}'); 
// console.log(o); // {name: "张三"}

// 如果传入的字符串不是有效的 JSON 格式，JSON.parse方法将报错
// console.log(JSON.parse("'String'")); //  Unexpected token ' in JSON at position 0

// JSON.parse方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify方法类似
// function f(key, value) {
//     if (key === 'a') {
//         return value + 10;
//     }
//     return value;
// }
// console.log(JSON.parse('{"a": 1, "b": 2}', f)); // {a: 11, b: 2}
