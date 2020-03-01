$(function() {
    $('.show').mouseover(function() {
        $(this).children('div').stop().slideDown(300)
    })
    $('.show').mouseout(function() {
        $(this).children('div').stop().slideUp(300)
    })
})

var i = 0,
    timer;
var sum = $(".pic li").length;
$(function() {
    $(".pic li").eq(0).show();

    $(".banner").hover(function() {
        $(".arrow").show();
        clearInterval(timer);
    }, function() {
        $(".arrow").hide();
        iLunbo();
    })
    iLunbo();

    $(".arrow").hover(function() {
        clearInterval(timer);
    });
    /*左箭头控制轮播*/
    $(".left").click(function() {
        clearInterval(timer);
        if (i == 0) {
            i = sum;
        }
        i--;
        startLunbo();
        iLunbo();
    });

    /*右箭头控制轮播*/
    $(".right").click(function() {
        clearInterval(timer);
        if (i == sum - 1) {
            i = -1;
        }
        i++;
        startLunbo();
        iLunbo();
    });

    /*提示信息变换*/
    $(".num>li").hover(function() {
        clearInterval(timer);
        i = $(this).index();
        console.log(i);
        startLunbo();
    });
});

/*自动轮播*/
function iLunbo() {
    timer = setInterval(function() {
        i++;
        if (i == sum - 1) {
            i = -1;
        }
        startLunbo();
    }, 3000)
}

/*图片轮播和提示信息*/
function startLunbo() {
    if (i == 6) {
        i = 0;
    }
    $(".pic>li").eq(i).fadeIn().siblings().fadeOut();
    $(".num>li").eq(i).addClass("current").siblings().removeClass("current");
}

// 商品tab
$('.category-list li').click(function() {
    var index = $(this).index()
    console.log($('category-list li'))
    $('.tab div').eq(index).show()
    $('.tab div').eq(index).siblings.hide()
})