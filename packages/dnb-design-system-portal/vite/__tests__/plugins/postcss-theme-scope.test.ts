import { describe, it, expect } from 'vitest'
import postcss from 'postcss'
import plugin from '../../../postcss-eufemia-theme-scope.cjs'

async function run(input: string, filePath: string) {
  const result = await postcss([plugin()]).process(input, {
    from: filePath,
  })
  return result.css
}

describe('postcss-eufemia-theme-scope', () => {
  it('does not modify selectors for default theme files', async () => {
    const css = await run(
      '.eufemia-scope--portal .dnb-accordion { color: red; }',
      '/path/to/themes/ui/ui-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .dnb-accordion { color: red; }'
    )
  })

  it('does not modify selectors for non-theme files', async () => {
    const css = await run(
      '.eufemia-scope--portal .dnb-accordion { color: red; }',
      '/path/to/components/accordion/style/dnb-accordion.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .dnb-accordion { color: red; }'
    )
  })

  it('scopes standalone scope class under brand class', async () => {
    const css = await run(
      '.eufemia-scope--portal { --sb-color-text: #000; }',
      '/path/to/themes/sbanken/sbanken-theme-basis.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .eufemia-theme__sbanken { --sb-color-text: #000; }'
    )
  })

  it('scopes color scheme selectors under brand class', async () => {
    const css = await run(
      '.eufemia-scope--portal .eufemia-theme__color-scheme--dark { --sb-color-text: #fff; }',
      '/path/to/themes/sbanken/sbanken-theme-dark-mode.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .eufemia-theme__sbanken.eufemia-theme__color-scheme--dark { --sb-color-text: #fff; }'
    )
  })

  it('scopes component selectors under brand class with :where()', async () => {
    const css = await run(
      '.eufemia-scope--portal .dnb-accordion { --accordion-border-width: 0; }',
      '/path/to/themes/sbanken/sbanken-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal :where(.eufemia-theme__sbanken) .dnb-accordion { --accordion-border-width: 0; }'
    )
  })

  it('scopes nested component selectors under brand class with :where()', async () => {
    const css = await run(
      '.eufemia-scope--portal .dnb-accordion .dnb-accordion__header { color: red; }',
      '/path/to/themes/sbanken/sbanken-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal :where(.eufemia-theme__sbanken) .dnb-accordion .dnb-accordion__header { color: red; }'
    )
  })

  it('skips selectors already scoped under brand class', async () => {
    const css = await run(
      '.eufemia-scope--portal .eufemia-theme__sbanken .dnb-accordion { color: red; }',
      '/path/to/themes/sbanken/sbanken-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .eufemia-theme__sbanken .dnb-accordion { color: red; }'
    )
  })

  it('skips selectors already scoped with :where() brand class', async () => {
    const css = await run(
      '.eufemia-scope--portal :where(.eufemia-theme__sbanken) .dnb-accordion { color: red; }',
      '/path/to/themes/sbanken/sbanken-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal :where(.eufemia-theme__sbanken) .dnb-accordion { color: red; }'
    )
  })

  it('handles eiendom theme files', async () => {
    const css = await run(
      '.eufemia-scope--portal .dnb-button { color: blue; }',
      '/path/to/themes/eiendom/eiendom-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal :where(.eufemia-theme__eiendom) .dnb-button { color: blue; }'
    )
  })

  it('handles carnegie theme files', async () => {
    const css = await run(
      '.eufemia-scope--portal .dnb-card { padding: 1rem; }',
      '/path/to/themes/carnegie/carnegie-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal :where(.eufemia-theme__carnegie) .dnb-card { padding: 1rem; }'
    )
  })

  it('handles comma-separated selectors with mixed patterns', async () => {
    const css = await run(
      '.eufemia-scope--portal, .eufemia-scope--portal .eufemia-theme__color-scheme--light { --sb-color-text: #000; }',
      '/path/to/themes/sbanken/sbanken-theme-basis.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .eufemia-theme__sbanken, .eufemia-scope--portal .eufemia-theme__sbanken.eufemia-theme__color-scheme--light { --sb-color-text: #000; }'
    )
  })

  it('does not scope generic .eufemia-theme selector under brand class', async () => {
    const css = await run(
      '.eufemia-scope--portal, .eufemia-scope--portal .eufemia-theme { --scrollbar-thumb-color: red; }',
      '/path/to/themes/sbanken/sbanken-theme-basis.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal .eufemia-theme__sbanken, .eufemia-scope--portal .eufemia-theme { --scrollbar-thumb-color: red; }'
    )
  })

  it('scopes :where() wrapped component selectors under brand class', async () => {
    const css = await run(
      '.eufemia-scope--portal :where(:not(.dnb-anchor--no-style)).dnb-anchor .dnb-icon--default { font-size: 1em; }',
      '/path/to/themes/sbanken/sbanken-theme-components.scss'
    )
    expect(css).toBe(
      '.eufemia-scope--portal :where(.eufemia-theme__sbanken) :where(:not(.dnb-anchor--no-style)).dnb-anchor .dnb-icon--default { font-size: 1em; }'
    )
  })
})
