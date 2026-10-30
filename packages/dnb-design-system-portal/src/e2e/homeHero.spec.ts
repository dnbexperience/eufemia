import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const colorScheme of ['light', 'dark'] as const) {
  test(
    'keeps foreground ropes visible across the Carnegie card in ' +
      colorScheme,
    async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.setViewportSize({ width: 1600, height: 1000 })
      await page.goto('/')
      await waitForApp(page)
      await page.evaluate(() => document.fonts.ready)
      const card = await page
        .locator('[data-hanging-item=carnegie] [data-home-specimen]')
        .boundingBox()
      const rope = page.locator(
        '[data-hanging-item=eiendom] > span:first-child'
      )
      const box = await rope.boundingBox()
      const clip = {
        x: Math.floor(box.x) - 2,
        y: Math.floor(card.y + card.height * 0.75),
        width: 5,
        height: 6,
      }
      expect(clip.x).toBeGreaterThan(card.x)
      expect(clip.x + clip.width).toBeLessThan(card.x + card.width)
      const visible = await page.screenshot({ clip })
      await rope.evaluate((element) => {
        element.style.visibility = 'hidden'
        return new Promise<void>((resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => resolve())
          )
        )
      })
      const hidden = await page.screenshot({ clip })
      expect(visible.equals(hidden)).toBe(false)
    }
  )
}

for (const width of [1600, 800, 390]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      'has usable brand and appearance controls at ' +
        width +
        'px in ' +
        colorScheme,
      async ({ page }) => {
        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
        await page.setViewportSize({ width, height: 1000 })
        await page.goto('/')
        await waitForApp(page)
        await expect(page.locator('header')).not.toContainText('Search')
        await expect(page.locator('header #portal-tools')).toHaveCount(0)
        await expect(page.locator('#portal-search')).toHaveCount(0)
        const specimens = page.locator('[data-hanging-item]')
        await expect(specimens).toHaveCount(6)
        const palettes = () =>
          specimens.evaluateAll((items) =>
            items
              .slice(0, 4)
              .map((item) =>
                getComputedStyle(
                  item.querySelector('.eufemia-theme')
                ).getPropertyValue('--token-color-background-action')
              )
          )
        const before = await palettes()
        await page
          .getByRole('button', {
            name: 'Switch brand to Sbanken',
            exact: true,
          })
          .click()
        await expect(page.locator('body')).toHaveClass(
          /eufemia-theme__sbanken/
        )
        expect(await palettes()).toEqual(before)
        const dark = page.getByRole('switch', {
          name: 'Dark mode',
          exact: true,
        })
        await dark.click()
        await expect(dark).toBeChecked({
          checked: colorScheme === 'light',
        })
        const mode = colorScheme === 'light' ? 'dark' : 'light'
        await expect(page.locator('body')).toHaveClass(
          new RegExp('color-scheme--' + mode)
        )
        await page
          .getByRole('button', { name: 'Open settings', exact: true })
          .click()
        const drawer = page.getByRole('dialog', {
          name: 'Portal Tools',
          exact: true,
        })
        await expect(drawer).toBeVisible()
        await drawer.locator('.dnb-modal__close-button').click()
        await expect(drawer).toBeHidden()
        await expect(
          page.getByRole('button', {
            name: 'Open settings',
            exact: true,
          })
        ).toBeFocused()
        await page
          .getByRole('button', {
            name: 'Switch brand to DNB',
            exact: true,
          })
          .focus()
        await page.keyboard.press('Enter')
        await expect(page.locator('body')).toHaveClass(/eufemia-theme__ui/)
        await page.keyboard.press('Meta+k')
        await expect(page.locator('#portal-home-search')).toBeFocused()
        const layout = await specimens.evaluateAll((items) =>
          items.map((item) => {
            const box = item
              .querySelector('[data-home-specimen]')
              .getBoundingClientRect()
            return { left: box.left, right: box.right }
          })
        )
        for (const box of layout) {
          expect(box.left).toBeGreaterThanOrEqual(0)
          expect(box.right).toBeLessThanOrEqual(width)
        }
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth
          )
        ).toBe(true)
      }
    )
  }
}

