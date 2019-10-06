/**
 * Cookie 的大小不超过 4KB，且每次请求都会发送回服务器；LocalStorage 在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。
 * IndexedDB 具有以下特点:
 *     （1）键值对储存。 
 *     （2）异步。
 *     （3）支持事务。
 *     （4）同源限制。
 *     （5）储存空间大。
 *     （6）支持二进制储存。
 * 
 * 各种对象接口:
 *     数据库：IDBDatabase 对象
 *     对象仓库：IDBObjectStore 对象
 *     索引： IDBIndex 对象
 *     事务： IDBTransaction 对象
 *     操作请求：IDBRequest 对象
 *     指针： IDBCursor 对象
 *     主键集合：IDBKeyRange 对象
 * 
 * 打开数据库
 *    var request = window.indexedDB.open(databaseName, version);
 * 这个对象通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果:
 *    error事件表示打开数据库失败
 *    success事件表示成功打开数据库
 *    upgradeneeded 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
 * 
 * 新建数据库
 * 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。
 * 不同之处在于，后续的操作主要在upgradeneeded事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。
 * 
 * 新增数据
 * 向对象仓库写入数据记录。这需要通过事务完成。
 * 
 * 读取数据
 * 读取数据也是通过事务完成。
 * 
 * 遍历数据
 * 遍历数据表格的所有记录，要使用指针对象 IDBCursor
 * 
 * 更新数据
 * 更新数据要使用IDBObject.put()方法
 * 
 * 删除数据
 * IDBObjectStore.delete()方法用于删除记录
 */
// request.onerror = function (event) {
//     console.log('数据库打开报错');
// };
// var db;
// request.onsuccess = function (event) {
//     db = request.result;
//     console.log('数据库打开成功');
// };
// request.onupgradeneeded = function (event) {
//     db = event.target.result;
// }

// request.onupgradeneeded = function (event) {
//     db = event.target.result;
//     var objectStore = db.createObjectStore('person', { keyPath: 'id' });
// }

// request.onupgradeneeded = function (event) {
//     db = event.target.result;
//     var objectStore;
//     if (!db.objectStoreNames.contains('person')) {
//         objectStore = db.createObjectStore('person', { keyPath: 'id' });
//     }
// }

// 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
// var objectStore = db.createObjectStore(
//     'person',
//     { autoIncrement: true }
// );

// 新建对象仓库以后，下一步可以新建索引
// 三个参数分别为索引名称、索引所在的属性、配置对象
// request.onupgradeneeded = function (event) {
//     db = event.target.result;
//     var objectStore = db.createObjectStore('person', { keyPath: 'id' });
//     objectStore.createIndex('name', 'name', { unique: false });
//     objectStore.createIndex('email', 'email', { unique: true });
// }

// 写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）。
// function add() {
//     var request = db.transaction(['person'], 'readwrite')
//         .objectStore('person')
//         .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
//     request.onsuccess = function (event) {
//         console.log('数据写入成功');
//     };
//     request.onerror = function (event) {
//         console.log('数据写入失败');
//     }
// }
// add();

// function read() {
//     var transaction = db.transaction(['person']);
//     var objectStore = transaction.objectStore('person');
//     var request = objectStore.get(1);
//     request.onerror = function (event) {
//         console.log('事务失败');
//     };
//     request.onsuccess = function (event) {
//         if (request.result) {
//             console.log('Name: ' + request.result.name);
//             console.log('Age: ' + request.result.age);
//             console.log('Email: ' + request.result.email);
//         } else {
//             console.log('未获得数据记录');
//         }
//     };
// }
// read();

// function readAll() {
//     var objectStore = db.transaction('person').objectStore('person');
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         if (cursor) {
//             console.log('Id: ' + cursor.key);
//             console.log('Name: ' + cursor.value.name);
//             console.log('Age: ' + cursor.value.age);
//             console.log('Email: ' + cursor.value.email);
//             cursor.continue();
//         } else {
//             console.log('没有更多数据了！');
//         }
//     };
// }
// readAll();

// function update() {
//     var request = db.transaction(['person'], 'readwrite')
//         .objectStore('person')
//         .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
//     request.onsuccess = function (event) {
//         console.log('数据更新成功');
//     };
//     request.onerror = function (event) {
//         console.log('数据更新失败');
//     }
// }
// update();

// function remove() {
//     var request = db.transaction(['person'], 'readwrite')
//         .objectStore('person')
//         .delete(1);
//     request.onsuccess = function (event) {
//         console.log('数据删除成功');
//     };
// }
// remove();