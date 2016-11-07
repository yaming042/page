/**
 * Created by Administrator on 2016/10/31.
 */
$(function(){
    Slider.init();

});
window.Slider = function(){
    var posArr = new Array();

    function addButton(element){
        var parentEle = $("."+element);
        var cellCount = getCellcount("div");

        var posLeft = parseInt($(".box").find(".div").eq(0).css("left")) - 50;
        var posRight = parseInt($(".box").find(".div").eq(cellCount-1).css("left"))+parseInt($(".box").find(".div").eq(cellCount-1).width()) + 22;
        var posTop = parseInt($(".box").find(".div").eq(0).css("top")) + parseInt($(".box").find(".div").eq(0).height())/2 - 15;

        var btnHtml = $("<span class='prev' style='left:"+posLeft+"px;top:"+posTop+"px;padding:10px;'>&lt;</span><span class='next' style='left:"+posRight+"px;top:"+posTop+"px;padding:10px;'>&gt;</span>");

        btnHtml.appendTo(parentEle);
    }

    function getCellcount(ele){
        return $("."+ele).length;
    }

    function getMiddle(cellCount){
        return (cellCount%2 == 0)? Math.round(cellCount/2)+1:Math.round(cellCount/2);
    }

    function getIndex(ele){
        return $("."+ele).find(".current").index();
    }


    function setIndex(index,direction){
        var direc = direction == "next"? true:false;
        var cellCount = getCellcount("div"),
            nextIndex;

        nextIndex = index - 1;

        if(index <= 0){
            nextIndex = cellCount - 1;
        }

        //console.log("nextIndex:"+nextIndex);
        $(".box").find(".div").eq(index).removeClass("current");
        $(".box").find(".div").eq(nextIndex).addClass("current");
    }


    function prev(){
        var currentIndex = getIndex("box");
        var cellCount = getCellcount("div");
        var cell = cellCount - 1;

        for(var n=cellCount-currentIndex-1;n>=0;cell--,n--) {
            $(".box").find(".div").eq(cell).css({
                "z-index": posArr[n][0],
                "top": posArr[n][1] + "px",
                "left": posArr[n][2] + "px",
                "width": posArr[n][3] + "px",
                "transition": "left 1s"
            });
        }
        for(var m=cellCount-1;cell>=0;m--,cell--) {
            $(".box").find(".div").eq(cell).css({
                "z-index": posArr[m][0],
                "top": posArr[m][1] + "px",
                "left": posArr[m][2] + "px",
                "width": posArr[m][3] + "px",
                "transition": "left 1s"
            });
        }

        setIndex(currentIndex,"prev");
    }
    function next(){
        var currentIndex = getIndex("box");
        var cellCount = getCellcount("div");
        var cell = cellCount - 1;

        for(var n=currentIndex-1;n>=0;cell--,n--){
            $(".box").find(".div").eq(cell).css({"z-index":posArr[n][0],"top":posArr[n][1] +"px","left":posArr[n][2]+"px","width":posArr[n][3]+"px","transition":"left 1s"});
        }
        for(var m=cellCount-1;cell>=0;m--,cell--){
            $(".box").find(".div").eq(cell).css({"z-index":posArr[m][0],"top":posArr[m][1] +"px","left":posArr[m][2]+"px","width":posArr[m][3]+"px","transition":"left 1s"});
        }

        setIndex(currentIndex,"next");
    }


    function animatiSlider(){
        $(".box").on("click",".prev",function(){
            prev();
        });
        $(".box").on("click",".next",function(){
            next();
        });
    }

    return {
        init: function(){
            var cellTop = 10,cellLeft = 30,cellWidth = 10;
            var boxW = parseInt($("div.box").width());
            var cellW = parseInt($(".box").find(".div").eq(0).width());
            var cellCount = getCellcount("div");

            var centerLeft = parseInt(((boxW - cellW)/2).toFixed(2));
            console.log("boxW:"+boxW);
            console.log("cellW:"+cellW);
            var centerTop = 0;
            var centerWidth = cellW;

            for(var i=0;i<cellCount;i++){
                posArr[i] = [];
            }
            var middle = getMiddle(cellCount);

            for(var i=middle-1,j=0;i>=0;i--,j++){
                $(".box").find(".div").eq(i).css({"z-index":i+1,"top":centerTop+(j*cellTop)/2 +"px","left":centerLeft-j*cellLeft+"px","width":centerWidth-j*cellWidth+"px"});
                posArr[i].push(i+1);
                posArr[i].push((j*cellTop)/2);
                posArr[i].push(centerLeft-j*cellLeft);
                posArr[i].push(centerWidth-j*cellWidth);
            }
            for(var i=middle,j=1;i<cellCount;i++,j++){
                $(".box").find(".div").eq(i).css({"z-index":middle-j,"top":centerTop+(j*cellTop)/2 +"px","left":centerLeft+j*cellLeft+j*cellWidth+"px","width":centerWidth-j*cellWidth+"px"});
                posArr[i].push(middle-j);
                posArr[i].push(centerTop+(j*cellTop)/2);
                posArr[i].push(centerLeft+j*cellLeft+j*cellWidth);
                posArr[i].push(centerWidth-j*cellWidth);
            }

            $(".box").find(".div").eq(cellCount-1).addClass("current");

            console.log(posArr);
            addButton("box");
            animatiSlider();
        }
    };
}();
