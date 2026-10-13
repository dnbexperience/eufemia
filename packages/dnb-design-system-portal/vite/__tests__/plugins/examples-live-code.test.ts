import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, it, expect } from 'vitest'
import type { Node } from '@babel/types'

const portalRoot = path.resolve(__dirname, '..', '..', '..')
const docsRoot = path.resolve(portalRoot, 'src', 'docs')

const exampleFiles = (
  readdirSync(docsRoot, { recursive: true }) as string[]
)
  .filter((file) => file.endsWith('Examples.tsx'))
  .sort()

async function getLiveCodes(file: string) {
  const babel = await import('@babel/core')
  const { parse } = await import('@babel/parser')
  const { injectStableName } =
    await import('../../client/plugins/react-live-babel')
  const { injectScope } = await import('../../client/plugins/inject-scope')

  const filename = path.resolve(docsRoot, file)
  const result = await babel.transformAsync(
    readFileSync(filename, 'utf8'),
    {
      filename,
      babelrc: false,
      configFile: false,
      presets: [
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
      ],
      plugins: [
        injectStableName,
        injectScope,
        [
          require.resolve('babel-plugin-react-live'),
          {
            componentName: 'ComponentBox',
            filesToMatch: ['Examples.tsx'],
            prettierPath: path.resolve(portalRoot, '.prettierrc'),
          },
        ],
      ],
    }
  )

  const ast = parse(result?.code || '', {
    sourceType: 'module',
    plugins: ['jsx'],
  })
  const codes: Array<{ code: string; noInline: boolean }> = []

  babel.traverse(ast, {
    JSXElement({ node }) {
      const name = node.openingElement.name
      if (name.type !== 'JSXIdentifier' || name.name !== 'ComponentBox') {
        return // stop here
      }

      const noInline = node.openingElement.attributes.some(
        (attribute) =>
          attribute.type === 'JSXAttribute' &&
          attribute.name.name === 'noInline'
      )

      for (const child of node.children as Node[]) {
        if (
          child.type === 'JSXExpressionContainer' &&
          child.expression.type === 'TemplateLiteral'
        ) {
          const code = child.expression.quasis[0].value.cooked ?? ''
          codes.push({ code, noInline })
        }
      }
    },
  })

  return codes
}

describe('Examples live code', () => {
  it.each(exampleFiles)(
    '%s produces live code that parses',
    async (file) => {
      const { parse } = await import('@babel/parser')

      for (const { code, noInline } of await getLiveCodes(file)) {
        // Inline examples are wrapped in a fragment by the live preview
        const source = noInline ? code : `<>${code}</>`

        expect(() =>
          parse(source, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
          })
        ).not.toThrow()
      }
    }
  )
})
