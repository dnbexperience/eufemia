/**
 * UMD Bundle config
 *
 */

import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import nodeGlobals from 'rollup-plugin-node-globals'
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import isCI from 'is-ci'
import branchName from 'current-git-branch'

const excludes = [
  {
    name: 'dnbIcons',
    global: [path.resolve('./src/icons/primary_icons.js')],
    external: '../../icons/primary_icons.js'
  },
  {
    name: 'dnbIcons',
    global: [path.resolve('./src/icons/primary_icons_medium.js')],
    external: '../../icons/primary_icons_medium.js'
  }
]

const currentBranch = branchName()
export default isCI && !/^(release|beta|alpha)$/.test(currentBranch)
  ? [
      // NB: rollup needs at least one config
      makeRollupConfig(
        './src/umd/dnb-ui-lib.js',
        'build/umd/dnb-ui-lib.min.js',
        {
          name: 'dnbLib',
          format: 'umd',
          excludes
        }
      )
    ]
  : [
      makeRollupConfig(
        './src/umd/dnb-ui-lib.js',
        'build/umd/dnb-ui-lib.min.js',
        {
          name: 'dnbLib',
          format: 'umd',
          excludes
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-web-components.js',
        'build/umd/dnb-ui-web-components.min.js',
        {
          name: 'dnbWebComponents',
          format: 'umd',
          excludes
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-components.js',
        'build/umd/dnb-ui-components.min.js',
        {
          name: 'dnbComponents',
          format: 'umd',
          excludes
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-elements.js',
        'build/umd/dnb-ui-elements.min.js',
        {
          name: 'dnbElements',
          format: 'umd',
          excludes
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-extensions.js',
        'build/umd/dnb-ui-extensions.min.js',
        {
          name: 'dnbExtensions',
          format: 'umd',
          excludes
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-basis.js',
        'build/umd/dnb-ui-basis.min.js',
        {
          name: 'dnbBasis',
          format: 'umd'
        }
      ),
      makeRollupConfig(
        './src/umd/dnb-ui-icons.js',
        'build/umd/dnb-ui-icons.min.js',
        { name: 'dnbIcons', format: 'umd' }
      ),

      // Skip creating this huge package – as there is currently no need
      // makeRollupConfig(
      //   './src/umd/dnb-ui-icons-archive.js',
      //   'build/umd/dnb-ui-icons-archive.min.js',
      //   { name: 'dnbIcons', format: 'umd' }
      // ),

      // es libs
      makeRollupConfig(
        './src/esm/dnb-ui-lib.js',
        'build/esm/dnb-ui-lib.min.mjs',
        {
          format: 'esm',
          excludes
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-components.js',
        'build/esm/dnb-ui-components.min.mjs',
        {
          format: 'esm',
          excludes
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-extensions.js',
        'build/esm/dnb-ui-extensions.min.mjs',
        {
          format: 'esm',
          excludes
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-elements.js',
        'build/esm/dnb-ui-elements.min.mjs',
        {
          format: 'esm',
          excludes
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-web-components.js',
        'build/esm/dnb-ui-web-components.min.mjs',
        {
          format: 'esm',
          excludes
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-basis.js',
        'build/esm/dnb-ui-basis.min.mjs',
        {
          format: 'esm'
        }
      ),
      makeRollupConfig(
        './src/esm/dnb-ui-icons.js',
        'build/esm/dnb-ui-icons.min.mjs',
        { format: 'esm' }
      )

      // Skip creating this huge package – as there is currently no need
      // makeRollupConfig(
      //   './src/esm/dnb-ui-icons-archive.js',
      //   'build/esm/dnb-ui-icons-archive.min.mjs',
      //   { format: 'esm' }
      // )

      // make esm of React, only for testing
      // makeRollupConfig(
      //   '../../node_modules/react/index.js',
      //   'build/esm/react.production.min.js',
      //   { format: 'esm' }
      // ),
      // makeRollupConfig(
      //   '../../node_modules/react-dom/index.js',
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
    'react-dom': 'ReactDOM'
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

  const babelOptions = {
    exclude: /node_modules/,
    babelHelpers: 'runtime', // using @babel/plugin-transform-runtime
    configFile: './babel.config.cjs'
  }
  const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/
  }

  return {
    input,
    onwarn,
    output: {
      file,
      name,
      globals,
      format,
      sourcemap: false
    },
    external,
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      isCI ? sizeSnapshot({ snapshotPath: 'size-snapshot.json' }) : null,
      terser()
    ]
  }
}

function onwarn(warning) {
  throw Error(warning.message)
}
