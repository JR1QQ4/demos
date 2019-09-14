# jquery

版本：

- 1.x ：兼容 IE 678，不再更新
- 2.x ：不兼容 IE 678，不再更新
- 3.x ：不兼容 IE 678，主要更新维护的版本

## 入口函数

两种方式等价，页面DOM加载完成执行，相当于 DOMContentLoaded，不同于 load 需要把外部 js 文件、css 文件、 图像加载完毕才执行。

jQuery 编写多个入口函数不会覆盖，原生js编写多个入口函数后面的会覆盖前面的。

```javascript
    $(document).ready(function () {
        $('div').hide();
    });

    $(function () {
        $('div').hide();
    })
```

## jQuery 对象

`$`是`jQuery`的别名，两者可以替代；`$`是jQuery种的顶级对象。`$()`可以传入一个入口函数、DOM对象、代码片段（创建元素）、传入选择器。

- DOM 对象变成 jQuery 对象：`$(DOM)`，jQuery 对象才能使用 jQuery 的方法。
- jQuery 对象变成 DOM 对象：`$(DOM)[index]` 或者 `$(DOM).get(index)`，此时就能使用原生js的方法。

多库共存，解决冲突：

- 把 `$` 改为 `jQuery`
- jQuery 变量规定新名称：`var xx = $.noConflict();`

`$`的静态方法：$.isWindow(obj) 、$.isarray(obj) 、$.trim(str) 、$.isFunction(obj)...

## 选择器

基础选择器：`$("#id")`、`$(".class")`、`$("*")`、`$("div")`、`$("div,p,li")`、`$("li.active")`

层级选择器：`$("ul>li")`、`$("ul li")`

筛选选择器：`$("li:first")`、`$("li:last")`、`$("li:eq(2)")`、`$("li:odd")`、`$("li:even")`

表单；`$("input[type=checkbox]:checked")`

筛选方法：

- `$("li").parent()`、`$(this).parents(".wrapper")`
- `$("ul").children("li")`
- `$("ul").find("li")` ：相当于后代选择器
- `$(".first").siblings("li")` ：查找兄弟节点，不包括自身
- `$(".first").nextAll()` ：查找当前元素之后所有的同辈元素
- `$(".last").prevAll()` ：查找当前元素之前所有的同辈元素
- `$("div").hasClass("active")` ：见着当前蒜素是否有某个特定的类，有返回 true
- `$("li").eq(2)` ：相当于`$("li:eq(2)")`，index 从 0 开始

获取索引：`var index = $(this).index()`

## 样式操作

隐式迭代：`$("div").css("backgroundColor", "pink")`，jquery 会把匹配到的所有元素内部进行遍历循环，给每一个元素添加 css 这个方法。

`$(this).css()`方法：

- `$(this).css("color")` ：返回 color 的值
- `$(this).css("color","pink")` ：设置 color 的值
- `$(this).css({ width:400,height:200px })` ：对象的方式修改 css

类样式：与原生 className 不同，不会改变以前类名，只是针对指定类进行操作

- `$(this).addClass("current")` ：添加类
- `$(this).removeClass("current")` ：删除类
- `$(this).toggleClass("current")` ：切换类

## 效果

显示隐藏：`show([speed, [easing], [fn]])`、`hide()`、`toggle()`

滑动：`sildeDown()`、`sildeUp()`、`slideToggle()`

淡入淡出：`fadeIn()`、`fadeOut()`、`fadeToggle()`、`fadeTo([[speed], opacity, [eading], [fn]])`

动画：`animate(params, [speed], [easing], [fn])`

事件切换：`hover([over,]out)`，over 对应 mouseenter，out 对应 mouseleave。动画或效果队列：动画或者效果一旦触发就会执行，如果多次触发就造成多个动画或者效果排队执行。

```javascript
// 只写一个函数，表示两个回调函数执行一个方法
$("ul>li").hover(function(){
    // stop 必须写在动画的前面，谁做动画就写在那里，相当于停止结束上一次的动画
    $(this).children("ul").stop().sildeToggle();
});

$(".wrap li").mouseenter(function(){
    $(this).stop().animate({
        width: 224
    }).find(".small").stop().fadeOut().siblings(".big").stop().fadeIn();
    $(this).siblings("li").stop().animate({
        width: 69
    }).find(".small").stop().fadeIn().siblings(".big").stop().fadeOut();
})
```

## 属性

设置或获取元素固有属性值：`$(this).prop("title")`、`$(this).prop("title", "this is title")`

设置或获取自定义属性：`$(this).attr("data-index")`、`$(this).attr("data-index","1")`

数据缓存`data()`：可以在指定的元素上存取数据，并不会修改DOM元素结构，一旦页面刷新，之前存放的数据都将被移除，设置的属性在DOM上看不见。

data 与 attr 区别：

- data 获取 h5 自定义属性不需要写 data-，如获取 data-index, 只需要写`$(this).data("index")`
- data 获取到的如果是数字就是 Number 类型，attr 获取的是 String 类型

