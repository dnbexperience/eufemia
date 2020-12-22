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
import { transformFileAsync, transformSync } from '@babel/core'
import { fetchPropertiesFromDocs } from './fetchPropertiesFromDocs'

const nodePath = path

export const babelPluginDefaults = {
  configFile: false,
  sourceMaps: false,
  comments: true,
  ignore: ['node_modules/**'],
  presets: ['@babel/preset-react']
}

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
    return await asyncForEach(listOfAllFiles, async (file) => {
      if (!isTest && file.includes('__tests__')) {
        return // stop here
      }

      // For dev (build:types:dev) mode only
      const isDev =
        process.env.npm_config_argv.includes('build:types:dev') &&
        !file.includes('/Button.js') &&
        !file.includes('/Space.js')
      if (isDev) {
        return // stop here
      }

      const basename = path.basename(file)
      const destFile = file.replace(path.extname(file), '.d.ts')
      const sourceDir = path.dirname(file)

      if (
        /^index/.test(basename) ||
        (/^[A-Z]/.test(basename) &&
          !(await fileContains(file, 'propTypes')))
      ) {
        if (!fs.existsSync(destFile)) {
          await fs.copyFile(file, destFile)
        }
      } else if (
        (/^[A-Z]/.test(basename) &&
          (await fileContains(file, 'propTypes'))) ||
        file.includes('src/icons/')
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
              [
                babelPluginIncludeDocs,
                {
                  docs
                }
              ],
              ['@babel/plugin-syntax-typescript', {}]
            ],
            ...babelPluginDefaults
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
            ...babelPluginDefaults
          })

          /**
           * Note: Before we have send in "filename" as the first argument of generateFromSource
           * Like so: const filename = basename.replace(path.extname(file), '')
           * But this creates the 'declare module' which created trouobles
           */
          definitionContent = generateFromSource(null, code)
        }

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

export function babelPluginPropTypesRelations(babel, { sourceDir }) {
  const { types: t } = babel
  const cloneNode = t.cloneNode || t.cloneDeep

  const handleVariableRelation = ({ path, targetPath }) => {
    if (targetPath.parentPath.isSpreadElement()) {
      const sum = []

      if (
        path.type === 'VariableDeclarator' &&
        path.node?.init?.properties
      ) {
        path.node.init.properties.forEach((path) => {
          sum.push(cloneNode(path))
        })
      } else {
        path.parentPath.traverse({
          CallExpression(path) {
            sum.push(cloneNode(path.parent))
          }
        })
      }

      targetPath.parentPath.replaceWithMultiple(sum)
    } else if (targetPath.parentPath.isMemberExpression()) {
      path.parentPath.traverse({
        ObjectProperty(path) {
          if (
            targetPath.parentPath.node?.property?.name ===
            path.node.key.name
          ) {
            targetPath.parentPath.replaceWith(cloneNode(path.node.value))
          }
        }
      })
    } else if (path.parent.init) {
      // Find simple parent relation
      targetPath.replaceWith(cloneNode(path.parent.init))
    } else if (path.node.init) {
      // Find simple relation
      targetPath.replaceWith(cloneNode(path.node.init))
    }
  }

  const handleImportDeclaration = ({ path, targetPath }) => {
    let selectedObjectExpression
    const name = targetPath.node.name

    // Find imported relation
    if (
      path.isIdentifier({ name }) &&
      path.parentPath.isImportSpecifier()
    ) {
      const sourceFile = path.parentPath.parentPath.node.source.value
      const importName = path.parentPath.node.imported.name
      // const importName = path.parentPath.node.local.name
      // console.log('isImportSpecifier', name, importName, sourceFile)

      const content = fs.readFileSync(
        nodePath.resolve(sourceDir, sourceFile + '.js'),
        'utf-8'
      )

      transformSync(content, {
        filename: sourceFile,
        ...babelPluginDefaults,
        plugins: [
          () => {
            return {
              visitor: {
                VariableDeclarator(path) {
                  if (path.node.id.name === importName) {
                    selectedObjectExpression = path
                  }
                }
              }
            }
          }
        ]
      })

      if (selectedObjectExpression) {
        // Find complex/object relation
        handleVariableRelation({
          path: selectedObjectExpression,
          targetPath
        })
      }
    }
  }

  const handleRelations = ({ path, targetPath }) => {
    const name = targetPath.node.name

    // Find relations
    if (
      path.isIdentifier({ name }) &&
      path.parentPath.isVariableDeclarator()
    ) {
      // Find complex/object relation
      handleVariableRelation({
        path,
        targetPath
      })

      // Old – not sure what this did before
      // path.parentPath.traverse({
      //   CallExpression(path) {
      //     if (
      //       targetPath.parentPath.node
      //         .property &&
      //       targetPath.parentPath.node
      //         .property.name ===
      //         path.parent.key.name
      //     ) {
      //       targetPath.parentPath.replaceWith(
      //         path
      //       )
      //     }
      //   }
      // })
    }
  }

  let root

  return {
    visitor: {
      Program(path) {
        root = path
      },

      Identifier(path) {
        if (path.isIdentifier({ name: 'propTypes' })) {
          path.parentPath.parentPath.traverse({
            ObjectExpression(path) {
              path.traverse({
                Identifier(path) {
                  if (/[a-z]PropType/.test(path.node.name)) {
                    const targetPath = path

                    root.traverse({
                      Identifier(path) {
                        handleImportDeclaration({
                          path,
                          targetPath
                        })

                        handleRelations({
                          path,
                          targetPath
                        })
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    }
  }
}

export function babelPluginCorrectTypes(babel) {
  const { types: t } = babel
  const cloneNode = t.cloneNode || t.cloneDeep
  return {
    visitor: {
      ImportDeclaration(path) {
        const root = path
        path.traverse({
          Identifier(path) {
            if (path.node.name === 'PropTypes') {
              const ImportDefaultSpecifier = cloneNode(path.node)
              ImportDefaultSpecifier.name = '{ PropTypes }'
              path.replaceWith(ImportDefaultSpecifier)

              const StringLiteral = root.node
              StringLiteral.source.value = 'react'
              root.replaceWith(StringLiteral)
            }
          }
        })
      },

      MemberExpression(path, state) {
        if (
          state.opts.strictMode &&
          path.parentPath.parentPath.isObjectProperty()
        ) {
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
              pathToReplace.replaceWith(cloneNode(nodeToUse))
            }
          }
        }
      }
    }
  }
}

export function babelPluginIncludeDocs(plugin, { docs }) {
  if (!docs) {
    return {} // stop here
  }

  return {
    visitor: {
      ModuleDeclaration(path) {
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

      // Do we need this? No, because we are after babel, and do not get a class anymore!
      // ClassProperty(path) {
      //   if (path.node.key && path.node.key.name === 'propTypes') {
      //     path.traverse({
      //       ObjectProperty(path) {
      //         if (path.node.key.name === 'propTypes') {
      //           if (path.node.key) {
      //             inserDocs(path, path.node.key.name, docs)
      //           }
      //         }
      //       }
      //     })
      //   }

      ObjectProperty(path) {
        if (
          path.parentPath.parentPath.isAssignmentExpression() &&
          path.parentPath.parentPath.node?.left?.property?.name ===
            'propTypes' &&
          path.node.key
        ) {
          inserDocs(path, path.node.key.name, docs)
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
