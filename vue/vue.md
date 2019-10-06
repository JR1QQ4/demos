# Vue 学习笔记

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。渐进式，由浅入深，由简单到复杂，由一部分到全部使用。

## 指令

1.插值：

- {{ mustache }} ，用于动态输出标签内的内容，不能用于绑定属性
- v-once ，后面没有内容，绑定之后，原数据修改本身不会变
- v-pre ，后面没有内容，作用类似 pre 标签
- v-cloak ，后面没有内容，避免浏览器直接显示未编译的 mustache 标签，添加这个属性之后，可以使用 css 控制显示
  - `[v-cloak] { display: none; }`，解析之后会删除该属性
- v-bind:value="value" ，用于动态绑定属性，简写 `:`
  - 常用于改变 class 属性，`:class={class1: hasclass1, class2: hasclass2}`
  - class 除了可以使用对象，还可以使用数组 `:class="['class1', 'class2']"`
  - 也可以改变 style 属性，`:style="{fontSize:'14px',color:'#4fc08d'}"`，或者 `:style="[baseStyle, currentStyle]"`

2.遍历：

- v-for="item in foods"
- v-for="(item, key) in foods"
- v-for="(item, key, index) in foods"
  - 添加 key 之后，方便复用
  - v-for="(item, key, index) in foods" :key="item" ，绑定 item 保证元素唯一性

3.文字内容绑定：

- v-html="url" ，类似原生的 innerHTML
- v-text="text" , 类似原生的 innerText

4.事件绑定：

- v-on:click="add()" ，简写 @click="add()"
  - 不传参数时，可以省略括号， @click="add"
  - 函数本身需要参数，但是没有传，省略了括号，此时函数内部调用是 event 对象
  - 函数既需要 event 对象，又需要参数 `function(event, b)`，绑定时省略括号，第一个就是 event 对象
  - 绑定时可以把 event 对象传递给函数， `@click="btnClick(23,$event)"`

5.v-on 修饰符

- `@click.stop="btn.click"` ，阻止冒泡
- `.prevent` ，阻止默认事件
- `.stop` ，阻止单击事件继续传播
- `.capture` ，提交事件不再重载页面
- `.self` ，只当在 event.target 是当前元素自身时触发处理函数
- `.passive` ，滚动事件的默认行为 (即滚动行为) 将会立即触发，提升移动端的性能
- `.{keycode | keyAlias}` ，按下特定按键时触发
- `.nactive` ，`监听组件根元素的原生事件`，组件本身不能点击，添加之后能点击
- `.once` ，只触发一次回调

6.条件判断

- `<h2 v-if="isShow"></h2>`
- `<h2 v-else-if="isShow"></h2>`
- `<h2 v-if="else"></h2>`
  - 当 v-if 与 v-else 中元素的 key 一样时，会复用该元素；切换元素，也能看到之前输入的值
- `<h2 v-show="isShow"></h2>`
  - 与 v-if 区别：v-show 绑定的元素会一直存在，只是设置了 `style="display:none"`

## 选项

```vue
const vm = new Vue({
    // 入口，决定处理哪个 DOM，可以传入 HTMLElement
    el: '#app',
    // 处了传入 obj，还能传入函数，组件中 data 必须是函数
    data: {},
    // 定义的一些方法，可以在其他地方调用，也可以在指令中使用
    methods: {}
})
```

## 生命周期

生命周期函数：beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed

```vue
const vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    beforeCreate: function(){},
    created: function(){},
    beforeMount: function(){},
    // 已经创建 vm.#el 并用其替换 "el"
    mounted: function(){},
    beforeUpdate: function(){},
    updated: function(){},
    beforeDestroy: function(){},
    destroyed: function(){}
})
```

## 计算属性

每个计算属性，都有 getter、setter 方法，默认情况省略了 setter，写的时候只写了 getter，并简写省去了 getter。

```vue
computed: {
    // 简写
    fullName: function () {
        return this.firstName + '.' + this.lastName
    },
    // 全写，赋值的时候调用 set，vm.totalPrice = 'newValue'
    totalPrice: {
        set: function (value) {
            this.total = value
        },
        get: function () {
            return this.books.reduce(function (num, v) {
                return num + v.price;
            }, 0)
        }
    }
}
```

