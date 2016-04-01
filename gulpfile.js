var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var sass            = require('gulp-ruby-sass');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var cp              = require('child_process');
var uglify          = require('gulp-uglify');
var notify          = require("gulp-notify");
var rename          = require('gulp-rename');
var concat          = require('gulp-concat');
var svgmin          = require('gulp-svgmin');
var svgstore        = require('gulp-svgstore');
var htmlmin         = require('gulp-htmlmin');
var spawn           = require("gulp-spawn");
var cheerio         = require('gulp-cheerio');

var processors = [
  autoprefixer({browsers: [
    'last 6 Chrome versions',
    'last 6 Firefox versions',
    'last 4 iOS versions',
    'last 4 Safari versions',
    'Explorer >= 9',
    'last 5 Opera versions',
    'Android >= 4'
  ]}),
  // inline_svg(),
];

// Show messages
var messages = {jekyllBuild: '<div style="color:grey;left:0;right:auto;position:fixes;width:100%;">Running:</div> $ jekyll build'};

// Handle any compass compiling errors
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-build', function (done) {
   browserSync.notify(messages.jekyllBuild);
   return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'}).on('error', handleError).on('close', done);
 });


/**
 * Rebuild Jekyll & do page reload
 */
 gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
   browserSync.reload();
 });


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

// Generate SVG sprite.
gulp.task('svg-sprite', function ()
{
  gulp.src('./_assets/icons/*.svg')
  .pipe(svgmin())
  .pipe(svgstore({inlineSvg: false}))
  .pipe(cheerio({
    run: function ($) {
      $('svg').attr('style', 'display:none');
      $('[fill="none"]').removeAttr('fill');
    },
    parserOptions: { xmlMode: true }
  }))
  .pipe(rename('svg-icon-sprite.svg'))
  .pipe(gulp.dest('./_includes/'));
});


// gulp.task('source-images', function ()
// {
//     gulp.src('./source/backgrounds/*')
//     .pipe(rename({
//         suffix: '-medium'
//     }))
//     .pipe(resize({
//       width : 1050,
//       height : 50000,
//       crop : false,
//       upscale : true,
//       quality: 1
//   }))
//    //  .pipe(gm(function (gmfile) {
//    //     console.log(gmfile.source);
//    //     return gmfile.blur('0x30');
//    // }))
// .pipe(gulp.dest('./css/img/backgrounds'))
// .pipe(gulp.dest('./_site/css/img/backgrounds'));
//
//
// gulp.src('./source/backgrounds/*')
// .pipe(rename({
//     suffix: '-large'
// }))
//    //  .pipe(gm(function (gmfile) {
//    //     console.log(gmfile.source);
//    //     return gmfile.blur('0x100');
//    // }))
// .pipe(resize({
//   width : 2100,
//   height : 50000,
//   crop : false,
//   upscale : true,
//   quality: 1
// }))
// .pipe(gulp.dest('./css/img/backgrounds'))
// .pipe(gulp.dest('./_site/css/backgrounds'));
//
//
// });
//
// gulp.task('image', function ()
// {
//     gulp.src('./assets/backgrounds/*')
//     // .pipe(gm(function (gmfile) {
//     //     return gmfile.resize(100, 100);
//     // }))
// .pipe(gulp.dest('./_site/backgrounds'));
// });
//


gulp.task('sass', function()
{
    return sass('_sass/**/*.scss', {
      sourcemap: false,
      style: 'compact',
      precision: 10,
      stopOnError: true
    })
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({
      onLast: true,
      title: 'SASS',
      message: 'Sass has finished compiling.'
    }));
});

gulp.task('js', function()
{
    gulp.src(['./js/*.js', '!./js/*.min.js'])
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(uglify({
        mangle: false
    }))
    .pipe(gulp.dest('./js/'));
    gulp.src([
             './js/src/modernizr.min.js',
            //  './js/src/jquery-2.2.2.min.js',
            //  './js/moment.min.js',
             './js/src/picturefill.min.js',
             './js/src/swiper.min.js',
            //  './js/owl.carousel.min.js'
             ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(gulp.dest('./_site/js/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({
        onLast: true,
        title: 'JavaScript',
        message: 'JS has finished compiling.'
    }));
});

gulp.task('watch', function()
{
   gulp.watch('./_sass/**/*.scss', ['sass']);
   gulp.watch(['./js/*.js', '!./js/*.min.js', '!./js/scripts.js'], ['js']);
   gulp.watch(['index.html', '_posts/**/*.*', '_data/*.*', '_layouts/*.*', '_includes/*.*', 'api/**/*.*', 'js/*.*'], ['jekyll-rebuild']);
   gulp.watch('./_assets/icons/*.svg', ['svg-sprite']);
});

gulp.task('default', ['sass', 'svg-sprite', 'browser-sync', 'watch'], function()
{

});
