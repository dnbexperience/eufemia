/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import del from 'del'
import gulp from 'gulp'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import { transform as svgr } from '@svgr/core'
import prettier from 'prettier'
import globby from 'globby'
import { iconCase } from '../../../src/components/icon/IconHelpers'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'
import { md5 } from '../../figma/helpers/docHelpers'
import {
  IconsConfig,
  readIconsLockFile,
  ICON_SIZES,
  NAME_SEPARATOR,
} from '../../figma/tasks/assetsExtractors'
import packpath from 'packpath'

const FALLBACK = 'dnb' // defines if an index file should be created
const ROOT_DIR = packpath.self()

type TransformedIcons = Array<{ name: string }>
type IconItem = { filename: string; basename: string; name: string }
type ForwardParams = {
  icons: Array<IconItem>
  destPath: string
  assetsDir: string
}

export default async function convertSvgToJsx({
  srcPath = './assets/icons/**/*.svg',
  destPath = './src/icons',
  preventDelete = false,
  customIconsLockFilePath = null,
} = {}) {
  if (!preventDelete) {
    await del(
      [
        `${destPath}/**/*.{js,ts,tsx}`,
        `!${destPath}`,
        '!**/__tests__/*',
        '!**/secondary*',
        '!**/primary*',
      ],
      {
        force: true,
      }
    )

    log.info(
      '> PrePublish: deleted all svg files before converting "svg to jsx"!'
    )
  }

  const dirs = (
    await fs.readdir(
      path.dirname(path.resolve(ROOT_DIR, srcPath, '../')),
      {
        withFileTypes: true,
      }
    )
  )
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)

  await asyncForEach(dirs, async (assetsDir) => {
    log.start(
      `> PrePublish: converting "svg to jsx" for "${assetsDir}" as started ...`
    )

    const icons: TransformedIcons = await transformSvg({
      srcPath,
      destPath,
      assetsDir,
      customIconsLockFilePath,
    })

    const sizes = Object.keys(ICON_SIZES)

    log.succeed(
      `> PrePublish: Converting "svg to jsx" for "${assetsDir}" is done (converted ${
        icons.length
      } icons with ${icons.length / sizes.length} in total)`
    )

    await controlRoutine(icons)
  })
}

const controlRoutine = async (icons: TransformedIcons) => {
  const sizes = Object.values(ICON_SIZES).filter(({ suffix }) =>
    Boolean(suffix)
  )

  sizes.forEach(({ suffix: size }) => {
    icons.forEach(({ name: origName }) => {
      const foundNames = icons.filter(({ name }) => {
        if (origName.endsWith(`${NAME_SEPARATOR}${size}`)) {
          return origName.replace(`${NAME_SEPARATOR}${size}`, '') === name
        }
        return `${origName}${NAME_SEPARATOR}${size}` === name
      })

      if (foundNames.length !== 1) {
        log.fail(
          `The icon "${origName}" was not found with another size${
            origName.endsWith(size) ? '' : ` (${size})`
          }! They should be looked up. The failure can be in several places.`
        )
      }
    })
  })
}

const transformSvg = async ({
  srcPath,
  destPath,
  assetsDir,
  customIconsLockFilePath,
}) => {
  try {
    // create subfolder
    await fs.mkdir(path.resolve(ROOT_DIR, destPath, assetsDir), {
      recursive: true,
    })

    // make sure transformSvgToReact runs first, so icons gets filled before we run makeIconsEntryFiles
    await transformSvgToReact({ srcPath, destPath })

    return await makeIconsEntryFiles({
      destPath,
      assetsDir,
      customIconsLockFilePath,
    })
  } catch (e) {
    log.fail('Failed to run the convertSvgToJsx process')
    throw new Error(e)
  }
}

