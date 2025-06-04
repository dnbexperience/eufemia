/* eslint-disable jest/expect-expect */

import postcss from 'postcss'
import plugin from '../postcss-plugin-style-scope'

type Options = {
  scopeHash?: string
  skipClassNames?: string[]
  runAsCssModule?: boolean
  verbose?: boolean
  replaceClassNames?: Record<string, string>
}

function run(input, output, options: Options = {}) {
  options.scopeHash = options.scopeHash ?? 'eufemia-scope'
  return postcss([plugin(options)])
    .process(input, { from: undefined })
    .then((result) => {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
    })
}

describe('postcss-plugin-style-scope', () => {
  it('should add scope class to simple selectors', () => {
    return run(
      '.my-class { color: red; }',
      '.eufemia-scope .my-class { color: red; }'
    )
  })

  it('should handle multiple selectors', () => {
    return run(
      '.class1, .class2 { color: red; }',
      '.eufemia-scope .class1, .eufemia-scope .class2 { color: red; }'
    )
  })

  it('should handle nested selectors', () => {
    return run(
      '.parent .child { color: red; }',
      '.eufemia-scope .parent .child { color: red; }'
    )
  })

  it('should handle :root selector', () => {
    return run(
      ':root { --color: red; }',
      '.eufemia-scope { --color: red; }'
    )
  })

  it('should handle attribute selectors', () => {
    return run(
      '[data-test] { color: red; }',
      '.eufemia-scope [data-test] { color: red; }'
    )
  })

  it('should handle pseudo-classes', () => {
    return run(
      '.button:hover { color: red; }',
      '.eufemia-scope .button:hover { color: red; }'
    )
  })

  it('should handle pseudo-elements', () => {
    return run(
      '.text::before { content: ""; }',
      '.eufemia-scope .text::before { content: ""; }'
    )
  })

  it('should skip keyframes rules', () => {
    return run(
      '@keyframes spin { 0% { transform: rotate(0deg); } }',
      '@keyframes spin { 0% { transform: rotate(0deg); } }'
    )
  })

  it('should skip specified class names', () => {
    return run(
      '.dnb-core-style { color: red; }',
      '.dnb-core-style { color: red; }',
      { skipClassNames: ['dnb-core-style'] }
    )
  })

  it('should handle complex selectors with multiple combinators', () => {
    return run(
      '.parent > .child + .sibling ~ .cousin { color: red; }',
      '.eufemia-scope .parent > .child + .sibling ~ .cousin { color: red; }'
    )
  })

  it('should handle selectors with multiple attributes', () => {
    return run(
      '[data-test][data-other] { color: red; }',
      '.eufemia-scope [data-test][data-other] { color: red; }'
    )
  })

  it('should handle custom scope class', () => {
    return run(
      '.my-class { color: red; }',
      '.custom-scope .my-class { color: red; }',
      { scopeHash: 'custom-scope' }
    )
  })

  it('should handle multiple skip class names', () => {
    return run(
      '.skip1, .skip2, .normal { color: red; }',
      '.skip1, .skip2, .eufemia-scope .normal { color: red; }',
      { skipClassNames: ['skip1', 'skip2'] }
    )
  })

  it('should handle selectors with multiple pseudo-classes', () => {
    return run(
      '.button:hover:focus:active { color: red; }',
      '.eufemia-scope .button:hover:focus:active { color: red; }'
    )
  })

  it('should handle selectors with multiple classes', () => {
    return run(
      '.class1.class2.class3 { color: red; }',
      '.eufemia-scope .class1.class2.class3 { color: red; }'
    )
  })

  it('should handle html tag only', () => {
    return run('html { color: red; }', 'html { color: red; }')
  })

  it('should handle html and body tags only', () => {
    return run('html body { margin: 0; }', 'html body { margin: 0; }')
  })

  it('should handle html and body tag', () => {
    return run(
      'html body .module-class { color: red; }',
      'html body .eufemia-scope .module-class { color: red; }'
    )
  })

  it('should handle id selector', () => {
    return run(
      '#id-selector { color: red; }',
      '.eufemia-scope #id-selector { color: red; }'
    )
  })

  it('should handle tag selector', () => {
    return run(
      'strong { color: red; }',
      '.eufemia-scope strong { color: red; }'
    )
  })

  it('should not scope when selector starts with ":not(#isolated) "', () => {
    return run(
      ':not(#isolated) #id-selector { color: red; }',
      '#id-selector { color: red; }'
    )
  })

  it('should scope when selector starts with :not(#isolated)*', () => {
    return run(
      ':not(#isolated)-something #id-selector { color: red; }',
      '.eufemia-scope :not(#isolated)-something #id-selector { color: red; }'
    )
  })

  it('should not add scope class twice', () => {
    return run(
      '.eufemia-scope .my-class { color: red; }',
      '.eufemia-scope .my-class { color: red; }'
    )
  })

  it('should not add scope class twice when nested', () => {
    return run(
      'html .eufemia-scope .my-class { color: red; }',
      'html .eufemia-scope .my-class { color: red; }'
    )
  })

  it('should not add scope class when ignored', () => {
    return run(
      'html .existing-scope .my-class { color: red; }',
      'html .existing-scope .my-class { color: red; }',
      {
        scopeHash: 'ski-this-scope',
        skipClassNames: ['existing-scope'],
      }
    )
  })

  describe('CSS Modules', () => {
    it('should handle html tag', () => {
      return run(
        'html .module-class { color: red; }',
        'html :global(.eufemia-scope) .module-class { color: red; }',
        { runAsCssModule: true }
      )
    })

    it('should handle body tag', () => {
      return run(
        'body .module-class { color: red; }',
        'body :global(.eufemia-scope) .module-class { color: red; }',
        { runAsCssModule: true }
      )
    })

    it('should handle html tag only', () => {
      return run('html { color: red; }', 'html { color: red; }', {
        runAsCssModule: true,
      })
    })

    it('should handle html and body tags only', () => {
      return run('html body { margin: 0; }', 'html body { margin: 0; }', {
        runAsCssModule: true,
      })
    })

    it('should handle html and body tag', () => {
      return run(
        'html body .module-class { color: red; }',
        'html body :global(.eufemia-scope) .module-class { color: red; }',
        { runAsCssModule: true }
      )
    })

    it('should handle class selector', () => {
      return run(
        '.module-class { color: red; }',
        ':global(.eufemia-scope) .module-class { color: red; }',
        { runAsCssModule: true }
      )
    })

    it('should handle id selector', () => {
      return run(
        '#id-selector { color: red; }',
        ':global(.eufemia-scope) #id-selector { color: red; }',
        { runAsCssModule: true }
      )
    })

    it('should handle tag selector', () => {
      return run(
        'strong { color: red; }',
        ':global(.eufemia-scope) strong { color: red; }',
        { runAsCssModule: true }
      )
    })

    it('should not add scope class twice', () => {
      return run(
        ':global(.eufemia-scope) .module-class { color: red; }',
        ':global(.eufemia-scope) .module-class { color: red; }'
      )
    })

    it('should not add scope class twice when nested', () => {
      return run(
        'html :global(.eufemia-scope) .module-class { color: red; }',
        'html :global(.eufemia-scope) .module-class { color: red; }'
      )
    })

    it('should not add scope class when ignored', () => {
      return run(
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
    it('should replace a single class name', () => {
      return run(
        '.old-class { color: red; }',
        '.eufemia-scope .new-class { color: red; }',
        { replaceClassNames: { 'old-class': 'new-class' } }
      )
    })

    it('should replace multiple class names', () => {
      return run(
        '.old-class1, .old-class2 { color: red; }',
        '.eufemia-scope .new-class1, .eufemia-scope .new-class2 { color: red; }',
        {
          replaceClassNames: {
            'old-class1': 'new-class1',
            'old-class2': 'new-class2',
          },
        }
      )
    })

    it('should replace class names in complex selectors', () => {
      return run(
        '.parent .old-class:hover { color: red; }',
        '.eufemia-scope .parent .new-class:hover { color: red; }',
        { replaceClassNames: { 'old-class': 'new-class' } }
      )
    })

    it('should replace class names with CSS Modules', () => {
      return run(
        '.old-class { color: red; }',
        ':global(.eufemia-scope) .new-class { color: red; }',
        {
          replaceClassNames: { 'old-class': 'new-class' },
          runAsCssModule: true,
        }
      )
    })

    it('should not replace skipped class names', () => {
      return run(
        '.old-class, .skip-class { color: red; }',
        '.eufemia-scope .new-class, .skip-class { color: red; }',
        {
          replaceClassNames: { 'old-class': 'new-class' },
          skipClassNames: ['skip-class'],
        }
      )
    })

    it('should handle multiple class names in a single selector', () => {
      return run(
        '.old-class1.old-class2 { color: red; }',
        '.eufemia-scope .new-class1.new-class2 { color: red; }',
        {
          replaceClassNames: {
            'old-class1': 'new-class1',
            'old-class2': 'new-class2',
          },
        }
      )
    })
  })
})
