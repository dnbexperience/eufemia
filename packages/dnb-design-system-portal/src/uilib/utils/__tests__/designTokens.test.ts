import { describe, it, expect } from 'vitest'
import {
  buildThemeTokenEntries,
  buildTokenSections,
  extractTokenModifiers,
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
        modifiers: [],
        reference: '#007272',
        foundationReference: null,
      },
    ])
  })

  it('collects radius token entries from figma token data', () => {
    const result = buildThemeTokenEntries({
      radius: {
        sm: {
          $type: 'number',
          $value: 4,
        },
        0: {
          $type: 'number',
          $value: 0,
        },
        full: {
          $type: 'number',
          $value: 9999,
        },
      },
    })

    expect(result).toEqual([
      {
        name: '--token-radius-0',
        path: ['radius', '0'],
        section: 'radius',
        group: 'radius',
        modifiers: [],
        reference: '0',
        foundationReference: null,
      },
      {
        name: '--token-radius-sm',
        path: ['radius', 'sm'],
        section: 'radius',
        group: 'radius',
        modifiers: [],
        reference: '0.25rem',
        foundationReference: null,
      },
      {
        name: '--token-radius-full',
        path: ['radius', 'full'],
        section: 'radius',
        group: 'radius',
        modifiers: [],
        reference: '9999px',
        foundationReference: null,
      },
    ])
  })

  it('extracts known modifiers from a token path', () => {
    expect(
      extractTokenModifiers(['color', 'background', 'action'])
    ).toEqual([])

    expect(
      extractTokenModifiers(['color', 'background', 'action', 'hover'])
    ).toEqual(['hover'])

    expect(
      extractTokenModifiers([
        'color',
        'background',
        'action',
        'hover',
        'subtle',
        'ondark',
      ])
    ).toEqual(['hover', 'subtle', 'ondark'])

    expect(
      extractTokenModifiers([
        'color',
        'decorative',
        'first',
        'subtle',
        'static',
      ])
    ).toEqual(['subtle', 'static'])

    expect(
      extractTokenModifiers(['color', 'text', 'neutral', 'bold'])
    ).toEqual(['bold'])

    expect(
      extractTokenModifiers([
        'color',
        'background',
        'action-hover-subtle-ondark',
      ])
    ).toEqual(['hover', 'subtle', 'ondark'])
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
        modifiers: [],
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
