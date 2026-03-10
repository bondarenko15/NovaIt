'use strict';

const gulp = require('gulp');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const root = {
  src: 'assets/',
  build: 'markup/'
};

const path = {
  src: {
    html: root.src + '*.html',
    css: root.src + 'scss/*.scss',
    js: root.src + 'js/**/*.js',
    img: root.src + 'theme/img/**/*.{jpg,png,svg}',
    font: root.src + 'theme/fonts/**/*.ttf',
    ico: root.src + 'theme/icons/**/*.svg',
    vid: root.src + 'theme/video/**/*.mp4',
    ven: root.src + 'js/plugins/*.js'
  },
  build: {
    html: root.build,
    css: root.build + 'css/',
    js: root.build + 'js/',
    img: root.build + 'img/',
    font: root.build + 'fonts/',
    ico: root.build + 'icons/',
    vid: root.build + 'videos/',
    ven: root.build + 'plugins/'
  },
  watch: {
    html: [
      root.src + 'templates/**/*.html',
      root.src + '*.html',
      root.src + 'sections/**/*.html'
    ],
    css: root.src + 'scss/**/*.scss',
    js: root.src + 'js/**/*.js',
    img: root.src + 'theme/img/**/*.{jpg,png,svg}',
    ico: root.src + 'theme/icons/**/*.svg',
    vid: root.src + 'theme/video/**/*.mp4',
    ven: root.src + 'js/plugins/*.js'
  }
};

// CLEAN
function cleanDirectory() {
  return del([root.build]);
}

// HTML
function compileHTML() {
  return gulp.src(path.src.html)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Ошибка в HTML",
        message: "Error: <%= error %>"
      })
    }))
    .pipe(posthtml([ include() ]))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
}

// CSS
function compileCSS() {
  return gulp.src(path.src.css)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Ошибка в CSS",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(gulpSass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(csscomb())
    .pipe(csso({ comments: false }))
    .pipe(rename({ dirname: '', suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
}

// JS
function compileJS() {
  return gulp.src(path.src.js)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Ошибка в JS",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(uglify())
    .pipe(rename({ dirname: '', suffix: '.min' }))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
}

// Vendor JS
function assemblyVendor() {
  return gulp.src(path.src.ven)
    .pipe(newer(path.build.ven))
    .pipe(gulp.dest(path.build.ven))
    .pipe(browserSync.stream());
}

// Images
function optimizeImages() {
  return gulp.src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(imagemin([
      imagemin.optipng(),
      imagemin.svgo({ plugins: [{ removeViewBox: false }, { removeTitle: true }] }),
      imageminMozjpeg({ quality: 80 })
    ]))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
}

// SVG
function optimizeSvg() {
  return gulp.src(path.src.ico)
    .pipe(imagemin([
      imagemin.svgo({ plugins: [{ removeViewBox: false }, { removeTitle: true }] })
    ]))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(path.build.ico))
    .pipe(browserSync.stream());
}

// Video
function optimizeVideos() {
  return gulp.src(path.src.vid)
    .pipe(newer(path.build.vid))
    .pipe(gulp.dest(path.build.vid))
    .pipe(browserSync.stream());
}

// BUILD
const build = gulp.series(
  cleanDirectory,
  gulp.parallel(compileHTML, compileCSS, compileJS, assemblyVendor, optimizeImages, optimizeSvg, optimizeVideos)
);

// SERVER
function runServer() {
  browserSync.init({
    server: root.build,
    cors: true,
    notify: false
  });
  browserSync.watch(root.src + '**/*.*').on('change', browserSync.reload);
}

// WATCH
function watchFiles() {
  gulp.watch(path.watch.html, compileHTML);
  gulp.watch(path.watch.css, compileCSS);
  gulp.watch(path.watch.js, compileJS);
  gulp.watch(path.watch.ven, assemblyVendor);
  gulp.watch(path.watch.img, optimizeImages);
  gulp.watch(path.watch.ico, optimizeSvg);
  gulp.watch(path.watch.vid, optimizeVideos);
}

// EXPORTS
exports.cleanDirectory = cleanDirectory;
exports.build = build;
exports.start = gulp.series(build, gulp.parallel(runServer, watchFiles));
