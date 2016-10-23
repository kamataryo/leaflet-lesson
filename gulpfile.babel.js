import gulp       from 'gulp'
import ejs        from 'gulp-ejs'
import rename     from 'gulp-rename'
import browserify from 'browserify'
import babelify   from 'babelify'
import source     from 'vinyl-source-stream'
import fs         from 'fs'
import conf from './src/pages.json'

gulp.task('pagenate', () => {
  fs.readdir('./src/', (err, files) => {
    files.forEach((file) => {
      const matched = file.match(/^render\-(.*)\.js$/i)
      if (matched && matched[1] !== 'sample') {
        gulp.src('./src/index.html.ejs')
          .pipe(ejs(conf[matched[1]]))
          .pipe(rename((path) => {
            path.basename = 'index'
            path.extname = '.html'
          }))
          .pipe(gulp.dest(`./dest/${matched[1]}`))

        gulp.src('./src/*.js')
          .pipe(rename((path) => {
            if (`${path.basename}${path.extname}` === matched[0]) {
              path.basename = 'render'
            }
          }))
          .pipe(gulp.dest(`./dest/${matched[1]}`))
      }
    })
  })
})

gulp.task('browserify', () => {
  fs.readdir('./dest/', (err, folders) => {
    folders.forEach((folder) => {
      browserify({
        entries: [`./dest/${folder}/`]
      })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(`./dest/${folder}/`))
    })
  })
})

gulp.task('afterAll', () => {
  fs.readdir('./dest/', (err, folders) => {
    folders.forEach((folder) => {
      fs.readdir(`./dest/${folder}/`, (err, files) => {
        files.forEach((file) => {
          if (file !== 'app.js' && file !== 'index.html') {
            fs.unlink(`./dest/${folder}/${file}`)
          }
        })
      })
    })
  })
})
