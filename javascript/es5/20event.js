/**
 * EventTarget 接口
 * DOM 的事件操作（监听和触发），都定义在EventTarget接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，XMLHttpRequest、AudioNode、AudioContext）也部署了这个接口。
 *
 * 该接口主要提供三个实例方法:
 *   addEventListener：绑定事件的监听函数
 *   removeEventListener：移除事件的监听函数
 *   dispatchEvent：触发事件
 *
 * target.addEventListener(type, listener[, useCapture]);
 *   type：事件名称，大小写敏感。
 *   listener：监听函数。事件发生时，会调用该监听函数。还可以是一个具有handleEvent方法的对象。
 *   useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发,默认为false（监听函数只在冒泡阶段被触发）
 *     第三个参数除了布尔值useCapture，还可以是一个属性配置对象。
 *       capture：布尔值，表示该事件是否在捕获阶段触发监听函数
 *       once：布尔值，表示监听函数是否只触发一次，然后就自动移除。
 *       passive：布尔值，表示监听函数不会调用事件的preventDefault方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。
 *  
 *  同一个元素节点，监听函数 和 第单个参数必须一致
 *  element.addEventListener('mousedown', handleMouseDown, true);
 *  element.removeEventListener("mousedown", handleMouseDown, false);
 *
 *  target.dispatchEvent(event) 返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true
 *
 */

// addEventListener方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。这些函数按照添加顺序触发，即先添加先触发。如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除（不必使用removeEventListener方法手动去除）。
// window.onload = function () {
//     buttonElement.addEventListener('click', {
//         handleEvent: function (event) {
//             console.log('click');
//         }
//     });

// 如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数
// function print(x) {
//     console.log(x);
// }
// var el = document.getElementById('div1');
// el.addEventListener('click', function () { print('Hello'); }, false);

// 如果dispatchEvent方法的参数为空，或者不是一个有效的事件对象，将报错
// para.addEventListener('click', hello, false);
// var event = new Event('click');
// para.dispatchEvent(event);
// }

/**
 * 事件模型
 * 
 * HTML 的 on- 属性：这些属性的值是将会执行的代码，而不是一个函数
 *   使用这个方法指定的监听代码，只会在冒泡阶段触发
 *   <body onload="doSomething()">
 *   <div onclick="console.log('触发事件')">
 * 
 * 元素节点的事件属性：使用这个方法指定的监听函数，也是只会在冒泡阶段触发
 *   window.onload = doSomething;
 *   div.onclick = function (event) {
 *   console.log('触发事件');
 *   };
 * 
 * EventTarget.addEventListener()
 *   window.addEventListener('load', doSomething, false);
 * 
 * 事件传播的最上层对象是window，接着依次是document，html（document.documentElement）和body（document.body）
 * 在捕获阶段依次为window、document、html、body、div、p，在冒泡阶段依次为p、div、body、html、document、window。
 */
{/* <div>
    <p>点击</p>
</div> */}
// var phases = {
//     1: 'capture',
//     2: 'target',
//     3: 'bubble'
// };
// var div = document.querySelector('div');
// var p = document.querySelector('p');
// div.addEventListener('click', callback, true);
// p.addEventListener('click', callback, true);
// div.addEventListener('click', callback, false);
// p.addEventListener('click', callback, false);
// function callback(event) {
//     var tag = event.currentTarget.tagName;
//     var phase = phases[event.eventPhase];
//     console.log("Tag: '" + tag + "'. EventPhase: '" + phase + "'");
// }
// 浏览器总是假定click事件的目标节点，就是点击位置嵌套最深的那个节点（本例是<div>节点里面的<p>节点）。所以，<p>节点的捕获阶段和冒泡阶段，都会显示为target阶段。
// 点击以后的结果
// Tag: 'DIV'. EventPhase: 'capture'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'DIV'. EventPhase: 'bubble'

/**
 * 事件的代理
 * 由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
 *
 * 如果希望事件到某个节点为止，不再传播，可以使用事件对象的stopPropagation方法。
 *
 * 如果想要彻底取消该事件，不再触发后面所有click的监听函数，可以使用stopImmediatePropagation方法。
 */
// var ul = document.querySelector('ul');

// ul.addEventListener('click', function (event) {
//     if (event.target.tagName.toLowerCase() === 'li') {
//         // some code
//     }
// });

// 事件传播到 p 元素后，就不再向下传播了
// p.addEventListener('click', function (event) {
//     event.stopPropagation();
// }, true);

// 事件冒泡到 p 元素后，就不再向上冒泡了
// p.addEventListener('click', function (event) {
//     event.stopPropagation();
// }, false);

// p.addEventListener('click', function (event) {
//     event.stopImmediatePropagation();
//     console.log(1);
// });

// p.addEventListener('click', function (event) {
//     // 不会被触发
//     console.log(2);
// });