计算属性与方法的区别：

- 计算属性因为由缓存，如果内部代码不变，只会调用一次；而方法使用多少次，就带哦用多少次

## 响应式

具有响应式的方法，直接赋值不是响应式的 ：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

vue 的 set 方法进行响应式设置：

- `arr=[1,5,2] Vue.set(this.arr, 0, '213')`
- set(要修改的对象，索引值， 修改后的值)

## 过滤器

过滤器时一个方法，类似 methods 里面的方法。

```vue
// html 中的代码，{{要过滤的参数 | 过滤器名称}}
<td>{{item.price | showPrice}}</td>

// js ,也可以写成 showPrice: function(price){}，对象增强的写法
filters: {
    showPrice(price) {
        return '￥' + price.toFixed(2)
    }
}
```

遍历：

```javascript
let total = 0
// 1.for
// for (let i = 0; i < this.books.length; i++) {
//     total += this.books[i].price * this.books[i].count
// }

// 2.for-in
// for (let i in this.books) {
//     total += this.books[i].price * this.books[i].count
// }

// 3.for-of
// for (const book of this.books) {
//     total += book.price * book.count
// }

// 4.reduce()
// total = this.books.reduce(function (previousValue, n) {
//     return previousValue + n.price * n.count
// }, 0);
total = this.books.reduce((pre, n) => {
    return pre + n.price * n.count
}, 0)
return total
```

## 双向绑定

v-model，等价与 v-bind + @input ：

- `<input type="text" v-model:value="message">`
- `<input type="text" :value="message" @input="msgChange">`

绑定单选按钮：

- `<input type="radio" value="男" id="male" v-model="sex">`
- `<input type="radio" value="女" id="female" v-model="sex">`
- 当两个按钮绑定的是一个值，可以省略 name 属性
- 为了使绑定输出值，需要给按钮添加 value 属性，初始的时候，可以给定 sex 一个默认值

绑定多选按钮：

- data 中定义一个数组，绑定的多选框选中时，会往数组中添加值 push

```html
<!-- 值绑定：动态生成多选按钮，hobbies 预设的数据，hobby 动态添加数据 -->
<label :for="item" v-for="(item,index) in hobbies">
    <input :id="item" v-model="hobby" name="hobbies" type="checkbox" :value="item">{{item}}
</label>
```

绑定select：

- 没有 `multiple`,数据中定义和单选按钮一样；可以选择多个，需要定义数组
- `area: '北京'` 与 `areas: ['北京','上海']`

### 修饰符

修饰绑定的数据：

- `v-model.lazy="msg"`，按下回车或失去焦点时更新数据
- `v-model.number="num1"`，修改数据类型，修改值的时候就会把类型改变
- `v-model.trim="str"`，在输入框值的左右两边添加空格，失去焦点时会自动去除空格

## 组件

创建和使用组件，全局组件可以在任意Vue实例下使用，局部组件只能在当前实例下使用：

```vue
// 全局组件
// 方法一
const tp1 = Vue.extend({
    template: `
    <div><h2>组件1</h2><p>模板要被包围在一个元素中</p></div>
    `
})
Vue.component('mycomponent1', tp1)

// 方法二：内部调用的 Vue.extend，这是一个语法糖
Vue.component('mycomponent2', {
    template: `
    <div>
        <h2>组件3</h2>
        <p>可以直接写在 component 里</p>
    </div>
    `
})

// 方法三：使用 template 标签 或者 <script type="text/x-template"><script> 注册组件
<template id="cp3">
    <div>
        <h3>使用 template 标签注册组件</h3>
    </div>
</template>
Vue.component('mycomponent3', {
    template: '#cp3'
})

// 局部组件
new Vue({
    components: {
        mycomponent4: {
            template: `
            <div>
                <h2>组件4</h2>
                <p>当然可以写在 Vue 实例中</p>
            </div>
            `
        }
    }
})

// 使用
<div id='app'>
    <mycomponent1></mycomponent1>
    <mycomponent3></mycomponent3>
    <mycomponent4></mycomponent4>
</div>
```

