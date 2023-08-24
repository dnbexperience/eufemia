/**
 * UMD Bundle config
 *
 */

import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import nodeGlobals from 'rollup-plugin-node-globals'
import { terser } from 'rollup-plugin-terser'
import branchName from 'current-git-branch'

const excludes = [
  {
    name: 'dnbIcons',
    global: [path.resolve('./src/icons/dnb/primary_icons')],
    external: '../../icons/dnb/primary_icons',
  },
  {
    name: 'dnbIcons',
    global: [path.resolve('./src/icons/dnb/primary_icons_medium')],
    external: '../../icons/dnb/primary_icons_medium',
  },
]

const currentBranch = branchName()
export default !/^(release|beta|alpha|next|portal|main)$/.test(
  currentBranch
)
  ? [
      // NB: rollup needs at least one config
      makeRollupConfig(
        './src/umd/dnb-ui-lib.ts',
        'build/umd/dnb-ui-lib.min.js',
        {
          name: 'dnbLib',
          format: 'umd',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-lib.ts',
        'build/esm/dnb-ui-lib.min.mjs',
        {
          format: 'esm',
          excludes,
        }
      ),
    ]
  : [
      makeRollupConfig(
        './src/umd/dnb-ui-lib.ts',
        'build/umd/dnb-ui-lib.min.js',
        {
          name: 'dnbLib',
          format: 'umd',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-components.ts',
        'build/umd/dnb-ui-components.min.js',
        {
          name: 'dnbComponents',
          format: 'umd',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-elements.ts',
        'build/umd/dnb-ui-elements.min.js',
        {
          name: 'dnbElements',
          format: 'umd',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-extensions.ts',
        'build/umd/dnb-ui-extensions.min.js',
        {
          name: 'dnbExtensions',
          format: 'umd',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-basis.ts',
        'build/umd/dnb-ui-basis.min.js',
        {
          name: 'dnbBasis',
          format: 'umd',
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-icons.ts',
        'build/umd/dnb-ui-icons.min.js',
        { name: 'dnbIcons', format: 'umd' }
      ),

      // Skip creating this huge package – as there is currently no need
      // makeRollupConfig(
      //   './src/umd/dnb-ui-icons-archive.ts',
      //   'build/umd/dnb-ui-icons-archive.min.js',
      //   { name: 'dnbIcons', format: 'umd' }
      // ),

      // es libs
      makeRollupConfig(
        './src/esm/dnb-ui-lib.ts',
        'build/esm/dnb-ui-lib.min.mjs',
        {
          format: 'esm',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-components.ts',
        'build/esm/dnb-ui-components.min.mjs',
        {
          format: 'esm',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-extensions.ts',
        'build/esm/dnb-ui-extensions.min.mjs',
        {
          format: 'esm',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-elements.ts',
        'build/esm/dnb-ui-elements.min.mjs',
        {
          format: 'esm',
          excludes,
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-basis.ts',
        'build/esm/dnb-ui-basis.min.mjs',
        {
          format: 'esm',
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-icons.ts',
        'build/esm/dnb-ui-icons.min.mjs',
        { format: 'esm' }
      ),

      // Skip creating this huge package – as there is currently no need
      // makeRollupConfig(
      //   './src/esm/dnb-ui-icons-archive.ts',
      //   'build/esm/dnb-ui-icons-archive.min.mjs',
      //   { format: 'esm' }
      // )

      // make esm of React, only for testing
      // makeRollupConfig(
      //   '../../node_modules/react/index.ts',
      //   'build/esm/react.production.min.js',
      //   { format: 'esm' }
      // ),
      // makeRollupConfig(
      //   '../../node_modules/react-dom/index.ts',
      //   'build/esm/react-dom.production.min.js',
      //   { format: 'esm' }
      // )
    ]

function makeRollupConfig(
  input,
  file,
  { name, format = 'umd', excludes = [] } = {}
) {
  process.env.BABEL_ENV = format

  const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  }
  const external = Object.keys(globals)

  excludes.forEach((excl) => {
    if (excl.global) {
      globals[excl.global] = excl.name
    }
    if (excl.external) {
      external.push(excl.external)
    }
  })

  const extensions = ['.js', '.ts', '.tsx']

  const babelOptions = {
    extensions,
    exclude: /node_modules/,
    babelHelpers: 'runtime', // using @babel/plugin-transform-runtime
    configFile: './babel.config.js',
  }
  const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
  }

  return {
    input,
    onwarn,
    output: {
      file,
      name,
      globals,
      format,
      sourcemap: false,
    },
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      json(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        format: {
          comments: false,
        },
      }),
    ],
  }
}

function onwarn(warning) {
  throw Error(warning.message)
}
