import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from '@11ty/gray-matter'

const propertiesUsagePath = fileURLToPath(
  new URL(
    '../../../../packages/dnb-design-system-portal/src/docs/_shared/_properties-usage.mdx',
    import.meta.url
  )
)

export async function readPropertiesUsage(inputPath: string) {
  if (path.basename(inputPath) !== 'properties.mdx') {
    return ''
  }

  const { data } = matter(await fs.readFile(inputPath, 'utf-8'))
  if (data.hidePropertiesUsage) {
    return ''
  }

  return (await fs.readFile(propertiesUsagePath, 'utf-8')).trim()
}
