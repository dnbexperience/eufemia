import fs from 'fs'
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
}

type TargetPath = {
  node: BabelTypes.Node
  parentPath?: BabelNodePath<BabelTypes.Node>
  replaceWith?: (node: BabelTypes.Node) => void
}

const isObjectExpression = (
  node?: BabelTypes.Node | null
): node is BabelTypes.ObjectExpression =>
  Boolean(node && node.type === 'ObjectExpression')

const getIdentifierName = (
  node?: BabelTypes.Node | null
): string | null => (node?.type === 'Identifier' ? node.name : null)

const isMemberExpression = (
  node?: BabelTypes.Node | null
): node is
  | BabelTypes.MemberExpression
  | BabelTypes.OptionalMemberExpression =>
  Boolean(
    node &&
      (node.type === 'MemberExpression' ||
        node.type === 'OptionalMemberExpression')
  )

const getMemberPropertyName = (
  node?:
    | BabelTypes.MemberExpression
    | BabelTypes.OptionalMemberExpression
    | null
): string | null => {
  if (!node || !('property' in node)) {
    return null
  }
  return node.property?.type === 'Identifier' ? node.property.name : null
}

export function babelPluginPropTypesRelations(
  babel: BabelPluginApi,
  { sourceDir }: { sourceDir: string }
) {
  const { types: t } = babel
  const cloneNode = t.cloneNode || t.cloneDeep

  const toTargetPath = (
    path: BabelNodePath<BabelTypes.Node>
  ): TargetPath => ({
    node: path.node,
    parentPath: path.parentPath,
    replaceWith: (node) => path.replaceWith(node),
  })

  const handleDeclarationRelation = ({
    ast,
    path,
    targetPath,
  }: {
    ast?: BabelTypes.Node
    path: BabelNodePath<BabelTypes.Node>
    targetPath: TargetPath
  }) => {
    if (targetPath.parentPath?.isSpreadElement()) {
      const multiReplaceList: BabelTypes.Node[] = []
      const container =
        (
          targetPath.parentPath as BabelNodePath<BabelTypes.Node> & {
            container?: BabelTypes.Node[]
          }
        ).container || []
      const existingPropKeys = container.reduce<Record<string, boolean>>(
        (acc, cur) => {
          if (
            cur.type === 'ObjectProperty' &&
            cur.key.type === 'Identifier'
          ) {
            acc[cur.key.name] = true
          }
          return acc
        },
        {}
      )

      const addToMultiReplaceList = (
        path: BabelNodePath<BabelTypes.ObjectProperty>
      ) => {
        const hash = getIdentifierName(path.node.key)
        if (hash && !existingPropKeys[hash]) {
          existingPropKeys[hash] = true
          multiReplaceList.push(cloneNode(path.node))
        }
      }

      if (
        (path.isVariableDeclarator() &&
          isObjectExpression(path.node.init)) ||
        (path.isClassProperty() && isObjectExpression(path.node.value)) ||
        path.isObjectExpression()
      ) {
        path.traverse({
          /**
           * Grab multi level deep declarations
           *
           * 1. When parsing IconPrimary.js follow iconPropTypes from inside Icon.js
           * 2. Icon.js has: iconPropTypes, which has again: {...spacingPropTypes, ...}
           * 3. Follow SpacingHelper.js to grab spacingPropTypes
           */
          SpreadElement(path: BabelNodePath<BabelTypes.SpreadElement>) {
            let targetRoot: BabelNodePath<BabelTypes.Program> | null = null
            traverse(ast as BabelTypes.Node, {
              Program(path: BabelNodePath<BabelTypes.Program>) {
                targetRoot = path
              },
            })

            if (!targetRoot) {
              return
            }

            const { foundPath } = findDeclarationRelation({
              targetRoot,
              targetPath: { node: path.node.argument },
            })

            if (foundPath) {
              foundPath.traverse({
                ObjectProperty(
                  path: BabelNodePath<BabelTypes.ObjectProperty>
                ) {
                  addToMultiReplaceList(path)
                },
              })
            }
          },
          /**
           * Grab semi multi level deep declarations
           *
           * 1. When parsing IconPrimary.js follow iconPropTypes from inside Icon.js
           * 2. Get all Icon.js "iconPropTypes" properties
           */
          ObjectProperty(path: BabelNodePath<BabelTypes.ObjectProperty>) {
            addToMultiReplaceList(path)
          },
        })
      } else if (
        path.parentPath.isVariableDeclarator() &&
        isObjectExpression(path.parentPath.node.init)
      ) {
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
        path.parentPath.traverse({
          SpreadElement(path: BabelNodePath<BabelTypes.SpreadElement>) {
            const { foundPath } = findDeclarationRelation({
              targetPath: { node: path.node.argument },
            })

            if (foundPath) {
              foundPath.parentPath.traverse({
                ObjectProperty(
                  path: BabelNodePath<BabelTypes.ObjectProperty>
                ) {
                  addToMultiReplaceList(path)
                },
              })
            }
          },
          ObjectProperty(path: BabelNodePath<BabelTypes.ObjectProperty>) {
            if (path.node?.value?.type === 'Identifier') {
              const { foundPath } = findDeclarationRelation({
                targetPath: { node: path.node.value },
              })

              if (
                foundPath?.parentPath?.isVariableDeclarator() &&
                foundPath.parentPath.node.init
              ) {
                const copy = cloneNode(path.node)
                copy.value = foundPath.parentPath.node.init
                path.replaceWith(copy)
              }
            } else {
              addToMultiReplaceList(path)
            }
          },
        })
      }

      targetPath.parentPath.replaceWithMultiple(multiReplaceList)
    } else if (
      targetPath.parentPath?.isMemberExpression() ||
      targetPath.parentPath?.isOptionalMemberExpression()
    ) {
      const memberExpression = targetPath.parentPath.node as
        | BabelTypes.MemberExpression
        | BabelTypes.OptionalMemberExpression
      const memberPropertyName = getMemberPropertyName(memberExpression)
      path.parentPath.traverse({
        ObjectProperty(path: BabelNodePath<BabelTypes.ObjectProperty>) {
          if (
            memberPropertyName &&
            memberPropertyName === getIdentifierName(path.node.key)
          ) {
            targetPath.parentPath?.replaceWith(cloneNode(path.node.value))
          }
        },
      })
    } else if (
      path.parentPath?.isVariableDeclarator() &&
      targetPath.replaceWith
    ) {
      const parentInit = path.parentPath.node.init
      if (parentInit) {
        targetPath.replaceWith(cloneNode(parentInit))
      }
    } else if (path.node && targetPath.replaceWith) {
      const initNode =
        path.node.type === 'VariableDeclarator' ? path.node.init : null
      if (initNode) {
        targetPath.replaceWith(cloneNode(initNode))
      }
    }
  }

  const findDeclarationRelation = ({
    targetRoot = root,
    targetPath,
    propertyName = null,
  }: {
    targetRoot?: BabelNodePath<BabelTypes.Program>
    targetPath: TargetPath
    propertyName?: string | null
  }) => {
    let foundPath: BabelNodePath<BabelTypes.Node> | null = null
    let ast: BabelTypes.Node | null = null

    targetRoot.traverse({
      Identifier(path: BabelNodePath<BabelTypes.Identifier>) {
        const name = getIdentifierName(targetPath.node)

        if (name && path.isIdentifier({ name })) {
          if (
            /**
             * Find imported relation
             */
            path.parentPath.isImportSpecifier() ||
            path.parentPath.isImportDefaultSpecifier()
          ) {
            let selectedObjectExpression: BabelNodePath<BabelTypes.Node> | null

            const sourceFile = (
              path.parentPath.parentPath
                .node as BabelTypes.ImportDeclaration
            ).source.value

            const code = fs.readFileSync(
              nodePath.resolve(sourceDir, sourceFile + '.js'),
              'utf-8'
            )
            ast = parse(
              code,
              babylonConfigDefaults as ParserOptions
            ) as unknown as BabelTypes.Node

            if (path.parentPath.isImportSpecifier()) {
              const importName = getIdentifierName(
                (path.parentPath.node as BabelTypes.ImportSpecifier)
                  .imported as BabelTypes.Node
              )
              if (importName) {
                traverse(ast as BabelTypes.Node, {
                  VariableDeclarator(
                    path: BabelNodePath<BabelTypes.VariableDeclarator>
                  ) {
                    if (
                      path.node.id.type === 'Identifier' &&
                      path.node.id.name === importName
                    ) {
                      selectedObjectExpression = path
                      path.stop()
                    }
                  },
                })
              }
            }

            if (path.parentPath.isImportDefaultSpecifier()) {
              traverse(ast as BabelTypes.Node, {
                ExportDefaultDeclaration(
                  exportPath: BabelNodePath<BabelTypes.ExportDefaultDeclaration>
                ) {
                  const declaration = exportPath.node.declaration
                  const exportDeclarationName =
                    (
                      declaration as
                        | BabelTypes.ClassDeclaration
                        | BabelTypes.FunctionDeclaration
                    )?.id?.name ||
                    getIdentifierName(declaration as BabelTypes.Node)

                  traverse(ast as BabelTypes.Node, {
                    MemberExpression(
                      path: BabelNodePath<BabelTypes.MemberExpression>
                    ) {
                      // Find Button.propTypes = "AssignmentExpression"
                      if (
                        exportDeclarationName &&
                        getMemberPropertyName(path.node) ===
                          propertyName &&
                        getIdentifierName(path.node.object) ===
                          exportDeclarationName
                      ) {
                        if (
                          path.parent.type === 'AssignmentExpression' &&
                          path.parent.right.type === 'ObjectExpression'
                        ) {
                          path.parentPath.traverse({
                            ObjectExpression(
                              path: BabelNodePath<BabelTypes.ObjectExpression>
                            ) {
                              selectedObjectExpression = path
                            },
                          })
                          path.stop()
                        }

                        path.stop()
                      }
                    },

                    // Find const someNameToProps = {}
                    Identifier(
                      path: BabelNodePath<BabelTypes.Identifier>
                    ) {
                      if (
                        exportDeclarationName &&
                        path.node.name === exportDeclarationName &&
                        path.parent.type === 'VariableDeclarator'
                      ) {
                        selectedObjectExpression = path.parentPath
                        path.stop()
                      }
                    },

                    // Find class { strict propTypes = {} }
                    ClassProperty(
                      path: BabelNodePath<BabelTypes.ClassProperty>
                    ) {
                      if (
                        declaration.type === 'ClassDeclaration' &&
                        (
                          path.parentPath.parentPath
                            .node as BabelTypes.ClassDeclaration
                        )?.id?.name === exportDeclarationName &&
                        getIdentifierName(path.node.key) === propertyName
                      ) {
                        selectedObjectExpression = path
                        path.stop()
                      }
                    },
                  })
                },
              })
            }

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
      },
    })

    return { foundPath, ast }
  }

  let root: BabelNodePath<BabelTypes.Program>

  return {
    visitor: {
      Program(path: BabelNodePath<BabelTypes.Program>) {
        root = path
      },

      Identifier(path: BabelNodePath<BabelTypes.Identifier>) {
        /**
         * Iterate over every propTypes object properties,
         * and extend them, we they need to.
         */
        if (
          path.isIdentifier() &&
          (path.node.name === 'propTypes' ||
            path.node.name === 'defaultProps')
        ) {
          path.parentPath.parentPath.traverse({
            ObjectExpression(
              path: BabelNodePath<BabelTypes.ObjectExpression>
            ) {
              path.traverse({
                Identifier(path: BabelNodePath<BabelTypes.Identifier>) {
                  let targetPath: TargetPath | null = null

                  /**
                   * Support for imported prop types like spacingPropTypes
                   */
                  if (/[a-z]PropType/.test(path.node.name)) {
                    targetPath = toTargetPath(path)
                  } else if (
                    /**
                     * Support for imported prop types like Button.propTypes
                     */
                    isMemberExpression(path.parent)
                  ) {
                    const memberPropertyName = getMemberPropertyName(
                      path.parent as
                        | BabelTypes.MemberExpression
                        | BabelTypes.OptionalMemberExpression
                    )
                    if (
                      memberPropertyName !== 'propTypes' &&
                      memberPropertyName !== 'defaultProps'
                    ) {
                      return
                    }
                    targetPath = {
                      node: (
                        path.parentPath.node as
                          | BabelTypes.MemberExpression
                          | BabelTypes.OptionalMemberExpression
                      ).object,
                      parentPath: path.parentPath.parentPath, // is needed by handleDeclarationRelation
                    }
                  }

                  if (targetPath) {
                    const { foundPath, ast } = findDeclarationRelation({
                      targetPath,
                      propertyName: getMemberPropertyName(
                        path.parent as
                          | BabelTypes.MemberExpression
                          | BabelTypes.OptionalMemberExpression
                      ),
                    })

                    if (foundPath) {
                      handleDeclarationRelation({
                        ast: ast ?? undefined,
                        path: foundPath,
                        targetPath,
                      })
                    }
                  }
                },
              })
            },
          })
        }
      },
    },
  }
}
