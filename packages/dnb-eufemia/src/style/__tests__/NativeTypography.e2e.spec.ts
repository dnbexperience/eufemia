import { test, expect } from '@playwright/test'
import { compileString } from 'sass'
import path from 'node:path'
import postcss from 'postcss'
import isolatedStyleScopePlugin from '../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin.js'

const content = `
  <div class="dnb-core-style">
    <p class="dnb-p">Body text</p>
    <p class="dnb-p dnb-t__size--medium">Explicit size</p>
    <ul class="dnb-ul"><li>List item</li></ul>
    <h2 class="dnb-h--x-large">Heading</h2>
    <button class="dnb-button dnb-button--primary dnb-button--has-text">
      <span class="dnb-button__alignment dnb-alignment-helper--pseudo-element-only"></span>
      <span class="dnb-button__text">Continue</span>
    </button>
    <label class="dnb-form-label">Name</label>
    <span class="dnb-input dnb-input--medium">
      <input class="dnb-input__input" aria-label="Name" />
    </span>
  </div>
`

for (const theme of ['ui', 'sbanken', 'carnegie', 'eiendom']) {
  const nativeSize = theme === 'ui' ? 17 : theme === 'sbanken' ? 16 : 18

  for (const mode of ['core', 'basis', 'isolated']) {
    test.describe(`Native typography for ${theme} with ${mode} styles`, () => {
      let css: string

      test.beforeAll(async () => {
        css = compileString(
          `
          @use 'style/dnb-ui-${mode === 'isolated' ? 'basis' : mode}.scss';
          @use 'style/themes/${theme}/${theme}-theme-basis.scss';
          @use 'components/button/style/dnb-button.scss';
          @use 'components/input/style/dnb-input.scss';
          @use 'components/form-label/style/dnb-form-label.scss';
        `,
          {
            loadPaths: [path.resolve(__dirname, '../..')],
            logger: { warn() {}, debug() {} },
          }
        ).css

        if (mode === 'isolated') {
          css = (
            await postcss([
              isolatedStyleScopePlugin({
                scopeHash: 'eufemia-scope--native-test',
                warnOnDeprecatedColorVariables: false,
              }),
            ]).process(css, { from: undefined })
          ).css
        }
      })

      test.beforeEach(async ({ page }) => {
        await page.setContent(`
          <style>${css}</style>
          <div class="eufemia-scope--native-test">
            <main class="eufemia-theme eufemia-theme__${theme}">${content}</main>
            <aside class="eufemia-theme eufemia-theme__${theme}">${content}</aside>
          </div>
        `)
      })

      test('scopes native text and preserves control dimensions and explicit sizes', async ({
        page,
      }) => {
        const button = page.locator('main .dnb-button')
        const input = page.locator('main .dnb-input__input')
        const heading = page.locator('main .dnb-h--x-large')
        const headingSize = await heading.evaluate(
          (element) => getComputedStyle(element).fontSize
        )

        await expect(button.locator('.dnb-button__text')).toHaveCSS(
          'font-size',
          '18px'
        )
        await expect(button).toHaveCSS('height', '40px')
        await expect(input).toHaveCSS('height', '40px')
        await page.locator('main').evaluate((element) => {
          element.classList.add('eufemia-theme__typography--native')
        })

        for (const selector of [
          '.dnb-p:not(.dnb-t__size--medium)',
          '.dnb-ul',
          '.dnb-button__text',
          '.dnb-input__input',
          '.dnb-form-label',
        ]) {
          await expect(page.locator(`main ${selector}`)).toHaveCSS(
            'font-size',
            `${nativeSize}px`
          )
          await expect(page.locator(`aside ${selector}`)).toHaveCSS(
            'font-size',
            '18px'
          )
        }

        await expect(button).toHaveCSS('height', '40px')
        await expect(input).toHaveCSS('height', '40px')
        await expect(button.locator('.dnb-button__text')).toHaveCSS(
          'line-height',
          '24px'
        )
        await expect(page.locator('main .dnb-p').first()).toHaveCSS(
          'line-height',
          '24px'
        )
        await expect(heading).toHaveCSS('font-size', headingSize)
        await expect(page.locator('main .dnb-t__size--medium')).toHaveCSS(
          'font-size',
          '20px'
        )
        await expect(page.locator('html')).toHaveCSS('font-size', '16px')
        await page.locator('main').evaluate((element) => {
          element.classList.remove('eufemia-theme__typography--native')
        })
        await expect(button.locator('.dnb-button__text')).toHaveCSS(
          'font-size',
          '18px'
        )
      })

      test('restores nested web typography and follows root text scaling', async ({
        page,
      }) => {
        await page.locator('main').evaluate((element) => {
          element.classList.add('eufemia-theme__typography--native')
          const nested = document.createElement('div')
          nested.className = 'eufemia-theme eufemia-theme__typography--web'
          nested.innerHTML = '<p class="dnb-p">Web override</p>'
          element.appendChild(nested)
        })
        const nativeText = page
          .locator('main > .dnb-core-style .dnb-p')
          .first()
        const webText = page.locator('main > .eufemia-theme .dnb-p')
        await expect(nativeText).toHaveCSS('font-size', `${nativeSize}px`)
        await expect(webText).toHaveCSS('font-size', '18px')
        await page.locator('html').evaluate((element) => {
          element.style.fontSize = '200%'
        })
        await expect(nativeText).toHaveCSS(
          'font-size',
          `${nativeSize * 2}px`
        )
        await expect(webText).toHaveCSS('font-size', '36px')
        await expect(page.locator('main .dnb-button')).toHaveCSS(
          'height',
          '80px'
        )
        await expect(page.locator('main .dnb-input__input')).toHaveCSS(
          'height',
          '80px'
        )
        await expect(page.locator('main .dnb-button__text')).toHaveCSS(
          'line-height',
          '48px'
        )
      })
    })
  }
}

