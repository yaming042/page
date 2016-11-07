/**
 * Created by Administrator on 2016/10/31.
 */
$(function(){
    pageFun.maskBtn();
    pageFun.skillBtn();
});

window.pageFun = function(){

    return {
        maskBtn: function(){
            $(".detail-more").on("click",function () {
                $(".mask-container").slideDown();
                var tab = new tabSlider({
                    tabzone: ".tab-zone",
                    tabcont: ".tab-cont",
                    tablist: ".tab-list",
                    sliderbar: ".tab-slider",
                    sliderblock: ".slider-block",
                    tabactive: ".tab-active",
                    positionfalg: ".flag",
                    scrollstep: 20,
                    conttext: ".cont"
                });
            });
            $(".close").on("click", function () {
                $(".mask-container").slideUp();
            })
        },

        skillBtn: function(){
            $(".skill-describe").on("click",function(){
                if($(this).parent().hasClass("detail-active")){
                    $(this).parent().removeClass("detail-active");
                    return;
                }
                $(this).parent().addClass("detail-active").siblings().removeClass("detail-active");
            })
        },

    };
}();
