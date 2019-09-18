var images = [{
        src: "../images/trolley/dom.jpg",
        price: 77.40,
        title: "JavaScript DOM编程艺术(第2版)（html+css+javascript教程精粹，JavaScrip权威指南！）",
        checked: false,
        deleted: false,
        isLoading: false
    },
    {
        src: "../images/trolley/es6.jpg",
        price: 68.30,
        title: "ES6标准入门（第3版）",
        checked: false,
        deleted: false,
        isLoading: false
    },
    {
        src: "../images/trolley/jQuery.jpg",
        price: 68.70,
        title: "JavaScript & jQuery 交互式Web前端开发",
        checked: false,
        deleted: false,
        isLoading: false
    },
    {
        src: "../images/trolley/node.jpg",
        price: 56.40,
        title: "深入浅出Node.js",
        checked: false,
        deleted: false,
        isLoading: false
    },
    {
        src: "../images/trolley/javascript.jpg",
        price: 77.40,
        title: "JavaScript权威指南（第6版）",
        checked: false,
        deleted: false,
        isLoading: false
    },
    {
        src: "../images/trolley/js.jpg",
        price: 80.90,
        title: "JavaScript高级程序设计（第3版）",
        checked: false,
        deleted: false,
        isLoading: false
    },
    {
        src: "../images/trolley/patterns.jpg",
        price: 48.20,
        title: "JavaScript设计模式",
        checked: false,
        deleted: false,
        isLoading: false
    }
];
$(function () {
    $(".navbar-toggle").on("click", function () {
        $(".collapse").slideToggle();
    })
    // 设置数据
    function savedata(obj) {
        localStorage.setItem("imgobj", JSON.stringify(obj));
    }
    // 获取数据
    function getdata() {
        if (localStorage.getItem("imgobj")) {
            images = JSON.parse(localStorage.getItem("imgobj"));
        }
    }
    // 生成购物车
    function load() {
        $(".cart-floatbar").width($(".container").width());
        getdata();
        if (images.length === 0) {
            $(".cart-content").hide();
        }
        var loadmuns = 0;
        $.each(images, function (i, v) {
            $(".cart-content").append('<div class="item-list' + (v.checked ? " active" : "") + '" data-index=' + i + '><div class="item-form row clearfix">' +
                '<div class="p-checkbox"><input class="checks" type="checkbox" ' + (v.checked ? "checked" : "") + '></div>' +
                '<div class="p-goods col-md-7 col-sm-7 col-xs-7">' +
                '<div class="p-img"><a href="javascript:void(0);"><img src=' + v.src + ' alt=' + v.title + '></a></div>' +
                '<div class="p-msg">' +
                '<p><a href="javascript:void(0);">' + v.title + '</a></p>' +
                '</div>' +
                '</div>' +
                '<div class="p-price col-md-1 hidden-sm hidden-xs">¥' + v.price.toFixed(2) + '</div>' +
                '<div class="p-quantity col-md-2 col-sm-2 col-xs-3">' +
                '<a href="javascript:void(0);" class="minus">-</a>' +
                '<input type="text" value="1" class="nums">' +
                '<a href="javascript:void(0);" class="plus">+</a>' +
                '</div>' +
                '<div class="p-sum col-md-1 col-sm-1 col-xs-2">¥' + v.price.toFixed(2) + '</div>' +
                '<div class="p-action col-md-1 col-sm-1 hidden-sm hidden-xs">' +
                '<a href="javascript:void(0);" class="delitem">删除</a>' +
                '<a href="javascript:void(0);">移入收藏</a>' +
                '</div>' +
                '</div>' +
                '</div>');
        });
        t = $(".isfixed").offset().top;
        getfix();
    }
    load();

    function updatedata() {
        $(".counts").text($(".checks:checked").length);
        if ($(".checks:checked").length === images.length) {
            $(".shopall").prop("checked", true);
            $(".checkall").prop("checked", true);
        } else {
            $(".shopall").prop("checked", false);
            $(".checkall").prop("checked", false);
        }
        var count = 0;
        var price = 0;
        $(".checks").each(function (i, v) {
            var item = $(v).parents(".item-list");
            var index = item.data("index");
            if ($(this).prop("checked")) {
                item.addClass("active");
                count += parseInt(item.find(".nums").val());
                price += parseFloat(item.find(".p-sum").text().substr(1))
                images[index].checked = true;
            } else {
                item.removeClass("active");
                images[index].checked = false;
            }
        });
        savedata(images);
        $(".counts").text(count);
        $(".price-count").text(price.toFixed(2));
    }
    $(".p-quantity").on("click", ".minus", function () {
        var text = $(this).siblings(".nums").val();
        if (text != 1) {
            $(this).siblings(".nums").val(text - 1);
            var price = $(this).parent().siblings(".p-price").text().substr(1);
            $(this).parent().siblings(".p-sum").text("¥" + (price * $(this).siblings(".nums").val()).toFixed(2));
        }
        updatedata();
    });
    $(".p-quantity").on("click", ".plus", function () {
        var text = $(this).siblings(".nums").val();
        $(this).siblings(".nums").val(parseInt(text) + 1);
        var price = $(this).parent().siblings(".p-price").text().substr(1);
        $(this).parent().siblings(".p-sum").text("¥" + (price * $(this).siblings(".nums").val()).toFixed(2));
        updatedata();
    });
    $(".p-quantity").on("change", ".nums", function () {
        var price = $(this).parent().siblings(".p-price").text().substr(1);
        if (!/\D/g.test($(this).val().trim())) {
            $(this).parent().siblings(".p-sum").text("¥" + (price * $(this).val()).toFixed(2));
        } else {
            $(this).val("1");
            $(this).parent().siblings(".p-sum").text("¥" + (price * 1).toFixed(2));
        }
        updatedata();
    });
    $(".cart-content").on("click", ".checks", function () {
        updatedata();
    });
    $(".checkall,.shopall").on("click", function () {
        $(".checks").prop("checked", $(this).prop("checked"));
        $(".checkall,.shopall").prop("checked", $(this).prop("checked"));
        updatedata();
    });

    $(".cart-content").on("click", ".delitem", function () {
        var item = $(this).parents(".item-list");
        var index = item.data("index");
        item.remove();
        var newArr = [];
        images[index].deleted = true;
        $.each(images, function (i, v) {
            if (!v.deleted) {
                newArr.push(v)
            }
        })
        savedata(newArr);
        t = $(".isfixed").offset().top;
        getfix();
    });
    $(".delall").on("click", function () {
        $(".checks:checked").each(function (i, v) {
            $(v).parents(".item-list").remove();
            // var index = $(v).parents(".item-list").data("index");
        })
        var newArr = [];
        $.each(images, function (i, v) {
            if (!v.checked) {
                newArr.push(v);
            }
        });
        savedata(newArr);
        // $(".item-list").each(function (i, v) {
        //     $(v).remove();
        // })
        // load();
        t = $(".isfixed").offset().top;
        getfix();
    });
    var flag = false;
    var t = $(".isfixed").offset().top;

    function getfix() {
        var h = $("html,body").scrollTop() + $(window).innerHeight();
        if (h > t) {
            $(".cart-floatbar").removeClass("fixed");
            flag = false;
        } else if (h <= t && !flag) {
            $(".cart-floatbar").addClass("fixed");
            flag = true;
        }
    }
    // 底部
    $(window).scroll(function () {
        getfix();
    });
    $(window).resize(function () {
        $(".cart-floatbar").width($(".container").width());
    })
});