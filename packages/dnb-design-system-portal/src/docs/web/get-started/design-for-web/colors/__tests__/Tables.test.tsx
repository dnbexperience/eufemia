import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import Theme from '@dnb/eufemia/src/shared/Theme'
import VisibilityByTheme from '@dnb/eufemia/src/shared/VisibilityByTheme'

const source = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../tables.mdx'),
  'utf8'
)
  .replace(/^---[\s\S]*?---\s*/, '')
  .replace(/^import .*$/gm, '')

async function renderTables(brand: 'birdhouse' | 'eiendom') {
  const { default: Content } = await evaluate(source, runtime)

  return render(
    <Theme brand={brand}>
      <Content
        components={{
          VisibilityByTheme,
          ChangeStyleTheme: () => null,
          TableEiendom: () => <table aria-label="Legacy brand colors" />,
          TableUi: () => <table aria-label="Legacy DNB colors" />,
          TableSbanken: () => null,
          TableCarnegie: () => null,
        }}
      />
    </Theme>
  )
}

describe('Color tables', () => {
  it('directs Birdhouse to role tokens instead of showing legacy palettes', async () => {
    const { container } = await renderTables('birdhouse')

    expect(container.querySelector('table')).toBeNull()
    expect(
      container.querySelector(
        'a[href="/web/styling-and-themes/design-tokens/"]'
      )
    ).not.toBeNull()
  })

  it('keeps the existing legacy palettes for the established theme', async () => {
    const { container } = await renderTables('eiendom')

    expect(container.querySelectorAll('table')).toHaveLength(2)
  })
})
