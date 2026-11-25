import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ChartColors, ChartRoleColors } from '../ColorReference'
import * as reference from '../ColorReference'

describe('Chart color reference', () => {
  it('renders the pattern guide with color references and no chart demos or source images', async () => {
    const source = readFileSync(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../getting-started-with-charts.mdx'
      ),
      'utf8'
    )
      .replace(/^---[\s\S]*?---\s*/, '')
      .replace(/^import \{[\s\S]*?\} from '[^']+'\s*/m, '')
    const { default: Content } = await evaluate(source, runtime)
    const { container } = render(<Content components={reference} />)

    expect(container.querySelector('[role="img"]')).toBeNull()
    expect(container.querySelector('table')).not.toBeNull()
    expect(
      container.querySelectorAll('svg, canvas, img, image, object')
    ).toHaveLength(0)
  })

  it('documents all 88 numbered swatches without duplicating their values', () => {
    render(<ChartColors />)

    const swatches = document.querySelectorAll('li[title]')
    expect(swatches).toHaveLength(88)
    const scrollViews = document.querySelectorAll('.dnb-scroll-view')
    expect(scrollViews).toHaveLength(8)
    for (const scrollView of scrollViews) {
      expect(scrollView.getAttribute('aria-label')).toMatch(
        /chart colors$/
      )
      expect(scrollView.querySelectorAll('li[title]')).toHaveLength(11)
    }
    for (const swatch of swatches) {
      expect(swatch.getAttribute('title')).toMatch(
        /^--chart-color-(gray|red|green|orange|blue|teal|yellow|purple)-(50|[1-9]00|950)$/
      )
      expect(swatch.textContent).toMatch(/#(?:[a-f0-9]{6}|[a-f0-9]{3})$/)
    }
  })

  it('documents all 12 role properties in a scrollable table', () => {
    render(<ChartRoleColors />)

    const scrollView = document.querySelector('.dnb-table__scroll-view')
    expect(
      scrollView.querySelector('caption').classList.contains('dnb-sr-only')
    ).toBe(true)
    const properties = scrollView.querySelectorAll('tbody code')
    expect(properties).toHaveLength(12)
    expect(
      new Set(Array.from(properties, (property) => property.textContent))
        .size
    ).toBe(12)
    for (const property of properties) {
      expect(property.textContent).toMatch(
        /^--chart-color-(primary|secondary|tertiary|negative)-(solid|outline-fill|outline-stroke)$/
      )
    }
  })
})
