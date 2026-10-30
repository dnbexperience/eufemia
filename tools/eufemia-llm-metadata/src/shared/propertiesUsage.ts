import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

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

  return (await fs.readFile(propertiesUsagePath, 'utf-8')).trim()
}
