/**
 * Prepublish Task
 *
 */

import { log } from '../../lib'
import path from 'path'
import fs from 'fs-extra'
import globby from 'globby'
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

const transformPaths = (from, to) => (content) =>
  content.replace(new RegExp(from, 'g'), to)

const copyStylePackages = async (
  src = './build/style/**/*.css',
  { returnResult = false } = {}
) => {
  log.start('> PrePublish: copy style resources')

  const files = await globby(src, { cwd: ROOT_DIR })

  for (const filePath of files) {
    const absolutePath = path.resolve(ROOT_DIR, filePath)
    const content = await fs.readFile(absolutePath, 'utf-8')
    const transformed = transformPaths('/assets/', '/resources/')(content)

    if (returnResult) {
      return transformed
    }

    const relativePath = path.relative(
      path.resolve(ROOT_DIR, 'build/style'),
      absolutePath
    )
    const destPath = path.resolve(
      ROOT_DIR,
      'dnb-ui-resources/style',
      relativePath
    )
    await fs.outputFile(destPath, transformed)
  }
}

const copyFiles = async (src, destDir) => {
  const files = await globby(src, { cwd: ROOT_DIR })

  for (const filePath of files) {
    const absolutePath = path.resolve(ROOT_DIR, filePath)
    const basename = path.basename(absolutePath)
    const destPath = path.resolve(ROOT_DIR, destDir, basename)
    await fs.copy(absolutePath, destPath)
  }
}

const copyFonts = async (
  src = ['./assets/fonts/dnb/*', '!./assets/fonts/dnb/*.zip']
) => {
  log.start('> PrePublish: copy fonts resources')
  await copyFiles(src, 'dnb-ui-resources/resources/fonts')
}

const copyBrowser = async (
  src = ['./assets/browser/*', '!./assets/browser/*.zip']
) => {
  log.start('> PrePublish: copy browser resources')
  await copyFiles(src, 'dnb-ui-resources/resources/browser')
}

const copyUMD = async (
  src = ['./build/umd/*', '../../node_modules/react/umd/*']
) => {
  log.start('> PrePublish: copy UMD resources')
  await copyFiles(src, 'dnb-ui-resources/umd')
}

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
      file: path.resolve(distPath, 'dnb-ui-resources.tgz'),
    },
    ['./dnb-ui-resources']
  )
}

const cleanup = async () => {
  log.start('> PrePublish: cleanup resources')
  await fs.remove(path.resolve(__dirname, '../../../dnb-ui-resources'))
}

makeResourcesPackage()
