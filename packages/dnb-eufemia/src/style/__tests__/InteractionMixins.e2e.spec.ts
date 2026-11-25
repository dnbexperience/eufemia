import { test, expect } from '@playwright/test'
import { compileString } from 'sass'
import path from 'node:path'

const css = compileString(
  `
    @use 'style/core/utilities.scss';

    .dnb-interaction-test {
      --interaction: rest;
      margin: 1rem;
      padding: 1rem;
      cursor: pointer;

      @include utilities.hover() {
        --interaction: hover;
      }

      @include utilities.active() {
        --interaction: active;
      }

      @include utilities.focusVisible() {
        outline: 3px solid blue;
      }
    }
  `,
  { loadPaths: [path.resolve(__dirname, '../..')] }
).css

test.beforeEach(async ({ page }) => {
  await page.setContent(`
    <style>${css}</style>
    <button class="dnb-interaction-test">Enabled</button>
    <button class="dnb-interaction-test" aria-disabled="false">ARIA enabled</button>
    <button class="dnb-interaction-test" aria-disabled="true">ARIA disabled</button>
    <button class="dnb-interaction-test" disabled>Native disabled</button>
    <button class="dnb-interaction-test" disabled aria-disabled="true">Both disabled</button>
  `)
  await page.locator('html').evaluate((element) => {
    element.dataset.whatintent = 'mouse'
    element.dataset.whatinput = 'mouse'
  })
})

test('hover excludes native and ARIA disabled controls', async ({
  page,
}) => {
  for (const [name, interaction, cursor] of [
    ['Enabled', 'hover', 'pointer'],
    ['ARIA enabled', 'hover', 'pointer'],
    ['ARIA disabled', 'rest', 'pointer'],
    ['Native disabled', 'rest', 'not-allowed'],
    ['Both disabled', 'rest', 'not-allowed'],
  ]) {
    const control = page.getByRole('button', { name, exact: true })
    await control.hover()
    await expect(control).toHaveCSS('--interaction', interaction)
    await expect(control).toHaveCSS('cursor', cursor)
  }
})

test('active excludes native and ARIA disabled controls', async ({
  page,
}) => {
  await page.locator('html').evaluate((element) => {
    element.dataset.whatintent = 'keyboard'
  })
  for (const [name, interaction, cursor] of [
    ['Enabled', 'active', 'pointer'],
    ['ARIA enabled', 'active', 'pointer'],
    ['ARIA disabled', 'rest', 'pointer'],
    ['Native disabled', 'rest', 'not-allowed'],
    ['Both disabled', 'rest', 'not-allowed'],
  ]) {
    const control = page.getByRole('button', { name, exact: true })
    await control.hover()
    await page.mouse.down()
    await expect(control).toHaveCSS('--interaction', interaction)
    await expect(control).toHaveCSS('cursor', cursor)
    await page.mouse.up()
  }
})

test('ARIA disabled controls keep keyboard focus styles', async ({
  page,
}) => {
  await page.locator('html').evaluate((element) => {
    element.dataset.whatinput = 'keyboard'
  })
  for (const name of ['Enabled', 'ARIA enabled', 'ARIA disabled']) {
    await page.keyboard.press('Tab')
    const control = page.getByRole('button', { name, exact: true })
    await expect(control).toBeFocused()
    await expect(control).toHaveCSS('outline-style', 'solid')
    await expect(control).toHaveCSS('outline-width', '3px')
  }
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('button', { name: 'Native disabled' })
  ).not.toBeFocused()
})