/**
 * Event 对象:
 * 浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象
 * event = new Event(type, options);
 *     第一个参数type是字符串，表示事件的名称；第二个参数options是一个对象，表示事件对象的配置
 *     bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡
 *     cancelable：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault()取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。
 *
 * 实例属性:
 * Event.bubbles 返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。
 * Event.eventPhase 返回一个整数常量，表示事件目前所处的阶段。该属性只读。
 * Event.cancelable 返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。
 * Event.cancelBubble 属性是一个布尔值，如果设为true，相当于执行Event.stopPropagation()，可以阻止事件的传播
 * event.defaultPrevented 属性返回一个布尔值，表示该事件是否调用过Event.preventDefault方法。该属性只读。
 * Event.currentTarget 属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。
 * Event.target 返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。
 *     事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的。
 * Event.type 返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。
 * Event.timeStamp 返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。
 * Event.isTrusted 返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的。
 * Event.detail 只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。
 *     比如，对于click和dblclick事件，Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。
 *
 * 实例方法
 * Event.preventDefault() 取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。
 *     该方法生效的前提是，事件对象的cancelable属性为true，如果为false，调用该方法没有任何效果。
 *     注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用stopPropagation()或stopImmediatePropagation()方法。
 * Event.stopPropagation() 阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。
 * Event.stopImmediatePropagation() 阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比Event.stopPropagation()更彻底。
 * Event.composedPath() 返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。
 */
// var ev = new Event(
//     'look',
//     {
//         'bubbles': true,
//         'cancelable': false
//     }
// );
// document.dispatchEvent(ev);

// HTML 代码为
// <div><p>Hello</p></div>
// var div = document.querySelector('div');
// var p = document.querySelector('p');
// function callback(event) {
//   var tag = event.currentTarget.tagName;
//   console.log('Tag: ' + tag); // 没有任何输出
// }
// div.addEventListener('click', callback, false);
// var click = new Event('click'); // 件默认不会冒泡
// p.dispatchEvent(click);

// 如果事件不能取消，调用Event.preventDefault()会没有任何效果。所以使用这个方法之前，最好用Event.cancelable属性判断一下是否可以取消。
// function preventEvent(event) {
//     if (event.cancelable) {
//         event.preventDefault();
//     } else {
//         console.warn('This event couldn\'t be canceled.');
//         console.dir(event);
//     }
// }

// if (event.defaultPrevented) {
//     console.log('该事件已经取消了');
// }

// HTML 代码为
// <p id="para">Hello <em>World</em></p>
// function hide(e) {
//     // 不管点击 Hello 或 World，总是返回 true
//     console.log(this === e.currentTarget);
//     // 点击 Hello，返回 true
//     // 点击 World，返回 false
//     console.log(this === e.target);
// }
// document.getElementById('para').addEventListener('click', hide, false);

// var evt = new Event('foo');
// console.log(evt.timeStamp); // 122.86499980837107

// 显示每秒移动的像素数量
// var previousX;
// var previousY;
// var previousT;
// window.addEventListener('mousemove', function (event) {
//     if (
//         previousX !== undefined &&
//         previousY !== undefined &&
//         previousT !== undefined
//     ) {
//         var deltaX = event.screenX - previousX;
//         var deltaY = event.screenY - previousY;
//         var deltaD = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

//         var deltaT = event.timeStamp - previousT;
//         console.log(deltaD / deltaT * 1000);
//     }
//     previousX = event.screenX;
//     previousY = event.screenY;
//     previousT = event.timeStamp;
// });

// var evt = new Event('foo');
// console.log(evt.isTrusted); // false

// HTML 代码如下
// <p>Hello</p>
// function giveDetails(e) {
//     console.log(e.detail);
// }
// document.querySelector('p').onclick = giveDetails;
// document.onclick = giveDetails;

// 为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。
// HTML 代码为
// <input type="text" id="my-input" />
// var input = document.getElementById('my-input');
// input.addEventListener('keypress', checkName, false);
// function checkName(e) { 
//     // 只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消
//     if (e.charCode < 97 || e.charCode > 122) {
//         e.preventDefault();
//     }
// }

