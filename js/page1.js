/**
 * Created by Administrator on 2016/10/10.
 */
(function($){
    var privateFun = function(){
        //私有函数

    };

    var Page = (function(){
        function Page(ele,options){
            this.setting = $.extend(true, $.fn.Page.default, options||{});
            this.element = ele;
            this.init();
        }

        Page.prototype = {
            /*初始化插件*/
            init: function(){
                var me = this;
                me.selectors = me.setting.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.element.find(me.selectors.section);

                me.direction = me.setting.direction == "vertical" ? true:false;
                me.pageCount = me.setting.section.length;
                me.index = (me.setting.index < me.pageCount && me.setting.index >= 0) ? me.setting.index : 0;/**为什么不是me.setting.index:0*/

                me.page = me.selectors.page;
                me.active = me.setting.active;

                if(!me.direction){
                    me._initLayout();
                }

                if(!me.page){
                    me._initPage();
                }

                me._initEvent();
            },

            /*处理横屏时的布局*/
            _initLayout: function () {
                var me = this,
                    width = me.pageCount*100 + "%",
                    cellwidth = (100/me.pageCount).toFixed(2) + "%";
                me.sections.width(width);
                me.section.width(cellwidth).css("float","left");
            },

            _initPage: function () {
                var me = this,
                    pageClass = me.page.substring(1),
                    pageActive = me.active.substring(1);
                var pageHtml = "<ul clss='"+pageClass+"'>";
                for(var i=0;i<me.pageCount;i++){
                    pageHtml += "<li></li>";
                }
                pageHtml.appendTo(me.sections);/*没用me.element*/

                var pages = me.sections.find(me.pageClass);/*没用me.element.find(me.selectors.page)*/
                pages.find("li").eq(me.index).addClass(me.pageActive);

                if(!me.direction){
                    pages.addClass("horizontal");
                }else{
                    pages.addClass("vertical");
                }
            },

            _initEvent: function(){

            }
        }

        return Page;
    })();

    $.fn.Page = function(){
        return this.each(function(options){
            var me = $(this),
                instance = me.data("Page");
            if(!instance){
                instance = new Page(me, options);
                me.data("Page",instance);
            }
        });
    };

    $.fn.Page.default = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".page",
            active: ".active",
        },
        index: 0,
        direction: 0
    };
})(jQuery);
