var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

gulp.task('run', function() {
	childProcess.spawn(electron, ['./app'], {
		stdio: 'inherit'
	});
});

gulp.task('clean', function(callback) {
	return destDir.dirAsync('.', {
		empty: true
	});
});

gulp.task('copy', ['clean'], function() {
	return projectDir.copyAsync('app', destDir.path(), {
		overwrite: true,
		matching: [
			'./node_modules/**/*',
			'*.html',
			'*.css',
			'main.js',
			'package.json'
		]
	});
});

gulp.task('build', ['copy'], function() {
	return gulp.src('./app/index.html')
		.pipe(usemin({
			js: [uglify()]
		}))
		.pipe(gulp.dest('build/'));
});
