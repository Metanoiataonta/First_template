var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');
gulp.task('sass', function() {
    return gulp.src('css/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('watch', function() {
    gulp.watch('css/**/*.scss', gulp.parallel('sass'));
    gulp.watch('index.html', gulp.parallel('html'));
});
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        startPath: "index.html"
    });
});

gulp.task('clean', async function() {
    return del.sync('dist')
});

gulp.task('prebuild', async function() {
    var buildCss = gulp.src(['dist/style.css'])
        .pipe(gulp.dest('dist'))
});


gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));

gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass'));