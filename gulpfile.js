var gulp          = require('gulp'),
    cp            = require('child_process'),
    $             = require('gulp-load-plugins')(),
    bs            = require("browser-sync").create(),
    reload        = bs.reload;



// Build Jekyll (via Node.js child process)
gulp.task('jekyll-build', function(done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
});


// Build Jekyll and assets then reload the browser
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
  bs.reload();
});


// Start up BrowserSync to serve the Jekyll generated site
gulp.task('browser-sync', ['jekyll-rebuild'], function() {
  bs.init({
    server: {
      baseDir: '_site'
    }
  });
});


// Process and minify Sass files
gulp.task('sass', function() {
  return $.rubySass('assets/sass/main.scss', {require: ['bourbon', 'neat'],
    style: 'compressed'})
  .pipe($.plumber())
  .pipe(gulp.dest('_includes/css'))
  .pipe(bs.stream());
});


// Lint custom JavaScript, concat and minify with libraries and plugins prepended
gulp.task('js', function() {
  return gulp.src('assets/js/main.js')
  .pipe($.plumber())
  .pipe($.jshint())
  .pipe($.jshint.reporter('default'))
  .pipe($.addSrc('assets/js/library/*.js'))
  .pipe($.addSrc('assets/js/plugins/*.js'))
  .pipe($.order([
    'assets/js/library/*.js',
    'assets/js/plugins/*.js',
    'assets/js/main.js'
    ], { base: './' }))
  .pipe($.concat('main.js'))
  .pipe($.uglify())
  .pipe(gulp.dest('_site/assets/js'))
  .pipe(bs.stream());
});


// Build the SVG sprite
gulp.task('svg', function() {
  return gulp.src('assets/images/symbols/*.svg')
  .pipe($.svgSprites({
    mode:     'symbols',
    selector: 'shape--%f',
    svg: {
      symbols: 'symbols.html'
    },
    preview:  false
  }))
  .pipe(gulp.dest('_includes/svg'));
});


// Optimize all Bitmap assets
gulp.task('img', function() {
  return gulp.src('assets/images/*.{jpg,png}')
  .pipe($.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true}))
  .pipe(gulp.dest('_site/assets/images'))
  .pipe(bs.stream());
});


// Watch for file changes and run specific tasks when detected
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/js/**/*.js', ['js']);
  gulp.watch('assets/images/*', ['img']);
  gulp.watch('assets/images/symbols/*.svg', ['svg']);
  gulp.watch(['_config.yml', 'index.html', '_details/**/*', '_includes/**/*', '_layouts/**/*'], ['jekyll-rebuild']);
});


// Default 'gulp' command triggers all of the above and opens a new browser tab with the BrowserSync instance
gulp.task('default', ['browser-sync', 'watch']);
