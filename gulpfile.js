(function () {
   "use strict";
   var gulp = require("gulp"),
		eslint = require("gulp-eslint");

	gulp.task("default", function() {

		gulp.src(["rules/*.js"])
			.pipe(eslint({
				rules:{
					"no-console": 0
				},
				globals: {
					"require":false,
					"module":false,
					"console":false,
					"process": true
				}
			}))
			.pipe(eslint.formatEach("compact", process.stderr));
	});
}());
