import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { test, expect, type Page } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'

const styleRoot = path.resolve(__dirname, '..')
const compile = (file: string) =>
  sass.compile(path.join(styleRoot, file)).css

test.describe('Document and print styles', () => {
  let page: Page
  let documentCss: string
  let printCss: string
  let coreCss: string

  test.beforeAll(async () => {
    documentCss = compile('dnb-ui-document.scss')
    printCss = compile('dnb-ui-print.scss')
    coreCss = compile('dnb-ui-core.scss')
  })

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage
  })

  async function withIsolation(css: string, isolated: boolean) {
    if (isolated) {
      return (
        await postcss([
          isolateStyles({ scopeHash: 'test-scope' }),
        ]).process(css, { from: undefined })
      ).css
    }
    return css
  }

  async function render(
    brand = 'ui',
    isolated = false,
    nested = false,
    tableMarkup = ''
  ) {
    const css = await withIsolation(
      [
        coreCss,
        compile(`themes/${brand}/${brand}-theme-basis.scss`),
        compile('../components/table/style/dnb-table.scss'),
        compile('../components/space/style/dnb-space.scss'),
        compile('../components/anchor/style/dnb-anchor.scss'),
        documentCss,
        printCss,
      ].join('\n'),
      isolated
    )
    await page.setContent(`<style>${css}</style>
      <main class="${isolated ? 'test-scope' : ''}">
        <p id="outside" class="dnb-p">Application text</p>
        ${nested ? '<div class="dnb-core-style"><div class="dnb-spacing">' : ''}
        <article class="dnb-document dnb-print ${nested ? '' : 'dnb-core-style dnb-spacing'} eufemia-theme eufemia-theme__color-scheme--light">
          <h1 id="heading">Avtalen din</h1>
          <h2 id="heading-component" class="dnb-h--x-large">Details</h2>
          <p id="plain">Hei Tobias</p>
          <p id="component" class="dnb-p dnb-t__responsive-on">Branded document text</p>
          <a id="link" class="dnb-anchor" href="https://example.com">Read more</a>
          <p id="lead" class="dnb-p dnb-lead">Important information</p>
          <p id="small" class="dnb-p dnb-t__size--small dnb-t__line-height--small">Small text</p>
          <h1 id="small-heading" class="dnb-h--medium">Explicit heading size</h1>
          <p id="spaced" class="dnb-p dnb-space__top--large dnb-space__bottom--large">Explicit spacing</p>
          <h1 id="spaced-heading" class="dnb-h--xx-large dnb-space__top--large">Explicit heading spacing</h1>
          <p id="signature" class="dnb-p dnb-document__signature dnb-print__keep-together">Vennlig hilsen<br>DNB</p>
          <footer id="footer" class="dnb-document__footer"><div><p id="footer-paragraph" class="dnb-p">Footer text</p></div></footer>
          <div class="dnb-document__signature"><p id="signature-paragraph" class="dnb-p">Signature text</p></div>
          <address id="return-address" class="dnb-document__return-address"><p id="return-address-paragraph">Return address</p></address>
          <table class="dnb-table"><thead><tr><th id="cell">Oversikt</th></tr></thead>
            <tbody><tr><td><p id="cell-paragraph" class="dnb-p">Beløp</p></td></tr>
              <tr><td id="right-cell" class="dnb-table__td" align="right">1 250,00</td></tr>
              <tr><td id="no-spacing" class="dnb-table__td dnb-table__td--no-spacing">No padding</td></tr>
              <tr><td id="horizontal-spacing" class="dnb-table__td dnb-table__td--spacing-horizontal">Horizontal padding</td></tr>
              <tr><td id="middle-cell" class="dnb-table__td dnb-table__td--vertical-align-middle">Middle</td></tr>
              <tr class="dnb-table__tr--vertical-align-bottom"><td id="bottom-cell" class="dnb-table__td">Bottom</td></tr>
              <tr><td id="aligned-cell" class="dnb-table__td dnb-t__align--right">Right</td></tr>
            </tbody></table>
          <p id="hidden" class="dnb-print-hidden">Screen only</p>
          ${tableMarkup}
        </article>
        ${nested ? '</div></div>' : ''}
      </main>
      ${isolated ? '<article class="dnb-document"><p id="unscoped">Outside scope</p></article>' : ''}`)
  }

  function styles(selector: string) {
    return page.locator(selector).evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        fontSize: parseFloat(style.fontSize),
        lineHeight: parseFloat(style.lineHeight),
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        marginTop: parseFloat(style.marginTop),
        marginBottom: parseFloat(style.marginBottom),
        paddingTop: parseFloat(style.paddingTop),
        paddingRight: parseFloat(style.paddingRight),
        borderBottomWidth: parseFloat(style.borderBottomWidth),
        textAlign: style.textAlign,
        verticalAlign: style.verticalAlign,
        color: style.color,
        display: style.display,
        breakAfter: style.breakAfter,
        breakInside: style.breakInside,
      }
    })
  }

  for (const isolated of [false, true]) {
    test(`supports an independent print scope without document styles (isolated: ${isolated})`, async () => {
      const css = await withIsolation(
        [
          coreCss,
          compile('themes/ui/ui-theme-basis.scss'),
          '.dnb-table__scroll-view { overflow: auto; max-height: 100px; clip-path: inset(0 round 8px); }',
          printCss,
        ].join('\n'),
        isolated
      )
      await page.setContent(`<style>${css}</style>
        <main class="${isolated ? 'test-scope' : ''}">
          <section class="dnb-print dnb-core-style eufemia-theme__color-scheme--light">
            <h2 id="print-heading">App content</h2>
            <p id="print-text" class="dnb-p">Existing typography and spacing</p>
            <div id="keep-together" class="dnb-print__keep-together">Short group</div>
            <div id="page-break" class="dnb-print__page-break">Next page</div>
            <div id="table-scroll" class="dnb-table__scroll-view">
              <table><thead><tr><th>Heading</th></tr></thead><tbody><tr id="print-row"><td>Row</td></tr></tbody><tfoot><tr><td>Total</td></tr></tfoot></table>
            </div>
            <p id="print-hidden" class="dnb-print-hidden">Screen only</p>
          </section>
          <article class="dnb-document"><h2 id="document-only-heading">Document without print scope</h2></article>
        </main>
        <section><h2 id="outside-heading">Outside print scope</h2></section>
        <section class="dnb-print"><h2 id="unisolated-heading">Outside isolation</h2></section>`)
      const text = await styles('#print-text')
      expect(text.fontSize).toBe(18)
      expect((await styles('#print-heading')).breakAfter).toBe('auto')
      expect((await styles('#print-hidden')).display).toBe('block')
      await page.emulateMedia({ media: 'print' })
      expect(await styles('#print-text')).toEqual(text)
      expect((await styles('#print-heading')).breakAfter).toBe('avoid')
      expect((await styles('#print-row')).breakInside).toBe('avoid')
      expect((await styles('#keep-together')).breakInside).toBe('avoid')
      expect(
        await page
          .locator('#page-break')
          .evaluate((element) => getComputedStyle(element).breakBefore)
      ).toBe('page')
      expect((await styles('#print-hidden')).display).toBe('none')
      expect((await styles('#document-only-heading')).breakAfter).toBe(
        'auto'
      )
      expect((await styles('#outside-heading')).breakAfter).toBe('auto')
      const table = await page
        .locator('#table-scroll')
        .evaluate((element) => {
          const style = getComputedStyle(element)
          return {
            overflow: style.overflow,
            maxHeight: style.maxHeight,
            clipPath: style.clipPath,
            headerDisplay: getComputedStyle(element.querySelector('thead'))
              .display,
            footerDisplay: getComputedStyle(element.querySelector('tfoot'))
              .display,
          }
        })
      expect(table).toEqual({
        overflow: 'visible',
        maxHeight: 'none',
        clipPath: 'none',
        headerDisplay: 'table-header-group',
        footerDisplay: 'table-footer-group',
      })
      expect((await styles('#unisolated-heading')).breakAfter).toBe(
        isolated ? 'auto' : 'avoid'
      )
      await page.emulateMedia({ media: 'screen' })
      expect(await styles('#print-text')).toEqual(text)
      expect((await styles('#print-heading')).breakAfter).toBe('auto')
      expect((await styles('#print-hidden')).display).toBe('block')
    })
  }

  for (const [brand, bodyFont, headingFont] of [
    ['ui', 'DNB', 'DNB'],
    ['sbanken', 'Roboto', 'MaisonNeueHeadings'],
    ['carnegie', 'DNB', 'ArizonaFlare'],
  ]) {
    test(`keeps ${brand} branding with the document scale`, async () => {
      await render(brand)
      const plain = await styles('#plain')
      const component = await styles('#component')
      const heading = await styles('#heading')
      expect(plain.fontSize).toBeCloseTo(14.6667, 2)
      expect(component.fontSize).toBeCloseTo(plain.fontSize, 2)
      expect(component.lineHeight).toBeCloseTo(20.5333, 2)
      expect(component.marginBottom).toBe(12)
      expect(component.fontFamily).toContain(bodyFont)
      expect(heading.fontSize).toBeCloseTo(18.6667, 2)
      expect(heading.fontFamily).toContain(headingFont)
      expect(heading.marginTop).toBe(0)
      expect((await styles('#outside')).fontSize).toBe(18)
    })
  }

  test('keeps document typography stable across viewport sizes', async () => {
    await render()
    const desktop = await styles('#component')
    await page.setViewportSize({ width: 320, height: 800 })
    expect(await styles('#component')).toEqual(desktop)
    await page.addStyleTag({ content: 'html { font-size: 125%; }' })
    expect((await styles('#component')).fontSize).toBeCloseTo(18.3333, 2)
  })

  test('uses document spacing for signatures and table cells', async () => {
    await render()
    const signature = await styles('#signature')
    const cell = await styles('#cell')
    expect(signature.fontSize).toBeCloseTo(13.3333, 2)
    expect(signature.marginTop).toBe(20)
    expect(cell.fontSize).toBeCloseTo(13.3333, 2)
    expect(cell.paddingTop).toBe(6)
    expect(cell.fontWeight).toBe('600')
    expect((await styles('#cell-paragraph')).fontSize).toBeCloseTo(
      cell.fontSize,
      2
    )
    expect((await styles('#cell-paragraph')).marginBottom).toBe(0)
  })

  test('keeps lead text distinct and respects explicit Space properties', async () => {
    await render()
    expect((await styles('#lead')).fontSize).toBe(16)
    expect((await styles('#spaced')).marginTop).toBe(32)
    expect((await styles('#spaced')).marginBottom).toBe(32)
    expect((await styles('#spaced-heading')).marginTop).toBe(32)
  })

  test('respects explicit typography size and line-height modifiers', async () => {
    await render()
    const small = await styles('#small')
    expect(small.fontSize).toBeCloseTo(13.3333, 2)
    expect(small.lineHeight).toBeCloseTo(18.6667, 2)
    expect((await styles('#small-heading')).fontSize).toBe(16)
  })

  test('applies pagination and screen-only visibility only in print', async () => {
    await render()
    expect((await styles('#hidden')).display).toBe('block')
    expect((await styles('#heading')).breakAfter).toBe('auto')
    await page.emulateMedia({ media: 'print' })
    expect((await styles('#hidden')).display).toBe('none')
    expect((await styles('#heading')).breakAfter).toBe('avoid')
    expect((await styles('#signature')).breakInside).toBe('avoid')
    expect((await styles('#component')).color).toBe('rgb(51, 51, 51)')
    expect((await styles('#outside')).fontSize).toBe(18)
  })

  test('preserves the template wrapper layout when print styles load last', async () => {
    await render()
    await page
      .locator('.dnb-document')
      .evaluate((element) => element.classList.add('letter'))
    await page.locator('style').evaluate((element) => {
      element.textContent =
        '@media print { .letter { max-width: 300px; overflow: hidden; box-shadow: 0px 2px 4px rgb(51, 51, 51); } }\n' +
        element.textContent
    })
    await page.emulateMedia({ media: 'print' })
    const layout = await page.locator('.letter').evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        maxWidth: style.maxWidth,
        overflow: style.overflow,
        shadow: style.boxShadow,
      }
    })
    expect(layout.maxWidth).toBe('300px')
    expect(layout.overflow).toBe('hidden')
    expect(layout.shadow).not.toBe('none')
  })

  for (const brand of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
    test(`preserves the ${brand} light brand palette in print`, async () => {
      await render(brand)
      const body = await styles('#component')
      const link = await styles('#link')
      await page.emulateMedia({ media: 'print' })
      expect((await styles('#component')).color).toBe(body.color)
      expect((await styles('#link')).color).toBe(link.color)
    })
  }

  test('supports isolated CSS without affecting another scope', async () => {
    await render('ui', true)
    expect((await styles('#plain')).fontSize).toBeCloseTo(14.6667, 2)
    expect((await styles('#unscoped')).fontSize).toBe(16)
  })

  for (const isolated of [false, true]) {
    test(`keeps document spacing inside nested core and spacing wrappers (isolated: ${isolated})`, async () => {
      await render('ui', isolated, true)
      expect((await styles('#component')).marginBottom).toBe(12)
      const heading = await styles('#heading-component')
      expect(heading.marginTop).toBe(20)
      expect(heading.marginBottom).toBe(8)
      expect((await styles('#signature')).marginTop).toBe(20)
      expect((await styles('#cell-paragraph')).marginBottom).toBe(0)
      expect((await styles('#spaced')).marginTop).toBe(32)
      expect((await styles('#spaced')).marginBottom).toBe(32)
      expect((await styles('#spaced-heading')).marginTop).toBe(32)
    })
  }

  test('preserves explicit table alignment and spacing options', async () => {
    await render()
    expect((await styles('#right-cell')).textAlign).toMatch(/right$/)
    expect((await styles('#aligned-cell')).textAlign).toBe('right')
    expect((await styles('#no-spacing')).paddingTop).toBe(0)
    expect((await styles('#no-spacing')).paddingRight).toBe(0)
    expect((await styles('#horizontal-spacing')).paddingTop).toBe(0)
    expect((await styles('#horizontal-spacing')).paddingRight).toBe(8)
    expect((await styles('#middle-cell')).verticalAlign).toBe('middle')
    expect((await styles('#bottom-cell')).verticalAlign).toBe('bottom')
  })

  function componentTable(
    size: 'large' | 'medium' | 'small',
    border?: boolean
  ) {
    // Match the class contract rendered by Table, Th and Td.
    return `<table class="dnb-table dnb-table__size--${size} ${border === false ? 'dnb-table--no-border' : ''}">
      <thead><tr class="dnb-table__tr"><th id="component-th" class="dnb-table__th">Amount</th></tr></thead>
      <tbody>
        <tr class="dnb-table__tr"><td id="component-td" class="dnb-table__td" align="right">1 250,00</td></tr>
        <tr class="dnb-table__tr"><th id="component-row-th" class="dnb-table__th" scope="row">Total</th></tr>
        <tr class="dnb-table__tr"><td id="component-no-spacing" class="dnb-table__td dnb-table__td--no-spacing">No padding</td></tr>
        <tr class="dnb-table__tr"><td id="component-horizontal" class="dnb-table__td dnb-table__td--spacing-horizontal dnb-table__td--vertical-align-middle">Horizontal padding</td></tr>
      </tbody>
    </table>`
  }

  for (const size of ['large', 'medium', 'small'] as const) {
    for (const isolated of [false, true]) {
      test(`keeps document cell padding for Table markup size=${size} (isolated: ${isolated})`, async () => {
        await render('ui', isolated, true, componentTable(size))
        for (const selector of [
          '#component-th',
          '#component-td',
          '#component-row-th',
        ]) {
          const cell = await styles(selector)
          expect(cell.paddingTop).toBe(6)
          expect(cell.paddingRight).toBe(8)
          expect(cell.fontSize).toBeCloseTo(13.3333, 2)
          expect(cell.lineHeight).toBeCloseTo(18.6667, 2)
        }
        expect((await styles('#component-td')).textAlign).toMatch(/right$/)
        expect((await styles('#component-no-spacing')).paddingTop).toBe(0)
        expect((await styles('#component-no-spacing')).paddingRight).toBe(
          0
        )
        expect((await styles('#component-horizontal')).paddingTop).toBe(0)
        expect((await styles('#component-horizontal')).paddingRight).toBe(
          8
        )
        expect((await styles('#component-horizontal')).verticalAlign).toBe(
          'middle'
        )
      })
    }
  }

  for (const isolated of [false, true]) {
    test(`preserves Table border=false in screen and print styles (isolated: ${isolated})`, async () => {
      await render('ui', isolated, true, componentTable('large', false))
      expect((await styles('#component-th')).borderBottomWidth).toBe(0)
      expect((await styles('#component-td')).borderBottomWidth).toBe(0)
      expect((await styles('#component-row-th')).borderBottomWidth).toBe(0)
      expect((await styles('#cell')).borderBottomWidth).toBe(1)
      await page.emulateMedia({ media: 'print' })
      expect((await styles('#component-th')).borderBottomWidth).toBe(0)
      expect((await styles('#component-td')).borderBottomWidth).toBe(0)
      expect((await styles('#cell')).borderBottomWidth).toBe(1)
    })
  }

  for (const brand of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
    for (const isolated of [false, true]) {
      test(`uses 9pt footer and return-address text with 10pt signatures for ${brand} (isolated: ${isolated})`, async () => {
        await render(brand, isolated, true)
        const expectTypography = async (scale = 1) => {
          for (const selector of [
            '#footer',
            '#footer-paragraph',
            '#return-address',
            '#return-address-paragraph',
          ]) {
            const text = await styles(selector)
            expect(text.fontSize).toBeCloseTo(12 * scale, 2)
            expect(text.lineHeight).toBeCloseTo(16.8 * scale, 2)
          }
          for (const selector of [
            '#signature',
            '#signature-paragraph',
            '#cell',
          ]) {
            const text = await styles(selector)
            expect(text.fontSize).toBeCloseTo(13.3333 * scale, 2)
            expect(text.lineHeight).toBeCloseTo(18.6667 * scale, 2)
          }
        }
        await expectTypography()
        await page.emulateMedia({ media: 'print' })
        await expectTypography()
        await page.addStyleTag({ content: 'html { font-size: 125%; }' })
        await expectTypography(1.25)
      })
    }
  }

  test('separates the import table and keeps code examples close to their introduction', async () => {
    await page.goto('/uilib/usage/customisation/styling/document-styles/')
    await expect(
      page.getByText(/^SCSS imports are also available/)
    ).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    const gaps = await page
      .locator('#tab-bar-content')
      .evaluate((root) => {
        const paragraphs = Array.from(root.querySelectorAll('p'))
        const scss = paragraphs.find((element) =>
          element.textContent.startsWith('SCSS imports')
        )
        const table = root.querySelector('.dnb-table__scroll-view')
        const intro = paragraphs.find((element) =>
          element.textContent.startsWith('Import dnb-ui-print')
        )
        const code = intro.nextElementSibling.querySelector('pre')
        const copyButton = intro.nextElementSibling.querySelector('button')
        return {
          afterTable:
            scss.getBoundingClientRect().top -
            table.getBoundingClientRect().bottom,
          beforeCode:
            code.getBoundingClientRect().top -
            intro.getBoundingClientRect().bottom,
          copyButtonTop:
            copyButton.getBoundingClientRect().top -
            code.getBoundingClientRect().top,
        }
      })
    expect.soft(gaps.afterTable).toBeGreaterThanOrEqual(32)
    expect.soft(gaps.beforeCode).toBeLessThanOrEqual(24)
    expect(gaps.copyButtonTop).toBeLessThanOrEqual(16)
  })

  test('uses Eufemia preview controls and leaves space above the title', async () => {
    await page.goto(
      '/uilib/usage/customisation/styling/document-styles/preview/'
    )
    await expect(
      page.locator('[data-document-preview] .dnb-dropdown')
    ).toBeVisible()
    await expect(
      page.locator('[data-document-preview] .dnb-checkbox')
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Print / save PDF' })
    ).toHaveClass(/dnb-button/)
    const topSpace = await page
      .locator('[data-document-preview]')
      .evaluate(
        (preview) =>
          preview.querySelector('h1').getBoundingClientRect().top -
          preview.getBoundingClientRect().top
      )
    expect(topSpace).toBeGreaterThanOrEqual(48)
    const dropdown = page.getByRole('combobox', { name: /^Brand/ })
    await dropdown.click()
    await page
      .getByRole('option', { name: 'Sbanken', exact: true })
      .click()
    await expect(
      page.locator('#letter .dnb-document__signature')
    ).toContainText('Sbanken')
    await expect(page.getByRole('listbox', { name: 'Brand' })).toBeHidden()
    await expect(dropdown).toBeFocused()
    await dropdown.press('Space')
    await expect(
      page.getByRole('listbox', { name: 'Brand' })
    ).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute(
      'data-dnb-drawer-list-active',
      await dropdown.getAttribute('id')
    )
    const selectedOption = page.getByRole('option', {
      name: 'Sbanken',
      exact: true,
    })
    await expect(selectedOption).toBeFocused()
    await selectedOption.press('ArrowDown')
    const nextOption = page.getByRole('option', {
      name: 'DNB Carnegie',
      exact: true,
    })
    await expect(nextOption).toBeFocused()
    await nextOption.press('Enter')
    await expect(
      page.locator('#letter .dnb-document__signature')
    ).toContainText('DNB Carnegie')
    await page.getByRole('checkbox', { name: 'Multi-page table' }).check()
    await expect(page.locator('#letter tbody tr')).toHaveCount(80)
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => {
      window.print = () => {
        document.body.dataset.printRequested = 'true'
      }
    })
    await page.getByRole('button', { name: 'Print / save PDF' }).click()
    await expect(page.locator('body')).toHaveAttribute(
      'data-print-requested',
      'true'
    )
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    test(`keeps preview controls readable in ${colorScheme} mode`, async () => {
      await page.addInitScript((scheme) => {
        localStorage.setItem(
          'eufemia-theme',
          JSON.stringify({ brand: 'ui', colorScheme: scheme })
        )
      }, colorScheme)
      await page.goto(
        '/uilib/usage/customisation/styling/document-styles/preview/'
      )
      await expect(
        page.getByRole('heading', {
          name: 'Document style preview',
          exact: true,
        })
      ).toBeVisible()
      await expect(page.locator('#letter')).toHaveCSS(
        'background-color',
        'rgb(255, 255, 255)'
      )
      const colors = await page
        .locator('[data-document-preview]')
        .evaluate((preview) => {
          const style = getComputedStyle(preview)
          const control = getComputedStyle(preview.querySelector('button'))
          const letter = getComputedStyle(preview.querySelector('#letter'))
          return {
            text: style.color,
            background: style.backgroundColor,
            controlText: control.color,
            controlBackground: control.backgroundColor,
            paper: letter.backgroundColor,
            paperText: letter.color,
          }
        })
      const luminance = (rgb: string) => {
        const channels = rgb
          .match(/\d+/g)
          .slice(0, 3)
          .map(Number)
          .map((value) => {
            const channel = value / 255
            return channel <= 0.04045
              ? channel / 12.92
              : ((channel + 0.055) / 1.055) ** 2.4
          })
        return (
          channels[0] * 0.2126 +
          channels[1] * 0.7152 +
          channels[2] * 0.0722
        )
      }
      const contrast = (text: string, background: string) => {
        const values = [luminance(text), luminance(background)]
        return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)
      }
      expect(
        contrast(colors.text, colors.background)
      ).toBeGreaterThanOrEqual(4.5)
      expect(
        contrast(colors.controlText, colors.controlBackground)
      ).toBeGreaterThanOrEqual(4.5)
      expect(
        contrast(colors.paperText, colors.paper)
      ).toBeGreaterThanOrEqual(4.5)
    })
  }
})
