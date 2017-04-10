(function(win, $) {
    /**抽奖分析
     *
     */
    var defaultopt = {
        rotateNum: 5, //圆盘转动圈数
        direction: 0, //0为顺时针，1为逆时针
        starttime: '2017/4/9 00:00:00', //活动开始时间
        endtime: '2017/5/6 00:00:00', //活动结束时间
        rotateBody: '#J-box',
        clickHandle: function() {}
    }

    function Lottery(opts) {
        this.opts = $.extend(true, defaultopt, {}, opts);
        this.doing = false; //是否已抽奖，ture为已抽，FALSE为未抽
        this.init();

    }

    Lottery.prototype.init = function(argument) {
        var self = this
        var currentdate = new Date();
        var startdata = new Date(this.opts.starttime);
        var endtime = new Date(this.opts.endtime);
        var lefestartime = startdata.getTime() - currentdate.getTime(); //距离开始时间
        var leftendtime = endtime.getTime() - currentdate.getTime(); //距离结束时间

        if (lefestartime <= 0) {
            //点击抽奖
            if (this.doing) {
                alert('您已抽过奖了')
            } else {
                $('.J-body').delegate('#J-lotteryBtn', 'click', function(event) {
                     $('.J-body').unbind('click');

                    console.log('点击被触发了');

                    // 点击事件处理函数
                    self.opts.clickHandle.call(self);
                    //点击后移除点击事件，防止动画卡动
                   
                });

                //监听动画是否完成
                $(self.opts.rotateBody).get(0).addEventListener('webkitTransitionEnd', function() {
                    var deg = $(self.opts.rotateBody).attr('date-deg');
                    // 根据旋转方向设置旋转角度
                    if (self.opts.direction == 0) {
                        //顺时针为负
                        $(self.opts.rotateBody).attr('date-deg', 360 - deg);
                        $(self.opts.rotateBody).css({
                            '-webkit-transform': 'rotate(' + deg + 'deg)',
                            'transform': 'rotate(' + deg + 'deg)',
                            'transition': 'none'
                        });
                    } else {
                        $(self.opts.rotateBody).attr('date-deg', deg);
                        $(self.opts.rotateBody).css({
                            '-webkit-transform': 'rotate(' + deg + 'deg)',
                            'transform': 'rotate(' + deg + 'deg)',
                            'transition': 'none'
                        });
                    }

                    //动画完成后继续绑定点击事件
                    $('.J-body').delegate('#J-lotteryBtn', 'click', function(event) {
                        // 点击事件处理函数
                        self.opts.clickHandle.call(self);
                        //点击后移除点击事件，防止动画卡动
                        $('.J-body').unbind('click');
                    });

                    var setdeg = $(self.opts.rotateBody).attr('date-deg');
                    alert('恭喜您，你抽中的奖品是：'+ whichAward(setdeg) );
                    //根据角度判断奖品
                    function whichAward(deg) {
                        if (deg <= 30 || deg > 330) {
                            return ' 三网通流量 10M'
                        } else if (deg > 30 && deg <= 90) {
                            return ' iphone7 手机'
                        } else if (deg > 90 && deg <= 150) {
                            return ' 三网通流量 30M'
                        } else if (deg > 150 && deg <= 210) {
                            return ' 三网通话费 5元'
                        } else if (deg > 210 && deg <= 270) {
                            return ' iPad mini 4 '
                        } else if (deg > 270 && deg <= 330) {
                            return ' 三网通话费 20元 '
                        }
                    }

                });

            }


        } else {
            alert('活动未开始，请您继续关注')
        }
        if (leftendtime <= 0) {
            alert('很抱歉活动已结束，感谢您的关注')
        }
    };

    Lottery.prototype.goLottery = function(_deg) {

        if (!$(this.opts.rotateBody).is(':animated')) {

            var deg = _deg + this.opts.rotateNum * 360;

            var realDeg = this.opts.direction == 0 ? deg : -deg;
            $(this.opts.rotateBody).css({
                '-webkit-transform': 'rotate(' + realDeg + 'deg)',
                'transform': 'rotate(' + realDeg + 'deg)',
                'transition': 'all 5s'
            });
            $(this.opts.rotateBody).attr('date-deg', _deg);

        }



    }

    win.Lottery = Lottery;


})(window, $);

