/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import nodePath from 'path'
import globby from 'globby'
import prettier from 'prettier'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'
import { generateFromSource } from 'react-to-typescript-definitions'
import { transformFileAsync, transformAsync } from '@babel/core'

import { fetchPropertiesFromDocs } from './generateTypes/fetchPropertiesFromDocs'
import { babelPluginConfigDefaults } from './generateTypes/babelPluginConfigDefaults'
import { babelPluginCorrectTypes } from './generateTypes/babelPluginCorrectTypes'
import { babelPluginExtendTypes } from './generateTypes/babelPluginExtendTypes'
import { babelPluginIncludeDocs } from './generateTypes/babelPluginIncludeDocs'
import { babelPluginPropTypesRelations } from './generateTypes/babelPluginPropTypesRelations'

export default async function generateTypes({
  paths = [
    './src/*.js',
    './src/**/*.js',
    '!**/__tests__',
    '!./src/esm/',
    '!./src/cjs/',
    '!./src/umd/',
    '!./src/style/',
    '!./src/**/web-component.js',
    '!./src/**/web-components.js'
  ]
} = {}) {
  if (process.env.NODE_ENV !== 'test') {
    log.start('> PrePublish: generating types')
  }

  try {
    const files = await globby(paths)
    await createTypes(files, { includeSpecialDirs: true })

    log.succeed(`> PrePublish: Converting "types" is done`)
  } catch (e) {
    log.fail('Failed to run the generateTypes process')
    throw new Error(e)
  }
}

export const createTypes = async (
  listOfAllFiles,
  { isTest = false, ...opts } = {}
) => {
  try {
    const prettierrc = await prettier.resolveConfig()
    prettierrc.semi = true
    prettierrc.trailingComma = 'none'

    return await asyncForEach(listOfAllFiles, async (file) => {
      if (!isTest && file.includes('__tests__')) {
        return // stop here
      }

      // For dev (build:types:dev) mode only
      const isDev = process.env.npm_config_argv.includes('build:types:dev')
      const isOfInterest =
        // file.includes('/Element.js') ||
        // file.includes('/Blockquote.js') ||
        // file.includes('/Button.js') ||
        file.includes('/Tabs')
      if (isDev && !isOfInterest) {
        return // stop here
      }

      const basename = nodePath.basename(file)
      const destFile = file.replace(nodePath.extname(file), '.d.ts')
      const sourceDir = nodePath.dirname(file)

      if (/^index/.test(basename)) {
        if (!fs.existsSync(destFile)) {
          await fs.copyFile(file, destFile)
        }
      } else if (
        /^[A-Z]/.test(basename) &&
        (await fileContains(file, 'propTypes'))
      ) {
        const docs = await fetchPropertiesFromDocs({
          file,
          ...opts
        })

        let definitionContent

        /**
         * 1. Why do we use babel here?
         *    Because some components uses optional-chaining,
         *    and that is not supported in Node v10.
         *
         * 2. Why do we use our own babel config?
         *    Because we do not need to convert to cjs etc.
         *
         * 3. More fun we can do?
         *    Yes, babel does export an AST -> const { code, ast } =
         *    with that we can easily extract/use interesting parts,
         *    like special comments/definition we may need to customize our generated type definitions.
         */

        if (!isDev && fs.existsSync(destFile)) {
          const { code } = await transformFileAsync(destFile, {
            plugins: [
              ['@babel/plugin-syntax-typescript', {}],
              [
                babelPluginIncludeDocs,
                {
                  docs
                }
              ]
            ],
            ...babelPluginConfigDefaults
          })

          definitionContent = code
        } else {
          const { code } = await transformFileAsync(file, {
            presets: ['@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-optional-chaining',
              [babelPluginPropTypesRelations, { sourceDir }],
              [
                babelPluginCorrectTypes,
                {
                  /**
                   * If strictMode is enabled,
                   * it will transform "string + bool" or "string + number" in to string or bool only
                   */
                  strictMode: true
                }
              ],
              [
                babelPluginIncludeDocs,
                {
                  docs
                }
              ]
            ],
            ...babelPluginConfigDefaults
          })

          /**
           * Note: Before we have send in "filename" as the first argument of generateFromSource
           * Like so: const filename = basename.replace(path.extname(file), '')
           * But this creates the 'declare module' which created trouobles
           */
          const generatedCode = generateFromSource(null, code)

          // Process the TS code from now on
          const { code: codeWithTransformedTypes } = await transformAsync(
            generatedCode,
            {
              filename: destFile,
              plugins: [
                ['@babel/plugin-syntax-typescript', { isTSX: true }],
                [
                  babelPluginExtendTypes,
                  {
                    componentName: basename.replace(
                      nodePath.extname(file),
                      'Props'
                    ),
                    addDefaultPropsTypeAnnotation: code.includes(
                      'defaultProps'
                    ) // Because they are available
                  }
                ]
              ],
              ...babelPluginConfigDefaults
            }
          )

          definitionContent = codeWithTransformedTypes
        }

        definitionContent = prettier.format(definitionContent, {
          ...prettierrc,
          filepath: destFile
        })

        if (isTest) {
          return { destFile, definitionContent }
        } else {
          await fs.writeFile(destFile, definitionContent)
        }
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

const fileContains = async (file, find) =>
  (await fs.readFile(file, 'utf-8')).includes(find)
