import fs from 'fs'
import nodePath from 'path'
import { transformSync } from '@babel/core'
import { babelPluginConfigDefaults } from './babelPluginConfigDefaults'

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
        ...babelPluginConfigDefaults,
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
