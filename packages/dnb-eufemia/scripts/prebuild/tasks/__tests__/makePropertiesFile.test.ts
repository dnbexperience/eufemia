import { convertVariablesToTailwindFormat } from '../tailwindTransform'

import {
  transformFigmaAlias,
  transformFigmaValue,
  transformFigmaKey,
  transformFigmaPath,
  transformNamespace,
} from '../makePropertiesFile'

describe('makePropertiesFile', () => {
  const global = {
    ui: null,
    sbanken: null,
    sbankenTokens: null,
    uiTokens: null,
    carnegieTokens: null,
    foundation: null,
  }

  beforeAll(async () => {
    const { execSync } = await import('child_process')
    execSync(
      'babel-node --extensions .js,.ts,.tsx ./scripts/prebuild/tasks/makePropertiesFile.ts',
      {
        cwd: process.cwd(),
        stdio: 'pipe',
      }
    )

    const fs = await import('fs')
    const path = await import('path')

    global.ui = fs.readFileSync(
      path.resolve('src/style/themes/ui/properties.js'),
      'utf-8'
    )
    global.sbanken = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/properties.js'),
      'utf-8'
    )

    global.sbankenTokens = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/tokens.scss'),
      'utf-8'
    )
    global.uiTokens = fs.readFileSync(
      path.resolve('src/style/themes/ui/tokens.scss'),
      'utf-8'
    )
    global.carnegieTokens = fs.readFileSync(
      path.resolve('src/style/themes/carnegie/tokens.scss'),
      'utf-8'
    )
    global.foundation = fs.readFileSync(
      path.resolve('src/style/themes/all-foundation.scss'),
      'utf-8'
    )
  })
  describe('Tokens snapshots for', () => {
    it('sbanken', () => {
      expect(global.sbankenTokens).toMatchSnapshot()
    })

    it('ui', () => {
      expect(global.uiTokens).toMatchSnapshot()
    })

    it('carnegie', () => {
      expect(global.carnegieTokens).toMatchSnapshot()
    })

    it('foundation', () => {
      expect(global.foundation).toMatchSnapshot()
    })
  })

  describe('Figma file generation', () => {
    describe('transformFigmaAlias', () => {
      it('generates css var', () => {
        const val = {
          targetVariableName: 'DNB/ColdGreen/600',
          targetVariableSetName: 'Colors',
        }

        const result = transformFigmaAlias(val)
        expect(result).toEqual('var(--dnb-coldgreen-600)')
      })

      it('error on unsupported variable set', () => {
        const val = {
          targetVariableName: 'DNB/ColdGreen/600',
          targetVariableSetName: 'Nonsense',
        }

        expect(() => transformFigmaAlias(val)).toThrow()
      })
    })

    describe('transformFigmaValue', () => {
      it('generates alias', () => {
        const val = {
          $type: 'color',
          $value: {
            alpha: 1,
            hex: '#007272',
          },
          $extensions: {
            'com.figma.aliasData': {
              targetVariableName: 'DNB/ColdGreen/600',
              targetVariableSetName: 'Colors',
            },
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('var(--dnb-coldgreen-600)')
      })

      it('generates color hex', () => {
        const val = {
          $type: 'color',
          $value: {
            alpha: 1,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('#007272')
      })

      it('rounds color alpha', () => {
        const val = {
          $type: 'color',
          $value: {
            alpha: 0.47999998927116394,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('rgba(#007272, 0.48)')
      })

      it('rounds alpha to 6 decimals', () => {
        const val = {
          $type: 'color',
          $value: {
            alpha: 0.0123456,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('rgba(#007272, 0.012346)')
      })

      it('removes trailing zeroes in alpha', () => {
        const val = {
          $type: 'color',
          $value: {
            alpha: 0.06250001,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('rgba(#007272, 0.0625)')
      })

      it('throw error on unknown type', () => {
        const val = {
          $type: 'nonsense',
          $value: 'Medium',
        }

        expect(() => transformFigmaValue(val)).toThrow()
      })

      it('skip string and number', () => {
        expect(
          transformFigmaValue({
            $type: 'string',
            $value: 'Medium',
          })
        ).toBeUndefined()

        expect(
          transformFigmaValue({
            $type: 'number',
            $value: 42,
          })
        ).toBeUndefined()
      })
    })

    describe('transformFigmaKey', () => {
      it('runs callback on each unsupported character', () => {
        const callback = jest.fn()

        const result = transformFigmaKey(
          'Font Size (Medium) onDark',
          callback
        )
        expect(callback).toHaveBeenCalledTimes(5)

        expect(callback).toHaveBeenNthCalledWith(1, ' ')
        expect(callback).toHaveBeenNthCalledWith(2, ' ')
        expect(callback).toHaveBeenNthCalledWith(3, '(')
        expect(callback).toHaveBeenNthCalledWith(4, ')')
        expect(callback).toHaveBeenNthCalledWith(5, ' ')
        expect(result).toEqual('font size (medium) ondark')
      })
    })

    describe('transformFigmaPath', () => {
      it('transforms normally', () => {
        const result = transformFigmaPath(['Colors', 'Primary', 'Dark'])
        expect(result).toEqual('colors-primary-dark')
      })

      it('error on unsupported characters', () => {
        let err
        try {
          transformFigmaPath(['Colo*rs', 'Prima?ry', 'Da(rk'])
        } catch (e) {
          err = e
        }
        expect(err.message).toEqual(
          'Unsupported characters "*", "?", "(" in variable: "Colo*rs/Prima?ry/Da(rk"'
        )
      })
    })

    describe('transformNamespace', () => {
      it('transforms normally', () => {
        const result = transformNamespace('token')
        expect(result).toEqual('--token-')
      })

      it('transforms undefined', () => {
        const result = transformNamespace(undefined)
        expect(result).toEqual('--')
      })
    })
  })

  describe('Properties for ui', () => {
    it('has to validate', () => {
      expect(global.ui).toMatchSnapshot()
      expect(global.ui).toContain(`'--font-size-large': '1.625rem'`)
      expect(global.ui).toContain(
        `'--font-family-default': "'DNB', sans-serif"`
      )
    })
  })

  describe('Properties for sbanken', () => {
    it('has to validate', () => {
      expect(global.sbanken).toMatchSnapshot()
      expect(global.sbanken).toContain(
        `'--sb-font-family-default': "'Roboto', 'Helvetica', 'Arial', sans-serif"`
      )
      expect(global.sbanken).toContain(
        `'--font-family-default': 'var(--sb-font-family-default)'`
      )
    })
  })

  describe('convertVariablesToTailwindFormat Function', () => {
    it('should convert --sb-* variables to --*-sb-* format', () => {
      const input = {
        '--sb-color-black': '#000',
        '--sb-font-size-small': '0.875rem',
        '--sb-line-height-medium': '2rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-sb-black': '#000',
        '--text-sb-small': '0.875rem',
        '--leading-sb-medium': '2rem',
      })
    })

    it('should handle var() references correctly', () => {
      const input = {
        '--font-size-lead': 'var(--sb-font-size-medium)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--text-lead': 'var(--text-sb-medium)',
      })
    })

    it('should preserve non-sb variables unchanged', () => {
      const input = {
        '--color-white': '#fff',
        '--font-size-large': '2rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-white': '#fff',
        '--text-large': '2rem',
      })
    })
  })

  describe('Tailwind CSS Properties Generation', () => {
    let uiTailwindResult, sbankenTailwindResult, eiendomTailwindResult

    beforeAll(async () => {
      // Generate the Tailwind CSS files by running the actual make-properties script
      // This will create the properties-tailwind.css files
      const { execSync } = await import('child_process')
      execSync(
        'babel-node --extensions .js,.ts,.tsx ./scripts/prebuild/tasks/makePropertiesFile.ts',
        {
          cwd: process.cwd(),
          stdio: 'pipe',
        }
      )

      // Read the generated files
      const fs = await import('fs')
      const path = await import('path')

      uiTailwindResult = fs.readFileSync(
        path.resolve('src/style/themes/ui/properties-tailwind.css'),
        'utf-8'
      )
      sbankenTailwindResult = fs.readFileSync(
        path.resolve('src/style/themes/sbanken/properties-tailwind.css'),
        'utf-8'
      )
      eiendomTailwindResult = fs.readFileSync(
        path.resolve('src/style/themes/eiendom/properties-tailwind.css'),
        'utf-8'
      )
    })

    describe('CSS File Structure', () => {
      it('should contain proper CSS file header', () => {
        expect(uiTailwindResult).toContain(
          '/* This file is auto generated by makePropertiesFile.ts */'
        )
        expect(uiTailwindResult).toContain(
          '/* stylelint-disable-next-line scss/at-rule-no-unknown */'
        )
        expect(uiTailwindResult).toContain('@theme {')
      })

      it('should have proper CSS formatting', () => {
        expect(uiTailwindResult).toMatch(/}\s*$/)
      })
    })

    describe('Variable Transformation', () => {
      it('should convert --sb-* variables to --*-sb-* format', () => {
        expect(sbankenTailwindResult).toContain(
          '--color-sb-purple: #1c1b4e;'
        )
        expect(sbankenTailwindResult).toContain(
          '--text-sb-small: 0.875rem;'
        )
        expect(sbankenTailwindResult).toContain(
          '--leading-sb-medium: 2rem;'
        )
      })

      it('should convert base variables to Tailwind namespaces', () => {
        expect(uiTailwindResult).toContain('--text-small: 1rem;')
        expect(uiTailwindResult).toContain('--leading-basis: 1.5rem;')
        expect(uiTailwindResult).toContain('--breakpoint-small: 40em;')
      })
    })

    describe('Theme-Specific Content', () => {
      it('should contain theme-ui specific variables', () => {
        expect(uiTailwindResult).toContain(
          "--font-default: 'DNB', sans-serif;"
        )
        expect(uiTailwindResult).toContain('--color-black: #000;')
      })

      it('should contain theme-sbanken specific variables', () => {
        expect(sbankenTailwindResult).toContain(
          '--font-default: var(--font-sb-default);'
        )
        expect(sbankenTailwindResult).toContain(
          '--color-sb-purple: #1c1b4e;'
        )
      })

      it('should contain theme-eiendom specific variables', () => {
        expect(eiendomTailwindResult).toContain(
          "--font-default: 'DNB', sans-serif;"
        )
        expect(eiendomTailwindResult).toContain('--color-black: #000;')
      })
    })

    describe('No --sb- Prefix Remaining', () => {
      it('should not contain any --sb- variables in the generated CSS', () => {
        expect(uiTailwindResult).not.toMatch(/--sb-[a-zA-Z-]+:/)
        expect(sbankenTailwindResult).not.toMatch(/--sb-[a-zA-Z-]+:/)
        expect(eiendomTailwindResult).not.toMatch(/--sb-[a-zA-Z-]+:/)
      })

      it('should not contain any var(--sb-*) references', () => {
        expect(uiTailwindResult).not.toMatch(/var\(--sb-[a-zA-Z-]+\)/)
        expect(sbankenTailwindResult).not.toMatch(/var\(--sb-[a-zA-Z-]+\)/)
        expect(eiendomTailwindResult).not.toMatch(/var\(--sb-[a-zA-Z-]+\)/)
      })
    })
  })
})
