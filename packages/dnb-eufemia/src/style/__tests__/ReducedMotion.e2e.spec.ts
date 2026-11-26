import { test, expect, type Page } from '@playwright/test'
import { compileString } from 'sass'
import path from 'node:path'
import postcss from 'postcss'
import isolatedStyleScopePlugin from '../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin.js'

// The documented setups: "core" (default), "basis" (legacy, with the
// "dnb-core-style" wrapper) and "isolated" (basis with a scope class).
for (const mode of ['core', 'basis', 'isolated']) {
  test.describe(`reduced motion with ${mode} styles`, () => {
    let css: string

    test.beforeAll(async () => {
      css = compileString(
        `
          @use 'style/dnb-ui-${mode === 'isolated' ? 'basis' : mode}.scss';
          @use 'style/themes/ui/ui-theme-basis.scss';
          @use 'components/form-status/style/dnb-form-status.scss';
          @use 'components/popover/style/dnb-popover.scss';
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
              scopeHash: 'eufemia-scope--reduced-motion-test',
              warnOnDeprecatedColorVariables: false,
            }),
          ]).process(css, { from: undefined })
        ).css
      }
    })

    const render = async (page: Page) => {
      await page.setContent(
        `
          <style>${css}</style>
          <div class="eufemia-scope--reduced-motion-test">
            <div class="${mode === 'core' ? '' : 'dnb-core-style'}">
              <span class="dnb-form-status dnb-form-status--error dnb-form-status--attention-focus">
                <span class="dnb-form-status__shell">Status</span>
              </span>
              <span class="dnb-popover dnb-popover--active">Popover</span>
              <span id="transition" style="transition: opacity 300ms">Transition</span>
            </div>
          </div>
        `,
        { waitUntil: 'domcontentloaded' }
      )
    }

    // Read computed durations in seconds, as they do not depend on timing
    const getDurations = (page: Page) => {
      return page.evaluate(() => {
        const read = (selector: string) => {
          const style = getComputedStyle(document.querySelector(selector))
          return {
            animation: parseFloat(style.animationDuration),
            transition: parseFloat(style.transitionDuration),
          }
        }
        return {
          formStatus: read('.dnb-form-status__shell').animation,
          popover: read('.dnb-popover').animation,
          transition: read('#transition').transition,
        }
      })
    }

    test('shortens animations and transitions when reduced motion is preferred', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await render(page)

      const durations = await getDurations(page)
      expect(durations.formStatus).toBeLessThan(0.001)
      expect(durations.popover).toBeLessThan(0.001)
      expect(durations.transition).toBeLessThan(0.001)
    })

    test('keeps animations and transitions when no preference is set', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await render(page)

      expect(await getDurations(page)).toEqual({
        formStatus: 2,
        popover: 0.2,
        transition: 0.3,
      })
    })
  })
}
