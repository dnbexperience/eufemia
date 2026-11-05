import { test, expect } from '@playwright/test'

test.use({
  browserName: 'webkit',
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  reducedMotion: 'no-preference',
})

test('defers heading measurements while the mobile TOC opens and closes', async ({
  page,
}) => {
  await page.goto('/web/components/button/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await page.evaluate(() => document.fonts.ready)
  // HeightAnimation bypasses animation immediately after mounting.
  await page.waitForTimeout(150)

  const transitions = await page.evaluate(async () => {
    const toc = document.querySelector('#portal-page-toc')
    const toggle = toc.querySelector<HTMLButtonElement>('button')
    const list = toc.querySelector<HTMLElement>(
      '.dnb-table-of-content__list-wrapper'
    )
    const original = Element.prototype.getBoundingClientRect
    let measurements = 0
    Element.prototype.getBoundingClientRect = function () {
      if (this.matches('main a.anchor-hash[id]')) {
        measurements++
      }
      return original.call(this)
    }

    try {
      const results: { frames: number; measurements: number }[] = []
      for (const expanded of [true, false]) {
        toggle.click()
        const start = performance.now()
        let frames = 0
        let duringAnimation = 0
        await new Promise<void>((resolve) => {
          const sample = () => {
            const elapsed = performance.now() - start
            if (elapsed > 100 && elapsed < 300) {
              if (
                list.classList.contains('dnb-height-animation--animating')
              ) {
                frames++
              }
              duringAnimation += measurements
            }
            measurements = 0
            if (elapsed < 650) {
              requestAnimationFrame(sample)
            } else {
              resolve()
            }
          }
          requestAnimationFrame(sample)
        })
        if (toggle.getAttribute('aria-expanded') !== String(expanded)) {
          throw new Error(
            'The disclosure did not reach its expected state'
          )
        }
        results.push({ frames, measurements: duringAnimation })
      }
      return results
    } finally {
      Element.prototype.getBoundingClientRect = original
    }
  })

  for (const transition of transitions) {
    expect(transition.frames).toBeGreaterThan(0)
    expect(transition.measurements).toBe(0)
  }
})
