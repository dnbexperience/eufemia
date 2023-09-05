/**
 * Scripts test
 *
 */

import { transformFileAsync } from '@babel/core'
import nodePath from 'path'
import { babelPluginConfigDefaults } from '../babelPluginConfigDefaults'
import { babelPluginExtendTypes } from '../babelPluginExtendTypes'

describe('babelPluginExtendTypes', () => {
  it('has to match snapshot', async () => {
    const targetFile = nodePath.resolve(
      __dirname,
      '__mocks__/PrimaryComponent.d.ts'
    )
    const file = nodePath.resolve(
      __dirname,
      '__mocks__/PrimaryComponent.js'
    )

    const { code } = await transformFileAsync(targetFile, {
      plugins: [
        ['@babel/plugin-syntax-typescript', { isTSX: true }],
        [
          babelPluginExtendTypes,
          {
            file,
          },
        ],
      ],
      ...babelPluginConfigDefaults,
    })

    expect(code).toMatchSnapshot()
  })
})
