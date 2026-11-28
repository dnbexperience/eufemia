import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'
import { contrastRatio } from '../../../../scripts/figma/tokenReview'

function getSecondTab(page) {
  return page
    .locator('[data-visual-test="tabs-section-styles"]')
    .getByRole('tab', { name: 'Second' })
}

function getLabelColor(tab: Locator) {
  return tab.evaluate(
    (button) =>
      getComputedStyle(button.querySelector('.dnb-tabs__button__title'))
        .color
  )
}

test('keeps an enabled tab readable on the information surface', async ({
  page,
}) => {
  await page.goto('/web/components/tabs/demos/')
  const tab = getSecondTab(page)
  await expect(tab).toBeEnabled()
  await expect(tab).toHaveAttribute('aria-selected', 'false')
  const colors = await tab.evaluate((button) => ({
    label: getComputedStyle(
      button.querySelector('.dnb-tabs__button__title')
    ).color,
    surface: getComputedStyle(button.closest('.dnb-section--information'))
      .backgroundColor,
  }))
  expect(
    contrastRatio(colors.label, colors.surface, '#fff')
  ).toBeGreaterThanOrEqual(4.5)
})

test('follows the surface directly behind the tabs', async ({ page }) => {
  await page.goto('/web/components/tabs/demos/')
  const tab = getSecondTab(page)
  await expect(tab).toHaveAttribute('aria-selected', 'false')
  const informationColor = await getLabelColor(tab)

  const setSurfaces = (outer: string, bar: string) =>
    tab.evaluate(
      (button, [outer, bar]) => {
        const tabs = button.closest('.dnb-tabs')
        const tabsBar = button.closest('.dnb-tabs__tabs')
        for (const element of [tabs, tabsBar]) {
          for (const name of [...element.classList]) {
            if (name.startsWith('dnb-section')) {
              element.classList.remove(name)
            }
          }
        }
        if (outer) {
          tabs.classList.add('dnb-section', `dnb-section--${outer}`)
        }
        if (bar) {
          tabsBar.classList.add('dnb-section', `dnb-section--${bar}`)
        }
      },
      [outer, bar]
    )

  await setSurfaces(null, 'warning')
  const warningColor = await getLabelColor(tab)
  expect(warningColor).not.toBe(informationColor)

  // <Section variant="information"><Tabs tabsStyle="warning" /></Section>
  await setSurfaces('information', 'warning')
  expect(await getLabelColor(tab)).toBe(warningColor)

  // A warning Section between the information Section and the tabs
  await setSurfaces('warning', null)
  await tab.evaluate((button) => {
    const tabs = button.closest('.dnb-tabs')
    const information = document.createElement('section')
    information.className = 'dnb-section dnb-section--information'
    tabs.parentElement.insertBefore(information, tabs)
    information.appendChild(tabs)
  })
  expect(await getLabelColor(tab)).toBe(warningColor)

  await setSurfaces('information', null)
  expect(await getLabelColor(tab)).toBe(informationColor)
})
