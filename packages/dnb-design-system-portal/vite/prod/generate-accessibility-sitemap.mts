import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import {
  createCanonicalUrls,
  createPortalSitemap,
} from './portal-sitemap.mts'
import {
  isFirstTabPage,
  type PageFileInfo,
} from '../client/plugins/portal-pages.shared.ts'

main()

async function main() {
  const docsDirectory = process.argv[2]
  const outputPath = process.argv[3] || 'public/sitemap.json'
  if (!docsDirectory) {
    throw new Error('Provide the deployed documentation directory')
  }

  const server = await createServer({
    configFile: false,
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const pluginPath = fileURLToPath(
      new URL('../client/plugins/portal-pages.ts', import.meta.url)
    )
    const { getPortalPages } = await server.ssrLoadModule(pluginPath)
    const { files, allMdxNodes } = getPortalPages(
      path.resolve(docsDirectory)
    )
    const urls = files
      .filter(
        (file: PageFileInfo) =>
          file.type === 'mdx' && !isFirstTabPage(file)
      )
      .map(({ slug }: PageFileInfo) => `/${slug}/`)
    const sitemap = createPortalSitemap(
      ['/', '/500/', ...urls],
      createCanonicalUrls(allMdxNodes)
    )

    if (sitemap.pages.length <= 2) {
      throw new Error('No deployed documentation pages found')
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, JSON.stringify(sitemap))
    process.stdout.write(
      `Generated sitemap for ${sitemap.pages.length} deployed pages\n`
    )
  } finally {
    await server.close()
  }
}