注意：`如果组件注册时使用的是大驼峰命名法，使用的时候除了直接安装注册时的写法编写，还可以变成短横线写法编写代码，即RouterView => router-view`

### 父组件和子组件

```vue
// 子组件
const tp1 = Vue.extend({
    template: `<h4>子组件</h4>`
})
// 父组件
const tp2 = Vue.extend({
    template: `<div><h3>父组件</h3>
        <cpn1></cpn1>
    </div>
    `,
    components: {
        cpn1: tp1
    }
})
```

组件中不可以直接访问 Vue 实例数据，组件中的 data 属性用于存放组件自身数据，但是这个 data `必须是函数`。

```javascript
// 组件的 data 必须是函数，避免每个组件公用同一个 data
Vue.component(id, {
    template: '#cpn',
    data(){
        return {
            msg: 'cpn msg'
        }
    },
    // 组件中也可以又自己的 方法
    methods: {}
})
```

### 父子组件的通信

父子组件的通信：

- 父组件通过`props`向子组件传递数据
  - props 如果使用的驼峰命名法，使用时需用短横线命名
- 子组件通过`发送自定义事件$emit`向父组件发送消息

```vue
<div id='app'>
    <!-- 组件绑定的 属性是组件中props的值，属性值是vue实例中的data的值 -->
    <cpn2 :my-movies="movies"></cpn2>
    <!-- 不绑定直接传值，是传递的字符串，不是变量 -->
    <cpn2 my-movies="movies"></cpn2>
</div>
new Vue({
    el: '#app',
    data: {
        movies: ['无限战争', '死侍', '蜘蛛侠', '哥斯拉']
    }
    ...
})
Vue.extend({
    template: '#cpn',
    props: ['myMovies'],
    ...
})

// props 的另外写法
// 写法一：对象，指定传入参数的数据类型
props: {
    myMovies: Array,
}
// 写法二：对象，除了数据类型，还可以有其它可选选项
props: {
    myMovies: {
        type: Array,
        // 默认值
        default: ['海贼王','火影忍者'],
        // 必须传入数据
        required: true
        // 验证
        validator: function(value) {
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
    }
}
```

```vue
// 父组件接收 自定义事件，触发自己的 itemclick1 方法
// itemclick1 可以省略括号及参数，因为是自定义事件，不会自动传入浏览器 event 对象，而是传入子组件传递的参数
<div id='app'>
    <cpn2 @item-click="itemclick1"></cpn2>
</div>
new Vue({
    ...
    methods: {
        itemclick1(title) {
            console.log(title);
        }
    }
})

// 子组件发送函数 item-click 和数据 this.title 给父组件
// 触发的方法名，最好使用 短横线命名法
<template id="cpn">
    <div>
        <button @click="sendMsg">发送给父组件</button>
    </div>
</template>
Vue.extend({
    ...
    methods: {
        sendMsg() {
            this.$emit('item-click', this.title)
        }
    }
})
```

### 父子组件的访问方式

父子组件的访问方式：

- 父组件访问子组件：使用`$children`或`$refs`引用
  - `this.$children`是一个数据类型，包含所有子组件对象
- 子组件访问父组件：使用`$parent`

```vue
<div id='app'>
    <cpn></cpn>
    <cpn></cpn>
    <cpn></cpn>
    <button @click="btnclick">按钮</button>
</div>
btnclick() {
    // [VueComponent, VueComponent, VueComponent]
    console.log(this.$children);
    // 遍历获取子组件中的 name 数据，需要先定义子组件data
    for (const c of this.$children) {
        console.log(c.name);
    }
}
```

```vue
<template id="cpn">
    <div>
        <h3>我是子组件</h3>
        <button @click="btnclick">按钮</button>
        <cpn1></cpn1>
    </div>
</template>
<template id="cpn1">
    <div>
        <h3>我是子组件的子组件</h3>
        <button @click="btnclick">按钮</button>
    </div>
</template>
components: { // 这个是 vue 实例上面定义的
    cpn: {
        template: '#cpn',
        methods: {
            btnclick() {
                console.log(this.$parent);
            }
        },
        data(){ // 为子组件添加数据
            return {
                msg:'我是父组件的msg'
            }
        },
        components: {
            cpn1: {
                template: '#cpn1',
                methods: {
                    btnclick() { // 直接获取父组件，以及父组件的数据，根组件
                        console.log(this.$parent);
                        console.log(this.$parent.msg);
                        console.log(this.$root);
                    }
                }
            }
        }
    }
}
```

