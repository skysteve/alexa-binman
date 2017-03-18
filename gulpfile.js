const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpTslint = require('gulp-tslint');
const tslint = require('tslint');

gulp.task('lint', () => {
  const tsProject = ts.createProject('tsconfig.json');
  const program = tslint.Linter.createProgram('./tsconfig.json');

  tsProject.src()
    .pipe(gulpTslint({
      formatter: 'stylish',
      program
    }))
    .pipe(gulpTslint.report({
      summarizeFailureOutput: true
    }));
});

gulp.task('build', ['lint'], () => {
  const tsProject = ts.createProject(path.join(__dirname, '.', 'tsconfig.json'));

  return gulp.src('./?(src|features|interfaces)/**/*.?(ts|js)')
    .pipe(tsProject())
    .pipe(gulp.dest(path.join('./', 'dist')));
});

gulp.task('test', ['lint'], () => {});
gulp.task('default', ['test']);
