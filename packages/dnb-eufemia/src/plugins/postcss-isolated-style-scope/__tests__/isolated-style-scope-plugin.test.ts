/* eslint-disable jest/expect-expect */

import postcss from 'postcss'
import * as fs from 'fs'
import * as scopeHash from '../plugin-scope-hash.js'
import plugin from '../isolated-style-scope-plugin.js'

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

describe('isolated-style-scope-plugin', () => {
  describe('Basic Selector Scoping', () => {
    it('should add scope class to simple selectors', async () => {
      return await run(
        '.my-class { color: red; }',
        '.test-scope .my-class { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope multiple selectors', async () => {
      return await run(
        '.class1, .class2 { color: red; }',
        '.test-scope .class1, .test-scope .class2 { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope nested selectors', async () => {
      return await run(
        '.parent .child { color: red; }',
        '.test-scope .parent .child { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope complex selectors with multiple combinators', async () => {
      return await run(
        '.parent > .child + .sibling ~ .cousin { color: red; }',
        '.test-scope .parent > .child + .sibling ~ .cousin { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })
  })

  describe('Special Selectors', () => {
    it('should scope :root selector by replacing it with the scope', async () => {
      return await run(
        ':root { --color: red; }',
        '.test-scope { --color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope attribute selectors', async () => {
      return await run(
        '[data-test] { color: red; }',
        '.test-scope [data-test] { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope selectors with multiple attributes', async () => {
      return await run(
        '[data-test][data-other] { color: red; }',
        '.test-scope [data-test][data-other] { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope pseudo-classes', async () => {
      return await run(
        '.button:hover { color: red; }',
        '.test-scope .button:hover { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope selectors with multiple pseudo-classes', async () => {
      return await run(
        '.button:hover:focus:active { color: red; }',
        '.test-scope .button:hover:focus:active { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope pseudo-elements', async () => {
      return await run(
        '.text::before { content: ""; }',
        '.test-scope .text::before { content: ""; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope a lone ::before selector', async () => {
      return await run(
        '::before { content: ""; }',
        '.test-scope ::before { content: ""; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope lone universal selector', async () => {
      return await run(
        '* { color: red; }',
        '.test-scope * { color: red; }',
        {
          scopeHash: 'test-scope',
        }
      )
    })

    it('should scope group including *, ::before, ::after', async () => {
      return await run(
        '*, ::before, ::after { color: red; }',
        '.test-scope *, .test-scope ::before, .test-scope ::after { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope id selector', async () => {
      return await run(
        '#id-selector { color: red; }',
        '.test-scope #id-selector { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope tag selectors', async () => {
      return await run(
        'strong { color: red; }',
        '.test-scope strong { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope selectors with multiple classes', async () => {
      return await run(
        '.class1.class2.class3 { color: red; }',
        '.test-scope .class1.class2.class3 { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope selectors no matter what kind of node they are', async () => {
      return await run(
        '*.foo[data-foo]::marker > :nth-child(2) { color: red; }',
        '.test-scope *.foo[data-foo]::marker > :nth-child(2) { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should replace [scope-placeholder] with the actual scopeHash', async () => {
      await run(
        '[scope-placeholder] { color: red; }',
        '.test-scope { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should replace [scope-placeholder] including selectors with the actual scopeHash', async () => {
      await run(
        '.selector-before [scope-placeholder] .selector-after { color: red; }',
        '.selector-before .test-scope .selector-after { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope `html [scope-placeholder] *`', async () => {
      return await run(
        'html [scope-placeholder] * { color: red; }',
        'html .test-scope * { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })
  })

  describe('HTML and Body Tags', () => {
    it('should handle html tag only', async () => {
      return await run(
        'html { color: red; }',
        'html { color: red; }', // keep as is
        { scopeHash: 'test-scope' }
      )
    })

    it('should handle body tag only', async () => {
      return await run(
        'body { color: red; }',
        'body { color: red; }', // keep as is
        { scopeHash: 'test-scope' }
      )
    })

    it('should handle html and body tags only', async () => {
      return await run(
        'html body { color: red; }',
        'html body { color: red; }', // keep as is
        { scopeHash: 'test-scope' }
      )
    })

    it('should handle body tag', async () => {
      return await run(
        'body .module-class { color: red; }',
        'body .test-scope .module-class { color: red; }',
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

    it('should not scope html body combo when no scopeHash is given', async () => {
      await run(
        'html body { color: red; }',
        'html body { color: red; }' // keep as is
      )
    })

    it('should scope `body [data-test]`', async () => {
      return await run(
        'body [data-test] { color: red; }',
        'body .test-scope [data-test] { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope `body *`', async () => {
      return await run(
        'body * { color: red; }',
        'body .test-scope * { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should not scope `html *`', async () => {
      return await run(
        'html * { color: red; }',
        'html * { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope `html body *`', async () => {
      return await run(
        'html body * { color: red; }',
        'html body .test-scope * { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })
  })

  describe('Scope Hash Handling', () => {
    it('should handle custom scope hash', async () => {
      return await run(
        '.my-class { color: red; }',
        '.custom-scope .my-class { color: red; }',
        { scopeHash: 'custom-scope' }
      )
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
        .mockReturnValue('eufemia-scope--default')

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
        .mockReturnValue('eufemia-scope--default')

      const result = await run(
        '.my-class { color: red; }',
        '.eufemia-scope--default .my-class { color: red; }',
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
        .mockReturnValue('eufemia-scope--default')

      const result = await run(
        '.my-class { color: red; }',
        '.eufemia-scope--default .my-class { color: red; }',
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

  describe('Default Scope Replacement', () => {
    it('should replace existing default scope hash with custom scope hash', async () => {
      return await run(
        '.eufemia-scope--something .my-class { color: red; }',
        '.custom-scope .my-class { color: red; }',
        { scopeHash: 'custom-scope' }
      )
    })

    it('should replace .eufemia-scope--default with given scope', async () => {
      return await run(
        '.eufemia-scope--default { --color: red; }',
        '.test-scope { --color: red; }',
        { scopeHash: 'test-scope' }
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

    it('should replace custom defaultScopeHash prefix with given scope', async () => {
      await run(
        'html .x-oldprefix .child { color: red; }',
        'html .custom .child { color: red; }',
        {
          defaultScopeHash: 'x-',
          scopeHash: 'custom',
        }
      )
    })

    it('should replace default scope when preceded by html tag only', async () => {
      return await run(
        'html .eufemia-scope--default { color: red; }',
        'html .custom-scope { color: red; }',
        { scopeHash: 'custom-scope' }
      )
    })

    it('should keep rule when selector became empty after stripping default scope', async () => {
      await run(
        '.eufemia-scope--default { color: red; }',
        '.new-scope { color: red; }',
        { scopeHash: 'new-scope' }
      )
    })

    it('should keep rule when selector became empty inside @media', async () => {
      await run(
        '@media (min-width: 40em){ .eufemia-scope--default { color: red; } }',
        '@media (min-width: 40em){ .new-scope { color: red; } }',
        { scopeHash: 'new-scope' }
      )
    })
  })

  describe('Skipping and Ignoring', () => {
    it('should skip specified class names', async () => {
      return await run(
        '.dnb-core-style { color: red; }',
        '.dnb-core-style { color: red; }',
        { skipClassNames: ['dnb-core-style'] }
      )
    })

    it('should handle multiple skip class names', async () => {
      return await run(
        '.skip1, .skip2, .normal { color: red; }',
        '.skip1, .skip2, .test-scope .normal { color: red; }',
        { skipClassNames: ['skip1', 'skip2'], scopeHash: 'test-scope' }
      )
    })

    it('should skip attribute selectors when listed in skipClassNames', async () => {
      await run(
        '[data-skip] { color: red; }',
        '[data-skip] { color: red; }',
        { skipClassNames: ['data-skip'], scopeHash: 'test-scope' }
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

    it('should not scope when selector starts with "[skip-isolation] "', async () => {
      return await run(
        '[skip-isolation] #id-selector { color: red; }',
        '#id-selector { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should not scope when selector has "[skip-isolation]"', async () => {
      return await run(
        'body .some-selector [skip-isolation] #some-id { color: red; }',
        'body .some-selector #some-id { color: red; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope when selector starts with [skip-isolation]*', async () => {
      return await run(
        '[skip-isolation]-something #id-selector { color: red; }',
        '.test-scope [skip-isolation]-something #id-selector { color: red; }',
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
        { defaultScopeHash: 'x-' }
      )
    })
  })

  describe('Special Rules', () => {
    it('should skip keyframes rules', async () => {
      return await run(
        '@keyframes spin { 0% { transform: rotate(0deg); } }',
        '@keyframes spin { 0% { transform: rotate(0deg); } }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope selectors inside @supports', async () => {
      await run(
        '@supports (display: grid) { .foo { color: red; } }',
        '@supports (display: grid) { .test-scope .foo { color: red; } }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should scope selectors inside @media', async () => {
      await run(
        '@media (min-width: 40em) { .foo { color: red; } }',
        '@media (min-width: 40em) { .test-scope .foo { color: red; } }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should skip @font-face rules', async () => {
      return await run(
        '@font-face { font-family: "MyFont"; src: url("myfont.woff2"); }',
        '@font-face { font-family: "MyFont"; src: url("myfont.woff2"); }',
        { scopeHash: 'test-scope' }
      )
    })
  })

  // TODO: Add support for keyframes renaming
  describe.skip('Keyframes Renaming', () => {
    it('should rename keyframes with scope suffix', async () => {
      return await run(
        '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
        '@keyframes fadeIn__test-scope { from { opacity: 0; } to { opacity: 1; } }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should update animation-name declarations to hashed keyframe', async () => {
      return await run(
        '.btn { animation-name: fadeIn; }',
        '.test-scope .btn { animation-name: fadeIn__test-scope; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should update animation shorthand declarations to hashed keyframe', async () => {
      return await run(
        '.icon { animation: spin 2s linear infinite; }',
        '.test-scope .icon { animation: spin__test-scope 2s linear infinite; }',
        { scopeHash: 'test-scope' }
      )
    })

    it('should handle multiple keyframes and animations', async () => {
      const input = `@keyframes slide { from { left:0 } to { left:100px } }\n.icon { animation: slide 1s, spin 2s; }`
      const output = `@keyframes slide__test-scope { from { left:0 } to { left:100px } }\n.test-scope .icon { animation: slide__test-scope 1s, spin__test-scope 2s; }`
      return await run(input, output, { scopeHash: 'test-scope' })
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

    it('skips + replaces correctly when both maps are active', async () => {
      await run(
        '.skip-me .old { color:red; }',
        '.skip-me .new { color:red; }',
        {
          scopeHash: 'scoped',
          skipClassNames: ['skip-me'],
          replaceClassNames: { old: 'new' },
        }
      )
    })
  })

  describe('CSS Modules', () => {
    describe('Detection and Basic Selectors', () => {
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
    })

    describe('HTML and Body Tags', () => {
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
        return await run(
          'html { color: red; }',
          'html { color: red; }', // keep as is
          {
            runAsCssModule: true,
            scopeHash: 'test-scope',
          }
        )
      })

      it('should handle body tag only', async () => {
        return await run(
          'body { color: red; }',
          'body { color: red; }', // keep as is
          {
            runAsCssModule: true,
            scopeHash: 'test-scope',
          }
        )
      })

      it('should handle html and body tags only', async () => {
        return await run(
          'html body { color: red; }',
          'html body { color: red; }', // keep as is
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
    })

    describe('Scope Hash Replacement', () => {
      it('should replace existing default scope hash (vanilla CSS) with custom scope hash', async () => {
        return await run(
          '.eufemia-scope--something .my-class { color: red; }',
          ':global(.custom-scope) .my-class { color: red; }',
          { runAsCssModule: true, scopeHash: 'custom-scope' }
        )
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

      it('should replace .eufemia-scope--default with given scope', async () => {
        return await run(
          ':global(.eufemia-scope--default) { --color: red; }',
          ':global(.custom-scope) { --color: red; }',
          { scopeHash: 'custom-scope' }
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

      it('should replace existing default scope hash (CSS Module) with custom scope hash given as function', async () => {
        const scopeHash = jest.fn(() => 'custom-scope')
        await run(
          ':global(.eufemia-scope--something) .my-class { color: red; }',
          ':global(.custom-scope) .my-class { color: red; }',
          { runAsCssModule: true, scopeHash }
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

      it('should not replace existing default scope hash with undefined scope hash returned from function', async () => {
        const scopeHash = jest.fn(() => undefined)
        await run(
          ':global(.eufemia-scope--something) .my-class { color: red; }',
          ':global(.eufemia-scope--something) .my-class { color: red; }',
          { scopeHash }
        )
        expect(scopeHash).toHaveBeenCalledWith('/file.css')
      })
    })

    describe('Preventing Duplicate Scopes', () => {
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
          { defaultScopeHash: 'x-' }
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

    describe('Special Selectors', () => {
      it('should scope :root selector by replacing it with the scope', async () => {
        return await run(
          ':root { --color: red; }',
          ':global(.test-scope) { --color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope attribute selectors', async () => {
        return await run(
          '[data-test] { color: red; }',
          ':global(.test-scope) [data-test] { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope selectors with multiple attributes', async () => {
        return await run(
          '[data-test][data-other] { color: red; }',
          ':global(.test-scope) [data-test][data-other] { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope pseudo-classes', async () => {
        return await run(
          '.button:hover { color: red; }',
          ':global(.test-scope) .button:hover { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope selectors with multiple pseudo-classes', async () => {
        return await run(
          '.button:hover:focus:active { color: red; }',
          ':global(.test-scope) .button:hover:focus:active { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope pseudo-elements', async () => {
        return await run(
          '.text::before { content: ""; }',
          ':global(.test-scope) .text::before { content: ""; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope a lone ::before selector', async () => {
        return await run(
          '::before { content: ""; }',
          ':global(.test-scope) ::before { content: ""; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope id selector', async () => {
        return await run(
          '#id-selector { color: red; }',
          ':global(.test-scope) #id-selector { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope tag selectors', async () => {
        return await run(
          'strong { color: red; }',
          ':global(.test-scope) strong { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope selectors with multiple classes', async () => {
        return await run(
          '.class1.class2.class3 { color: red; }',
          ':global(.test-scope) .class1.class2.class3 { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope selectors no matter what kind of node they are', async () => {
        return await run(
          '*.foo[data-foo]::marker > :nth-child(2) { color: red; }',
          ':global(.test-scope) *.foo[data-foo]::marker > :nth-child(2) { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should keep rule when selector Became empty inside :global', async () => {
        await run(
          ':global(.eufemia-scope--default) { color: red; }',
          ':global(.new-scope) { color: red; }',
          { runAsCssModule: true, scopeHash: 'new-scope' }
        )
      })

      it('preserves :global wrapper while replacing class', async () => {
        await run(
          ':global(.eufemia-scope--something) .selector { color:red; }',
          ':global(.custom) .selector { color:red; }',
          { runAsCssModule: true, scopeHash: 'custom' }
        )
      })

      it('should replace [scope-placeholder] with the actual scopeHash', async () => {
        await run(
          '[scope-placeholder] { color: red; }',
          ':global(.test-scope) { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should replace [scope-placeholder] including selectors with the actual scopeHash', async () => {
        await run(
          '.selector-before [scope-placeholder] .selector-after { color: red; }',
          '.selector-before :global(.test-scope) .selector-after { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })
    })

    describe('Class Name Replacement', () => {
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
    })

    describe('leading :global', () => {
      it('should wrap leading :global in a :global block', async () => {
        await run(
          ':global { color: red; }',
          ':global(.test-scope) { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should wrap entire selector chain in one :global(...) for selectors starting with :global', async () => {
        return await run(
          ':global .selector-a .selector-b { color: red; }',
          ':global(.test-scope) :global .selector-a .selector-b { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should replace top-level :global block with scoped block', async () => {
        return await run(
          ':global .selector { color: red; }',
          ':global(.test-scope) :global .selector { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope a top-level :global block even when a comment follows', async () => {
        return await run(
          ':global /* comment */ .selector { color: red; }',
          ':global(.test-scope) :global .selector { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should handle :root selector when inside :global', async () => {
        return await run(
          ':global :root { --color: red; }',
          ':global(.test-scope) { --color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should handle double :global', async () => {
        return await run(
          ':global(.selector) :global .selector { --color: red; }',
          ':global(.test-scope) :global(.selector) :global .selector { --color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })
    })

    describe('Skip global selectors in :global block', () => {
      it('removes :global wrapper for html selector', async () => {
        await run(
          ':global html { color: red; }',
          ':global html { color: red; }',
          {
            runAsCssModule: true,
            scopeHash: 'test-scope',
          }
        )
      })

      it('scopes class selector inside :global', async () => {
        await run(
          ':global .my-class { color: purple; }',
          ':global(.test-scope) :global .my-class { color: purple; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should not scope html inside :global', async () => {
        await run(
          ':global {\n  html { color: red; }\n}',
          ':global {\n  html { color: red; }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should not scope body inside :global', async () => {
        await run(
          ':global {\n  body { color: red; }\n}',
          ':global {\n  body { color: red; }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should not scope html body inside :global', async () => {
        await run(
          ':global {\n  html body { color: red; }\n}',
          ':global {\n  html body { color: red; }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should not scope html inside :global but scope the rest', async () => {
        await run(
          ':global {\n  html { color: red; }\n.selector { color: red; }\n}',
          ':global {\n  html { color: red; }\n:global(.test-scope) .selector { color: red; }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('scopes only .my-class in html body .my-class inside :global', async () => {
        await run(
          ':global {\n  html body .my-class { color: red; }\n}',
          ':global {\n  html body :global(.test-scope) .my-class { color: red; }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('scopes only .my-class in mixed :global block with html, body, and html body', async () => {
        await run(
          ':global {\n  html { color: red; }\n  body { color: red; }\n  html body { color: green; }\n  .my-class { color: purple; }\n}',
          ':global {\n  html { color: red; }\n  body { color: red; }\n  html body { color: green; }\n  :global(.test-scope) .my-class { color: purple; }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `body [data-test]` inside a :global block', async () => {
        await run(
          ':global {\n  body [data-test] {\n    color: red;\n  }\n}',
          ':global {\n  body :global(.test-scope) [data-test] {\n    color: red;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should not scope `html *` inside a :global block', async () => {
        await run(
          ':global {\n  html * {\n    color: red;\n  }\n}',
          ':global {\n  html * {\n    color: red;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `body *` inside a :global block', async () => {
        await run(
          ':global {\n  body * {\n    color: red;\n  }\n}',
          ':global {\n  body :global(.test-scope) * {\n    color: red;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `:global *` inside a :global block', async () => {
        await run(
          ':global {\n  * {\n    color: red;\n  }\n}',
          ':global {\n  :global(.test-scope) * {\n    color: red;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `:global [data-test]` inside a :global block', async () => {
        await run(
          ':global {\n  [data-test] {\n    color: red;\n  }\n}',
          ':global {\n  :global(.test-scope) [data-test] {\n    color: red;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `:global *` inside a :global block when combined with `body *`', async () => {
        await run(
          ':global {\n  body * {\n    color: red;\n  }\n * {\n    color: red;\n  }\n}',
          ':global {\n  body :global(.test-scope) * {\n    color: red;\n  }\n :global(.test-scope) * {\n    color: red;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `html body *` inside a :global block', async () => {
        await run(
          ':global {\n  html body * {\n    color: green;\n  }\n}',
          ':global {\n  html body :global(.test-scope) * {\n    color: green;\n  }\n}',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `body *` when flattened', async () => {
        return await run(
          ':global body * { color: red; }',
          ':global body :global(.test-scope) * { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `html body *` when flattened', async () => {
        return await run(
          ':global html body * { color: red; }',
          ':global html body :global(.test-scope) * { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should scope `body [data-test]` when flattened', async () => {
        return await run(
          ':global body [data-test] { color: red; }',
          ':global body :global(.test-scope) [data-test] { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })

      it('should not scope `html *` when flattened', async () => {
        return await run(
          ':global html * { color: red; }',
          ':global html * { color: red; }',
          { runAsCssModule: true, scopeHash: 'test-scope' }
        )
      })
    })
  })

  describe('sharedScopeHash', () => {
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

    it('should use default hash (eufemia-scope--default) when sharedScopeHash functions returns not an array', async () => {
      return await run(
        '.my-class { color: red; }',
        '.eufemia-scope--default .my-class { color: red; }',
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

    it('should not duplicate when sharedScopeHash returns []', async () => {
      await run('.foo { color: red; }', '.main .foo { color: red; }', {
        scopeHash: 'main',
        sharedScopeHash: () => [],
      })
    })

    it('should ignore non-array return from sharedScopeHash', async () => {
      await run('.foo { color: red; }', '.main .foo { color: red; }', {
        scopeHash: 'main',
        // @ts-expect-error - Testing that non-array return value is handled gracefully
        sharedScopeHash: () => 'not-an-array',
      })
    })
  })
})
