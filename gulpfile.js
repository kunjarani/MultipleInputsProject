const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const karma = require('gulp-karma');


const allFiles = [
     './node_modules/angular/angular.js',
     './node_modules/angular-mocks/angular-mocks.js',
     './public/app/multiply.js',
     './public/tests/multiply.js'
   ];
   gulp.task('test', function(done) {
     gulp.src(allFiles)
     .pipe(karma({
     configFile: 'karma.conf.js',
     action: 'run'
   }))
   .on('error', function(err) {
    // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
    done();
   });

gulp.task('css',()=>{
    console.log('comming 4');
    return gulp.src(['public/app/*.css'],{base: './'})
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
})

gulp.task('js',()=>{
    console.log('comming 3');
    return gulp.src(['node_modules/angular/angular.js','public/app/*.js'],{base: './'})
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
        stream: true
    }));
})

gulp.task('html',()=>{
  
    return gulp.src(['public/app/**/*.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
        stream: true
    }));
})


gulp.task('serve',  () => nodemon({ script: 'app.js', ignore: ['./node_modules/*.js'] }));

gulp.task('build',() => gulp.parallel(['css','js','html']));

gulp.task('browser-sync', (done)=>{
    console.log('comming 5');
    // return browserSync.init(null,{
    //    open : false,
    //    server:{
    //        baseDir: './public/app'
    //    }
      return browserSync.init({
        server: "./public/app",
        port: 3003
    });
   });


gulp.task('watch', function() {
    console.log('comming inside');
    gulp.watch('public/app/styles.css',gulp.series('css'));
    gulp.watch('public/app/app.js',gulp.series('js'));
    gulp.watch('public/app/index.html',gulp.series('html'));
   
  });

gulp.task('start',gulp.series(
    gulp.parallel(['build', 'serve','browser-sync','watch']),
 function (done) {
    console.log('comming');
  
    done ();  
}));