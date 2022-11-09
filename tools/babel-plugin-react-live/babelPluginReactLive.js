const fs = require('fs')
const prettier = require('prettier')

function babelPluginReactLive(babel, options) {
  const { types: t } = babel

  const prettierrc = options.prettierPath
    ? JSON.parse(fs.readFileSync(options.prettierPath, 'utf-8'))
    : {}

  const wrappCodeInside = (code) => {
    const formattedCode = prettier.format(code, {
      ...prettierrc,
      parser: 'babel',
    })

    return t.jsxExpressionContainer(
      t.templateLiteral(
        [
          t.templateElement({
            raw: formattedCode.replace(/^;/, '').replace(/`/g, '\\\\`'),
          }),
        ],
        []
      )
    )
  }

  const isEffectedFile = (filename) => {
    return options.filesToMatch.some((f) => filename.includes(f))
  }

  const runPlugin = (path) => {
    path.traverse({
      JSXElement(path) {
        if (
          path.node.openingElement.name.name === options.componentName &&
          /**
           * Do nothing, if the child is already a string / template literal
           */
          !path.node.children.some((node) => {
            return (
              node.expression &&
              (t.isTemplateLiteral(node.expression) ||
                t.isStringLiteral(node.expression))
            )
          })
        ) {
          const children = []
          let noInline = false

          path.traverse({
            BlockStatement(path) {
              const code = path
                .getSource()
                .replace(/return (.*)/, 'render($1')
                .replace(/^\{/, '')
                .replace(/\}$/, ')')

              children.push(wrappCodeInside(code))

              path.stop()

              noInline = true
            },
            JSXElement(path) {
              const code = path.getSource()

              children.push(wrappCodeInside(code))

              path.stop()
            },
          })

          if (children.length > 0) {
            if (
              noInline &&
              !path.node.openingElement.attributes.some(
                ({ name }) => name === 'noInline'
              )
            ) {
              path.node.openingElement.attributes.push(
                t.jsxAttribute(t.jsxIdentifier('noInline'))
              )
            }

            path.node.children = children

            path.replaceWith(t.identifier(path.toString()))
          }
        }
      },
    })
  }

  return {
    name: 'react-live',
    visitor: {
      Program(path, state) {
        if (!isEffectedFile(state?.file.opts.filename)) {
          return // stop here
        }

        runPlugin(path)
      },
    },
  }
}

module.exports = babelPluginReactLive
