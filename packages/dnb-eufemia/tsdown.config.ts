import { defineConfig, type Options } from 'tsdown'
import pkg from './package.json'

import { writeFile, cp, rm, readFile } from 'node:fs/promises'
import path from 'node:path'
import glob from 'glob'

import type { RolldownPlugin } from 'rolldown'
import { fileURLToPath } from 'url'
import { execSync } from 'node:child_process'

import { walk } from 'estree-walker'
import MagicString from 'magic-string'
import type {
  Program,
  ImportDeclaration,
  ImportSpecifier,
  ImportDefaultSpecifier,
  MemberExpression,
  Identifier,
} from 'estree'


const outDirBase = './build'

export default defineConfig([
  // ESM modules
  makeModuleConfig(outDirBase, { format: 'esm'}, {
    copy: [
      {
        from: './assets',
        to: `${outDirBase}/assets`,
      },
      {
        from: './src/plugins',
        to: `${outDirBase}/plugins`,
      },
    ],
    hooks: {
      async 'build:done'(ctx) {
        await Promise.all([
          ...glob.sync(`plugins/**/__tests__`, { cwd: ctx.options.outDir, absolute: true }),
          ...glob.sync(`plugins/**/scripts`, { cwd: ctx.options.outDir, absolute: true })
        ].map(it => rm(it, { recursive: true})))
      }
    }
  }),
  // ES modules
  makeModuleConfig(`${outDirBase}/es`, { format: 'esm'}),
  // CommonJS modules
  makeModuleConfig(`${outDirBase}/cjs`, { format: 'cjs'}, {
    outputOptions: {
      exports: 'named',
      banner: '"use strict";',
    },
    copy: [
      {
        from: './src/plugins',
        to: `${outDirBase}/plugins`,
      },
    ],
    hooks: {
      async 'build:done'(ctx) {
        await Promise.all([
          ...glob.sync(`plugins/**/__tests__`, { cwd: ctx.options.outDir, absolute: true }),
          ...glob.sync(`plugins/**/scripts`, { cwd: ctx.options.outDir, absolute: true })
        ].map(it => rm(it, { recursive: true})))
        await writeFile(
          path.join(ctx.options.outDir, 'package.json'),
          JSON.stringify({ type: 'commonjs' })
        )
      },
    },
  }),

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
])

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
): Omit<Options, "config" | "filter"> {
  // Keep these always external (UMD globals or built-ins)
  const alwaysExternal = [
    'react',
    'react-dom',
    '@babel/runtime', // helpers, usually external
    'core-js', // polyfills, usually external
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

function makeModuleConfig(
  outDir: string,
  {
    format,
    disableStyleCopy
  }: {
    format: 'esm' | 'cjs'
    disableStyleCopy?: boolean
  },
  { hooks, ...extraOptions }: Partial<Omit<Options, "config" | "filter">> = {}
): Omit<Options, "config" | "filter"> {
  return {
    entry: [
      './src/components/**/*.{js,ts,tsx}',
      './src/elements/**/*.{js,ts,tsx}',
      './src/extensions/**/*.{js,ts,tsx}',
      './src/fragments/**/*.{js,ts,tsx}',
      './src/icons/**/*.{js,ts,tsx}',
      './src/index.ts',
      './src/lib.ts',
      './src/shared/**/*.{js,ts,tsx}',
      './src/style/**/*.{js,ts,tsx}',
      '!./src/plugins/**/*',
      '!./src/**/*.d.ts',
      '!./src/**/*.(spec|test|stories).{js,ts,tsx}',
      '!./src/**/__tests__|stories/**/*',
      '!./src/**/stories/*',
    ],

    // Parse JSX that lives in .js files
    loader: { '.js': 'jsx' },

    // Pick the JSX runtime
    inputOptions: {
      jsx: 'react',
    },

    // Minify and treeshake
    sourcemap: true,

    // Avoid type emitting (and because of memory issues)
    dts: false,

    // Keep filenames/structure identical
    unbundle: true,

    // disable cleaning as we build multiple configs
    clean: false,

    // Define env variables
    define: { 'process.env.NODE_ENV': "'production'" },
    format,
    target: 'es2015',
    outDir,

    // Use .js regardless of format
    outExtensions(){
      return { js: '.js' }
    },

    plugins: [
      scssImportRewriter(),
      prependUseClientPlugin({
        customClientImports: [
          'Context',
          'Provider',
          'useMedia',
          'useMediaQuery',
          'useTheme',
        ],
      }),
    ],
    hooks: {
      ...hooks,
      async 'build:done'(ctx) {
        async function replaceInFiles(pattern, searchText, replaceText) {
          const files = glob.sync(pattern, { absolute: true, cwd: ctx.options.outDir })
          await Promise.all(files.map(async (file) => {
            const content = await readFile(file, 'utf8')
            const newContent = content.replace(
              new RegExp(searchText, 'g'),
              replaceText
            )
            if (content !== newContent) {
              await writeFile(file, newContent)
            }
          }))
        }
        if (!disableStyleCopy) {
          const srcDir = path.resolve(currentDir, 'src')
          const scssFiles = glob.sync(path.join(srcDir, '/**/*.scss'))
          const dtsFiles = glob.sync(path.join(srcDir, '/**/*.d.ts'))
          await Promise.all(
            [...scssFiles, ...dtsFiles,
            path.resolve(srcDir, 'icons/dnb/icons-meta.json'),
            path.resolve(srcDir, 'icons/dnb/icons-svg.lock'),
            ].map((it) =>
              cp(
                it,
                path.resolve(ctx.options.outDir, path.relative(srcDir, it))
              )
            )
          )
          execSync(
            `OUT_DIR=${ctx.options.outDir} babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/copyTypeScriptFiles.js`
          )
          if (ctx.options.outDir !== path.resolve(currentDir, 'build')) {
            execSync(
              `OUT_DIR=${ctx.options.outDir} babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/copyStyles.js`
            )

            await replaceInFiles('**/*.{css,scss}', '../assets/', '../../assets/')
          }
        }

        // Call any extra hook if provided
        await hooks?.['build:done']?.(ctx)
      },
    },
    ...extraOptions,
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

const CLIENT_COMPONENT_FUNCTIONS = [
  'createContext',
  'useContext',
  'useDeferredValue',
  'useEffect',
  'useImperativeHandle',
  'useInsertionEffect',
  'useLayoutEffect',
  'useReducer',
  'useRef',
  'useState',
  'useSyncExternalStore',
  'useTransition',
]

// @ts-expect-error import.meta.url is defined
const currentDir = path.dirname(fileURLToPath(import.meta.url))

function scssImportRewriter() {
  return {
    name: 'scss-import-rewriter',
    resolveId: {
      filter: {
        id: {
          include: /\.(scss|css)$/,
        },
      },
      async handler(id, importer) {
        if (id.endsWith('.css')) {
          return { id, external: true }
        }
        const scssPath = path.resolve(path.dirname(importer), id)
        return {
          id: scssPath.replace(/.scss$/, '.min.css'),
          external: true,
        }
      },
    },
  } satisfies RolldownPlugin
}
function prependUseClientPlugin(options: {
  customClientImports?: string[]
}) {
  return {
    name: 'use-client',
    transform: {
      filter: {
        id: {
          include: /\.[jt]sx?$/,
        },
      },
      async handler(code, id, meta) {
        const ast = this.parse(code, {
          lang: meta.moduleType as any,
        }) as Program
        let needsDirective = false
        let reactNamespace: string | null = null

        // Check if "use client" already exists

        if (
          ast.body.some(
            (it) =>
              it.type === 'ExpressionStatement' &&
              'directive' in it &&
              it.directive === 'use client'
          )
        ) {
          return null
        }

        walk(ast, {
          enter(node) {
            // import { useEffect } from 'react'
            if (node.type === 'ImportDeclaration') {
              const importDecl = node as ImportDeclaration

              for (const spec of importDecl.specifiers) {
                if (spec.type === 'ImportSpecifier') {
                  const local = (spec as ImportSpecifier).local.name
                  if (
                    CLIENT_COMPONENT_FUNCTIONS.includes(local) ||
                    options.customClientImports?.includes(local)
                  ) {
                    needsDirective = true
                    this.skip()
                  }
                } else if (spec.type === 'ImportDefaultSpecifier') {
                  const local = (spec as ImportDefaultSpecifier).local.name
                  if (
                    CLIENT_COMPONENT_FUNCTIONS.includes(local) ||
                    options.customClientImports?.includes(local)
                  ) {
                    needsDirective = true
                    this.skip()
                  }
                } else if (spec.type === 'ImportNamespaceSpecifier') {
                  reactNamespace = spec.local.name
                }
              }
            }

            // React.useEffect
            if (node.type === 'MemberExpression') {
              const member = node as MemberExpression
              if (
                member.property.type === 'Identifier' &&
                CLIENT_COMPONENT_FUNCTIONS.includes(
                  (member.property as Identifier).name
                )
              ) {
                if (
                  member.object.type === 'Identifier' &&
                  member.object.name === reactNamespace
                ) {
                  needsDirective = true
                  this.skip()
                }
              }
            }
          },
        })

        if (!needsDirective) {
          return null
        }

        const ms = new MagicString(code)
        ms.prepend(`"use client";\n`)

        return {
          code: ms.toString(),
          map: ms.generateMap({ hires: true }),
        }
      },
    },
  } satisfies RolldownPlugin
}