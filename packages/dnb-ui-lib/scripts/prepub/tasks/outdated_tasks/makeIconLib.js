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
      log.start('> PrePublish: start transforming icons')
      await runFactory(opts)
      log.succeed('> PrePublish: "makeIconLib" transforming icons is done')
      resolve()
    } catch (e) {
      reject(e)
    }
  })

const runFactory = ({ preventDelete = false } = {}) =>
  new Promise(async (resolve, reject) => {
    if (!preventDelete) {
      await del([`./icons/**`, `./es/icons/**`])
    }
    try {
      await Promise.all([
        new Promise((resolve, reject) => {
          gulp
            .src(
              filesExist([`./src/icons/**/*.js`, '!**/*_not_in_use*']),
              {
                cwd: process.env.ROOT_DIR
              }
            )
            .pipe(transform('utf8', transformContent))
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(`./icons`, { cwd: process.env.ROOT_DIR }))
            .on('end', resolve)
            .on('error', reject)
        }),
        new Promise((resolve, reject) => {
          gulp
            .src(
              filesExist([`./src/icons/**/*.js`, '!**/*_not_in_use*']),
              {
                cwd: process.env.ROOT_DIR
              }
            )
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
            .pipe(gulp.dest(`./es/icons`, { cwd: process.env.ROOT_DIR }))
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
  log.text = `> PrePublish: transforming icons | ${file.path}`
  return content
}
