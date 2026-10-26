import { createHash } from 'node:crypto'
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Browser, Page } from '@playwright/test'
import sharp from 'sharp'
import {
  extractCard,
  discoverRoutes,
  type CardContent,
} from './content.mts'
import { renderScreenshot } from './image.mts'

const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(scriptRoot, '../..')
const root = path.resolve(
  process.env.OG_OUTPUT || path.join(portalRoot, '.og-catalogue')
)
const origin = process.env.OG_ORIGIN || 'https://eufemia.dnb.no'
const url = new URL(origin)
if (
  !['http:', 'https:'].includes(url.protocol) ||
  url.origin !== origin ||
  (origin !== 'https://eufemia.dnb.no' &&
    !['localhost', '127.0.0.1'].includes(url.hostname))
) {
  throw new Error('Use the production Portal or a localhost origin')
}
const command = process.argv[2] || 'plan'
if (!['plan', 'render'].includes(command)) {
  throw new Error('Expected plan or render')
}
const mode = process.env.OG_MODE === 'missing' ? 'missing' : 'refresh'
const hash = (value: string | Buffer) =>
  createHash('sha256').update(value).digest('hex')
type Source = {
  modified?: string
  extraction?: string
  unavailable?: string
  card: CardContent
}
type Entry = {
  file: string
  digest: string
  fingerprint: string
  alt: string
  kind: 'screenshot'
  retryCapture?: boolean
}
type Catalogue = {
  version: 1
  entries: Record<string, Entry>
  sources: Record<string, Source>
}
type Task = {
  card: CardContent
  fingerprint: string
  cropKey: string | null
  needsCrop: boolean
}
type Plan = {
  version: 1
  origin: string
  renderer: string
  mode: string
  tasks: Task[]
  catalogue: Catalogue
  requests: number
  failures: string[]
}

async function json<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(path.join(root, file), 'utf8'))
  } catch (error) {
    if ((error as { code?: string }).code !== 'ENOENT') {
      throw error
    }
    return fallback
  }
}
async function save(file: string, bytes: string | Buffer) {
  if (
    !['plan.json', 'manifest.json', 'last-run.json'].includes(file) &&
    !/^(images|crops)\/[a-f0-9]{64}\.png$/.test(file)
  ) {
    throw new Error('Invalid catalogue output')
  }
  const target = path.join(root, file)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target + '.tmp', bytes)
  await rename(target + '.tmp', target)
}
async function validPng(file: string, digest?: string, fullSize = true) {
  if (!/^(images|crops)\/[a-f0-9]{64}\.png$/.test(file)) {
    return false
  }
  try {
    const bytes = await readFile(path.join(root, file))
    return (
      bytes.length > 24 &&
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) &&
      (!digest || hash(bytes) === digest) &&
      (!fullSize ||
        (bytes.readUInt32BE(16) === 1200 &&
          bytes.readUInt32BE(20) === 630))
    )
  } catch (error) {
    if ((error as { code?: string }).code !== 'ENOENT') {
      throw error
    }
    return false
  }
}
let requests = 0
async function get(route: string, source?: Source) {
  const headers: Record<string, string> = {
    'User-Agent': 'Eufemia-OG-Catalogue/1.0',
  }
  if (typeof source?.modified === 'string') {
    const modified = Date.parse(source.modified)
    if (Number.isFinite(modified)) {
      headers['If-Modified-Since'] = new Date(modified).toUTCString()
    }
  }
  const target = new URL(route, origin)
  if (
    target.origin !== origin ||
    target.pathname !== route ||
    target.search ||
    target.hash
  ) {
    throw new Error('Invalid catalogue route')
  }
  requests++
  const response = await fetch(target, {
    headers,
    redirect: 'error',
    signal: AbortSignal.timeout(20000),
  })
  if (response.status === 304 && source) {
    return { source, text: null }
  }
  if (!response.ok) {
    throw new Error(route + ': HTTP ' + response.status)
  }
  if (Number(response.headers.get('content-length')) > 4 * 1024 * 1024) {
    throw new Error('Document exceeds size budget: ' + route)
  }
  const text = await response.text()
  if (Buffer.byteLength(text) > 4 * 1024 * 1024) {
    throw new Error('Document exceeds size budget: ' + route)
  }
  return {
    text,
    source: {
      modified: response.headers.get('last-modified') || undefined,
    },
  }
}
const renderer = hash(
  JSON.stringify([
    sharp.versions,
    await readFile(path.join(scriptRoot, 'image.mts'), 'utf8'),
    await readFile(path.join(scriptRoot, 'grid.svg'), 'utf8'),
    await readFile(path.join(scriptRoot, 'content.mts'), 'utf8'),
    await readFile(path.join(scriptRoot, 'generate.mts'), 'utf8'),
    await readFile(path.join(scriptRoot, 'capture.mts'), 'utf8'),
    process.platform,
    process.arch,
    process.version,
    JSON.parse(
      await readFile(
        path.resolve(
          portalRoot,
          '../../node_modules/playwright-core/package.json'
        ),
        'utf8'
      )
    ).version,
  ])
)
const captureRenderer = hash(
  JSON.stringify([
    await readFile(path.join(scriptRoot, 'capture.mts'), 'utf8'),
    process.platform,
    process.arch,
    process.version,
    JSON.parse(
      await readFile(
        path.resolve(
          portalRoot,
          '../../node_modules/playwright-core/package.json'
        ),
        'utf8'
      )
    ).version,
  ])
)
const extraction = hash(
  await readFile(path.join(scriptRoot, 'content.mts'), 'utf8')
)

