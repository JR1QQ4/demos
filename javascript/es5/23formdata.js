{/* <form action="/handling-page" method="post">
    <div>
        <label for="name">用户名：</label>
        <input type="text" id="name" name="user_name" />
    </div>
    <div>
        <label for="passwd">密码：</label>
        <input type="password" id="passwd" name="user_passwd" />
    </div>
    <div>
        <input type="submit" id="submit" name="submit_button" value="提交" />
    </div>
</form> */}
/**
 * 表单
 * 用来收集用户提交的数据，发送到服务器。
 * 用户点击“提交”按钮，每一个控件都会生成一个键值对，键名是控件的name属性，键值是控件的value属性，键名和键值之间由等号连接。
 * 所有的键值对都会提交到服务器。但是，提交的数据格式跟<form>元素的method属性有关。该属性指定了提交数据的 HTTP 方法。
 * 
 * 如果是 GET 方法，所有键值对会以 URL 的查询字符串形式，提交到服务器，
 * 比如/handling-page?user_name=张三&user_passwd=123&submit_button=提交。下面就是 GET 请求的 HTTP 头信息。
 *     GET /handling-page?user_name=张三&user_passwd=123&submit_button=提交
 *     Host: example.com
 * 
 * 如果是 POST 方法，所有键值对会连接成一行，作为 HTTP 请求的数据体发送到服务器，
 * 比如user_name=张三&user_passwd=123&submit_button=提交。下面就是 POST 请求的头信息。
 *     POST /handling-page HTTP/1.1
 *     Host: example.com
 *     Content-Type: application/x-www-form-urlencoded
 *     Content-Length: 74
 *     user_name=张三&user_passwd=123&submit_button=提交
 * 
 * 表单里面的<button>元素如果没有用type属性指定类型，那么默认就是submit控件。
 * 除了点击submit控件提交表单，还可以用表单元素的submit()方法，通过脚本提交表单。
 *     formElement.submit();
 * 表单元素的reset()方法可以重置所有控件的值（重置为默认值）。
 *     formElement.reset()
 * 
 * FormData 对象
 * 通过脚本完成以键值对的形式向服务器发送
 *     var formdata = new FormData(form);
 * 
 * 实例方法
 * FormData.get(key)：获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值
 * FormData.getAll(key)：返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
 * FormData.set(key, value)：设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。
 *     如果第二个参数是文件，还可以使用第三个参数，表示文件名。
 * FormData.delete(key)：删除一个键值对，参数为键名。
 * FormData.append(key, value)：添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
 * FormData.has(key)：返回一个布尔值，表示是否具有该键名的键值对。
 * FormData.keys()：返回一个遍历器对象，用于for...of循环遍历所有的键名。
 * FormData.values()：返回一个遍历器对象，用于for...of循环遍历所有的键值。
 * FormData.entries()：返回一个遍历器对象，用于for...of循环遍历所有的键值对。
 *     如果直接用for...of循环遍历 FormData 实例，默认就会调用这个方法。
 * 
 * 表单的内置验证
 * 自动校验 表单提交的时候，浏览器允许开发者指定一些条件，它会自动验证各个表单控件的值是否符合条件。
 * checkValidity() 手动触发表单的校验。表单元素和表单控件都有checkValidity()方法，用于手动触发校验。
 *     form.checkValidity()  // 触发整个表单的校验
 *     formControl.checkValidity()  // 触发单个表单控件的校验 
 *     返回一个布尔值，true表示通过校验，false表示没有通过校验
 * willValidate 属性一个布尔值，表示该控件是否会在提交时进行校验。 
 * validationMessage 属性返回一个字符串，表示控件不满足校验条件时，浏览器显示的提示文本 
 *     以下两种情况，该属性返回空字符串: 该控件不会在提交时自动校验;该控件满足校验条件
 * setCustomValidity() 方法用来定制校验失败时的报错信息
 * 
 * validity 属性, 返回一个ValidityState对象，包含当前校验状态的信息。
 * ValidityState.badInput：布尔值，表示浏览器是否不能将用户的输入转换成正确的类型，比如用户在数值框里面输入字符串
 * ValidityState.customError：布尔值，表示是否已经调用setCustomValidity()方法，将校验信息设置为一个非空字符串。
 * ValidityState.patternMismatch：布尔值，表示用户输入的值是否不满足模式的要求。
 * ValidityState.rangeOverflow：布尔值，表示用户输入的值是否大于最大范围。
 * ValidityState.rangeUnderflow：布尔值，表示用户输入的值是否小于最小范围。
 * ValidityState.stepMismatch：布尔值，表示用户输入的值不符合步长的设置（即不能被步长值整除） 
 * ValidityState.tooLong：布尔值，表示用户输入的字数超出了最长字数
 * ValidityState.tooShort：布尔值，表示用户输入的字符少于最短字数
 * ValidityState.typeMismatch：布尔值，表示用户填入的值不符合类型要求（主要是类型为 Email 或 URL 的情况）
 * ValidityState.valid：布尔值，表示用户是否满足所有校验条件
 * ValidityState.valueMissing：布尔值，表示用户没有填入必填的值
 * 
 * 表单的 novalidate 属性,可以关闭浏览器的自动校验    
 * enctype 属性表单能够用四种编码，向服务器发送数据。编码格式由表单的enctype属性决定。
 *     （1）GET 方法
 *          如果表单使用GET方法发送数据，enctype属性无效
 *     （2）application/x-www-form-urlencoded
 *          如果表单用POST方法发送数据，并省略enctype属性，那么数据以application/x-www-form-urlencoded格式发送
 *     （3）text/plain
 *          如果表单使用POST方法发送数据，enctype属性为text/plain，那么数据将以纯文本格式发送
 *     （4）multipart/form-data
 *          如果表单使用POST方法，enctype属性为multipart/form-data，那么数据将以混合的格式发送。
 * 
 * 文件上传
 * 用户上传文件，也是通过表单。具体来说，就是通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。
 * 表单<form>元素的method属性设为POST，enctype属性设为multipart/form-data
 */
{/* <form id="myForm" name="myForm">
  <div>
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="useracc">账号：</label>
    <input type="text" id="useracc" name="useracc">
  </div>
  <div>
    <label for="userfile">上传文件：</label>
    <input type="file" id="userfile" name="userfile">
  </div>
<input type="submit" value="Submit!">
</form> */}
// var myForm = document.getElementById('myForm');
// var formData = new FormData(myForm);
// formData.get('username') // "" // 获取某个控件的值
// formData.set('username', '张三'); // 设置某个控件的值
// formData.get('username') // "张三"

