import gulp from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import eslint from 'gulp-eslint'

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js'
}

gulp.task('build', ['lint'], () => {
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('main', ['build'], (callback) => {
  exec('node lib/', (error, stdout) => {
    console.log(stdout)
    return callback(error)
  })
})

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
})

gulp.task('default', ['watch', 'main'])

gulp.task('lint', () => {
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
