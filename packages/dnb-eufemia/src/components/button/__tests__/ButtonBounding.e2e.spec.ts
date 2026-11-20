import { test, expect, type Locator } from '@playwright/test'
import { compileString } from 'sass'

let css: string

test.beforeAll(() => {
  css = compileString(
    `@use '../../../style/dnb-ui-core.scss';
     @use '../../../style/themes/ui/ui-theme-basis.scss';
     @use '../style/deps.scss';
     @use '../../date-picker/style/dnb-date-picker.scss';
     @use '../../help-button/style/dnb-help-button.scss';
     @use '../../card/style/dnb-card.scss';
     @use '../../tabs/style/dnb-tabs.scss';
     @use '../../breadcrumb/style/dnb-breadcrumb.scss';
     @use '../../../extensions/chat/style/dnb-chat.scss';`,
    { loadPaths: [__dirname], quietDeps: true }
  ).css
})

function button({
  id,
  size = 'default',
  variant = 'secondary',
  text = '',
  className = '',
  bounding = true,
}: {
  id: string
  size?: string
  variant?: string
  text?: string
  className?: string
  bounding?: boolean
}) {
  return `<button id="${id}" class="dnb-button dnb-button--${variant} dnb-button--size-${size} dnb-button--${text ? 'has-text' : 'icon-only'} ${className}">
    ${bounding ? '<span class="dnb-button__bounding"></span>' : ''}
    <span class="dnb-alignment-helper--pseudo-element-only dnb-button__alignment" aria-hidden="true"></span>
    ${text ? `<span class="dnb-button__text">${text}</span>` : '<span aria-hidden="true">→</span>'}
  </button>`
}

async function geometry(button: Locator) {
  return button.evaluate((element) => {
    const visible = element.getBoundingClientRect()
    const target = element
      .querySelector('.dnb-button__bounding')
      .getBoundingClientRect()

    return {
      width: visible.width,
      height: visible.height,
      left: visible.left - target.left,
      right: target.right - visible.right,
      top: visible.top - target.top,
      bottom: target.bottom - visible.bottom,
    }
  })
}

test('extends all sides equally for icon and text buttons without changing layout', async ({
  page,
}) => {
  await page.setContent(`<style>${css}</style><main style="padding: 40px; display: grid; gap: 40px; justify-items: start">
    ${['small', 'medium', 'default', 'large']
      .flatMap((size) =>
        ['primary', 'secondary', 'tertiary'].map((variant) =>
          [false, true]
            .map((text) =>
              button({
                id: `${size}-${variant}-${text}`,
                size,
                variant,
                text: text ? 'A wide text button' : '',
              })
            )
            .join('')
        )
      )
      .join('')}
  </main>`)

  for (const element of await page.locator('button').all()) {
    await test.step(await element.getAttribute('id'), async () => {
      const bounds = await geometry(element)
      for (const side of ['left', 'right', 'top', 'bottom'] as const) {
        expect(bounds[side]).toBeCloseTo(bounds.height * 0.2, 1)
      }

      const before = await element.boundingBox()
      await element
        .locator('.dnb-button__bounding')
        .evaluate((span) => span.remove())
      expect(await element.boundingBox()).toEqual(before)
    })
  }
})

test('accepts clicks beyond each visible edge only with bounding enabled', async ({
  page,
}) => {
  await page.setContent(`<style>${css}</style><main style="padding: 60px; display: flex; align-items: center; gap: 60px">
    ${button({ id: 'small', size: 'small' })}
    ${button({ id: 'text', text: 'A wide text button' })}
    ${button({ id: 'plain', bounding: false })}
  </main>`)
  await page.locator('button').evaluateAll((buttons) => {
    buttons.forEach((element) => {
      element.dataset.clicks = '0'
      element.addEventListener('click', () => {
        element.dataset.clicks = String(
          Number(element.dataset.clicks || 0) + 1
        )
      })
    })
  })

  for (const [id, clicks] of [
    ['small', '4'],
    ['text', '4'],
    ['plain', '0'],
  ]) {
    const element = page.locator(`#${id}`)
    const { x, y, width, height } = await element.boundingBox()
    const offset = height * 0.15
    for (const [clickX, clickY] of [
      [x - offset, y + height / 2],
      [x + width + offset, y + height / 2],
      [x + width / 2, y - offset],
      [x + width / 2, y + height + offset],
    ]) {
      await page.mouse.click(clickX, clickY)
    }
    await expect(element).toHaveAttribute('data-clicks', clicks)
  }
})

