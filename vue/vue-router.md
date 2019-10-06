# Vur-router

## 前端渲染和后端渲染

后端渲染：

- 最早期，服务器拿过来的数据，已经是生成好的页面
- 后端路由：后端处理URL页面之间的映射关系

前后端分离阶段:

- 随着 ajax 的出现，有了前后端分离的开发模式，后端只提供api来返回数据，前端通过ajax获取数据，并且通过js将数据渲染到页面中

单页面富应用阶段

- SPA 最主要的特点就是在前后端分离的基础上加了一层前端路由
- SPA 整个页面只有一个 html 页面
- 前端路由，用于管理映射 url 地址

## router

原生改变 url 无刷新

- `location.hash = '设置的值'`
- `history.pushState({}, '', '/home')`，存放历史是以栈的方式存入的
  - `history.back()`可以触发返回上一个栈
  - `history.forward()`可以压入栈
  - `history.go()`可以压入和弹出栈里的内容
- `history.replaceState({}, '', '/home')`，会直接把url替换，点击返回按钮不能放回上一次页面

使用 vue-router:

```vue
$npm install vue-router --save

// 1.导入路由对象，并且调用 Vue.use(VueRouter)
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

// 2.创建路由实例，并且传入路由配置
// 2.1 创建路由组件
// 2.2 配置路由映射，组件和路径的映射
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
// 2.3 使用路由通过<router-link>和<router-view>显示，在 App.vue 里面创建
<div id="app">
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view/>
</div>

// 3.在 Vue 实例中挂载创建的路由实例
import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

`router`注意点：

```vue
const router = new VueRouter({
    routes: [{
        // 重定向，path: '' 也可以
        path: '/',
        redirect: '/home'
    }],
    // 默认是 hash 模式，可以切换成 history 模式
    mode: 'history'
})

// 动态路由
// 1.首先在 router.js 中配置一个 route
{
    path: '/user/:paramId',
    name: 'user',
    component: User
}
// 2.然后再 App.vue 中配置 router-link ，拼接 paramId
// userId 一般是从服务器获取的，假设在 data 中获取
<router-link to="'/user/'+userId">用户</router-link>
data(){
    return {
        userId: 1234567
    }
}
// 3.此时可以在 User.vue 中获取到 userId
// 使用 route 属性，不是 router ，route 表示当前活跃的路由组件
// paramId 是在 routes 中定义的
<h3>{{userId}}</h3>
computed: {
    userId(){
        return this.$route.params.paramId
    }
}
```

`<router-link>`注意点：

```vue
// 默认渲染成 a 标签
<router-link to="/">Home</router-link>

// 渲染成其它标签 button li
<router-link to="/" tag="button">Home</router-link>
<router-link to="/" tag="li">Home</router-link>

// 默认使用的是 pushState，可以修改成 replaceState，这样就不能来回跳转
<router-link to="/" replace>Home</router-link>

// 当点击 router-link 时，会添加两个类
// router-link-exact-active
// router-link-active
// router-link-active 可以被改为其它名称，添加 active-class 属性
// 上述修改只能修改一个，统一修改需要在VueRouter实例中配置 linkActiveClass: 'classname'
<router-link to="/" active-class="active">Home</router-link>

// 组件中通过代码实现 router-link 功能
<button @click="homeclick">Home</button>
methods: {
    homeclick(){ 
        // 每个 VueRouter 中都有一个 $router 属性
        // push 等同于 pushSate
        // 另一个方法 replace 等同于 replaceState
        this.$router.push('/home')
    }
}
```

### 懒加载

路由通常会定义很多不同页面，最后打包一般是放到一个js文件中，这造成页面非常的大，一次性从服务器请求下来这个页面，会花费一定的事件，甚至用户电脑上还出现短暂的空白，此时就需要懒加载。

```vue
// 最初懒加载的写法
const About = resolve => {
    require.ensure(['./views/About.vue'], () => {
        resolve(require('./views/About.vue'))
    })
}

// AMD写法
const About = resolve => {
    require(['./views/About.vue'], resolve)
}

// 现在的写法
export default new Router({
  routes: [
    { // 不需要直接导入组件，是动态的导入组件
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
```

### 路由嵌套

```vue
// 1.添加子路由
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Hbout.vue'),
      children: [
        {
            path: '',
            redirect: 'news'
        },
        { // 路径不需要 /
            path: 'news',
            component: () => import('./views/HomeNews.vue')
        }
      ]
    }
  ]
})
// 2.把路由添加到父组件中，这里是 Home.vue
<template>
    <div>
        <router-link to="/home/news">消息</router-link>
        <router-view></router-view>
    </div>
</template>
```

### 路由传递参数

传递参数主要有两种类型：params和query

- params的类型：
  - 首先，配置路由格式：`/router/:id`
  - 传递的方式：`在path后面跟上对应的值`，拼接
  - 传递后形成的路径：`/router/123`
  - 获取方式：`this.$route.params.id`
- query的类型：
  - 首先，配置路由格式：`/router`，是普通的配置
  - 传递的方式：在对象中使用`query的key作为传递方式`
  - 传递后形成的路径：`/router?id=123`
  - 获取方式：`this.$route.query.id`

```vue
{
    path:'/user',
    component: () => import('./views/User.vue')
}
<router-link :to="{path:'/user', query: {name:'zs',id='123'}}">消息</router-link>
<router-view></router-view>

// 使用方法跳转
this.push({
    name: 'zs',
    id: '123'
})
```

### 导航守卫

进入到每个页面，显示当前页面的title。

```vue
// 1.首先，在创建路由的时候添加以下该路由的元数据
{
    path:'/user',
    component: () => import('./views/User.vue'),
    meta: {
        title: '用户'
    }
}
// 2.在router.js中设置前置守卫（guard）
// 跳转钱回调
router.beforeEach((to, from, next) => {
    // 可以直接在to里拿到title，存在嵌套的话拿不到，需要用to.matched
    // to：即将要进入到的目标的路由对象
    // from：当前导航将要离开的路由对象
    // next：调用该方法后，次啊能进入到下一个钩子
    document.title = to.matched[0].meta.title
    // next可以传入多种参数，false表示中断当前的导航，'/'表示跳转到一个不同的地址
    next()
})

// 后置钩子（hook），跳转后回调
router.afterEach((to, from) => {
    // 不需要主动调用 next，没有next的参数
})
```

beforeEach和afterEach被称为全局守卫。还有路由独享守卫，组件内的守卫。

- 路由独享守卫：routes中设置路由的参数，beforeEnter(to, from, next)
- 组件内的守卫：写在组件内，beforeRouterEnter(to,from,next) 、 beforeRouterUpdate(to, from, next) 、 beforeRouterLeave(to, from, next)

### keep-alive

keep-alive是Vue内置的组件，可以使被包含的组件保留状态，或避免重新渲染。

router-view也是一个组件，如果之间被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存：

```vue
<keep-alive>
    <router-view/>
</keep-alive>

data(){
    return {
        path: '/home/news'
    }
}
activated(){
    // 活跃的时候
    this.#router.push(this.path)
}
<!-- deactived(){
    // 不活跃的时候
    this.path = this.$route.path
} -->
beforeRouterLeave(to, from, next){
    // 离开的时候记录path
    this.path = this.$route.path
    next()
}
// activated和deactived只有使用keep-alive的时候才有效。
```

keep-alive的属性：

- exclude: `<keep-alive exlude="profile,user">`，任何匹配的组件不会被缓存
- include: 字符串或正则表达式，只有匹配的组件会被缓存
