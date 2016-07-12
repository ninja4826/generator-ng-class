import path from 'path';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import nsp from 'gulp-nsp';
import plumber from 'gulp-plumber';
import coveralls from 'gulp-coveralls';
import del from 'del';

gulp.task('clean', () => del('generators'));

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', (cb) => {
  nsp({ package: path.resolve('package.json') }, cb);
});

gulp.task('build:js', ['clean', 'lint', 'nsp'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('generators'));
});

gulp.task('build', ['build:js'], () => {
  return gulp.src('src/**/*.!(js)')
    .pipe(gulp.dest('generators'));
});

gulp.task('pre-test', ['build'], () => {
  return gulp.src('generators/**/*.js')
    // .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], (cb) => {
  var mochaErr;
  
  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec', timeout: 15000 }))
    .on('error', (err) => mochaErr = err)
    .pipe(istanbul.writeReports())
    .on('end', () => cb(mochaErr));
});

gulp.task('coveralls', ['test'], () => {
  if (!process.env.CI) {
    return;
  }
  console.log('running coveralls');
  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('prepublish', ['nsp']);

gulp.task('default', ['build', 'test', 'coveralls']);