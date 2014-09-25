var gulp = require("gulp"), 
	eslint = require("gulp-eslint");

gulp.task("default", function() {

	gulp.src(["*.js"])
		.pipe(eslint({
			rules:{
				"no-console": 0
			},
			globals: {
				"require":false,
				"module":false,
				"console":false
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});
