/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import del from 'del'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import transform from 'gulp-transform'
import filesExist from 'files-exist'
import { log } from '../../lib'

export default opts =>
  new Promise(async (resolve, reject) => {
    try {
      // process the following directories
      await runFactory('components', opts)
      await runFactory('patterns', opts)
      await runFactory('shared', opts)
      await transformIndex()
      resolve()
    } catch (e) {
      reject(e)
    }
  })

const runFactory = (type, { preventDelete = false } = {}) =>
  new Promise(async (resolve, reject) => {
    if (!preventDelete) {
      await del([`./${type}/**/*.js`, `!./${type}/**/style`])
    }
    log.text = `> PrePublish: transforming js | ${type}`
    try {
      gulp
        .src(
          filesExist([
            `./src/${type}/**/*.js`,
            '!**/__tests__/**',
            '!**/example/**',
            '!**/*_not_in_use*'
          ]),
          {
            cwd: process.env.ROOT_DIR
          }
        )
        .pipe(sourcemaps.init())
        .pipe(transform('utf8', transformContent))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`./${type}`, { cwd: process.env.ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const transformContent = (content, file) => {
  log.text = `> PrePublish: transforming js | ${file.path}`
  if (/\/style/.test(file.path)) {
    content = content.replace(
      new RegExp('./(.*).scss', 'g'),
      './$1.min.css'
    )
  } else if (/\.scss/.test(content)) {
    content = content.replace(new RegExp('/(.*).scss', 'g'), '/$1.min.css')
  }
  return content
}

const transformIndex = () =>
  new Promise(async (resolve, reject) => {
    log.text = '> PrePublish: transforming lib index and web-components'
    try {
      await gulp
        .src(filesExist('./src/index.js'), {
          cwd: process.env.ROOT_DIR
        })
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./', { cwd: process.env.ROOT_DIR }))
        .on('error', reject)

      await gulp
        .src(filesExist('./src/web-components/**/*.js'), {
          cwd: process.env.ROOT_DIR
        })
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./web-components', { cwd: process.env.ROOT_DIR }))
        .on('error', reject)

      resolve()
    } catch (e) {
      reject(e)
    }
  })
