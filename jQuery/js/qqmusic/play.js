(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        Musiclist: [],
        currentIndex: -1,
        isPlay: false,
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        playMusic: function (index, music) {
            // index currentIndex 用于判断播放的是不是当前同一首
            if (this.currentIndex == index) {
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                this.currentIndex = index;
                this.$audio.attr("src", music.url);
                this.audio.play();
            }
        },
        playprev: function () {
            this.playMode();
            // 上一首
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.Musiclist.length - 1;
            }
            return index;
        },
        playnext: function () {
            this.playMode();
            // 下一首
            var index = this.currentIndex + 1;
            if (index > this.Musiclist.length - 1) {
                index = 0;
            }
            return index;
        },
        deleteitem: function (index) {
            this.Musiclist.splice(index, 1);
            if (index < this.currentIndex) {
                this.currentIndex = index;
            }
        },
        musicTimeUpdate: function (callback) {
            var $this = this;
            this.$audio.on("timeupdate", function () {
                var totalTime = $this.Musiclist[$this.currentIndex].time;
                // var totalTime = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timestr = $this.formatTime(currentTime, totalTime);
                callback(totalTime, currentTime, timestr);
            });
        },
        formatTime: function (currentTime, totalTime) {
            var cm = parseInt(currentTime / 60);
            var cs = parseInt(currentTime % 60);
            cm = cm < 10 ? "0" + cm : cm;
            cs = cs < 10 ? "0" + cs : cs;
            return cm + ":" + cs + " / " + totalTime;
        },
        musicjump: function (value) {
            if (!isNaN(value) && !isNaN(this.audio.duration)) {
                this.audio.currentTime = this.audio.duration * value;
            }
        },
        musicVoiceSwitch: function (value) {
            // console.log(value);
            // 0 ~ 1 取值
            if (!isNaN(value)) {
                if (value < 0) {
                    this.audio.volume = 0;
                    return;
                }
                if (value > 1) {
                    this.audio.volume = 1;
                    return;
                }
                this.audio.volume = value;
                // if (1 - value < 0.001) {
                //     this.audio.volume = 1;
                // }
                // if (value < 0.000001) {
                //     this.audio.volume = 0;
                // }
            }
        },
        playMode: function () {
            if ($("#play-mode").hasClass("random")) {
                var len = this.Musiclist.length;
                this.currentIndex = Math.floor(Math.random()*len);
                this.isPlay = false;
            }
            if ($("#play-mode").hasClass("single")) {
                this.currentIndex = this.currentIndex - 1;
                this.isPlay = true;
            }
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);