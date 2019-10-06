// var s1 = 'abc';
// var s2 = new String('abc');
// console.log(typeof s1); // "string"
// console.log(typeof s2); // "object"
// console.log(s2.valueOf()); // "abc"
// console.log(new String('abc')); // String {0: "a", 1: "b", 2: "c", length: 3}

// var a = new String('abc');
// a[0] = 'asc';
// console.log(a); // String {0: "a", 1: "b", 2: "c", length: 3}

/**
 * 静态方法
 * String.fromCharCode()
 */
// console.log(String.fromCharCode()); // ""
// console.log(String.fromCharCode(97)); // "a"
// console.log(String.fromCharCode(104, 101, 108, 108, 111)); // "hello"

/**
 * 实例方法
 * String.prototype.charAt()
 * String.prototype.charCodeAt()
 * String.prototype.concat()
 * String.prototype.slice()
 * String.prototype.substring() 
 * String.prototype.substr()
 * String.prototype.indexOf()
 * String.prototype.lastIndexOf()
 * String.prototype.trim() 
 * String.prototype.toLowerCase()
 * String.prototype.toUpperCase()
 * String.prototype.match()
 * String.prototype.search()
 * String.prototype.replace() 
 * String.prototype.split()
 * String.prototype.localeCompare() 
 */
// var s = new String('abc');
// console.log(s.charAt(1)); // "b"
// console.log(s.charAt(s.length - 1)); // "c"

// 如果参数为负数，或大于等于字符串的长度，charCodeAt返回NaN
// console.log('abc'.charCodeAt(1)); // 98
// console.log('abc'.charCodeAt(-1)); // NaN
// console.log('abc'.charCodeAt(4)); // NaN

// console.log('a'.concat('b', 'c')); // abc
// var one = 1;
// var two = 2;
// var three = '3';
// console.log(''.concat(one, two, three)); // 123
// console.log(''.concat(one, two)); // 12
// console.log(one + two + three); // 33

// console.log('JavaScript'.slice(0, 4)); // "Java"

// 不建议使用substring方法，应该优先使用slice
// console.log('JavaScript'.substring(0, 4)); // "Java"
// console.log('JavaScript'.substring(-3)); // JavaScript
// console.log('JavaScript'.substring()); // JavaScript
// console.log('JavaScript'.substring(0)); // JavaScript
// console.log('JavaScript'.substring(4, -3)); // "Java"
// console.log('JavaScript'.substring(0, 4)); // "Java"

// console.log('JavaScript'.substr(4, 6)); // Script
// console.log('JavaScript'.substr(-6)); // "Script"
// console.log('JavaScript'.substr(4)); // "Script"

// console.log('hello world'.indexOf('o')); // 4
// console.log('JavaScript'.indexOf('script')); // -1
// console.log('hello world'.indexOf('o', 6)); // 7

// console.log('\r\nabc \t'.trim()); // abc

// ["at", index: 1, input: "cat, bat, sat, fat", groups: undefined]
// console.log('cat, bat, sat, fat'.match('at')); // ["at"]
// console.log('cat, bat, sat, fat'.match('xt')); // null

// console.log('cat, bat, sat, fat'.search('at')); // 1
// console.log('aaa'.replace('a', 'b')); // baa

// split方法还可以接受第二个参数，限定返回数组的最大成员数
// console.log('|b|c'.split('|')); // ["", "b", "c"]
// console.log('a|b|c'.split('|', 2)); // ["a", "b"]

// localeCompare方法用于比较两个字符串。它返回一个整数
// 如果小于0，表示第一个字符串小于第二个字符串
// 如果等于0，表示两者相等
// 如果大于0，表示第一个字符串大于第二个字符串
// console.log('apple'.localeCompare('banana')); // -1
// console.log('apple'.localeCompare('apple')); // 0