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
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import isCI from 'is-ci'

// 1. process theese files
const dnbLib = makeRollupConfig(
  './src/umd/dnb-ui-lib.js',
  'build/umd/dnb-ui-lib.min.js',
  {
    name: 'dnbLib',
    globals: { [path.resolve('./src/icons/primary_icons.js')]: 'dnbIcons' }
  }
)
const dnbWebComponents = makeRollupConfig(
  './src/umd/dnb-ui-web-components.js',
  'build/umd/dnb-ui-web-components.min.js',
  {
    name: 'dnbLib',
    globals: { [path.resolve('./src/icons/primary_icons.js')]: 'dnbIcons' }
  }
)
const dnbBasis = makeRollupConfig(
  './src/umd/dnb-ui-basis.js',
  'build/umd/dnb-ui-basis.min.js',
  {
    name: 'dnbBasis',
    globals: { [path.resolve('./src/icons/primary_icons.js')]: 'dnbIcons' }
  }
)
const dnbIcons = makeRollupConfig(
  './src/umd/dnb-ui-icons.js',
  'build/umd/dnb-ui-icons.min.js',
  { name: 'dnbIcons' }
)

// es libs
const dnbLibES = makeRollupConfig(
  './src/esm/dnb-ui-lib.js',
  'build/esm/dnb-ui-lib.min.mjs',
  {
    format: 'esm',
    name: 'dnbLib',
    globals: {
      [path.resolve('./src/icons/primary_icons.js')]: 'dnbIcons'
    }
  }
)
const dnbBasisES = makeRollupConfig(
  './src/esm/dnb-ui-basis.js',
  'build/esm/dnb-ui-basis.min.mjs',
  {
    format: 'esm',
    name: 'dnbBasis',
    globals: {
      [path.resolve('./src/icons/primary_icons.js')]: 'dnbIcons'
    }
  }
)
const dnbIconsES = makeRollupConfig(
  './src/esm/dnb-ui-icons.js',
  'build/esm/dnb-ui-icons.min.mjs',
  { format: 'esm', name: 'dnbIcons' }
)

// 2. and export them so rollup knows what to do
export default [
  dnbLib,
  dnbWebComponents,
  dnbBasis,
  dnbIcons,
  dnbLibES,
  dnbBasisES,
  dnbIconsES
]

function makeRollupConfig(
  input,
  file,
  { name, globals = {}, format = 'umd' } = {}
) {
  process.env.BABEL_ENV = format

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
      format
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      isCI ? sizeSnapshot({ snapshotPath: 'size-snapshot.json' }) : null,
      terser({
        sourcemap: true
      })
    ]
  }
}

function onwarn(warning) {
  throw Error(warning.message)
}
