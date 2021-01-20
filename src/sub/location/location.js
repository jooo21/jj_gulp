window.onload = function(){
    //표시할 지역의 경도, 위도, 줌레벨 설정하여 인스턴스 생성
var mapContainer = document.querySelector('.showBox'); 
var branch_btns = document.querySelectorAll(".branch li");

var mapOption = { 
    center: new kakao.maps.LatLng(37.56720412888648,127.00998345887412), 
    level: 4  
};

//좌표값과 마커이미지 갯수만큼 반복을 돌며 마커생성하고 버튼 이벤트 연결
var markerOptions = [
    {
        title: '본점',
        latlng: new daum.maps.LatLng(37.56720412888648,127.00998345887412),
        imgSrc : 'img/map.png',
        imgSize : new daum.maps.Size(64,64),
        imgPos : {offset: new kakao.maps.Point(44, 32)},
        button : branch_btns[0]
    },
    {
        title: '지점',
        latlng: new daum.maps.LatLng(37.566373563053446,126.97788269620722),
        imgSrc : 'img/map.png',
        imgSize : new daum.maps.Size(64,64),
        imgPos : {offset: new kakao.maps.Point(44, 32)},
        button : branch_btns[1]
    },
    {
        title: '지점2',
        latlng: new daum.maps.LatLng(37.54440330709019,127.03765853629974),
        imgSrc : 'img/map.png',
        imgSize : new daum.maps.Size(64,64),
        imgPos : {offset: new kakao.maps.Point(44, 32)},
        button : branch_btns[2]
    },
];

//초기 화면 맵 생성
var map = new kakao.maps.Map(mapContainer, mapOption); 


//스카이뷰 컨트롤 표시
var mapTypeControl = new daum.maps.MapTypeControl();
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);


//줌 컨트롤 표시
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMRIGHT);


//버튼클릭시 교통정보 표시    
var t_on = document.querySelectorAll('.traffic li')[0];
var t_off = document.querySelectorAll('.traffic li')[1];

t_on.onclick = function(){
    map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC); 
    map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
    t_off.classList.remove("on");
    t_on.classList.add("on");
    return false;
}
t_off.onclick = function(){
    map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC); 
    t_on.classList.remove("on");
    t_off.classList.add("on")
    return false;
} 

var drag = true; //드래그 가능
var zoom = true; //휠로 zoom가능





//마커옵션의 갯수만큼 반복을 돌며 지점 보기 버튼 이벤트 연결
for(var i=0; i<markerOptions.length; i++){
    new daum.maps.Marker({
        map : map,
        position : markerOptions[i].latlng,
        title : markerOptions[i].title,
        image : new daum.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });    

    (function(index){
        markerOptions[index].button.onclick = function(e){
            e.preventDefault();
            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].button.classList.remove("on");
                document.querySelectorAll('.branchAdd li')[k].classList.remove("on");
                document.querySelectorAll('.info li')[k].classList.remove("on");
            }
            markerOptions[index].button.classList.add("on");
            document.querySelectorAll('.branchAdd li')[index].classList.add("on");
            document.querySelectorAll('.info li')[index].classList.add("on");
            moveTo(markerOptions[index].latlng);
            console.log(index);
        }
    })(i);        
}    

window.onresize = function(){   
    var active_btn = document.querySelector(".branch li.on");
    var active_index = parseInt(active_btn.getAttribute("data-index"))-1;
    map.setCenter(markerOptions[active_index].latlng);
 }

//지점으로 맵 이동 함수 정의
function moveTo(target){
    var moveLatLan = target;
    map.setCenter(moveLatLan);
    return false;
}


//드래그기능 활성화 
setDraggable(drag);           
function setDraggable(draggable) {
    map.setDraggable(draggable);    
}


//줌기능 활성화
setZoomable(zoom);
function setZoomable(zoomable) {          
    map.setZoomable(zoomable);    
}





}