/**
 * 鼠标事件,继承了MouseEvent接口。
 * click：按下鼠标（通常是按下主按钮）时触发
 * dblclick：在同一个元素上双击鼠标时触发。
 * mousedown：按下鼠标键时触发。
 * mouseup：释放按下的鼠标键时触发。
 * mousemove：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
 * mouseenter：鼠标进入一个节点时触发，进入子节点不会触发这个事件。
 * mouseover：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件
 * mouseout：鼠标离开一个节点时触发，离开父节点也会触发这个事件
 * mouseleave：鼠标离开一个节点时触发，离开父节点不会触发这个事件
 * contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文菜单键”时触发
 * wheel：滚动鼠标的滚轮时触发，该事件继承的是WheelEvent接口
 *
 * click事件指的是，用户在同一个位置先完成mousedown动作，再完成mouseup动作。因此，触发顺序是，mousedown首先触发，mouseup接着触发，click最后触发。
 * dblclick事件则会在mousedown、mouseup、click之后触发
 * mouseover事件和mouseenter事件，都是鼠标进入一个节点时触发。两者的区别是，mouseenter事件只触发一次，而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次
 *     在父节点内部进入子节点，不会触发mouseenter事件，但是会触发mouseover事件。
 * mouseout事件和mouseleave事件，都是鼠标离开一个节点时触发。两者的区别是，在父元素内部离开一个子元素时，mouseleave事件不会触发，而mouseout事件会触发。
 *
 * MouseEvent接口: 继承了Event接口，所以拥有Event的所有属性和方法。它还有自己的属性和方法。
 *     浏览器原生提供一个MouseEvent构造函数，用于新建一个MouseEvent实例。
 *     var event = new MouseEvent(type, options);
 *     除了Event接口的实例配置属性，该对象可以配置以下属性，所有属性都是可选的:
 *     screenX screenY 鼠标相对于屏幕的
 *     clientX clientY 鼠标相对于程序窗口的
 *     ctrlKey  布尔值，是否同时按下了 Ctrl 键，默认值为false。
 *     shiftKey 布尔值，是否同时按下了 Shift 键，默认值为false
 *     altKey   布尔值，是否同时按下 Alt 键，默认值为false
 *     metaKey   布尔值，是否同时按下 Meta 键，默认值为false。
 *     button    数值，表示按下了哪一个鼠标按键，默认值为0
 *     buttons   数值，表示按下了鼠标的哪些键
 *     relatedTarget 节点对象，表示事件的相关节点
 *
 * MouseEvent 接口的实例属性:
 * MouseEvent.altKey 返回一个布尔值，表示事件发生时，是否按下对应的键。它们都是只读属性。
 * MouseEvent.ctrlKey
 * MouseEvent.metaKey
 * MouseEvent.shiftKey
 * MouseEvent.button  返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。
 * MouseEvent.buttons
 * MouseEvent.clientX 返回鼠标位置相对于浏览器窗口的坐标（单位像素）
 * MouseEvent.clientY
 * MouseEvent.movementX 返回当前位置与上一个mousemove事件之间的距离（单位像素）
 * MouseEvent.movementY
 * MouseEvent.screenX 性返回鼠标位置相对于屏幕的坐标（单位像素）
 * MouseEvent.screenY
 * MouseEvent.offsetX 返回鼠标位置与目标节点左侧的padding边缘的水平距离（单位像素）
 * MouseEvent.offsetY
 * MouseEvent.pageX 返回鼠标位置与文档左侧边缘的距离
 * MouseEvent.pageY
 * MouseEvent.relatedTarget 返回事件的相关节点。对于那些没有相关节点的事件，该属性返回null。该属性只读
 *
 * MouseEvent 接口的实例方法:
 * MouseEvent.getModifierState()返回一个布尔值，表示有没有按下特定的功能键。它的参数是一个表示功能键的字符串
 *
 * WheelEvent 接口:
 * 继承了 MouseEvent 实例，代表鼠标滚轮事件的实例对象。目前，鼠标滚轮相关的事件只有一个wheel事件，用户滚动鼠标的滚轮，就生成这个事件的实例。
 * var wheelEvent = new WheelEvent(type, options);
 * deltaX deltaY deltaZ deltaMode(相关的滚动事件的单位)
 */

// window.onload = function () {
//     var ul = document.querySelector('ul');
//     ul.style.backgroundColor = "#ccc";
//     // event.target 是 ul 节点
//     ul.addEventListener('mouseenter', function (event) {
//         event.target.style.color = 'purple';
//         setTimeout(function () {
//             event.target.style.color = '';
//         }, 500);
//     }, false);
//     // event.target 是 li 节点
//     ul.addEventListener('mouseover', function (event) {
//         event.target.style.color = 'orange';
//         setTimeout(function () {
//             event.target.style.color = '';
//         }, 500);
//     }, false);
//     // event.target 是 ul 节点
//     ul.addEventListener('mouseleave', function (event) {
//         event.target.style.color = 'yellow';
//         setTimeout(function () {
//             event.target.style.color = '';
//         }, 500);
//     }, false);
//     // event.target 是 li 节点
//     ul.addEventListener('mouseout', function (event) {
//         event.target.style.color = 'green';
//         setTimeout(function () {
//             event.target.style.color = '';
//         }, 500);
//     }, false);
// }

/**
 * 键盘事件: 都继承了KeyboardEvent接口
 * keydown：按下键盘时触发
 * keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件。
 * keyup：松开键盘时触发该事件
 *
 * new KeyboardEvent(type, options)
 * 除了Event接口提供的属性，还可以配置以下字段，它们都是可选:
 * key：字符串，当前按下的键，默认为空字符串
 * code：字符串，表示当前按下的键的字符串形式，默认为空字符串
 * location：整数，当前按下的键的位置，默认为0
 * ctrlKey：布尔值，是否按下 Ctrl 键，默认为false
 * shiftKey：布尔值，是否按下 Shift 键，默认为false
 * altKey：布尔值，是否按下 Alt 键，默认为false
 * metaKey：布尔值，是否按下 Meta 键，默认为false
 * repeat：布尔值，是否重复按键，默认为false
 *
 * KeyboardEvent 的实例属性 :
 * KeyboardEvent.altKey：是否按下 Alt 键
 * KeyboardEvent.ctrlKey：是否按下 Ctrl 键
 * KeyboardEvent.metaKey：是否按下 meta 键
 * KeyboardEvent.shiftKey：是否按下 Shift 键
 * KeyboardEvent.code 返回一个字符串，表示当前按下的键的字符串形式。该属性只读
 * KeyboardEvent.key 返回一个字符串，表示按下的键名。该属性只读。
 * KeyboardEvent.location 返回一个整数，表示按下的键处在键盘的哪一个区域
 * KeyboardEvent.repeat 返回一个布尔值，代表该键是否被按着不放，以便判断是否重复这个键，即浏览器会持续触发keydown和keypress事件，直到用户松开手为止
 *
 * KeyboardEvent 的实例方法:
 * KeyboardEvent.getModifierState() 返回一个布尔值，表示是否按下或激活指定的功能键
 * 它的常用参数如下:
 * Alt CapsLock Control Meta NumLock Shift
 */