test('preserves the hit areas of built-in controls', async ({ page }) => {
  await page.setContent(`<style>${css}</style><main style="padding: 60px; display: grid; gap: 60px">
    <div class="dnb-date-picker"><table><tbody><tr class="dnb-date-picker__days">
      ${[1, 2].map((day) => `<td class="dnb-date-picker__day">${button({ id: `day-${day}`, size: 'medium', text: String(day) })}</td>`).join('')}
    </tr></tbody></table></div>
    ${button({ id: 'help', size: 'small', className: 'dnb-help-button' })}
    <div class="dnb-card" style="position: relative">
      ${button({ id: 'card-close', size: 'small', className: 'dnb-card__close-button' })}
      ${button({ id: 'card-media', size: 'medium', className: 'dnb-card__media-button' })}
    </div>
    <div class="dnb-tabs" style="position: relative; height: 40px">
      ${button({ id: 'tabs', size: 'medium', className: 'dnb-tabs__scroll-nav-button dnb-tabs__scroll-nav-button--visible' })}
    </div>
    <div class="dnb-breadcrumb dnb-breadcrumb--variant-responsive">
      ${button({ id: 'breadcrumb', className: 'dnb-breadcrumb__toggle', text: 'Show more' })}
    </div>
    <div class="dnb-ai-actions">
      ${[1, 2].map((id) => button({ id: `action-${id}`, size: 'small', variant: 'tertiary', className: 'dnb-ai-actions__action' })).join('')}
    </div>
  </main>`)
  await page.setViewportSize({ width: 600, height: 900 })

  for (const [id, scaleX, scaleY] of [
    ['day-1', 1.28, 1.28],
    ['help', 1.5, 1.5],
    ['tabs', 1.1, 1.4],
    ['breadcrumb', 1.1, 1.4],
    ['action-1', 1.1, 1.4],
  ] as const) {
    await test.step(id, async () => {
      const bounds = await geometry(page.locator(`#${id}`))
      expect(bounds.left).toBeCloseTo((bounds.width * (scaleX - 1)) / 2, 1)
      expect(bounds.right).toBeCloseTo(bounds.left, 1)
      expect(bounds.top).toBeCloseTo((bounds.height * (scaleY - 1)) / 2, 1)
      expect(bounds.bottom).toBeCloseTo(bounds.top, 1)
    })
  }

  for (const id of ['card-close', 'card-media']) {
    const bounds = await geometry(page.locator(`#${id}`))
    expect(bounds.width + bounds.left + bounds.right).toBeCloseTo(44, 1)
    expect(bounds.height + bounds.top + bounds.bottom).toBeCloseTo(44, 1)
  }

  for (const prefix of ['day', 'action']) {
    const first = page.locator(`#${prefix}-1 .dnb-button__bounding`)
    const second = page.locator(`#${prefix}-2 .dnb-button__bounding`)
    const firstBox = await first.boundingBox()
    const secondBox = await second.boundingBox()
    expect(firstBox.x + firstBox.width).toBeLessThanOrEqual(secondBox.x)
    for (const target of [first, second]) {
      const { x, y, width, height } = await target.boundingBox()
      const buttonId = await target.evaluate(
        (span) => span.parentElement.id
      )
      const hitId = await page.evaluate(
        ({ x, y }) =>
          document.elementFromPoint(x, y)?.closest('button')?.id,
        { x: x + width - 1, y: y + height / 2 }
      )
      expect(hitId).toBe(buttonId)
    }
  }
})
