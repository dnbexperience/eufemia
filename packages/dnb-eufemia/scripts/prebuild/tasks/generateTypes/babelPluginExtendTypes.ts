import fs from 'fs-extra'
import nodePath from 'path'
import { parse, type ParserOptions } from '@babel/parser'
import traverse from '@babel/traverse'
import type { NodePath, types as BabelTypes } from '@babel/core'
import { babylonConfigDefaults } from './babelPluginConfigDefaults'

type BabelTypesModule = typeof import('@babel/core').types

type BabelNodePath<T extends BabelTypes.Node = BabelTypes.Node> =
  NodePath<T>

type BabelPluginApi = {
  types: BabelTypesModule
  template: {
    ast: (code: string) => BabelTypes.Statement
  }
}

type ClassPropertyInfo = {
  className: string
  keyName: string
  valueName: string
  sourceFile: string
  importStatement: string
}

export function babelPluginExtendTypes(
  babel: BabelPluginApi,
  { file }: { file?: string } = {}
) {
  const filePath = file as string
  const basename = nodePath.basename(filePath)
  const componentName = basename.replace(nodePath.extname(filePath), '')

  const { types: t } = babel

  const handleDefaultPropsProperty = (
    path: BabelNodePath<BabelTypes.ClassDeclaration>
  ) => {
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
  const handleMainInterfaceProps = (
    path: BabelNodePath<BabelTypes.Node>
  ) => {
    path.traverse({
      TSTypeReference(path: BabelNodePath<BabelTypes.TSTypeReference>) {
        if (
          path.parentPath.isTSTypeParameterInstantiation() &&
          path.node.typeName
        ) {
          path.stop()

          const name = (path.node.typeName as BabelTypes.Identifier).name

          root.traverse({
            TSInterfaceDeclaration(
              path: BabelNodePath<BabelTypes.TSInterfaceDeclaration>
            ) {
              path.traverse({
                Identifier(path: BabelNodePath<BabelTypes.Identifier>) {
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

  let root: BabelNodePath<BabelTypes.Program>

  return {
    visitor: {
      ClassDeclaration(path: BabelNodePath<BabelTypes.ClassDeclaration>) {
        /**
         * Insert "defaultProps" if it actually exists
         * Not that important, but nice to have
         */
        handleDefaultPropsProperty(path)
      },
      ExportDefaultDeclaration(
        path: BabelNodePath<BabelTypes.ExportDefaultDeclaration>
      ) {
        const declaration = path.node.declaration
        if (declaration.type === 'ClassDeclaration') {
          // Class components
          handleMainInterfaceProps(path)
        } else if (declaration.type === 'Identifier') {
          // Function components
          const name = declaration.name

          root.traverse({
            VariableDeclarator(
              path: BabelNodePath<BabelTypes.VariableDeclarator>
            ) {
              if (
                path.node.id.type === 'Identifier' &&
                path.node.id.name === name
              ) {
                path.stop()
                handleMainInterfaceProps(path)
              }
            },
          })
        }
      },
      Program(path: BabelNodePath<BabelTypes.Program>) {
        root = path

        const hasImportStatement = (importStatement: string) => {
          let exists = false

          root.traverse({
            ImportDeclaration(
              path: BabelNodePath<BabelTypes.ImportDeclaration>
            ) {
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
                ImportDeclaration(
                  path: BabelNodePath<BabelTypes.ImportDeclaration>
                ) {
                  if (!hasImportStatement(importStatement)) {
                    path.insertAfter(babel.template.ast(importStatement))
                  }
                  path.stop()
                },
              })

              root.traverse({
                ClassDeclaration(
                  path: BabelNodePath<BabelTypes.ClassDeclaration>
                ) {
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
  t: BabelTypesModule
  path: BabelNodePath<BabelTypes.ClassDeclaration>
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
  const ast = parse(
    code,
    babylonConfigDefaults as ParserOptions
  ) as unknown as BabelTypes.File

  traverse(ast, {
    ClassDeclaration(path: BabelNodePath<BabelTypes.ClassDeclaration>) {
      if (
        componentName.includes(
          (path.node.id as BabelTypes.Identifier).name
        )
      ) {
        path.traverse({
          ClassProperty(path: BabelNodePath<BabelTypes.ClassProperty>) {
            if (
              path.isClassProperty({ static: true }) &&
              (path.node.key as BabelTypes.Identifier).name === property
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
  const results: ClassPropertyInfo[] = []
  const listOfImportDeclaration: Array<
    BabelNodePath<BabelTypes.ImportDeclaration>
  > = []

  const code = fs.readFileSync(nodePath.resolve(file), 'utf-8')
  const ast = parse(
    code,
    babylonConfigDefaults as ParserOptions
  ) as unknown as BabelTypes.File

  traverse(ast, {
    ImportDeclaration(path: BabelNodePath<BabelTypes.ImportDeclaration>) {
      listOfImportDeclaration.push(path)
    },
    ClassDeclaration(path: BabelNodePath<BabelTypes.ClassDeclaration>) {
      const className = (path.node.id as BabelTypes.Identifier).name

      if (path.parentPath.isExportDefaultDeclaration()) {
        path.traverse({
          ClassProperty(path: BabelNodePath<BabelTypes.ClassProperty>) {
            const keyName = (path.node.key as BabelTypes.Identifier).name
            const valueName = (path.node.value as BabelTypes.Identifier)
              .name

            if (
              path.isClassProperty({ static: true }) &&
              /^[A-Z]/.test(keyName) &&
              /^[A-Z]/.test(valueName)
            ) {
              listOfImportDeclaration.forEach((path) => {
                path.traverse({
                  Identifier(path: BabelNodePath<BabelTypes.Identifier>) {
                    if (path.isIdentifier({ name: valueName })) {
                      const sourceFile = (
                        path.parentPath.parentPath
                          .node as BabelTypes.ImportDeclaration
                      ).source.value

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
