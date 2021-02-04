import fs from 'fs-extra'
import nodePath from 'path'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { babylonConfigDefaults } from './babelPluginConfigDefaults'

export function babelPluginExtendTypes(plugin, { file } = {}) {
  const basename = nodePath.basename(file)
  const componentName = basename.replace(nodePath.extname(file), '')
  const componentNameWithProps = `${componentName}Props`

  const { types: t } = plugin

  return {
    visitor: {
      TSInterfaceDeclaration(path) {
        path.traverse({
          Identifier(path) {
            if (
              path.isIdentifier({ name: componentNameWithProps }) &&
              path.parentPath.isTSInterfaceDeclaration() &&
              !(path.parentPath.node?.extends?.length > 0)
            ) {
              path.node.name = `${componentNameWithProps} extends React.HTMLProps<HTMLElement>`
            }
          }
        })
      },

      ClassDeclaration(path) {
        if (
          path.node?.body?.type === 'ClassBody' &&
          hasClassProperty({
            file,
            componentName,
            property: 'defaultProps'
          })
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

export function hasClassProperty({ file, componentName, property }) {
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