```javascript
// 原生获取设置 data 属性
<div id="nav" data-index="1">首页</div>
var nav = document.getElementById("nav");
console.log(nav.dataset.index); // 1
nav.dataset.time = Date.now();
console.log(nav.dataset.time); // 1568196434576
```

## 内容文本值

普通元素内容：

- 标签 html: `$("div").html`、`$("div").html("<h2>设置文本值</h2>")`
- 文本 text: `$("div").text()`、`$("div").html("text")`
- 表单 val: `$("input").val()`、`$("input").val("text")`

## 元素操作

遍历元素：

- each： `$(div).each(function(index, domEle) {})`，第二个参数是 DOM 对象，不是 jQuery 对象
- `$.each`：`$.each($(div), function(index, domEle) {})`，主要用于遍历数据处理数据
  - 不仅可以遍历数组，还能遍历伪数组
  - `$.map()`返回处理后的新数组

```javascript
// $.each 方便遍历数据，比如对象、数组
var arr = ["red", "green", "blue"]
$.each(arr, function(i, ele){
    console.log(i + "---" + ele);
});
// 0---red
// 1---green
// 2---blue
```

创建元素：`var li = $("<li>创建的li</li>");`

添加元素：

- 内部添加，父子关系：`$("ul").append(li);`、`$("ul").prepend(li);`
- 外部添加，兄弟关系：`$("div").after(div)`、`$("div").before(div)`

删除元素：

- `$(this).remove()`，删除匹配的元素
- `$("ul").empty()`，删除 ul 里的 li，即删除子节点
- `$("ul").html("")`，清除内部元素

## 尺寸、位置操作

尺寸：

- `width()/height()`：只算 width/height
- `innerWidth()/innerHeight()`：包含 padding
- `outerWidth()/outerHeight()`：包含 padding、border
- `outerWidth(true)/outerHeight(true)`：包含 padding、border、margin

位置：

- `offset()`：返回一个对象，距离文档的上左位置`{left:x,top:x}`，也可以设置
- `position()`：获取距离带定位的父级元素的位置，不能设置
- `scrollTop()/scrollLeft()`：设置或获取元素被卷去的头部和左侧

```javascript
var flag = true;
// 返回顶部
$(".back").click(function(){
    flag = false;
    // 使用 scrollTop 但是没有过渡动画
    // $(document).scrollTop(0);
    // animate 是元素做动画不是 document
    $("body,html").stop().animate({
        scrollTop: 0
    },function(){
        flag = true;
    });
})
// 每次点击操作都会触发 $(window).scroll 方法，会有 bug，此时需要设置标志位，节流阀
// 如果用户点击了，就不触发 scroll 方法，当动画执行完毕之后再恢复 flag
```

## 事件

事件注册：

- 单个事件注册：`element.事件()`
- 绑定一个或多个事件：`element.on(events, [selector], fn)`
  - `on`方法还能实现事件委托
  - `on`方法可以为动态创建的元素添加事件

```javascript
$("div").on({
    mouseenter: function(){
        $(this).css("background", "skyblue");
    },
    mouseleave: function(){
        $(this).css("background", "greenyellow");
    }
})

// 如果多个事件的事件处理函数一样，则可以简写
$("div").on("mouseenter mouseleave", function(){
    $(this).children(".item").stop().fadeToggle();
    $(this).toggleClass("current");
})

// 事件委托
$("ul").on("click", "li", function(){
    // 此时的 this 不是 ul，而是 li
    console.log(this);
});
```

解绑事件：`$(this).off()`、`$(this).off("click")`、`$("ul").off("click", "li")`，可以解除所有事件、单个事件、事件委托

如果有的事件指向触发一次，可以使用 `one()` 来绑定事件：`$("p").one("click", function(){ })`

自定触发事件`trigger`：

- `$("div").click()`，不是事件注册，是调用已经注册的事件
- `$("div").trigger("click")`
- `$("div").triggerHandler("click")`，不会触发元素的默认行为

事件对象：`$("div").on(events, [selector], function(event){})`，即 event

- 阻止默认行为： event.preventDefault() 或者 return false
- 阻止冒泡：event.stopPropagation()

## 对象拷贝

如果想要把某个对象拷贝（合并）给另一个对象使用，`$.extend([deep], target, object1, [objectN])`

- deep：如果为 true 表示深拷贝，默认 false 表示浅拷贝（只拷贝地址）
- target：要拷贝的目标对象
- object1：待拷贝的第一个对象

```javascript
// 会覆盖合并新的对象
var targetobj = {
    id: 0
};
var obj = {
    id: 1,
    msg: "hello"
}
$.extend(targetobj, obj);
console.log(targetobj); // {id: 1, msg: "hello"}

// 深拷贝，如果是复杂数据类型，是做交集运算
var targetobj = {
    id: 0,
    msg: {
        age: 18
    }
};
var obj = {
    id: 1,
    msg: {
        name: "zs"
    }
}
$.extend(true, targetobj, obj);
console.log(targetobj); // {id: 1, msg: {age:18, name: "zs"}}
```
