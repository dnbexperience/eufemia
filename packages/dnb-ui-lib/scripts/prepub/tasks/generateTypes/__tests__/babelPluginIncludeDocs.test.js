/**
 * Scripts test
 *
 */

import nodePath from 'path'
import { transformFileAsync } from '@babel/core'
import { babelPluginConfigDefaults } from '../babelPluginConfigDefaults'
import { babelPluginPropTypesRelations } from '../babelPluginPropTypesRelations'
import { fetchPropertiesFromDocs } from '../fetchPropertiesFromDocs'
import { babelPluginIncludeDocs } from '../babelPluginIncludeDocs'
import { babelPluginCorrectTypes } from '../babelPluginCorrectTypes'

describe('babelPluginIncludeDocs', () => {
  const docsDir = nodePath.resolve(__dirname, '__mocks__')
  const file = nodePath.resolve(docsDir, 'PrimaryComponent.js')
  let docs = {}

  async function runIncludeDocsTestSuite({ sourceDir, ...options }) {
    const { code } = await transformFileAsync(file, {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [babelPluginPropTypesRelations, { sourceDir }],
        [
          babelPluginCorrectTypes,
          {
            strictMode: false,
            ...options
          }
        ],
        [
          babelPluginIncludeDocs,
          {
            docs
          }
        ]
      ],
      ...babelPluginConfigDefaults
    })
    return code
  }

  it('has to match docs snapshot', async () => {
    docs = await fetchPropertiesFromDocs({
      file,
      docsDir,
      findFiles: ['PrimaryComponent.md']
    })
    expect(docs).toMatchSnapshot()
  })

  it('has to match code snapshot', async () => {
    const sourceDir = nodePath.dirname(file)
    const code = await runIncludeDocsTestSuite({ sourceDir })

    expect(code).toMatchSnapshot()
  })

  it('has to match code snapshot in strict mode', async () => {
    const sourceDir = nodePath.dirname(file)
    const code = await runIncludeDocsTestSuite({
      sourceDir,

      /**
       * If strictMode is enabled,
       * it will transform "string + bool" or "string + number" in to string or bool only
       */
      strictMode: true
    })

    expect(code).toMatchSnapshot()
  })
})
