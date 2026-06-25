import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'
import { stat } from 'fs/promises'

const folderPath = './src'
const targetString = '@dnb/eufemia/src'
const replacementString = '@dnb/eufemia'
const sourcePluginImport = '@dnb/eufemia/src/style/vite-plugin.ts'
const publishedPluginImport = '@dnb/eufemia/style/vite-plugin.js'

async function replaceInFile(filePath) {
  const content = await readFile(filePath, 'utf8')
  const newContent = content.split(targetString).join(replacementString)

  if (newContent !== content) {
    await writeFile(filePath, newContent, 'utf8')
    console.log(`Updated: ${filePath}`)
  }
}

async function processFolder(folder) {
  const entries = await readdir(folder, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(folder, entry.name)
    const fileStats = await stat(fullPath)

    if (fileStats.isDirectory()) {
      await processFolder(fullPath)
    } else if (fileStats.isFile()) {
      await replaceInFile(fullPath)
    }
  }
}

await processFolder(folderPath)

const viteConfigPath = './vite.config.ts'
const viteConfig = await readFile(viteConfigPath, 'utf8')
const publishedViteConfig = viteConfig.replace(
  sourcePluginImport,
  publishedPluginImport
)

if (publishedViteConfig === viteConfig) {
  throw new Error(
    `Could not find "${sourcePluginImport}" in ${viteConfigPath}`
  )
}

await writeFile(viteConfigPath, publishedViteConfig, 'utf8')
