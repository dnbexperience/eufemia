import { build } from 'esbuild'
import { rm, utimes } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

await rm('dist', { recursive: true, force: true })
await build({
  entryPoints: { index: 'src/handler.ts', alarms: 'src/alarm-handler.ts' },
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outdir: 'dist',
  outExtension: { '.js': '.mjs' },
  banner: {
    js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);",
  },
})
// Import the shipped bundle in ESM mode to catch dependency loader failures.
execFileSync(
  process.execPath,
  [
    '--input-type=module',
    '-e',
    "await import('./dist/index.mjs'); await import('./dist/alarms.mjs')",
  ],
  { stdio: 'inherit' }
)
// Stable ZIP metadata lets the handoff skip identical deployment packages.
const archiveTime = new Date('2000-01-01T00:00:00Z')
for (const file of ['index.mjs', 'alarms.mjs']) {
  await utimes('dist/' + file, archiveTime, archiveTime)
}
execFileSync(
  'zip',
  ['-X', '-q', 'lambda.zip', 'index.mjs', 'alarms.mjs'],
  {
    cwd: 'dist',
    env: { ...process.env, TZ: 'UTC' },
  }
)
