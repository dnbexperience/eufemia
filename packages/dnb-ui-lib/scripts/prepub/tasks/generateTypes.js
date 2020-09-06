/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import packpath from 'packpath'
import prettier from 'prettier'
import globby from 'globby'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'
import { generateFromSource } from 'react-to-typescript-definitions'
import * as babel from '@babel/core'
import { fetchPropertiesFromDocs } from './fetchPropertiesFromDocs'

export default async function generateTypes({
  globes = [
    // './src/components/number/Number.js',
    './src/components/section/Section.js',
    './src/elements/Anchor.js'

    // './src/components/**/**/*.js'
    // './src/patterns/**/**/*.js',
    // './src/fragments/**/**/*.js',
    // './src/elements/*.js'
  ]
} = {}) {
  log.start('> PrePublish: generating types')

  try {
    await asyncForEach(globes, async (globe) => {
      const files = await globby(globe)
      await createTypes(files)
    })

    log.succeed(`> PrePublish: Converting "types" is done`)
  } catch (e) {
    log.fail('Failed to run the generateTypes process')
    throw new Error(e)
  }
}

const createTypes = async (listOfAllFiles) => {
  try {
    const prettierrc = JSON.parse(
      await fs.readFile(
        path.resolve(packpath.self(), '.prettierrc'),
        'utf-8'
      )
    )

    await asyncForEach(listOfAllFiles, async (file) => {
      const basename = path.basename(file)
      const filename = basename.replace(path.extname(file), '')
      const destFile = file.replace(path.extname(file), '.d.ts')

      if (
        /^[A-Z]/.test(basename) &&
        !file.includes('__tests__') &&
        (await fileContains(file, 'PropTypes'))
      ) {
        const docs = await fetchPropertiesFromDocs({ file, filename })

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
        const { code } = await babel.transformFileAsync(file, {
          configFile: false,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                ignoreBrowserslistConfig: true,
                targets: {
                  esmodules: true
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            docs
              ? [
                  babelPluginIncludeDocs,
                  {
                    docs
                  }
                ]
              : null,
            ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-optional-chaining'
          ].filter(Boolean),
          sourceMaps: false,
          comments: true,
          ignore: ['node_modules/**']
        })

        const definitionContent = generateFromSource(filename, code, {})

        const prettyDefinitionContent = prettier.format(
          definitionContent,
          {
            ...prettierrc,
            filepath: destFile
          }
        )

        await fs.writeFile(destFile, prettyDefinitionContent)
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

const fileContains = async (file, find) =>
  (await fs.readFile(file, 'utf-8')).includes(find)

function babelPluginIncludeDocs() {
  return {
    visitor: {
      ImportDeclaration(path) {
        const root = path
        path.traverse({
          Identifier(path) {
            if (path.node.name === 'PropTypes') {
              const ImportDefaultSpecifier = path.node
              ImportDefaultSpecifier.name = '{ PropTypes }'
              path.replaceWith(ImportDefaultSpecifier)

              const StringLiteral = root.node
              StringLiteral.source.value = 'react'
              root.replaceWith(StringLiteral)
            }
          }
        })
      },

      ClassDeclaration(path, state) {
        const { docs } = state.opts
        path.traverse({
          ClassProperty(path) {
            if (path.node.key && path.node.key.name === 'propTypes') {
              path.traverse({
                ObjectProperty(path) {
                  if (path.node.key.name === 'propTypes') {
                    if (path.node.key) {
                      inserDocs(path, docs)
                    }
                  }
                }
              })
            }
          }
        })
      },

      AssignmentExpression(path, state) {
        const { docs } = state.opts
        path.traverse({
          MemberExpression(path) {
            if (
              path.node.property &&
              path.node.property.name === 'propTypes'
            ) {
              path.parentPath.traverse({
                ObjectProperty(path) {
                  if (path.node.key) {
                    inserDocs(path, docs)
                  }
                }
              })
            }
          }
        })
      }
    }
  }
}

function inserDocs(path, docs) {
  if (typeof docs[path.node.key.name] !== 'undefined') {
    const comment = docs[path.node.key.name]
    path.insertBefore(path.addComment('leading', `*\n * ${comment}\n `))
  }
}
