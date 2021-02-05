import fs from 'fs'
import nodePath from 'path'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { babylonConfigDefaults } from './babelPluginConfigDefaults'

export function babelPluginPropTypesRelations(babel, { sourceDir }) {
  const { types: t } = babel
  const cloneNode = t.cloneNode || t.cloneDeep

  const handleDeclarationRelation = ({ ast, path, targetPath }) => {
    if (targetPath?.parentPath?.isSpreadElement()) {
      const multireplaceList = []
      const tmpKeys = {}

      const addToMultireplaceList = (path) => {
        const hash = path.node.key.name
        if (!tmpKeys[hash]) {
          tmpKeys[hash] = true
          multireplaceList.push(cloneNode(path.node))
        }
      }

      if (
        path.type === 'VariableDeclarator' &&
        path.node?.init?.properties
      ) {
        path.traverse({
          /**
           * Grab multi level deep declarations
           *
           * 1. When parsing IconPrimary.js follow iconPropTypes from inside Icon.js
           * 2. Icon.js has: iconPropTypes, which has again: {...spacingPropTypes, ...}
           * 3. Follow SpacingHelper.js to grab spacingPropTypes
           */
          SpreadElement(path) {
            let targetRoot = null
            traverse(ast, {
              Program(path) {
                targetRoot = path
              }
            })

            const { foundPath } = findDeclarationRelation({
              targetRoot,
              targetPath: { node: path.node.argument }
            })

            if (foundPath) {
              foundPath.traverse({
                ObjectProperty(path) {
                  addToMultireplaceList(path)
                }
              })
            }
          },
          /**
           * Grab semi multi level deep declarations
           *
           * 1. When parsing IconPrimary.js follow iconPropTypes from inside Icon.js
           * 2. Get all Icon.js "iconPropTypes" properties
           */
          ObjectProperty(path) {
            addToMultireplaceList(path)
          }
        })
      } else {
        /**
         * 1. Grab variables declared in same file:
         *
         * const Variables = PropTypes.string;
         * ...
         * static propTypes = { prop: Variables };
         *
         * 2. Also, it supports spread:
         *
         * const Variables = { prop: PropTypes.string };
         * ...
         * static propTypes = { ...Variables };
         */
        if (
          path.parent.type === 'VariableDeclarator' &&
          path.parent?.init?.properties
        ) {
          path.parentPath.traverse({
            SpreadElement(path) {
              const { foundPath } = findDeclarationRelation({
                targetPath: { node: path.node.argument }
              })

              if (foundPath) {
                foundPath.parentPath.traverse({
                  ObjectProperty(path) {
                    addToMultireplaceList(path)
                  }
                })
              }
            },
            ObjectProperty(path) {
              if (path.node?.value?.type === 'Identifier') {
                const { foundPath } = findDeclarationRelation({
                  targetPath: { node: path.node.value }
                })

                if (foundPath?.parent.type === 'VariableDeclarator') {
                  const copy = cloneNode(path.node)
                  copy.value = foundPath.parent.init
                  path.replaceWith(copy)
                }
              } else {
                addToMultireplaceList(path)
              }
            }
          })
        }
      }

      targetPath.parentPath.replaceWithMultiple(multireplaceList)
    } else if (targetPath?.parentPath?.isMemberExpression()) {
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
    } else if (path?.parent?.init && targetPath?.replaceWith) {
      targetPath?.replaceWith(cloneNode(path.parent.init))
    } else if (path?.node?.init && targetPath?.replaceWith) {
      targetPath?.replaceWith(cloneNode(path.node.init))
    }
  }

  const findDeclarationRelation = ({ targetRoot = root, targetPath }) => {
    let foundPath = null
    let ast = null

    targetRoot.traverse({
      Identifier(path) {
        const name = targetPath.node.name

        if (path.isIdentifier({ name })) {
          if (
            /**
             * Find imported relation
             */

            path.parentPath.isImportSpecifier()
          ) {
            let selectedObjectExpression

            const sourceFile = path.parentPath.parentPath.node.source.value
            const importName = path.parentPath.node.imported.name

            const code = fs.readFileSync(
              nodePath.resolve(sourceDir, sourceFile + '.js'),
              'utf-8'
            )
            ast = parse(code, babylonConfigDefaults)

            traverse(ast, {
              VariableDeclarator(path) {
                if (path.node.id.name === importName) {
                  selectedObjectExpression = path
                  path.stop()
                }
              }
            })

            if (selectedObjectExpression) {
              foundPath = selectedObjectExpression
            }
          } else if (
            /**
             * Find variable relations
             */
            path.parentPath.isVariableDeclarator()
          ) {
            foundPath = path
          }
        }
      }
    })

    return { foundPath, ast }
  }

  let root

  return {
    visitor: {
      Program(path) {
        root = path
      },

      Identifier(path) {
        /**
         * Iterate over every propTypes object properties,
         * and extend them, we they need to.
         */
        if (path.isIdentifier({ name: 'propTypes' })) {
          path.parentPath.parentPath.traverse({
            ObjectExpression(path) {
              path.traverse({
                Identifier(path) {
                  const targetPath = path

                  const { foundPath, ast } = findDeclarationRelation({
                    targetPath
                  })

                  if (foundPath) {
                    handleDeclarationRelation({
                      ast,
                      path: foundPath,
                      targetPath
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
