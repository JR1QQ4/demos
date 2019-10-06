# 冷知识夏令营

1.内容超出显示省略号：

```css
/* 第一种 */
width: 100px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
/* 第二种 */
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```

2.不使用 js 切换 tab 样式：

```css
/*
<div class="nav">
    <input name="nav" type="radio" hidden="" id="a">
    <label class="nav-label" for="a">1</label>
    <input checked="" name="nav" type="radio" hidden="" id="b">
    <label class="nav-label" for="b">2</label>
    <input name="nav" type="radio" hidden="" id="c">
    <label class="nav-label" for="c">3</label>
    <input name="nav" type="radio" hidden="" id="d">
    <label class="nav-label" for="d">4</label>
</div>
 */
 .nav input:checked+label {
    padding-top: 20px;
    height: 60px;
    background-color: #fffffff2;
}
.nav .nav-label {
    display: inline-block;
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: #ffffff4d;
}
```

3.不使用 js 的进度条

```css
/* 
<body>
    <head></head>
    <main></main>
</body>
 */
body {
    margin: 0;
    background: linear-gradient(to right top,#0089f2 50%,#ddd 50%);
    background-size: 100% calc(100% - 100vh + 129px);
    background-repeat: no-repeat;
}
body:before {
    content: '';
    position: fixed;
    top: 128px;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background: #fff;
}
header {
    position: fixed;
    top: 0;
    z-index: 2;
    height: 125px;
    width: 100%;
    background: #fff;
}
```

4.IE6/7/8不支持使用 rgba 模式实现透明度，可使用 IE 滤镜处理

```css
background: rgba(0,0,0,.5);
/* 对应 */
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#7f000000,endColorstr=#7f000000);
/* 一一对应的值如下 */
0.1 - 19
0.2 - 33
0.3 - 4c
0.5 - 7f
0.6 - 99
0.7 - b2
0.8 - c8
0.9 - e5
```
