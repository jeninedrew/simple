// Include gulp
var gulp = require("gulp");

// Include plugins
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var babel = require("gulp-babel");
var modernizr = require("gulp-modernizr");

// Static Server + watching scss/html files
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./app"
  });

  gulp.watch("app/scss/*.scss", ["sass"]);
  gulp.watch("app/*.html").on("change", browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", () =>
  gulp
    .src("src/app.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("modernizr", function() {
  return gulp
    .src("./js/*.js")
    .pipe(modernizr())
    .pipe(gulp.dest("build/"));
});

gulp.task("default", ["serve"]);
