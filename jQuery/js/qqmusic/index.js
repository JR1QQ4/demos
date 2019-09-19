$(function () {
    var audio = $("audio");
    var playobj = new Player(audio);

    // 播放进度条
    var $progressBar = $(".player-progress");
    var $progressLine = $(".player-progress-bar");
    var $progressDot = $(".player-progress-dotted");
    var progress = new Progress($progressBar, $progressLine, $progressDot);
    progress.progressClick(function (value) {
        playobj.musicjump(value);
    });
    progress.progressMove(function (value) {
        playobj.musicjump(value);
    });

    // 声音进度条
    var $voiceBar = $(".voice-progress");
    var $voiceLine = $(".voice-bar");
    var $voiceDot = $(".voice-dotted");
    var voiceobj = new Progress($voiceBar, $voiceLine, $voiceDot);
    voiceobj.progressClick(function (value) {
        value = value.toFixed(2);
        playobj.musicVoiceSwitch(value);
    });
    voiceobj.progressMove(function (value) {
        value = value.toFixed(2);
        playobj.musicVoiceSwitch(value);
    });

    // 歌词对象
    var lrcobj = null;

    // 0.生成歌曲列表
    $.ajax({
        type: "GET",
        url: "../source/music.json",
        dataType: "json",
        success: function (response) {
            playobj.Musiclist = response;
            var wrap = $(".center-left .info .scroll");
            $.each(response, function (i, v) {
                var item = $('<ul class="info-item clearfix">' +
                    '<li class="check"><input type="checkbox" name="checkall" class="check-item">' +
                    '</li>' +
                    '<li class="number">' +
                    '    <img src="../images/qqmusic/wave.gif" alt="播放gif" class="play-icon"></img>' +
                    '    <span class="number-text">' + (i + 1) + '</span>' +
                    '</li>' +
                    '<li class="sing">' +
                    '    <span class="sing-text">' + v.name + '</span>' +
                    '    <div class="sing-menu">' +
                    '        <a class="js-play" href="javascript:void(0);"><i class="play"></i></a>' +
                    '        <a href="javascript:void(0);"><i class="add"></i></a>' +
                    '        <a href="javascript:void(0);"><i class="down"></i></a>' +
                    '        <a href="javascript:void(0);"><i class="share"></i></a>' +
                    '    </div>' +
                    '</li>' +
                    '<li class="singer">' + v.artist.join('/') + '</li>' +
                    '<li class="time">' +
                    '    <div class="delete"><a href="javascript:void(0);" id="js-delete"><i class=""></i></a></div>' +
                    '    <span class="time-text">' + v.time + '</span>' +
                    '</li>' +
                    '</ul>');
                item.get(0).index = i;
                item.get(0).music = v;
                wrap.append(item);
            });
            // 初始化滑动条
            $(".content").mCustomScrollbar({
                axis: "y",
                theme: "minimal-dark"
            });
        },
        error: function (data) {
            console.log("error: " + data.status);
        }
    });
    // 1.初始化事件监听
    initEvent();

    function initEvent() {
        // 复选框选中 
        $(".center-left .scroll").on("click", ".info-item .check-item", function () {
            $(this).parent().toggleClass("active");
            $(this).attr("checked", $(this).parent().hasClass("active"));
            if ($(".info-item .check-item:checked").length == ($(".center-left .info-item").length) && $(".center-left .info-item").length >= 1) {
                $(".center-left #checkall").parent().addClass("active");
            } else {
                $(".center-left #checkall").parent().removeClass("active");
            }
        })
        // 全选
        $(".center-left #checkall").on("click", function () {
            $(this).parent().toggleClass("active");
            $(this).parent().hasClass("active") ? $(".info-item .check").addClass("active") : $(".info-item .check").removeClass("active");
        })
        // 监听li里面的播放按钮
        $(".center-left").on("click", ".sing-menu .play", function () {
            var play = $(".f-playicon #js-play");
            var item = $(this).parents(".info-item");
            $(this).toggleClass("pause").parents(".info-item").siblings(".info-item").find(".play").removeClass("pause");
            // 播放的gif是否显示
            item.siblings(".info-item").find(".number").removeClass("active");
            item.find(".number").toggleClass("active");
            // 切换图标，变换文字样式
            if ($(this).hasClass("pause")) {
                play.addClass("pause");
                item.siblings(".info-item").removeClass("playon");
                item.addClass("playon");
            } else {
                play.removeClass("pause");
                item.removeClass("playon");
            }
            // 播放音乐
            var index = $(this).parents(".info-item").get(0).index;
            var music = $(this).parents(".info-item").get(0).music;
            playobj.playMusic(index, music);
            // 初始化歌曲内容
            initMusicInfo(playobj.Musiclist[index]);
            // 初始化歌词信息
            initMusicLrc(playobj.Musiclist[playobj.currentIndex]["lrc_url"]);
            // console.log(playobj.currentIndex);
            // console.log(playobj.Musiclist[playobj.currentIndex]["lrc_url"]);
            scrollTitle();
        })
        // 监听播放按钮
        $("#js-play").on("click", function () {
            if (playobj.currentIndex == -1) {
                $(".info-item").eq(0).find(".sing-menu .play").trigger("click");
            } else {
                $(".info-item").eq(playobj.currentIndex).find(".sing-menu .play").trigger("click");
            }
        })
        // 上一首
        $("#js-prev").on("click", function () {
            $(".info-item").eq(playobj.playprev()).find(".sing-menu .play").trigger("click");
        })
        // 下一首
        $("#js-next").on("click", function () {
            $(".info-item").eq(playobj.playnext()).find(".sing-menu .play").trigger("click");
        })
        // 删除
        $(".center-left").on("click", "#js-delete", function () {
            var item = $(this).parents(".info-item");
            var index = item.get(0).index;
            if (index == playobj.currentIndex) {
                $("#js-next").trigger("click");
            }
            item.remove();
            playobj.deleteitem(index);
            // 重新排序
            $(".info-item").each(function (index, ele) {
                ele.index = index;
                $(ele).find(".number-text").text(index + 1);
            })
        });
    }
    // 初始化歌曲信息
    function initMusicInfo(music) {
        var singname = $(".center-right .sing-text");
        var singername = $(".singers");
        var albumname = $(".center-right .album-text");
        var lrc = $(".center-right .lrc");
        var pic = $(".center-right .pic");
        var bgpic = $(".mask-bg");
        var timetotal = $(".music-time-text");
        var singer = music.artist.join("/");

        singname.text(music.name);
        singername.text(singer);
        albumname.text(music.album);
        timetotal.text("00:00 / " + music.time);
        if (music["pic_url"] != "") {
            pic.attr("src", music["pic_url"]);
            $("body").css("background", "#00000000");
            bgpic.css("backgroundImage", "url(" + music["pic_url"] + ")");
        } else {
            $("body").css("background", "#292a2b");
        }
        $(".center-right").addClass("play");
    }
    // 监听播放进度
    playobj.musicTimeUpdate(function (totalTime, currentTime, timestr) {
        var totalTime = getTime(totalTime);
        var currentTime = currentTime;
        var timestr = timestr;
        $(".music-time-text").text(timestr);
        var value = currentTime / totalTime * 100;
        progress.setProgress(Math.round(value));
        // 下一首
        if (100 - value <= 0.000001) {
            $("#js-next").trigger("click");
        }

        // 歌词同步
        var index = lrcobj.currentIndex(currentTime);
        var $item = $(".lrc li").eq(index);
        var height = $(".lrc li").eq(0).height();
        $item.addClass("on");
        $item.siblings().removeClass("on");
        $(".lrc").css({
            "marginTop": (-index + 2) * height
        });
    })

    function getTime(value) {
        var m = value.split(":")[0] * 60;
        var s = parseInt(value.split(":")[1]);
        return m + s;
    }
    // 声音图标点击切换
    $("#voice-mode").on("click", function () {
        $(this).toggleClass("toggle");
        // 声音切换
        if ($(this).hasClass("toggle")) {
            // 没有声音
            playobj.musicVoiceSwitch(0);
        } else {
            playobj.musicVoiceSwitch(1);
        }
    })
    // 初始化歌词
    function initMusicLrc(path) {
        lrcobj = new Lrc(path);
        var lrcul = $(".singlrc .lrc");
        lrcul.empty();
        lrcobj.loadLrc(function () {
            // console.log(lrcobj.lrcs);
            $.each(lrcobj.lrcs, function (i, v) {
                var $li = $("<li>" + v + "</li>");
                lrcul.append($li);
            });
        });
    }

    // 小功能
    tools();

    function tools() {
        $("#favorite").on("click", function () {
            $(this).toggleClass("like");
        })
        var mode = ["list", "order", "random", "single"];
        var index = 0;
        $("#play-mode").on("click", function () {
            index++;
            if (index == mode.length) {
                index = 0;
            }
            $(this).attr("class", "");
            $(this).addClass(mode[index]);
        })
        $(".toolbar a:eq(0)").on("click", function () {
            $(this).find(".like").toggleClass("active");
        })
        $("#clearlist").on("click", function () {
            $(".center-left .info-item").remove();
        })
        $("#switch").on("click", function () {
            $(this).toggleClass("active");
            if ($(this).hasClass("active")) {
                $(".center-left").css("opacity", "0");
                $(".center-right").css({
                    right: "50%",
                    marginRight: -150
                });
                $(".center-right").addClass("hide");
            } else {
                $(".center-left").css("opacity", "1");
                $(".center-right").css({
                    right: 70,
                    marginRight: 0
                });
                $(".center-right").removeClass("hide");
            }
        })
    }
    // title 滚动
    function scrollTitle() {
        var sing = playobj.Musiclist[playobj.currentIndex].name;
        var singer = playobj.Musiclist[playobj.currentIndex].artist.join("/");
        var str = "正在播放 " + sing + "-" + singer;
        if (str.length > 9) {
            str = str.substr(0, 9);
        }
        str = str + "...";
        var title = $("head title");
        var index = 0;
        setInterval(() => {
            title.text(str.substr(index) + str.substr(0, index));
            index++;
            if (index == str.length) {
                index = 0;
            }
        }, 1000);
    }

    console.log(
        "%c 版权声明，此页面所有歌曲来自互联网，如有侵权，请联系我\n\n" +
        " 此页面仅供学习参考，如需听歌，请访问 https://y.qq.com/\n\n" +
        " 此页面还有许多 bug，欢迎和我交流",
        "color: #fff; background: #31c27c; font-size: 24px;"
    );
})