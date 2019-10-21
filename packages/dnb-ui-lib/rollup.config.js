/**
 * UMD Bundle config
 *
 */

import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import nodeGlobals from 'rollup-plugin-node-globals'
import { uglify } from 'rollup-plugin-uglify'
// import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import isCi from 'is-ci'

// 1. process theese files
const dnbLib = makeRollupConfig(
  './src/umd/dnb-ui-lib.js',
  'build/umd/dnb-ui-lib.min.js',
  {
    name: 'dnbLib',
    globals: { [path.resolve('./src/icons/primary_icons.js')]: 'dnbIcons' }
  }
)
const dnbIcons = makeRollupConfig(
  './src/umd/dnb-ui-icons.js',
  'build/umd/dnb-ui-icons.min.js',
  { name: 'dnbIcons' }
)

// 2. and export them so rollup knows what to do
export default [dnbLib, dnbIcons]

function makeRollupConfig(input, file, { name, globals = {} } = {}) {
  globals = {
    ...{
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    ...globals
  }
  const babelOptions = {
    exclude: /node_modules/,
    runtimeHelpers: true, // using @babel/plugin-transform-runtime
    configFile: './babel.config.js'
  }
  const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
    namedExports: {}
  }

  return {
    input,
    onwarn,
    output: {
      file,
      name,
      globals,
      format: 'umd'
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      isCi ? sizeSnapshot({ snapshotPath: 'size-snapshot.json' }) : null,

      // NB: Use either uglify or terser
      uglify({ sourcemap: true }) // is slighlty better (5kb) than terser
      // terser()
    ]
  }
}

function onwarn(warning) {
  throw Error(warning.message)
}
