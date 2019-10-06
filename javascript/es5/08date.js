// 无论有没有参数，直接调用Date总是返回当前时间
// console.log(Date()); // Sun Sep 01 2019 04:11:24 GMT+0800 (中国标准时间)
// console.log(Date(2000, 1, 1)); // Sun Sep 01 2019 04:11:47 GMT+0800 (中国标准时间)

// var today = new Date();
// console.log(today); // Sun Sep 01 2019 04:12:52 GMT+0800 (中国标准时间)
// console.log(today.toString()); // Sun Sep 01 2019 04:12:52 GMT+0800 (中国标准时间)

// // Tue Sep 03 2013 22:32:08 GMT+0800 (中国标准时间)
// console.log(new Date(1378218728000));
// // Sun Jan 06 2013 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date('January 6, 2013'));
// // 代表年、月、日、小时、分钟、秒、毫秒,Tue Jan 01 2013 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date(2013, 0, 1, 0, 0, 0, 0));
// // Fri Apr 30 1926 17:27:52 GMT+0800 (中国标准时间)
// console.log(new Date(-1378218728000));

// // Fri Feb 15 2013 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date('2013-2-15'));
// // Fri Feb 15 2013 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date('2013/2/15'));

/**
 * 静态方法:
 * Date.now() 
 * Date.parse()
 * Date.UTC()
 */
// console.log(Date.now()); // 1567282700517
// console.log(Date.parse('Aug 9, 1995')); // 807897600000
// console.log(Date.UTC(2011, 0, 1, 2, 3, 4, 567)); // 1293847384567

/**
 * 实例方法:
 * valueOf toString
 * to类：从Date对象返回一个字符串，表示指定的时间。
 *     Date.prototype.toString()
 *     Date.prototype.toUTCString()
 *     Date.prototype.toISOString()
 *     Date.prototype.toJSON()
 *     Date.prototype.toDateString()
 *     Date.prototype.toTimeString()
 *     Date.prototype.toLocaleString()
 *     Date.prototype.toLocaleDateString()
 *     Date.prototype.toLocaleTimeString()
 * get类：获取Date对象的日期和时间。
 * set类：设置Date对象的日期和时间。
 */
var d = new Date();
// console.log(d.valueOf()); // 1567283139239
// console.log(d.getTime()); // 1567283139239

// console.log(d.toString()); // Sun Sep 01 2019 04:26:52 GMT+0800 (中国标准时间)
// console.log(d.toJSON()); // 2019-08-31T20:26:52.302Z
// console.log(d.toDateString()); // Sun Sep 01 2019
// console.log(d.toTimeString()); // 04:28:22 GMT+0800 (中国标准时间)
// console.log(d.toLocaleString()); // 2019/9/1 上午4:29:21
// console.log(d.toLocaleDateString()); // 2019/9/1
// console.log(d.toLocaleTimeString()); // 上午4:29:21
// console.log(d.toLocaleString('zh-CN') ); // 08date.js:60 2019/9/1 上午4:30:27

// console.log(d.getDate()); // 1
// console.log(d.getMonth()); // 8
// console.log(d.getFullYear()); // 2019
// console.log(d.getTimezoneOffset()); // -480
// function leftDays() {
//     var today = new Date();
//     var endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
//     var msPerDay = 24 * 60 * 60 * 1000;
//     return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
// }
// console.log(leftDays()); // 122
// console.log(d.getMilliseconds()); // 846
// console.log(d.getMinutes()); // 36
// console.log(d.getSeconds()); // 21
// console.log(d.getHours()); // 4
// console.log(d.getTimezoneOffset()); // -480

// console.log(d.setDate(30)); // 1569789666572
// console.log(d.setFullYear(2017)); // 1506717666572
// console.log(d.setHours(8)); // 1506732066572
// console.log(d.setMilliseconds(998)); // 1506732066998
// console.log(d.setMinutes(58)); // 1506733086998
// console.log(d.setMonth(11)); // 1514595486998
// console.log(d.setSeconds(23)); // 1514595503998
// console.log(d.setTime(d)); // 1514595503998
