document.addEventListener("DOMContentLoaded",function(){
    function size(origin,type){
        type==origin||"y";
        if(type=="x"){
            var clientW=document.documentElement.clientWidth; /*浏览器宽*/
            var originW=origin; /*设计稿宽*/
            var bili=clientW/originW*100+"px";
        }else if(type=="y"){
            var clientH=document.documentElement.clientHeight;
            var originH=origin; /*设计稿高*/
            var bili=clientH/originH*100+"px";
        }

        var html=document.querySelector("html");
        html.style.fontSize=bili; /*根元素字体大小*/
    }
    size(2208,"y");


    var mySwiper = new Swiper('.swiper-container',{
        //图片切换
        pagination : '.swiper-pagination',
        //文字动画
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper);
        }
    })
})