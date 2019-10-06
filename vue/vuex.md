# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的`状态管理模式`。它采用`集中式存储管理`应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

什么时候需要多个组件共享：

- 多个状态，在多个界面间的共享
- 比如用户的登录状态、用户名称、头像、地理位置信息等等
- 比如商品的收藏、购物车中的物品等等

```vue
const store = new Vuex.Store({
    state: {
        counter: 1000
    },
    mutations: {
        increment(state, payload) {
            this.state.counter++
        },
        decrement(state) {
            this.state.counter--
        },
        updateInfo(state){}
    },
    actions: {
        // context 上下文
        aUpdateInfo(context){
            return new Promise((resolve,reject) => {
                setTimeout(function(){
                    context.commit('updateInfo')
                    resolve('完成');
                },1000)
            })
        }
    },
    getters: {
        powCounter(state,getters){
            return state.counter * state.counter
        }
    },
    modules: {
        a: {
            state:{},
            mutations:{},
            actions:{},
            getters:{}
        },
        b: {
            state:{},
            mutations:{},
            actions:{},
            getters:{}
        }
    }
})

const vm = new Vue({
    el: '#app',
    data: {},
    methods: {
        addtion(){
            this.$store.commit('increment',payload)
        }
    },
    store
});

<div id='app'>
    <p>{{$store.state.counter}}</p>
    <button @click="addtion">+</button>
</div>
```

vuex核心概念：

- `State`：保存共享状态的地方。
  - 单一状态树：单一数据源
- `Getters`：类似组件中的计算属性
  - 方法中接收两个参数，第一个参数表示state，第二个表示getters
  - 如果getters想要传递参数，可以返回一个函数，函数中接收参数的传递
- `Mutation`：处理用户的操作，store状态的更新唯一方式，提交mutation。主要包括两部分：
  - 字符串的事件类型（type）
  - 一个回调函数（handler），第一个参数是state
    - 触发mutation是使用commit触发,`this.$store.commit('increment')`,`this.$store.commit('increment',payload)`,`this.$store.commit({type:'increment', payload})`
    - 传递参数，``this.$store.commit('increment', params)``
    - 注册方法的时候推荐使用常量，把所有常量定义到单独的文件里，然后以模块导入的方式引用
- `Action`：主要处理异步操作，异步操作不要在`Mutation`中处理，需要先在`Action`处理完成后再在`Mutation`中处理同步操作
  - 触发`this.$store.dispatch('aUpdateInfo',payload).then()`
- `Module`：划分模块的
  - 获取模块中的state，`$store.state.a.name`
  - 提交mutations,`this.$store.commit('函数名',payload)`
  - getters,`getters(state, getters, rootstate)`

响应式添加删除：

- 添加：`Vue.set(数据源, 键或索引, 值)`
- 删除：`Vue.delete(数据源, 键)`,`Vue.splice(索引，删除个数， 添加的项)`
