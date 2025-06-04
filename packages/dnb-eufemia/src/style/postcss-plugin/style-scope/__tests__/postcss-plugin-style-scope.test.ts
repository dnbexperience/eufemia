/* eslint-disable jest/expect-expect */

import postcss from 'postcss'
import plugin from '../postcss-plugin-style-scope'
import * as fs from 'fs'
import * as scopeHash from '../handleScopeHash.js'

// Mock fs
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}))

type Options = {
  scopeHash?: string | ((file: string) => string)
  skipClassNames?: string[]
  defaultScopeHash?: string
  runAsCssModule?: boolean
  verbose?: boolean
  replaceClassNames?: Record<string, string>
  postcssOptions?: postcss.ProcessOptions
  sharedScopeHash?: (file: string) => string[]
}

async function run(
  input: string,
  expectedOutput?: string,
  options: Options = {}
) {
  options.postcssOptions = options.postcssOptions ?? { from: '/file.css' }

  const result = await postcss([plugin(options)]).process(
    input,
    options.postcssOptions
  )

  if (expectedOutput !== undefined) {
    expect(result.css).toEqual(expectedOutput)
  }

  expect(result.warnings()).toHaveLength(0)

  return result.css
}

describe('postcss-plugin-style-scope', () => {
  it('should add scope class to simple selectors', async () => {
    return await run(
      '.my-class { color: red; }',
      '.test-scope .my-class { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle multiple selectors', async () => {
    return await run(
      '.class1, .class2 { color: red; }',
      '.test-scope .class1, .test-scope .class2 { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle nested selectors', async () => {
    return await run(
      '.parent .child { color: red; }',
      '.test-scope .parent .child { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle :root selector', async () => {
    return await run(
      ':root { --color: red; }',
      '.test-scope { --color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle attribute selectors', async () => {
    return await run(
      '[data-test] { color: red; }',
      '.test-scope [data-test] { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle pseudo-classes', async () => {
    return await run(
      '.button:hover { color: red; }',
      '.test-scope .button:hover { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle pseudo-elements', async () => {
    return await run(
      '.text::before { content: ""; }',
      '.test-scope .text::before { content: ""; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should skip keyframes rules', async () => {
    return await run(
      '@keyframes spin { 0% { transform: rotate(0deg); } }',
      '@keyframes spin { 0% { transform: rotate(0deg); } }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should skip specified class names', async () => {
    return await run(
      '.dnb-core-style { color: red; }',
      '.dnb-core-style { color: red; }',
      { skipClassNames: ['dnb-core-style'] }
    )
  })

  it('should handle complex selectors with multiple combinators', async () => {
    return await run(
      '.parent > .child + .sibling ~ .cousin { color: red; }',
      '.test-scope .parent > .child + .sibling ~ .cousin { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle selectors with multiple attributes', async () => {
    return await run(
      '[data-test][data-other] { color: red; }',
      '.test-scope [data-test][data-other] { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle custom scope hash', async () => {
    return await run(
      '.my-class { color: red; }',
      '.custom-scope .my-class { color: red; }',
      { scopeHash: 'custom-scope' }
    )
  })

  it('should replace existing default scope hash with custom scope hash', async () => {
    return await run(
      '.eufemia-scope--something .my-class { color: red; }',
      '.custom-scope .my-class { color: red; }',
      { scopeHash: 'custom-scope' }
    )
  })

  it('should replace existing default scope hash when nested with custom scope hash', async () => {
    return await run(
      'html .eufemia-scope--something .my-class { color: red; }',
      'html .custom-scope .my-class { color: red; }',
      { scopeHash: 'custom-scope' }
    )
  })

  it('should replace existing default scope hash with custom scope hash given as function', async () => {
    const scopeHash = jest.fn(() => 'custom-scope')

    await run(
      '.eufemia-scope--something .my-class { color: red; }',
      '.custom-scope .my-class { color: red; }',
      { scopeHash }
    )

    expect(scopeHash).toHaveBeenCalledWith('/file.css')
  })

  it('should not replace existing default scope hash with undefined scope hash returned from function', async () => {
    const scopeHash = jest.fn(() => undefined)

    await run(
      '.eufemia-scope--something .my-class { color: red; }',
      '.eufemia-scope--something .my-class { color: red; }',
      { scopeHash }
    )

    expect(scopeHash).toHaveBeenCalledWith('/file.css')
  })

  it('should handle custom scope hash given as function', async () => {
    const scopeHash = jest.fn(() => 'custom-scope')

    await run(
      '.my-class { color: red; }',
      '.custom-scope .my-class { color: red; }',
      { scopeHash }
    )

    expect(scopeHash).toHaveBeenCalledWith('/file.css')
  })

  it('should handle multiple skip class names', async () => {
    return await run(
      '.skip1, .skip2, .normal { color: red; }',
      '.skip1, .skip2, .test-scope .normal { color: red; }',
      { skipClassNames: ['skip1', 'skip2'], scopeHash: 'test-scope' }
    )
  })

  it('should handle selectors with multiple pseudo-classes', async () => {
    return await run(
      '.button:hover:focus:active { color: red; }',
      '.test-scope .button:hover:focus:active { color: red; }',
      {
        scopeHash: 'test-scope',
      }
    )
  })

  it('should handle selectors with multiple classes', async () => {
    return await run(
      '.class1.class2.class3 { color: red; }',
      '.test-scope .class1.class2.class3 { color: red; }',
      {
        scopeHash: 'test-scope',
      }
    )
  })

  it('should handle html tag only', async () => {
    return await run('html { color: red; }', 'html { color: red; }', {
      scopeHash: 'test-scope',
    })
  })

  it('should handle html and body tags only', async () => {
    return await run(
      'html body { margin: 0; }',
      'html body { margin: 0; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle html and body tag', async () => {
    return await run(
      'html body .module-class { color: red; }',
      'html body .test-scope .module-class { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle id selector', async () => {
    return await run(
      '#id-selector { color: red; }',
      '.test-scope #id-selector { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should handle tag selector', async () => {
    return await run(
      'strong { color: red; }',
      '.test-scope strong { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should not scope when selector starts with ":not(#isolated) "', async () => {
    return await run(
      ':not(#isolated) #id-selector { color: red; }',
      '#id-selector { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should not scope when selector has ":not(#isolated)"', async () => {
    return await run(
      'body .some-selector :not(#isolated) #some-id { color: red; }',
      'body .some-selector #some-id { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should scope when selector starts with :not(#isolated)*', async () => {
    return await run(
      ':not(#isolated)-something #id-selector { color: red; }',
      '.test-scope :not(#isolated)-something #id-selector { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should not add scope class twice', async () => {
    return await run(
      '.test-scope .my-class { color: red; }',
      '.test-scope .my-class { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should not add scope class twice when nested', async () => {
    return await run(
      'html .test-scope .my-class { color: red; }',
      'html .test-scope .my-class { color: red; }',
      { scopeHash: 'test-scope' }
    )
  })

  it('should not add scope class twice when starting with "eufemia-scope--"', async () => {
    return await run(
      'html .eufemia-scope--something .my-class { color: red; }',
      'html .eufemia-scope--something .my-class { color: red; }'
    )
  })

  it('should not add scope class twice when starting with a custom prefix', async () => {
    return await run(
      'html .x-something .my-class { color: red; }',
      'html .x-something .my-class { color: red; }',
      {
        defaultScopeHash: 'x-',
      }
    )
  })

  it('should not add scope class when ignored', async () => {
    return await run(
      'html .existing-scope .my-class { color: red; }',
      'html .existing-scope .my-class { color: red; }',
      {
        scopeHash: 'ski-this-scope',
        skipClassNames: ['existing-scope'],
      }
    )
  })

  describe('CSS Modules', () => {
    it('should detect CSS Modules', async () => {
      return await run(
        'html .module-class { color: red; }',
        'html :global(.test-scope) .module-class { color: red; }',
        {
          postcssOptions: { from: '/file.module.css' },
          scopeHash: 'test-scope',
        }
      )
    })

    it('should handle html tag', async () => {
      return await run(
        'html .module-class { color: red; }',
        'html :global(.test-scope) .module-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should handle body tag', async () => {
      return await run(
        'body .module-class { color: red; }',
        'body :global(.test-scope) .module-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should handle html tag only', async () => {
      return await run('html { color: red; }', 'html { color: red; }', {
        runAsCssModule: true,
        scopeHash: 'test-scope',
      })
    })

    it('should handle html and body tags only', async () => {
      return await run(
        'html body { margin: 0; }',
        'html body { margin: 0; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should handle html and body tag', async () => {
      return await run(
        'html body .module-class { color: red; }',
        'html body :global(.test-scope) .module-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should handle class selector', async () => {
      return await run(
        '.module-class { color: red; }',
        ':global(.test-scope) .module-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should handle id selector', async () => {
      return await run(
        '#id-selector { color: red; }',
        ':global(.test-scope) #id-selector { color: red; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should handle tag selector', async () => {
      return await run(
        'strong { color: red; }',
        ':global(.test-scope) strong { color: red; }',
        { runAsCssModule: true, scopeHash: 'test-scope' }
      )
    })

    it('should replace existing default scope hash (vanilla CSS) with custom scope hash', async () => {
      return await run(
        '.eufemia-scope--something .my-class { color: red; }',
        ':global(.custom-scope) .my-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'custom-scope' }
      )
    })

    it('should replace existing default scope hash (vanilla CSS) with custom scope hash given as function', async () => {
      const scopeHash = jest.fn(() => 'custom-scope')

      await run(
        '.eufemia-scope--something .my-class { color: red; }',
        ':global(.custom-scope) .my-class { color: red; }',
        { runAsCssModule: true, scopeHash }
      )

      expect(scopeHash).toHaveBeenCalledWith('/file.css')
    })

    it('should replace existing default scope hash (CSS Module) with custom scope hash', async () => {
      return await run(
        ':global(.eufemia-scope--something) .my-class { color: red; }',
        ':global(.custom-scope) .my-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'custom-scope' }
      )
    })

    it('should replace existing default scope hash when nested with custom scope hash', async () => {
      return await run(
        'html :global(.eufemia-scope--something) .my-class { color: red; }',
        'html :global(.custom-scope) .my-class { color: red; }',
        { runAsCssModule: true, scopeHash: 'custom-scope' }
      )
    })

    it('should replace existing default scope hash (CSS Module) with custom scope hash given as function', async () => {
      const scopeHash = jest.fn(() => 'custom-scope')

      await run(
        ':global(.eufemia-scope--something) .my-class { color: red; }',
        ':global(.custom-scope) .my-class { color: red; }',
        { runAsCssModule: true, scopeHash }
      )

      expect(scopeHash).toHaveBeenCalledWith('/file.css')
    })

    it('should not replace existing default scope hash with undefined scope hash returned from function', async () => {
      const scopeHash = jest.fn(() => undefined)

      await run(
        ':global(.eufemia-scope--something) .my-class { color: red; }',
        ':global(.eufemia-scope--something) .my-class { color: red; }',
        { scopeHash }
      )

      expect(scopeHash).toHaveBeenCalledWith('/file.css')
    })

    it('should handle custom scope hash given as function', async () => {
      const scopeHash = jest.fn(() => 'custom-scope')

      await run(
        '.my-class { color: red; }',
        ':global(.custom-scope) .my-class { color: red; }',
        { runAsCssModule: true, scopeHash }
      )

      expect(scopeHash).toHaveBeenCalledWith('/file.css')
    })

    it('should not add scope class twice', async () => {
      return await run(
        ':global(.test-scope) .module-class { color: red; }',
        ':global(.test-scope) .module-class { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should not add scope class twice when nested', async () => {
      return await run(
        'html :global(.test-scope) .module-class { color: red; }',
        'html :global(.test-scope) .module-class { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should not add scope class twice when starting with "eufemia-scope--"', async () => {
      return await run(
        'html :global(.eufemia-scope--something) .my-class { color: red; }',
        'html :global(.eufemia-scope--something) .my-class { color: red; }'
      )
    })

    it('should not add scope class twice when starting with a custom prefix', async () => {
      return await run(
        'html :global(.x-something) .my-class { color: red; }',
        'html :global(.x-something) .my-class { color: red; }',
        {
          defaultScopeHash: 'x-',
        }
      )
    })

    it('should not add scope class when ignored', async () => {
      return await run(
        'html :global(.existing-scope) .my-class { color: red; }',
        'html :global(.existing-scope) .my-class { color: red; }',
        {
          scopeHash: 'ski-this-scope',
          skipClassNames: ['existing-scope'],
        }
      )
    })
  })

  describe('replaceClassNames', () => {
    it('should replace a single class name', async () => {
      return await run(
        '.old-class { color: red; }',
        '.test-scope .new-class { color: red; }',
        {
          replaceClassNames: { 'old-class': 'new-class' },
          scopeHash: 'test-scope',
        }
      )
    })

    it('should replace multiple class names', async () => {
      return await run(
        '.old-class1, .old-class2 { color: red; }',
        '.test-scope .new-class1, .test-scope .new-class2 { color: red; }',
        {
          replaceClassNames: {
            'old-class1': 'new-class1',
            'old-class2': 'new-class2',
          },
          scopeHash: 'test-scope',
        }
      )
    })

    it('should replace class names in complex selectors', async () => {
      return await run(
        '.parent .old-class:hover { color: red; }',
        '.test-scope .parent .new-class:hover { color: red; }',
        {
          replaceClassNames: { 'old-class': 'new-class' },
          scopeHash: 'test-scope',
        }
      )
    })

    it('should replace class names with CSS Modules', async () => {
      return await run(
        '.old-class { color: red; }',
        ':global(.test-scope) .new-class { color: red; }',
        {
          replaceClassNames: { 'old-class': 'new-class' },
          runAsCssModule: true,
          scopeHash: 'test-scope',
        }
      )
    })

    it('should not replace skipped class names', async () => {
      return await run(
        '.old-class, .skip-class { color: red; }',
        '.test-scope .new-class, .skip-class { color: red; }',
        {
          replaceClassNames: { 'old-class': 'new-class' },
          skipClassNames: ['skip-class'],
          scopeHash: 'test-scope',
        }
      )
    })

    it('should handle multiple class names in a single selector', async () => {
      return await run(
        '.old-class1.old-class2 { color: red; }',
        '.test-scope .new-class1.new-class2 { color: red; }',
        {
          replaceClassNames: {
            'old-class1': 'new-class1',
            'old-class2': 'new-class2',
          },
          scopeHash: 'test-scope',
        }
      )
    })
  })

  it('should use scope hash from scope-hash.txt file when auto is set', async () => {
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue('test-hash-from-file')
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation((path: string) => {
        return path.endsWith('scope-hash.txt')
      })
    const getStyleScopeHashSpy = jest
      .spyOn(scopeHash, 'getStyleScopeHash')
      .mockReturnValue('eufemia-default-scope')

    const result = await run(
      '.my-class { color: red; }',
      '.test-hash-from-file .my-class { color: red; }',
      {
        scopeHash: 'auto',
        postcssOptions: {
          from: '/some/path/to/style.css',
        },
      }
    )

    readFileSyncSpy.mockRestore()
    existsSyncSpy.mockRestore()
    getStyleScopeHashSpy.mockRestore()

    expect(result).toBeDefined()
  })

  it('should fallback to default hash when scope-hash.txt is not found', async () => {
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockReturnValue(false)
    const getStyleScopeHashSpy = jest
      .spyOn(scopeHash, 'getStyleScopeHash')
      .mockReturnValue('eufemia-default-scope')

    const result = await run(
      '.my-class { color: red; }',
      '.eufemia-default-scope .my-class { color: red; }',
      {
        scopeHash: 'auto',
        postcssOptions: {
          from: '/some/path/to/style.css',
        },
      }
    )

    readFileSyncSpy.mockRestore()
    existsSyncSpy.mockRestore()
    getStyleScopeHashSpy.mockRestore()

    expect(result).toBeDefined()
  })

  it('should fallback to default hash when scope-hash.txt contains spaces', async () => {
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue('test hash with spaces')
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation((path: string) =>
        path.includes('scope-hash.txt')
      )
    const getStyleScopeHashSpy = jest
      .spyOn(scopeHash, 'getStyleScopeHash')
      .mockReturnValue('eufemia-default-scope')

    const result = await run(
      '.my-class { color: red; }',
      '.eufemia-default-scope .my-class { color: red; }',
      {
        scopeHash: 'auto',
        postcssOptions: {
          from: '/some/path/to/style.css',
        },
      }
    )

    readFileSyncSpy.mockRestore()
    existsSyncSpy.mockRestore()
    getStyleScopeHashSpy.mockRestore()

    expect(result).toBeDefined()
  })
})

describe('sharedScopeHash functionality', () => {
  it('should throw error if sharedScopeHash is not a function', async () => {
    await expect(
      run('.my-class { color: red; }', undefined, {
        sharedScopeHash: 'not-a-function' as any,
      })
    ).rejects.toThrow('sharedScopeHash must be a function')
  })

  it('should create duplicate selectors for each shared scope', async () => {
    return await run(
      '.my-class { color: red; }',
      '.main-scope .my-class, .shared-1 .my-class, .shared-2 .my-class { color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
      }
    )
  })

  it('should use scopeHash when sharedScopeHash functions returns not an array', async () => {
    return await run(
      '.my-class { color: red; }',
      '.main-scope .my-class { color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => undefined,
      }
    )
  })

  it('should use default hash when sharedScopeHash functions returns not an array', async () => {
    return await run(
      '.my-class { color: red; }',
      '.eufemia-default-scope .my-class { color: red; }',
      {
        sharedScopeHash: () => undefined,
      }
    )
  })

  it('should not duplicate selectors when they match', async () => {
    return await run(
      '.my-class { color: red; }',
      '.shared-1 .my-class, .shared-2 .my-class { color: red; }',
      {
        scopeHash: 'shared-1',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
      }
    )
  })

  it('should handle multiple selectors with shared scopes', async () => {
    return await run(
      '.class1, .class2 { color: red; }',
      '.main-scope .class1, .shared-1 .class1, .shared-2 .class1, .main-scope .class2, .shared-1 .class2, .shared-2 .class2 { color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
      }
    )
  })

  it('should handle :root selector with shared scopes', async () => {
    return await run(
      ':root { --color: red; }',
      '.main-scope, .shared-1, .shared-2 { --color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
      }
    )
  })

  it('should handle complex selectors with shared scopes', async () => {
    return await run(
      '.parent > .child + .sibling { color: red; }',
      '.main-scope .parent > .child + .sibling, .shared-1 .parent > .child + .sibling, .shared-2 .parent > .child + .sibling { color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
      }
    )
  })

  it('should handle shared scopes with CSS modules', async () => {
    return await run(
      '.my-class { color: red; }',
      ':global(.main-scope) .my-class, :global(.shared-1) .my-class, :global(.shared-2) .my-class { color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
        runAsCssModule: true,
      }
    )
  })

  it('should handle shared scopes with replaceClassNames', async () => {
    return await run(
      '.old-name { color: red; }',
      '.main-scope .new-name, .shared-1 .new-name, .shared-2 .new-name { color: red; }',
      {
        scopeHash: 'main-scope',
        sharedScopeHash: () => ['shared-1', 'shared-2'],
        replaceClassNames: { 'old-name': 'new-name' },
      }
    )
  })

  it('should call sharedScopeHash function with file path', async () => {
    const sharedScopeHash = jest.fn(() => ['shared-1', 'shared-2'])

    await run('.my-class { color: red; }', undefined, {
      scopeHash: 'main-scope',
      sharedScopeHash,
    })

    expect(sharedScopeHash).toHaveBeenCalledWith('/file.css')
  })
})
