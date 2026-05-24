import path from 'path'
import { execSync } from 'child_process'

// Files written by makeReleaseVersion on every build — expected to be dirty after prebuild.
const RELEASE_VERSION_FILES = [
  /^src\/shared\/build-info\/BuildInfoData\.(ts|cjs)$/,
  /^src\/style\/core\/scopes\.scss$/,
  /^src\/scope-hash\.txt$/,
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
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.slice(3).trim())
    .map(normalizeChangedFilePath)

  const unexpectedChanges = changedFiles.filter(
    (file) => !RELEASE_VERSION_FILES.some((pattern) => pattern.test(file))
  )

  if (unexpectedChanges.length > 0) {
    throw new Error(
      [
        'Generated files changed during CI prebuild.',
        'Please run the prebuild locally and commit the changes before pushing.',
        '',
        ...unexpectedChanges.map((file) => `- ${file}`),
      ].join('\n')
    )
  }
}

if (require.main === module) {
  verifyGeneratedEntriesCommitted()
}
