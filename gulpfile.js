const { src, dest, watch, series, parallel } = require("gulp");
const fileInclude = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const csso = require("gulp-csso");
const prefix = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const jsmin = require("gulp-jsmin");
const imgmin = require("gulp-imagemin");
const newer = require("gulp-newer");
const browserSync = require("browser-sync").create();

const html = function () {
    return src("src/**/*.html")
        .pipe(fileInclude())
        .pipe(dest("dist/"))
        .pipe(browserSync.stream());
}

const style = function () {
    return src("src/css/*.css")
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(prefix())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/css/"))
        .pipe(browserSync.stream());
}

const scripts = function () {
    return src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jsmin())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/js/"))
        .pipe(browserSync.stream());
}

const img = function () {
    return src("src/image/**/*")
        .pipe(newer("dist/image/"))
        .pipe(imgmin())
        .pipe(dest("dist/image/"))
        .pipe(browserSync.stream());
}

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: true,
    });
    cb();
}

const observe = function (cb) {
    watch("src/**/*.html", { usePolling: true }, html);
    watch("src/css/*", { usePolling: true }, style);
    watch("src/js/*.js", { usePolling: true }, scripts);
    cb();
}

exports.default = series(html, style, scripts, img);
exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.img = img;
exports.watch = parallel(server, observe);