// 只要Control、Alt、Meta里面，同时按下任意两个或两个以上的键就返回
// if (
//     event.getModifierState('Control') +
//     event.getModifierState('Alt') +
//     event.getModifierState('Meta') > 1
// ) {
//     return;
// }

/**
 * 进度事件
 * 进度事件用来描述资源加载的进度，主要由 AJAX 请求、<img>、<audio>、<video>、<style>、<link>等外部资源的加载触发，继承了ProgressEvent接口。它主要包含以下几种事件:
 * abort：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件
 * error：由于错误导致外部资源无法加载时触发
 * load：外部资源加载成功时触发
 * loadstart：外部资源开始加载时触发
 * loadend：外部资源停止加载时触发，发生顺序排在error、abort、load等事件的后面
 * progress：外部资源加载过程中不断触发
 * timeout：加载超时时触发
 *
 * 有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能load和error事件的监听函数根本不会执行。所以，比较可靠的方式，是用complete属性先判断一下是否加载完成
 * loadend事件的监听函数，可以用来取代abort事件、load事件、error事件的监听函数，因为它总是在这些事件之后发生
 * error事件有一个特殊的性质，就是不会冒泡。所以，子元素的error事件，不会触发父元素的error事件监听函数
 *
 * ProgressEvent 接口:
 * 主要用来描述外部资源加载的进度，比如 AJAX 加载、<img>、<video>、<style>、<link>等外部资源加载。进度相关的事件都继承了这个接口。
 * new ProgressEvent(type, options)
 * 配置对象除了可以使用Event接口的配置属性，还可以使用下面的属性，所有这些属性都是可选的:
 *   lengthComputable：布尔值，表示加载的总量是否可以计算，默认是false。
 *   loaded：整数，表示已经加载的量，默认是0
 *   total：整数，表示需要加载的总量，默认是0
 *
 * ProgressEvent具有对应的实例属性:
 *   ProgressEvent.lengthComputable
 *   ProgressEvent.loaded
 *   ProgressEvent.total
 */

// image.addEventListener('load', function (event) {
//     image.classList.add('finished');
// });
// image.addEventListener('error', function (event) {
//     image.style.display = 'none';
// });

// function loaded() {
//     // ...
// }
// if (image.complete) {
//     loaded();
// } else {
//     image.addEventListener('load', loaded);
// }

// var p = new ProgressEvent('load', {
//     lengthComputable: true,
//     loaded: 30,
//     total: 100,
// });
// document.body.addEventListener('load', function (e) {
//     console.log('已经加载：' + (e.loaded / e.total) * 100 + '%');
// });
// document.body.dispatchEvent(p); // // 已经加载：30%

// 下载过程的进度事件
// var xhr = new XMLHttpRequest();
// xhr.addEventListener('progress', updateProgress, false);
// xhr.addEventListener('load', transferComplete, false);
// xhr.addEventListener('error', transferFailed, false);
// xhr.addEventListener('abort', transferCanceled, false);
// xhr.open();
// function updateProgress(e) {
//     if (e.lengthComputable) {
//         var percentComplete = e.loaded / e.total;
//     } else {
//         console.log('不能计算进度');
//     }
// }
// function transferComplete(e) {
//     console.log('传输结束');
// }
// function transferFailed(evt) {
//     console.log('传输过程中发生错误');
// }
// function transferCanceled(evt) {
//     console.log('用户取消了传输');
// }

// 上传过程的进度事件
// var xhr = new XMLHttpRequest();
// xhr.upload.addEventListener('progress', updateProgress, false);
// xhr.upload.addEventListener('load', transferComplete, false);
// xhr.upload.addEventListener('error', transferFailed, false);
// xhr.upload.addEventListener('abort', transferCanceled, false);
// xhr.open();

/**
 * 表单事件:
 * input 事件当<input>、<select>、<textarea>的值发生变化时触发。
 *   特点，就是会连续触发，比如用户每按下一次按键，就会触发一次input事件。
 *
 * select 事件当在<input>、<textarea>里面选中文本时触发
 *
 * change事件当<input>、<select>、<textarea>的值发生变化时触发。
 *   它与input事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，另一方面input事件必然伴随change事件
 *     激活单选框（radio）或复选框（checkbox）时触发
 *     用户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
 *     当文本框或<textarea>元素的值发生改变，并且丧失焦点时触发
 *
 * invalid 事件用户提交表单时，如果表单元素的值不满足校验条件，就会触发
 * reset 事件当表单重置（所有表单成员变回默认值）时触发
 * submit 事件当表单数据向服务器提交时触发。注意，submit事件的发生对象是<form>元素，而不是<button>元素，因为提交的是表单，而不是按钮。
 *
 * InputEvent 接口：主要用来描述input事件的实例
 * new InputEvent(type, options)
 * 配置对象的字段除了Event构造函数的配置属性，还可以设置下面的字段，这些字段都是可选的：
 *   inputType：字符串，表示发生变更的类型
 *   data：字符串，表示插入的字符串。如果没有插入的字符串（比如删除操作），则返回null或空字符串。
 *   dataTransfer：返回一个 DataTransfer 对象实例，该属性通常只在输入框接受富文本输入时有效。
 */

