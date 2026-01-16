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
          },
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
              },
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
      },
    },
  }
}
