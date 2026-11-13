import { createHash } from 'node:crypto'
import { buildReport } from '../monitoring/report.ts'
import type { Check, CheckOptions, Report } from '../monitoring/report.ts'
import { createProbe } from '../monitoring/probe.ts'
import { runDiagnosticCli } from '../monitoring/diagnostic-cli.ts'

const cdn = 'https://assets.eufemia.dnb.no'
const registry = 'https://registry.npmjs.org/@dnb%2feufemia'
const origin = 'https://eufemia.dnb.no'
const graceMs = 60 * 60 * 1000
const stableCacheMs = 24 * 60 * 60 * 1000
const assets = [
  {
    path: 'fonts/dnb/DNB-Regular.woff2',
    type: 'font/woff2',
    magic: '774f4632',
  },
  {
    path: 'fonts/dnb/DNB-Bold.woff2',
    type: 'font/woff2',
    magic: '774f4632',
  },
  {
    path: 'images/dnb/dnb-logo.png',
    type: 'image/png',
    magic: '89504e470d0a1a0a',
  },
]

export async function checkCdn(
  options: CheckOptions = {}
): Promise<Report> {
  const request = options.fetch ?? fetch
  const now = options.now ?? Date.now()
  const checks: Check[] = []
  const probe = createProbe(checks, options.sleep)

  function probeUrl<T>(
    name: string,
    url: string,
    validate: (body: Buffer, response: Response) => T
  ): Promise<T | undefined> {
    return probe(
      name,
      async () => {
        const response = await request(url, {
          headers: { Origin: origin },
          redirect: 'error',
          signal: AbortSignal.timeout(10_000),
        })
        if (response.status !== 200) {
          await response.body?.cancel()
          throw new Error(`HTTP ${response.status}`)
        }
        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('Empty response')
        }
        const chunks: Uint8Array[] = []
        let size = 0
        try {
          while (true) {
            const { value, done } = await reader.read()
            if (done) {
              break
            }
            size += value.length
            if (size > 5 * 1024 * 1024) {
              throw new Error('Response exceeds 5 MiB')
            }
            chunks.push(value)
          }
        } finally {
          await reader.cancel()
        }
        return validate(Buffer.concat(chunks), response)
      },
      url
    )
  }

  async function checkAssets(
    prefix: string,
    hashes?: Map<string, string>,
    monitoredAssets = assets
  ) {
    const results = await Promise.all(
      monitoredAssets.map((asset) =>
        probeUrl(
          `${prefix || 'stable/'}${asset.path}`,
          `${cdn}/${prefix}${asset.path}`,
          (body, response) => {
            if (
              response.headers.get('content-type')?.split(';')[0] !==
              asset.type
            ) {
              throw new Error(`Expected Content-Type ${asset.type}`)
            }
            if (
              response.headers.get('access-control-allow-origin') !== '*'
            ) {
              throw new Error('Expected public CORS access')
            }
            if (
              !body
                .subarray(0, asset.magic.length / 2)
                .equals(Buffer.from(asset.magic, 'hex'))
            ) {
              throw new Error('Invalid asset signature')
            }
            if (
              hashes &&
              createHash('sha256').update(body).digest('hex') !==
                hashes.get(asset.path)
            ) {
              throw new Error('Asset does not match deployment manifest')
            }
            return createHash('sha256').update(body).digest('hex')
          }
        )
      )
    )
    return results
  }

  // Stable availability is checked even when npm cannot answer.
  const stable = checkAssets('')
  const metadata = await probeUrl('npm latest', registry, (body) => {
    const data = JSON.parse(body.toString())
    const latest = data['dist-tags']?.latest
    if (typeof latest !== 'string' || !/^\d+\.\d+\.\d+$/.test(latest)) {
      throw new Error('npm latest must be a stable version')
    }
    const publishedAt = Date.parse(data.time?.[latest])
    if (!Number.isFinite(publishedAt) || publishedAt > now + 5 * 60_000) {
      throw new Error('Invalid npm publication time')
    }
    const previous = Object.keys(data.time)
      .filter(
        (version) =>
          /^\d+\.\d+\.\d+$/.test(version) &&
          Date.parse(data.time[version]) < publishedAt
      )
      .sort(
        (a, b) => Date.parse(data.time[b]) - Date.parse(data.time[a])
      )[0]
    return { latest, publishedAt, previous }
  })

  async function checkVersion(version: string) {
    const prefix = `v${version}/`
    const hashes = await probeUrl(
      `${prefix}manifest`,
      `${cdn}/${prefix}.manifest.sha256`,
      (body) => {
        const entries = new Map<string, string>()
        for (const line of body.toString().trim().split('\n')) {
          const match = /^([a-f0-9]{64}) {2}assets\/(.+)$/.exec(line)
          if (!match || entries.has(match[2])) {
            throw new Error('Invalid deployment manifest')
          }
          entries.set(match[2], match[1])
        }
        if (assets.some((asset) => !entries.has(asset.path))) {
          throw new Error(
            'Deployment manifest is missing monitored assets'
          )
        }
        return entries
      }
    )
    await checkAssets(prefix, hashes)
    if (hashes) {
      const currentFonts = [...hashes.keys()]
        .filter((path) =>
          /^fonts\/dnb\/(?:web\/)?DNBSans(?:Text|Mono|Display)[^/]*\.woff2$/.test(
            path
          )
        )
        .map((path) => ({ path, type: 'font/woff2', magic: '774f4632' }))
      await checkAssets(prefix, hashes, currentFonts)
    }
    return hashes
  }

  if (metadata) {
    const start = checks.length
    const hashes = await checkVersion(metadata.latest)
    const stableHashes = await stable
    if (hashes && now - metadata.publishedAt >= stableCacheMs + graceMs) {
      assets.forEach((asset, index) => {
        if (stableHashes[index]) {
          checks.push({
            name: `stable-manifest/${asset.path}`,
            ok: stableHashes[index] === hashes.get(asset.path),
            detail: `Stable alias must match npm ${metadata.latest} after the edge cache settles`,
          })
        }
      })
    }
    if (now - metadata.publishedAt < graceMs) {
      for (const check of checks.slice(start)) {
        if (
          !check.ok &&
          check.name.startsWith(`v${metadata.latest}/`) &&
          /HTTP (403|404)$/.test(check.detail)
        ) {
          check.pending = true
          check.detail += ' (within the 60-minute deployment grace period)'
        }
      }
      if (metadata.previous) {
        await checkVersion(metadata.previous)
      }
    }
  }
  await stable
  return buildReport(checks, now, metadata?.latest)
}

await runDiagnosticCli(import.meta.url, 'CDN', () => checkCdn())
