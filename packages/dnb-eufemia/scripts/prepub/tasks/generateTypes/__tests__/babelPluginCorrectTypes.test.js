/**
 * Scripts test
 *
 */

import { transformFileAsync } from '@babel/core'
import nodePath from 'path'
import { babelPluginConfigDefaults } from '../babelPluginConfigDefaults'
import { babelPluginPropTypesRelations } from '../babelPluginPropTypesRelations'
import { babelPluginCorrectTypes } from '../babelPluginCorrectTypes'

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
            strictMode: true,
          },
        ],
      ],
      ...babelPluginConfigDefaults,
    })

    expect(code).toMatchSnapshot()
  })
})
