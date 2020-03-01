$(".login button").click(function() {

    if (!$('#username')[0].value || !$('#password')[0].value) {
        alert('请填写完整信息')
        return
    }
    postSend('/login', function(res) {
        if (JSON.parse(res).code === 1) {
            console.log('登录成功')
            window.location.href = '../pages/index.html'
        } else {
            $('.login_error')
                .html(`<i></i><span>用户或密码错误</span>`)
            console.log('登录失败')
        }
    }, `username=${$("#username")[0].value}&password=${$("#password")[0].value}`)
})