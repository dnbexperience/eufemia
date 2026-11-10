import { expect, test } from '@playwright/test'
import path from 'node:path'
import { compile } from 'sass'
import postcss from 'postcss'
import isolatedStyleScopePlugin from '../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin.js'

async function createResetStyles(mode: string) {
  const entry = mode.endsWith('basis') ? 'basis' : 'core'
  const css = compile(
    path.resolve(__dirname, `../../style/dnb-ui-${entry}.scss`),
    { logger: { warn() {}, debug() {} } }
  ).css

  if (mode.startsWith('isolated')) {
    return (
      await postcss([
        isolatedStyleScopePlugin({
          scopeHash: 'eufemia-scope--open-on-find-test',
          warnOnDeprecatedColorVariables: false,
        }),
      ]).process(css, { from: undefined })
    ).css
  }

  return css
}

test.describe('openOnFind', () => {
  test('preserves native reveal with core and isolated reset styles', async ({
    page,
  }) => {
    for (const mode of ['core', 'isolated-basis', 'isolated-core']) {
      await test.step(mode, async () => {
        const css = await createResetStyles(mode)

        await page.setContent(`
          <style>${css}</style>
          <div class="eufemia-scope--open-on-find-test">
            <div class="dnb-core-style">
              <div id="hidden-content" hidden>Hidden content</div>
              <div id="findable-content" hidden="until-found">
                <p id="${mode}-match">Searchable content</p>
              </div>
            </div>
          </div>
        `)

        await expect(page.locator('#hidden-content')).toHaveCSS(
          'display',
          'none'
        )
        await expect(page.locator('#findable-content')).toHaveCSS(
          'display',
          'block'
        )
        await expect(page.locator(`#${mode}-match`)).toBeHidden()

        await page.evaluate((id) => {
          window.location.hash = id
        }, `${mode}-match`)

        await expect(
          page.locator('#findable-content')
        ).not.toHaveAttribute('hidden')
        await expect(page.locator(`#${mode}-match`)).toBeVisible()
        await expect(page.locator('#hidden-content')).toBeHidden()
      })
    }
  })

  test('selects the tab from native fragment navigation', async ({
    page,
  }) => {
    await page.goto('/uilib/components/tabs/demos')

    const example = page.locator('[data-visual-test="tabs-open-on-find"]')
    const matchingContent = example.locator('#open-on-find-tab-match')
    const matchingTab = example.getByRole('tab', { name: 'Tab 2' })

    await expect(matchingTab).toHaveAttribute('aria-selected', 'false')
    await expect(matchingContent).toBeHidden()

    await page.evaluate(() => {
      window.location.hash = 'open-on-find-tab-match'
    })

    await expect(matchingTab).toHaveAttribute('aria-selected', 'true')
    await expect(matchingContent).toBeVisible()
  })

  test('expands the table row from native fragment navigation', async ({
    page,
  }) => {
    await page.goto('/uilib/components/table/demos')

    const example = page.locator('[data-visual-test="table-accordion"]')
    const table = example.locator('table').first()
    const matchingContent = table.locator(
      '#accordion-table-1-open-on-find-match'
    )
    const row = matchingContent.locator('xpath=ancestor::tr')
    const toggle = row.locator('xpath=preceding-sibling::tr[1]//button')

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(row).toHaveAttribute('hidden', 'until-found')
    await expect(row).toHaveJSProperty('offsetHeight', 0)
    await expect(matchingContent).toBeHidden()

    await page.evaluate(() => {
      window.location.hash = 'accordion-table-1-open-on-find-match'
    })

    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(matchingContent).toBeVisible()
  })
})