const transformSvgToReact = ({ srcPath, destPath }) => {
  return new Promise((resolve, reject) => {
    try {
      gulp
        .src(srcPath, { cwd: ROOT_DIR })
        .pipe(transform('utf8' as gulp.Encoding, transformToJsx))
        .pipe(
          rename((path) => {
            path.extname = '.tsx'
          })
        )
        .pipe(gulp.dest(destPath, { cwd: ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })
}

const transformToJsx = (content, file): PromiseLike<string> => {
  if (String(content).trim().length === 0) {
    fs.unlinkSync(file.path)
    return Promise.resolve('')
  }

  const basename = path.basename(file.path)
  const filename = basename.replace(path.extname(file.path), '')
  const componentName = iconCase(filename)

  try {
    content = content.replace(
      /clip[0-9]+/g,
      `clip-${md5(filename).substring(0, 6)}`
    )
    return new Promise((resolve, reject) =>
      svgr(
        content,
        {
          icon: false, // do not use "1em"

          /**
           * Do not include "'@svgr/plugin-svgo'" here – because we did run ut in assetsExtractors (optimizeSVG) already
           * Also, the SVGO Plugin "prefixIds" does not work properly, as it not gets the filename, so it uses "prefix" as its prefix name:
           * https://github.com/svg/svgo/blob/main/plugins/prefixIds.js#L95
           */
          plugins: ['@svgr/plugin-jsx'],
        },
        { componentName }
      )
        .then(async (res) => {
          log.info(`> PrePublish: Icon was converted: ${basename}`)
          resolve(
            '/** This file is auto generated by convertSvgToJsx.ts */\n\n' +
              (
                await prettier.format(res, {
                  ...prettierrc,
                  parser: 'babel',
                })
              )
                // This is a fix, so the Rollup ESM export does export React.createElement, and not only createElement with a named import
                .replace(
                  new RegExp(`import \\* as React from 'react'`, 'g'),
                  `import React from 'react'`
                )
          )
        })
        .catch(reject)
    )
  } catch (e) {
    log.fail(
      `> PrePublish: convertSvgToJsx conversion of "${basename}" failed`
    )
    throw e
  }
}

const makeIconsEntryFiles = async ({
  destPath,
  assetsDir,
  customIconsLockFilePath = null,
}) => {
  // get all the svg icons we find
  const icons: Array<IconItem> = (
    await globby([
      path.resolve(destPath, assetsDir, '*.tsx'),
      '!**/index*',
      '!**/__tests__/*',
      '!**/icons-meta*',
      '!**/icons-svg*',
      '!**/secondary*',
      '!**/primary*',
    ])
  )
    .map((file) => {
      const basename = path.basename(file)
      const filename = basename.replace(path.extname(file), '')
      const name = iconCase(filename)

      return {
        name,
        filename,
        basename,
      }
    })
    .sort(({ name: a }, { name: b }) => (a > b ? 1 : -1))

  if (assetsDir === FALLBACK) {
    await generateFallbackIndexFiles({ icons, destPath, assetsDir })
  }

  if (assetsDir === FALLBACK) {
    await generateIndexFile({ icons, destPath, assetsDir: '' }) // generate fallback index file
  }

  await generateIndexFile({ icons, destPath, assetsDir })
  await generateGroupFiles({
    destPath,
    assetsDir,
    customIconsLockFilePath,
  })

  return icons
}

const generateIndexFile = async ({
  icons,
  destPath,
  assetsDir,
}: ForwardParams) => {
  // the index.ts file will contain "all icons"
  // even the ones which don't exists in the lock file
  // this is in contrast to the "groups", they will only contain the icons, dedicated to the current figma document
  const _imports = icons
    .map(
      ({ name, filename }) =>
        `import ${name} from '.${
          assetsDir === '' ? `/${FALLBACK}` : ''
        }/${filename}'`
    )
    .join('\n')
  const _keys = icons.map(({ name }) => name).join(', ')

  const indexContent = await prettier.format(
    `/** This file is auto generated by convertSvgToJsx.ts */

      ${_imports}

      export { ${_keys} }
  `,
    {
      ...prettierrc,
      parser: 'babel',
    }
  )

  try {
    const indexFile = path.resolve(
      ROOT_DIR,
      destPath,
      assetsDir,
      `index.ts`
    )

    await fs.writeFile(indexFile, indexContent)
  } catch (e) {
    throw new Error(e)
  }
}

const generateGroupFiles = async ({
  destPath,
  assetsDir,
  customIconsLockFilePath,
}: Partial<ForwardParams> & { customIconsLockFilePath: string }) => {
  // get the svg lock file
  const { iconsLockFile } = IconsConfig({ assetsDir })
  const lockFileContent: Record<string, { bundleName: string }> =
    await readIconsLockFile({
      file: customIconsLockFilePath || iconsLockFile,
    })

  // from the svg lock file we can generate groups out of the "bundleName"
  const groups: Record<string, Array<IconItem>> = Object.entries(
    lockFileContent
  ).reduce((acc, [file, { bundleName }]) => {
    acc[bundleName] = acc[bundleName] || []
    const basename = path.basename(file)
    const filename = basename.replace(path.extname(file), '')
    const filePath = path.resolve(
      ROOT_DIR,
      destPath,
      assetsDir,
      `${filename}.tsx`
    )

    // make sure the file actually exists
    if (fs.existsSync(filePath)) {
      acc[bundleName].push({
        filename,
        basename,
        name: iconCase(filename),
      })
    } else {
      log.fail(`The file "${filePath}" did not exist!`)
    }

    return acc
  }, {})

  try {
    await asyncForEach(
      Object.entries(groups),
      async ([groupName, entries]) => {
        entries = entries.sort(({ name: a }, { name: b }) =>
          a > b ? 1 : -1
        )
        const groupFile = path.resolve(
          ROOT_DIR,
          destPath,
          assetsDir,
          `${groupName}.ts`
        )

        const _imports = entries
          .map(
            ({ name, filename }) => `import ${name} from './${filename}'`
          )
          .join('\n')
        const _keys = entries.map(({ name }) => name).join(', ')

        const groupFileContent = await prettier.format(
          `/** This file is auto generated by convertSvgToJsx.ts */

            ${_imports}

            export { ${_keys} }
          `,
          {
            ...prettierrc,
            parser: 'babel',
          }
        )

        await fs.writeFile(groupFile, groupFileContent)
      }
    )
  } catch (e) {
    throw new Error(e)
  }
}

const generateFallbackIndexFiles = async ({
  icons,
  destPath,
  assetsDir,
}: ForwardParams) => {
  try {
    await asyncForEach(Object.entries(icons), async ([, { filename }]) => {
      const indexFileContent = await prettier.format(
        `/** This file is auto generated by convertSvgToJsx.ts */
                
            import icon from './${assetsDir}/${filename}'
            export default icon
            `,
        {
          ...prettierrc,
          parser: 'babel',
        }
      )

      const indexFile = path.resolve(ROOT_DIR, destPath, `${filename}.ts`)

      await fs.writeFile(indexFile, indexFileContent)
    })
  } catch (e) {
    throw new Error(e)
  }
}

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)
