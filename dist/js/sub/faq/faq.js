$(document).ready(function(){
    var $dt = $(".faq dl dt");
    var $dd = $(".faq dl dd");
    var $dt_a = $dt.find("a");

    var $pagin = $("#pagin");
    var $pagin_ul =$pagin.find(".wrap ul");
    var $pagin_li = $pagin_ul.find("li");
    var $prev = $pagin.find(".prev");
    var $next = $pagin.find(".next");

    var wid = $pagin_ul.find("li").outerWidth();
    var isDone = true;

    // $pagin_li.last().prependTo($pagin_ul);
    // $pagin_li.find("li").last().prependTo($pagin_li);  
    // if($pagin_li.find("li").eq(0).hasClass("first")) $prev.css({display:"none"});
   //좌우슬라이더 버튼 비활성화다시
   
    //토글메뉴 이벤트
    $dt_a.on("click",function(e){   
        e.preventDefault();

        toggle($(this));
        
        
    });
    //pagination prev이벤트
    $prev.on("click", function(e){
        e.preventDefault();
        var curNum = $("#wrap>ul>li").eq(2).attr("data-index");

        if(isDone){
            prev(curNum);
            isDone = false;
             
     }
    });
    //pagination next이벤트
    $next.on("click", function(e){
        e.preventDefault();
        var curNum = $("#wrap>ul>li").eq(2).attr("data-index");

        if(isDone){
         next(curNum);
         isDone = false;
                
        }
        });


    //톻굴메뉴 함수정의
    function toggle(el){
        var isOn = el.hasClass("on");

        $dt_a.removeClass("on");
        $dd.slideUp();

        if(isOn){
            el.removeClass("on");
            el.parent().next("dd").slideUp();
            return;
        }

        el.addClass("on");
        el.parent().next("dd").slideDown();
    }


    
    //pagination prev함수정의

    function prev(num){
        
            $pagin_ul.animate({marginLeft:wid},1000,function(){
                $pagin_ul.children("li").last().prependTo($pagin_ul);
                $pagin_ul.css({marginLeft:0});
                if(num == "2") {
                    $(".prev").hide();
                }else {
                    $(".prev").show();
                }
        
                if(curNum == "10") {
                    $(".next").hide();
                }else {
                    $(".next").show();
                }
                isDone = true;
            })
        
    }
    //pagination next함수정의

    function next(num){
        
        $pagin_ul.animate({marginLeft:-wid},1000,function(){
            $pagin_ul.children("li").first().appendTo($pagin_ul);
            $pagin_ul.css({marginLeft:0});
            if(num == "10") {
                $(".next").hide();
            }else {
                $(".next").show();
            }
    
            if(curNum == "2") {
                $(".prev").hide();
            }else {
                $(".prev").show();
            }
            isDone = true;
         })
     }
});