/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import globby from 'globby'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'
import { generateFromSource } from 'react-to-typescript-definitions'
import * as babel from '@babel/core'
import { fetchPropertiesFromDocs } from './fetchPropertiesFromDocs'

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
  log.start('> PrePublish: generating types')

  try {
    const files = await globby(paths)
    await createTypes(files)

    log.succeed(`> PrePublish: Converting "types" is done`)
  } catch (e) {
    log.fail('Failed to run the generateTypes process')
    throw new Error(e)
  }
}

const createTypes = async (listOfAllFiles) => {
  try {
    await asyncForEach(listOfAllFiles, async (file) => {
      const basename = path.basename(file)
      const destFile = file.replace(path.extname(file), '.d.ts')

      if (file.includes('__tests__')) {
        return
      }

      if (
        /^index/.test(basename) ||
        (/^[A-Z]/.test(basename) &&
          !(await fileContains(file, 'propTypes')))
      ) {
        if (!(await fs.exists(destFile))) {
          await fs.copyFile(file, destFile)
        }
      } else if (
        (/^[A-Z]/.test(basename) &&
          (await fileContains(file, 'propTypes'))) ||
        file.includes('src/icons/')
      ) {
        const docs = await fetchPropertiesFromDocs({ file })

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

        if (await fs.exists(destFile)) {
          const { code } = await babel.transformFileAsync(destFile, {
            configFile: false,
            plugins: [
              docs
                ? [
                    babelPluginPrepareAST,
                    {
                      docs
                    }
                  ]
                : null,
              ['@babel/plugin-syntax-typescript', {}]
            ].filter(Boolean),
            sourceMaps: false,
            comments: true,
            ignore: ['node_modules/**']
          })

          definitionContent = code
        } else {
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
                    babelPluginPrepareAST,
                    {
                      docs,
                      /**
                       * If strictMode is enabled,
                       * it will transform "string + bool" or "string + number" in to string or bool only
                       */
                      strictMode: true
                    }
                  ]
                : null,
              [
                '@babel/plugin-proposal-object-rest-spread',
                { loose: true }
              ],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-optional-chaining'
            ].filter(Boolean),
            sourceMaps: false,
            comments: true,
            ignore: ['node_modules/**']
          })

          /**
           * Note: Before we have send in "filename" as the first argument of generateFromSource
           * Like so: const filename = basename.replace(path.extname(file), '')
           * But this creates the 'declare module' which created trouobles
           */
          definitionContent = generateFromSource(null, code)
        }

        await fs.writeFile(destFile, definitionContent)
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

const fileContains = async (file, find) =>
  (await fs.readFile(file, 'utf-8')).includes(find)

function babelPluginPrepareAST() {
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

      ModuleDeclaration(path, state) {
        const { docs } = state.opts
        path.traverse({
          Identifier(path) {
            if (path.parent.type === 'TSInterfaceDeclaration') {
              if (!path.parentPath.parentPath.node.leadingComments) {
                path.parentPath.parentPath.insertBefore(
                  path.parentPath.parentPath.addComment(
                    'leading',
                    `*\n * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".\n `
                  )
                )
              }
            }
            if (path.parent.type === 'TSPropertySignature') {
              if (path.node.name) {
                path.parent.trailingComments = null
                path.parent.leadingComments = null
                inserDocs(path, path.node.name, docs)
              }
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
                      inserDocs(path, path.node.key.name, docs)
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
                    inserDocs(path, path.node.key.name, docs)
                  }
                }
              })
            }
          }
        })
      },

      ObjectProperty(path, state) {
        if (state.opts.strictMode) {
          path.traverse({
            MemberExpression(path) {
              const pathToReplace = path.parentPath

              if (path.node.property.name === 'oneOfType') {
                const collection = []
                let nodeToUse = null

                path.parentPath.traverse({
                  MemberExpression(path) {
                    if (path.node.property.name !== 'oneOfType') {
                      collection.push(path.node.property.name)
                    }
                    if (path.node.property.name !== 'string') {
                      nodeToUse = path.node
                    }
                  }
                })

                if (
                  nodeToUse &&
                  collection.length === 2 &&
                  collection.includes('string') &&
                  (collection.includes('bool') ||
                    collection.includes('number'))
                ) {
                  pathToReplace.replaceWith(nodeToUse)
                }
              }
            }
          })
        }
      }
    }
  }
}

function inserDocs(path, name, docs) {
  if (typeof docs[name] !== 'undefined') {
    const comment = docs[name]
    path.insertBefore(path.addComment('leading', `*\n * ${comment}\n `))
  }
}