/**
 * 触摸事件
 * 浏览器的触摸 API 由三个部分组成：
 *   Touch：一个触摸点；  TouchList：多个触摸点的集合；  TouchEvent：触摸引发的事件实例
 * Touch接口的实例对象用来表示触摸点（一根手指或者一根触摸笔），包括位置、大小、形状、压力、目标元素等属性。有时，触摸动作由多个触摸点（多根手指）组成，多个触摸点的集合由TouchList接口的实例对象表示。TouchEvent接口的实例对象代表由触摸引发的事件，只有触摸屏才会引发这一类事件。
 * 很多时候，触摸事件和鼠标事件同时触发，即使这个时候并没有用到鼠标。这是为了让那些只定义鼠标事件、没有定义触摸事件的代码，在触摸屏的情况下仍然能用。如果想避免这种情况，可以用event.preventDefault方法阻止发出鼠标事件。
 *
 * Touch 接口
 * var touch = new Touch(touchOptions);
 * identifier：必需，类型为整数，表示触摸点的唯一 ID
 * target：必需，类型为元素节点，表示触摸点开始时所在的网页元素
 * clientX clientY
 * screenX screenY
 * pageX pageY
 * radiusX radiusY 触摸点周围受到影响的椭圆范围的 X | Y 轴半径
 * rotationAngle
 * force
 *
 * Touch 接口的实例属性：
 * Touch.identifier属性返回一个整数，表示触摸点的唯一 ID。这个值在整个触摸过程保持不变，直到触摸事件结束。
 * Touch.screenX，Touch.screenY，Touch.clientX，Touch.clientY，pageX，pageY
 * Touch.radiusX，Touch.radiusY，Touch.rotationAngle
 * Touch.force
 * Touch.target
 *
 * TouchList 接口
 * TouchList.length：数值，表示成员数量（即触摸点的数量）
 * TouchList.item()：返回指定位置的成员，它的参数是该成员的位置编号（从零开始）
 *
 * TouchEvent 接口:
 * new TouchEvent(type, options)
 * touches：TouchList实例，代表所有的当前处于活跃状态的触摸点，默认值是一个空数组[]。
 * targetTouches：TouchList实例，代表所有处在触摸的目标元素节点内部、且仍然处于活动状态的触摸点，默认值是一个空数组[]。
 * changedTouches：TouchList实例，代表本次触摸事件的相关触摸点，默认值是一个空数组[]。
 * ctrlKey：布尔值，表示 Ctrl 键是否同时按下，默认值为false
 * shiftKey：布尔值，表示 Shift 键是否同时按下，默认值为false。
 * altKey：布尔值，表示 Alt 键是否同时按下，默认值为false。
 * metaKey：布尔值，表示 Meta 键（或 Windows 键）是否同时按下，默认值为false。
 *
 * 实例属性:
 * TouchEvent.altKey TouchEvent.ctrlKey TouchEvent.shiftKey TouchEvent.metaKey
 * TouchEvent.changedTouches属性返回一个TouchList实例，成员是一组Touch实例对象，表示本次触摸事件的相关触摸点。
 *    touchstart事件：被激活的触摸点
 *    touchmove事件：发生变化的触摸点
 *    touchend事件：消失的触摸点（即不再被触碰的点）
 * TouchEvent.touches 返回一个TouchList实例，成员是所有仍然处于活动状态（即触摸中）的触摸点。一般来说，一个手指就是一个触摸点。
 * TouchEvent.targetTouches 返回一个TouchList实例，成员是触摸事件的目标元素节点内部、所有仍然处于活动状态（即触摸中）的触摸点。
 *
 * 触摸事件的种类: 可以通过TouchEvent.type属性，查看到底发生的是哪一种事件。
 * touchstart：用户开始触摸时触发，它的target属性返回发生触摸的元素节点。
 * touchend：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的target属性与touchstart事件一致的，就是开始触摸时所在的元素节点。它的changedTouches属性返回一个TouchList实例，包含所有不再触摸的触摸点（即Touch实例对象）。
 * touchmove：用户移动触摸点时触发，它的target属性与touchstart事件一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
 * touchcancel：触摸点取消时触发，比如在触摸区域跳出一个模态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先的触摸点）。
 */
// div.addEventListener('touchstart', rotate);
// div.addEventListener('touchmove', rotate);
// div.addEventListener('touchend', rotate);
// function rotate(e) {
//     var touch = e.changedTouches.item(0);
//     e.preventDefault();
//     src.style.width = touch.radiusX * 2 + 'px';
//     src.style.height = touch.radiusY * 2 + 'px';
//     src.style.transform = 'rotate(' + touch.rotationAngle + 'deg)';
// }; 

// someElement.addEventListener('touchstart', function (e) {
//     switch (e.touches.length) {
//         // 一根手指触摸
//         case 1: handle_one_touch(e); break;
//         // 两根手指触摸
//         case 2: handle_two_touches(e); break;
//         // 三根手指触摸
//         case 3: handle_three_touches(e); break;
//         // 其他情况
//         default: console.log('Not supported'); break;
//     }
// }, false);

