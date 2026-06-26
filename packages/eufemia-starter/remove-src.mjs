import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'
import { stat } from 'fs/promises'

const folderPath = './src'
const targetString = '@dnb/eufemia/src'
const replacementString = '@dnb/eufemia'

// Workspace-only dev dependencies that must not reach the published StackBlitz
// template (their `workspace:*` ranges are not installable outside the monorepo).
// The optimized build falls back to these only inside the monorepo; on
// StackBlitz it consumes the built `@dnb/eufemia` package instead.
const workspaceOnlyDevDependencies = ['eufemia-css-optimizer']

async function replaceInFile(filePath) {
  const content = await readFile(filePath, 'utf8')
  const newContent = content.split(targetString).join(replacementString)

  if (newContent !== content) {
    await writeFile(filePath, newContent, 'utf8')
    console.log(`Updated: ${filePath}`)
  }
}

async function processFolder(folder) {
  const entries = await readdir(folder, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(folder, entry.name)
    const fileStats = await stat(fullPath)

    if (fileStats.isDirectory()) {
      await processFolder(fullPath)
    } else if (fileStats.isFile()) {
      await replaceInFile(fullPath)
    }
  }
}

async function removeWorkspaceOnlyDevDependencies() {
  const packageJsonPath = './package.json'
  const pkg = JSON.parse(await readFile(packageJsonPath, 'utf8'))

  if (!pkg.devDependencies) {
    return
  }

  let changed = false
  for (const name of workspaceOnlyDevDependencies) {
    if (name in pkg.devDependencies) {
      delete pkg.devDependencies[name]
      changed = true
      console.log(`Removed devDependency: ${name}`)
    }
  }

  if (changed) {
    await writeFile(
      packageJsonPath,
      JSON.stringify(pkg, null, 2) + '\n',
      'utf8'
    )
  }
}

await processFolder(folderPath)
await removeWorkspaceOnlyDevDependencies()
