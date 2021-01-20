export function babelPluginExtendTypes(plugin, { componentName }) {
  if (!componentName) {
    return {} // stop here
  }

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
      }
    }
  }
}
