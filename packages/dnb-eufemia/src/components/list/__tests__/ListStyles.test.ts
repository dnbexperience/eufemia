// @vitest-environment node

import postcss from 'postcss'
import { loadScss } from '../../../core/test-utils/testSetup'

// Safari before 15.4 and Firefox before 121 do not support :has().
// These browsers drop the rules that show the outline of an item on
// keyboard focus, so the styles have a fallback for them. It must target
// only the primary focus targets, not the whole item. The behaviour is
// tested in ListFocusFallback.e2e.spec.ts.
function getFallbackRules() {
  const css = loadScss(require.resolve('../style/dnb-list.scss'))
  const rules: Array<{ condition: string; selector: string }> = []

  postcss.parse(css).walkAtRules('supports', (atRule) => {
    if (atRule.params.includes('not (selector(:has(*)))')) {
      atRule.walkRules((rule) => {
        for (const selector of rule.selectors) {
          rules.push({ condition: atRule.params, selector })
        }
      })
    }
  })

  return rules
}

const withFocusVisible =
  '(not (selector(:has(*)))) and (selector(:focus-visible))'
const withoutFocusVisible =
  '(not (selector(:has(*)))) and (not (selector(:focus-visible)))'

const cellBoxHeight =
  'clamp(var(--line-height-basis), calc(var(--list-item-height) - 2 * var(--list-item-padding)), 2rem)'

// Sass keeps the line breaks of a custom property value
const normalize = (value: string) =>
  value.replace(/\s+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')')

describe('List scss', () => {
  it('should show the outline of a focused item in browsers without :has()', () => {
    expect(getFallbackRules()).toEqual([
      {
        condition: withFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > a:focus-visible::before',
      },
      {
        condition: withFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > .dnb-list__item__action__button:focus-visible::before',
      },
      {
        condition: withoutFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > a:focus::before',
      },
      {
        condition: withoutFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > .dnb-list__item__action__button:focus::before',
      },
      {
        condition: withFocusVisible,
        selector:
          '.dnb-list__item__accordion:not(.dnb-list__item--disabled) > .dnb-list__item__accordion__header:focus-visible::before',
      },
      {
        condition: withoutFocusVisible,
        selector:
          '.dnb-list__item__accordion:not(.dnb-list__item--disabled) > .dnb-list__item__accordion__header:focus::before',
      },
    ])
  })

  it('should only use selectors the fallback browsers support', () => {
    const rules = getFallbackRules()
    const withoutFocusVisibleRules = rules.filter(
      ({ condition }) => condition === withoutFocusVisible
    )

    expect(withoutFocusVisibleRules.length).toBeGreaterThan(0)

    for (const { selector } of rules) {
      expect(selector).not.toContain(':has(')
    }
    for (const { selector } of withoutFocusVisibleRules) {
      expect(selector).not.toContain(':focus-visible')
    }
  })

  // A row outside a List.Container, like in a Dropdown or Autocomplete
  // option, has no padding of its own, so fixed cell sizes make it taller.
  it('should only give the cells a fixed height on a List surface', () => {
    const css = loadScss(require.resolve('../style/dnb-list.scss'))
    const cell =
      /\.dnb-list__item__(title|end|icon|start|chevron|center)\b|\.dnb-anchor__launch-icon/
    const surfaces: Array<string> = []
    const fixedOutsideSurface: Array<string> = []

    postcss.parse(css).walkDecls((decl) => {
      const rule = decl.parent as postcss.Rule

      if (decl.prop === '--list-item-cell-height') {
        surfaces.push(`${rule.selector} { ${normalize(decl.value)} }`)
      }

      if (
        /^(min-height|padding-top|margin-top|margin-bottom)$/.test(
          decl.prop
        ) &&
        rule.selectors?.some((selector) => cell.test(selector))
      ) {
        // Without a List surface, the custom property uses its fallback
        const value = decl.value.replace(
          /var\(--list-item-cell-height, (var\([^)]*\)|[^)]*)\)/g,
          '$1'
        )
        if (/\d(rem|px|em)\b/.test(value)) {
          fixedOutsideSurface.push(
            `${rule.selector} { ${decl.prop}: ${decl.value} }`
          )
        }
      }
    })

    expect(fixedOutsideSurface).toEqual([])
    expect(surfaces).toEqual([
      `.dnb-list--variant-basic { ${cellBoxHeight} }`,
    ])
  })

  it('should only set the height of the cell box in one place', () => {
    const css = loadScss(require.resolve('../style/dnb-list.scss'))
    const boxHeights: Array<string> = []

    postcss.parse(css).walkDecls((decl) => {
      if (/(^|[^.\d])2rem\b/.test(decl.value)) {
        const rule = decl.parent as postcss.Rule
        boxHeights.push(
          `${rule.selector} { ${decl.prop}: ${normalize(decl.value)} }`
        )
      }
    })

    expect(boxHeights).toEqual([
      `.dnb-list--variant-basic { --list-item-cell-height: ${cellBoxHeight} }`,
    ])
  })

  // A lower --list-item-height makes the rows lower, like before the cells
  // got a box. The box stays between one text line and 2rem.
  it('should derive the cell box from the row height', () => {
    const css = loadScss(require.resolve('../style/dnb-list.scss'))
    const cellHeights: Array<string> = []

    postcss.parse(css).walkDecls('--list-item-cell-height', (decl) => {
      cellHeights.push(normalize(decl.value))
    })

    expect(cellHeights).toEqual([cellBoxHeight])
  })

  // Like in the design, a control taller than the cell box (a 40px Button)
  // is centered on the title line and reaches into the row padding.
  it('should keep an end cell with only a control as tall as the cell box', () => {
    const css = loadScss(require.resolve('../style/dnb-list.scss'))
    const maxHeights: Array<{
      media: string
      selector: string
      value: string
    }> = []

    postcss.parse(css).walkDecls('max-height', (decl) => {
      const rule = decl.parent as postcss.Rule
      if (rule.selector.includes('.dnb-list__item__end')) {
        maxHeights.push({
          media: (rule.parent as postcss.AtRule).params,
          selector: rule.selector,
          value: decl.value,
        })
      }
    })

    expect(maxHeights).toHaveLength(1)

    const [{ media, selector, value }] = maxHeights

    // On small screens, the end cell is placed below the text
    expect(media).toContain('min-width')
    expect(selector).toContain('.dnb-button')
    expect(selector).toContain(':only-child')

    // A horizontal flex container can wrap onto more lines
    expect(selector).toContain(':not(.dnb-flex-container)')

    // Rows outside a List.Container keep their own height
    expect(value).toBe('var(--list-item-cell-height, none)')
  })
})
