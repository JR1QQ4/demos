/**
 * 数据类型：
 * 基本类型（值类型）：
 *     String Number Boolean undefined null
 * 对象类型（引用类型）：
 *     Object Array Function
 * 判断数据类型：
 *     typeof 可以判断: 基本类型（除 null 为 object） 
 *     instanceof 
 *     === 
 *     Object.prototype.toString.call
 * 
 * 什么时候赋值 null？
 *     尽早的让变量成为 垃圾对象，好被垃圾回收器回收
 * this
 *     任何函数本质都是通过某个对象来调用，如果没有直接指定就是 window
 * 
 * prototype
 *     每个函数都有一个prototype属性，默认指向一个object空对象（prototype 原型对象）
 *         内部 this.prototype = {}
 *     原型对象种有一个 constructor 属性，指向构造函数
 *     Fn.prototype === fn.__proto__
 * 
 * 
 */
window.onload = function () {
    // 对象的加法
    // var obj = {
    //     toString: function () {
    //         return 'hello';
    //     },
    //     valueOf: function () {
    //         return 1;
    //     }
    // };
    // console.log(obj + 2); // 3, obj.valueOf().toString()

    // 如果两个运算子都是原始类型的值，则是先转成数值再比较
    // console.log('cat' > 'dog');  // false

    // 如果运算子是对象，会转为原始类型的值，再进行比较
    // var x = [2,3]; // [2].valueOf().toString()
    // console.log(x > '11'); // true
    // console.log({ x: 2 } >= { x: 1 }); // true, 等同于 ({ x: 2 }).valueOf().toString() >= ({ x: 1 }).valueOf().toString()
    // function f() { }
    // console.log(typeof f == 'function'); // true
    // console.log(Object.prototype.toString(x)); // [object Object]
    // console.log(Object.prototype.toString.call(x)); // [object Array]
    // console.log(typeof null);
    // console.log(typeof undefined);

    // function Fn() { }
    // var fn = new Fn();
    // console.log(Date.prototype, typeof Date.prototype);
    // console.log(Fn.prototype);
    // console.log(Fn.prototype === fn.__proto__);

    // function FF() { }
    // FF.prototype.a = function () {
    //     console.log('a');
    // };
    // Object.prototype.b = function () {
    //     console.log('b');
    // }
    // var f = new FF();
    // f.a() // a
    // f.b() // b
    // FF.a() //  FF.a is not a function
    // FF.b() // b

    // var a = 23
    // function f() {
    //     console.log(a); // 23
    //     a = 123;
    // }
    // f();

    // function f1() {
    //     var message = "hello";
    //     function f2() {
    //         message += " world";
    //         return message;
    //     }
    //     return f2;
    // }
    // var f = f1();
    // console.log(f());

    // function fun(n, o) {
    //     console.log(o);
    //     return {
    //         fun: function (m) {
    //             return fun(m, n)
    //         }
    //     }
    // }
    // var a = fun(0); // undefined
    // a.fun(1); // 0
    // a.fun(2); // 0
    // a.fun(3); // 0
    // var b = fun(0).fun(1).fun(2).fun(3); // undefined,0,1,2
    // var c = fun(0).fun(1); // undefined.0
    // c.fun(2); // 1
    // c.fun(3); // 1

    function Super(name) {
        this.name = name;
    }
    Super.prototype.a = function () {
        console.log('sup prototype');
    }
    function Sub(name) {
        Super.call(this, name);
    }
    Sub.prototype = new Super();
    Sub.prototype.constructor = Sub;
    Sub.prototype.b = function () {
        console.log('sub prototype');
    }
    var sb = new Sub('sub');
    console.log(sb);
};