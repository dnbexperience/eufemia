/**
 * Prepublish Task
 *
 */

import sass from 'sass'
import fs from 'fs-extra'
import path from 'path'
import { log } from '../../lib'
import globby from 'globby'
import { asyncForEach } from '../../tools/index'
import packpath from 'packpath'
import {
  transformSass,
  transformPaths,
  transformPostcss,
  transformCssnano,
} from './transformUtils'
import postcssIsolatePlugin from '../../../src/plugins/postcss-isolated-style-scope'
import postcssFontUrlRewritePlugin from '../../../src/plugins/postcss-font-url-rewrite'
import { enableBuildStyleScope } from '../../../src/plugins/postcss-isolated-style-scope/config'
import { getFontBasePath } from '../../../src/plugins/postcss-font-url-rewrite/config'

// import the post css config
import postcssConfig from '../config/postcssConfig'

const ROOT_DIR = packpath.self()

export default async function makeMainStyle() {
  // info: use this approach to process files because:
  // this way we avoid cross "includePaths" and the result is:
  // Now a custom theme can overwrite existing CSS Custom Properties
  const listWithThemesToProcess = await globby(
    './src/style/themes/*/*-theme-*.scss'
  )
  await asyncForEach(listWithThemesToProcess, async (themeFile) => {
    // in order to keep the folder structure, we have to add these asterisks
    themeFile = themeFile.replace('/style/themes/', '/style/**/themes/')
    await runFactory(themeFile)
  })

  const listWithPackagesToProcess = await globby(
    './src/style/**/*-ui-*.scss'
  )
  await asyncForEach(listWithPackagesToProcess, async (packageFile) => {
    // in order to keep the folder structure, we have to add these asterisks
    packageFile = packageFile.replace('/style/', '/style/**/')
    await runFactory(packageFile)
  })

  log.succeed(
    '> PrePublish: "makeMainStyle" transforming style modules done'
  )
}

type RunFactoryOptions = {
  returnResult?: boolean
  returnFiles?: boolean
}

export const runFactory = async (
  src: string,
  { returnResult = false, returnFiles = false }: RunFactoryOptions = {}
): Promise<string[] | undefined> => {
  log.start('> PrePublish: transforming main style')

  const sassTransform = transformSass()
  const postcssTransform = transformPostcss(postcssConfig({ sass }))
  const cssnanoTransform = transformCssnano({ reduceIdents: false })
  const pathsTransform = transformPaths('../../assets/', '../assets/')

  const files = await globby(src, { cwd: ROOT_DIR })

  const collectedEntries: Array<{ path: string; result: string }> = []

  for (const filePath of files) {
    const absolutePath = path.resolve(ROOT_DIR, filePath)
    const content = await fs.readFile(absolutePath, 'utf-8')

    // Transform SASS → CSS
    const cssContent = sassTransform(content, { path: absolutePath })
    const cssPath = absolutePath.replace(/\.scss$/, '.css')

    // Branch 1: base (postcss processed)
    const baseContent = await postcssTransform(cssContent, {
      path: cssPath,
    })
    const baseResult = pathsTransform(baseContent)
    collectedEntries.push({ path: cssPath, result: baseResult })

    // Branch 2: base minified
    const baseMinContent = await cssnanoTransform(baseContent, {
      path: cssPath,
    })
    const minPath = cssPath.replace(/\.css$/, '.min.css')
    const baseMinResult = pathsTransform(baseMinContent)
    collectedEntries.push({ path: minPath, result: baseMinResult })

    // Branch 3 & 4: scoped styles (if enabled)
    if (enableBuildStyleScope()) {
      const scopedPostcssTransform = transformPostcss(
        postcssConfig(
          { sass },
          {
            plugins: [
              postcssIsolatePlugin({
                verbose: true,
              }),
              postcssFontUrlRewritePlugin({
                basePath: getFontBasePath(),
                verbose: true,
              }),
            ],
          }
        )
      )

      const scopedContent = await scopedPostcssTransform(cssContent, {
        path: cssPath,
      })
      const scopedPath = cssPath.replace(/\.css$/, '--isolated.css')
      const scopedResult = pathsTransform(scopedContent)
      collectedEntries.push({ path: scopedPath, result: scopedResult })

      const scopedMinContent = await cssnanoTransform(scopedContent, {
        path: cssPath,
      })
      const scopedMinPath = cssPath.replace(/\.css$/, '--isolated.min.css')
      const scopedMinResult = pathsTransform(scopedMinContent)
      collectedEntries.push({
        path: scopedMinPath,
        result: scopedMinResult,
      })
    }
  }

  const sorted = collectedEntries
    .slice()
    .sort((a, b) => a.path.localeCompare(b.path))

  if (returnFiles) {
    return sorted.map((entry) => entry.path)
  }

  if (returnResult) {
    return sorted.map((entry) => entry.result)
  }

  // Write files to build/style
  for (const entry of sorted) {
    const relativePath = path.relative(
      path.resolve(ROOT_DIR, 'src'),
      entry.path
    )
    const destPath = path.resolve(ROOT_DIR, 'build', relativePath)
    await fs.outputFile(destPath, entry.result)
  }

  return undefined
}
