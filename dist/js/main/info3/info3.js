$(document).ready(function(){

    var $slider = $("#slider");
    var $panel_li = $slider.find(".panel li");
    var $navi_li = $slider.find(".navi li");
    var $prev = $(".prev");
    var $next = $(".next");
    var $start = $slider.find(".start");
    var $stop = $slider.find(".stop");
    var len = $panel_li.length;
    var speed = 500;
    var isDone =  true;
    var i = 0;

    startRolling();

    //다음 버튼 클릭시
    $next.on("click", function(e){
        e.preventDefault();    
        
        if(isDone){
            isDone= false;
            i = $panel_li.filter(".on").index();  
            (i== len-1) ?  i=0 : i++ ;  
            nextSlide(i);
        }   
    });
    //이전 버튼 클릭 시
    $prev.on("click", function(e){
        e.preventDefault();

        if(isDone){
            isDone = false;
            i = $panel_li.filter(".on").index();
            (i==0) ? i= len-1 : i--;
            prevSlide(i); 
        }            
    });
    //네비 버튼 클릭 시
    $navi_li.on("click", function(e){
        e.preventDefault();
        stopRolling();

        if(isDone){
            isDone = false;
            var curNum = $panel_li.filter(".on").index();
            i = $(this).index();        
            (curNum > i ) ? prevSlide(i) : nextSlide(i); 
        }     
    });

    //재생 버튼 클릭시
    $start.on("click", function(e){
        e.preventDefault();
        startRolling();        
    });

    //정지 버튼 클릭시
    $stop.on("click", function(e){
        e.preventDefault();
        stopRolling();
    })


    function nextSlide(index){   
        $panel_li.not(".on").css({ left: "100%"});      
        $panel_li.filter(".on").stop().animate({ left: "-100%"},speed, function(){
            $(this).css({ left: "100%"}).removeClass("on");
        });   
        $panel_li.eq(index).stop().animate({ left: "0%"},speed, function(){
            $(this).addClass("on");
            isDone = true;
        });
        activation(index);
    }

    function prevSlide(index){
        $panel_li.not(".on").css({ left: "-100%"});
        $panel_li.filter(".on").stop().animate({ left: "100%" },speed, function(){
            $(this).css({ left: "-100%"}).removeClass("on");
        });
        $panel_li.eq(index).stop().animate({ left: "0%"},speed, function(){
            $(this).addClass("on");
            isDone = true;
        });
        activation(index);
    }

    function activation(index){
        $navi_li.find("a").removeClass("on");
        $navi_li.eq(index).children("a").addClass("on");
    }

    function startRolling(){
        $start.hide();
        $stop.show();

        timer = setInterval(function(){
            (i == len-1 ) ? i=0 : i++;    
              
            if(isDone){
                isDone = false;
                nextSlide(i);   
            }
                             
        }, 3000);
    }

    function stopRolling(){
        $stop.hide();
        $start.show();
        clearInterval(timer);
    }

 
});