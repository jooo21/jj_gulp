$(document).ready(function(){

    var url = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    var url_search='https://www.flickr.com/services/rest/?method=flickr.photos.search';
    var key = '07fe790987bdfb01f0387be7a19d4167';
    
    //브라우저 로딩시 Flickr 데이터 호출
    getFlickr(url, key, 27);

    //리스트의 썸네일 클릭시
    $("body").on("click", "#gallery ul li a",function(e){
        e.preventDefault();
        var imgSrc = $(this).attr("href");
        var poptext = $(this).find("p").text();
        console.log(poptext);
        createPop(imgSrc,poptext);
    });

    //레이어팝업 닫기버튼 클릭시
    $("body").on("click",".pop span",function(){
        $(this).parent().fadeOut(500,function(){
            $(this).remove();
        })
    });  

    //검색버튼 클릭시
    $("#search button").on("click",function(){
        var tags = $(this).prev().val();
        getFlickr(url_search, key, 50, tags);
    });

    //list hover시
    $("body").on("mouseenter","#gallery ul li",function(){
        var el = $(this).find(".boxAni");
        lineOpen(el);
    });  
    $("body").on("mouseleave","#gallery ul li",function(){
        var $li = $("#gallery ul li").find(".boxAni");;
        lineClose($li)
    });
    //list hover함수
    function lineOpen(el){
        el.fadeIn(100,function(){
            el.find(".top").animate({width:"100%"},250,"easeOutExpo")
            el.find(".bottom").animate({width:"100%"},250,"easeOutExpo")
        })
        
    }
    function lineClose(el){
        el.fadeOut(500,function(){
            $(this).find(".top").css({width:"0%"});
            $(this).find(".bottom").css({width:"0%"});
        });
    }
    //데이터 호출 함수 정의
    function getFlickr(url, key, num, tags){
        $.ajax({
            url : url,
            dataType : "json",
            data : {
                api_key : key,
                per_page : num,
                format : "json",
                nojsoncallback : 1,
                tags : tags,
                tagmode : "any",
                privacy_filter : 5
            }
        })
        .success(function(data){
            console.log(data.photos.photo);
            var item = data.photos.photo;
            $("#gallery ul").empty();

            $(item).each(function(index, data){   
                $("#gallery ul")
                    .append(
                        $("<li>")
                            .append(
                                $("<div class='boxAni'>").append(
                                $("<div class='top'>"),
                                $("<div class='right'>"),
                                $("<div class='bottom'>"),
                                $("<div class='left'>")
                                ),
                                $("<div class='textbox1'>")
                                .append(
                                    $("<p>").text(this.title),
                                    $("<span>"),
                                    $("<em>").text(this.owner),
                                    $("<em>").text("Kor")
                                ),
                                $("<a>")
                                    .attr({
                                        href : "https://farm"+this.farm+".staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_b.jpg"
                                    })
                                    .append(
                                        $("<img>")
                                            .attr({
                                                src : "https://farm"+this.farm+".staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_m.jpg",
                                                onerror : "javascript:this.parentNode.parentNode.style='display:none;'"
                                                //onerror : "javascript:this.src = 'img/defualt.png'"
                                            }),
                                        $("<div>").append(
                                            $("<div>").append(
                                                $("<img>")
                                                .attr({src : "http://farm"+this.farm+".staticflickr.com/"+this.server+"/buddyicons/"+this.owner+".jpg", onerror : "javascript:this.src = '../img/b2.jpg'"})
                                                .css({borderRadius : "50%"})
                                                )
                                            ),
                                        $("<p>").text(this.title).css({display:"none"})
                                    ),
                                $("<div class='textbox2'>")
                                .append(
                                    $("<span>").text("©2020.all rights reserved")
                                )
                                
                                    
                            )                   
                    )
            })
        })
        .error(function(err){
            console.error(err);
        })
    }   

    //팝업 생성 함수 정의
    function createPop(imgSrc,text){
        $("body").append(
            $("<aside class='pop'>")
                .append(
                    $("<img>").attr("src",imgSrc),
                    $("<p>").text(text),
                    $("<span>").text("close")
                )
        );
        $(".pop").fadeIn();
    }
});