/**
 * 拖拉事件
 * 拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都是可以直接拖拉的。
 * 为了让元素节点可拖拉，可以将该节点的draggable属性设为true。
 * 注意，一旦某个元素节点的draggable属性设为true，就无法再用鼠标选中该节点内部的文字或子节点了。
 *
 * 当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。
 * drag：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
 * dragstart：用户开始拖拉时，在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
 * dragend：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。它与dragstart事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，dragend事件总是会触发的。
 * dragenter：拖拉进入当前节点时，在当前节点上触发一次，该事件的target属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。
 * dragover：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点。该事件与dragenter事件的区别是，dragenter事件在进入该节点时触发，然后只要没有离开这个节点，dragover事件会持续触发。
 * dragleave：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
 * drop：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许drop，即使在该节点上方松开鼠标键，也不会触发该事件。
 *
 * 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
 * 将文件从操作系统拖拉进浏览器，不会触发dragstart和dragend事件。
 * dragenter和dragover事件的监听函数，用来取出拖拉的数据（即允许放下被拖拉的元素）。由于网页的大部分区域不适合作为放下拖拉元素的目标节点，所以这两个事件的默认设置为当前节点不允许接受被拖拉的元素。如果想要在目标节点上放下的数据，首先必须阻止这两个事件的默认行为。
 * <div ondragover="return false">
 * <div ondragover="event.preventDefault()">
 *
 * DragEvent 接口
 * new DragEvent(type, options)
 *
 * DataTransfer 接口: 用来读写需要传递的数据。这个属性的值是一个DataTransfer接口的实例
 * var dataTrans = new DataTransfer();
 * DataTransfer 的实例属性:
 * DataTransfer.dropEffect 用来设置放下（drop）被拖拉节点时的效果，会影响到拖拉经过相关区域时鼠标的形状。它可能取下面的值
 *   copy：复制被拖拉的节点
 *   move：移动被拖拉的节点
 *   link：创建指向被拖拉的节点的链接
 *   none：无法放下被拖拉的节点
 * DataTransfer.effectAllowed 设置本次拖拉中允许的效果,它可能取下面的值。
 *   copy：复制被拖拉的节点
 *   move：移动被拖拉的节点
 *   link：创建指向被拖拉节点的链接
 *   copyLink：允许copy或link
 *   copyMove：允许copy或move
 *   linkMove：允许link或move
 *   all：允许所有效果
 *   none：无法放下被拖拉的节点
 *   uninitialized：默认值，等同于all
 * DataTransfer.files 是一个 FileList 对象，包含一组本地文件，可以用来在拖拉操作中传送。如果本次拖拉不涉及文件，则该属性为空的 FileList 对象。
 * DataTransfer.types 一个只读的数组，每个成员是一个字符串，里面是拖拉的数据格式（通常是 MIME 值）。比如，如果拖拉的是文字，对应的成员就是text/plain。
 * DataTransfer.items 返回一个类似数组的只读对象（DataTransferItemList 实例），每个成员就是本次拖拉的一个对象（DataTransferItem 实例）。如果本次拖拉不包含对象，则返回一个空对象。
 *
 * DataTransfer 的实例方法:
 * DataTransfer.setData() 用来设置拖拉事件所带有的数据。该方法没有返回值。
 *   event.dataTransfer.setData('text/plain', 'Text to drag');
 * DataTransfer.getData() 接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用setData方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有drop事件触发后，才能取出数据。
 * DataTransfer.clearData() 接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。
 * DataTransfer.setDragImage() 可以自定义浏览器显示的一张图片。
 */
// div.addEventListener('dragstart', function (e) {
//     this.style.backgroundColor = 'red';
// }, false);

// div.addEventListener('dragend', function (e) {
//     this.style.backgroundColor = 'green';
// }, false);

/* HTML 代码如下
 <div class="dropzone">
   <div id="draggable" draggable="true">
     该节点可拖拉
   </div>
 </div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
*/

// 被拖拉节点
// var dragged;
// document.addEventListener('dragstart', function (event) {
//     // 保存被拖拉节点
//     dragged = event.target;
//     // 被拖拉节点的背景色变透明
//     event.target.style.opacity = 0.5;
// }, false);
// document.addEventListener('dragend', function (event) {
//     // 被拖拉节点的背景色恢复正常
//     event.target.style.opacity = '';
// }, false);
// document.addEventListener('dragover', function (event) {
//     // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
//     event.preventDefault();
// }, false);
// document.addEventListener('dragenter', function (event) {
//     // 目标节点的背景色变紫色
//     // 由于该事件会冒泡，所以要过滤节点
//     if (event.target.className === 'dropzone') {
//         event.target.style.background = 'purple';
//     }
// }, false);
// document.addEventListener('dragleave', function (event) {
//     // 目标节点的背景色恢复原样
//     if (event.target.className === 'dropzone') {
//         event.target.style.background = '';
//     }
// }, false);
// document.addEventListener('drop', function (event) {
//     // 防止事件默认行为（比如某些元素节点上可以打开链接），
//     event.preventDefault();
//     if (event.target.className === 'dropzone') {
//         // 恢复目标节点背景色
//         event.target.style.background = '';
//         // 将被拖拉节点插入目标节点
//         dragged.parentNode.removeChild(dragged);
//         event.target.appendChild(dragged);
//     }
// }, false);

