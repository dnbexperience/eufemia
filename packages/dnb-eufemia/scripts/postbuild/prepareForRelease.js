/**
 * Remove some info from the package.json before publish
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'
import { log } from '../lib'

// run this script if it is called from bash / command line
if (require.main === module) {
  prepareForRelease()
}

export default async function prepareForRelease() {
  const filepath = path.resolve(packpath.self(), './package.json')
  const dest = path.resolve(packpath.self(), 'build', './package.json')
  const packageString = await fs.readFile(filepath, 'utf-8')
  const packageJson = await cleanupPackage({
    packageString,
  })

  // Ensure module type
  packageJson.type = 'module'
  packageJson.exports = await buildExportsMap({
    buildDir: path.resolve(packpath.self(), 'build'),
  })

  const prettierrc = JSON.parse(
    await fs.readFile(
      path.resolve(packpath.self(), '.prettierrc'),
      'utf-8'
    )
  )
  const formattedPackageJson = await prettier.format(
    JSON.stringify(packageJson),
    {
      ...prettierrc,
      filepath,
    }
  )
  await fs.writeFile(dest, formattedPackageJson)
  log.info('Prepared package.json for release:', filepath, '->', dest)
}

// export for testing
export async function cleanupPackage({ packageString }) {
  const packageJson = JSON.parse(packageString)
  delete packageJson.release
  delete packageJson.scripts
  delete packageJson.devDependencies
  delete packageJson.resolutions
  delete packageJson.volta

  return packageJson
}

async function buildExportsMap({ buildDir }) {
  const exportsMap = {
    '.': {
      types: './index.d.ts',
      import: './index.js',
      require: './cjs/index.js',
      default: './index.js',
    },
    './package.json': './package.json',
  }

  const rootFiles = await walkFiles(buildDir, {
    ignoreDirs: new Set(['cjs', 'es', 'esm', 'umd', 'dist', '_virtual']),
  })
  const esFiles = await walkFiles(path.join(buildDir, 'es'))
  const cjsFiles = await walkFiles(path.join(buildDir, 'cjs'))
  const cjsFileSet = new Set(cjsFiles.map((file) => `cjs/${file}`))
  const typesFileSet = new Set(
    rootFiles.filter((file) => file.endsWith('.d.ts'))
  )
  const esTypesFileSet = new Set(
    esFiles.filter((file) => file.endsWith('.d.ts'))
  )

  for (const file of rootFiles) {
    if (shouldSkipFile(file)) {
      continue
    }

    if (file.endsWith('.js')) {
      addJsExport({
        exportsMap,
        file,
        typesFileSet,
        cjsFileSet,
      })
      continue
    }

    if (file.endsWith('.cjs')) {
      addCjsExport({ exportsMap, file })
      continue
    }
  }

  for (const file of esFiles) {
    if (shouldSkipFile(file)) {
      continue
    }

    if (file.endsWith('.js')) {
      addJsExport({
        exportsMap,
        file,
        typesFileSet: esTypesFileSet,
        cjsFileSet,
        importBase: './es',
        keyPrefix: './es',
      })
      continue
    }

    if (file.endsWith('.cjs')) {
      addCjsExport({ exportsMap, file })
      continue
    }
  }

  for (const file of cjsFiles) {
    if (shouldSkipFile(file)) {
      continue
    }

    if (file.endsWith('.js')) {
      addJsExport({
        exportsMap,
        file: `cjs/${file}`,
        typesFileSet: new Set(),
        cjsFileSet: new Set(),
        allowRequireFallback: true,
      })
      continue
    }

    if (file.endsWith('.cjs')) {
      addCjsExport({ exportsMap, file: `cjs/${file}` })
      continue
    }
  }

  addPatternExports(exportsMap, './style', 4)
  addPatternExports(exportsMap, './es/style', 4)
  addPatternExports(exportsMap, './cjs/style', 4)
  addPatternExports(exportsMap, './assets', 4)

  return exportsMap
}

function shouldSkipFile(file) {
  return (
    file.endsWith('.map') ||
    file.endsWith('.d.ts') ||
    /Docs\.(?:d\.ts|js|cjs)$/.test(file) ||
    file.split('/').some((part) => part.startsWith('.'))
  )
}

function addJsExport({
  exportsMap,
  file,
  typesFileSet,
  cjsFileSet,
  allowRequireFallback = false,
  importBase = '',
  keyPrefix = '',
}) {
  const withoutExt = file.slice(0, -3)
  const isIndexFile = file === 'index.js' || file.endsWith('/index.js')
  const importTarget = importBase ? `${importBase}/${file}` : `./${file}`
  const cjsTarget = cjsFileSet.has(`cjs/${file}`)
    ? `./cjs/${file}`
    : allowRequireFallback
    ? importTarget
    : null
  const typesTarget = typesFileSet.has(`${withoutExt}.d.ts`)
    ? importBase
      ? `${importBase}/${withoutExt}.d.ts`
      : `./${withoutExt}.d.ts`
    : null
  const entry = {
    import: importTarget,
    ...(cjsTarget ? { require: cjsTarget } : {}),
    ...(typesTarget ? { types: typesTarget } : {}),
    default: importTarget,
  }

  if (!isIndexFile) {
    addExportEntry(
      exportsMap,
      joinExportKey(keyPrefix, `./${withoutExt}`),
      entry
    )
  }
  addExportEntry(exportsMap, joinExportKey(keyPrefix, `./${file}`), entry)

  if (isIndexFile) {
    const indexKey = getIndexKey(withoutExt)
    addExportEntry(exportsMap, joinExportKey(keyPrefix, indexKey), entry)
  }
}

function addCjsExport({ exportsMap, file }) {
  const withoutExt = file.replace(/\.cjs$/, '')
  const isIndexFile = file === 'index.cjs' || file.endsWith('/index.cjs')
  const target = `./${file}`
  const entry = {
    import: target,
    require: target,
    default: target,
  }

  if (!isIndexFile) {
    addExportEntry(exportsMap, `./${withoutExt}`, entry)
  }
  addExportEntry(exportsMap, `./${file}`, entry)

  if (isIndexFile) {
    const indexKey = getIndexKey(withoutExt)
    addExportEntry(exportsMap, indexKey, entry)
  }
}

function getIndexKey(withoutExt) {
  if (!withoutExt.endsWith('/index')) {
    return null
  }

  const dir = withoutExt.slice(0, -'/index'.length)
  if (!dir) {
    return null
  }

  return `./${dir}`
}

function joinExportKey(prefix, key) {
  if (!prefix || !key) {
    return key
  }
  if (key.startsWith('./')) {
    return `${prefix}${key.slice(1)}`
  }
  return `${prefix}/${key}`
}

function addExportEntry(exportsMap, key, entry) {
  if (!key || key === './index') {
    return
  }

  const existing = exportsMap[key]
  if (!existing) {
    exportsMap[key] = entry
    return
  }

  if (typeof existing === 'string' || typeof entry === 'string') {
    exportsMap[key] = entry
    return
  }

  exportsMap[key] = {
    ...existing,
    ...entry,
  }
}

function addPatternExports(exportsMap, baseKey, maxDepth) {
  for (let depth = 1; depth <= maxDepth; depth += 1) {
    const pattern = `${baseKey}/${Array(depth).fill('*').join('/')}`
    addExportEntry(exportsMap, pattern, pattern)
  }
}

async function walkFiles(baseDir, { ignoreDirs = new Set() } = {}) {
  const files = []

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!ignoreDirs.has(entry.name)) {
          await walk(fullPath)
        }
        continue
      }

      const relativePath = path.relative(baseDir, fullPath)
      files.push(relativePath.split(path.sep).join('/'))
    }
  }

  await walk(baseDir)
  return files
}
