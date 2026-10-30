import fs from 'fs-extra'
import path from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { zipSync, type Zippable } from 'fflate'
import packageJson from '../../../package.json'
import vdToolPackage from 'vd-tool/package.json'

type IconFile = { iconFile: string; category: string }

export async function createIconDownloads({
  destDir,
  manifestFile,
  files,
  buildAndroid,
}: {
  destDir: string
  manifestFile: string
  files: IconFile[]
  buildAndroid: () => Promise<void>
}) {
  const sortedFiles = files
    .map(({ iconFile, category }) => ({ iconFile, category }))
    .sort((a, b) => a.iconFile.localeCompare(b.iconFile, 'en'))
  const sources = []
  const hash = createHash('sha256')
  for (const { iconFile } of sortedFiles) {
    const bytes = await fs.readFile(path.join(destDir, iconFile))
    sources.push({ iconFile, bytes })
    hash.update(JSON.stringify([iconFile, bytes.length])).update(bytes)
  }
  const contentHash = hash.digest('hex')
  const zipHash = createHash('sha256')
    .update(contentHash)
    .update(await fs.readFile(__filename))
    .update(JSON.stringify(sharp.versions))
    .update(packageJson.devDependencies.fflate)
    .digest('hex')
  const androidHash = createHash('sha256')
    .update(contentHash)
    .update(JSON.stringify(sortedFiles))
    .update(await fs.readFile(path.join(__dirname, 'assetsExtractors.ts')))
    .update(vdToolPackage.version)
    .digest('hex')

  let previous: { zip?: string; android?: string } = {}
  if (await fs.pathExists(manifestFile)) {
    previous = await fs.readJson(manifestFile)
  }

  const zipFile = path.join(destDir, 'eufemia-icons.zip')
  const rebuildZip =
    previous.zip !== zipHash || !(await fs.pathExists(zipFile))
  const rebuildAndroid =
    previous.android !== androidHash ||
    !(await fs.pathExists(path.join(destDir, 'eufemia-icons-xml.tgz'))) ||
    !(await fs.pathExists(
      path.join(destDir, 'eufemia-icons-xml-categorized.tgz')
    ))

  if (!rebuildZip && !rebuildAndroid) {
    return
  }

  // A failed rebuild must not leave the previous fingerprint valid.
  await fs.remove(manifestFile)

  if (rebuildZip) {
    const entries: Zippable = {}
    // Fixed timestamps make repeated exports byte-identical.
    const mtime = new Date(1980, 0, 1)
    for (const { iconFile, bytes } of sources) {
      entries[`svg/${iconFile}`] = [bytes, { mtime }]
      entries[`png/${iconFile.replace(/\.svg$/, '.png')}`] = [
        await sharp(bytes).png().toBuffer(),
        { mtime, level: 0 },
      ]
    }
    await fs.writeFile(zipFile, zipSync(entries, { level: 6 }))
  }

  if (rebuildAndroid) {
    await buildAndroid()
  }

  await fs.outputJson(
    manifestFile,
    { zip: zipHash, android: androidHash },
    { spaces: 2 }
  )
}