for (const isolated of [false, true]) {
  test(`nested typography and brand changes with isolated=${isolated}`, async ({
    page,
  }) => {
    let css = compileString(
      `
      @use 'style/dnb-ui-basis.scss';
      @use 'style/themes/ui/ui-theme-basis.scss';
      @use 'style/themes/sbanken/sbanken-theme-basis.scss';
      @use 'style/themes/carnegie/carnegie-theme-basis.scss';
      @use 'style/themes/eiendom/eiendom-theme-basis.scss';
    `,
      {
        loadPaths: [path.resolve(__dirname, '../..')],
        logger: { warn() {}, debug() {} },
      }
    ).css
    if (isolated) {
      css = (
        await postcss([
          isolatedStyleScopePlugin({
            scopeHash: 'eufemia-scope--native-test',
            warnOnDeprecatedColorVariables: false,
          }),
        ]).process(css, { from: undefined })
      ).css
    }
    await page.setContent(`
      <style>${css}</style>
      <div class="eufemia-scope--native-test">
        <div class="dnb-core-style">
          <div class="eufemia-theme eufemia-theme__ui eufemia-theme__typography--native">
            <p id="native" class="dnb-p">Native</p>
            <div id="nested" class="eufemia-theme eufemia-theme__sbanken eufemia-theme__typography--native">
              <p class="dnb-p">Nested</p>
            </div>
          </div>
        </div>
      </div>
    `)
    const nested = page.locator('#nested')
    await expect(page.locator('#native')).toHaveCSS('font-size', '17px')
    await expect(nested.locator('.dnb-p')).toHaveCSS('font-size', '16px')
    await nested.evaluate((element) => {
      element.classList.replace(
        'eufemia-theme__typography--native',
        'eufemia-theme__typography--web'
      )
    })
    await expect(nested.locator('.dnb-p')).toHaveCSS('font-size', '18px')
    await nested.evaluate((element) => {
      element.classList.replace(
        'eufemia-theme__sbanken',
        'eufemia-theme__ui'
      )
      element.classList.replace(
        'eufemia-theme__typography--web',
        'eufemia-theme__typography--native'
      )
    })
    await expect(nested.locator('.dnb-p')).toHaveCSS('font-size', '17px')
    await nested.evaluate((element) => {
      element.classList.replace(
        'eufemia-theme__ui',
        'eufemia-theme__carnegie'
      )
    })
    await expect(nested.locator('.dnb-p')).toHaveCSS('font-size', '18px')
  })
}
