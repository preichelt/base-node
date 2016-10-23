import gulp from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import eslint from 'gulp-eslint'
import ava from 'gulp-ava'
import flow from 'gulp-flowtype'

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  allLibTests: 'lib/test/**/*.test.js'
}

gulp.task('lint', () => {
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile
  ])
    .pipe(flow({ abort: true }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('build', ['lint'], () => {
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('test', ['build'], () =>
  gulp.src(paths.allLibTests)
    .pipe(ava())
)

gulp.task('main', ['test'], (callback) => {
  const cmd = '$(npm bin)/pm2 start ecosystem.json --env development'

  exec(cmd, (error, stdout) => {
    console.log(stdout)
    return callback(error)
  })
})

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
})

gulp.task('default', ['watch', 'main'])
