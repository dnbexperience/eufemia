import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

// Pages with a Popover and a DrawerList based Dropdown, which both close on an outside press
const components = [
  {
    name: 'Popover',
    path: '/web/components/popover/demos/',
    trigger: (page: Page) =>
      page.getByRole('button', { name: 'More info' }),
  },
  {
    name: 'Dropdown',
    path: '/web/components/dropdown/demos/',
    trigger: (page: Page) =>
      page.locator(
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger'
      ),
  },
]

async function openPage(page: Page, path: string) {
  // A stalled subresource can hold back the load event after the portal is ready
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true',
    { timeout: 15000 }
  )
}

// Fixed elements outside the component, above everything else on the page.
// Classic scrollbars, so they take up space, like on Windows, instead of overlay scrollbars.
async function addFixtures(page: Page) {
  await page.addStyleTag({
    content: `
      ::-webkit-scrollbar { width: 15px; height: 15px; }
      ::-webkit-scrollbar-thumb { background: gray; }
    `,
  })
  await page.evaluate(() => {
    const fixtures = document.createElement('div')
    fixtures.style.cssText =
      'position: fixed; right: 40px; bottom: 40px; z-index: 10000; display: flex; flex-wrap: wrap; max-width: 280px; gap: 8px; padding: 8px; background: white;'
    fixtures.innerHTML = `
      <div id="fixture-outside" style="width: 100px; height: 80px;">Outside</div>
      <div id="fixture-cancels-touch" style="width: 100px; height: 80px;">Map</div>
      <input id="fixture-input" aria-label="Outside input" style="width: 40px; padding: 0 40px;" />
      <div id="fixture-scrollbox" style="box-sizing: border-box; width: 120px; height: 80px; padding: 8px; overflow: auto;">
        <div style="height: 300px;">Scrollable</div>
      </div>
    `
    document.body.append(fixtures)

    // Like a map or a slider, which then gets no mouse events after a tap
    document
      .getElementById('fixture-cancels-touch')
      .addEventListener('touchstart', (event) => event.preventDefault(), {
        passive: false,
      })
  })
}

async function center(locator: Locator) {
  const box = await locator.boundingBox()
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

test.describe('outside press on a touch screen', () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })

  for (const { name, path, trigger } of components) {
    test(`${name} closes on a tap outside, but not on a touch that scrolls`, async ({
      page,
    }) => {
      await openPage(page, path)
      await addFixtures(page)

      const button = trigger(page)
      await button.scrollIntoViewIfNeeded()
      await button.tap()
      await expect(button).toHaveAttribute('aria-expanded', 'true')

      // A touch that moves like a scroll, sent as real touch input
      const start = await center(page.locator('#fixture-outside'))
      const cdp = await page.context().newCDPSession(page)
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [start],
      })
      for (const offset of [20, 40, 60]) {
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x: start.x, y: start.y - offset }],
        })
      }
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: [],
      })
      await expect(button).toHaveAttribute('aria-expanded', 'true')

      await page.locator('#fixture-outside').tap()
      await expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    test(`${name} closes on a tap on an element that cancels touchstart`, async ({
      page,
    }) => {
      await openPage(page, path)
      await addFixtures(page)

      const button = trigger(page)
      await button.scrollIntoViewIfNeeded()
      await button.tap()
      await expect(button).toHaveAttribute('aria-expanded', 'true')

      await page.locator('#fixture-cancels-touch').tap()
      await expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  }
})

test.describe('outside press with a mouse', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  for (const { name, path, trigger } of components) {
    test(`${name} stays open on a press on the page scrollbar or another scrollbar outside, but closes on a press next to it or on a text input`, async ({
      page,
    }) => {
      await openPage(page, path)
      await addFixtures(page)

      const scrollbox = page.locator('#fixture-scrollbox')
      const box = await scrollbox.boundingBox()
      const scrollbarWidth = await scrollbox.evaluate(
        (element: HTMLElement) => element.offsetWidth - element.clientWidth
      )
      expect(scrollbarWidth).toBeGreaterThan(0)

      const pageScrollbarWidth = await page.evaluate(
        () => window.innerWidth - document.documentElement.clientWidth
      )
      expect(pageScrollbarWidth).toBeGreaterThan(0)

      const button = trigger(page)
      await button.scrollIntoViewIfNeeded()
      await button.click()
      await expect(button).toHaveAttribute('aria-expanded', 'true')

      const viewport = page.viewportSize()
      await page.mouse.click(
        viewport.width - pageScrollbarWidth / 2,
        viewport.height / 2
      )
      await expect(button).toHaveAttribute('aria-expanded', 'true')

      // The thumb at the top of the scrollbar, so the press does not scroll
      await page.mouse.click(
        box.x + box.width - scrollbarWidth / 2,
        box.y + 4
      )
      await expect(button).toHaveAttribute('aria-expanded', 'true')

      // The padding of the same scroll box
      await page.mouse.click(box.x + 4, box.y + 4)
      await expect(button).toHaveAttribute('aria-expanded', 'false')

      // A text input with padding, which Chrome includes in clientLeft, like a scrollbar on the left
      await button.click()
      await expect(button).toHaveAttribute('aria-expanded', 'true')
      await page
        .locator('#fixture-input')
        .click({ position: { x: 6, y: 6 } })
      await expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  }
})
