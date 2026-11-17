import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { expect, it } from 'vitest'

it('publishes exact font bytes at immutable content addresses without deleting older revisions', () => {
  const workflow = fs.readFileSync(
    path.resolve(import.meta.dirname, '../ghe-deploy-workflow.yml'),
    'utf8'
  )
  const script = workflow
    .slice(
      workflow.indexOf('          FONT_FILES=$(mktemp -d)'),
      workflow.indexOf('          if [[ "$VERSION" != *-* ]]')
    )
    .replace(/^ {10}/gm, '')
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'font-publishing-'))
  try {
    const fonts = path.join(dir, 'assets/fonts/nested folder')
    fs.mkdirSync(fonts, { recursive: true })
    for (const extension of ['woff2', 'woff', 'ttf', 'otf']) {
      fs.writeFileSync(path.join(fonts, 'Font.' + extension), extension)
    }
    fs.writeFileSync(path.join(fonts, 'Font.zip'), 'archive')
    const uploaded = path.join(dir, 'uploaded')
    fs.mkdirSync(uploaded)
    fs.writeFileSync(path.join(uploaded, 'previous.woff2'), 'previous')
    fs.writeFileSync(
      path.join(dir, 'aws'),
      [
        '#!' + process.execPath,
        "const fs = require('node:fs')",
        'const args = process.argv.slice(2)',
        'fs.writeFileSync(process.env.ARGS_FILE, JSON.stringify(args))',
        'fs.cpSync(args[2], process.env.UPLOADED, { recursive: true })',
      ].join('\n'),
      { mode: 0o755 }
    )
    const result = spawnSync('bash', ['-euc', script], {
      cwd: dir,
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: dir + ':' + process.env.PATH,
        BUCKET: 'test-bucket',
        UPLOADED: uploaded,
        ARGS_FILE: path.join(dir, 'args.json'),
      },
    })
    expect(result.error).toBeUndefined()
    expect(result.stderr).toBe('')
    expect(result.status).toBe(0)
    const args = JSON.parse(
      fs.readFileSync(path.join(dir, 'args.json'), 'utf8')
    )
    expect(args.slice(3)).toEqual([
      's3://test-bucket/font-files/',
      '--cache-control',
      'public,max-age=31536000,immutable',
    ])
    expect(args).not.toContain('--delete')
    for (const extension of ['woff2', 'woff', 'ttf', 'otf']) {
      const hash = createHash('sha256').update(extension).digest('hex')
      expect(
        fs.readFileSync(
          path.join(uploaded, hash + '.' + extension),
          'utf8'
        )
      ).toBe(extension)
    }
    expect(fs.readdirSync(uploaded)).toHaveLength(5)
    expect(
      fs.readFileSync(path.join(uploaded, 'previous.woff2'), 'utf8')
    ).toBe('previous')
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
