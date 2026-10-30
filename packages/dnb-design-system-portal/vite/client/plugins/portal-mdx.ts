import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'
import type { Root } from 'hast'
import path from 'node:path'

// Keep the editor and highlighter in the route chunks that actually use them.
function routeCodeBlocks() {
  return (tree: Root) => {
    let hasCode = false
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        hasCode = true
        Object.assign(node, {
          type: 'mdxJsxFlowElement',
          name: 'PortalMarkdownCodeBlock',
          attributes: [],
        })
      }
    })
    if (hasCode) {
      tree.children.unshift({
        type: 'mdxjsEsm',
        value: '',
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
            body: [
              {
                type: 'ImportDeclaration',
                attributes: [],
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
                    local: {
                      type: 'Identifier',
                      name: 'PortalMarkdownCodeBlock',
                    },
                  },
                ],
                source: {
                  type: 'Literal',
                  value: path
                    .resolve(
                      __dirname,
                      '../../../src/shared/tags/MarkdownCodeBlock.tsx'
                    )
                    .replaceAll('\\', '/'),
                },
              },
            ],
          },
        },
      })
    }
  }
}

export default function portalMdxPlugin() {
  return {
    enforce: 'pre' as const,
    ...mdx({
      providerImportSource: '@mdx-js/react',
      // portal-pages reads frontmatter from the source files directly.
      // Avoid exporting frontmatter from runtime MDX modules because
      // React Fast Refresh treats that as an incompatible export.
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [routeCodeBlocks],
    }),
  }
}
