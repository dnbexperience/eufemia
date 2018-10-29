/**
 * Bundle config
 * ATTENTION: We used "rollup-plugin-replac" before, but removed it, this causes some strange failure in case that the custom event in custom elements dont works - but without an error message
 */

import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import nodeGlobals from 'rollup-plugin-node-globals'
import { uglify } from 'rollup-plugin-uglify'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const input = './src/umd/dnb-ui-lib.js'
const name = 'dnb-ui-lib'
const iconsPath = path.resolve('./src/icons/cjs/index.js')
const globals = {
  [iconsPath]: 'dnbIcons',
  react: 'React',
  'react-dom': 'ReactDOM'
}
const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true // @babel/plugin-transform-runtime
}
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
}

export default [
  {
    input,
    output: {
      file: `umd/${name}.js`,
      format: 'umd',
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals()
    ]
  },
  {
    input,
    output: {
      file: `umd/${name}.min.js`,
      format: 'umd',
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      sizeSnapshot(),
      uglify()
    ]
  }
]
