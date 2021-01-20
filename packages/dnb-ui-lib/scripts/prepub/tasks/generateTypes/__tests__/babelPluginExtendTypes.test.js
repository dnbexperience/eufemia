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
    const file = nodePath.resolve(
      __dirname,
      '__mocks__/PrimaryComponent.d.ts'
    )

    const { code } = await transformFileAsync(file, {
      plugins: [
        ['@babel/plugin-syntax-typescript', { isTSX: true }],
        [babelPluginExtendTypes, { componentName: 'PrimaryComponent' }]
      ],
      ...babelPluginConfigDefaults
    })

    expect(code).toMatchSnapshot()
  })
})
