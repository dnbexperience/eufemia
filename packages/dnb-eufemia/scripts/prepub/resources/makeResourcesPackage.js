/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import transform from 'gulp-transform'
import { log } from '../../lib'
import path from 'path'
import fs from 'fs-extra'
import { create } from 'tar'
import packpath from 'packpath'

const ROOT_DIR = packpath.self()

export default async function makeResourcesPackage() {
  try {
    await copyStylePackages()
    await copyFonts()
    await copyBrowser()
    await copyUMD()
    await createReadMe()
    await createTar()
    await cleanup()
    log.succeed('> PrePublish: "makeResourcesPackage" succeed!')
  } catch (e) {
    log.fail(e.message)
  }
}

const copyStylePackages = (
  src = './build/style/**/*.css',
  { returnResult = false } = {}
) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: copy style resources')
    try {
      gulp
        .src(src, {
          cwd: ROOT_DIR
        })
        .pipe(transform('utf8', transformPaths('/assets/', '/resources/')))
        .pipe(
          returnResult
            ? transform('utf8', (result) => resolve(result))
            : gulp.dest('./dnb-ui-resources/style', {
                cwd: ROOT_DIR
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
          cwd: ROOT_DIR
        })
        .pipe(
          gulp.dest('./dnb-ui-resources/resources/fonts', {
            cwd: ROOT_DIR
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
          cwd: ROOT_DIR
        })
        .pipe(
          gulp.dest('./dnb-ui-resources/resources/browser', {
            cwd: ROOT_DIR
          })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const copyUMD = (
  src = ['./build/umd/*', '../../node_modules/react/umd/*']
) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: copy UMD resources')
    try {
      gulp
        .src(src, {
          cwd: ROOT_DIR
        })
        .pipe(
          gulp.dest('./dnb-ui-resources/umd', {
            cwd: ROOT_DIR
          })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const createReadMe = async () => {
  log.start('> PrePublish: write README.md to resources')
  await fs.writeFile(
    'dnb-ui-resources/README.md',
    `# DNB Design System (Eufemia)

This file contains parts of the Eufemia Design System to use in a dedicated and less flexible environment.
Instead of using the assets folder, the path to the \`assets\` directory is called \`resources\`.

To make usage of the content, copy the \`style\`, \`umd\` and \`resources\` folders in the right places.

For documentation, visit: https://eufemia.dnb.no/

License: Apache 2.0 with Commons Clause
`
  )
}

const createTar = async () => {
  log.start('> PrePublish: create tar file in resources')

  const distPath = path.resolve(__dirname, '../../../build/dist')
  if (!fs.existsSync(distPath)) {
    await fs.mkdir(distPath)
  }

  await create(
    {
      gzip: true,
      file: path.resolve(distPath, 'dnb-ui-resources.tgz')
    },
    ['./dnb-ui-resources']
  )
}

const cleanup = async () => {
  log.start('> PrePublish: cleanup resources')
  await fs.remove(path.resolve(__dirname, '../../../dnb-ui-resources'))
}

const transformPaths = (from, to) => (content) =>
  content.replace(new RegExp(from, 'g'), to)

makeResourcesPackage()
