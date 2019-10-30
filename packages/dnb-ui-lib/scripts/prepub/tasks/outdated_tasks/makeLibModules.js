/**
 * Prepublish Task
 * Convert every Component/Pattern to CJS and ESM
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
      // process the following directories and files
      await runFactory('./src/components/**/*.js', opts)
      await runFactory('./src/patterns/**/*.js', opts)
      await runFactory('./src/elements/**/*.js', opts)
      await runFactory('./src/shared/**/*.js', opts)
      await runFactory('./src/web-components.js', opts)
      await runFactory('./src/index.js', opts)
      await runFactory('./src/vue.js', opts)
      log.succeed(`> PrePublish: "makeLibModules" done`)
      resolve()
    } catch (e) {
      reject(e)
    }
  })

const runFactory = (src, { preventDelete = false } = {}) =>
  new Promise(async (resolve, reject) => {
    log.start(`> PrePublish: transforming js | ${src}`)
    try {
      const files = filesExist([
        src,
        '!**/example/**',
        '!**/__tests__/**',
        '!**/*_not_in_use*/**/*',
        '!**/*_not_in_use*'
      ])

      const isFile = /[a-z]\.js$/.test(src)
      const dest = isFile
        ? ''
        : src.replace('./src/', '').replace('/**/*.js', '')

      if (!preventDelete) {
        await del(
          isFile
            ? src.replace('./src/', '')
            : [
                `./${dest}/**/*.js`,
                `./es/${dest}/**/*.js`,
                `!./${dest}/**/style`
              ]
        )
      }

      await Promise.all([
        new Promise((resolve, reject) => {
          gulp
            .src(files, {
              cwd: process.env.ROOT_DIR
            })
            .pipe(sourcemaps.init())
            .pipe(transform('utf8', transformContent))
            .pipe(babel())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`./${dest}`, { cwd: process.env.ROOT_DIR }))
            .on('end', resolve)
            .on('error', reject)
        }),
        new Promise((resolve, reject) => {
          gulp
            .src(files, {
              cwd: process.env.ROOT_DIR
            })
            .pipe(transform('utf8', transformContent))
            .pipe(
              babel({
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        esmodules: true
                      },
                      modules: false,
                      useBuiltIns: false // no polyfill
                    }
                  ]
                ]
              })
            )
            .pipe(transform('utf8', transformContentRevertForES))
            .pipe(gulp.dest(`./es/${dest}`, { cwd: process.env.ROOT_DIR }))
            .on('end', resolve)
            .on('error', reject)
        })
      ])

      resolve()
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

const transformContentRevertForES = content => {
  if (/\.min\.css/.test(content)) {
    content = content.replace(new RegExp('/(.*).min.css', 'g'), '/$1.css')
  }
  if (new RegExp('../../').test(content)) {
    content = content.replace(
      new RegExp("'../../icons/", 'g'),
      "'../../../icons/"
    )
  }
  return content
}