test('swings after a drag without selecting a brand and settles at its attachment point', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/')
  await waitForApp(page)
  const sample = page.locator('[data-hanging-item=sbanken]')
  const specimen = sample.locator('[data-home-specimen]')
  const tilt = () =>
    specimen.evaluate((item) => {
      const matrix = new DOMMatrix(getComputedStyle(item).transform)
      return Math.atan2(matrix.m12, matrix.m11)
    })
  const restingTilt = await tilt()
  const box = await sample.locator('button').boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + 70, y - 25, { steps: 20 })
  await page.mouse.up()
  const angle = () =>
    sample.evaluate((item) =>
      parseFloat((item as HTMLElement).style.getPropertyValue('--swing'))
    )
  await expect.poll(angle).toBeGreaterThan(0.1)
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__ui/)
  const initial = await angle()
  await expect.poll(angle).not.toBe(initial)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(angle).toBe(0)
  await expect.poll(tilt).toBeCloseTo(restingTilt, 2)
})

test('restores the last brand when Carnegie is unchecked', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/')
  await waitForApp(page)
  for (const [brand, name] of [
    ['sbanken', 'Sbanken'],
    ['eiendom', 'DNB Eiendom'],
  ]) {
    await page
      .getByRole('button', {
        name: 'Switch brand to ' + name,
        exact: true,
      })
      .click()
    await expect(page.locator('body')).toHaveClass(
      new RegExp('eufemia-theme__' + brand + '(?: |$)')
    )
    const carnegie = page.getByRole('checkbox', {
      name: 'DNB Carnegie',
      exact: true,
    })
    await carnegie.check()
    await expect(page.locator('body')).toHaveClass(
      /eufemia-theme__carnegie/
    )
    await carnegie.uncheck()
    await expect(page.locator('body')).toHaveClass(
      new RegExp('eufemia-theme__' + brand + '(?: |$)')
    )
    await expect(carnegie).not.toBeChecked()
  }
})

for (const width of [320, 390, 640, 800, 1280, 1600]) {
  test(
    'keeps staggered controls suspended from the top at ' + width + 'px',
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await waitForApp(page)
      const positions = await page
        .locator('[data-hanging-item]')
        .evaluateAll((items) =>
          items.map((item) => {
            const tether = item
              .querySelector('span')
              .getBoundingClientRect()
            const specimen = item
              .querySelector('[data-home-specimen]')
              .getBoundingClientRect()
            return {
              top: tether.top + scrollY,
              x: tether.left,
              controlTop: specimen.top,
              left: specimen.left,
              right: specimen.right,
            }
          })
        )
      for (const position of positions) {
        if (width > 640) {
          expect(position.top).toBeCloseTo(0, 0)
        }
        expect(position.left).toBeGreaterThanOrEqual(0)
        expect(position.right).toBeLessThanOrEqual(width)
      }
      expect(
        new Set(
          positions.map(({ controlTop }) => Math.round(controlTop / 30))
        ).size
      ).toBeGreaterThan(3)
      const copy = await page.locator('#welcome-heading').boundingBox()
      if (width > 640) {
        expect(
          Math.min(...positions.map(({ left }) => left))
        ).toBeGreaterThan(copy.x + copy.width)
      }
    }
  )
}

test('leaves room to the right of the search shortcut', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/')
  await waitForApp(page)
  await expect(page.locator('[data-portal-home] kbd')).toBeVisible()
  const gap = await page
    .locator('#portal-home-search')
    .evaluate((input) => {
      const shell = input.closest('.dnb-input__shell')
      const shortcut = input
        .closest('.dnb-autocomplete')
        .querySelector('kbd')
      return (
        shell.getBoundingClientRect().right -
        shortcut.getBoundingClientRect().right
      )
    })
  expect(gap).toBeGreaterThanOrEqual(15)
})

