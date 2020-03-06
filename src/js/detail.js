$(function() {
    $('.show').mouseover(function() {
        $(this).children('div').stop().slideDown(300)
    })
    $('.show').mouseout(function() {
        $(this).children('div').stop().slideUp(300)
    })
})
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
// 放大镜
(function($) {
    $.fn.JNMagnifier = function(setting) {

        if (setting && setting.renderTo) {
            if (typeof(setting.renderTo) == "string") {
                setting.renderTo = $(setting.renderTo);
            }
        } else {
            return;
        }
        var _img_org_ = this.children("img");
        _img_org_.css("cursor", "pointer");

        var __w = 0;
        var __h = 0;

        var __left = this.offset().left;
        var __top = this.offset().top;

        if (this.offsetParent()) {
            __left += this.offsetParent().offset().left;
            __top += this.offsetParent().offset().top;
        }

        var _move_x = 0;
        var _move_y = 0;

        var _val_w = (setting.renderTo.width() / 2);
        var _val_h = (setting.renderTo.height() / 2);

        _img_org_.mouseover(function() {
            setting.renderTo.html('<img src="' + _img_org_.attr("src") + '" style="position:absolute;" id="JNMagnifierrenderToImg" />');
            setting.renderTo.show();
            var timer = setInterval(function() {
                __w = $("#JNMagnifierrenderToImg").width() / _img_org_.width();
                __h = $("#JNMagnifierrenderToImg").height() / _img_org_.height();
                if (__w > 0) {
                    clearInterval(timer);
                }
            }, 100);
        });

        _img_org_.mouseout(function() {
            setting.renderTo.hide();
        });

        _img_org_.mousemove(function(e) {
            _move_x = 0 - Math.round((document.documentElement.scrollLeft + e.clientX - __left) * __w - _val_w);
            _move_y = 0 - Math.round((document.documentElement.scrollTop + e.clientY - __top) * __h - _val_h);
            $("#JNMagnifierrenderToImg").css({
                "left": _move_x + "px ",
                "top": _move_y + "px"
            });
        });
    }
})(jQuery);

$("#ShowPictureBox").JNMagnifier({
    renderTo: "#ShowBigPictureBox"
});

//渲染购物页面
const info = JSON.parse(localStorage.getItem('goodsInfo'))
if (!info) {
    alert('数据不存在')
    window.location.href = './list.html'
}
bindHtml()

function bindHtml() {
    $('.buybox img').attr('src', info.url)
    $('.buybox h3').text(info.name)
    $('.buybox p').text(info.price)
}

//添加购物车点击事件
$('.btn1').click(() => {
    const cartList = JSON.parse(localStorage.getItem('cartList')) || []
        //判断有没有数据
    let exits = cartList.some(item => {
        return item.id === info.id
    })
    if (exits) {
        let data = null
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id === info.id) {
                data = cartList[i]
                break
            }
        }
        data.number++
            data.xiaoji = data.number * data.price
    } else {
        //添加本条数据
        info.number = 1
        info.xiaoji = info.price
        info.isSelect = false
        cartList.push(info)
    }
    localStorage.setItem('cartList', JSON.stringify(cartList))
})