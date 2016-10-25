import gulp from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import eslint from 'gulp-eslint'
import ava from 'gulp-ava'
import flow from 'gulp-flowtype'

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  allLibTests: 'lib/test/**/*.test.js',
  allVueComponents: 'src/**/*.vue'
}

gulp.task('lint', () => {
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
    .pipe(flow({ abort: true }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('clean', ['lint'], (callback) => {
  const cmd = 'rm -rf ./lib ./dist'

  exec(cmd, (error, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    return callback(error)
  })
})

gulp.task('build', ['clean'], () => {
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('test', ['build'], () => {
  gulp.src(paths.allLibTests)
    .pipe(ava())
})

gulp.task('webpack', ['test'], (callback) => {
  const cmd = 'webpack --progress --color --hide-modules'

  exec(cmd, (error, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    return callback(error)
  })
})

gulp.task('main', ['webpack'], (callback) => {
  const cmd = '$(npm bin)/pm2 start ecosystem.json --env development'

  exec(cmd, (error, stdout) => {
    console.log(stdout)
    return callback(error)
  })
})

gulp.task('static', (callback) => {
  const cmd = '$(npm bin)/static -p 8081 --spa'

  exec(cmd, (error, stdout) => {
    console.log(stdout)
    return callback(error)
  })
})

gulp.task('watch', () => {
  gulp.watch([paths.allSrcJs, paths.allVueComponents], ['main'])
})

gulp.task('default', ['watch', 'main', 'static'])
