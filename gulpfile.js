/*gulp 里面提供的方法
    1. src()
    用来找要打包的文件
    src('你要打包的文件的地址')
    返回值就是一个 二进制流, 就可以继续去调用别的方法
    2.pipe()
    用来帮你做事情
    pipe(要做的事)
    返回值：二进制流，可以继续使用方法
    3.dest()
    用来写入文件的
    把已经压缩好的代码放在哪一个文件夹里面
    如果没有你指定的文件夹，会自动创建一个这个文件夹放进去
    4.parallel()
    用来并行执行多个任务的
    gulp.paraller(你定义好的任务1，定义好的任务2...)
    把这几个任务都执行
    返回值：是一个任务流
    只要这个返回值已执行，就能把你准备好的几个任务同时开始执行
    5.series()
    用来诸葛执行多个任务的
    gulp.series(任务1，任务2，...)
    返回值：是一个任务流
    只要返回值执行，就能把任务逐一完成
    6.watch()
    用来监控文件变化的
    gulp.watch(监控的文件目录，要执行的任务)
*/

//1.导入gulp这个第三方模块
const gulp = require('gulp')

//2.导入gulp.cssmin
const cssmin = require('gulp-cssmin')

//2.2导入gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer')

//3.导入gulp-uglify
const uglify = require('gulp-uglify')

//3.2导入gulp-babel
const babel = require('gulp-babel')

//4.导入gulp-htmlmin
const htmlmin = require('gulp-htmlmin')

//7.导入del
//导入以后会得到一个函数
//不需要和gulp产生关联
//直接使用就可以删除内容
const del = require('del')

//8.导入gulp-webserver
//导入以后可以得到一个函数
const webserver = require('gulp-webserver')

const cssHandler = () => {
    return gulp.src('./src/css/*.css') //找到src目录下css目录下所有后缀为.css的文件
        .pipe(autoprefixer()) //把css代码自动添加前缀
        .pipe(cssmin()) //压缩css代码
        .pipe(gulp.dest('./dist/css')) //压缩完毕的css代码放在dist目录下的css文件
}

const jsHandler = () => {
    return gulp.src('./src/js/*.js') //找到文件
        .pipe(babel({
            presets: ['@babel/env']
        })) //转码es6转换成es5
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('./dist/js')) //把压缩好的文件放在dist目录下
}
const htmlHandler = () => {
        return gulp.src('./src/pages/*.html') //找到要压缩的html文件
            .pipe(htmlmin({ //想进行压缩，需要在这个对象里面进行配置
                removeAttributeQuotes: true, // 移出属性上的双引号
                removeComments: true, // 移除注释
                collapseBooleanAttributes: true, // 把值为布尔值的属性简写
                collapseWhitespace: true, // 移除所有空格, 变成一行代码
                minifyCSS: true, // 把页面里面的 style 标签里面的 css 样式也去空格
                minifyJS: true, // 把页面里面的 script 标签里面的 js 代码给去空格
            }))
            .pipe(gulp.dest('./dist/pages'))
    }
    //移动image文件的方法
const imgHandler = () => {
        return gulp.src('./src/images/**') //images文件夹下的所有文件
            .pipe(gulp.dest('./dist/images')) //放到指定目录
    }
    //移动lib文件的方法
const libHandler = () => {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'))
}

//在打包的时候，只是把你最新的src里面的所有的内容给你压缩打包转移
//不会把之前的dist里面的文件删除
//改名文件后最好删除之前的dist目录，重新生成一遍
//自动删除dist目录
const delHandler = () => {
    //这个函数的目的就是为了删除dist目录使用的
    return del(['./dist'])
}

//8.书写一个配置服务器的任务
//在开发过程中直接把我写的东西在服务器上打开
//一边写一个修改，一边测试
//gulp是基于node运行的
//这里就是使用node给我们开启一个服务器
//自动刷新：当dist目录里面的代码改变以后，就会自动刷新浏览器
const serverHandler = () => {
        //要把页面在服务器上打开
        //打开的事dist目录里面我已经压缩好的页面
        return gulp.src('./dist') //找到要打开的的页面的文件夹，吧这个文件夹当做网站根目录
            .pipe(webserver({ //配置项
                host: 'localhost', //域名，可自定义
                port: 7070, //端口号，0~65535,尽量不使用0~1023
                open: './pages/index.html', //默认打开的首页
                livereload: true, //自动刷新浏览器
                //所有的代理配置都在proxies里面
                proxies: [
                    //每一个代理配置就是一个对象
                    {
                        source: '/gx', //源，你的地址标识符
                        //直接请求下面这个地址拿不到东西，因为跨域了
                        target: 'http://127.0.0.1/lianxi.php' //目标
                    }

                ]
            })) //开启服务器
    }
    /*
    webserver 这个第三方模块可以顺带配置代理
        直接在使用webserver的时候添加一个配置项
        proxies:[
             // 数组里面的每一项都是你的代理配置
            {
            source: '/gx',
            target: '你要代理的地址'
            }
        ]
    */
    /*
        webserver 使用自定义域名
            如果你想使用一个你自己定义的域名
            前提: 别用一个已经存在的网站(建议, 最好别用)
            修改一下你电脑里面的 hosts 文件 
            windows
            我的电脑 -> C: -> windows -> syatem32 -> drivers -> etc -> hosts
            mac
            桌面 按下 command + shift + g -> 输入 /etc -> 在里面就能找到 hosts 文件
            修改
            在最后一行加一条
            127.0.0.1    自己定义的域名
    */

//9.0自动监控文件
//监控src下面的文件，只要已修改，就执行对应的任务
const watchHandler = () => {
    // 监控着 src 下的 css 下的所有 .css 文件, 只要一发生变化, 就会自动执行一遍 cssHandler 任务
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/lib/**', libHandler)
    gulp.watch('./src/images/**', imgHandler)
}


//导出一个默认任务
//当执行gulp default的时候，就会自动把写在parallel里面的任务执行
//   小细节: 当你在命令行执行 gulp default 的时候, 可以不写 default
//           你在命令行执行 gulp 这个指令, 就是在执行 gulp default
// module.exports.default = gulp.parallel(cssHandler, jsHandler, htmlHandler, libHandler, imgHandler)

// 就应该在压缩 css/js/html 之前先把 dist 目录删除了
//   要在删除完毕 dist 以后, 在执行 css/js/html/... 之类的压缩转移任务
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler, libHandler, imgHandler),
    serverHandler,
    watchHandler
)


// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.image = imgHandler
// module.exports.lib = libHandler