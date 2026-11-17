import { expect, test } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

test.beforeEach(async ({ page }) => {
  await page.goto('/web/components/dialog/visual-tests/viewport/')
})

test('fullscreen uses the available height and keeps the final action reachable', async ({
  page,
}) => {
  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 390, height: 664 },
    { width: 844, height: 390 },
  ]) {
    await test.step(`${viewport.width} × ${viewport.height}`, async () => {
      await page.setViewportSize(viewport)
      const trigger = page.getByRole('button', {
        name: 'Open dialog true',
        exact: true,
      })
      await trigger.click()
      const scrollView = page.locator('.dnb-dialog > .dnb-scroll-view')
      const bounds = await scrollView.boundingBox()
      expect(bounds.y).toBe(0)
      expect(bounds.height).toBe(viewport.height)
      await scrollView.evaluate((element) => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'instant',
        })
      })
      await page.getByTestId('final-action').click()
      await page.locator('.dnb-modal__close-button').click()
      await expect(page.locator('.dnb-dialog')).toHaveCount(0)
      await expect(trigger).toBeFocused()
    })
  }
})

test('Drawer body fills the remaining height as text and viewport sizes change', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.locator('html').evaluate((element) => {
    element.style.setProperty('font-size', '200%', 'important')
  })
  await page.getByRole('button', { name: 'Open short drawer' }).click()
  for (const fontSize of ['200%', '300%', '100%']) {
    await test.step(fontSize, async () => {
      await page.locator('html').evaluate((element, fontSize) => {
        element.style.setProperty('font-size', fontSize, 'important')
      }, fontSize)
      const drawer = page.locator('.dnb-drawer')
      await expect
        .poll(async () =>
          drawer.evaluate((element) => {
            const inner = element.querySelector('.dnb-drawer__inner')
            return (
              inner.getBoundingClientRect().bottom -
              element.getBoundingClientRect().bottom
            )
          })
        )
        .toBeGreaterThanOrEqual(-1)
      expect(
        await drawer.evaluate(
          (element) => element.scrollWidth - element.clientWidth
        )
      ).toBe(0)
    })
  }
  await page.setViewportSize({ width: 1280, height: 1000 })
  await page.locator('html').evaluate((element) => {
    element.style.setProperty('font-size', '200%', 'important')
  })
  await expect
    .poll(async () => {
      const inner = await page.locator('.dnb-drawer__inner').boundingBox()
      return inner.y + inner.height
    })
    .toBeGreaterThanOrEqual(1000)
})

test('top alignment does not offset a fullscreen Dialog', async ({
  page,
}) => {
  for (const [width, height, fullscreen] of [
    [1280, 800, true],
    [390, 664, 'auto'],
    [844, 390, 'auto'],
  ] as const) {
    await test.step(String(fullscreen), async () => {
      await page.setViewportSize({ width, height })
      await page
        .getByRole('button', {
          name: `Open top aligned dialog ${fullscreen}`,
          exact: true,
        })
        .click()
      const bounds = await page.locator('.dnb-dialog').boundingBox()
      expect(bounds.y).toBe(0)
      expect(bounds.height).toBe(height)
      await page.keyboard.press('Escape')
      await expect(page.locator('.dnb-dialog')).toHaveCount(0)
    })
  }
})

test('automatic fullscreen uses the existing small and medium breakpoints', async ({
  page,
}) => {
  for (const [width, height] of [
    [844, 390],
    [960, 480],
    [640, 800],
  ]) {
    await page.setViewportSize({ width, height })
    for (const name of ['Open dialog auto', 'Open drawer right']) {
      await test.step(`${name}: ${width} × ${height}`, async () => {
        await page.getByRole('button', { name, exact: true }).click()
        await expect
          .poll(() =>
            page.locator('.dnb-dialog, .dnb-drawer').boundingBox()
          )
          .toMatchObject({ x: 0, y: 0, width, height })
        await page.keyboard.press('Escape')
        await expect(page.locator('.dnb-modal__content')).toHaveCount(0)
      })
    }
  }
})

