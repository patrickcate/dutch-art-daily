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
var imageExport     = require('image-size-export');

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


/**
 * Copy favicons to site root folder.
 */
gulp.task('favicons', ['jekyll-build'], function() {
  gulp.src('./_assets/favicons/*.*')
  .pipe(gulp.dest('./_site/'));
});


/**
 * Create JSON file of image information.
 */
gulp.task('image-info', function () {
   imageExport.record({
    path: 'images/**/*.jpg',
    output: "_data/images.json",
    template: '_assets/templates/image-info.hbs',
    breakpointDelimiter: '-'
  });
  imageExport.record({
   path: 'css/img/bg/**/*.jpg',
   output: "_data/backgrounds.json",
   template: '_assets/templates/image-info.hbs',
   breakpointDelimiter: '-'
 });
});


// Generate SVG sprite.
gulp.task('svg-sprite', function ()
{
  gulp.src('./_assets/icons/*.svg')
  .pipe(svgmin())
  .pipe(cheerio({
    run: function ($) {
      $('[fill="none"]').removeAttr('fill');
    },
    parserOptions: { xmlMode: true }
  }))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(cheerio({
    run: function ($) {
      $('svg').attr('version', '1.1');
      $('svg').attr('style', 'display:none');
      $('svg symbol').each(function(i, elem) {
        $(this).addClass($(this).attr('id'));
      });
    },
    parserOptions: { xmlMode: true }
  }))
  .pipe(rename('svg-icon-sprite.svg'))
  .pipe(gulp.dest('./_includes/'));
});


// Generate SASS
gulp.task('sass', function()
{
    return sass('_sass/**/*.scss', {
      sourcemap: false,
      style: 'compressed',
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
    gulp.src([
      './js/src/modernizr.min.js',
      './js/src/picturefill.min.js',
      './js/src/pf.mutation.min.js',
    ])
    .pipe(concat('scripts.js'))
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest('./js/'))
    .pipe(gulp.dest('./_site/js/'));
    gulp.src([
      './js/src/swiper.min.js',
      './js/src/jsonp.min.js',
      './js/src/ready.min.js',
      './js/src/init.js',
    ])
    .pipe(concat('slider.js'))
    .pipe(uglify({
        mangle: true
    }))
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
   gulp.watch(['./js/**/*.js', '!./js/*.min.js', '!./js/scripts.js', '!./js/slider.js'], ['js']);
   gulp.watch(['index.html', '_posts/**/*.*', '_data/**/*.*', '_layouts/**/*.*', '_includes/**/*.*', 'api/**/*.*', 'js/**/*.*'], ['jekyll-rebuild', 'favicons']);
   gulp.watch('./_assets/icons/*.svg', ['svg-sprite']);
});

gulp.task('default', ['sass', 'svg-sprite', 'browser-sync', 'watch'], function()
{

});
