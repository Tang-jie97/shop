$(function() {
    $('.show').mouseover(function() {
        $(this).children('div').stop().slideDown(300)
    })
    $('.show').mouseout(function() {
        $(this).children('div').stop().slideUp(300)
    })
})