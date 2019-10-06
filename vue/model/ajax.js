// const ajax = (function () {
//     const obj = {}
//     obj.online = function (url) {
//         const xhr = new XMLHttpRequest()
//         xhr.open("GET", url, true)
//         xhr.send()
//         xhr.addEventListener("readystatechange", function () {
//             if (xhr.readyState === 4) {
//                 if (xhr.status >= 200 && xhr < 300 || xhr.status === 304) {
//                     console.log(xhr.responseText)
//                 }
//             }
//         })
//     }
//     return obj
// })()

// const a = 'aaa'
// const b = 'bbb'
// module.exports = {
//     a: a,
//     b: b
// }

const a = 'aaa'
const sum = function (a, b) {
    return a + b
}

export {
    a,
    sum
}
export const flag = false