// HTML 代码如下
// <div id="output" style="min-height: 200px;border: 1px solid black;">
//   文件拖拉到这里
// </div>
// window.onload = function () {
// var div = document.getElementById('output');
// div.addEventListener("dragenter", function (event) {
//     div.textContent = '';
//     event.stopPropagation();
//     event.preventDefault();
// }, false);
// div.addEventListener("dragover", function (event) {
//     event.stopPropagation();
//     event.preventDefault();
// }, false);
// div.addEventListener("drop", function (event) {
//     event.stopPropagation();
//     event.preventDefault();
//     var files = event.dataTransfer.files;
//     for (var i = 0; i < files.length; i++) {
//         div.textContent += files[i].name + ' ' + files[i].size + '字节\n';
//     }
// }, false);

// 通过dataTransfer.files属性读取被拖拉的文件的信息。如果想要读取文件内容，就要使用FileReader对象。
// div.addEventListener('drop', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     var fileList = e.dataTransfer.files;
//     if (fileList.length > 0) {
//         var file = fileList[0];
//         var reader = new FileReader();
//         reader.onloadend = function (e) {
//             if (e.target.readyState === FileReader.DONE) {
//                 var content = reader.result;
//                 div.innerHTML = 'File: ' + file.name + '\n\n' + content;
//             }
//         }
//         reader.readAsBinaryString(file);
//     }
// });
// }

// function contains(list, value) {
//     for (var i = 0; i < list.length; ++i) {
//         if (list[i] === value) return true;
//     }
//     return false;
// }
// function doDragOver(event) {
//     var isLink = contains(event.dataTransfer.types, 'text/uri-list');
//     if (isLink) event.preventDefault();
// }

/* HTML 代码如下
 <div id="drag-with-image" class="dragdemo" draggable="true">
   drag me
 </div>
*/
// var div = document.getElementById('drag-with-image');
// div.addEventListener('dragstart', function (e) {
//     var img = document.createElement('img');
//     img.src = 'http://path/to/img';
//     e.dataTransfer.setDragImage(img, 0, 0);
// }, false);

/**
 * 其他常见事件
 *
 * beforeunload 事件在窗口、文档、各种资源将要卸载前触发。它可以用来防止用户不小心卸载资源。
 *     许多手机浏览器默认忽略这个事件，桌面浏览器也有办法忽略这个事件。所以，它可能根本不会生效，不能依赖它来阻止用户关闭窗口。
 *     基本上，只有一种场合可以监听unload事件，其他情况都不应该监听：用户修改了表单，还没有保存就要离开。
 * unload事件在窗口关闭或者document对象将要卸载时触发。它的触发顺序排在beforeunload、pagehide事件后面。
 * load事件在页面或某个资源加载成功时触发。注意，页面或资源从浏览器缓存加载，并不会触发load事件。
 * error事件是在页面或资源加载失败时触发。
 * abort事件在用户取消加载时触发。
 *
 * session 历史事件:
 * pageshow 事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。
 *     有一个persisted属性，返回一个布尔值。页面第一次加载时，这个属性是false；当页面从缓存加载时，这个属性是true
 * pagehide事件与pageshow事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。它与 unload 事件的区别在于，如果在 window 对象上定义unload事件的监听函数之后，页面不会保存在缓存中，而使用pagehide事件，页面会保存在缓存中。
 *     有一个persisted属性，将这个属性设为true，就表示页面要保存在缓存中；设为false，表示网页不保存在缓存中，这时如果设置了unload 事件的监听函数，该函数将在 pagehide 事件后立即运行。
 * popstate事件在浏览器的history对象的当前记录发生显式切换时触发。注意，调用history.pushState()或history.replaceState()，并不会触发popstate事件。该事件只在用户在history记录之间显式切换时触发，比如鼠标点击“后退/前进”按钮，或者在脚本中调用history.back()、history.forward()、history.go()时触发。
 *     有一个state属性，保存history.pushState方法和history.replaceState方法为当前记录添加的state对象
 * hashchange 事件
 *     在 URL 的 hash 部分（即#号后面的部分，包括#号）发生变化时触发。该事件一般在window对象上监听
 *     hashchange的事件实例具有两个特有属性：oldURL属性和newURL属性，分别表示变化前后的完整 URL
 * 
 * 网页状态事件:
 * DOMContentLoaded 事件 网页下载并解析完成以后，浏览器就会在document对象上触发 DOMContentLoaded 事件。这时，仅仅完成了网页的解析（整张页面的 DOM 生成了），所有外部资源（样式表、脚本、iframe 等等）可能还没有下载结束。也就是说，这个事件比load事件，发生时间早得多
 *     网页的 JavaScript 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发DOMContentLoaded事件。
 * readystatechange 事件当 Document 对象和 XMLHttpRequest 对象的readyState属性发生变化时触发。
 *     有三个可能的值：loading（网页正在加载）、interactive（网页已经解析完成，但是外部资源仍然处在加载状态）和complete（网页和所有外部资源已经结束加载，load事件即将触发）。
 * 
 * 窗口事件
 * scroll事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。
 *     该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用requestAnimationFrame或setTimeout控制该事件的触发频率，然后可以结合customEvent抛出一个新事件
 * resize 事件在改变浏览器窗口大小时触发，主要发生在window对象上面。
 * fullscreenchange 事件 在进入或退出全屏状态时触发，该事件发生在document对象上面。
 * fullscreenerror事件在浏览器无法切换到全屏状态时触发
 *
 * 剪贴板事件
 * 这三个事件都是ClipboardEvent接口的实例
 * cut：将选中的内容从文档中移除，加入剪贴板时触发
 * copy：进行复制动作时触发。
 * paste：剪贴板内容粘贴到文档后触发。
 * 
 * 焦点事件
 * 发生在元素节点和document对象上面，与获得或失去焦点相关。它主要包括以下四个事件。
 * focus：元素节点获得焦点后触发，该事件不会冒泡。
 * blur：元素节点失去焦点后触发，该事件不会冒泡。
 * focusin：元素节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。
 * focusout：元素节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。
 * 
 * CustomEvent 接口
 * 用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。
 * new CustomEvent(type, options)
 * CustomEvent的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。
 *   detail：表示事件的附带数据，默认为null
 */