for (const width of [390, 640, 1600]) {
  test(
    'keeps Dark mode above the floor shadows at ' + width + 'px',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/')
      await waitForApp(page)
      const clearance = await page
        .locator('[data-hanging-item=mode]')
        .evaluate((item) => {
          const specimen = item
            .querySelector('[data-home-specimen]')
            .getBoundingClientRect()
          const shadow = item
            .querySelector(':scope > span:last-child')
            .getBoundingClientRect()
          return shadow.top - specimen.bottom
        })
      expect(clearance).toBeGreaterThanOrEqual(20)
      if (width <= 640) {
        const copy = await page
          .locator('#portal-home-search')
          .boundingBox()
        const first = await page
          .locator('[data-hanging-item=ui] [data-home-specimen]')
          .boundingBox()
        expect(first.y).toBeGreaterThan(copy.y + copy.height)
      }
    }
  )
}

for (const width of [320, 390, 640]) {
  test(
    'keeps hero copy and search above hanging controls at ' + width + 'px',
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await waitForApp(page)
      for (const selector of ['#welcome-heading', '#portal-home-search']) {
        const unobstructed = await page
          .locator(selector)
          .evaluate((target) => {
            const box = target.getBoundingClientRect()
            const item = document.querySelector<HTMLElement>(
              '[data-hanging-item=carnegie]'
            )
            const anchor = item.getBoundingClientRect()
            const specimen = item.querySelector<HTMLElement>(
              '[data-home-specimen]'
            )
            // A lifted control must stay behind the hero's text and search.
            specimen.style.transform = 'none'
            specimen.style.top = box.top - anchor.top + 'px'
            specimen.style.left = box.left - anchor.left + 'px'
            specimen.style.width = box.width + 'px'
            return target.contains(
              document.elementFromPoint(box.x + box.width / 2, box.y + 10)
            )
          })
        expect(unobstructed).toBe(true)
      }
      const input = page.locator('#portal-home-search')
      await input.click()
      await input.fill('Date picker')
      await expect(input).toBeFocused()
      await expect(input).toHaveValue('Date picker')
    }
  )

  test(
    'extends narrow tethers to the top with controls close to search at ' +
      width +
      'px',
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await waitForApp(page)
      await expect
        .poll(() =>
          page
            .locator('[data-hanging-item] > span')
            .first()
            .evaluate((rope) => rope.getBoundingClientRect().top + scrollY)
        )
        .toBeCloseTo(0, 0)
      const search = await page
        .locator('#portal-home-search')
        .boundingBox()
      const items = await page
        .locator('[data-hanging-item]')
        .evaluateAll((items) =>
          items.map((item) => ({
            top:
              item.querySelector('span').getBoundingClientRect().top +
              scrollY,
            controlTop: item
              .querySelector('[data-home-specimen]')
              .getBoundingClientRect().top,
          }))
        )
      for (const item of items) {
        expect(item.top).toBeCloseTo(0, 0)
        expect(item.controlTop).toBeGreaterThan(search.y + search.height)
      }
      expect(
        Math.min(...items.map(({ controlTop }) => controlTop)) -
          (search.y + search.height)
      ).toBeLessThan(80)
    }
  )
}

test('loads optional physics on pointer intent and keeps controls usable if it fails', async ({
  page,
}) => {
  const requests: string[] = []
  page.on('request', (request) => {
    if (/\/hangingMotion[.-]/.test(request.url())) {
      requests.push(request.url())
    }
  })
  await page.route(/\/hangingMotion[.-]/, (route) => route.abort())
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await waitForApp(page)
  expect(requests).toHaveLength(0)
  const sbanken = page.getByRole('button', {
    name: 'Switch brand to Sbanken',
    exact: true,
  })
  await sbanken.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__sbanken/)
  expect(requests).toHaveLength(0)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await sbanken.hover()
  await expect.poll(() => requests.length).toBeGreaterThan(0)
  await page
    .getByRole('switch', { name: 'Dark mode', exact: true })
    .click()
  await expect(page.locator('body')).toHaveClass(/color-scheme--dark/)
  await page
    .getByRole('button', { name: 'Open settings', exact: true })
    .click()
  await expect(
    page.getByRole('dialog', { name: 'Portal Tools', exact: true })
  ).toBeVisible()
})

