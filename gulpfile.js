const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const responsive = require('gulp-responsive-images');

gulp.task('default', ['copy-html','copy-img','copy-js','copy-sw','copy-css','copy-json'], function(){
    browserSync.init({
        server: './dist',
        port: 8000,
        ui: {
            port: 8001
        }
    });
    gulp.watch('app/css/*.css', ['copy-css']);
    gulp.watch('app/*.html', ['copy-html']);
    gulp.watch('app/data/*.json', ['copy-json']);
    gulp.watch('app/js/**/*.js', ['copy-js']);
    gulp.watch('app/sw.js', ['copy-sw']);
    gulp.watch('dist/css/*.css', browserSync.reload);              // obe moznosti funguji
    gulp.watch('dist/index.html', browserSync.reload);              // obe moznosti funguji
    gulp.watch('dist/sw.js', browserSync.reload);              // obe moznosti funguji
    gulp.watch('dist/js/**/*.js').on('change', browserSync.reload); // obe moznosti funguji
});


gulp.task('copy-img', function(){ // zkopiruje img do distu
    gulp.src('app/img/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('copy-html', function(){ // zkopiruje html do distu
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-js', function(){ // zkopiruje js do distu
    gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-sw', function(){ // zkopiruje js do distu
    gulp.src('app/sw.js')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-json', function(){ // zkopiruje js do distu
    gulp.src('app/data/*.json')
        .pipe(gulp.dest('dist/data'));
});

gulp.task('copy-css', function(){ // zkopiruje js do distu
    gulp.src('app/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('responsive-img', function(){
    gulp.src('app/img/*')
        .pipe(responsive({
            '*.jpg': [{
                width: 200,
                suffix: '-200w',
                quality: 50
              }, {
                width: 400,
                suffix: '-400w',
                quality: 50
              }, {
                width: 600,
                suffix: '-600w',
                quality: 50
              }, {
                width: 800,
                suffix: '-800w',
                quality: 50
              }]
        }))
        .pipe(gulp.dest('dist/img'));
});