// 兼容写法
// window.addEventListener('beforeunload', function (e) {
//     var confirmationMessage = '确认关闭窗口？';
//     e.returnValue = confirmationMessage;
//     return confirmationMessage;
// });

// window.onpopstate = function (event) {
//     console.log('state: ' + event.state);
// };
// history.pushState({ page: 1 }, 'title 1', '?page=1');
// history.pushState({ page: 2 }, 'title 2', '?page=2');
// history.replaceState({ page: 3 }, 'title 3', '?page=3');
// history.back(); // state: {"page":1}
// history.back(); // state: null
// history.go(2);  // state: {"page":3}

// URL 是 http://www.example.com/
// window.addEventListener('hashchange', myFunction);
// function myFunction(e) {
//     console.log(e.oldURL);
//     console.log(e.newURL);
// }
// location.hash = 'part2';
// http://www.example.com/
// http://www.example.com/#part2

// (function () {
//     var throttle = function (type, name, obj) {
//         var obj = obj || window;
//         var running = false;
//         var func = function () {
//             if (running) { return; }
//             running = true;
//             requestAnimationFrame(function () {
//                 obj.dispatchEvent(new CustomEvent(name));
//                 running = false;
//             });
//         };
//         obj.addEventListener(type, func);
//     };
//     // 将 scroll 事件重定义为 optimizedScroll 事件
//     throttle('scroll', 'optimizedScroll');
// })();
// window.addEventListener('optimizedScroll', function () {
//     console.log('Resource conscious scroll callback!');
// });

// (function () {
//     window.addEventListener('scroll', scrollThrottler, false);
//     var scrollTimeout;
//     function scrollThrottler() {
//         if (!scrollTimeout) {
//             scrollTimeout = setTimeout(function () {
//                 scrollTimeout = null;
//                 actualScrollHandler();
//             }, 66);
//         }
//     }
//     function actualScrollHandler() {
//         // ...
//     }
// }());

// function throttle(fn, wait) {
//     var time = Date.now();
//     return function () {
//         if ((time + wait - Date.now()) < 0) {
//             fn();
//             time = Date.now();
//         }
//     }
// }
// window.addEventListener('scroll', throttle(callback, 1000));

// document.addEventListener('copy', function (e) {
//     e.clipboardData.setData('text/plain', 'Hello, world!');
//     e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
//     e.preventDefault();
// });

/**
 * GlobalEventHandlers 接口
 * 指定事件的回调函数，推荐使用的方法是元素的addEventListener方法。
 * 
 * 主要的事件属性:
 * GlobalEventHandlers.onabort 某个对象的abort事件（停止加载）发生时，就会调用onabort属性指定的回调函数。
 * GlobalEventHandlers.onerror error事件发生时，就会调用onerror属性指定的回调函数
 * GlobalEventHandlers.onload 元素完成加载时，会触发load事件，执行onload()
 * GlobalEventHandlers.onloadstart 对于<img>和<video>等元素，加载开始时还会触发loadstart事件，导致执行onloadstart。
 * GlobalEventHandlers.onfocus 当前元素获得焦点时，会触发element.onfocus
 * GlobalEventHandlers.onblur 失去焦点时，会触发element.onblur。
 * GlobalEventHandlers.onscroll
 * GlobalEventHandlers.oncontextmenu，GlobalEventHandlers.onshow 
 * 
 * 其他的事件属性:
 * 鼠标的事件属性 onclick ondblclick onmousedown onmouseenter onmouseleave onmousemove onmouseout onmouseover onmouseup onwheel
 * 键盘的事件属性 onkeydown  onkeypress onkeyup
 * 焦点的事件属性  onblur onfocus
 * 表单的事件属性  oninput onchange onsubmit onreset oninvalid onselect
 * 触摸的事件属性  ontouchcancel ontouchend  ontouchmove ontouchstart
 * 被拖动元素的事件属性 ondragstart ondrag ondragend
 * 接收被拖动元素的容器元素的事件属性  ondragenter ondragleave ondragover ondrop
 * <dialog>对话框元素的事件属性
 */
