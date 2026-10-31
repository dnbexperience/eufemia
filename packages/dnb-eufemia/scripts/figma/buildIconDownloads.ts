import fs from 'fs-extra'
import path from 'node:path'
import { createIconDownloads } from './tasks/iconDownloads'
import { createXMLTarBundles } from './tasks/assetsExtractors'

async function buildIconDownloads() {
  const destDir = path.resolve(__dirname, '../../assets/icons/dnb')
  const iconsDir = path.resolve(__dirname, '../../src/icons/dnb')
  const lock = await fs.readJson(path.join(iconsDir, 'icons-svg.lock'))
  const files = Object.entries(lock).map(([iconFile, data]) => ({
    ...(data as { name: string; category: string }),
    iconFile,
  }))

  await createIconDownloads({
    destDir,
    manifestFile: path.join(iconsDir, 'icon-downloads.lock'),
    files,
    buildAndroid: () =>
      createXMLTarBundles({ destDir, listOfProcessedFiles: files }),
  })
}

buildIconDownloads().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
