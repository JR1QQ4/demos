// var regex1 = /xyz/;
// var regex2 = new RegExp('xyz');
// var regex3 = /xyz/i;
// var regex4 = new RegExp('xyz', 'i');

/**
 * 实例属性
 * RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了i修饰符。
 * RegExp.prototype.global：返回一个布尔值，表示是否设置了g修饰符
 * RegExp.prototype.multiline：返回一个布尔值，表示是否设置了m修饰符。
 * RegExp.prototype.flags：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。
 * RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜索的位置
 * RegExp.prototype.source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读
 */
// var r = /abc/igm;
// console.log(r.ignoreCase); // true
// console.log(r.global); // true
// console.log(r.multiline); // true
// console.log(r.flags); // 'gim'
// console.log(r.lastIndex); // 0
// console.log(r.source); // "abc"

/**
 * 实例方法:
 * RegExp.prototype.test()
 * RegExp.prototype.exec()
 *
 */
// 带有g修饰符时，正则表达式内部会记住上一次的lastIndex属性
// var r = /x/g;
// var s = '_x_x';
// console.log(/cat/.test('cats and dogs')); // true
// console.log(r.lastIndex); // 0
// console.log(r.test(s)); // true
// console.log(r.lastIndex); // 2
// console.log(r.test(s)); // true
// console.log(r.lastIndex); // 4
// console.log(r.test(s)); // false

// // 正则实例对象的exec方法，用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回null
// var s = '_x_x';
// var r1 = /x/;
// var r2 = /y/;
// var r3 = /_(x)/;
// console.log(r1.exec(s)); // ["x"]
// console.log(r2.exec(s)); // null
// // 第一个成员是整个匹配的结果，第二个成员是圆括号匹配的结果
// console.log(r3.exec(s)); // ["_x", "x"]

//exec方法的返回数组包含两个属性：input , index
// var r = /a(b+)a/;
// var arr = r.exec('_abbba_aba_');
// console.log(arr); // ["abbba", "bbb"]
// console.log(arr.index); // 1
// console.log(arr.input); // '_abbba_aba_'

// 整个字符串已经到达尾部，匹配结果返回null，正则实例对象的lastIndex属性也重置为0
// var reg = /a/g;
// var str = 'abc_abc_abc'
// var r1 = reg.exec(str);
// console.log(r1); // ['a']
// console.log(r1.index); // 0
// console.log(reg.lastIndex); // 1
// var r2 = reg.exec(str);
// console.log(r2); // ['a']
// console.log(r2.index); // 4
// console.log(reg.lastIndex); // 5
// var r3 = reg.exec(str);
// console.log(r3); // ['a']
// console.log(r3.index); // 8
// console.log(reg.lastIndex ); // 9
// var r4 = reg.exec(str);
// console.log(r4); // null
// // console.log(r4.index); // Cannot read property 'index' of null
// console.log(reg.lastIndex); // 0

// var reg = /a/g;
// var str = 'abc_abc_abc'
// while(true) {
//   var match = reg.exec(str);
//   if (!match) break;
//   console.log('#' + match.index + ':' + match[0]);
// } // #0:a  #4:a  #8:a

/**
 * 字符串的实例方法：
 * String.prototype.match()：返回一个数组，成员是所有匹配的子字符串。
 * String.prototype.search()：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
 * String.prototype.replace()：按照给定的正则表达式进行替换，返回替换后的字符串。
 * String.prototype.split()：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。
 */
// var s = '_x_x';
// var r1 = /x/;
// var r2 = /y/;
// console.log(s.match(r1)); // ['x']
// console.log(s.match(r2)); // null
// var s = 'abba';
// var r = /a/g;
// console.log(s.match(r)); //  ["a", "a"]
// console.log(r.exec(s)); // ['a']
// 设置正则对象的lastIndex属性是无效的

// var r = /a|b/g;
// r.lastIndex = 7;
// console.log('xaxb'.match(r)); // ['a', 'b']
// console.log(r.lastIndex); // 0
// console.log('_x_x'.search(/x/)); // 1

// console.log('aaa'.replace('a', 'b')); // "baa"
// console.log('aaa'.replace(/a/, 'b')); // "baa"
// console.log('aaa'.replace(/a/g, 'b')); // "bbb"
// console.log('hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')); // world hello

// replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容
// $&：匹配的子字符串。
// $`：匹配结果前面的文本。
// $'：匹配结果后面的文本。
// $n：匹配成功的第n组内容，n是从1开始的自然数。
// $$：指代美元符号$。

// var a = '3 and 5'.replace(/[0-9]+/g, function (match) {
//     return 2 * match;
// });
// console.log(a); // 6 and 10

// var prices = {
//     'p1': '$1.99',
//     'p2': '$9.99',
//     'p3': '$5.00'
// };
// var template = '<span id="p1"></span>'
//     + '<span id="p2"></span>'
//     + '<span id="p3"></span>';
// var b = template.replace(
//     /(<span id=")(.*?)(">)(<\/span>)/g,
//     function (match, $1, $2, $3, $4) {
//         return $1 + $2 + $3 + prices[$2] + $4;
//     }
// );
// console.log(b); // <span id="p1">$1.99</span><span id="p2">$9.99</span><span id="p3">$5.00</span>

// 第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数
// console.log('a,  b,c, d'.split(/, */, 2)); // ["a", "b"]
// console.log('aaa**a*'.split(/a*/)); // ["", "*", "*", "*"]
// console.log('aaa*a*'.split(/a*/)); //  ["", "*", "*"]

/**
 * 修饰符：
 * i g m(多行匹配)
 *
 * 方括号：
 * [abc] 查找方括号之间的任何字符
 * [^abc] 查找任何不在方括号之间的字符。
 * [0-9] 查找任何从 0 至 9 的数字。
 * [a-z] 查找任何从小写 a 到小写 z 的字符。
 * [A-Z] 查找任何从大写 A 到大写 Z 的字符。
 * [A-z] 查找任何从大写 A 到小写 z 的字符。
 * [adgk] 查找给定集合内的任何字符。
 * [^adgk] 查找给定集合外的任何字符。
 * (red|blue|green) 查找任何指定的选项。
 * 如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符
 *
 * 元字符：
 * . 查找单个字符，除了换行和行结束符
 * \w 查找单词字符。
 * \W 查找非单词字符。
 * \d 查找数字。
 * \D 查找非数字字符。
 * \s 查找空白字符。 [\t\r\n\v\f]
 * \S 查找非空白字符。
 * \b 匹配单词边界。
 * \B 匹配非单词边界
 * \o 查找 NULL 字符。
 * \n 查找换行符。
 * \f 查找换页符。
 * \r 查找回车符。
 * \t 查找制表符。
 * \v 查找垂直制表符。
 *
 * 量词
 * n+ 至少一个
 * n* 零个或多个
 * n? 零个或一个
 * n{X} 含 X 个
 * n{X,Y} 至少 X 次，至多 Y 次
 * n$ 结尾为 n 的字符串
 * ^n 开头为 n 的字符串
 * ?=n 其后紧接指定字符串 n 的字符串
 * ?!n 其后没有紧接指定字符串 n 的字符串
 * 
 * 如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。
 */
// var s = 'aaa';
// console.log(s.match(/a+?/)); // ["a"]
// console.log(s.match(/a+/)); // ["aaa"]

// var m = 'abcabc'.match(/(.)b(.)/);
// console.log(m); // ['abc', 'a', 'c']
// var m2 = 'abcabc'.match(/(.)b(.)/g);
// console.log(m2); // ["abc", "abc"]