test('skips the physics download for reduced motion', async ({ page }) => {
  await page.clock.install()
  const requests: string[] = []
  page.on('request', (request) => {
    if (/\/hangingMotion[.-]/.test(request.url())) {
      requests.push(request.url())
    }
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await waitForApp(page)
  await page
    .getByRole('button', { name: 'Switch brand to Sbanken', exact: true })
    .click()
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__sbanken/)
  await page
    .getByRole('button', { name: 'Switch brand to Sbanken', exact: true })
    .hover()
  const design = page
    .getByRole('navigation', { name: 'Get started' })
    .getByRole('link')
    .first()
  await design.hover()
  await expect(design.locator('span[aria-hidden]').first()).toHaveCSS(
    'transform',
    'none'
  )
  await page.clock.fastForward(30_000)
  expect(requests).toHaveLength(0)
})

test('stops hover and automatic motion when reduced motion is enabled', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/')
  await waitForApp(page)
  const download = page.waitForResponse(/\/hangingMotion[.-]/)
  await page.clock.fastForward(2600)
  await (await download).finished()
  const angles = () =>
    page
      .locator('[data-hanging-item]')
      .evaluateAll((items) =>
        items.map(
          (item) =>
            Math.abs(
              parseFloat(
                (item as HTMLElement).style.getPropertyValue('--swing')
              )
            ) || 0
        )
      )
  await expect
    .poll(async () => {
      await page.clock.runFor(100)
      return (await angles()).filter((angle) => angle > 0.0001).length
    })
    .toBeGreaterThanOrEqual(2)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.clock.runFor(100)
  await page.clock.fastForward(30_000)
  await page
    .getByRole('button', { name: 'Switch brand to Sbanken', exact: true })
    .hover()
  await page.clock.runFor(200)
  expect(await angles()).toEqual([0, 0, 0, 0, 0, 0])
})

test('picks up a first drag while the optional physics download is pending', async ({
  page,
}) => {
  let finishDownload: () => void
  const gate = new Promise<void>((resolve) => {
    finishDownload = resolve
  })
  let requested: () => void
  const request = new Promise<void>((resolve) => {
    requested = resolve
  })
  await page.route(/\/hangingMotion[.-]/, async (route) => {
    requested()
    await gate
    await route.continue()
  })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/')
  await waitForApp(page)
  const sample = page.locator('[data-hanging-item=sbanken]')
  const box = await sample.locator('button').boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await request
  await page.mouse.down()
  await page.mouse.move(x + 70, y - 10, { steps: 10 })
  finishDownload()
  await expect
    .poll(() =>
      sample.evaluate(
        (item) =>
          parseFloat(
            (item as HTMLElement).style.getPropertyValue('--swing')
          ) || 0
      )
    )
    .toBeGreaterThan(0.1)
  await page.mouse.up()
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__ui/)
})

test('does not attach late physics after navigating away', async ({
  page,
}) => {
  let finishDownload: () => void
  const gate = new Promise<void>((resolve) => {
    finishDownload = resolve
  })
  let requested: () => void
  const request = new Promise<void>((resolve) => {
    requested = resolve
  })
  await page.route(/\/hangingMotion[.-]/, async (route) => {
    requested()
    await gate
    await route.continue()
  })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await waitForApp(page)
  await page
    .getByRole('button', { name: 'Switch brand to Sbanken', exact: true })
    .hover()
  await request
  await page.getByRole('link', { name: /Develop/ }).click()
  await expect(page).toHaveURL('/web/getting-started/')
  finishDownload()
  await expect(
    page.getByRole('heading', { name: 'Quick start', exact: true })
  ).toBeVisible()
  await expect(page.locator('[data-hanging-item]')).toHaveCount(0)
})
