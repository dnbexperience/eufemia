/**
 * Scripts test
 *
 */

import fs from 'fs-extra'
import {
  prepareTemplates,
  processComponents,
  processFragments,
  processElements,
  processExtensions,
  processMainIndex,
} from '../prepareTemplates'

jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }))
})

jest.mock('fs-extra', () => {
  return {
    ...jest.requireActual('fs-extra'),
    writeFile: jest.fn().mockResolvedValue(false),
    readdir: jest.fn((source) => {
      if (source.endsWith('/components')) {
        return ['component-a', 'component-b']
      }
      if (source.endsWith('/elements')) {
        return ['element-a', 'element-b']
      }
      if (source.endsWith('/extensions')) {
        return ['extension-a', 'extension-b']
      }
      if (source.endsWith('/fragments')) {
        return ['fragment-a', 'fragment-b']
      }

      return []
    }),
    lstatSync: jest.fn(() => {
      return {
        isDirectory: jest.fn().mockResolvedValue(false),
        isFile: jest.fn().mockResolvedValue(false),
      }
    }),
  }
})

describe('prepareTemplates', () => {
  it('has to call writeFile a certain time', async () => {
    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    await prepareTemplates()

    expect(writeFile).toHaveBeenCalledTimes(15)
  })

  it('has to write "main index" file', async () => {
    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    const components = await processComponents()
    const elements = await processElements()
    await processMainIndex({ components, elements })

    expect(writeFile).toHaveBeenCalledTimes(9)

    const dest9 = expect.stringContaining('/src/index.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      9,
      dest9,
      expect.stringContaining(`export default {}`)
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      9,
      dest9,
      expect.stringContaining(
        `export { ComponentA, ComponentB, ElementA, ElementB }`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      9,
      dest9,
      expect.stringContaining(
        `import ElementB from './elements/element-b'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      9,
      dest9,
      expect.stringContaining(
        `import ElementA from './elements/element-a'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      9,
      dest9,
      expect.stringContaining(
        `import ComponentB from './components/component-b/ComponentB'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      9,
      dest9,
      expect.stringContaining(
        `import ComponentA from './components/component-a/ComponentA'`
      )
    )
  })

  it('has to write "components" files', async () => {
    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    await processComponents()

    expect(writeFile).toHaveBeenCalledTimes(4)

    const dest1 = expect.stringContaining('/src/components/index.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      dest1,
      expect.stringContaining(
        `import ComponentA from './component-a/ComponentA'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      dest1,
      expect.stringContaining(
        `import ComponentB from './component-b/ComponentB'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      dest1,
      expect.stringContaining(`export { ComponentA, ComponentB }`)
    )

    const dest2 = expect.stringContaining('/src/components/lib.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(
        `import ComponentA from './component-a/ComponentA'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(
        `import ComponentB from './component-b/ComponentB'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(`export { ComponentA, ComponentB }`)
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(`return { ComponentA, ComponentB }`)
    )

    const dest3 = expect.stringContaining('/src/components/ComponentA.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      3,
      dest3,
      expect.stringContaining(
        `import ComponentA from './component-a/ComponentA'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      3,
      dest3,
      expect.stringContaining(`export * from './component-a/ComponentA'`)
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      3,
      dest3,
      expect.stringContaining(`export default ComponentA`)
    )

    const dest4 = expect.stringContaining('/src/components/ComponentB.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      4,
      dest4,
      expect.stringContaining(
        `import ComponentB from './component-b/ComponentB'`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      4,
      dest4,
      expect.stringContaining(`export * from './component-b/ComponentB'`)
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      4,
      dest4,
      expect.stringContaining(`export default ComponentB`)
    )
  })

  it('has to write "fragments" files', async () => {
    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    await processFragments()

    expect(writeFile).toHaveBeenCalledTimes(4)

    const dest1 = expect.stringContaining('/src/fragments/index.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      dest1,
      expect.stringContaining(`export { FragmentA, FragmentB }`)
    )

    const dest2 = expect.stringContaining('/src/fragments/lib.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(`return { FragmentA, FragmentB }`)
    )

    const dest3 = expect.stringContaining('/fragments/FragmentA.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      3,
      dest3,
      expect.stringContaining(
        `import FragmentA from './fragment-a/FragmentA'`
      )
    )

    const dest4 = expect.stringContaining('/fragments/FragmentB.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      4,
      dest4,
      expect.stringContaining(`export * from './fragment-b/FragmentB'`)
    )
  })

  it('has to write "elements" files', async () => {
    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    await processElements()

    expect(writeFile).toHaveBeenCalledTimes(4)

    const dest1 = expect.stringContaining('/src/elements/index.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      dest1,
      expect.stringContaining(`export { ElementA, ElementB }`)
    )

    const dest2 = expect.stringContaining('/src/elements/lib.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(`return { ElementA, ElementB }`)
    )
  })

  it('has to write "extensions" files', async () => {
    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    await processExtensions()

    expect(writeFile).toHaveBeenCalledTimes(2)

    const dest1 = expect.stringContaining('/src/extensions/index.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      dest1,
      expect.stringContaining(`export { ExtensionA, ExtensionB }`)
    )

    const dest2 = expect.stringContaining('/src/extensions/lib.ts')
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      dest2,
      expect.stringContaining(`return { ExtensionA, ExtensionB }`)
    )
  })
})
