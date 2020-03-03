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
getList()

function getList() {
    $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function(res) {
            console.log(res)
            let str = ''
            res.forEach(item => {
                str += `<li><a href="#">${ item.name }</a></li>`
            })
            $('.nav-top > ul')
                .html(str)
                .on({
                    mouseenter: () => $('.nav-box').stop().slideDown(),
                    mouseleave: () => $('.nav-box').stop().slideUp()
                })
                .children('li')
                .on('mouseover', function() {
                    const index = $(this).index()
                    const list = res[index].list
                    let str = ''
                    list.forEach(item => {
                        str += `
                            <li>
                                <div>
                                    <img src="${ item.list_url }" alt="">
                                </div>
                                <p class="title">${ item.list_name }</p>
                                <span class="price">${ item.list_price }</span>
                            </li>
                                `
                    })
                    $('.nav-box > ul').html(str)
                })
            $('.nav-box')
                .on({
                    mouseover: function() {
                        $(this).finish().show()
                    },
                    mouseout: function() {
                        $(this).finish().slideUp()
                    }
                })
        }
    })
}

getChildren()

function getChildren() {
    $.ajax({
        url: '../lib/children.json',
        dataType: 'json',
        success: function(res) {
            console.log(res)
            let str = ''
            res.forEach(item => {
                str += ` <li><a href="#">${item.title}<span>&gt;</span></a></li></a></li>`
            })
            $('.category-list > ul')
                .html(str)
                .on({
                    mouseenter: () => $('.children').stop().show(),
                    mouseleave: () => $('.children').stop().hide()
                })
            $('.category-list > ul')
                .children('li')
                .on('mouseover', function() {
                    const index = $(this).index()
                    const list = res[index].list
                    let str = ''
                    list.forEach(item => {
                        str += `
                            <li>
                            <a href="#">
                                    <img src="${ item.url }" alt="">
                                <span>${ item.name }</span>
                                </a>
                            </li>
                                `
                    })
                    $('.children > ul').html(str)
                })
            $('.children')
                .on({
                    mouseover: function() {
                        $(this).stop().show()
                    },
                    mouseout: function() {
                        $(this).stop().hide()
                    }
                })
        }
    })
}