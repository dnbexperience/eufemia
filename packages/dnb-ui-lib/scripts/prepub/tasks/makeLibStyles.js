/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
// import jsonImporter from 'node-sass-json-importer'
import cssnano from 'gulp-cssnano'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import { log } from '../../lib'

export default () =>
  new Promise(async (resolve, reject) => {
    log.text = '> PrePublish: converting sass to css'

    try {
      await runFactory('./src/components/**/style/dnb-*.scss')
      await runFactory('./src/patterns/**/style/dnb-*.scss')
      log.succeed(
        `> PrePublish: "makeLibStyles" converting sass to css done`
      )
      resolve()
    } catch (e) {
      reject(e)
    }
  })

export const runFactory = (src, { returnResult = false } = {}) =>
  new Promise(async (resolve, reject) => {
    log.start(`> PrePublish: converting sass to css | ${src}`)

    try {
      // do not use 'node-sass-json-importer' here! Every file needs the same core imports over and over again.
      const sassStream = sass().on('error', sass.logError)
      const cloneSink = clone.sink()
      const dest = src.replace('./src/', '').split('/**/')[0]
      const files = [src, '!**/__tests__/**', '!**/*_not_in_use*/**/*']

      const stream = gulp
        .src(files, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(sassStream)
        .pipe(transform('utf8', transformContent))
        .pipe(
          postcss([
            autoprefixer({
              browsers: ['last 2 versions', 'explorer >= 11']
            })
          ])
        )
        .pipe(cloneSink)
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())

        .pipe(
          returnResult
            ? transform('utf8', result => resolve(result))
            : gulp.dest(`./${dest}/`, { cwd: process.env.ROOT_DIR })
        )
        .on('end', resolve)
        .on('error', reject)

      if (!returnResult)
        stream.pipe(
          gulp.dest(`./es/${dest}/`, { cwd: process.env.ROOT_DIR })
        )
    } catch (e) {
      console.debug('reject', e)
      reject(e)
    }
  })

const transformContent = (content, file) => {
  log.text = `> PrePublish: converting sass to css | ${file.path}`
  return content.replace(
    new RegExp('../../../../assets/', 'g'),
    '../../../assets/'
  )
}
