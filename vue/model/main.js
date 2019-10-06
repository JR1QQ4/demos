// (function (ajax) {
//     console.log(ajax)
// })(ajax)

// let mouduleA = module.require('./ajax.js')
// let {a, b} = module.require('./ajax.js')

import * as mouduleA from './ajax.js'

const a = 'aaa'
console.log(mouduleA.a);
console.log(mouduleA.sum(10, 20));
console.log(mouduleA.flag);