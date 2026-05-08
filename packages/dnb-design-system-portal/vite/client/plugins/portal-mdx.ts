import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'

export default function portalMdxPlugin() {
  return {
    enforce: 'pre' as const,
    ...mdx({
      providerImportSource: '@mdx-js/react',
      // portal-pages reads frontmatter from the source files directly.
      // Avoid exporting frontmatter from runtime MDX modules because
      // React Fast Refresh treats that as an incompatible export.
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    }),
  }
}
