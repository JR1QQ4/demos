$(function () {
    $(".sendnow").click(function () {
        var msg = $("#sendmsg").val();
        var item = $('<div class="info-item">' +
            '    <div class="content clearfix">' +
            '        <div class="face">' +
            '            <img src="../images/weibo/face.jpg" alt="头像">' +
            '        </div>' +
            '        <div class="detail">' +
            '            <div class="detail-info">' +
            '                <a href="javascript:void(0);" class="nickname">东夋壬</a>' +
            '                <a href="javascript:void(0);"><span class="menber"></span></a>' +
            '                <a href="javascript:void(0);" class="menu"><span' +
            '                        class="iconfont icon-jiantou"></span></a>' +
            '            </div>' +
            '            <div class="form">' +
            '                <a href="javascript:void(0);" class="time">9月17日 19:14</a>' +
            '                来自 <a href="javascript:void(0);" class="form-text">微博 weibo.com</a>' +
            '            </div>' +
            '            <div class="wb-text">' +
            msg +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '    <div class="handle">' +
            '        <ul class="clearfix">' +
            '            <li><a href="javascript:void(0);"><span' +
            '                        class="iconfont icon-dianping"></span><span' +
            '                        class="count">收藏</span></a></li>' +
            '            <li><a href="javascript:void(0);"><span' +
            '                        class="iconfont icon-fenxiang"></span><span' +
            '                        class="count">转发</span></a></li>' +
            '            <li><a href="javascript:void(0);"><span' +
            '                        class="iconfont icon-pinglun"></span><span' +
            '                        class="count">评论</span></a></li>' +
            '            <li><a href="javascript:void(0);"><span' +
            '                        class="iconfont icon-dianzan"></span><span' +
            '                        class="count">赞</span></a></li>' +
            '        </ul>' +
            '    </div>' +
            '</div>');
        $(".bd-main>.info").prepend(item);
        $("#sendmsg").val("");
        $(".sendnow").prop("disabled", true);
        $(".sendnow").removeClass("active");
    });
    $("body").on("propertychange input", "#sendmsg", function () {
        var msg = $(this).val().trim();
        if (msg !== "") {
            $(".sendnow").prop("disabled", false);
            $(".sendnow").addClass("active");
        } else {
            $(".sendnow").prop("disabled", true);
            $(".sendnow").removeClass("active");
        }
    })
    $(".movie-top > .innerwrap  li").mouseenter(function () {
        $(this).addClass("current").siblings().removeClass("current");
    })
    $(".pic-ul img").click(function () {
        var index = $(this).parent().index();
        $(".pic-ul .big img").eq(index).show().siblings().hide();
    });
    $(".pic-ul .big img").click(function(){
        $(this).hide().siblings().hide();
    })
    $(".totop").click(function () {
        $("html,body").animate({
            scrollTop: 0
        },500,"swing");
    })
    var text =  $(".search span").text().split("：");
    $(".search input").focus(function () {
        $(this).prop("placeholder",text[1]).css("background","#fff");
        $(".search span").text("");
    })
    $(".search input").blur(function () {
        if ($(this).val().trim() === "") {
            $(".search span").text(text);
            $(this).prop("placeholder", "").css("background","#0000");
        }
    })
});