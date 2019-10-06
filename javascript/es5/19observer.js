/**
 * Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。
 * 实例方法:
 *    observe方法用来启动监听，它接受两个参数;第一个参数：所要观察的 DOM 节点;第二个参数：一个配置对象，指定所要观察的特定变动
 *    观察器所能观察的 DOM 变动类型（即上面代码的options对象），有以下几种:
 *       childList：子节点的变动（指新增，删除或者更改）
 *       attributes：属性的变动。
 *       characterData：节点内容或节点文本的变动。
 *       必须同时指定childList、attributes和characterData中的一种或多种，若未均指定将报错。
 *    除了变动类型，options对象还可以设定以下属性：
 *       subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
 *       attributeOldValue：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
 *       characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
 *       attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）。
 *   disconnect()，takeRecords（）法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。
 *       用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。
 * 
 * MutationRecord 对象:DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个MutationRecord实例所组成的数组。
 * 
 * 取代 DOMContentLoaded 事件
 * 
 */
// 上面代码中的回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例
// var observer = new MutationObserver(callback);
// var observer = new MutationObserver(function (mutations, observer) {
//     mutations.forEach(function (mutation) {
//         console.log(mutation);
//     });
// });

// var article = document.querySelector('article');
// var options = {
//     'childList': true,
//     'attributes': true
// };
// observer.observe(article, options);

// 开始监听文档根节点（即<html>标签）的变动
// mutationObserver.observe(document.documentElement, {
//     attributes: true,
//     characterData: true,
//     childList: true,
//     subtree: true,
//     attributeOldValue: true,
//     characterDataOldValue: true
// });

// 观察新增的子节点
// var insertedNodes = [];
// var observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//         for (var i = 0; i < mutation.addedNodes.length; i++) {
//             insertedNodes.push(mutation.addedNodes[i]);
//         }
//     });
//     console.log(insertedNodes);
// });
// observer.observe(document, { childList: true, subtree: true });

// 如何读取变动记录
// var callback = function (records) {
//     records.map(function (record) {
//         console.log('Mutation type: ' + record.type);
//         console.log('Mutation target: ' + record.target);
//     });
// };
// var mo = new MutationObserver(callback);
// var option = {
//     'childList': true,
//     'subtree': true
// };
// mo.observe(document.body, option);

// 追踪属性的变动
// var callback = function (records) {
//     records.map(function (record) {
//         console.log('Previous attribute value: ' + record.oldValue);
//     });
// };
// var mo = new MutationObserver(callback);
// var element = document.getElementById('#my_element');
// var options = {
//     'attributes': true,
//     'attributeOldValue': true
// }
// mo.observe(element, options);



