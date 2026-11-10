import type { UserConfig } from 'tsdown'
import fs from 'node:fs'
import path from 'node:path'
import buildTargets from '@dnb/browserslist-config/buildTargets.mjs'

// Node needs an import attribute for JSON, which the CommonJS tsconfig disallows
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default [
  // UMD bundles
  makeBundleConfig('./src/umd/dnb-ui-lib.ts', 'dnb-ui-lib', {
    format: 'umd',
    globalName: 'dnbLib',
  }),
  makeBundleConfig('./src/umd/dnb-ui-components.ts', 'dnb-ui-components', {
    format: 'umd',
    globalName: 'dnbComponents',
  }),
  makeBundleConfig('./src/umd/dnb-ui-elements.ts', 'dnb-ui-elements', {
    format: 'umd',
    globalName: 'dnbElements',
  }),
  makeBundleConfig('./src/umd/dnb-ui-extensions.ts', 'dnb-ui-extensions', {
    format: 'umd',
    globalName: 'dnbExtensions',
  }),
  makeBundleConfig('./src/umd/dnb-ui-basis.ts', 'dnb-ui-basis', {
    format: 'umd',
    globalName: 'dnbBasis',
  }),
  makeBundleConfig('./src/umd/dnb-ui-icons.ts', 'dnb-ui-icons', {
    format: 'umd',
    globalName: 'dnbIcons',
  }),

  // ESM bundles
  makeBundleConfig('./src/esm/dnb-ui-lib.ts', 'dnb-ui-lib', {
    format: 'esm',
    globalName: 'dnbLib',
  }),
  makeBundleConfig('./src/esm/dnb-ui-components.ts', 'dnb-ui-components', {
    format: 'esm',
    globalName: 'dnbComponents',
  }),
  makeBundleConfig('./src/esm/dnb-ui-extensions.ts', 'dnb-ui-extensions', {
    format: 'esm',
    globalName: 'dnbExtensions',
  }),
  makeBundleConfig('./src/esm/dnb-ui-elements.ts', 'dnb-ui-elements', {
    format: 'esm',
    globalName: 'dnbElements',
  }),
  makeBundleConfig('./src/esm/dnb-ui-basis.ts', 'dnb-ui-basis', {
    format: 'esm',
    globalName: 'dnbBasis',
  }),
  makeBundleConfig('./src/esm/dnb-ui-icons.ts', 'dnb-ui-icons', {
    format: 'esm',
    globalName: 'dnbIcons',
  }),
] satisfies UserConfig[]

function makeBundleConfig(
  input: string,
  outName: string,
  {
    format,
    globalName,
  }: {
    format: 'esm' | 'umd'
    globalName: string
  }
): UserConfig {
  // Keep these always external (UMD globals or built-ins)
  const alwaysExternal = [
    'react',
    'react-dom',
    'core-js-pure', // polyfills, usually external
  ]

  const alwaysBundle: Array<string | RegExp> = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  }).filter((dep) => !alwaysExternal.includes(dep))
  alwaysBundle.push(/^date-fns(?:\/|$)/, /^ajv\/dist\/2020/)

  const iconsBundle =
    format === 'esm' ? './dnb-ui-icons.min.mjs' : './dnb-ui-icons.min.js'

  return {
    // Parse JSX that lives in .js files
    loader: { '.js': 'jsx' },

    // Pick the JSX runtime
    inputOptions: {
      transform: {
        jsx: 'react',
        // The sources don't import React, so import it for the classic runtime
        inject: { React: 'react' },
      },
    },

    // The icons bundle contains the icons, and the other bundles import it
    plugins:
      outName === 'dnb-ui-icons' ? [] : [externalIcons(iconsBundle)],

    // Bundle these, even though they are dependencies
    deps: { alwaysBundle },

    // Some tools also read this
    globalName,

    // Minify and treeshake
    minify: true,
    sourcemap: false,
    treeshake: true,

    // Avoid type emitting (and because of memory issues)
    dts: false,

    // Keep filenames/structure identical
    hash: false,

    // Define env variables
    define: { 'process.env.NODE_ENV': "'production'" },

    // Entry + format + out dir per target
    entry: { [outName]: input },
    format,
    platform: 'browser',
    target: buildTargets,
    outDir: format === 'esm' ? 'build/esm' : 'build/umd',

    // Use .mjs for ESM and .js for UMD
    outExtensions() {
      return format === 'esm' ? { js: '.mjs' } : { js: '.js' }
    },

    // Enforce [name].min.* and set UMD globals/name
    outputOptions(options) {
      options.entryFileNames =
        format === 'esm' ? '[name].min.mjs' : '[name].min.js'

      if (format === 'umd') {
        options.name = globalName
        options.globals = (id) => {
          if (id === 'react') {
            return 'React'
          }
          if (id === 'react-dom') {
            return 'ReactDOM'
          }
          if (id === iconsBundle) {
            return 'dnbIcons'
          }

          return undefined
        }
      }

      return options
    },
  }
}

// Load the icons from the icons bundle, which only needs React
function externalIcons(iconsBundle: string) {
  const iconSets = [
    path.resolve('./src/icons/dnb/primary_icons'),
    path.resolve('./src/icons/dnb/primary_icons_medium'),
  ]

  return {
    name: 'external-icons',
    resolveId(id: string, importer: string | undefined) {
      if (
        importer &&
        id.startsWith('.') &&
        iconSets.includes(path.resolve(path.dirname(importer), id))
      ) {
        return { id: iconsBundle, external: true }
      }

      return null
    },
  }
}