test('automatic fullscreen respects its limits and explicit opt-out', async ({
  page,
}) => {
  for (const [width, height] of [
    [960, 481],
    [961, 480],
    [641, 800],
    [1280, 390],
  ]) {
    await page.setViewportSize({ width, height })
    for (const name of ['Open dialog auto', 'Open drawer right']) {
      await test.step(`${name}: ${width} × ${height}`, async () => {
        await page.getByRole('button', { name, exact: true }).click()
        const bounds = await page
          .locator('.dnb-dialog, .dnb-drawer')
          .boundingBox()
        expect(bounds.width).toBeLessThan(width)
        await page.keyboard.press('Escape')
        await expect(page.locator('.dnb-modal__content')).toHaveCount(0)
      })
    }
  }

  await page.setViewportSize({ width: 844, height: 390 })
  for (const name of ['Open dialog false', 'Open drawer false']) {
    await test.step(name, async () => {
      await page.getByRole('button', { name, exact: true }).click()
      const bounds = await page
        .locator('.dnb-dialog, .dnb-drawer')
        .boundingBox()
      expect(bounds.width).toBeLessThan(844)
      await page.keyboard.press('Escape')
      await expect(page.locator('.dnb-modal__content')).toHaveCount(0)
    })
  }
})

test('bounded dialogs preserve scrolling, confirmation actions and fullscreen opt-out with enlarged text', async ({
  page,
}) => {
  const dialogs = [
    {
      name: 'Open dialog auto',
      maxHeight: 1,
      close: () => page.keyboard.press('Escape'),
    },
    {
      name: 'Open dialog false',
      maxHeight: 0.9,
      close: () => page.keyboard.press('Escape'),
    },
    {
      name: 'Open confirmation',
      maxHeight: 0.9,
      close: () =>
        page
          .getByRole('button', { name: 'Confirm choice', exact: true })
          .click(),
    },
  ]
  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 844, height: 390 },
    { width: 390, height: 664 },
  ]) {
    await page.setViewportSize(viewport)
    for (const fontSize of ['100%', '200%', '300%']) {
      await page.locator('html').evaluate((element, size) => {
        element.style.setProperty('font-size', size, 'important')
      }, fontSize)
      for (const { name, maxHeight, close } of dialogs) {
        await test.step(`${viewport.width} × ${viewport.height}, ${fontSize}, ${name}`, async () => {
          const trigger = page.getByRole('button', { name, exact: true })
          await trigger.click()
          const dialog = page.locator('.dnb-dialog')
          const bounds = await dialog.boundingBox()
          expect(bounds.y).toBeGreaterThanOrEqual(0)
          expect(bounds.y + bounds.height).toBeLessThanOrEqual(
            viewport.height
          )
          expect(bounds.height).toBeLessThanOrEqual(
            viewport.height * maxHeight
          )
          const scrollView = dialog.locator(':scope > .dnb-scroll-view')
          await scrollView.evaluate((element) => {
            element.scrollTo({
              top: element.scrollHeight,
              behavior: 'instant',
            })
          })
          await page.getByTestId('final-action').click()
          await close()
          await expect(dialog).toHaveCount(0)
          await expect(trigger).toBeFocused()
        })
      }
    }
  }
})

test('Drawer placements keep long content and the close action reachable', async ({
  page,
}) => {
  for (const placement of ['right', 'left', 'top', 'bottom']) {
    await test.step(placement, async () => {
      await page.setViewportSize({ width: 844, height: 390 })
      await page.locator('html').evaluate((element) => {
        element.style.setProperty('font-size', '200%', 'important')
      })
      const trigger = page.getByRole('button', {
        name: `Open drawer ${placement}`,
        exact: true,
      })
      await trigger.click()
      const drawer = page.locator('.dnb-drawer')
      await expect
        .poll(() => drawer.boundingBox())
        .toMatchObject({
          x: 0,
          y: 0,
          width: 844,
          height: 390,
        })
      await drawer.evaluate((element) => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'instant',
        })
      })
      await page.getByTestId('final-action').click()
      await drawer.locator('.dnb-modal__close-button').click()
      await expect(drawer).toHaveCount(0)
      await expect(trigger).toBeFocused()
    })
  }
})