`ref`如果时绑定在组件中，那么通过`this.$ref.refname`获取到的是一个组件对象；如果绑定在普通的元素中，那么通过`this.$ref.refname`获取到的是一个元素对象。

## watch

监听 data 的改变。

```vue
<input type="text" v-model="msg">

data: {
    msg: 'hello',
    oldmsg: '',
    newmsg: ''
},
watch: {
    <!-- 函数的名称是 data 的名称，只要 data 中数据改变就会触发 -->
    msg(newvalue, oldvalue) {
        this.newmsg = newvalue
        this.oldmsg = oldvalue
    }
}
```

## slot 插槽

```vue
<template id="cpn">
    <div>
        <h2>我是组件</h2>
        <slot><button>默认按钮</button></slot>
    </div>
</template>
<cpn>我是插槽内容</cpn>
<cpn>
    <label>按钮标签<button>按钮</button></label>
</cpn>

// 具名插槽，位置是按照模板中的位置排列
<template id="cpn">
    <div>
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
    </div>
</template>
<cpn>
    <!-- <div slot="right">替换右边的插槽</div>
    <div slot="center">替换中间的插槽</div>
    <div slot="left">替换左边的插槽</div> -->
    <template v-slot:right>
        <h1>Here might be a page title</h1>
    </template>
    <template v-slot:center>
        <h1>Here might be a page title</h1>
    </template>
    <template v-slot:left>
        <h1>Here might be a page title</h1>
    </template>
</cpn>

// 作用域插槽，父组件想要重新排列子组件
<template id="cpn1">
    <div>
        // data 可以换成其它的名称
        <slot :data="lists">
            <ul>
                <li v-for="item in lists">{{item}}</li>
            </ul>
        </slot>
    </div>
</template>
<cpn1>
    // 绑定插槽，slot.data 就能获得绑定的 data
    <!-- <template slot-scope="slotProps">
        <div>
            <!-- <span v-for="item in slot.data">{{item}} -</span> -->
            <span>{{slot.data.join(" - ")}}</span>
        </div>
    </template> -->
    <template v-slot:default="slotProps">
        <div>
            <span>{{slotProps.data.join(" - ")}}</span>
        </div>
    </template>
</cpn1>
// 组件内部有定义 数据，绑定不是 data，是 lists
cpn1: {
    template: '#cpn1',
    data() {
        return {
            lists: ['a', 'b', 'c']
        }
    }
}
```

## js 模块化

```javascript
// a.js
;const moudleA = (function () {
    const obj = {}
    obj.aaa = 'aaa'
    return obj
})()

// b.js
;const moudleB = (function () {
    const obj = {}
    obj.bbb = 'bbb'
    return obj
})()

// main.js
console.log(moudleA.aaa)
console.log(moudleB.bbb)
```

常见的模块化规范：`CommonJS`、`AMD`、`CMD`、`ES6中的Modules`

```javascript
// CommonJS
// 导出
const a = 'aaa'
const b = 'bbb'
module.exports = {
    a: a,
    b: b
}
// 导入，两种方式
let mouduleA = module.require('./ajax.js')
let {a, b} = module.require('./ajax.js')
```

```javascript
// type="module" 可以创建单独作用域，能解决命名冲突；但是外部访问不到
<script src="./a.js" type="module"></script>
<script src="./b.js" type="module"></script>

// 导出，前提 script type 要是 module
const a = 'aaa'
const sum = function(a,b){
    return a + b
}
export {
    a,sum
}
// 除了直接导出变量，还能导出类、函数等
export const flag = false
// 还可以使用 export default 导出，由导入者命名
// 相当于设置默认导入，但是同一个模块中只能有一个 export default
export default function(){
    console.log("export default")
}

// 导入，前提 script type 要是 module
import * as mouduleA from './a.js'
import {flag} from './a.js'
import defaultFn from './a.js'
console.log(mouduleA.a)
console.log(mouduleA.sum(1,2))
```

