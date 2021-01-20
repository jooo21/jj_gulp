$(document).ready(function(){
    var $small = $(".small a");
    //imgBox
    $small.on("mouseenter",function(){
        var linkHref = $(this).attr("href");
        $(".large>img").attr({src:linkHref});
        $(".small a").children("img").removeClass("on");
        $(this).children("img").addClass("on");
    })
    $small.on("click",function(e){
        e.preventDefault();
    })
});
