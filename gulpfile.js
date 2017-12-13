var gulp = require('gulp')
var concat = require('gulp-concat');



gulp.task('default', [], function (){
	console.log("concating and moving all the angular setup files")
	gulp.src(["public/static/javascript/angular/angular.js",
		      "public/static/javascript/angular/**.js"])
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest("public/static/javascript/"))
})