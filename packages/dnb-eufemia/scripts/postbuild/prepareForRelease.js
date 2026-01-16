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

  // Build exports map
  // TODO: In future we may enable it, or find a better solution.
  // Bundlers do not support an array of export targets yet, so we skip this for now.
  // But at the time of writing we could not confirm a speed improvement by bundlers. So what are the benefits at the end? (only silent CJS fallback?)
  // packageJson.exports = await buildExportsMap({
  //   buildDir: path.resolve(packpath.self(), 'build'),
  // })

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

export async function buildExportsMap({ buildDir }) {
  const exportsMap = {
    '.': {
      types: './index.d.ts',
      import: './index.js',
      require: './cjs/index.js',
      default: './index.js',
    },
    './package.json': './package.json',
  }

  addExportEntry(exportsMap, './lib', {
    types: './lib.d.ts',
    import: './lib.js',
    require: './cjs/lib.js',
    default: './lib.js',
  })
  addExportEntry(exportsMap, './lib.js', {
    types: './lib.d.ts',
    import: './lib.js',
    require: './cjs/lib.js',
    default: './lib.js',
  })

  addExportEntry(exportsMap, './es', {
    types: './es/index.d.ts',
    import: './es/index.js',
    require: './cjs/index.js',
    default: './es/index.js',
  })
  addExportEntry(exportsMap, './cjs', {
    types: './cjs/index.d.ts',
    import: './cjs/index.js',
    require: './cjs/index.js',
    default: './cjs/index.js',
  })

  addExportEntry(exportsMap, './components', {
    types: './components/index.d.ts',
    import: './components/index.js',
    require: './cjs/components/index.js',
    default: './components/index.js',
  })
  addExportEntry(exportsMap, './extensions', {
    types: './extensions/index.d.ts',
    import: './extensions/index.js',
    require: './cjs/extensions/index.js',
    default: './extensions/index.js',
  })
  addExportEntry(exportsMap, './shared', {
    types: './shared/index.d.ts',
    import: './shared/index.js',
    require: './cjs/shared/index.js',
    default: './shared/index.js',
  })
  addExportEntry(exportsMap, './icons', {
    types: './icons/index.d.ts',
    import: './icons/index.js',
    require: './cjs/icons/index.js',
    default: './icons/index.js',
  })
  addExportEntry(exportsMap, './elements', {
    types: './elements/index.d.ts',
    import: './elements/index.js',
    require: './cjs/elements/index.js',
    default: './elements/index.js',
  })
  addExportEntry(exportsMap, './fragments', {
    types: './fragments/index.d.ts',
    import: './fragments/index.js',
    require: './cjs/fragments/index.js',
    default: './fragments/index.js',
  })

  addExportEntry(exportsMap, './style', {
    types: './style/index.d.ts',
    import: './style/index.js',
    require: './cjs/style/index.js',
    default: './style/index.js',
  })

  addConditionalPatternExports({
    exportsMap,
    baseKey: './components',
    importBase: './components',
    requireBase: './cjs/components',
    typesBase: './components',
    includePlainTarget: true,
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './extensions',
    importBase: './extensions',
    requireBase: './cjs/extensions',
    typesBase: './extensions',
    includePlainTarget: true,
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './shared',
    importBase: './shared',
    requireBase: './cjs/shared',
    typesBase: './shared',
    includePlainTarget: true,
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './icons',
    importBase: './icons',
    requireBase: './cjs/icons',
    typesBase: './icons',
    includePlainTarget: true,
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './elements',
    importBase: './elements',
    requireBase: './cjs/elements',
    typesBase: './elements',
    includePlainTarget: true,
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './fragments',
    importBase: './fragments',
    requireBase: './cjs/fragments',
    typesBase: './fragments',
    includePlainTarget: true,
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './plugins',
    importBase: './plugins',
    requireBase: './cjs/plugins',
    typesBase: './plugins',
    includePlainTarget: true,
  })

  addConditionalPatternExports({
    exportsMap,
    baseKey: './es',
    importBase: './es',
    requireBase: './cjs',
    typesBase: './es',
  })
  addConditionalPatternExports({
    exportsMap,
    baseKey: './cjs',
    importBase: './cjs',
    requireBase: './cjs',
    typesBase: './cjs',
  })

  addPatternExports(exportsMap, './style', 4)
  addPatternExports(exportsMap, './es/style', 4)
  addPatternExports(exportsMap, './cjs/style', 4)
  addPatternExports(exportsMap, './assets', 4)

  return exportsMap
}

function addConditionalPatternExports({
  exportsMap,
  baseKey,
  importBase,
  requireBase,
  typesBase,
  includePlainTarget = false,
}) {
  const importTargets = [`${importBase}/*.js`, `${importBase}/*/index.js`]
  const requireTargets = [
    `${requireBase}/*.js`,
    `${requireBase}/*/index.js`,
  ]
  const defaultTargets = [...importTargets]
  if (includePlainTarget) {
    importTargets.push(`${importBase}/*`)
    requireTargets.push(`${requireBase}/*`)
    defaultTargets.push(`${importBase}/*`)
  }

  addExportEntry(exportsMap, `${baseKey}/*`, {
    import: importTargets,
    require: requireTargets,
    types: [`${typesBase}/*.d.ts`, `${typesBase}/*/index.d.ts`],
    default: defaultTargets,
  })

  addExportEntry(exportsMap, `${baseKey}/*.js`, {
    import: `${importBase}/*.js`,
    require: `${requireBase}/*.js`,
    types: `${typesBase}/*.d.ts`,
    default: `${importBase}/*.js`,
  })

  addExportEntry(exportsMap, `${baseKey}/*.cjs`, {
    import: `${importBase}/*.cjs`,
    require: `${importBase}/*.cjs`,
    default: `${importBase}/*.cjs`,
  })
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
