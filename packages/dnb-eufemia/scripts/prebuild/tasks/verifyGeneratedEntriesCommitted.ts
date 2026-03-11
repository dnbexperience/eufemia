import path from 'path'
import { execSync } from 'child_process'

export const GENERATED_ENTRY_FILE_PATTERNS = [
  /^src\/index\.(ts|js)$/,
  /^src\/components\/index\.(ts|js)$/,
  /^src\/components\/lib\.(ts|js)$/,
  /^src\/elements\/index\.(ts|js)$/,
  /^src\/elements\/lib\.(ts|js)$/,
  /^src\/fragments\/index\.(ts|js)$/,
  /^src\/fragments\/lib\.(ts|js)$/,
  /^src\/extensions\/index\.(ts|js)$/,
  /^src\/extensions\/lib\.(ts|js)$/,
  /^src\/components\/[A-Z][A-Za-z0-9]*\.(ts|js)$/,
  /^src\/elements\/[A-Z][A-Za-z0-9]*\.(ts|js)$/,
  /^src\/fragments\/[A-Z][A-Za-z0-9]*\.(ts|js)$/,
  /^src\/style\/dnb-ui-(components|elements|fragments|extensions|forms)\.scss$/,
]

const normalizeChangedFilePath = (file: string) =>
  file.replace(/^\.\//, '').replace(/^packages\/dnb-eufemia\//, '')

export const verifyGeneratedEntriesCommitted = () => {
  const packageRoot = path.resolve(__dirname, '../../..')
  const changedFiles = execSync(
    'git status --porcelain --untracked-files=no',
    {
      cwd: packageRoot,
      encoding: 'utf-8',
    }
  )
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3).trim())
    .map(normalizeChangedFilePath)
    .filter(Boolean)
  const changedGeneratedEntries = changedFiles.filter((file) =>
    GENERATED_ENTRY_FILE_PATTERNS.some((pattern) => pattern.test(file))
  )

  if (changedGeneratedEntries.length > 0) {
    throw new Error(
      [
        'Generated entry files changed during CI prebuild.',
        'Please run the prebuild locally and commit the generated entries before pushing.',
        '',
        ...changedGeneratedEntries.map((file) => `- ${file}`),
      ].join('\n')
    )
  }
}

if (require.main === module) {
  verifyGeneratedEntriesCommitted()
}
