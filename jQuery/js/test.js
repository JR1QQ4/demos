$(function () {
    // trigger
    // $(".father").click(function () {
    //     alert("father");
    // });
    // $(".son").click(function () {
    //     alert("son");
    // });
    // $(".son a").click(function () {
    //     alert("a 被点击了");
    // });
    // $(".sp").click(function () {
    //     alert("span 被点击了");
    // });
    // 有事件冒泡
    // $(".son").trigger("click");
    // 没有事件冒泡
    // $(".son").triggerHandler("click");
    // 没有默认行为
    // $(".son a").trigger("click");
    // 没有冒泡和默认行为
    // $(".son a").triggerHandler("click");
    // $(".sp").trigger("click");

    // 命名空间
    // $(".sn").on("myClick.ls", function () {
    //     alert("ls son click");
    // });
    // $(".fa").on("myClick.ls", function () {
    //     alert("ls fa click");
    // });
    // $(".fa").on("click", function () {
    //     alert("ls fa click");
    // });
    // $(".sn").trigger("myClick.ls");

    // mouseover mouseout
    // $(".mf").mouseover(function (e) {
    //     console.log("over");
    // })
    // $(".mf").mouseout(function () {
    //     console.log("out");
    // })

    // animate 
    $(".animate button").eq(0).click(function () {
        $(".animate > div").eq(0).animate({
            width: 200
        }, 1000, function () {
            console.log("动画执行完毕！");
        })
    })
    $(".animate button").eq(1).click(function () {
        $(".animate > div").eq(1).stop().animate({
            marginLeft: 500,
            width: 200
        }, 1000, "swing");
        $(".animate > div").eq(2).stop().animate({
            marginLeft: 500,
            width: 200
        }, 1000, "linear");
    });
    $(".animate button").eq(2).click(function () {
        $(".animate > div").eq(1).stop().animate({
            marginLeft: 0,
            width: 80
        }, 1000, "swing");
        $(".animate > div").eq(2).stop().animate({
            marginLeft: 0,
            width: 80
        }, 1000, "linear");
    });
});