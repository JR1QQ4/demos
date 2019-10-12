// let regex = new RegExp('xyz', 'i');
// let regex1 = /xyz/i;
// let regex2 = new RegExp(/xyz/i);

// ES6
// let regex3 = new RegExp(/xyz/gi, 'i');
// console.dir(regex3); // /xyz/i

// 字符串对象共有 4 个方法可以使用正则表达式：match()、replace()、search()和split()
// ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上
// let regex4 = /xyz/i;
// console.log('xyzqaq'.match(regex4)); // ["xyz", index: 0, input: "xyzqaq", groups: undefined]
// console.log('xyzqaq'.replace(regex4, 'ww')); // wwqaq
// console.log('xyzqaq'.search(regex4)); // 0
// console.log('xyzqaq'.split(regex4)); // ["", "qaq"]

// console.log(/^\uD83D/u.test('\uD83D\uDC2A')); // false
// console.log(/^\uD83D/.test('\uD83D\uDC2A')); // true

// 返回字符串长度
// function codePointLength(text) {
//   var result = text.match(/[\s\S]/gu);
//   return result ? result.length : 0;
// }
// var s = '𠮷𠮷';
// console.log(s.length); // 4
// console.log(codePointLength(s)); // 2

// console.log(/\,/); // /\,/
// console.log(/\,/u); // 报错

// const r1 = /hello/;
// const r2 = /hello/u;
// console.log(r1.unicode); // false
// console.log(r2.unicode); // true

// y修饰符号隐含了头部匹配的标志^
// var s = 'aaa_aa_a';
// var r1 = /a+/g;
// var r2 = /a+/y;
// console.log(r1.exec(s)); // aaa
// console.log(r2.exec(s)); // aaa
// console.log(r1.exec(s)); // aa
// console.log(r2.exec(s)); // null,y修饰符要求匹配必须从头部开始

// const REGEX = /a/g;
// REGEX.lastIndex = 2;
// const match = REGEX.exec('xaya');
// console.log(match); // ["a", index: 3, input: "xaya", groups: undefined]
// console.log(REGEX.lastIndex); // 4
// console.log(REGEX.exec('xaya')); // null

// console.log('a1a2a3'.match(/a\d/y)); // a1
// console.log('a1a2a3'.match(/a\d/gy)); // a1 a2 a3

// function tokenize(TOKEN_REGEX, str) {
//   let result = [];
//   let match;
//   while ((match = TOKEN_REGEX.exec(str))) {
//     result.push(match[1]);
//   }
//   return result;
// }
// const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
// const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;
// console.log(tokenize(TOKEN_Y, ' 3 + 4 ')); // ["3", "+", "4"]
// console.log(tokenize(TOKEN_G, ' 3 + 4 ')); // ["3", "+", "4"]
// console.log(tokenize(TOKEN_Y, '3x + 4')); // ["3"]
// console.log(tokenize(TOKEN_G, '3x + 4')); // ["3", "+", "4"]

// let r = /hello\d/giy;
// console.log(r.sticky); // true
// console.log(r.source); // hello\d
// console.log(r.flags); // giy

// console.log(/foo.bar/.test('foo\nbar')); // false
// console.log(/foo[^]bar/.test('foo\nbar')); // true
// console.log('foo\nbar'.match(/foo[^]bar/)); // foo↵bar
// console.log(/foo.bar/s.test('foo\nbar')); // true

// 断言，ES6新增后行断言,后行否定断言
// “先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。
//   比如，只匹配百分号之前的数字，要写成/\d+(?=%)/
// “先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/
//   比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/

// console.log(/\d+(?=%)/.exec('100% of US presidents have been male')); // 100
// console.log(/\d+(?!%)/.exec('that’s all 44 of them')); // 44

// console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')); // 100
// console.log(/(?<!\$)\d+/.exec('it’s is worth about €90')); // 90

// const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
// console.log('$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar')); // $bar %foo foo

// console.log(/(?<=(\d+)(\d+))$/.exec('1053')); // ["", "1", "053"]
// console.log(/^(\d+)(\d+)$/.exec('1053')); // ["1053", "105", "3"]

// console.log(/(?<=(o)d\1)r/.exec('hodor')); // null
// console.log(/(?<=\1d(o))r/.exec('hodor')); // ["r", "o"]

// // 匹配所有数字 ES2018
// const regex = /^\p{Number}+$/u;
// console.log(regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ')); // true
// console.log(regex.test('²³¹¼½¾')); // true

// const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
// const matchObj = RE_DATE.exec('1999-12-31');
// console.log(matchObj); //  ["1999-12-31", "1999", "12", "31"]

// const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// const matchObj = RE_DATE.exec('1999-12-31');
// const year = matchObj.groups.year;
// const month = matchObj.groups.month;
// const day = matchObj.groups.day;
// console.log(year, month, day); // 1999 12 32

// let {
//   groups: { one, two }
// } = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
// console.log(one, two); // foo bar

// let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
// console.log('2015-01-02'.replace(re, '$<day>/$<month>/$<year>')); // 02/01/2015

// var regex = /t(e)(st(\d?))/g;
// var string = 'test1test2test3';
// var matches = [];
// var match;
// while ((match = regex.exec(string))) {
//   matches.push(match);
// }
// console.log(matches);
// [
//   ['test1', 'e', 'st1', '1'],
//   ['test2', 'e', 'st2', '2'],
//   ['test3', 'e', 'st3', '3']
// ]

// const string = 'test1test2test3';
// const regex = /t(e)(st(\d?))/g;
// for (const match of string.matchAll(regex)) {
//   console.log(match);
// }
// [
//   ['test1', 'e', 'st1', '1'],
//   ['test2', 'e', 'st2', '2'],
//   ['test3', 'e', 'st3', '3']
// ]

// 转为数组的两个方法
// [...string.matchAll(regex)] 
// Array.from(string.matchAll(regex));