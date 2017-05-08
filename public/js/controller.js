angular.module("controllers",[])
    .controller("main",["$scope","$http",function($scope,$http){
        // document.addEventListener("DOMContentLoaded",function(){
            //根元素字体大小
            size(750);
            function size(a){
                var clientW=document.documentElement.clientWidth;
                var originW=a;
                var bili=clientW/originW*100+"px";
                var html=document.querySelector("html");
                html.style.fontSize=bili;
            }
            var mySwiper1 = new Swiper('.swiper-container1',{
                pagination : '.swiper-pagination1',
                paginationElement : 'li',
                autoplay : 2000,
                autoplayDisableOnInteraction :false,
                loop: true,
            })

            $http({
                url:"/indexData"
            }).then(function (e) {
                $scope.data=e.data;
            })
        // })
    }])
    .controller("phone",["$scope",function($scope){

    }])
    .controller("index",["$scope",function($scope){
        $scope.active="one";
        $scope.change=function(name){
            $scope.active=name;
        }
    }])
    .controller("todo",["$scope",function($scope){
        var list=$(".mui-navigate-right");
        var currentLeft=0;
        touch.on(".mui-navigate-right","dragstart",function(e){
            currentLeft= parseInt($(this).css("left"))?parseInt($(this).css("left")):0;
        })

        touch.on(".mui-navigate-right","drag",function(e){

            if(e.direction=="left") {
                var left=currentLeft+e.x;

                if(left<-50){
                    left=-50
                }
                console.log(left);
                $(this).css("left",left);
            }else if(e.direction=="right"){
                var left=currentLeft+e.x;

                if(left>0){
                    left=0
                }
                console.log(left);
                $(this).css("left",left);
            }
        })
    }])
    .controller("todoUpdate",["$scope",function($scope){
        size(750);
        function size(a){
            var clientW=document.documentElement.clientWidth;
            var originW=a;
            var bili=clientW/originW*100+"px";
            var html=document.querySelector("html");
            html.style.fontSize=bili;
        }
    }])
    .controller("todoEdit",["$scope",function($scope){

    }])
    .controller("list",["$scope","$location","$http",function($scope,$location,$http){

        $http({url:"/getCon",params:{url:Object.keys($location.$$search)[0]},responseType:"text"}).then(function(e){

            $scope.data=e.data;
            console.log($scope.data);
            document.querySelector(".con").innerHTML=($scope.data);
        })
    }])
