// 三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”（wrapper）
// 所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象
// var v1 = new Number(123);
// var v2 = new String('abc');
// var v3 = new Boolean(true);
// console.log(typeof v1); // "object"
// console.log(typeof v2); // "object"
// console.log(typeof v3); // "object"
// console.log(v1 === 123); // false
// console.log(v2 === 'abc'); // false
// console.log(v3 === true); // false

// 包装对象的设计目的,首先是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型
// 其次是使得原始类型的值也有办法调用自己的方法
// 实例方法

// valueOf()方法返回包装对象实例对应的原始类型的值
// console.log(new Number(123).valueOf()); // 123
// console.log(new String('abc').valueOf()); // "abc"
// console.log(new Boolean(true).valueOf()); // true

// toString()方法返回对应的字符串形式
// console.log(new Number(123).toString()); // "123"
// console.log(new String('abc').toString()); // "abc"
// console.log(new Boolean(true).toString()); // "true"

// 原始类型与实例对象的自动转换 
// abc是一个字符串，本身不是对象，不能调用length属性
// JavaScript 引擎自动将其转为包装对象，在这个对象上调用length属性
// 调用结束后，这个临时对象就会被销毁。这就叫原始类型与实例对象的自动转换
// console.log('abc'.length); // 3

// var str = 'abc';
// console.log(str.length); // 3
// // 等同于
// var strObj = new String(str)
// console.log(strObj.length); // 3

// 自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性
// 调用结束后，包装对象实例会自动销毁
// 如果要为字符串添加属性，只有在它的原型对象String.prototype上定义
// var s = 'Hello World';
// s.x = 123;
// console.log(s.x); // undefined

// if (Boolean(false)) {
//     console.log('true');
// } // 无输出
// if (new Boolean(false)) {
//     console.log('true');
// } // true
// if (Boolean(null)) {
//     console.log('true');
// } // 无输出
// if (new Boolean(null)) {
//     console.log('true');
// } // true
