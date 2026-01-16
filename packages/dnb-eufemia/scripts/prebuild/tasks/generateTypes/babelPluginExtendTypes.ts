import fs from 'fs-extra'
import nodePath from 'path'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { babylonConfigDefaults } from './babelPluginConfigDefaults'

export function babelPluginExtendTypes(
  babel: any,
  { file }: { file?: string } = {}
) {
  const filePath = file as string
  const basename = nodePath.basename(filePath)
  const componentName = basename.replace(nodePath.extname(filePath), '')

  const { types: t } = babel

  const handleDefaultPropsProperty = (path) => {
    if (
      path.node?.body?.type === 'ClassBody' &&
      hasClassProperty({
        file: filePath,
        componentName,
        property: 'defaultProps',
      })
    ) {
      inertClassProperty({
        t,
        path,
        property: 'defaultProps',
        type: 'object',
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
                      name,
                    })
                  ) {
                    path.node.name = `${name} extends React.HTMLProps<HTMLElement>`
                    path.stop()
                  }
                },
              })
            },
          })
        }
      },
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
        const declaration = path.node.declaration
        if (declaration.type === 'ClassDeclaration') {
          // Class components
          handleMainInterfaceProps(path)
        } else if (declaration.type === 'Identifier') {
          // Function components
          const name = declaration.name

          root.traverse({
            VariableDeclarator(path) {
              if (path.node.id.name === name) {
                path.stop()
                handleMainInterfaceProps(path)
              }
            },
          })
        }
      },
      Program(path) {
        root = path

        const hasImportStatement = (importStatement) => {
          let exists = false

          root.traverse({
            ImportDeclaration(path) {
              if (importStatement === path.toString()) {
                exists = true
                path.stop()
              }
            },
          })

          return exists
        }

        const classProperties = getListOfClassProperties({
          file: filePath,
        })

        if (classProperties) {
          classProperties.forEach(
            ({
              // className,
              // sourceFile,
              keyName,
              valueName,
              importStatement,
            }) => {
              root.traverse({
                ImportDeclaration(path) {
                  if (!hasImportStatement(importStatement)) {
                    path.insertAfter(babel.template.ast(importStatement))
                  }
                  path.stop()
                },
              })

              root.traverse({
                ClassDeclaration(path) {
                  if (path.parentPath.isExportDefaultDeclaration()) {
                    inertClassProperty({
                      t,
                      path,
                      property: keyName,
                      value: valueName,
                    })

                    path.stop()
                  }
                },
              })
            }
          )
        }
      },
    },
  }
}

function inertClassProperty({
  t,
  path,
  property,
  value = null,
  type,
}: {
  t: any
  path: any
  property: string
  value?: string | null
  type?: string
}) {
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

function hasClassProperty({
  file,
  componentName,
  property,
}: {
  file: string
  componentName: string
  property: string
}) {
  let exists = false

  const code = fs.readFileSync(nodePath.resolve(file), 'utf-8')
  const ast = parse(code, babylonConfigDefaults as any)

  traverse(ast as any, {
    ClassDeclaration(path: any) {
      if (componentName.includes(path.node.id.name)) {
        path.traverse({
          ClassProperty(path: any) {
            if (
              path.isClassProperty({ static: true }) &&
              path.node.key.name === property
            ) {
              exists = true
            }
          },
        })
      }
    },
  })

  return exists
}

function getListOfClassProperties({ file }: { file: string }) {
  const results = []
  const listOfImportDeclaration = []

  const code = fs.readFileSync(nodePath.resolve(file), 'utf-8')
  const ast = parse(code, babylonConfigDefaults as any)

  traverse(ast as any, {
    ImportDeclaration(path: any) {
      listOfImportDeclaration.push(path)
    },
    ClassDeclaration(path: any) {
      const className = (path.node.id as any).name

      if (path.parentPath.isExportDefaultDeclaration()) {
        path.traverse({
          ClassProperty(path: any) {
            const keyName = (path.node.key as any).name
            const valueName = (path.node.value as any).name

            if (
              path.isClassProperty({ static: true }) &&
              /^[A-Z]/.test(keyName) &&
              /^[A-Z]/.test(valueName)
            ) {
              listOfImportDeclaration.forEach((path: any) => {
                path.traverse({
                  Identifier(path: any) {
                    if (path.isIdentifier({ name: valueName })) {
                      const sourceFile =
                        path.parentPath.parentPath.node.source.value

                      results.push({
                        className,
                        keyName,
                        valueName,
                        sourceFile,
                        importStatement:
                          path.parentPath.parentPath.toString(),
                      })

                      path.stop()
                    }
                  },
                })
              })
            }
          },
        })
      }
    },
  })

  return results
}
