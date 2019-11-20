/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import transform from 'gulp-transform'
import { log } from '../../lib'
import fs from 'fs-extra'

export default async function makeResourcesPackage() {
  await copyStylePackages()
  await copyFonts()
  await copyBrowser()
  await copyUMD()
  await createReadMe()
  log.succeed('> PrePublish: "makeResourcesPackage" succeed!')
}

const copyStylePackages = (
  src = './style/**/*.css',
  { returnResult = false } = {}
) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: copy style resources')
    try {
      gulp
        .src(src, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(transform('utf8', transformPaths('/assets/', '/resources/')))
        .pipe(
          returnResult
            ? transform('utf8', result => resolve(result))
            : gulp.dest('./dnb-ui-resources/style', {
                cwd: process.env.ROOT_DIR
              })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const copyFonts = (src = ['./assets/fonts/*', '!./assets/fonts/*.zip']) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: copy fonts resources')
    try {
      gulp
        .src(src, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(
          gulp.dest('./dnb-ui-resources/resources/fonts', {
            cwd: process.env.ROOT_DIR
          })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const copyBrowser = (
  src = ['./assets/browser/*', '!./assets/browser/*.zip']
) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: copy browser resources')
    try {
      gulp
        .src(src, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(
          gulp.dest('./dnb-ui-resources/resources/browser', {
            cwd: process.env.ROOT_DIR
          })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const copyUMD = (src = ['./umd/*', '../../node_modules/react/umd/*']) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: copy UMD resources')
    try {
      gulp
        .src(src, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(
          gulp.dest('./dnb-ui-resources/umd', {
            cwd: process.env.ROOT_DIR
          })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const createReadMe = () => {
  fs.writeFile(
    'dnb-ui-resources/README.md',
    `# Eufemia

This file contains parts of the Eufemia Design System to use in a dedicated and less flexible environment.
Instead of using the assets folder, the path to the \`assets\` directory is called \`resources\`.

To make usage of the content, copy the \`style\`, \`umd\` and \`resources\` folders in the right places.

For documentation, visit: https://eufemia.dnb.no/

`
  )
}

const transformPaths = (from, to) => content =>
  content.replace(new RegExp(from, 'g'), to)

makeResourcesPackage()
