/**
 * Scripts test
 *
 */

import nodePath from 'path'
import { createTypes } from '../generateTypes'

jest.setTimeout(30e3)

describe('generateTypes', () => {
  it('has to match PrimaryComponent snapshot', async () => {
    const mdxDocsDir = nodePath.resolve(
      __dirname,
      '../generateTypes/__tests__',
      '__mocks__'
    )
    const file = nodePath.resolve(mdxDocsDir, 'PrimaryComponent.js')
    const [{ destFile, definitionContent }] = await createTypes([file], {
      isTest: true,
      mdxDocsDir,
      findFiles: ['PrimaryComponent.mdx'],
    })

    expect(destFile).toContain('__mocks__/PrimaryComponent.d.ts')
    expect(definitionContent).toMatchSnapshot()
  })

  it('has to match SecondaryComponent snapshot', async () => {
    const mdxDocsDir = nodePath.resolve(
      __dirname,
      '../generateTypes/__tests__',
      '__mocks__'
    )
    const file = nodePath.resolve(mdxDocsDir, 'SecondaryComponent.js')
    const [{ destFile, definitionContent }] = await createTypes([file], {
      isTest: true,
      mdxDocsDir,
      findFiles: ['SecondaryComponent.mdx'],
    })

    expect(destFile).toContain('__mocks__/SecondaryComponent.d.ts')
    expect(definitionContent).toMatchSnapshot()
  })
})
