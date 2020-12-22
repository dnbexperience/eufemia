/**
 * Scripts test
 *
 */

import { transformFileAsync } from '@babel/core'
import nodePath from 'path'
import {
  babelPluginDefaults,
  babelPluginPropTypesRelations,
  babelPluginCorrectTypes,
  babelPluginIncludeDocs
} from '../generateTypes'
import { fetchPropertiesFromDocs } from '../fetchPropertiesFromDocs'

describe('babelPluginPropTypesRelations', () => {
  it('has to match snapshot', async () => {
    const file = nodePath.resolve(
      __dirname,
      '__mocks__/PrimaryComponent.js'
    )
    const sourceDir = nodePath.dirname(file)

    const { code } = await transformFileAsync(file, {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [babelPluginPropTypesRelations, { sourceDir }]
      ],
      ...babelPluginDefaults
    })

    expect(code).toMatchSnapshot()
  })
})

describe('babelPluginCorrectTypes', () => {
  it('has to match snapshot', async () => {
    const file = nodePath.resolve(
      __dirname,
      '__mocks__/PrimaryComponent.js'
    )
    const sourceDir = nodePath.dirname(file)

    const { code } = await transformFileAsync(file, {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [babelPluginPropTypesRelations, { sourceDir }],
        [
          babelPluginCorrectTypes,
          {
            /**
             * If strictMode is enabled,
             * it will transform "string + bool" or "string + number" in to string or bool only
             */
            strictMode: true
          }
        ]
      ],
      ...babelPluginDefaults
    })

    expect(code).toMatchSnapshot()
  })
})

describe('babelPluginIncludeDocs', () => {
  const file = nodePath.resolve(__dirname, '__mocks__/PrimaryComponent.js')
  let docs = {}

  it('has to match docs snapshot', async () => {
    const docsDir = nodePath.resolve(__dirname, '__mocks__/')
    docs = await fetchPropertiesFromDocs({
      file,
      docsDir,
      findFiles: ['PrimaryComponent.md']
    })
    expect(docs).toMatchSnapshot()
  })

  it('has to match code snapshot', async () => {
    const sourceDir = nodePath.dirname(file)

    const { code } = await transformFileAsync(file, {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [babelPluginPropTypesRelations, { sourceDir }],
        [
          babelPluginCorrectTypes,
          {
            /**
             * If strictMode is enabled,
             * it will transform "string + bool" or "string + number" in to string or bool only
             */
            strictMode: true
          }
        ],
        [
          babelPluginIncludeDocs,
          {
            docs
          }
        ]
      ],
      ...babelPluginDefaults
    })

    expect(code).toMatchSnapshot()
  })
})
