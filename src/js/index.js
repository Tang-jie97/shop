$(function() {
    $('.show').mouseover(function() {
        $(this).children('div').stop().slideDown(300)
    })
    $('.show').mouseout(function() {
        $(this).children('div').stop().slideUp(300)
    })
})

window.onload = function() {
    var n = 0,
        timer;
    var sum = $(".pic li").length;
    $(function() {
        $(".pic li").eq(0).stop().show();

        $(".banner").hover(function() {
            $(".arrow").stop().show();
            clearInterval(timer);
        }, function() {
            $(".arrow").stop().hide();
            iLunbo();
        })
        iLunbo();

        $(".arrow").hover(function() {
            clearInterval(timer);
        });
        /*左箭头控制轮播*/
        $(".left").click(function() {
            clearInterval(timer);
            if (n == 0) {
                n = sum;
            }
            n--;
            startLunbo();
            iLunbo();
        });

        /*右箭头控制轮播*/
        $(".right").click(function() {
            clearInterval(timer);
            if (n == sum - 1) {
                n = -1;
            }
            n++;
            startLunbo();
            iLunbo();
        });

        /*提示信息变换*/
        $(".num>li").hover(function() {
            clearInterval(timer);
            n = $(this).index();
            console.log(n);
            startLunbo();
        });
    });

    /*自动轮播*/
    function iLunbo() {
        timer = setInterval(function() {
            n++;
            if (n == sum - 1) {
                n = -1;
            }
            startLunbo();
        }, 10000)
    }

    /*图片轮播和提示信息*/
    function startLunbo() {
        if (n == 6) {
            n = 0;
        }
        $(".pic>li").eq(n).stop().fadeIn().siblings().stop().fadeOut();
        $(".num>li").eq(n).addClass("current").siblings().removeClass("current");
    }
}