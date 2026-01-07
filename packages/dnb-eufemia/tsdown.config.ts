import type { UserConfig } from 'tsdown'
import path from 'node:path'
import pkg from './package.json'

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

  const noExternal: Array<string | RegExp> = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  }).filter((dep) => !alwaysExternal.includes(dep))
  noExternal.push(/^date-fns(?:\/|$)/, /^ajv\/dist\/2020/)

  return {
    // Parse JSX that lives in .js files
    loader: { '.js': 'jsx' },

    // Pick the JSX runtime
    inputOptions: {
      jsx: 'react',
    },

    // Keep peers/large libs external (UMD globals map below)
    external: (id, importer) => shouldBeExternal(id, importer),

    // Also keep these external
    noExternal,

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
          if (id.includes('icons/dnb/primary_icons')) {
            return 'dnbIcons'
          }
          if (id.includes('icons/dnb/primary_icons_medium')) {
            return 'dnbIcons'
          }

          return undefined
        }
      }

      return options
    },
  }
}

// Helper to decide if an import should be external
function shouldBeExternal(id: string, importer?: string) {
  // Resolve relative imports against the importer and compare absolute paths
  if (importer && id.startsWith('.')) {
    // Files that should be externalized when imported
    const externalized = [
      path.resolve('./src/icons/dnb/primary_icons'),
      path.resolve('./src/icons/dnb/primary_icons_medium'),
    ]

    const abs = path.resolve(path.dirname(importer), id)
    return externalized.some(
      (dir) => abs === dir || abs.startsWith(dir + path.sep)
    )
  }

  return false
}
