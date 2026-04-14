import {
  buildThemeTokenEntries,
  buildTokenSections,
  classifyTokenAudience,
} from '../designTokens'

describe('design token docs data', () => {
  it('collects token entries from nested figma token data', () => {
    const result = buildThemeTokenEntries({
      color: {
        background: {
          action: {
            $type: 'color',
            $value: {
              alpha: 1,
              hex: '#007272',
            },
          },
        },
      },
    })

    expect(result).toEqual([
      {
        name: '--token-color-background-action',
        path: ['color', 'background', 'action'],
        section: 'background',
        group: 'action',
        audience: 'base',
        reference: '#007272',
        foundationReference: null,
      },
    ])
  })

  it('classifies base, state and advanced tokens for usage', () => {
    expect(
      classifyTokenAudience(
        '--token-color-background-action',
        'background'
      )
    ).toBe('base')

    expect(
      classifyTokenAudience(
        '--token-color-background-action-inverse',
        'background'
      )
    ).toBe('base')

    expect(
      classifyTokenAudience(
        '--token-color-background-action-hover',
        'background'
      )
    ).toBe('state')

    expect(
      classifyTokenAudience(
        '--token-color-background-action-focus',
        'background'
      )
    ).toBe('state')

    expect(
      classifyTokenAudience(
        '--token-color-background-action-ondark',
        'background'
      )
    ).toBe('advanced')

    expect(
      classifyTokenAudience(
        '--token-color-decorative-first-subtle',
        'decorative'
      )
    ).toBe('advanced')

    expect(
      classifyTokenAudience(
        '--token-color-component-button-background-action',
        'component'
      )
    ).toBe('base')

    expect(
      classifyTokenAudience(
        '--token-color-component-button-background-action-hover',
        'component'
      )
    ).toBe('state')

    expect(
      classifyTokenAudience(
        '--token-color-component-button-background-action-ondark',
        'component'
      )
    ).toBe('advanced')
  })

  it('merges the same token across themes into one row', () => {
    const sections = buildTokenSections({
      uiLight: {
        color: {
          text: {
            neutral: {
              $type: 'color',
              $value: {
                alpha: 1,
                hex: '#121212',
              },
            },
          },
        },
      },
      uiDark: {
        color: {
          text: {
            neutral: {
              $type: 'color',
              $value: {
                alpha: 1,
                hex: '#fafafa',
              },
            },
          },
        },
      },
      sbankenLight: {
        color: {
          text: {
            neutral: {
              $type: 'color',
              $value: {
                alpha: 1,
                hex: '#2c1649',
              },
            },
          },
        },
      },
      sbankenDark: {
        color: {
          text: {
            neutral: {
              $type: 'color',
              $value: {
                alpha: 1,
                hex: '#d1c9e3',
              },
            },
          },
        },
      },
      carnegie: {
        color: {
          text: {
            neutral: {
              $type: 'color',
              $value: {
                alpha: 1,
                hex: '#111111',
              },
            },
          },
        },
      },
    })

    const textSection = sections.find(({ id }) => id === 'text')

    expect(textSection?.tokens).toEqual([
      {
        name: '--token-color-text-neutral',
        path: ['color', 'text', 'neutral'],
        section: 'text',
        group: 'neutral',
        audience: 'base',
        references: {
          uiLight: '#121212',
          uiDark: '#fafafa',
          sbankenLight: '#2c1649',
          sbankenDark: '#d1c9e3',
          carnegie: '#111111',
        },
        foundationReferences: {
          uiLight: null,
          uiDark: null,
          sbankenLight: null,
          sbankenDark: null,
          carnegie: null,
        },
      },
    ])
  })
})
