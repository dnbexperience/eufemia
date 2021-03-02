/**
 * Scripts test
 *
 */

import { transformFileAsync } from '@babel/core'
import nodePath from 'path'
import { babelPluginConfigDefaults } from '../babelPluginConfigDefaults'
import { babelPluginPropTypesRelations } from '../babelPluginPropTypesRelations'

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
      ...babelPluginConfigDefaults
    })

    expect(code).toMatchSnapshot()
  })
})
