$(document).ready(function(){

    //브라우저 로딩시 youtube데이터 호출 및 DOM생성
    callData({
        target : ".swiper-wrapper",
        count : 5,
        key : "AIzaSyBwZO8IOadpZ-xSxAGeED_qdvcR150TQCA ",
        playList : "PLaZXpj41N2i0MV87FZVYsnxRttVCdOOlI"
    });
    callData2({
        target : ".youtube2",
        count : 4,
        key : "AIzaSyBwZO8IOadpZ-xSxAGeED_qdvcR150TQCA ",
        playList :"PLaZXpj41N2i3pMtiMrPFqcDYIia5AhcaT"
    });
   
    //리스트 썸네일 클릭시 팝업호출및 유튜브 영상호출
    // $("body").on("click", ".swiper-slide .pic",function(e){
    //     e.preventDefault();

    //     var vidId = $(this).attr("href"); 

    //     createPop({
    //         width : "100%",
    //         height : "100vh",
    //         bg : "rgba(0,0,0,0.9)",
    //         vidId : vidId
    //     });

    //     $("body").css({overflow:"hidden"});
    // });

    $("body").on("click", ".swiper-slide .pic_href",function(e){
        e.preventDefault();

        var vidId = $(this).attr("href"); 

        createPop({
            width : "100%",
            height : "100vh",
            bg : "rgba(0,0,0,0.9)",
            vidId : vidId
        });

        $("body").css({overflow:"hidden"});
    });
    $("body").on("click", ".youtube2 .pic_href",function(e){
        e.preventDefault();

        var vidId = $(this).attr("href"); 

        createPop({
            width : "100%",
            height : "100vh",
            bg : "rgba(0,0,0,0.9)",
            vidId : vidId
        });

        $("body").css({overflow:"hidden"});
    });
    //팝업 닫기버튼 클릭시 레이어 팝업 제거
    $("body").on("click",".youtube_pop .close",function(e){
        e.preventDefault();

        $(this).parent().remove();
        $("body").css({overflow:"auto"});
    })

    function callData(opt){
        $.ajax({
            url : 'https://www.googleapis.com/youtube/v3/playlistItems',
            dataType : "jsonp",
            data : {
                part: 'snippet',
                key: opt.key,
                maxResults: opt.count,
                playlistId: opt.playList
            }
        })
        .success(function(data){
            console.log(data.items);
            var item = data.items;
    
            $(item).each(function(index, data){
                var p_txt = data.snippet.description;
                var len = p_txt.length;
                var date = data.snippet.publishedAt.split("T")[0];
    
                (len >100)? p_txt = p_txt.substr(0,100) +"..." : p_txt;
    
                $(opt.target)
                    .append(
                        $("<div class='swiper-slide'>")
                            .append(
                                $("<idv class='inner'>")
                                .append(
                                    $("<a class='pic'>")
                                    .attr({href:data.snippet.resourceId.videoId})
                                    .css({backgroundImage: "url("+data.snippet.thumbnails.high.url+")"}),                    
                                    $("<div class='con'>")
                                        .append(
                                            $("<h2>").text(data.snippet.title),
                                            $("<p>").text(p_txt)
                                            .append(
                                                $("<a class='pic_href'>")
                                            .attr({href:data.snippet.resourceId.videoId})
                                            .text("VIEW MORE")
                                            ),
                                            $("<span>").text(date) ,
                                            $("<span>").text("0"+(index+1))
                                            
                                        )
                                )
                                         
                            )
                    )
            });//dom완료 후에 플러그인 넣기 ,돔에 플러그인을 적용시키는 거니까
            var swiper = new Swiper("#wrap",{
                direction : "horizontal",
                loop : true,
                spaceBetween : 0,
                grabCursor:true,
                slidesPerView : "auto",
                centeredSlides : true,
                speed:1000,
                mousewheel:false,
                navigation : {
                    nextEl : ".swiper-button-next",
                    prevEl : ".swiper-button-prev"
                },
                autoplay: {
                     delay: 3000
                    //  disableOnInteraction: false
                },
                effect:"coverflow",
                coverflowEffect: {
                    rotate: 0,
                    stretch: -150,
                    depth: 0,
                    modifier: 1,
                    // 위의 효과들을 2배하고 싶을때 modifier:2를 주는 것.
                    slideShadows: false
                }
                
                });
                $(".auto li").eq(0).on("click",function(){
                    swiper.autoplay.start();
                    $(".auto li").removeClass('on');
                    $(this).addClass("on");
                })
                $(".auto li").eq(1).on("click",function(){
                    swiper.autoplay.stop();
                    $(".auto li").removeClass('on');
                    $(this).addClass("on");
                })
                swiper.on("touchStart",function(){
                    swiper.autoplay.stop();
                    $(".auto li").removeClass('on');
                    $(".auto li").eq(1).addClass("on");
                })
                // $(".swiper-slide-active .inner").on("mouseenter",function(){
                //     swiper.autoplay.stop();
                // })
                // $(".swiper-slide-active").on("mouseleave",function(){
                //     swiper.autoplay.start();
                // })
            
        })
        .error(function(err){
            console.error(err);
        })
    }
    function callData2(opt){
         $.ajax({
            url : 'https://www.googleapis.com/youtube/v3/playlistItems',
            dataType : "jsonp",
            data : {
                part: 'snippet',
                key: opt.key,
                maxResults: opt.count,
                playlistId: opt.playList
            }
        })
        .success(function(data){
            console.log(data.items);
            var item = data.items;

            $(item).each(function(index, data){
                var p_txt = data.snippet.description;
                var len = p_txt.length;
                var date = data.snippet.publishedAt.split("T")[0];
                (len > 50)? p_txt = p_txt.substr(0,50)+"..." : p_txt;

                $(opt.target)
                    .append(
                        $("<li>").append(
                            $("<div class='pic'>")
                                .css({backgroundImage:"url("+data.snippet.thumbnails.high.url+")"})
                                .append(
                                    $("<a class='pic_href'>")
                                        .attr({href:data.snippet.resourceId.videoId})
                                        .text("click"),
                                    $("<div class='con'>")
                                        .append(
                                            $("<h2>").text(data.snippet.title),
                                        )
                                    )
                                )                    
                            
                    )
            })
        })
        .error(function(err){
            console.error(err);
        })
    }

    function createPop(opt){
        $("body")
            .append(
                $("<aside class='youtube_pop'>")
                    .css({
                        width : opt.width, height: opt.height,
                        backgroundColor:opt.bg, position:"fixed", top:"50%", left:"50%",
                        transform:"translate(-50%, -50%)", boxSizing:"border-box", padding:100
                    })
                    .append (
                        $("<a href='#' class='close'>")
                            .text("close")
                            .css({
                                position: "absolute", top:20, right:20, color:"#fff"
                            }),
                        $("<img src='img/loading2.gif'>")
                            .css({
                                width:100, position:"absolute", top:"50%", left:"50%",
                                transform:"translate(-50%,-50%)"
                            }),
                        $("<div class='con'>")
                            .css({
                                width:"100%", height:"100%",  position:"relative",display:"none"
                            })
                            .append(
                                $("<iframe>")
                                    .attr({
                                        src:"https://www.youtube.com/embed/"+opt.vidId,
                                        width : "100%", height:"100%", frameborder:0,
                                        allowfullscreen:true
                                    })
                            )
                    )
            )//append ends
        
        setTimeout(function(){
            $(".youtube_pop .con").fadeIn(500,function(){
                $(this).prev().remove();
            });
        },1000);
    }
 
});