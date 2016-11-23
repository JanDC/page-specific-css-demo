/* SVG task */

/**
 * plugins
 */
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  svgSprite = require('gulp-svg-sprite');

/**
 * configfile
 */
var config = require('../config').svg;

/**
 * Tasks
 */
gulp.task('svg', function () {
  gulp.src(config.svgsprite.src)
    .pipe(plumber())
    .pipe(svgSprite(config.svgsprite.settings))
    .pipe(gulp.dest(config.svgsprite.dest));
});




