import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const demoUrl = '/web/components/badge/demos/#overlaid-button'

test('reserves a fixed corner offset for button badges across sizes and content widths', async ({
  page,
}) => {
  await page.goto(demoUrl)
  await waitForApp(page)

  for (const vertical of ['top', 'bottom']) {
    for (const horizontal of ['left', 'right']) {
      await test.step(`${vertical} ${horizontal}`, async () => {
        const measurements = await page
          .locator(
            '[data-visual-test="badge-button-sizes"] .dnb-badge__root'
          )
          .evaluateAll(
            (roots, { vertical, horizontal }) => {
              return roots.map((root) => {
                const badge = root.querySelector<HTMLElement>('.dnb-badge')
                badge.classList.remove(
                  'dnb-badge--vertical-top',
                  'dnb-badge--vertical-bottom',
                  'dnb-badge--horizontal-left',
                  'dnb-badge--horizontal-right'
                )
                badge.classList.add(
                  `dnb-badge--vertical-${vertical}`,
                  `dnb-badge--horizontal-${horizontal}`
                )

                if (
                  !root.parentElement.hasAttribute('data-badge-container')
                ) {
                  const container = document.createElement('span')
                  container.setAttribute('data-badge-container', '')
                  container.style.cssText =
                    'display: inline-flex; overflow: hidden'
                  root.replaceWith(container)
                  container.append(root)
                }
                const container = root.parentElement

                const badgeRect = badge.getBoundingClientRect()
                const buttonRect = root
                  .querySelector('button')
                  .getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()
                const textRect = root
                  .querySelector('.dnb-button__text')
                  .getBoundingClientRect()

                return {
                  labelGap:
                    horizontal === 'right'
                      ? badgeRect.left - textRect.right
                      : textRect.left - badgeRect.right,
                  horizontalOffset:
                    horizontal === 'right'
                      ? badgeRect.right - buttonRect.right
                      : buttonRect.left - badgeRect.left,
                  verticalOffset:
                    vertical === 'top'
                      ? buttonRect.top - badgeRect.top
                      : badgeRect.bottom - buttonRect.bottom,
                  contained:
                    badgeRect.left >= containerRect.left - 0.01 &&
                    badgeRect.right <= containerRect.right + 0.01 &&
                    badgeRect.top >= containerRect.top - 0.01 &&
                    badgeRect.bottom <= containerRect.bottom + 0.01,
                }
              })
            },
            { vertical, horizontal }
          )

        expect(measurements).toHaveLength(8)
        for (const measurement of measurements) {
          expect(measurement.horizontalOffset).toBeCloseTo(4)
          expect(measurement.verticalOffset).toBeCloseTo(4)
          expect(measurement.contained).toBe(true)
          expect(measurement.labelGap).toBeGreaterThanOrEqual(3.99)
        }
      })
    }
  }
})

test('keeps the notification center clickable on every button size and respects disabled buttons', async ({
  page,
}) => {
  await page.goto(demoUrl)
  await waitForApp(page)
  const root = page.locator(
    '[data-visual-test="badge-button"] .dnb-badge__root'
  )
  const button = root.locator('button')
  const badge = root.locator('.dnb-badge')
  let count = 1

  for (const size of ['small', 'medium', 'default', 'large']) {
    await test.step(size, async () => {
      await button.evaluate((element, size) => {
        element.classList.remove(
          'dnb-button--size-small',
          'dnb-button--size-medium',
          'dnb-button--size-default',
          'dnb-button--size-large'
        )
        element.classList.add(`dnb-button--size-${size}`)
      }, size)
      await badge.scrollIntoViewIfNeeded()
      const bounds = await badge.boundingBox()
      await page.mouse.click(
        bounds.x + bounds.width / 2,
        bounds.y + bounds.height / 2
      )
      await expect(badge).toHaveText(`Notifications ${++count}`)
    })
  }

  await button.evaluate((element: HTMLButtonElement) => {
    element.disabled = true
  })
  const bounds = await badge.boundingBox()
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  )
  await expect(badge).toHaveText(`Notifications ${count}`)
})

test('updates label space when the notification count grows', async ({
  page,
}) => {
  await page.goto(demoUrl)
  await waitForApp(page)
  const root = page.locator(
    '[data-visual-test="badge-button"] .dnb-badge__root'
  )
  const button = root.locator('button')
  const badge = root.locator('.dnb-badge')
  const initialWidth = (await button.boundingBox()).width

  await button.evaluate((element: HTMLButtonElement) => {
    for (let count = 1; count < 100; count++) {
      element.click()
    }
  })
  await expect(badge).toHaveText('Notifications 100')
  await expect
    .poll(async () => (await button.boundingBox()).width)
    .toBeGreaterThan(initialWidth)

  const countWidth = (await button.boundingBox()).width
  await badge.evaluate((element: HTMLElement) => {
    element.style.fontSize = '2rem'
  })
  await expect
    .poll(async () => (await button.boundingBox()).width)
    .toBeGreaterThan(countWidth)
})
