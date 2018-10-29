/**
 * Bundle config
 *
 */

import nodeResolve from 'rollup-plugin-node-resolve' // https://github.com/rollup/rollup-plugin-node-resolve
import commonjs from 'rollup-plugin-commonjs' // https://github.com/rollup/rollup-plugin-commonjs
import babel from 'rollup-plugin-babel'
import nodeGlobals from 'rollup-plugin-node-globals'
import scss from 'rollup-plugin-scss'

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true // @babel/plugin-transform-runtime
}
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
}

export default {
  plugins: [
    scss({
      output: false
    }),
    nodeResolve(),
    babel(babelOptions),
    commonjs(commonjsOptions),
    nodeGlobals()
  ]
}
