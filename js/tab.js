/**
 * Created by Administrator on 2016/11/1.
 */

(function ($,win,doc) {
    function tabSlider(options){
        this.init(options);

    }

    $.extend(tabSlider.prototype,{
       init: function(options){
           console.log("OK");
           var me = this;
           me.option = {
               tabzone: "",
               tabcont: "",
               tablist: "",//tab区
               sliderbar: "",//滑块儿区容器
               sliderblock: "",//滑块
               tabactive: "",//当然激活的tab
               positionfalg: "",//滚动区内容定位标志
               scrollstep: 10,
               conttext: ""
           };
           $.extend(true,me.option,options||{});
           me.tabzone = me.option.tabzone;
           me.tabcont = me.option.tabcont;
           me.tablist = me.option.tablist;
           me.sliderbar = me.option.sliderbar;
           me.sliderblock = me.option.sliderblock;
           me.tabactive = me.option.tabactive.substring(1);
           me.positionfalg = me.option.positionfalg;
           me.scrollstep = me.option.scrollstep;
           me.conttext = me.option.conttext;

           me.contCount = $(me.conttext).length;
           me.contArr = [];
           me.sliderH = $(me.sliderbar).height() - $(me.sliderblock).height();//me.sliderbar).height()获取高度错误---需等到加载完成
           me.contH = me.getContH() - $(me.tabzone).height();//获取高度失败---需等到加载完成
           me.cellH = Math.round( parseInt(me.contH)/parseInt(me.sliderH));

           me.tabClick();
           me._mouseFun();
           me._mouseWheel();

           return me;
       },

        getContH: function () {
            var me = this;
            var obj = $(me.conttext),
                len = obj.length,
                total = 0;
            for(var i=0;i<len;i++){
                me.contArr.push(total);
                total += obj.eq(i).outerHeight(true);
            }
            console.log(me.contArr);
            return total;
        },

        tabClick: function(){
          var me = this;
            $(me.tablist+" li").on("click", function () {
                if($(this).hasClass(me.tabactive)){
                    return;
                }
                var index = $(this).index();
                $(this).addClass(me.tabactive).siblings().removeClass(me.tabactive);
                me._moveTo(index);
            });
        },

        _moveTo: function(index){
            var me = this;
            var sliderH = parseInt(me.contArr[index]/me.cellH);
            if(index == me.contCount){
                sliderH = me.sliderH;
            }

            $(me.sliderblock).css({"top":sliderH+"px","transition":"top .5s"});
            $(me.tabcont).animate({scrollTop:me.contArr[index]},500);
        },

        _mouseFun: function(){
            var me = this;
            $(me.sliderblock).on("mousedown", function (e) {
                var meObj = $(this);
                e.preventDefault();

                var curY = e.pageY;
                var curContY = $(me.tabcont).scrollTop();
                var curSliderY = parseInt($(me.sliderblock).css("top"));

                $(doc).on("mousemove.namespace", function (e) {
                    var sliderMoveY = Math.max(0,Math.min(e.pageY-curY+curSliderY,me.sliderH));
                    var contMoveY = Math.max(0,Math.min((e.pageY-curY)*me.cellH+curContY,me.contH));

                    $(me.sliderblock).css("top",sliderMoveY+"px");
                    $(me.tabcont).scrollTop(contMoveY);
                }).on("mouseup.namespace", function (e) {
                    $(doc).off(".namespace");
                });
            });
        },

        _mouseWheel: function () {
            var me = this;
            var flag = true;
            $(".mask-container").on("mousewheel DOMMouseScroll", function (e) {
                e = e || window.event;
                e.preventDefault();

                var curSliderY = parseInt($(me.sliderblock).css("top"));

                var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                    (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
                if(delta > 0){
                   // 向上滚
                    if(flag) {
                        setTimeout(function () {
                            var curContY = $(me.tabcont).scrollTop();
                            var sliderMoveY = Math.max(0, Math.min(me.scrollstep * (-1) + curSliderY, me.sliderH));
                            var contMoveY = me.scrollstep * me.cellH * (-1) + curContY;

                            $(me.sliderblock).css({"top":sliderMoveY+"px","transition":"top 0.2s"});

                            if(sliderMoveY == 0){
                                contMoveY = 0;
                            }
                            //$(me.tabcont).scrollTop(contMoveY);
                            $(me.tabcont).animate({scrollTop:contMoveY},200);
                            flag = true;
                        }, 500);
                        flag = false;
                    }
                } else if (delta < 0) {
                    // 向下滚
                    if(flag) {
                        setTimeout(function () {
                            var curContY = $(me.tabcont).scrollTop();
                            var sliderMoveY = Math.max(0,Math.min(me.scrollstep+curSliderY,me.sliderH));
                            var contMoveY = me.scrollstep * me.cellH + curContY;

                            $(me.sliderblock).css({"top":sliderMoveY+"px","transition":"top 0.2s"});
                            if(sliderMoveY == me.sliderH){
                                contMoveY = me.contH;
                            }
                            $(me.tabcont).animate({scrollTop:contMoveY},200);
                            flag = true;
                        }, 500);
                        flag = false;
                    }
                }
            });

        }

    });


    win.tabSlider = tabSlider;
})(jQuery,window,document);
