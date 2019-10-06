# promise

Primose使异步编程的一种解决方案。

Primose的三种状态：

- `pending` ：等待状态，表示正在进行网络请求，或者定时器没有到时间
- `fulfill` ：满足状态，当我们主动回调`resolve`时，就处于该状态，并且会回调`.then()`
- `reject` ：拒绝状态，当我们额主动回调`reject`时，就处于该状态，并且会回调`.catch()`

```javascript
new Promise((resolve, reject) => {
    // setTimeout 模拟网络请求
    setTimeout(() => { // pending
        resolve('Hello Promise');
        reject('Promise Error')
    }, 1000);
}).then((data) => { // fulfill
    console.log(data);
}).catch((data) => { // reject
    console.log(data);
});

// 另外一种写法
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello Promise');
        reject('Promise Error');
    }, 1000);
}).then((resolvedata) => {
    console.log(resolvedata);
}, (rejectdata) => {
    console.log(rejectdata);
});
```

Promise 的链式编程：

```javascript
// 写法一
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello Promise');
        reject('Promise Error');
    }, 1000);
}).then((data) => {
    setTimeout(() => {
        console.log('第一个then：' + data);
    }, 1000);
    return data;
}).then((data) => {
    setTimeout(() => {
        console.log('第二个then：' + data);
    }, 1000);
}).catch(err => {
    console.log(err);
})

// 写法二
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello Promise');
        reject('Promise Error');
    }, 1000);
}).then((data) => {
    setTimeout(() => {
        console.log('第一个then：' + data);
    }, 1000);
    return new Promise((resolve) => {
        resolve(data);
    })
}).then((data) => {
    setTimeout(() => {
        console.log('第二个then：' + data);
    }, 1000);
    return new Promise((resolve) => {
        resolve(data);
    })
}).catch(err => {
    console.log(err);
})

// 写法三
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello Promise');
        reject('Promise Error');
    }, 1000);
}).then((data) => {
    setTimeout(() => {
        console.log('第一个then：' + data);
    }, 1000);
    return Promise.resolve(data);
}).then((data) => {
    setTimeout(() => {
        console.log('第二个then：' + data);
    }, 1000);
    return Promise.resolve(data);
}).catch(err => {
    console.log(err);
})
```

Promise 在所有异步操作执行完毕后再做操作：

```javascript
// 传入一个数组，返回一个数组
Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('result1');
        }, 1000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('result2')
        }, 2000);
    })
]).then(data => {
    console.log(data); // ["result1", "result2"]
}).catch(err => {
    console.log(err);
})
```
