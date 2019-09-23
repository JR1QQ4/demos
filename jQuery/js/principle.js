(function (window, undefined) {
    var myjQuery = function (selector) {
        return new myjQuery.fn.init(selector);
    };
    myjQuery.fn = myjQuery.prototype = {
        constructor: myjQuery,
        /**
         * 功能一：$$() 接收参数处理
         * 1.传入 "" null undefined NaN 0 false，返回空的 jQuery 对象
         * 2.字符串：
         *     代码片段：会将创建好的 DOM 元素存储到 jQuery 对象中放回
         *     选择器：会将找到的所有元素存储到 jQuery 对象中返回
         * 3。数组：
         *     会将数组中存储的元素依次存储到 jQuery 对象中返回
         * 4.除此之外：
         *     方法
         *     会将传入的数据存储到 jQuery 对象中返回
         */
        init: function (selector) {
            myjQuery.trim(selector);
            myjQuery.prototype.selector = selector;
            // 1
            if (!selector) {
                return this;
            } else if (myjQuery.isString(selector)) {
                // 2.1
                if (myjQuery.isHTML(selector)) {
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    // 遍历元素，取出子元素
                    // for (var index = 0, len = temp.children.length; index < len; index++) {
                    //     this[index] = temp.children[index];
                    // }
                    // this.length = temp.children.length;
                    // 伪数组转为真数组
                    // var a = {0:"fn",1:"init",length:2};
                    // [].slice.call(a);
                    // 真数组转伪数组
                    [].push.apply(this, temp.children);
                }
                // 2.2
                else {
                    if (isNaN(Number(selector))) {
                        var res = document.querySelectorAll(selector);
                        [].push.apply(this, res);
                    }
                }
                // 3
            } else if (myjQuery.isArray(selector)) {
                // // 真数组
                // if (Object.prototype.toString.apply(selector) === "[object Array]") {
                //     [].push.apply(this, selector);
                // // 伪数组
                // }else {
                //     var arr = [].slice.call(selector);
                //     [].push.apply(this, arr);
                // }
                var arr = [].slice.call(selector);
                [].push.apply(this, arr);
                // 4
            } else if (myjQuery.isFunction(selector)) {
                myjQuery.ready(selector);
            } else {
                this[0] = selector;
                this.length = 1;
            }
            return this;
        },
        /**
         * 功能三：核心方法和属性
         */
        jquery: "1.1.0",
        selector: "",
        length: 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {
            return [].slice.call(this);
        },
        get: function (selector) {
            if (arguments.length === 0) {
                return this.toArray();
            } else if (selector >= 0) {
                return this[selector];
            } else {
                while (selector < 0) {
                    selector = selector + this.length;
                }
                return this[selector];
            }
        },
        eq: function (selector) {
            if (arguments.length === 0) {
                return new myjQuery();
            } else {
                return myjQuery(this.get(selector));
            }
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return myjQuery.each(this, fn);
        }
    };
    // 功能二：静态方法分类
    myjQuery.extend = myjQuery.prototype.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    };
    // 工具方法
    myjQuery.extend({
        type: function (o) {
            var s = Object.prototype.toString.call(o);
            return s.match(/\[object (.*?)\]/)[1].toLowerCase();
        },
        isString: function (selector) {
            return myjQuery.type(selector) === "string";
        },
        isHTML: function (selector) {
            return selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length >= 3;
        },
        trim: function (selector) {
            if (!myjQuery.isString(selector)) {
                return myjQuery;
            }
            if (selector.trim) {
                return selector.trim();
            } else {
                return selector.replace(/^\s+|\s+$/g, "");
            }
        },
        isObject: function (selector) {
            return myjQuery.type(selector) === "object";
        },
        isWindow: function (selector) {
            return myjQuery.type(selector) === "window";
        },
        isArray: function (selector) {
            if (myjQuery.type(selector) === "array") {
                return true;
                // else if (myjQuery.isObject(selector) && selector.hasOwnProperty(length)  && !myjQuery.isWindow(selector))
            } else if (myjQuery.isObject(selector) && typeof selector.length === "number" && !myjQuery.isWindow(selector)) {
                return true;
            } else {
                return false;
            }
            // return myjQuery.isObject(selector) && "length" in selector && !myjQuery.isWindow(selector);
        },
        isFunction: function (selector) {
            return this.type(selector) === "function";
            // return typeof selector === "function";
        },
        ready: function (fn) {
            // 判断 DOM 加载完毕
            if (document.readyState == "complete") {
                fn();
            } else if (document.addEventListener) {
                // DOM 加载完毕
                document.addEventListener("DOMContentLoaded", function () {
                    fn();
                });
            } else {
                // document.attachEvent 不能监听 DOMContentLoaded 事件
                // onreadystatechange 用于监听 document.readyState 属性改变
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState == "complete") {
                        fn();
                    }
                })
            }
        },
        each: function (obj, fn) {
            // 1.判断是不是数组，真数组以及伪数组
            if (this.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var res = fn.call(obj[i], i, obj[i]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }

            }
            // 2.判断是不是对象 
            else if (this.isObject(obj)) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        var res = fn.call(obj[key], key, obj[key]);
                        if (res === true) {
                            continue;
                        } else if (res === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        map: function (obj, fn) {
            var res = [];
            // 1.判断是不是数组，真数组以及伪数组
            if (this.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var temp = fn(obj[i], i);
                    if (temp) {
                        res.push(temp);
                    }
                }

            }
            // 2.判断是不是对象 
            else if (this.isObject(obj)) {
                for (var key in obj) {
                    fn(obj[i], i);
                    if (temp) {
                        res.push(temp);
                    }
                }
            }
            return res;
        },
        isSelector: function (selector) {
            var booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
            var whitespace = "[\\x20\\t\\r\\n\\f]";
            var identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+";
            var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                "*([*^$|!~]?=)" + whitespace +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                "*\\]";
            var pseudos = ":(" + identifier + ")(?:\\((" +
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                ".*)\\)|)";
            var matchExpr = {
                "ID": new RegExp("^#(" + identifier + ")"),
                "CLASS": new RegExp("^\\.(" + identifier + ")"),
                "TAG": new RegExp("^(" + identifier + "|[*])"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            };
            var flag = false;
            myjQuery.each(matchExpr, function (key, value) {
                if (value.test(selector)) {
                    flag = true;
                }
            })
            return flag;
        },
        getStyle: function (dom, styleName) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom)[styleName];
            } else {
                return dom.currentStyle[styleName];
            }
        },
        addEvent: function (ele, name, callback) {
            if (ele.addEventListener) {
                ele.addEventListener(name, callback);
            } else if (ele.attachEvent) {
                ele.attachEvent("on" + name, callback);
            } else {
                ele["on" + name] = callback;
            }
        },
        removeEvent: function (ele, name, callback) {
            if (ele.removeEventListener) {
                ele.removeEventListener(name, callback);
            } else if (ele.detachEvent) {
                ele.detachEvent("on" + name, callback);
            } else {
                ele["on" + name] = null;
            }
        }
    });
    // 功能四：DOM 相关方法
    myjQuery.prototype.extend({
        empty: function () {
            this.each(function (key, value) {
                value.innerHTML = "";
            })
            return this;
        },
        remove: function (selector) {
            if (arguments.length === 0) {
                this.each(function (key, value) {
                    var parent = value.parentNode;
                    parent.removeChild(value);
                })
            } else {
                var $this = this;
                $$(selector).each(function (key, value) {
                    // var type = value.tagName;
                    $this.each(function (k, v) {
                        // var t = v.tagName;
                        // if(t === type)
                        if (myjQuery(v).get(0) === value) {
                            value.parentNode.removeChild(value);
                        }
                    })
                })
            }
            return this;
        },
        html: function (selector) {
            if (arguments.length === 0) {
                return this[0].innerHTML;
            } else {
                this.each(function (key, value) {
                    value.innerHTML = selector;
                })
            }
        },
        text: function (selector) {
            if (arguments.length === 0) {
                var res = "";
                this.each(function (key, value) {
                    res += value.innerText;
                })
                return res;
            } else {
                this.each(function (key, value) {
                    value.innerText = selector;
                })
            }
        },
        appendTo: function (selector) {
            // 转换成 jQuery 对象
            var $target = myjQuery(selector);
            var $this = this;
            var res = [];
            myjQuery.each($target, function (key, value) {
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.appendChild(v);
                        res.push(v);
                    } else {
                        var cloneele = v.cloneNode(true);
                        value.appendChild(cloneele);
                        res.push(cloneele);
                    }
                })
            })
            return myjQuery(res);
            // for (var i = 0; i < $target.length; i++) {
            //     var element = $target[i];
            //     for (var j = 0; j < $this.length; j++) {
            //         var ele = $this[j];
            //         if (i === 0) {
            //             element.appendChild(ele)
            //         } else {
            //             var cloneele = ele.cloneNode(true);
            //             element.appendChild(cloneele);
            //         }
            //     }
            // }
        },
        prependTo: function (selector) {
            var $target = myjQuery(selector);
            var $this = this;
            var res = [];
            myjQuery.each($target, function (key, value) {
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.insertBefore(v, value.firstChild);
                        res.push(v);
                    } else {
                        var cloneele = v.cloneNode(true);
                        value.insertBefore(cloneele, value.firstChild);
                        res.push(cloneele);
                    }
                })
            })
            return myjQuery(res);
        },
        append: function (selector) {
            if (myjQuery.isString(selector)) {
                this[0].innerHTML += selector;
            } else {
                myjQuery(selector).appendTo(this);
            }
            return this;
        },
        prepend: function (selector) {
            if (myjQuery.isString(selector)) {
                this.each(function (key, value) {
                    value.innerHTML = selector + value.innerHTML;
                })
                // this[0].innerHTML = selector + this[0].innerHTML;
            } else {
                myjQuery(selector).prependTo(this);
            }
            return this;
        },
        insertBefore: function (selector) {
            var $target = myjQuery(selector);
            var $this = this;
            var res = [];
            myjQuery.each($target, function (key, value) {
                var parent = value.parentNode;
                $this.each(function (k, v) {
                    if (key === 0) {
                        parent.insertBefore(v, value);
                        res.push(v);
                    } else {
                        var cloneele = v.cloneNode(true);
                        parent.insertBefore(cloneele, value);
                        res.push(cloneele);
                    }
                })
            })
            return myjQuery(res);
        },
        before: function (selector) {
            myjQuery(selector).insertBefore(this);
            return this;
        },
        insertAfter: function (selector) {
            var $target = myjQuery(selector);
            var $this = this;
            var res = [];
            myjQuery.each($target, function (key, value) {
                var parent = value.parentNode;
                $this.each(function (k, v) {
                    if (key === 0) {
                        if (parent.lastElementChild === value) {
                            parent.appendChild(v);
                        } else {
                            parent.insertBefore(v, value.nextSibling);
                        }
                        res.push(v);
                    } else {
                        var cloneele = v.cloneNode(true);
                        if (parent.lastElementChild === value) {
                            parent.appendChild(vcloneele);
                        } else {
                            parent.insertBefore(cloneele, value.nextSibling);
                        }
                        res.push(cloneele)
                    }

                })
            })
            return myjQuery(res);
        },
        after: function (selector) {
            myjQuery(selector).insertAfter(this);
            return this;
        },
        next: function () {
            var res = [];
            this.each(function (key, value) {
                var ne = value.nextSibling;
                var parent = value.parentNode;
                if (parent.lastChild !== ne) {
                    while (ne.nodeType !== 1) {
                        ne = ne.nextSibling;

                    }
                } else {
                    return true;
                }
                res.push(ne);
            });
            return myjQuery(res);
        },
        prev: function () {
            var res = [];
            this.each(function (key, value) {
                var ne = value.previousSibling;
                var parent = value.parentNode;
                if (parent.firstChild !== ne) {
                    while (ne.nodeType !== 1) {
                        ne = ne.previousSibling;
                    }
                } else {
                    return true;
                }
                res.push(ne);
            });
            return myjQuery(res);
        },
        replaceAll: function (selector) {
            var $target = myjQuery(selector);
            var $this = this;
            var res = [];
            myjQuery.each($target, function (key, value) {
                var flag = false;
                $this.each(function (k, v) {
                    if (k === $this.length - 1) {
                        flag = true;
                    }
                    if (key === 0) {
                        myjQuery(v).insertBefore(value);
                        if (flag) myjQuery(value).remove();
                        res.push(v);
                    } else {
                        var cloneele = v.cloneNode(true);
                        myjQuery(cloneele).insertBefore(value);
                        if (flag) myjQuery(value).remove();
                        res.push(cloneele);
                    }
                })
            })
            return myjQuery(res);
        },
        replaceWith: function (selector) {
            var sele = this.selector;
            var $target = myjQuery(selector);
            var $this = this;
            if ($target.length === 0) {
                var arr = [];
                $this.each(function (key, value) {
                    arr.push(value);
                    value.outerHTML = selector + value.outerHTML;
                })
            } else {
                $target.replaceAll($this);
            }
            myjQuery(sele).each(function (key, value) {
                value.parentNode.removeChild(value);
            })
            return $this;
        },
        clone: function (isDeepClone) {
            var res = [];
            if (isDeepClone) {
                this.each(function (i, ele) {
                    var temp = ele.cloneNode(true);
                    myjQuery.each(ele.eventCache, function (eventName, eventArr) {
                        myjQuery.each(eventArr, function (i, callback) {
                            myjQuery(temp).on(eventName, callback);
                        })
                    })
                    res.push(temp);
                })
            } else {
                this.each(function (i, ele) {
                    var temp = ele.cloneNode(true);
                    res.push(temp);
                })
            }
            return myjQuery(res);
        }
    });
    // 功能五：属性相关方法
    myjQuery.prototype.extend({
        attr: function (attr, value) {
            if (myjQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0].getAttribute(attr);
                } else {
                    this.each(function (key, ele) {
                        ele.setAttribute(attr, value);
                    })
                }
            } else if (myjQuery.isObject(attr)) {
                var $this = this;
                myjQuery.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele.setAttribute(key, value);
                    })
                })
            }
            return this;
        },
        prop: function (attr, value) {
            if (myjQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0][attr];
                } else {
                    this.each(function (key, ele) {
                        ele[attr] = value;
                    })
                }
            } else if (myjQuery.isObject(attr)) {
                var $this = this;
                myjQuery.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele[key] = value;
                    })
                })
            }
            return this;
        },
        css: function (attr, value) {
            if (myjQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return myjQuery.getStyle(this[0], attr);
                } else {
                    this.each(function (key, ele) {
                        ele.style[attr] = value;
                    })
                }
            } else if (myjQuery.isObject(attr)) {
                var $this = this;
                myjQuery.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele.style[key] = value;
                    })
                })
            }
            return this;
        },
        val: function (content) {
            if (arguments.length === 0) {
                return this[0].value;
            } else if (myjQuery.isString(content)) {
                this.each(function (k, ele) {
                    ele.value = content;
                })
            }
            return this;
        },
        hasClass: function (classname) {
            var flag = false;
            if (arguments.length === 0) {
                return flag;
            } else {
                this.each(function (key, ele) {
                    var clsname = " " + ele.className + " ";
                    name = " " + classname + " ";
                    if (clsname.indexOf(name) !== -1) {
                        flag = true;
                        return false;
                    }
                })
            }
            return flag;
        },
        addClass: function (classname) {
            if (arguments.length !== 0) {
                var arr = classname.split(" ");
                this.each(function (key, ele) {
                    myjQuery.each(arr, function (k, v) {
                        if (v === "") {
                            return true;
                        }
                        if (!myjQuery(ele).hasClass(v)) {
                            ele.className = ele.className + " " + v;
                        }
                    })
                })
            }
            return this;
        },
        removeClass: function (classname) {
            if (arguments.length === 0) {
                this.each(function (k, v) {
                    v.className = "";
                })
            } else {
                var arr = classname.split(" ");
                this.each(function (key, ele) {
                    myjQuery.each(arr, function (k, v) {
                        if (v === "") {
                            return true;
                        }
                        if (myjQuery(ele).hasClass(v)) {
                            ele.className = (" " + ele.className).replace(" " + v, "").substr(1);
                        }
                    })
                })
            }
            return this;
        },
        toggleClass: function (classname) {
            if (arguments.length !== 0) {
                var arr = classname.split(" ");
                this.each(function (key, ele) {
                    myjQuery.each(arr, function (k, v) {
                        if (v === "") {
                            return true;
                        }
                        if (myjQuery(ele).hasClass(v)) {
                            myjQuery(ele).removeClass(v);
                        } else {
                            myjQuery(ele).addClass(v);
                        }
                    })
                })
            } else {
                this.removeClass();
            }
            return this;
        }
    });
    // 功能六：事件相关操作方法
    myjQuery.prototype.extend({
        on: function (name, callback) {
            this.each(function (key, ele) {
                if (!ele.eventCache) {
                    ele.eventCache = {};
                }
                if (!ele.eventCache[name]) {
                    ele.eventCache[name] = [];
                    ele.eventCache[name].push(callback);
                    myjQuery.addEvent(ele, name, function () {
                        myjQuery.each(ele.eventCache[name], function (i, event) {
                            event();
                        })
                    });
                } else {
                    ele.eventCache[name].push(callback);
                }
            });
        },
        off: function (name, callback) {
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    ele.eventCache = {};
                })
            } else if (arguments.length === 1) {
                this.each(function (key, ele) {
                    ele.eventCache[name] = [];
                })
            } else if (arguments.length === 2) {
                this.each(function (key, ele) {
                    if (ele.eventCache) {
                        myjQuery.each(ele.eventCache[name], function (i, v) {
                            if (v === callback) {
                                ele.eventCache[name].splice(i, 1);
                            }
                        })
                    }
                })
            }
        }
    })
    // 功能七：ajax，不能处理跨域请求
    myjQuery.extend({
        objToString: function (obj) {
            var res = [];
            obj = obj || {};
            obj.t = Date.now();
            for (var k in obj) {
                res.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
            }
            return res.join("&");
        },
        ajax: function (obj) {
            var type = String(obj.type).toLocaleUpperCase() || "GET";
            var url = obj.url || "";
            var data = myjQuery.objToString(obj.data);
            var success = obj.success;
            var error = obj.error;
            var timeout = obj.timeout;
            // 1.创建 xhr
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // 2.判断请求类型 -> 3.发送请求,第单个参数表示异步
            if (type === "GET") {
                console.log(xhr);
                xhr.open(type, url + "?" + data, true);
                // Access-Control-Allow-Origin
                xhr.send();
            } else if (type === "POST") {
                xhr.open(tyep, url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(data);
            }
            // 4.监听状态的变化
            xhr.onreadstatechange = function (e) {
                xhr.timer ? clearTimeout(xhr.timer) : "";
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        success(xhr);
                    } else {
                        error(xhr);
                    }
                }
            }
            if (obj.timeout) {
                xhr.timer = setTimeout(function () {
                    console.log("请求超时，请稍后重试");
                    xhr.abort();
                    clearTimeout(xhr.timer);
                })
            }
        }
    })
    myjQuery.prototype.init.prototype = myjQuery.prototype;
    window.myjQuery = window.$$ = myjQuery;
})(window);

// 插件的写法
;
(function ($$, window) {
    $$.extend({
        // document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
        addCookie: function (key, value, deadline, path, domain) {
            key = key || "";
            value = value || "";

            var index = window.location.pathname.lastIndexOf("/");
            var currentPath = window.location.pathname.slice(0, index);
            path = path || currentPath;
            domain = domain || document.domain;
            if (!deadline) {
                document.cookie = key + "=" + value + "; path=" + path + "; domain=" + domain;
            } else {
                var date = new Date();
                date.setDate(date.getDate() + deadline);
                document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=" + path + "; domain=" + domain;
            }
        },

        getCookie: function (key) {
            var cookies = document.cookie.split(";");
            for (var i = 0, len = cookies.length; i < len; i++) {
                var temp = cookies[i].split("=");
                if (temp[0].trim() === key) {
                    return temp[1];
                }
            }
            return "";
        },

        removeCookie: function (key, path) {
            var index = window.location.pathname.lastIndexOf("/");
            var currentPath = window.location.pathname.slice(0, index);
            path = path || currentPath;
            this.addCookie(key, this.getCookie(key), -1, path);
        }
    });
})(myjQuery, window)