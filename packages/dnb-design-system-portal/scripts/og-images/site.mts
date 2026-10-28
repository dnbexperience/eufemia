import {
  readFile,
  writeFile,
  readdir,
  copyFile,
  mkdir,
} from 'node:fs/promises'
import path from 'node:path'
import { realpathSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse } from 'parse5'
import { socialImageTags } from '../../src/shared/social-image.mjs'
import { stampSite } from './deployment.mts'

export function updateImageTags(
  html: string,
  route: string,
  manifest: Record<string, unknown>
) {
  const document = parse(html, { sourceCodeLocationInfo: true })
  const root = document.childNodes.find((node) => node.nodeName === 'html')
  const head =
    root && 'childNodes' in root
      ? root.childNodes.find((node) => node.nodeName === 'head')
      : undefined
  if (!head || !('tagName' in head) || !head.sourceCodeLocation?.endTag) {
    return html
  }
  const end = head.sourceCodeLocation.endTag.startOffset
  const tags = socialImageTags(route, manifest)
  const edits = [
    {
      start: end,
      end,
      text: tags.length ? tags.join('\n') + '\n' : '',
    },
  ]
  for (const node of head.childNodes) {
    if (node.nodeName !== 'meta' || !('attrs' in node)) {
      continue
    }
    const key = node.attrs
      .find(({ name }) => name === 'property' || name === 'name')
      ?.value.toLowerCase()
    const location = node.sourceCodeLocation
    if (
      location &&
      (key === 'og:image' ||
        key?.startsWith('og:image:') ||
        key === 'twitter:card' ||
        key === 'twitter:image' ||
        key?.startsWith('twitter:image:'))
    ) {
      let end = location.endOffset
      if (html[end] === '\n') {
        end++
      }
      edits.push({ start: location.startOffset, end, text: '' })
    }
  }
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    html = html.slice(0, edit.start) + edit.text + html.slice(edit.end)
  }
  return html
}

export async function prepareSite(
  site: string,
  images: string,
  runId: number
) {
  if (!Number.isSafeInteger(runId) || runId <= 0) {
    throw new Error('Invalid Portal deployment reference')
  }
  const manifest = JSON.parse(
    await readFile(path.join(images, 'manifest.json'), 'utf8')
  )
  const target = path.join(site, 'og')
  await mkdir(target, { recursive: true })
  await copyFile(
    path.join(images, 'manifest.json'),
    path.join(target, 'manifest.json')
  )
  let count = 0
  async function visit(directory: string) {
    for (const entry of await readdir(directory, {
      withFileTypes: true,
    })) {
      if (entry.isSymbolicLink()) {
        throw new Error('Portal snapshots must contain ordinary files')
      }
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        if (!['og', 'assets', 'server'].includes(entry.name)) {
          await visit(file)
        }
      } else if (entry.name === 'index.html') {
        const relative = path
          .relative(site, directory)
          .split(path.sep)
          .join('/')
        const route = relative ? '/' + relative + '/' : '/'
        const html = await readFile(file, 'utf8')
        await writeFile(file, updateImageTags(html, route, manifest))
        count++
      }
    }
  }
  await visit(site)
  await stampSite(site, runId)
  return count
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
) {
  const portal = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../..'
  )
  const site = path.resolve(
    process.env.OG_SITE_OUTPUT || path.join(portal, 'public')
  )
  const runId = Number(process.env.GITHUB_RUN_ID)
  if (process.argv[2] === 'prepare') {
    console.log(
      'Updated social image metadata on ' +
        (await prepareSite(site, path.join(portal, 'static/og'), runId)) +
        ' pages'
    )
  } else {
    throw new Error('Expected prepare')
  }
}
