import makePropertiesFile, {
  extractReferencedCssVariables,
  transformFigmaAlias,
  transformFigmaValue,
  transformFigmaPath,
  transformNamespace,
  generateCSSVariablesFromTokenList,
  convertToTokenList,
  generateColorMixFallback,
  overrideFoundationReferencePrefix,
} from '../makePropertiesFile'

const colorsVariableSetId =
  'VariableCollectionId:e5cc40ef8bbcdb0b7df7793463523846b0a81d09/5552:1080'
const sizesVariableSetId =
  'VariableCollectionId:fdb352a465b863aaf7567ea04748cb7e057d7b63/5552:1025'
const typographyVariableSetId =
  'VariableCollectionId:d00e91884fb9b3877858490e6b8fd6fcb0c60111/5552:1045'

describe('makePropertiesFile', () => {
  const global = {
    ui: null,
    sbanken: null,
    carnegie: null,
    uiTokens: null,
    uiTokensDark: null,
    sbankenTokens: null,
    sbankenTokensDark: null,
    carnegieTokens: null,
    uiFoundation: null,
    sbankenFoundation: null,
    carnegieFoundation: null,
    uiTokensTailwind: null,
    uiTokensDarkTailwind: null,
    sbankenTokensTailwind: null,
    sbankenTokensDarkTailwind: null,
    carnegieTokensTailwind: null,
  }

  beforeAll(async () => {
    await makePropertiesFile()

    const fs = await import('fs')
    const path = await import('path')

    global.ui = fs.readFileSync(
      path.resolve('src/style/themes/ui/properties.ts'),
      'utf-8'
    )
    global.sbanken = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/properties.ts'),
      'utf-8'
    )
    global.carnegie = fs.readFileSync(
      path.resolve('src/style/themes/carnegie/properties.ts'),
      'utf-8'
    )

    global.uiTokens = fs.readFileSync(
      path.resolve('src/style/themes/ui/tokens.scss'),
      'utf-8'
    )
    global.uiTokensDark = fs.readFileSync(
      path.resolve('src/style/themes/ui/tokens-dark.scss'),
      'utf-8'
    )
    global.uiFoundation = fs.readFileSync(
      path.resolve('src/style/themes/ui/foundation.scss'),
      'utf-8'
    )
    global.sbankenTokens = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/tokens.scss'),
      'utf-8'
    )
    global.sbankenTokensDark = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/tokens-dark.scss'),
      'utf-8'
    )
    global.sbankenFoundation = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/foundation.scss'),
      'utf-8'
    )
    global.carnegieTokens = fs.readFileSync(
      path.resolve('src/style/themes/carnegie/tokens.scss'),
      'utf-8'
    )
    global.carnegieFoundation = fs.readFileSync(
      path.resolve('src/style/themes/carnegie/foundation.scss'),
      'utf-8'
    )

    global.uiTokensTailwind = fs.readFileSync(
      path.resolve('src/style/themes/ui/tokens-tailwind.css'),
      'utf-8'
    )
    global.uiTokensDarkTailwind = fs.readFileSync(
      path.resolve('src/style/themes/ui/tokens-dark-tailwind.css'),
      'utf-8'
    )
    global.sbankenTokensTailwind = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/tokens-tailwind.css'),
      'utf-8'
    )
    global.sbankenTokensDarkTailwind = fs.readFileSync(
      path.resolve('src/style/themes/sbanken/tokens-dark-tailwind.css'),
      'utf-8'
    )
    global.carnegieTokensTailwind = fs.readFileSync(
      path.resolve('src/style/themes/carnegie/tokens-tailwind.css'),
      'utf-8'
    )
  })
  describe('Tokens snapshots for', () => {
    it('ui', () => {
      expect(global.uiTokens).toMatchSnapshot()
      expect(global.uiTokensDark).toMatchSnapshot()
      expect(global.uiFoundation).toMatchSnapshot()
    })

    it('sbanken', () => {
      expect(global.sbankenTokens).toMatchSnapshot()
      expect(global.sbankenTokensDark).toMatchSnapshot()
      expect(global.sbankenFoundation).toMatchSnapshot()
    })

    it('carnegie', () => {
      expect(global.carnegieTokens).toMatchSnapshot()
      expect(global.carnegieFoundation).toMatchSnapshot()
    })

    it('uses the Carnegie radius tokens', () => {
      expect(global.carnegieTokens).toContain('--token-radius-xl: 0.5rem;')
      expect(global.carnegieTokensTailwind).toContain(
        '--radius-xl: 0.5rem;'
      )
    })

    it('generates brand typography values for every available mode', () => {
      for (const tokens of [
        global.uiTokens,
        global.uiTokensDark,
        global.sbankenTokens,
        global.sbankenTokensDark,
      ]) {
        expect(tokens).toContain('--token-font-size-heading-2xl: 3rem;')
        expect(tokens).toContain(
          '--token-font-height-heading-2xl: 3.5rem;'
        )
        expect(tokens).toContain('--token-font-size-text-2xs: 0.8125rem;')
      }

      expect(global.carnegieTokens).toContain(
        '--token-font-size-heading-2xl: 3.5rem;'
      )
      expect(global.carnegieTokens).toContain(
        '--token-font-height-heading-2xl: 4.25rem;'
      )
      expect(global.carnegieTokensTailwind).toContain(
        '--font-size-heading-2xl: 3.5rem;'
      )
    })

    it('keeps medium text sizes and heights aligned with the regular scale', async () => {
      // The typography API combines size and weight independently.
      const fs = await import('fs')
      const path = await import('path')
      const modes = [
        'dnb-light',
        'dnb-dark',
        'sbanken-light',
        'sbanken-dark',
        'dnbcarnegie-light',
      ]

      for (const mode of modes) {
        const { font } = JSON.parse(
          fs.readFileSync(
            path.resolve(
              'src/style/themes/figma/brand/' + mode + '.tokens.json'
            ),
            'utf-8'
          )
        )

        for (const size of [
          'text-basis',
          'text-sm',
          'text-xs',
          'text-2xs',
        ]) {
          expect(font.size[size + '-medium'].$value).toBe(
            font.size[size].$value
          )
        }
        for (const size of ['text-basis', 'text-sm', 'text-xs']) {
          expect(font.height[size + '-medium'].$value).toBe(
            font.height[size].$value
          )
        }
      }
    })

    it('generates public typography properties at the root for each brand', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const read = (theme: string, mode = '') =>
        fs.readFileSync(
          path.resolve(
            'src/style/themes/' +
              theme +
              '/typography-properties' +
              mode +
              '.scss'
          ),
          'utf-8'
        )

      expect(read('ui')).toContain('--font-size-xx-large: 3rem;')
      expect(read('ui', '-dark')).toContain(
        '--line-height-xx-large: 3.5rem;'
      )
      expect(read('sbanken')).toContain('--font-size-xx-large: 3rem;')
      expect(read('sbanken', '-dark')).toContain(
        '--line-height-xx-large: 3.5rem;'
      )
      expect(read('carnegie')).toContain('--font-size-xx-large: 3.5rem;')
      expect(read('carnegie')).toContain(
        '--line-height-xx-large: 4.25rem;'
      )
      expect(read('carnegie')).toContain(
        '.eufemia-theme__carnegie.eufemia-theme__color-scheme--light'
      )
      expect(global.carnegieTokens).toContain(
        '.eufemia-theme__carnegie.eufemia-theme__color-scheme--light'
      )
      expect(read('ui')).toContain(
        '.eufemia-theme__eiendom.eufemia-theme__color-scheme--light'
      )
      expect(global.uiTokens).toContain(
        '.eufemia-theme__eiendom.eufemia-theme__color-scheme--light'
      )
    })

    it('keeps Carnegie typography values last in the compiled root cascade', async () => {
      const sass = await import('sass')
      const path = await import('path')
      const css = sass.compile(
        path.resolve('src/style/themes/carnegie/carnegie-theme-basis.scss')
      ).css
      const values = Array.from(css.matchAll(/([^{}]+)\{([^{}]*)\}/g))
        .filter(([, selector]) => selector.includes(':root'))
        .map(
          ([, , declarations]) =>
            declarations.match(/--font-size-xx-large:\s*([^;]+);/)?.[1]
        )
        .filter(Boolean)

      expect(values.at(-1)).toBe('3.5rem')
    })

    it('pairs responsive xx-large headings with their line-height scale', async () => {
      const sass = await import('sass')
      const path = await import('path')
      const css = sass.compile(
        path.resolve('src/style/themes/carnegie/carnegie-theme-basis.scss')
      ).css
      const lineHeights = Array.from(
        css.matchAll(
          /--responsive-line-height-xx-large:\s*var\((--line-height-[^)]+)\)/g
        )
      ).map(([, value]) => value)

      expect(lineHeights).toEqual([
        '--line-height-x-large',
        '--line-height-xx-large',
        '--line-height-xx-large',
      ])
    })

    it('includes public typography values in the Eiendom dark stylesheet', async () => {
      const sass = await import('sass')
      const path = await import('path')
      const css = sass.compile(
        path.resolve(
          'src/style/themes/eiendom/eiendom-theme-dark-mode.scss'
        )
      ).css

      expect(css).toContain('--font-size-xx-large: 3rem;')
    })
  })

  describe('Native color scheme', () => {
    it('sets light color scheme for light tokens', () => {
      for (const tokens of [
        global.uiTokens,
        global.sbankenTokens,
        global.carnegieTokens,
        global.uiTokensTailwind,
        global.sbankenTokensTailwind,
        global.carnegieTokensTailwind,
      ]) {
        expect(tokens).toContain('color-scheme: light;')
      }
    })

    it('sets dark color scheme for dark tokens', () => {
      for (const tokens of [
        global.uiTokensDark,
        global.sbankenTokensDark,
        global.uiTokensDarkTailwind,
        global.sbankenTokensDarkTailwind,
      ]) {
        expect(tokens).toContain('color-scheme: dark;')
      }
    })
  })

  describe('Tokens Tailwind CSS Generation', () => {
    describe('CSS File Structure', () => {
      it('should contain proper CSS file header', () => {
        expect(global.uiTokensTailwind).toContain(
          '/* This file is auto generated by makePropertiesFile.ts */'
        )
        expect(global.uiTokensTailwind).toContain(
          '/* stylelint-disable-next-line scss/at-rule-no-unknown */'
        )
        expect(global.uiTokensTailwind).toContain('@theme {')
      })

      it('should have proper CSS formatting', () => {
        expect(global.uiTokensTailwind).toMatch(/}\s*$/)
      })
    })

    describe('Variable Transformation', () => {
      it('should strip --token- prefix from variable names', () => {
        expect(global.uiTokensTailwind).toContain(
          '--color-background-action:'
        )
        expect(global.uiTokensTailwind).toContain('--color-text-neutral:')
        expect(global.uiTokensTailwind).not.toMatch(
          /--token-color-[a-zA-Z-]+:/
        )
      })

      it('should preserve var() references to foundation variables', () => {
        expect(global.uiTokensTailwind).toContain('var(--dnb-')
      })
    })

    describe('Theme-Specific Content', () => {
      it('should generate tokens-tailwind.css for all themes', () => {
        expect(global.uiTokensTailwind).toBeTruthy()
        expect(global.sbankenTokensTailwind).toBeTruthy()
        expect(global.carnegieTokensTailwind).toBeTruthy()
      })

      it('should contain semantic color tokens', () => {
        for (const tailwind of [
          global.uiTokensTailwind,
          global.sbankenTokensTailwind,
          global.carnegieTokensTailwind,
        ]) {
          expect(tailwind).toContain('--color-background-')
          expect(tailwind).toContain('--color-text-')
          expect(tailwind).toContain('--color-stroke-')
        }
      })
    })

    describe('@theme block', () => {
      it('should place token declarations inside @theme', () => {
        const themeMatch = global.uiTokensTailwind.match(
          /@theme\s*\{([\s\S]*?)\n\}/
        )
        expect(themeMatch).toBeTruthy()
        const themeBlock = themeMatch[1]
        expect(themeBlock).toContain('--color-background-action:')
        expect(themeBlock).toContain('--color-text-neutral:')
        expect(themeBlock).toContain('--color-stroke-action:')
        expect(themeBlock).toContain('--radius-md:')
      })

      it('should place the light color scheme outside @theme', () => {
        const themeMatch = global.uiTokensTailwind.match(
          /@theme\s*\{([\s\S]*?)\n\}/
        )
        expect(themeMatch[1]).not.toContain('color-scheme:')
        expect(global.uiTokensTailwind).toContain(
          '.eufemia-theme__color-scheme--light'
        )
        expect(global.uiTokensTailwind).toContain('color-scheme: light;')
      })

      it('should not emit @theme for dark-mode tailwind files', () => {
        expect(global.uiTokensDarkTailwind).not.toContain('@theme')
        expect(global.sbankenTokensDarkTailwind).not.toContain('@theme')
      })

      it('should place dark-mode tokens under the scoped selector', () => {
        expect(global.uiTokensDarkTailwind).toContain(
          '.eufemia-theme__color-scheme--dark'
        )
        expect(global.uiTokensDarkTailwind).toContain(
          '--color-background-action:'
        )
      })
    })
  })

  describe('Figma file generation', () => {
    describe('generateCSSVariablesFromTokenList', () => {
      it('skip string', () => {
        expect(
          generateCSSVariablesFromTokenList([
            {
              figmaPath: ['bad'],
              figmaSetId: colorsVariableSetId,
              $type: 'string',
              $value: 'Medium',
            },
            {
              figmaPath: ['good'],
              figmaSetId: colorsVariableSetId,
              $type: 'number',
              $value: 2,
            },
          ])
        ).toEqual(`--good: 0.125rem;\n`)
      })
    })

    describe('convertToTokenList', () => {
      it('throws when an expected collection is missing', () => {
        expect(() =>
          convertToTokenList({ dnb: undefined }, colorsVariableSetId)
        ).toThrow('Invalid Figma token node at "dnb": expected an object')
      })

      it('throws when an export contains no tokens', () => {
        expect(() => convertToTokenList({}, colorsVariableSetId)).toThrow(
          'Invalid Figma export: no tokens found'
        )
      })
    })

    describe('overrideFoundationReferencePrefix', () => {
      it('overrides every foundation reference in a declaration', () => {
        expect(
          overrideFoundationReferencePrefix(
            '--token-gradient: linear-gradient(var(--dnb-white), var(--sbanken-purple));',
            'carnegie'
          )
        ).toBe(
          '--token-gradient: linear-gradient(var(--carnegie-white), var(--carnegie-purple));'
        )
      })
    })

    describe('extractReferencedCssVariables', () => {
      it('extracts css variables from var() usage', () => {
        const result = extractReferencedCssVariables(`
          --token-color-primary: var(--dnb-coldgreen-600);
          --token-color-secondary: var(--dnb-greyscale-100);
          --token-color-tertiary: var( --dnb-green-700 );
        `)

        expect(Array.from(result)).toEqual([
          '--dnb-coldgreen-600',
          '--dnb-greyscale-100',
          '--dnb-green-700',
        ])
      })
    })

    describe('transformFigmaAlias', () => {
      it('generates css var', () => {
        const val = {
          targetVariableName: 'dnb/ColdGreen/600',
          targetVariableSetId: colorsVariableSetId,
          targetVariableSetName: 'colors',
        }

        const result = transformFigmaAlias(val)
        expect(result).toEqual('var(--dnb-coldgreen-600)')
      })

      it('transforms the renamed Carnegie prefix', () => {
        const result = transformFigmaAlias({
          targetVariableName: 'dnb-carnegie/greyscale/0',
          targetVariableSetId: colorsVariableSetId,
          targetVariableSetName: 'colors',
        })
        expect(result).toEqual('var(--carnegie-greyscale-0)')
      })

      it('transforms prefix', () => {
        const val = {
          targetVariableName: 'dnbcarnegie/ColdGreen/600',
          targetVariableSetId: colorsVariableSetId,
          targetVariableSetName: 'colors',
        }

        const result = transformFigmaAlias(val)
        expect(result).toEqual('var(--carnegie-coldgreen-600)')
      })

      it('throws an error for an unsupported variable set', () => {
        const val = {
          targetVariableName: 'dnb/ColdGreen/600',
          targetVariableSetId: 'VariableCollectionId:nonsense/5552:1080',
          targetVariableSetName: 'nonsense',
        }

        expect(() => transformFigmaAlias(val)).toThrow()
      })

      it('resolves size alias to literal value', () => {
        const alias = {
          targetVariableName: 'size/4',
          targetVariableSetId: sizesVariableSetId,
          targetVariableSetName: 'size',
        }

        const value = {
          $type: 'number' as const,
          $value: 4,
          $extensions: { ['com.figma.aliasData']: alias },
        }

        const result = transformFigmaValue(value)
        expect(result).toEqual('0.25rem')
      })

      it('resolves size alias with zero value', () => {
        const alias = {
          targetVariableName: 'size/0',
          targetVariableSetId: sizesVariableSetId,
          targetVariableSetName: 'size',
        }

        const value = {
          $type: 'number' as const,
          $value: 0,
          $extensions: { ['com.figma.aliasData']: alias },
        }

        const result = transformFigmaValue(value)
        expect(result).toEqual('0')
      })

      it('resolves numeric typography aliases to rem values', () => {
        expect(
          transformFigmaValue({
            $type: 'number',
            $value: 48,
            $extensions: {
              'com.figma.aliasData': {
                targetVariableName: 'Font/Size/48',
                targetVariableSetId: typographyVariableSetId,
                targetVariableSetName: 'typography',
              },
            },
          })
        ).toBe('3rem')
      })

      it('error on unsupported theme prefix set', () => {
        const val = {
          targetVariableName: 'nonsense/ColdGreen/600',
          targetVariableSetId: colorsVariableSetId,
          targetVariableSetName: 'colors',
        }

        expect(() => transformFigmaAlias(val)).toThrow()
      })
    })

    describe('transformFigmaValue', () => {
      const composedColor = {
        $type: 'color' as const,
        $value: {
          alpha: 0.30000001192092896,
          hex: '#000000',
        },
        $extensions: {
          'com.figma.composedColor': {
            colorArg: {
              type: 'alias' as const,
              alias: {
                targetVariableName: 'dnb/greyscale/1000',
                targetVariableSetId: colorsVariableSetId,
                targetVariableSetName: 'colors',
              },
            },
            opacityArg: { type: 'number' as const, value: 30 },
          },
        },
      }

      it('generates alias', () => {
        const val = {
          $type: 'color' as const,
          $value: {
            alpha: 1,
            hex: '#007272',
          },
          $extensions: {
            'com.figma.aliasData': {
              targetVariableName: 'dnb/ColdGreen/600',
              targetVariableSetId: colorsVariableSetId,
              targetVariableSetName: 'colors',
            },
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('var(--dnb-coldgreen-600)')
      })

      it('references the color of a composed color with its opacity', () => {
        expect(transformFigmaValue(composedColor)).toEqual(
          'color-mix(in srgb, var(--dnb-greyscale-1000) 30%, transparent)'
        )
      })

      it('adds a literal fallback for browsers without color-mix()', () => {
        expect(
          generateColorMixFallback(
            [
              {
                figmaPath: ['color', 'component', 'dimmer', 'background'],
                figmaSetId: colorsVariableSetId,
                ...composedColor,
              },
              {
                figmaPath: ['color', 'background', 'page'],
                figmaSetId: colorsVariableSetId,
                $type: 'color',
                $value: { alpha: 1, hex: '#FFFFFF' },
              },
            ],
            ':root',
            'token'
          )
        ).toEqual(
          '@supports not (color: color-mix(in srgb, red, red)) {\n' +
            ':root {\n' +
            '--token-color-component-dimmer-background: rgba(0 0 0 / 30%);\n' +
            '}\n}\n'
        )
      })

      it('adds no fallback without composed colors', () => {
        expect(
          generateColorMixFallback(
            [
              {
                figmaPath: ['color', 'background', 'page'],
                figmaSetId: colorsVariableSetId,
                $type: 'color',
                $value: { alpha: 1, hex: '#FFFFFF' },
              },
            ],
            ':root',
            'token'
          )
        ).toBe('')
      })

      it('generates color hex', () => {
        const val = {
          $type: 'color' as const,
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
          $type: 'color' as const,
          $value: {
            alpha: 0.47999998927116394,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('rgba(0 114 114 / 48%)')
      })

      it('rounds alpha to 2 decimals', () => {
        const val = {
          $type: 'color' as const,
          $value: {
            alpha: 0.0123456,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('rgba(0 114 114 / 1.23%)')
      })

      it('removes trailing zeroes in alpha', () => {
        const val = {
          $type: 'color' as const,
          $value: {
            alpha: 0.06250001,
            hex: '#007272',
          },
        }

        const result = transformFigmaValue(val)
        expect(result).toEqual('rgba(0 114 114 / 6.25%)')
      })

      it('throw error on bad hex string', () => {
        const val = {
          $type: 'color' as const,
          $value: {
            alpha: 0.06250001,
            hex: '#fff',
          },
        }
        expect(() => transformFigmaValue(val)).toThrow()
      })

      it('throw error on unknown type', () => {
        const val = {
          $type: 'nonsense',
          $value: 'Medium',
        }
        // @ts-expect-error: we are testing a bad value
        expect(() => transformFigmaValue(val)).toThrow()
      })

      it('converts number to rem', () => {
        expect(
          transformFigmaValue({
            $type: 'number',
            $value: 0,
          })
        ).toEqual('0')

        expect(
          transformFigmaValue({
            $type: 'number',
            $value: 4,
          })
        ).toEqual('0.25rem')

        expect(
          transformFigmaValue({
            $type: 'number',
            $value: 16,
          })
        ).toEqual('1rem')

        expect(
          transformFigmaValue({
            $type: 'number',
            $value: 9999,
          })
        ).toEqual('9999px')
      })
    })

    describe('transformFigmaPath', () => {
      it('transforms normally', () => {
        const result = transformFigmaPath({
          figmaPath: ['Colors', 'Primary', 'Dark'],
          figmaSetId: colorsVariableSetId,
        })
        expect(result).toEqual('colors-primary-dark')
      })

      it('transforms prefixes', () => {
        const result = transformFigmaPath({
          figmaPath: ['dnbcarnegie', 'Primary', 'Dark'],
          figmaSetId: colorsVariableSetId,
        })
        expect(result).toEqual('carnegie-primary-dark')
      })

      it('transforms the renamed Carnegie prefix in paths', () => {
        const result = transformFigmaPath({
          figmaPath: ['dnb-carnegie', 'Primary', 'Dark'],
          figmaSetId: colorsVariableSetId,
        })
        expect(result).toEqual('carnegie-primary-dark')
      })

      it('error on unsupported characters', () => {
        let err
        try {
          transformFigmaPath({
            figmaPath: ['Colo*rs', 'Pri ma?ry', 'Da(rk'],
            figmaSetId: colorsVariableSetId,
          })
        } catch (e) {
          err = e
        }
        expect(err.message).toEqual(
          `Unsupported characters [ '*', ' ', '?', '(' ] in variable: "Colo*rs/Pri ma?ry/Da(rk"`
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
    it('includes generated typography when properties.scss is imported directly', async () => {
      const sass = await import('sass')
      const path = await import('path')
      const css = sass.compile(
        path.resolve('src/style/themes/ui/properties.scss')
      ).css

      expect(css).toContain('--font-size-xx-large: 3rem;')
      expect(css).toContain('--line-height-xx-large: 3.5rem;')
      expect(css).not.toContain('var(--token-font-')
    })

    it('keeps brand-specific typography in the theme entrypoints', async () => {
      const sass = await import('sass')
      const path = await import('path')
      const brandProperties = sass.compile(
        path.resolve('src/style/themes/sbanken/properties.scss')
      ).css
      const carnegieTheme = sass.compile(
        path.resolve('src/style/themes/carnegie/carnegie-theme-basis.scss')
      ).css

      expect(brandProperties).not.toContain('--font-size-xx-large:')
      expect(carnegieTheme).toContain('--font-size-xx-large: 3.5rem;')
    })

    it('has to validate', () => {
      expect(global.ui).toMatchSnapshot()
      expect(global.ui).toContain(`'--font-size-large': '1.625rem'`)
      expect(global.ui).not.toContain(`'--token-font-size-heading-lg'`)
      expect(global.ui).toContain(
        `'--easing-fast-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)'`
      )
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

  it('keeps the generated JavaScript typography values concrete by brand', () => {
    expect(global.carnegie).toContain(`'--font-size-xx-large': '3.5rem'`)
    expect(global.carnegie).toContain(
      `'--line-height-xx-large': '4.25rem'`
    )
  })

  describe('Tailwind CSS Properties Generation', () => {
    let uiTailwindResult, sbankenTailwindResult, eiendomTailwindResult

    beforeAll(async () => {
      await makePropertiesFile()

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
        expect(uiTailwindResult).toContain(
          '--breakpoint-small: 40.00625em;'
        )
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

  describe('Foundation only contains referenced variables', () => {
    it('includes only variables used by tokens for ui', () => {
      const tokenVariables = extractReferencedCssVariables(
        global.uiTokens + global.uiTokensDark
      )
      const foundationVariables = new Set(
        [...global.uiFoundation.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map(
          (match) => match[1]
        )
      )

      for (const variable of Array.from(foundationVariables)) {
        expect(tokenVariables.has(variable)).toBe(true)
      }
    })

    it('includes only variables used by tokens for sbanken', () => {
      const tokenVariables = extractReferencedCssVariables(
        global.sbankenTokens + global.sbankenTokensDark
      )
      const foundationVariables = new Set(
        [
          ...global.sbankenFoundation.matchAll(
            /^\s*(--[a-z0-9-]+)\s*:/gim
          ),
        ].map((match) => match[1])
      )

      for (const variable of Array.from(foundationVariables)) {
        expect(tokenVariables.has(variable)).toBe(true)
      }
    })

    it('includes only variables used by tokens for carnegie', () => {
      const tokenVariables = extractReferencedCssVariables(
        global.carnegieTokens
      )
      const foundationVariables = new Set(
        [
          ...global.carnegieFoundation.matchAll(
            /^\s*(--[a-z0-9-]+)\s*:/gim
          ),
        ].map((match) => match[1])
      )

      for (const variable of Array.from(foundationVariables)) {
        expect(tokenVariables.has(variable)).toBe(true)
      }
    })
  })

  describe('Foundation declares every variable the tokens reference', () => {
    it.each([
      [
        'ui',
        () => [global.uiTokens + global.uiTokensDark, global.uiFoundation],
      ],
      [
        'sbanken',
        () => [
          global.sbankenTokens + global.sbankenTokensDark,
          global.sbankenFoundation,
        ],
      ],
      [
        'carnegie',
        () => [global.carnegieTokens, global.carnegieFoundation],
      ],
    ])('%s', (_theme, getFiles) => {
      const [tokens, foundation] = getFiles()
      const declared = new Set(
        [...foundation.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map(
          (match) => match[1]
        )
      )

      expect(
        Array.from(extractReferencedCssVariables(tokens)).filter(
          (variable) => !declared.has(variable)
        )
      ).toEqual([])
    })
  })
})