## template

```vue
// 最后 template 会替换掉 el
<div id='app'></div>
const vm = new Vue({
    el: '#app',
    template: `
        <div>
            <h3>{{msg}}</h3>
            <button @click="btnclick">按钮</button>
            <small>template 替换了 el</small>
        </div>
    `,
    data: {
        msg: 'hello template'
    },
    methods: {
        btnclick() {
            console.log('btnclick')
        }
    }
})

// 组件抽离写法
<div id='app1'></div>
const tpl = {
    template: `
        <div>
            <h3>{{msg}}</h3>
            <button @click="btnclick">按钮</button>
            <small>template 替换了 el</small>
        </div>
    `,
    data() {
        return {
            msg: 'hello template1，组件抽离写法'
        }
    },
    methods: {
        btnclick() {
            console.log('btnclick1')
        }
    }
}
new Vue({
    el: '#app1',
    template: '<tpl></tpl>',
    components: {
        tpl
    }
})

// 把组件放到单独文件里，然后导入模块
export default { 组件的内容 }
<div id='app2'></div>
import tp2 from './vue/app'
new Vue({
    el: '#app2',
    template: '<tp2></tp2>',
    components: {
        tp2
    }
})

// 最总版本，创建 .vue 文件
<template>
    <div>
        <h3>{{msg}}</h3>
        <button @click="btnclick">按钮</button>
        <small>template 替换了 el</small>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                msg: 'hello template.vue，组件抽离写法'
            }
        },
        methods: {
            btnclick() {
                console.log('btnclick1111')
            }
        }
    }
</script>
<style scoped>
</style>
// 导入
import App from './vue/App.vue'
new Vue({
    el: '#app',
    template: '<App></App>',
    components: {
        App
    }
})
```

识别`.vue`文件需要另外的`loader`：

- `npm install vue-loader vue-template-compiler --save-dev`
- 配置：
  - `const VueLoaderPlugin = require('vue-loader/lib/plugin')`
  - `{test: /\.vue$/,use: ["vue-loader"]}`
  - Vue-loader在15X版本后需要 VueLoaderPlugin 插件
  - `plugins: [ new VueLoaderPlugin() ]`

## vue-cli

CLI (Command-Line Interface)，命令行界面，俗称脚手架。

```vue
$npm install -g @vue/cli
$vue create projectname
$vue ui  // 打开图形化界面，配置项目

// 选择自定以创建的时候，会把配置文件放到磁盘c:/user/username/.vuerc 里面
// 创建完成后，如果需要更改其它配置，需要在根目录创建 vue.config.js 文件，编译时会自动合并配置
```

webpack 中 package-lock.json 是用做映射的，package.json 中的`^`表示大概的版本，与`~`类似，如`webpack:^4.3.0`可能安装`webpack:4.3.3`版本，package-lock.json 就能消除影响。

使用 template ，内部渲染步骤：

- 对应`runtime-compiler(v1)` : template -> ast -> render -> virtual dom -> UI
- 直接使用 render 函数，代码量更少：
  - 对应`runtime-only(v2)` : render -> virtual dom -> UI

### render

```vue
<div id='app'>
</div>
<template id="cpn">
    <div>
        <h2>使用 render 渲染模板</h2>
        <ul>
            <li>runtime-compiler: template -> ast -> render -> virtual dom -> UI</li>
            <li>runtime-only: render -> virtual dom -> UI</li>
        </ul>
    </div>
</template>
const tpl = {
    name: 'tpl',
    template: '#cpn'
}

// 使用 template
const vm = new Vue({
    el: '#app',
    template: '<tpl/>',
    components: {
        tpl
    }
})

// 使用 render
const vm = new Vue({
    el: '#app',
    render(h) {
        return h(tpl)
    }
    // 或者
    render: (h) => h(tpl)
})
```

默认 render 函数传入的是 `createElement` :

- createElement 接收三个参数，`createElement(标签, {标签的属性}, [标签里的内容])`，标签里的内容可以再次嵌套 createElement
- createElement 还可以传递`组件`
  - `.vue`文件中的 `template` 在解析的时候已经被解析成 render 可以渲染的了，使用插件`vue-template-complier`
