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
import { isCI } from 'repo-utils'

jest.setTimeout(isCI ? 30e3 : 10e3)

describe('babelPluginIncludeDocs', () => {
  const docsDir = nodePath.resolve(__dirname, '__mocks__')
  const file = nodePath.resolve(docsDir, 'PrimaryComponent.js')

  async function runIncludeDocsTestSuite({
    sourceDir,
    strictMode = false,
    onComplete = null,
  }) {
    const { docs } = await fetchPropertiesFromDocs({
      file,
      docsDir,
      findFiles: ['PrimaryComponent.md'],
    })

    const { code } = await transformFileAsync(file, {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [babelPluginPropTypesRelations, { sourceDir }],
        [
          babelPluginCorrectTypes,
          {
            strictMode,
          },
        ],
        [
          babelPluginIncludeDocs,
          {
            docs,
            insertLeadingComment: true,
            onComplete,
          },
        ],
      ],
      ...babelPluginConfigDefaults,
    })
    return code
  }

  it('has to match docs snapshot', async () => {
    const { docs } = await fetchPropertiesFromDocs({
      file,
      docsDir,
      findFiles: ['PrimaryComponent.md'],
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
      strictMode: true,
    })

    expect(code).toMatchSnapshot()
  })

  it('has to match collectProps snapshot given by onComplete', async () => {
    let collectProps = null
    const onComplete = jest.fn((params) => {
      collectProps = params
    })

    const sourceDir = nodePath.dirname(file)
    const code = await runIncludeDocsTestSuite({
      sourceDir,
      onComplete,
    })

    expect(code).toMatchSnapshot()

    expect(onComplete).toBeCalledTimes(1)
    expect(collectProps).toMatchSnapshot()
  })
})
