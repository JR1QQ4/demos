new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello Promise');
        reject('Promise Error')
    }, 1000);
}).then((data) => {
    console.log(data);
}).catch((data) => {
    console.log(data);
});

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