import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const workflow = fs.readFileSync(
  path.resolve(
    import.meta.dirname,
    '../../../.github/workflows/assets.yml'
  ),
  'utf8'
)
const script = workflow
  .slice(workflow.lastIndexOf('run: |\n') + 'run: |\n'.length)
  .replace(/^ {10}/gm, '')
const policy = "default-src 'none'; style-src 'unsafe-inline'; sandbox"
const fonts = [
  { path: 'fonts/new-brand/nested/Regular.woff2', hash: 'a'.repeat(64) },
  { path: 'fonts/new-brand/Italic.woff', hash: 'b'.repeat(64) },
  { path: 'fonts/new-brand/Regular.ttf', hash: 'c'.repeat(64) },
  { path: 'fonts/new-brand/Display.otf', hash: 'd'.repeat(64) },
  { path: 'fonts/another brand/Same font.woff2', hash: 'a'.repeat(64) },
]
const svg = '/v11.0.0/icons/dnb/add.svg'

function expectedCalls(entries = fonts) {
  return [
    svg,
    ...entries.flatMap(({ path, hash }) => [
      '/v11.0.0/' + path.replaceAll(' ', '%20'),
      '/font-files/' + hash + '.' + path.split('.').at(-1),
    ]),
  ]
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort()
}

const validHeaders = 'Content-Security-Policy: ' + policy + '\r\n'

function verify(
  headers: string,
  options: {
    svgHeaders?: string
    addressedHeaders?: string
    addressedStatus?: string
    status?: string
    retry?: boolean
    fonts?: typeof fonts
  } = {}
) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'published-assets-'))
  try {
    fs.writeFileSync(
      path.join(dir, 'curl'),
      [
        '#!' + process.execPath,
        "const fs = require('node:fs')",
        'const args = process.argv.slice(2)',
        'const callsFile = process.env.CALLS_FILE',
        'const calls = fs.existsSync(callsFile) ? JSON.parse(fs.readFileSync(callsFile)) : []',
        'const url = args.at(-1)',
        "if (url.endsWith('.manifest.sha256')) {",
        "  fs.writeFileSync(args[args.indexOf('--output') + 1], process.env.FIXTURE_MANIFEST)",
        "  process.stdout.write('200')",
        '  process.exit(0)',
        '}',
        "const headers = calls.length > 0 && process.env.RETRY === 'true'",
        '  ? process.env.VALID_HEADERS',
        "  : url.includes('/font-files/') ? process.env.ADDRESSED_HEADERS : url.endsWith('.svg') ? process.env.SVG_HEADERS : process.env.FONT_HEADERS",
        'calls.push(new URL(url).pathname)',
        'fs.writeFileSync(callsFile, JSON.stringify(calls))',
        "const index = args.indexOf('--dump-header')",
        'if (index !== -1) { fs.writeFileSync(args[index + 1], headers) }',
        "process.stdout.write(url.includes('/font-files/') ? process.env.ADDRESSED_STATUS : process.env.STATUS)",
      ].join('\n'),
      { mode: 0o755 }
    )
    fs.writeFileSync(
      path.join(dir, 'date'),
      [
        '#!/bin/bash',
        'count=$(cat "$DATE_COUNT" 2>/dev/null || echo 0)',
        'echo $((count + 1)) > "$DATE_COUNT"',
        'if [ "$count" -lt 3 ]; then echo 0; else echo 1800; fi',
      ].join('\n'),
      { mode: 0o755 }
    )
    fs.writeFileSync(path.join(dir, 'sleep'), '#!/bin/bash\nexit 0\n', {
      mode: 0o755,
    })

    const result = spawnSync('bash', ['-c', script], {
      encoding: 'utf8',
      timeout: 5000,
      env: {
        ...process.env,
        PATH: dir + ':' + process.env.PATH,
        TMPDIR: dir,
        ASSET_VERSION: 'v11.0.0',
        CALLS_FILE: path.join(dir, 'calls.json'),
        DATE_COUNT: path.join(dir, 'date-count'),
        FONT_HEADERS: headers,
        SVG_HEADERS: options.svgHeaders ?? headers,
        ADDRESSED_HEADERS: options.addressedHeaders ?? headers,
        ADDRESSED_STATUS:
          options.addressedStatus ?? options.status ?? '200',
        VALID_HEADERS: validHeaders,
        STATUS: options.status ?? '200',
        RETRY: String(options.retry ?? false),
        FIXTURE_MANIFEST: [
          ...(options.fonts ?? fonts).map(
            ({ path, hash }) => hash + '  assets/' + path
          ),
          'e'.repeat(64) + '  assets/icons/dnb/add.svg',
          'f'.repeat(64) + '  assets/fonts/README.md',
        ].join(String.fromCharCode(10)),
      },
    })
    expect(result.error).toBeUndefined()
    return {
      status: result.status,
      calls: fs.existsSync(path.join(dir, 'calls.json'))
        ? JSON.parse(fs.readFileSync(path.join(dir, 'calls.json'), 'utf8'))
        : [],
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

describe('published assets verification', () => {
  it('discovers font paths and formats without requiring a known family', () => {
    const result = verify(validHeaders)
    expect(result.status).toBe(0)
    expect(result.calls.sort()).toEqual(expectedCalls())
  })

  it('verifies older releases using only the fonts in their manifest', () => {
    const legacy = [
      { path: 'fonts/dnb/DNB-Regular.woff2', hash: 'a'.repeat(64) },
    ]
    const result = verify(validHeaders, { fonts: legacy })
    expect(result.status).toBe(0)
    expect(result.calls.sort()).toEqual(expectedCalls(legacy))
  })

  it('does not accept a manifest without fonts', () => {
    const result = verify(validHeaders, { fonts: [] })
    expect(result.status).toBe(1)
    expect(result.calls).toEqual([])
  })

  it.each([
    '',
    'Content-Security-Policy-Report-Only: ' + policy + '\r\n',
    'Content-Security-Policy: default-src *\r\n',
    'Content-Security-Policy: ' + policy + ' allow-scripts\r\n',
  ])('fails when HTTP 200 has no matching enforced CSP: %j', (headers) => {
    expect(verify(headers).status).toBe(1)
  })

  it('fails when only the SVG is missing the CSP', () => {
    expect(verify(validHeaders, { svgHeaders: '' }).status).toBe(1)
  })

  it('requires HTTP 200 and CSP on content-addressed fonts', () => {
    expect(verify(validHeaders, { addressedHeaders: '' }).status).toBe(1)
    expect(verify(validHeaders, { addressedStatus: '404' }).status).toBe(1)
  })

  it('still requires HTTP 200', () => {
    expect(verify(validHeaders, { status: '403' }).status).toBe(1)
  })

  it('accepts case-insensitive header names and an optional trailing semicolon', () => {
    expect(
      verify('content-security-policy: ' + policy + ';\r\n').status
    ).toBe(0)
  })

  it('retries until the CSP has propagated', () => {
    const result = verify('', { retry: true })
    expect(result.status).toBe(0)
    const calls = expectedCalls()
    expect(result.calls.slice(-calls.length).sort()).toEqual(calls)
    expect(result.calls.length).toBeGreaterThan(calls.length)
  })
})
