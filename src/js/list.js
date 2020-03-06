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


let LIST = []
getList2()

function getList2() {
    $.ajax({
        url: '../lib/list.json',
        dataType: 'json',
        success: function(res) {
            $('.pagi').pagination({
                pageCount: Math.ceil(res.length / 12),
                current: 1,
                jump: true,
                coping: true,
                homepage: '首页',
                endPage: '末页',
                prevContent: '<',
                nextContent: '>',
                callback: function(api) {
                    let curr = api.getCurrent()
                    var list = res.slice((curr - 1) * 12, curr * 12)
                    bindHtml(list)
                }
            })
            bindHtml(res.slice(0, 12))
            LIST = res
        }
    })
}

function bindHtml(list) {
    console.log(list)
    let str = ''

    list.forEach(item => {
        str += `
            <li data-id="${item.id}">
                <img src="${ item.url}" alt="">
                <h3>${item.name}</h3>
                <p>${ item.price}</p>
            </li>
                `
    })
    $('.box > ul').html(str)
}
// let LIST = res
$('.box>ul').on('click', 'li', function() {
    console.log(this)
    const id = $(this).data('id')
    let data = null
    for (var i = 0; i < LIST.length; i++) {
        if (LIST[i].id === id) {
            data = LIST[i]
            break
        }
    }
    localStorage.setItem('goodsInfo', JSON.stringify(data))

    window.location.href = './detail.html'
})