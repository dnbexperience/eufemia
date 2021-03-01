import fs from 'fs-extra'
import nodePath from 'path'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { babylonConfigDefaults } from './babelPluginConfigDefaults'

export function babelPluginExtendTypes(babel, { file } = {}) {
  const basename = nodePath.basename(file)
  const componentName = basename.replace(nodePath.extname(file), '')

  const { types: t } = babel

  const handleDefaultPropsProperty = (path) => {
    if (
      path.node?.body?.type === 'ClassBody' &&
      hasClassProperty({
        file,
        componentName,
        property: 'defaultProps'
      })
    ) {
      inertClassProperty({
        t,
        path,
        property: 'defaultProps',
        type: 'object'
      })
    }
  }

  /**
   * Insert "extends React.HTMLProps<HTMLElement>" if the prop type of the component exists
   */
  const handleMainInterfaceProps = (path) => {
    path.traverse({
      TSTypeReference(path) {
        if (
          path.parentPath.isTSTypeParameterInstantiation() &&
          path.node.typeName
        ) {
          path.stop()

          const name = path.node.typeName.name

          root.traverse({
            TSInterfaceDeclaration(path) {
              path.traverse({
                Identifier(path) {
                  if (
                    path.parentPath.isTSInterfaceDeclaration() &&
                    path.isIdentifier({
                      name
                    })
                  ) {
                    path.node.name = `${name} extends React.HTMLProps<HTMLElement>`
                    path.stop()
                  }
                }
              })
            }
          })
        }
      }
    })
  }

  let root

  return {
    visitor: {
      ClassDeclaration(path) {
        /**
         * Insert "defaultProps" if it actually exists
         * Not that important, but nice to have
         */
        handleDefaultPropsProperty(path)
      },
      ExportDefaultDeclaration(path) {
        if (path.node.declaration.type === 'ClassDeclaration') {
          // Class components
          handleMainInterfaceProps(path)
        } else if (path.node.declaration.type === 'Identifier') {
          // Function components
          const name = path.node.declaration.name

          root.traverse({
            VariableDeclarator(path) {
              if (path.node.id.name === name) {
                path.stop()
                handleMainInterfaceProps(path)
              }
            }
          })
        }
      },
      Program(path) {
        root = path

        const classProperties = getListOfClassProperties({ file })

        if (classProperties) {
          classProperties.forEach(
            ({
              // className,
              // sourceFile,
              keyName,
              valueName,
              importStatement
            }) => {
              root.traverse({
                ImportDeclaration(path) {
                  path.insertAfter(babel.template.ast(importStatement))
                  path.stop()
                }
              })

              root.traverse({
                ClassDeclaration(path) {
                  if (path.parentPath.isExportDefaultDeclaration()) {
                    inertClassProperty({
                      t,
                      path,
                      property: keyName,
                      value: valueName
                    })

                    path.stop()
                  }
                }
              })
            }
          )
        }
      }
    }
  }
}

function inertClassProperty({ t, path, property, value, type }) {
  path.node.body?.body?.unshift(
    t.classProperty(
      t.identifier(property),
      value ? t.identifier(value) : null,
      type
        ? t.typeAnnotation(t.genericTypeAnnotation(t.identifier(type)))
        : null,
      null,
      false,
      true
    )
  )
}

function hasClassProperty({ file, componentName, property }) {
  let exists = false

  const code = fs.readFileSync(nodePath.resolve(file), 'utf-8')
  const ast = parse(code, babylonConfigDefaults)

  traverse(ast, {
    ClassDeclaration(path) {
      if (componentName.includes(path.node.id.name)) {
        path.traverse({
          ClassProperty(path) {
            if (
              path.isClassProperty({ static: true }) &&
              path.node.key.name === property
            ) {
              exists = true
            }
          }
        })
      }
    }
  })

  return exists
}

function getListOfClassProperties({ file }) {
  const results = []
  const listOfImportDeclaration = []

  const code = fs.readFileSync(nodePath.resolve(file), 'utf-8')
  const ast = parse(code, babylonConfigDefaults)

  traverse(ast, {
    ImportDeclaration(path) {
      listOfImportDeclaration.push(path)
    },
    ClassDeclaration(path) {
      const className = path.node.id.name

      if (path.parentPath.isExportDefaultDeclaration()) {
        path.traverse({
          ClassProperty(path) {
            const keyName = path.node.key.name
            const valueName = path.node.value.name

            if (
              path.isClassProperty({ static: true }) &&
              /^[A-Z]/.test(keyName) &&
              /^[A-Z]/.test(valueName)
            ) {
              listOfImportDeclaration.forEach((path) => {
                path.traverse({
                  Identifier(path) {
                    if (path.isIdentifier({ name: valueName })) {
                      const sourceFile =
                        path.parentPath.parentPath.node.source.value

                      results.push({
                        className,
                        keyName,
                        valueName,
                        sourceFile,
                        importStatement: path.parentPath.parentPath.toString()
                      })

                      path.stop()
                    }
                  }
                })
              })
            }
          }
        })
      }
    }
  })

  return results
}
