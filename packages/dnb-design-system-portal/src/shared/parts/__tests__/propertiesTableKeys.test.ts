import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { visit } from 'unist-util-visit'

const docsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../docs'
)

function findFilteredTables() {
  const tables = []

  for (const file of readdirSync(docsDir, {
    recursive: true,
    encoding: 'utf-8',
  })) {
    if (!file.endsWith('.mdx')) {
      continue
    }

    const source = readFileSync(path.join(docsDir, file), 'utf-8')
    if (
      !source.includes('<PropertiesTable') ||
      !/\b(omit|pick)=\{/.test(source)
    ) {
      continue
    }

    const tree = unified().use(remarkParse).use(remarkMdx).parse(source)

    const imports = new Map<string, { source: string; name: string }>()
    visit(tree, 'mdxjsEsm', (node: any) => {
      for (const statement of node.data.estree.body) {
        for (const specifier of statement.specifiers ?? []) {
          imports.set(specifier.local.name, {
            source: statement.source.value,
            name: specifier.imported?.name ?? 'default',
          })
        }
      }
    })

    visit(tree, (node: any) => {
      if (
        node.type.startsWith('mdxJsx') &&
        node.name === 'PropertiesTable'
      ) {
        const attributes = Object.fromEntries(
          node.attributes.map((attribute) => [
            attribute.name,
            attribute.value?.data?.estree?.body[0]?.expression,
          ])
        )
        if (attributes.omit || attributes.pick) {
          tables.push({ file, imports, attributes })
        }
      }
    })
  }

  return tables
}

describe('PropertiesTable in the docs', () => {
  it('only omits or picks keys that exist in its props', async () => {
    const tables = findFilteredTables()
    const problems = []

    for (const { file, imports, attributes } of tables) {
      if (attributes.props?.type !== 'Identifier') {
        problems.push(`${file}: pass an imported object as props`)
        continue
      }

      const { source, name } = imports.get(attributes.props.name)
      const props = (await import(source))[name]

      for (const filter of ['omit', 'pick']) {
        for (const { value } of attributes[filter]?.elements ?? []) {
          if (!Object.hasOwn(props, value)) {
            problems.push(
              `${file}: ${filter} "${value}" is not in ${attributes.props.name}`
            )
          }
        }
      }
    }

    // Guard against the scan silently matching nothing.
    expect(tables.length).toBeGreaterThan(20)
    expect(problems).toEqual([])
  }, 30000)
})
