/**
 * Remove some info from the package.json before publish
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'

// run this script if it is called from bash / command line
if (require.main === module) {
  prepareForRelease()
}

export default async function prepareForRelease() {
  const filepath = path.resolve(packpath.self(), './package.json')
  const dest = path.resolve(packpath.self(), 'build', './package.json')
  const packageString = await fs.readFile(filepath, 'utf-8')
  const formattedPackageJson = await cleanupPackage({
    packageString,
    filepath,
  })
  await fs.writeFile(dest, formattedPackageJson)
}

// export for testing
export async function cleanupPackage({ packageString, filepath }) {
  const packageJson = JSON.parse(packageString)
  delete packageJson.release
  delete packageJson.scripts
  delete packageJson.devDependencies
  delete packageJson.resolutions
  delete packageJson.volta
  packageJson.type = 'module'
  const buildDir = path.resolve(packpath.self(), 'build')
  packageJson.exports = buildExports(buildDir)

  const prettierrc = JSON.parse(
    await fs.readFile(
      path.resolve(packpath.self(), '.prettierrc'),
      'utf-8'
    )
  )

  return await prettier.format(JSON.stringify(packageJson), {
    ...prettierrc,
    filepath,
  })
}

function buildExports(buildDir) {
  const seenExtensions = new Set()
  function formatSpecificExports(format) {
    const prefix = format ? `${format}/` : ''

    return {
      [`./${prefix}*.cjs`]: {
        import: format ? undefined : `./*.cjs`,
        require: format ? undefined : './cjs/*.cjs',
        types: `./${prefix}*.d.ts`,
        default: `./${prefix}*.cjs`,
      },
      [`./${prefix}*.d.ts`]: `./${prefix}*.d.ts`,
      [`./${prefix}*.js`]: {
        import: format ? undefined : `./*.js`,
        require: format ? undefined : './cjs/*.js',
        types: `./${prefix}*.d.ts`,
        default: `./${prefix}*.js`,
      },
      [`./${prefix}*.txt`]: `./${prefix}*.txt`,
      [`./${prefix}*.css`]: `./${prefix}*.css`,
      [`./${prefix}*.scss`]: `./${prefix}*.scss`,
      [`./${prefix}package.json`]: `./${prefix}package.json`,
      [`./${prefix}style/*`]: `./${prefix}style/*`,
      [`./${prefix}*`]: {
        import: format ? undefined : './*.js',
        require: format ? undefined : './cjs/*.js',
        types: `./${prefix}*.d.ts`,
        default: `./${prefix}*.js`,
      },
    }
  }

  const exports = {
    ...formatSpecificExports(),
    ...formatSpecificExports('es'),
    ...formatSpecificExports('cjs'),
  }
  const files = new Set(fs.readdirSync(buildDir, { recursive: true }))
  for (let file of files) {
    const firstSegment = file.split(path.sep)[0]
    if (
      firstSegment === '_virtual' ||
      firstSegment === 'esm' ||
      firstSegment === 'umd'
    ) {
      continue
    }
    let format
    switch (file.split(path.sep)[0]) {
      case 'cjs':
        format = 'cjs'
        break
      case 'es':
        format = 'es'
        break
      default:
        format = null
    }

    const ext = path.extname(file)
    if (ext) {
      seenExtensions.add(ext)
    }
    const fileName = path.basename(file)
    if (fileName === 'index.js') {
      const importAlias = path.dirname(file)
      const hasParentIndex = files.has(`${importAlias}.js`)
      if (hasParentIndex) {
        continue
      }
      const hasTypes = files.has(
        path.join(path.dirname(file), 'index.d.ts')
      )
      if (format === null) {
        const cjsPath = path.join('cjs', file)
        exports[importAlias === '.' ? importAlias : `./${importAlias}`] = {
          import: `./${file}`,
          require: `./${cjsPath}`,
          types: hasTypes
            ? `./${file.replace(/\.js$/, '.d.ts')}`
            : undefined,
          default: `./${file}`,
        }
      } else {
        exports[`./${importAlias}`] = {
          types: hasTypes
            ? `./${file.replace(/\.js$/, '.d.ts')}`
            : undefined,
          default: `./${file}`,
        }
      }
    }
  }

  return Object.fromEntries(
    Object.entries(exports).toSorted(([a], [b]) => sortExports(a, b))
  )
}

function isMoreSpecific(a, b) {
  const aRegex = new RegExp('^' + a.replace(/\*/g, '.*') + '$')
  const bRegex = new RegExp('^' + b.replace(/\*/g, '.*') + '$')
  if (aRegex.test(b) && a !== b) {
    return 1
  }
  if (bRegex.test(a) && a !== b) {
    return -1
  }
  return 0
}

function compare(a, b) {
  const aHasWildcard = a.includes('*')
  const bHasWildcard = a.includes('*')
  const aBeforeWildcard = a.split('*')[0]
  const bBeforeWildcard = b.split('*')[0]
  const minLength = Math.min(
    aBeforeWildcard.length,
    bBeforeWildcard.length
  )
  const aTruncated = aBeforeWildcard.slice(0, minLength)
  const bTruncated = bBeforeWildcard.slice(0, minLength)
  if (aHasWildcard && !bHasWildcard) return 1
  if (!aHasWildcard && bHasWildcard) return -1
  if (aTruncated > bTruncated) return 1
  if (aTruncated < bTruncated) return -1
  if (a.length > b.length) return -1
  if (a.length < b.length) return 1
  return 0
}

export function sortExports(a, b) {
  if (a === '.') return -1
  if (b === '.') return 1

  const specific = isMoreSpecific(a, b)
  if (specific !== 0) {
    return specific
  }

  const aParts = a.split('/')
  const aName = aParts.pop()
  const aPrefix = aParts.join('/')
  const bParts = b.split('/')
  const bName = bParts.pop()
  const bPrefix = bParts.join('/')

  if (aPrefix === bPrefix) {
    if (aName.includes('*') && !bName.includes('*')) {
      return 1
    }
    if (!aName.includes('*') && bName.includes('*')) {
      return -1
    }
  }

  if (aPrefix === '.' && bPrefix !== '.') return 1
  if (aPrefix !== '.' && bPrefix === '.') return -1

  return compare(a, b)
}
