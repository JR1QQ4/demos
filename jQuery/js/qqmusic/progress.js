(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        // 判断是否移动
        isMove: false,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        progressClick: function (callback) {
            var $this = this;
            this.$progressBar.click(function (e) {
                var left = $(this).offset().left;
                var x = e.pageX
                // console.log($this.$progressLine);
                $this.$progressLine.css("width", x - left);
                // 计算比例改变音乐进度
                var value = (x - left) / $(this).width();
                // console.log("e.pageX:" + x);
                // console.log("left:" + left);
                // console.log("$this.$progressBar.width():" + $this.$progressBar.width());
                // console.log("value:" + value);
                callback(value);
            });
        },
        progressMove: function (callback) {
            var $this = this;
            var left = this.$progressBar.offset().left;
            var width = this.$progressBar.width();
            var x;
            this.$progressDot.mousedown(function (e) {
                $(document).mousemove(function (e) {
                    // 正在拖拽
                    $this.isMove = true;
                    x = e.pageX;
                    $this.$progressLine.css("width", x - left);
                    if (parseInt(e.pageX) >= parseInt((left + width + 5))) {
                        $this.$progressLine.css("width", width);
                    }
                    if (parseInt(e.pageX) <= parseInt((left - 5))) {
                        $this.$progressLine.css("width", 0);
                    }
                })
            });
            $(document).mouseup(function (e) {
                // 拖拽完毕
                $this.isMove = false;
                $(document).off("mousemove");
                // 计算比例改变音乐进度
                var value = (x - left) / $this.$progressBar.width();
                // console.log("e.pageX:" + x);
                // console.log("left:" + left);
                // console.log("$this.$progressBar.width():" + $this.$progressBar.width());
                // console.log("value:" + value);
                callback(value);
            })
        },
        setProgress: function (value) {
            if (this.isMove) {
                return;
            }
            if (value < 0 || value > 100) {
                return;
            }
            this.$progressLine.css("width", value + "%");
        }
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);