(function (window) {
    function Lrc(path) {
        return new Lrc.prototype.init(path);
    }
    Lrc.prototype = {
        constructor: Lrc,
        init: function (path) {
            this.path = path;
        },
        loadLrc: function (callback) {
            var $this = this;
            $.ajax({
                type: "GET",
                url: $this.path,
                dataType: "text",
                success: function (response) {
                    $this.parseLrc(response);
                    // console.log($this.lrcs);
                    callback();
                },
                error: function (res) {
                    console.log(res);
                }
            });
        },
        times: [],
        lrcs: [],
        index: 0,
        parseLrc: function (data) {
            this.times.length = 0;
            this.lrcs.length = 0;
            var array = data.split("\n");
            var timeReg = /\[(\d*:\d*\.\d*)\]/;
            var $this = this;
            $.each(array, function (i, v) {
                var res = timeReg.exec(v);
                var lrc = v.split("]")[1];
                if (lrc == null || lrc.trim() == "") {
                    return true;
                }
                $this.lrcs.push(lrc);
                if (res == null) {
                    return true;
                }
                var timeStr = res[1];
                var timeStrarr = timeStr.split(":");
                var min = parseInt(timeStrarr[0]) * 60;
                var sec = parseFloat(timeStrarr[1]);
                var time = parseFloat(Number(min + sec).toFixed(2));
                $this.times.push(time);
            })
        },
        currentIndex: function (currentTime) {
            // if (currentTime >= this.times[this.index]) {
            //     this.index++;
            //     this.times.shift();
            // }
            for (var i = 0, len = this.times.length; i < len - 1; i++) {
                if (currentTime >= this.times[i]) {
                    if (currentTime < this.times[i+1]) {
                        this.index = i;
                        break;
                    }
                }
            }
            return this.index;
        }
    };
    Lrc.prototype.init.prototype = Lrc.prototype;
    window.Lrc = Lrc;
})(window);