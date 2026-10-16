import { test, expect } from '@playwright/test'
import { compileString } from 'sass'
import path from 'node:path'
import postcss from 'postcss'
import isolatedStyleScopePlugin from '../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin.js'

for (const theme of ['ui', 'sbanken']) {
  for (const mode of [
    'body',
    'core',
    'basis',
    'isolated',
    'isolated-core',
  ]) {
    test.describe(`${theme} reset with ${mode} styles`, () => {
      let css: string

      test.beforeAll(async () => {
        css = compileString(
          `
            @use 'style/dnb-ui-${mode === 'isolated' ? 'basis' : mode === 'isolated-core' ? 'core' : mode}.scss';
            @use 'style/themes/${theme}/${theme}-theme-basis.scss';
            @use 'extensions/sidebar-menu/style/dnb-sidebar-menu.scss';
            @use 'components/button/style/dnb-button.scss';
            @use 'components/avatar/style/dnb-avatar.scss';
            @use 'components/tabs/style/dnb-tabs.scss';
            @use 'components/popover/style/dnb-popover.scss';

            .dnb-reset-test-control {
              appearance: none;
              font-family: monospace;
              font-size: 1.5rem;
              line-height: 2rem;
              margin-inline-start: 1rem;
            }
          `,
          {
            loadPaths: [path.resolve(__dirname, '../..')],
            logger: { warn() {}, debug() {} },
          }
        ).css

        if (mode.startsWith('isolated')) {
          css = (
            await postcss([
              isolatedStyleScopePlugin({
                scopeHash: 'eufemia-scope--reset-test',
                warnOnDeprecatedColorVariables: false,
              }),
            ]).process(css, { from: undefined })
          ).css
        }
      })

      test.beforeEach(async ({ page }) => {
        await page.setContent(
          `
            <style>${css}</style>
            <div class="eufemia-scope--reset-test">
              <div class="${mode === 'body' || mode === 'isolated-core' ? '' : 'dnb-core-style'}">
                <nav class="dnb-sidebar-menu">
                  <ul class="dnb-sidebar-menu__list">
                    <li class="dnb-sidebar-menu__item" style="--sidebar-menu-indent: 1rem">
                      <button class="dnb-sidebar-menu__item__action">Button item</button>
                      <a class="dnb-sidebar-menu__item__action" href="#link">Link item</a>
                    </li>
                    <li class="dnb-sidebar-menu__accordion">
                      <button class="dnb-sidebar-menu__item__action dnb-sidebar-menu__accordion__trigger" aria-expanded="false">Accordion</button>
                    </li>
                  </ul>
                </nav>
                <button class="dnb-reset-test-control">Button</button>
                <input class="dnb-reset-test-control" />
                <select class="dnb-reset-test-control"><option>Select</option></select>
                <textarea class="dnb-reset-test-control"></textarea>
                <button id="unstyled-control">Unstyled button</button>
                <button class="dnb-button">Eufemia button</button>
                <button class="dnb-tabs__button">Tab</button>
                <span class="dnb-avatar dnb-avatar--size-small">A</span>
                <div class="dnb-popover__title"><strong>Popover</strong></div>
                <button class="dnb-sidebar-menu__item__action" hidden>Hidden</button>
                <button class="dnb-sidebar-menu__item__action" aria-busy="true">Busy</button>
                <button class="dnb-sidebar-menu__item__action" disabled>Disabled</button>
              </div>
            </div>
          `,
          { waitUntil: 'domcontentloaded' }
        )
      })

      test('keeps SidebarMenu button and link typography and indentation consistent', async ({
        page,
      }) => {
        const actions = page.locator('nav .dnb-sidebar-menu__item__action')

        for (const action of await actions.all()) {
          await expect(action).toHaveCSS('font-size', '18px')
          await expect(action).toHaveCSS('line-height', '24px')
        }

        const items = page.locator(
          '.dnb-sidebar-menu__item > .dnb-sidebar-menu__item__action'
        )
        for (const item of await items.all()) {
          await expect(item).toHaveCSS('margin-inline-start', '16px')
        }
      })

      test('lets a component class override form control resets', async ({
        page,
      }) => {
        for (const control of await page
          .locator('.dnb-reset-test-control')
          .all()) {
          await expect(control).toHaveCSS('font-family', 'monospace')
          await expect(control).toHaveCSS('font-size', '24px')
          await expect(control).toHaveCSS('line-height', '32px')
          await expect(control).toHaveCSS('margin-inline-start', '16px')
        }
      })

      test('preserves component styles and hidden, busy and disabled states', async ({
        page,
      }) => {
        await expect(page.locator('#unstyled-control')).toHaveCSS(
          'font-size',
          '16px'
        )
        await expect(page.locator('#unstyled-control')).toHaveCSS(
          'line-height',
          await page.locator('#unstyled-control').evaluate((element) => {
            return getComputedStyle(element.parentElement).lineHeight
          })
        )
        await expect(page.locator('.dnb-button')).toHaveCSS(
          'line-height',
          '40px'
        )
        await expect(page.locator('.dnb-tabs__button')).toHaveCSS(
          'font-size',
          '18px'
        )
        await expect(page.locator('.dnb-avatar')).toHaveCSS(
          'line-height',
          '20px'
        )
        await expect(page.locator('.dnb-popover__title strong')).toHaveCSS(
          'font-weight',
          '500'
        )
        await expect(page.locator('[hidden]')).toHaveCSS('display', 'none')
        await expect(page.locator('[aria-busy]')).toHaveCSS(
          'cursor',
          'progress'
        )
        await expect(page.locator('[disabled]')).toHaveCSS(
          'cursor',
          'not-allowed'
        )
      })
    })
  }
}
