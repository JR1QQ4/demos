$(function () {
    var datalist = [];
    // 保存数据
    function savedata() {
        localStorage.setItem("todolist", JSON.stringify(datalist));
    }
    // 获取数据
    function getdata() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            datalist = JSON.parse(data);
        } else {
            datalist = [];
        }
    }
    // 添加数据
    function adddata() {
        if ($("#todo").val().trim() !== "") {
            datalist.unshift({
                title: $("#todo").val(),
                completed: false
            });
            $("#todo").val("");
        }
    }
    // 渲染数据
    function load() {
        getdata();
        $(".list").empty();
        var count = 0;
        $.each(datalist, function (i, v) {
            if (!v.completed) {
                $(".list").prepend("<li class='list-group-item' data-index=" + i + ">" +
                    "<input type='checkbox' class='toggle'>" +
                    "<label>" + v.title + "</label>" +
                    "<button type='button' class='close'><span>&times;</span></button></li>");
                count++;
            } else {
                $(".list").prepend("<li class='list-group-item' data-index=" + i + ">" +
                    "<input type='checkbox' class='toggle' checked>" +
                    "<label class='active'>" + v.title + "</label>" +
                    "<button type='button' class='close'><span>&times;</span></button></li>");
            }
        });
        $(".count b").text(count);
    }
    // 显示
    function show(flag) {
        $(".list").children().each(function (j, ele) {
            $(ele).css("display", "block");
        });
        if (flag === 1) {
            $.each(datalist, function (i, v) {
                if (v.completed) {
                    $(".list").children().each(function (j, ele) {
                        if (i == ele.dataset.index) {
                            $(ele).css("display", "none");
                        }
                    })
                }
            });
        } else if (flag === 2) {
            $.each(datalist, function (i, v) {
                if (!v.completed) {
                    $(".list").children().each(function (j, ele) {
                        if (i == ele.dataset.index) {
                            $(ele).css("display", "none");
                        }
                    })
                }
            });
        }
    }
    load();
    $("#todo").on("keydown", function (event) {
        if (event.keyCode === 13) {
            adddata();
            savedata();
            load();
        }
    });
    $("#icon").on("click", function () {
        adddata();
        savedata();
        load();
    });
    $(".list").on("click", ".toggle", function () {
        $(this).siblings("label").toggleClass("active");
        var index = $(this).parent().data("index");
        var count = 0;
        datalist[index].completed = this.checked
        savedata();
        $.each(datalist, function (i, v) {
            if (!v.completed) {
                count++;
            }
        });
        $(".count b").text(count);
    });
    $(".list").on("click", ".close", function () {
        var index = $(this).parent().data("index");
        datalist.splice(index, 1);
        savedata();
        load();
        if (location.hash === "#doing") {
            $(".doing").trigger("click");
        } else if (location.hash === "#completed") {
            $(".completed").trigger("click");
        }
    });
    $(".all").on("click", function () {
        show();
    });
    $(".doing").on("click", function () {
        show(1);
    });
    $(".completed").on("click", function () {
        show(2);
    });
    $(".clear").on("click", function () {
        var newdata = [];
        $.each(datalist, function (i, v) {
            if (!v.completed) {
                newdata.unshift(v);
            }
        });
        datalist = newdata;
        savedata();
        load();
    });
});