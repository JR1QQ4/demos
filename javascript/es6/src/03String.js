// console.log('\u0061'); // a
// console.log("\u{41}\u{42}\u{43}"); // ABC

// for (let codePoint of 'foo') {
//   console.log(codePoint); // f o o
// }

// let text = String.fromCodePoint(0x20bb7);
// let text = '吉';
// console.log(text); // 𠮷
// for (let i = 0; i < text.length; i++) {
//   console.log(text[i]); // � �
// }
// for (let i of text) {
//   console.log(i); // 𠮷
// }

// console.log(JSON.stringify('\u{D834}')); // "\ud834"

// console.log(`string text line 1
// string text line 2`);
// string text line 1
// string text line 2

// let name = "Bob", time = "today";
// console.log(`Hello ${name}, how are you ${time}?`);
// Hello Bob, how are you today?

// let x = 1;
// let y = 2;
// console.log(`${x} + ${y} = ${x + y}`); // 1 + 2 = 3

// const tmpl = addrs => `
//   <table>
//   ${addrs
//     .map(
//       addr => `
//     <tr><td>${addr.first}</td></tr>
//     <tr><td>${addr.last}</td></tr>
//   `
//     )
//     .join('')}
//   </table>
// `;
// const data = [
//   { first: '<Jane>', last: 'Bond' },
//   { first: 'Lars', last: '<Croft>' }
// ];
// console.log(tmpl(data));
{
  /* <table>
<tr><td><Jane></td></tr>
<tr><td>Bond</td></tr>
<tr><td>Lars</td></tr>
<tr><td><Croft></td></tr>
</table> */
}

// function tag(stringArr, value1, value2) {
//   // ...
// }
// // 等同于
// function tag(stringArr, ...values) {
//   // ...
// }

// console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'); // true

// console.log(String.raw`Hi\n${2 + 3}!`); // Hi\n5!
// console.log(String.raw`Hi\\n` === "Hi\\\\n"); // true

// var s = '吉';
// console.log(s.length); // 1
// console.log(s.charAt(0)); // 吉
// console.log(s.charCodeAt(0)); // 21513

// console.log('\u01D1' === '\u004F\u030C'); // false
// console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize()); // true

// let s = 'Hello world!';
// console.log(s.startsWith('Hello')); // true
// console.log(s.endsWith('!')); // true
// console.log(s.includes('o')); // true
// console.log(s.includes('Hello', 6)); // false

// console.log('na'.repeat(2.9)); // nana

// ES2017
// console.log('x'.padStart(5, 'ab')); // ababx
// console.log('x'.padStart(4, 'ab')); // abax
// console.log('x'.padEnd(5, 'ab')); // xabab

// ES2019
// const s = '  abc  ';
// console.log(s.trim()); // 'abc'
// console.log(s.trimStart()); // 'abc  '
// console.log(s.trimEnd()); // '  abc'
