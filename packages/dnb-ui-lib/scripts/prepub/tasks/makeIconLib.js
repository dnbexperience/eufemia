/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import del from 'del'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import filesExist from 'files-exist'
import transform from 'gulp-transform'
import { log } from '../../lib'

export default opts =>
  new Promise(async (resolve, reject) => {
    try {
      await runFactory(opts)
      resolve()
    } catch (e) {
      reject(e)
    }
  })

const runFactory = ({ preventDelete = false } = {}) =>
  new Promise(async (resolve, reject) => {
    if (!preventDelete) {
      await del([`./icons/**`])
    }
    log.text = '> PrePublish: transforming icons'
    try {
      gulp
        .src(filesExist([`./src/icons/**/*.js`, '!**/*_not_in_use*']), {
          cwd: process.env.ROOT_DIR
        })
        .pipe(transform('utf8', transformContent))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(`./icons`, { cwd: process.env.ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const transformContent = (content, file) => {
  log.text = `> PrePublish: transforming icons | ${file.path}`
  return content
}
