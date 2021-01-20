export function babelPluginExtendTypes(
  plugin,
  { componentName, addDefaultPropsTypeAnnotation = true } = {}
) {
  if (!componentName) {
    return {} // stop here
  }

  const { types: t } = plugin

  return {
    visitor: {
      TSInterfaceDeclaration(path) {
        path.traverse({
          Identifier(path) {
            if (
              path.isIdentifier({ name: componentName }) &&
              path.parentPath.isTSInterfaceDeclaration() &&
              !(path.parentPath.node?.extends?.length > 0)
            ) {
              path.node.name = `${componentName} extends React.DOMAttributes<React.SyntheticEvent>`
            }
          }
        })
      },
      ClassDeclaration(path) {
        if (
          addDefaultPropsTypeAnnotation &&
          path.node?.body?.type === 'ClassBody'
        ) {
          path.node.body?.body?.unshift(
            t.classProperty(
              t.identifier('defaultProps'),
              null,
              t.typeAnnotation(
                t.genericTypeAnnotation(t.identifier('object'))
              ),
              null,
              false,
              true
            )
          )
        }
      }
    }
  }
}
