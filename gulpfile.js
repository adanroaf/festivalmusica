import { src, dest, watch, series } from "gulp";
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js(done) {
    src('src/js/app.js')
        .pipe( dest('build/js'))
    done();
}

export function css(done) {
    src('src/scss/app.scss', {sourcemaps: '.'})
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: '.'}) )
    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

export function html(done) {
  src('*.html')
    .pipe(dest('build/'));
  done();
}

export function assets(done) {
  src('src/img/**/*').pipe(dest('build/img'));
  src('video/**/*').pipe(dest('build/video'));
  done();
}

export default series(html, assets, js, css, dev);