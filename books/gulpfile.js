var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var url = require("url");
var fs = require("fs");
var path = require('path');
var data = require('./data/data.json');
//编译scss
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css/'))
    })
    //监听事件
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
    })
    //起服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    return res.end('');
                } else if (pathname === "/api/list") {
                    res.end(JSON.stringify({
                        code: 0,
                        data: data,
                        msg: "数据请求成功"

                    }))
                } else if (pathname === "/api/list") {
                    res.end(JSON.stringify({
                        code: 0,
                        data: data,
                        msg: "搜索成功"
                    }))
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'));