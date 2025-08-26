import branchName from 'current-git-branch'
import type { UserConfig } from 'tsdown'

/**
 * Branch switch:
 * - release/beta/alpha/next/portal/main => full matrix
 * - other branches => reduced matrix
 */
const currentBranch = branchName()
const isReleaseBranch = /^(release|beta|alpha|next|portal|main)$/.test(
  currentBranch || ''
)

/** External modules and their UMD globals */
const UMD_GLOBALS: Record<string, string> = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '../../icons/dnb/primary_icons': 'dnbIcons',
  '../../icons/dnb/primary_icons_medium': 'dnbIcons',
}

/**
 * Make ONE config per entry and format.
 */
function makeConfig(
  input: string,
  outName: string,
  {
    format,
    umdName,
    includeIconExternals = false,
  }: {
    format: 'esm' | 'umd'
    umdName?: string
    includeIconExternals?: boolean
  }
): UserConfig {
  const globals = { ...UMD_GLOBALS }
  if (!includeIconExternals) {
    delete globals['../../icons/dnb/primary_icons']
    delete globals['../../icons/dnb/primary_icons_medium']
  }

  return {
    // Parse JSX that lives in .js files
    loader: { '.js': 'jsx' },

    // Pick the JSX runtime
    inputOptions: { jsx: 'react' },

    // Keep peers/large libs external (UMD globals map below)
    external: Object.keys(globals),

    // Minify + hardcode production env
    minify: true,
    sourcemap: false,
    define: { 'process.env.NODE_ENV': "'production'" },

    // Avoid type emitting (and because of memory issues)
    dts: false,

    // Keep filenames/structure identical
    hash: false,

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
        options.globals = globals
        options.name = umdName
      }
      return options
    },

    // Some tools also read this for UMD
    globalName: umdName,
  }
}

/** Reduced matrix for non-release branches */
const nonRelease: UserConfig[] = [
  // ESM
  makeConfig('./src/esm/dnb-ui-lib.ts', 'dnb-ui-lib', {
    format: 'esm',
    umdName: 'dnbLib',
    includeIconExternals: true,
  }),
  // UMD
  makeConfig('./src/umd/dnb-ui-lib.ts', 'dnb-ui-lib', {
    format: 'umd',
    umdName: 'dnbLib',
    includeIconExternals: true,
  }),
  // UMD
  makeConfig('./src/umd/dnb-ui-extensions.ts', 'dnb-ui-extensions', {
    format: 'umd',
    umdName: 'dnbExtensions',
    includeIconExternals: true,
  }),
]

/** Full matrix for release/main branches */
const release: UserConfig[] = [
  // UMD bundles
  makeConfig('./src/umd/dnb-ui-lib.ts', 'dnb-ui-lib', {
    format: 'umd',
    umdName: 'dnbLib',
    includeIconExternals: true,
  }),
  makeConfig('./src/umd/dnb-ui-components.ts', 'dnb-ui-components', {
    format: 'umd',
    umdName: 'dnbComponents',
    includeIconExternals: true,
  }),
  makeConfig('./src/umd/dnb-ui-elements.ts', 'dnb-ui-elements', {
    format: 'umd',
    umdName: 'dnbElements',
    includeIconExternals: true,
  }),
  makeConfig('./src/umd/dnb-ui-extensions.ts', 'dnb-ui-extensions', {
    format: 'umd',
    umdName: 'dnbExtensions',
    includeIconExternals: true,
  }),
  makeConfig('./src/umd/dnb-ui-basis.ts', 'dnb-ui-basis', {
    format: 'umd',
    umdName: 'dnbBasis',
  }),
  makeConfig('./src/umd/dnb-ui-icons.ts', 'dnb-ui-icons', {
    format: 'umd',
    umdName: 'dnbIcons',
  }),

  // ESM bundles
  makeConfig('./src/esm/dnb-ui-lib.ts', 'dnb-ui-lib', {
    format: 'esm',
    umdName: 'dnbLib',
    includeIconExternals: true,
  }),
  makeConfig('./src/esm/dnb-ui-components.ts', 'dnb-ui-components', {
    format: 'esm',
    umdName: 'dnbComponents',
    includeIconExternals: true,
  }),
  makeConfig('./src/esm/dnb-ui-extensions.ts', 'dnb-ui-extensions', {
    format: 'esm',
    umdName: 'dnbExtensions',
    includeIconExternals: true,
  }),
  makeConfig('./src/esm/dnb-ui-elements.ts', 'dnb-ui-elements', {
    format: 'esm',
    umdName: 'dnbElements',
    includeIconExternals: true,
  }),
  makeConfig('./src/esm/dnb-ui-basis.ts', 'dnb-ui-basis', {
    format: 'esm',
    umdName: 'dnbBasis',
  }),
  makeConfig('./src/esm/dnb-ui-icons.ts', 'dnb-ui-icons', {
    format: 'esm',
    umdName: 'dnbIcons',
  }),
]

/** Export the correct matrix */
export default isReleaseBranch ? release : nonRelease