if (command === 'plan') {
  const started = performance.now()
  const catalogue = await json<Catalogue>('manifest.json', {
    version: 1,
    entries: {},
    sources: {},
  })
  if (catalogue.version !== 1) {
    throw new Error('Unsupported catalogue version')
  }
  const index = await get('/llms.txt')
  const robots = (await get('/robots.txt')).text || ''
  const disallowed = [...robots.matchAll(/^Disallow:\s*(\S+)/gm)].map(
    (match) => match[1]
  )
  const only = process.env.OG_ONLY?.split(',')
  const routes = discoverRoutes(index.text || '', origin).filter(
    (route) =>
      !disallowed.some((prefix) => route.startsWith(prefix)) &&
      (!only || only.includes(route))
  )
  const plan: Plan = {
    version: 1,
    origin,
    renderer,
    mode,
    tasks: [],
    catalogue,
    requests: 0,
    failures: [],
  }
  for (const [route, entry] of Object.entries(catalogue.entries)) {
    if (entry.kind !== 'screenshot') {
      delete catalogue.entries[route]
    }
  }
  let cursor = 0
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (cursor < routes.length) {
        const route = routes[cursor++]
        try {
          const previous = catalogue.sources[route]
          const response = await get(
            route,
            previous?.extraction === extraction ? previous : undefined
          )
          const card =
            response.text === null
              ? catalogue.sources[route].card
              : extractCard(response.text, route)
          const captureRoute =
            card.captureRoute === route ? route : route + 'demos/'
          card.captureRoute = captureRoute
          if (captureRoute !== route) {
            const demo = await get(captureRoute)
            const specimen = extractCard(
              demo.text || '',
              card.captureRoute
            )
            card.assets = specimen.assets
            card.captureSelector = specimen.captureSelector
          }
          catalogue.sources[route] = {
            ...response.source,
            extraction,
            card,
            unavailable: previous?.unavailable,
          }
          if (!card.captureSelector) {
            delete catalogue.entries[route]
            continue
          }
          const cropKey = card.captureSelector
            ? hash(
                JSON.stringify([
                  origin,
                  route,
                  card.captureRoute,
                  card.assets,
                  captureRenderer,
                ])
              )
            : null
          if (catalogue.sources[route].unavailable === cropKey) {
            delete catalogue.entries[route]
            continue
          }
          const fingerprint = hash(JSON.stringify([cropKey, renderer]))
          const entry = catalogue.entries[route]
          if (
            entry &&
            (mode === 'missing' ||
              (entry.fingerprint === fingerprint &&
                !entry.retryCapture)) &&
            (await validPng(entry.file, entry.digest))
          ) {
            continue
          }
          const needsCrop = Boolean(
            cropKey &&
            !(await validPng(
              'crops/' + cropKey + '.png',
              undefined,
              false
            ))
          )
          plan.tasks.push({ card, fingerprint, cropKey, needsCrop })
        } catch (error) {
          console.error('Could not inspect ' + route, error)
          plan.failures.push(route + ': page inspection failed')
        }
      }
    })
  )
  plan.tasks.sort((a, b) => a.card.route.localeCompare(b.card.route))
  plan.requests = requests
  await save('plan.json', JSON.stringify(plan, null, 2) + '\n')
  if (!plan.tasks.length && !plan.failures.length) {
    await save('manifest.json', JSON.stringify(catalogue, null, 2) + '\n')
  }
  const result = {
    changed: plan.tasks.length > 0,
    images: plan.tasks.length,
    captures: plan.tasks.filter((task) => task.needsCrop).length,
    requests,
    failures: plan.failures,
    milliseconds: Math.round(performance.now() - started),
  }
  if (process.env.GITHUB_OUTPUT) {
    await writeFile(
      process.env.GITHUB_OUTPUT,
      'changed=' + result.changed + '\ncaptures=' + result.captures + '\n',
      { flag: 'a' }
    )
  }
  console.log(JSON.stringify(result, null, 2))
  if (plan.failures.length) {
    process.exitCode = 1
  }
} else {
  const plan = await json<Plan | null>('plan.json', null)
  if (
    !plan ||
    plan.origin !== origin ||
    plan.renderer !== renderer ||
    plan.failures.length
  ) {
    throw new Error(
      'Run a successful plan with the same source and origin first'
    )
  }
  if (!plan.tasks.length) {
    console.log('No images need rendering.')
    process.exit(0)
  }
  const started = performance.now()
  let browser: Browser | undefined
  let capturePage: Page
  const getCapturePage = async () => {
    if (!capturePage) {
      const { chromium } = await import('@playwright/test')
      browser = await chromium.launch()
      const context = await browser.newContext({
        viewport: { width: 1200, height: 900 },
        deviceScaleFactor: 4,
        colorScheme: 'light',
        reducedMotion: 'reduce',
        locale: 'nb-NO',
        timezoneId: 'Europe/Oslo',
        serviceWorkers: 'block',
      })
      await context.route('**/*', (request) => {
        const target = new URL(request.request().url())
        return (target.origin === origin &&
          !target.pathname.startsWith('/collect')) ||
          ['data:', 'blob:'].includes(target.protocol)
          ? request.continue()
          : request.abort()
      })
      capturePage = await context.newPage()
      await capturePage.clock.setFixedTime(
        new Date('2026-05-15T12:00:00Z')
      )
    }
    return capturePage
  }
  const failures: string[] = []
  let captures = 0
  let fallbacks = 0
  try {
    for (const task of plan.tasks) {
      let crop: Buffer | null = null
      let retryCapture = false
      if (task.cropKey) {
        const cropFile = 'crops/' + task.cropKey + '.png'
        if (task.needsCrop) {
          try {
            const { capturePreview } = await import('./capture.mts')
            const bytes = await capturePreview(
              await getCapturePage(),
              new URL(task.card.captureRoute, origin).href,
              task.card.assets
            )
            await save(cropFile, bytes)
            captures++
          } catch (error) {
            if (
              error instanceof Error &&
              error.message ===
                'Only one socialPreview demo is allowed per page'
            ) {
              throw error
            }
            fallbacks++
            retryCapture = !(
              error instanceof Error &&
              error.message === 'No compact specimen'
            )
            if (!retryCapture) {
              console.warn(
                'No suitable social preview for ' + task.card.route
              )
              plan.catalogue.sources[task.card.route].unavailable =
                task.cropKey || undefined
            }
          }
        }
        if (await validPng(cropFile, undefined, false)) {
          crop = await readFile(path.join(root, cropFile))
        }
      }
      if (!crop) {
        const previous = plan.catalogue.entries[task.card.route]
        if (
          retryCapture &&
          previous?.kind === 'screenshot' &&
          (await validPng(previous.file, previous.digest))
        ) {
          previous.retryCapture = true
        } else {
          delete plan.catalogue.entries[task.card.route]
        }
        continue
      }
      try {
        const image = await renderScreenshot(crop)
        if (image.length > 1024 * 1024) {
          throw new Error('Image exceeds 1 MB')
        }
        const digest = hash(image)
        const file = 'images/' + digest + '.png'
        await save(file, image)
        if (!(await validPng(file, digest))) {
          throw new Error('Invalid output image')
        }
        plan.catalogue.entries[task.card.route] = {
          file,
          kind: 'screenshot',
          digest,
          fingerprint: task.fingerprint,
          alt: task.card.title + '. Component example.',
          ...(retryCapture ? { retryCapture: true } : {}),
        }
      } catch (error) {
        failures.push(task.card.route + ': ' + String(error))
      }
    }
  } finally {
    await browser?.close()
  }
  if (failures.length) {
    throw new Error(failures.join('\n'))
  }
  await save(
    'manifest.json',
    JSON.stringify(plan.catalogue, null, 2) + '\n'
  )
  await save(
    'last-run.json',
    JSON.stringify(
      {
        images: plan.tasks.length,
        captures,
        fallbacks,
        milliseconds: Math.round(performance.now() - started),
      },
      null,
      2
    ) + '\n'
  )
  console.log(await readFile(path.join(root, 'last-run.json'), 'utf8'))
}
