import { createHash } from 'node:crypto'
import { appendFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

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

export type Check = {
  name: string
  ok: boolean
  detail: string
  pending?: boolean
}
export type Report = {
  status: 'healthy' | 'pending' | 'unhealthy'
  checkedAt: string
  latest?: string
  checks: Check[]
}

type Options = {
  fetch?: typeof fetch
  now?: number
  sleep?: (ms: number) => Promise<void>
}

export async function checkCdn(options: Options = {}): Promise<Report> {
  const request = options.fetch ?? fetch
  const now = options.now ?? Date.now()
  const sleep =
    options.sleep ??
    ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))
  const checks: Check[] = []

  async function probe<T>(
    name: string,
    url: string,
    validate: (body: Buffer, response: Response) => T
  ): Promise<T | undefined> {
    let detail = ''
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
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
        const result = validate(Buffer.concat(chunks), response)
        checks.push({ name, ok: true, detail: url })
        return result
      } catch (error) {
        detail = error instanceof Error ? error.message : 'Request failed'
        if (attempt < 2) {
          await sleep(2000 * (attempt + 1))
        }
      }
    }
    checks.push({ name, ok: false, detail: `${url}: ${detail}` })
  }

  async function checkAssets(
    prefix: string,
    hashes?: Map<string, string>
  ) {
    const results = await Promise.all(
      assets.map((asset) =>
        probe(
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
  const metadata = await probe('npm latest', registry, (body) => {
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
    const hashes = await probe(
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
    return hashes
  }

  let pending = false
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
          pending = true
          check.detail += ' (within the 60-minute deployment grace period)'
        }
      }
      if (metadata.previous) {
        await checkVersion(metadata.previous)
      }
    }
  }
  await stable
  checks.sort((a, b) => a.name.localeCompare(b.name))
  const failed = checks.some((check) => !check.ok && !check.pending)
  return {
    status: failed ? 'unhealthy' : pending ? 'pending' : 'healthy',
    checkedAt: new Date(now).toISOString(),
    latest: metadata?.latest,
    checks,
  }
}

export function summarize(report: Report) {
  return [
    `CDN status: ${report.status}`,
    `Checked: ${report.checkedAt}`,
    `npm latest: ${report.latest ?? 'unknown'}`,
    '',
    ...report.checks.map(
      (check) =>
        `${check.ok ? 'PASS' : check.pending ? 'WAIT' : 'FAIL'} ${check.name}: ${check.detail}`
    ),
  ].join('\n')
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  let report: Report
  try {
    report = await checkCdn()
  } catch {
    report = {
      status: 'unhealthy',
      checkedAt: new Date().toISOString(),
      checks: [
        {
          name: 'monitor',
          ok: false,
          detail:
            'The CDN diagnostic could not complete its checks. See the workflow logs.',
        },
      ],
    }
  }
  writeFileSync(
    'cdn-health-report.json',
    JSON.stringify(report, null, 2) + '\n'
  )
  const summary = summarize(report)
  process.stdout.write(summary + '\n')
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
  }
  process.exitCode = report.status === 'unhealthy' ? 1 : 0
}
