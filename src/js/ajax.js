// ajax promise 封装
function getSend(url, cb) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function() {
        //回调函数
        cb(xhr.responseText)
    }
}

function postSend(url, cb, data) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    xhr.send(data)
    xhr.onload = function() {
        cb(xhr.response)
    }
}

function pGetSend(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
                resolve(xhr.responseText)
            }
            if (/4\d{2}/.test(xhr.status)) {
                reject('客户端错误')
            }
            if (/5\d{2}/.test(xhr.status)) {
                reject('服务端错误')
            }
        }
        xhr.send()
    })
}

function pPostSend(url, data) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
                resolve(xhr.responseText)
            }
            if (/4\d{2}/.test(xhr.status)) {
                reject('客户端错误')
            }
            if (/5\d{2}/.test(xhr.status)) {
                reject('服务端错误')
            }
        }
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data)
    })
}