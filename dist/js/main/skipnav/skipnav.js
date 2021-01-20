
$(document).ready(function(){
    
    var $skip_a= $("#skipNavi a");
  
  
   $skip_a.on("focusin",function(){
       $(this).css({top:0});
   });
   $skip_a.on("focusout",function(){
       $(this).css({top:-50});
   });

});