// var formData = new FormData();
// formData.set('username', '张三');
// formData.append('username', '李四');
// formData.get('username') // "张三"
// formData.getAll('username') // ["张三", "李四"]
// formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
// formData.append('userpic[]', myFileInput.files[1], 'user2.jpg');

// var formData = new FormData();
// formData.append('key1', 'value1');
// formData.append('key2', 'value2');
// for (var key of formData.keys()) {
//     console.log(key); // "key1"  "key2"
// }
// for (var value of formData.values()) {
//     console.log(value); // "value1"  "value2"
// }
// for (var pair of formData.entries()) {
//     console.log(pair[0] + ': ' + pair[1]); // key1: value1   key2: value2
// }
// // 等同于遍历 formData.entries()
// for (var pair of formData) {
//     console.log(pair[0] + ': ' + pair[1]);  // key1: value1  key2: value2
// }

/* HTML 代码如下
<form>
  <p><input type="file" id="fs"></p>
  <p><input type="submit"></p>
</form>
*/
// document.getElementById('fs').onchange = checkFileSize;
// function checkFileSize() {
//     var fs = document.getElementById('fs');
//     var files = fs.files;
//     if (files.length > 0) {
//         if (files[0].size > 75 * 1024) {
//             fs.setCustomValidity('文件不能大于 75KB');
//             return;
//         }
//     }
//     fs.setCustomValidity('');
// }

// var input = document.getElementById('myinput');
// if (input.validity.valid) {
//     console.log('通过校验');
// } else {
//     console.log('校验失败');
// }

{/* <form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择一个文件</label>
    <input type="file" id="file" name="myFile" multiple>
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form> */}
// var fileSelect = document.getElementById('file');
// var files = fileSelect.files;
// var formData = new FormData();
// for (var i = 0; i < files.length; i++) {
//     var file = files[i];
//     // 只上传图片文件
//     if (!file.type.match('image.*')) {
//         continue;
//     }
//     formData.append('photos[]', file, file.name);
// }

// 使用 Ajax 向服务器上传文件
// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'handler.php', true);
// xhr.onload = function () {
//     if (xhr.status !== 200) {
//         console.log('An error occurred!');
//     }
// };
// xhr.send(formData);

// 除了发送 FormData 实例，也可以直接 AJAX 发送文件
// var file = document.getElementById('test-input').files[0];
// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'myserver/uploads');
// xhr.setRequestHeader('Content-Type', file.type);
// xhr.send(file);