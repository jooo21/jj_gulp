$(document).ready(function(){
    var $circle = $("#circle");
    var $tab = $("#circleTab");
    var $btns = $tab.find("dt a");
    var $boxs = $tab.find("dd");

    $boxs.eq(0).fadeIn(1000);
    $btns.on("click focusin",function(e){
        e.preventDefault();
        var i = $(this).parent().index();
        var isOn = $(this).hasClass("on");
        if(isOn) return;

        var target = $(this).attr("href");
        activation(target, $(this));
        rotate(i);
    });

    function activation(target, el){
        $btns.removeClass("on");
        $boxs.fadeOut();

        el.addClass("on");
        $(target).fadeIn(1000);
    }
    function rotate(index){
        $circle.removeClass();
        $circle.addClass("rot"+index);

    }
})