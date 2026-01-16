const fs = require('fs')
const path = require('path')
const Module = require('module')
const babel = require('@babel/core')
const transformTS = require('@babel/plugin-transform-typescript')
const transformCJS = require('@babel/plugin-transform-modules-commonjs')

const tsPath = path.join(__dirname, 'gatsby-node.ts')

function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, 'utf-8')
  const result = babel.transformSync(source, {
    filename: filePath,
    plugins: [
      [transformTS, { isTSX: true }],
      [transformCJS, {}],
    ],
    babelrc: false,
    configFile: false,
    sourceMaps: false,
    ast: false,
  })

  if (!result || !result.code) {
    throw new Error('Failed to transpile gatsby-node.ts')
  }

  const mod = new Module(filePath, module)
  mod.filename = filePath
  mod.paths = Module._nodeModulePaths(path.dirname(filePath))
  mod._compile(result.code, filePath)
  return mod.exports
}

module.exports = loadTsModule(tsPath)
