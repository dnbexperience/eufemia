import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

async function waitForPanelAnimation(results: Locator) {
  await expect
    .poll(() =>
      results.evaluate((element) =>
        element
          .closest('.dnb-popover')
          ?.classList.contains('dnb-popover--active')
      )
    )
    .toBe(true)
  return results.evaluate(async (element) => {
    const animations =
      element.closest('.dnb-popover')?.getAnimations() ?? []
    await Promise.all(animations.map((animation) => animation.finished))
  })
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/components/search/demos/?fullscreen')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await expect(
    page.locator('[data-testid="search-compact"] input')
  ).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
})

for (const platform of ['MacIntel', 'Win32']) {
  test(`compact searches show the full placeholder beside the ${platform} shortcut`, async ({
    page,
  }) => {
    await page.addInitScript((platform) => {
      Object.defineProperty(navigator, 'platform', { value: platform })
      Object.defineProperty(navigator, 'userAgentData', {
        value: { platform },
      })
      window.localStorage.setItem('locale', 'en-GB')
    }, platform)
    await page.goto('/web/components/search/demos/?fullscreen')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
    await page.evaluate(() => document.fonts.ready)

    for (const selector of [
      '[data-testid="search-compact"] .dnb-search',
      '[data-testid="search-autocomplete-compact"] .dnb-search',
      '[data-testid="search-panel-compact"] .dnb-search',
      '[data-testid="search-panel"] .dnb-search',
    ]) {
      await test.step(selector, async () => {
        const search = page.locator(selector)
        await expect(search.locator('kbd')).toHaveText(
          platform === 'MacIntel' ? '⌘ K' : 'Ctrl K'
        )
        const { textWidth, availableWidth, textRight, shortcutLeft } =
          await search.evaluate((element) => {
            const placeholder = element.querySelector(
              '.dnb-input__placeholder'
            )
            const style = getComputedStyle(placeholder)
            const range = document.createRange()
            range.selectNodeContents(placeholder)
            const text = range.getBoundingClientRect()
            return {
              textWidth: text.width,
              availableWidth:
                placeholder.clientWidth -
                parseFloat(style.paddingLeft) -
                parseFloat(style.paddingRight),
              textRight: text.right,
              shortcutLeft: element
                .querySelector('kbd')
                .getBoundingClientRect().left,
            }
          })
        expect(textWidth).toBeLessThanOrEqual(availableWidth)
        expect(textRight).toBeLessThanOrEqual(shortcutLeft)
      })
    }

    await test.step('uses the platform modifier and respects other editors', async () => {
      const input = page.locator('[data-testid="search-compact"] input')
      const shortcut = platform === 'MacIntel' ? 'Meta+k' : 'Control+k'
      const otherShortcut =
        platform === 'MacIntel' ? 'Control+k' : 'Meta+k'
      await page.keyboard.press(otherShortcut)
      await expect(input).not.toBeFocused()
      await page.keyboard.press(shortcut)
      await expect(input).toBeFocused()

      await page.evaluate(() => {
        const fixture = document.createElement('div')
        fixture.id = 'shortcut-editors'
        fixture.innerHTML =
          '<input /><textarea></textarea><select><option>Option</option></select><input type="checkbox" /><div contenteditable="true"><span>Editable text</span></div>'
        document.body.append(fixture)
      })
      for (const selector of [
        'input:not([type])',
        'textarea',
        '[contenteditable]',
      ]) {
        const editor = page.locator('#shortcut-editors').locator(selector)
        await editor.focus()
        await page.keyboard.press(shortcut)
        await expect(editor).toBeFocused()
      }
      for (const selector of ['select', 'input[type="checkbox"]']) {
        await page.locator('#shortcut-editors').locator(selector).focus()
        await page.keyboard.press(shortcut)
        await expect(input).toBeFocused()
      }
    })
  })
}

for (const fixture of [
  'search-compact',
  'search-autocomplete-compact',
  'search-panel-compact',
  'search-panel',
]) {
  test(`${fixture} expands with the shortcut and collapses after clearing`, async ({
    page,
  }) => {
    const search = page.locator(`[data-testid="${fixture}"] .dnb-search`)
    const input = search.locator('input')
    const collapsed = (await search.boundingBox()).width
    await page
      .locator('.dnb-search--shortcut')
      .evaluateAll((elements, fixture) => {
        elements.forEach((element) => {
          if (!element.closest(`[data-testid="${fixture}"]`)) {
            element.setAttribute('hidden', '')
          }
        })
      }, fixture)
    await page.locator('h1').evaluate((heading) => {
      heading.setAttribute('tabindex', '-1')
      heading.focus()
    })
    await page.keyboard.press(
      (await search.locator('kbd').textContent()).includes('⌘')
        ? 'Meta+k'
        : 'Control+k'
    )
    await expect(input).toBeFocused()
    await expect
      .poll(async () => (await search.boundingBox()).width)
      .toBeGreaterThan(collapsed)
    await input.fill('Button')
    await page.keyboard.press('Escape')
    await page.keyboard.press('Escape')
    await expect(page.locator('h1')).toBeFocused()
    await expect(input).toHaveValue('Button')
    await input.focus()
    await expect(search.locator('kbd')).toBeHidden()
    await page.locator('h1').click()
    await expect(input).toHaveValue('Button')
    await expect
      .poll(async () => (await search.boundingBox()).width)
      .toBeGreaterThan(collapsed)
    await search.locator('.dnb-input__clear-button').click()
    await expect(input).toHaveValue('')
    await page.locator('h1').click()
    await expect
      .poll(async () => (await search.boundingBox()).width)
      .toBeCloseTo(collapsed, 0)
  })
}

for (const fixture of [
  'search-hero',
  'search-autocomplete-hero',
  'search-panel-hero',
]) {
  test(`${fixture} replaces the shortcut with an aligned clear button`, async ({
    page,
  }) => {
    const search = page.locator(`[data-testid="${fixture}"] .dnb-search`)
    const input = search.locator('input')
    const shortcut = search.locator('kbd')
    const clear = search.locator('.dnb-input__clear-button')
    await input.scrollIntoViewIfNeeded()
    await expect(shortcut).toBeVisible()
    const width = (await input.boundingBox()).width

    if (fixture === 'search-autocomplete-hero') {
      await input.evaluate((element) => {
        window.scrollTo({
          top: window.scrollY + element.getBoundingClientRect().top - 200,
          behavior: 'instant',
        })
      })
    }

    await input.fill('Button')
    await expect(shortcut).toBeHidden()
    await expect(clear).toBeVisible()
    const inputBox = await input.boundingBox()
    const clearBox = await clear.boundingBox()
    expect(inputBox.x + inputBox.width - clearBox.x - clearBox.width).toBe(
      16
    )
    expect(inputBox.width).toBe(width)

    if (fixture === 'search-autocomplete-hero') {
      await test.step('keeps the results below the hero field', async () => {
        const results = page.locator(
          '.dnb-drawer-list--bottom .dnb-autocomplete__list:visible'
        )
        await expect(results).toBeVisible()
        await expect
          .poll(async () => {
            const field = await input.boundingBox()
            const list = await results.boundingBox()
            return list.y - field.y - field.height
          })
          .toBeCloseTo(8, 0)
      })
    }

    await clear.click()
    await expect(input).toHaveValue('')
    await expect(input).toBeFocused()
    await expect(shortcut).toBeVisible()
    await expect(clear).toBeDisabled()
    await expect(clear).toHaveAttribute('aria-hidden', 'true')
    expect((await input.boundingBox()).width).toBe(width)
  })
}

test('supports native keyboard result selection and Escape', async ({
  page,
}) => {
  const input = page.locator('[data-testid="search-autocomplete"] input')
  await input.fill('But')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  await input.press('Enter')
  await expect(input).toHaveValue('But')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await input.fill('Inp')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await input.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
})

for (const name of [
  'Search components asynchronously',
  'Search components asynchronously in a panel',
]) {
  test(`${name} waits for data and cancels cleared queries`, async ({
    page,
  }) => {
    const fixture = page.locator('[data-testid="search-async"]')
    const input = fixture.getByRole('combobox', { name, exact: true })
    const search = fixture.locator('.dnb-search').filter({
      has: page.getByRole('combobox', { name, exact: true }),
    })
    const results = page.getByRole('listbox', { name, exact: true })
    await page.clock.install()

    await input.click()
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.dnb-search__panel')).toHaveCount(0)
    await input.fill('But')
    await expect(search).toHaveClass(/dnb-autocomplete--show-indicator/)
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.dnb-search__panel')).toHaveCount(0)

    await search.locator('.dnb-input__clear-button').click()
    await page.clock.runFor(600)
    await expect(input).toHaveValue('')
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(search).not.toHaveClass(
      /dnb-autocomplete--show-indicator/
    )
    await expect(page.locator('.dnb-search__panel')).toHaveCount(0)

    await input.fill('But')
    await page.clock.runFor(600)
    await expect(results).toBeVisible()
    await expect(results.getByRole('option').first()).toHaveText('Button')
    await page.clock.runFor(250)
    await input.press('ArrowDown')
    await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
    await input.press('Enter')
    await page.clock.runFor(250)
    await expect(input).toHaveAttribute('aria-expanded', 'false')

    await input.fill('zzzz')
    await page.clock.runFor(600)
    await expect(results).toBeVisible()
    await expect(
      results.locator('.dnb-autocomplete__no-options')
    ).toBeVisible()
    await search.locator('.dnb-input__clear-button').click()
    await page.clock.runFor(250)
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.dnb-search__panel')).toHaveCount(0)

    await input.fill('But')
    await input.press('Tab')
    await page.keyboard.press('Tab')
    await expect(input).not.toBeFocused()
    await page.clock.runFor(600)
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(results).toBeHidden()
  })
}

test('async panel keeps its visible label and input position stable on focus', async ({
  page,
}) => {
  const fixture = page.locator('[data-testid="search-async"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search components asynchronously in a panel',
    exact: true,
  })
  const label = fixture.locator('label').filter({
    hasText: 'Search components asynchronously in a panel',
  })

  for (const width of [900, 320]) {
    await test.step(`${width}px viewport`, async () => {
      await page.setViewportSize({ width, height: 900 })
      await input.scrollIntoViewIfNeeded()
      const before = await label.boundingBox()
      const inputBefore = await input.boundingBox()

      await input.focus()
      await expect(input).toHaveAttribute('aria-expanded', 'false')
      await expect
        .poll(async () => (await input.boundingBox()).width)
        .toBeGreaterThan(inputBefore.width)
      expect((await label.boundingBox()).height).toBe(before.height)
      expect((await label.boundingBox()).width).toBe(before.width)
      expect((await input.boundingBox()).y).toBe(inputBefore.y)

      await input.blur()
      expect((await label.boundingBox()).height).toBe(before.height)
      expect((await input.boundingBox()).y).toBe(inputBefore.y)
    })
  }
})

type ScrollableResults = HTMLElement & {
  scrollPositions: number[]
  scrollFinished: boolean
}

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`panel scrolls only past the visible results with ${reducedMotion} motion`, async ({
    page,
  }) => {
    test.setTimeout(60_000)

    const input = page
      .locator('[data-testid="search-panel"]')
      .getByRole('combobox', { name: 'Search with filters' })
    const results = page.getByRole('listbox', {
      name: 'Search with filters',
    })
    await input.scrollIntoViewIfNeeded()
    await page.emulateMedia({ reducedMotion })
    await input.focus()
    await expect(results).toBeVisible()
    expect(
      await results.evaluate(
        (list) => list.scrollHeight > list.clientHeight
      )
    ).toBe(true)
    await results.evaluate((list: ScrollableResults) => {
      list.scrollPositions = []
      list.scrollFinished = true
      list.addEventListener('scroll', () => {
        list.scrollPositions.push(list.scrollTop)
        list.scrollFinished = false
      })
      list.addEventListener('scrollend', () => {
        list.scrollFinished = true
      })
    })
    const pageScroll = await page.evaluate(() => window.scrollY)
    const panelContent = page.locator('.dnb-search__panel-content')
    const options = results.getByRole('option')
    await expect(options).toHaveCount(20)
    const count = await options.count()
    const positions = []
    let animated = false

    for (const [key, indexes] of [
      ['ArrowDown', Array.from({ length: count }, (_, index) => index)],
      [
        'ArrowUp',
        Array.from({ length: count - 1 }, (_, index) => count - index - 2),
      ],
    ] as const) {
      for (const index of indexes) {
        const before = await options.nth(index).evaluate((option) => {
          const list = option.closest(
            '[role="listbox"]'
          ) as ScrollableResults
          const box = list.getBoundingClientRect()
          const item = option.getBoundingClientRect()
          const visible =
            item.top >= box.top + 8 && item.bottom <= box.bottom - 8
          list.scrollPositions = []
          return { scrollTop: list.scrollTop, visible }
        })
        await input.press(key)
        await expect(options.nth(index)).toHaveClass(
          /dnb-drawer-list__option--focus/
        )
        await expect
          .poll(
            () =>
              options.nth(index).evaluate((option) => {
                const box = option
                  .closest('[role="listbox"]')
                  .getBoundingClientRect()
                const item = option.getBoundingClientRect()
                return (
                  item.top >= box.top + 7.5 &&
                  item.bottom <= box.bottom - 7.5
                )
              }),
            {
              message: `${key} reveals result ${index}`,
              intervals: [25, 50, 100],
            }
          )
          .toBe(true)
        await expect
          .poll(
            () =>
              results.evaluate(
                (list: ScrollableResults) => list.scrollFinished
              ),
            {
              message: `${key} finishes scrolling to result ${index}`,
              intervals: [25, 50, 100],
            }
          )
          .toBe(true)
        expect(
          await panelContent.evaluate((content) => content.scrollTop)
        ).toBe(0)
        const after = await results.evaluate((list) => list.scrollTop)
        if (before.visible) {
          expect(after).toBeCloseTo(before.scrollTop, 0)
        }
        const intermediate = await results.evaluate(
          (list: ScrollableResults, start) =>
            list.scrollPositions.some(
              (position) =>
                position > Math.min(start, list.scrollTop) + 1 &&
                position < Math.max(start, list.scrollTop) - 1
            ),
          before.scrollTop
        )
        animated ||= intermediate
        positions.push(after)
        expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
      }
    }
    expect(Math.max(...positions)).toBeGreaterThan(0)
    expect(positions.at(-1)).toBeCloseTo(0, 1)
    expect(animated).toBe(reducedMotion === 'no-preference')
  })
}

test('keeps all search types within a narrow container', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 })
  for (const fixture of [
    'search-hero',
    'search-compact',
    'search-autocomplete-hero',
    'search-autocomplete-compact',
    'search-panel-hero',
    'search-panel-compact',
  ]) {
    const search = page.locator(`[data-testid="${fixture}"] .dnb-search`)
    const input = search.locator('input')
    await input.scrollIntoViewIfNeeded()
    await input.focus()
    await input.fill('A long search query')
    const box = await search.boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(320)
    await expect(search.locator('kbd')).toBeHidden()
    await search.locator('.dnb-input__clear-button').click()
    await expect(input).toHaveValue('')
  }
})

test('panel uses available height above and below the input and resizes with the viewport', async ({
  page,
}) => {
  const search = page.locator('[data-testid="search-panel"] .dnb-search')
  const input = search.getByRole('combobox', {
    name: 'Search with filters',
  })
  const panel = page.locator('.dnb-search__panel')
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })

  await page.setViewportSize({ width: 900, height: 1000 })
  await search.evaluate((element: HTMLElement) => {
    Object.assign(element.style, {
      position: 'fixed',
      top: '64px',
      left: '64px',
      zIndex: '100',
    })
  })
  await input.focus()

  const expectFit = async (direction: 'top' | 'bottom') => {
    await expect
      .poll(async () => {
        const box = await panel.boundingBox()
        const trigger = await input.boundingBox()
        const height = page.viewportSize().height
        return (
          box.y >= 15 &&
          box.y + box.height <= height - 15 &&
          (direction === 'bottom'
            ? box.y >= trigger.y + trigger.height + 7
            : box.y + box.height <= trigger.y - 7)
        )
      })
      .toBe(true)
    await expect(
      page.getByRole('button', { name: /^Sort results:/ })
    ).toBeVisible()
    await expect(
      page.getByRole('radio', { name: 'Guidance', exact: true })
    ).toBeVisible()
    await expect
      .poll(() =>
        results.evaluate((list) => list.scrollHeight > list.clientHeight)
      )
      .toBe(true)
  }

  await expectFit('bottom')
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeGreaterThan(320)
  const tallHeight = (await results.boundingBox()).height

  // The maxHeight prop supplies this variable; verify the browser's layout cap.
  await panel.evaluate((element: HTMLElement) => {
    element.style.setProperty('--search-panel-max-height', '16rem')
  })
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeCloseTo(256, 0)
  await panel.evaluate((element: HTMLElement) => {
    element.style.removeProperty('--search-panel-max-height')
  })

  await page.setViewportSize({ width: 900, height: 600 })
  await expectFit('bottom')
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeLessThan(tallHeight - 200)
  await page.setViewportSize({ width: 900, height: 1000 })
  await expectFit('bottom')
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeCloseTo(tallHeight, 0)

  await input.press('Escape')
  await search.evaluate((element: HTMLElement) => {
    element.style.top = '850px'
  })
  await input.click()
  await expectFit('top')
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeGreaterThan(320)

  await input.fill('Button')
  await expect(results.getByRole('option')).toHaveCount(1)
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeCloseTo(160, 0)

  await test.step('keeps the top panel anchored while its content resizes', async () => {
    const gaps = await panel.evaluate(async (element) => {
      const input = document.querySelector<HTMLElement>(
        '[data-testid="search-panel"] input'
      )
      const gaps: number[] = []

      for (const height of ['20rem', '10rem']) {
        element.style.setProperty('--search-panel-min-height', height)
        await new Promise<void>((resolve) => {
          const observer = new ResizeObserver(() => {
            observer.disconnect()
            requestAnimationFrame(() => {
              gaps.push(
                input.getBoundingClientRect().top -
                  element.getBoundingClientRect().bottom
              )
              resolve()
            })
          })
          observer.observe(element)
        })
      }
      element.style.removeProperty('--search-panel-min-height')
      return gaps
    })

    for (const gap of gaps) {
      expect(gap).toBeCloseTo(8, 0)
    }
  })

  await panel.evaluate((element: HTMLElement) => {
    element.style.setProperty('--search-panel-min-height', '12rem')
  })
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeCloseTo(192, 0)
  await panel.evaluate((element: HTMLElement) => {
    element.style.setProperty('--search-panel-max-height', '8rem')
  })
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeCloseTo(128, 0)

  await panel.evaluate((element: HTMLElement) => {
    element.style.removeProperty('--search-panel-max-height')
  })
  await input.fill('')
  await input.press('Escape')
  await search.evaluate((element: HTMLElement) => {
    element.style.top = '225px'
  })
  await page.setViewportSize({ width: 640, height: 360 })
  await input.click()
  await expectFit('top')
  await expect
    .poll(async () => (await results.boundingBox()).height)
    .toBeLessThan(192)
  for (const control of [
    page.getByRole('button', { name: /^Sort results:/ }),
    page.getByRole('radio', { name: 'All', exact: true }),
  ]) {
    await page.keyboard.press('Tab')
    await expect(control).toBeFocused()
    await expect(control).toBeInViewport({ ratio: 1 })
  }
})

test('fixed panel stays anchored on every scroll frame', async ({
  page,
}) => {
  await page.goto(
    '/web/components/search/demos/?fullscreen&data-visual-test'
  )
  const search = page.locator(
    '[data-testid="search-panel-fixed"] .dnb-search'
  )
  await search.evaluate((element: HTMLElement) => {
    Object.assign(element.style, {
      position: 'fixed',
      top: '24px',
      left: '24px',
      zIndex: '100',
    })
    document.querySelector<HTMLElement>('main').style.paddingBottom =
      '100vh'
  })
  await search.locator('input').focus()
  const panel = page.locator('.dnb-search__panel')
  await waitForPanelAnimation(panel.getByRole('listbox'))
  await expect(panel).toHaveClass(/dnb-popover--fixed/)
  const gaps = await panel.evaluate(async (element) => {
    const input = document.querySelector(
      '[data-testid="search-panel-fixed"] input'
    )
    const gaps: number[] = []

    for (const delta of [100, 100, -100, -100]) {
      await new Promise<void>((resolve) => {
        window.addEventListener(
          'scroll',
          () => {
            requestAnimationFrame(() => {
              gaps.push(
                element.getBoundingClientRect().top -
                  input.getBoundingClientRect().bottom
              )
              resolve()
            })
          },
          { once: true }
        )
        window.scrollBy(0, delta)
      })
    }
    return gaps
  })

  for (const gap of gaps) {
    expect(gap).toBeCloseTo(8, 0)
  }
})

test('panel keeps its opening direction while scrolling', async ({
  page,
}) => {
  await page.evaluate(() => {
    document.querySelector<HTMLElement>('main').style.paddingBottom =
      '100vh'
  })
  await page.setViewportSize({ width: 900, height: 900 })
  const input = page.locator('[data-testid="search-panel"] input')
  const panel = page.locator('.dnb-search__panel')
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  const scrollInputTo = async (top: number) => {
    await input.evaluate((element, top) => {
      window.scrollBy(0, element.getBoundingClientRect().top - top)
    }, top)
    await expect
      .poll(async () => (await input.boundingBox()).y)
      .toBeCloseTo(top, 0)
  }
  const expectFit = async (placement: 'top' | 'bottom') => {
    await expect
      .poll(async () => {
        const surface = await panel.boundingBox()
        const trigger = await input.boundingBox()
        return (
          surface.y >= 15 &&
          surface.y + surface.height <= 885 &&
          (placement === 'top'
            ? surface.y + surface.height <= trigger.y - 7
            : surface.y >= trigger.y + trigger.height + 7)
        )
      })
      .toBe(true)
    await expect
      .poll(async () => (await results.boundingBox()).height)
      .toBeGreaterThanOrEqual(160)
    await expect(input).toBeFocused()
  }

  await scrollInputTo(600)
  await input.focus()
  await expectFit('top')
  await test.step('keeps the panel anchored on each scroll frame', async () => {
    const gaps = await panel.evaluate(async (element) => {
      const input = document.querySelector(
        '[data-testid="search-panel"] input'
      )
      const gaps: number[] = []

      for (const delta of [60, -60, 60, -60]) {
        await new Promise<void>((resolve) => {
          window.addEventListener(
            'scroll',
            () => {
              requestAnimationFrame(() => {
                gaps.push(
                  input.getBoundingClientRect().top -
                    element.getBoundingClientRect().bottom
                )
                resolve()
              })
            },
            { once: true }
          )
          window.scrollBy(0, delta)
        })
      }
      return gaps
    })

    for (const gap of gaps) {
      expect(gap).toBeCloseTo(8, 0)
    }
  })
  await scrollInputTo(400)
  await expectFit('top')
  await scrollInputTo(24)
  await expect(panel).toBeHidden()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
  await scrollInputTo(400)
  await input.press('ArrowDown')
  await expectFit('bottom')
  await scrollInputTo(460)
  await expectFit('bottom')
})

test('panel reveals keyboard results when controls fill a short viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 300 })
  const search = page.locator('[data-testid="search-panel"] .dnb-search')
  const input = search.getByRole('combobox')
  const panel = page.locator('.dnb-search__panel')
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  const options = results.getByRole('option')
  await search.evaluate((element: HTMLElement) => {
    Object.assign(element.style, {
      position: 'fixed',
      top: '24px',
      left: '16px',
      zIndex: '100',
    })
  })
  await input.focus()
  await expect(options).toHaveCount(20)
  await expect
    .poll(async () => {
      const surface = await panel.boundingBox()
      return surface.y >= 15 && surface.y + surface.height <= 285
    })
    .toBe(true)
  const pageScroll = await page.evaluate(() => window.scrollY)

  const closeBox = await panel
    .getByRole('button', { name: 'Lukk', exact: true })
    .boundingBox()
  const sortBox = await page
    .getByRole('button', { name: /^Sort results:/ })
    .boundingBox()
  expect(sortBox.y).toBeGreaterThanOrEqual(closeBox.y + closeBox.height)

  for (const [key, index] of [
    ['End', 19],
    ['Home', 0],
    ['PageDown', 19],
    ['PageUp', 0],
    ['ArrowDown', 1],
    ['ArrowDown', 2],
  ] as const) {
    await input.press(key)
    await expect(options.nth(index)).toHaveClass(
      /dnb-drawer-list__option--focus/
    )
    await expect
      .poll(async () => {
        const surface = await panel.boundingBox()
        const list = await results.boundingBox()
        const option = await options.nth(index).boundingBox()
        return (
          option.y >= surface.y + 7 &&
          option.y + option.height <= surface.y + surface.height - 7 &&
          option.y >= list.y + 7 &&
          option.y + option.height <= list.y + list.height - 7
        )
      })
      .toBe(true)
  }
  expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
  await expect(input).toBeFocused()

  for (const control of [
    page.getByRole('button', { name: /^Sort results:/ }),
    page.getByRole('radio', { name: 'All', exact: true }),
    panel.getByRole('button', { name: 'Lukk', exact: true }),
  ]) {
    await page.keyboard.press('Tab')
    await expect(control).toBeFocused()
    await expect
      .poll(async () => {
        const surface = await panel.boundingBox()
        const box = await control.boundingBox()
        return (
          box.y >= surface.y &&
          box.y + box.height <= surface.y + surface.height
        )
      })
      .toBe(true)
  }
  expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
})

test('panel stays closed when neither side has its minimum space', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 200 })
  const search = page.locator('[data-testid="search-panel"] .dnb-search')
  const input = search.getByRole('combobox')
  await search.evaluate((element: HTMLElement) => {
    Object.assign(element.style, {
      position: 'fixed',
      top: '100px',
      left: '24px',
    })
    window['expandedFrames'] = []
    const record = () => {
      window['expandedFrames'].push(
        element.querySelector('input').getAttribute('aria-expanded')
      )
      requestAnimationFrame(record)
    }
    requestAnimationFrame(record)
  })
  await input.focus()
  await input.pressSequentially('che')
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
  )
  expect(
    await page.evaluate(() => window['expandedFrames'])
  ).not.toContain('true')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
})

test('panel height changes stay anchored above without resize observer errors', async ({
  page,
}) => {
  await page.evaluate(() => {
    window['resizeErrors'] = []
    window.addEventListener('error', (event) => {
      if (event.message.includes('ResizeObserver')) {
        window['resizeErrors'].push(event.message)
      }
    })
  })
  await page.setViewportSize({ width: 900, height: 900 })
  const input = page.locator('[data-testid="search-panel"] input')
  await input.evaluate((element) => {
    document.querySelector<HTMLElement>('main').style.paddingBottom =
      '100vh'
    window.scrollBy(0, element.getBoundingClientRect().top - 650)
  })
  await input.focus()
  const panel = page.locator('.dnb-search__panel')
  await waitForPanelAnimation(panel.getByRole('listbox'))
  expect((await panel.boundingBox()).y).toBeLessThan(
    (await input.boundingBox()).y
  )
  await panel.evaluate((element) => {
    const input = document.querySelector(
      '[data-testid="search-panel"] input'
    )
    window['panelGaps'] = []
    window['recordPanelGaps'] = true
    const record = () => {
      if (!window['recordPanelGaps']) {
        return
      }
      window['panelGaps'].push(
        input.getBoundingClientRect().top -
          element.getBoundingClientRect().bottom
      )
      requestAnimationFrame(record)
    }
    requestAnimationFrame(record)
  })
  const all = page.getByRole('radio', { name: 'All', exact: true })
  const components = page.getByRole('radio', {
    name: 'Components',
    exact: true,
  })
  const guidance = page.getByRole('radio', {
    name: 'Guidance',
    exact: true,
  })
  await input.pressSequentially('che')
  await input.press('Backspace')
  await input.press('Backspace')
  await input.fill('a')
  for (let index = 0; index < 8; index++) {
    await components.click()
    await expect(components).toBeChecked()
    await page.keyboard.press('ArrowRight')
    await expect(guidance).toBeChecked()
    await input.fill('a')
    await input.press('ArrowDown')
    await all.click()
    await expect(all).toBeChecked()
  }
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
  )
  const gaps = await page.evaluate(() => {
    window['recordPanelGaps'] = false
    return window['panelGaps'] as number[]
  })
  expect(gaps.length).toBeGreaterThan(0)
  expect(Math.min(...gaps)).toBeGreaterThanOrEqual(7)
  expect(Math.max(...gaps)).toBeLessThanOrEqual(9)
  expect(await page.evaluate(() => window['resizeErrors'])).toEqual([])
})

test('panel keeps the keyboard focus outline inside the results viewport', async ({
  page,
}) => {
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  await input.focus()
  await expect(results).toBeVisible()
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  const focusRing = await results
    .locator('.dnb-drawer-list__option--focus')
    .evaluate((option) => {
      const bounds = option.getBoundingClientRect()
      const clip = option.parentElement.getBoundingClientRect()
      const shadow = getComputedStyle(option).boxShadow
      const spread = Number.parseFloat(shadow.match(/[\d.]+px/g)[3])
      return {
        spread,
        left: bounds.left - clip.left,
        right: clip.right - bounds.right,
      }
    })
  expect(focusRing.spread).toBeGreaterThan(0)
  expect(focusRing.left).toBeGreaterThanOrEqual(focusRing.spread)
  expect(focusRing.right).toBeGreaterThanOrEqual(focusRing.spread)
})

for (const variant of ['default', 'hero']) {
  test(
    'simple ' +
      variant +
      ' panel preserves the first focus ring without outer overflow',
    async ({ page }) => {
      const input = page.locator(
        '[data-testid="search-panel-' + variant + '"] input'
      )
      await input.scrollIntoViewIfNeeded()
      await input.focus()
      const panel = page.locator('.dnb-search__panel')
      await expect(panel).toBeVisible()
      await input.press('ArrowDown')
      await waitForPanelAnimation(panel.getByRole('listbox'))
      const geometry = await panel.evaluate((element) => {
        const content = element.querySelector('.dnb-search__panel-content')
        const option = element.querySelector(
          '.dnb-drawer-list__option--focus'
        )
        return {
          overflow: content.scrollHeight - content.clientHeight,
          top:
            option.getBoundingClientRect().top -
            content.getBoundingClientRect().top,
        }
      })
      expect(geometry.overflow).toBe(0)
      expect(geometry.top).toBeGreaterThanOrEqual(3)
    }
  )
}

test('panel restores results and keyboard navigation after clearing the query', async ({
  page,
}) => {
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const options = page
    .getByRole('listbox', { name: 'Search with filters' })
    .getByRole('option')

  await input.fill('But')
  await expect(options).toHaveText(['Button'])
  await fixture.locator('.dnb-input__clear-button').click()

  await expect(input).toHaveValue('')
  await expect(input).toBeFocused()
  await expect(options).toHaveText([
    'Input',
    'Button',
    'Table',
    'Accessibility',
    'Getting started',
    'Card',
    'Checkbox',
    'Dialog',
    'Drawer',
    'Dropdown',
    'Icon',
    'Radio',
    'Slider',
    'Switch',
    'Tooltip',
    'Colors',
    'Forms',
    'Layout',
    'Spacing',
    'Typography',
  ])
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    await options.first().getAttribute('id')
  )
  await input.press('Enter')
  await expect(fixture).toContainText('Selected: Input')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
})

test('panel supports results, chip filters, sorting, and natural keyboard focus', async ({
  page,
  browserName,
}) => {
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
  const reverseTab =
    browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  const description =
    'Search results include category filters and sorting. Use the arrow keys to navigate results and press Tab to reach the filters and sorting controls.'
  const announcement = fixture.locator(
    '.dnb-autocomplete > .dnb-aria-live:last-child'
  )
  await expect(input).toHaveAccessibleDescription(description)
  await input.focus()
  await expect(results).toBeVisible()
  await waitForPanelAnimation(results)
  await expect(
    page.getByRole('radiogroup', { name: 'Show results from' })
  ).toBeVisible()
  await expect(input).toHaveAccessibleDescription(description)
  await expect(announcement).toHaveText('20 alternativer')
  await expect(fixture.locator('input')).toHaveCount(1)
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  await input.press('Enter')
  await expect(
    fixture.getByText('Selected: Input', { exact: true })
  ).toBeVisible()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(results).toBeHidden()
  await input.click()
  await expect(results).toBeVisible()
  await waitForPanelAnimation(results)
  const sort = page.getByRole('button', { name: /^Sort results:/ })
  const pageScroll = await page.evaluate(() => window.scrollY)
  await input.press(tab)
  await expect(sort).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
  await page.keyboard.press(reverseTab)
  await expect(input).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
  await page.keyboard.press(tab)
  await page.keyboard.press(tab)
  await expect(
    page.getByRole('radio', { name: 'All', exact: true })
  ).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(
    page.getByRole('radio', { name: 'Components', exact: true })
  ).toBeChecked()
  await expect(
    page.getByRole('radio', { name: 'Components', exact: true })
  ).toBeFocused()
  await expect(results.getByRole('option')).toHaveCount(13)
  await expect(announcement).toHaveText('13 alternativer')
  await expect(sort).toBeInViewport()
  // Avoid Playwright scrolling the portaled button before the pointer click.
  const sortBox = await sort.boundingBox()
  await page.mouse.click(
    sortBox.x + sortBox.width / 2,
    sortBox.y + sortBox.height / 2
  )
  await expect(sort).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.getByRole('menu', { name: 'Sort results' })
  ).toBeFocused()
  await expect(
    page.getByRole('menuitem', { name: 'Alphabetical', exact: true })
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(sort).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(sort).toBeFocused()
  await expect(
    page.getByRole('menuitem', { name: 'Alphabetical', exact: true })
  ).toBeHidden()
  await sort.press('Enter')
  await expect(sort).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.getByRole('menu', { name: 'Sort results' })
  ).toBeFocused()
  await page.keyboard.press('End')
  await expect(
    page.getByRole('menuitem', { name: 'Alphabetical', exact: true })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(sort).toContainText('Alphabetical')
  await expect(sort).toBeFocused()
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(results.getByRole('option').first()).toHaveText('Button')

  await test.step('reaches field buttons and panel controls with a query', async () => {
    await input.focus()
    await input.fill('a')
    const clear = fixture.locator('.dnb-input__clear-button')
    await input.press(tab)
    await expect(clear).toBeFocused()
    await page.keyboard.press(tab)
    await expect(sort).toBeFocused()
    await page.keyboard.press(reverseTab)
    await expect(clear).toBeFocused()
    await page.keyboard.press(reverseTab)
    await expect(input).toBeFocused()
    await expect(input).toHaveAttribute('aria-expanded', 'true')
  })

  await input.focus()
  await input.fill('zzzz')
  await expect(results).toContainText('Ingen alternativer')
  await input.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
  await input.fill('')
  await input.click()
  await page.getByRole('button', { name: 'Lukk', exact: true }).focus()
  await page.keyboard.press(tab)
  await expect(input).not.toBeFocused()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
})

test('panel keeps nested sorting controls open through Tab keyup', async ({
  page,
  browserName,
}) => {
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
  const input = page.getByRole('combobox', { name: 'Search with filters' })
  const sort = page.getByRole('button', { name: /^Sort results:/ })
  const menu = page.getByRole('menu', { name: 'Sort results' })

  await input.scrollIntoViewIfNeeded()
  await input.focus()
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  await expect(results).toBeVisible()
  await waitForPanelAnimation(results)
  await input.press(tab)
  await expect(sort).toBeFocused()
  await sort.press('Enter')
  await expect(menu).toBeFocused()
  await page.keyboard.press(tab)
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect
    .poll(() =>
      sort.evaluate((button) => {
        const menu = document.getElementById(
          button.getAttribute('aria-controls')
        )
        return (
          document.activeElement === button ||
          !!menu?.contains(document.activeElement)
        )
      })
    )
    .toBe(true)
  await expect(input).toHaveAttribute('aria-expanded', 'true')
})

test('panel keeps the input and results stationary when tabbing through every control', async ({
  page,
  browserName,
}) => {
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
  const reverseTab =
    browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'
  const input = page.getByRole('combobox', { name: 'Search with filters' })
  const panel = page.locator('.dnb-search__panel')
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  const controls = [
    page.getByRole('button', { name: /^Sort results:/ }),
    page.getByRole('radio', { name: 'All', exact: true }),
    panel.getByRole('button', { name: 'Lukk', exact: true }),
  ]
  await page.evaluate(() => {
    document.querySelector<HTMLElement>('main').style.paddingBottom =
      '100vh'
  })
  await page.setViewportSize({ width: 900, height: 900 })

  for (const top of [650, 200]) {
    await test.step(`with the input at ${top}px`, async () => {
      await input.evaluate((element, top) => {
        window.scrollBy(0, element.getBoundingClientRect().top - top)
      }, top)
      await input.click()
      await expect(results.getByRole('option')).toHaveCount(20)
      await waitForPanelAnimation(results)
      await expect
        .poll(async () => {
          const surface = await panel.boundingBox()
          const trigger = await input.boundingBox()
          return top > 450
            ? Math.abs(surface.y + surface.height - trigger.y + 8)
            : Math.abs(surface.y - trigger.y - trigger.height - 8)
        })
        .toBeLessThan(1)
      const scroll = await page.evaluate(() => window.scrollY)
      const height = (await results.boundingBox()).height
      const expectStationary = async () => {
        expect(await page.evaluate(() => window.scrollY)).toBe(scroll)
        expect((await input.boundingBox()).y).toBeCloseTo(top, 0)
        expect((await results.boundingBox()).height).toBeCloseTo(height, 0)
      }

      for (const control of controls) {
        await page.keyboard.press(tab)
        await expect(control).toBeFocused()
        await expectStationary()
      }
      for (const control of [...controls.slice(0, -1).reverse(), input]) {
        await page.keyboard.press(reverseTab)
        await expect(control).toBeFocused()
        await expectStationary()
      }
      await input.press('Escape')
      await expect(panel).toBeHidden()
    })
  }
})

test('panel sorting menu stays above results and supports pointer selection', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const fixture = page.locator('[data-testid="search-panel"]')
  await fixture
    .getByRole('combobox', { name: 'Search with filters' })
    .focus()
  const input = fixture.getByRole('combobox')
  await page
    .getByText('Show results from', { exact: true })
    .first()
    .click()
  await expect(input).toBeFocused()
  const sort = page.getByRole('button', { name: /^Sort results:/ })
  await sort.click()
  const alphabetical = page.getByRole('menuitem', {
    name: 'Alphabetical',
    exact: true,
  })
  await expect
    .poll(() =>
      sort.evaluate((button) => {
        const icon = button
          .querySelector('.dnb-button__icon')
          .getBoundingClientRect()
        const arrow = document
          .getElementById(button.getAttribute('aria-controls'))
          ?.closest('.dnb-menu')
          ?.querySelector('.dnb-popover__arrow')
          ?.getBoundingClientRect()
        if (!arrow) {
          return Infinity
        }
        return Math.abs(
          icon.x + icon.width / 2 - (arrow.x + arrow.width / 2)
        )
      })
    )
    .toBeLessThan(1)
  await alphabetical.click()
  await expect(sort).toContainText('Alphabetical')
  await expect(
    page
      .getByRole('listbox', { name: 'Search with filters' })
      .getByRole('option')
      .first()
  ).toHaveText('Accessibility')
})

test('panel closes from controls and preserves outside interaction focus', async ({
  page,
}) => {
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const close = page.getByRole('button', {
    name: 'Lukk',
    exact: true,
  })

  // Keep the input and controls visible before testing pointer focus.
  await input.scrollIntoViewIfNeeded()
  await input.focus()
  await close.focus()
  await close.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
  await page.keyboard.type('dr')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await input.fill('')

  await input.click()
  await close.hover()
  const closeBounds = await close.boundingBox()
  await page.mouse.down()
  await expect(input).toBeFocused()
  expect(await close.boundingBox()).toEqual(closeBounds)
  await page.mouse.up()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
  await page.keyboard.type('dr')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await input.fill('')

  await input.click()
  const outsideInput = page.locator('[data-testid="search-default"] input')
  await outsideInput.click()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(outsideInput).toBeFocused()
})

test('panel keeps a visible edge in forced colors mode', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Forced colors emulation')
  await page.emulateMedia({
    forcedColors: 'active',
    reducedMotion: 'reduce',
  })
  const popover = page.locator('.dnb-search__panel')

  await page.locator('[data-testid="search-panel-default"] input').focus()
  await expect(popover).toBeVisible()
  await expect(popover).toHaveCSS('border-top-style', 'solid')
  await expect(popover).toHaveCSS('border-top-width', '1px')
})

test('keeps the panel within the viewport near either edge', async ({
  page,
}) => {
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const popover = page.locator('.dnb-search__panel')

  for (const width of [1000, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const side of ['left', 'right']) {
      await test.step(`${width}px, ${side} edge`, async () => {
        await fixture.evaluate((element, side) => {
          element.setAttribute(
            'style',
            `position: fixed; top: 100px; ${side}: 16px; width: 288px; z-index: 100;`
          )
        }, side)
        await input.focus()
        await expect(popover).toBeVisible()
        await expect
          .poll(async () => {
            const box = await popover.boundingBox()
            return box.x >= 15 && box.x + box.width <= width - 15
          })
          .toBe(true)
        await input.press('Escape')
        await expect(popover).toBeHidden()
        await input.blur()
      })
    }
  }
})

test('aligns the portaled surface with the left edge of the input', async ({
  page,
}) => {
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const popover = page.locator('.dnb-search__panel')
  await fixture.evaluate((element) => {
    element.style.cssText =
      'position: fixed; top: 100px; left: 400px; width: 400px;'
  })
  await input.focus()
  await expect(popover).toBeVisible()
  await expect
    .poll(async () => {
      const target = await input.boundingBox()
      const surface = await popover.boundingBox()
      return Math.abs(surface.x - target.x)
    })
    .toBeLessThan(1)
  await expect
    .poll(async () => {
      const target = await input.boundingBox()
      const surface = await popover.boundingBox()
      return Math.abs(surface.y - target.y - target.height - 8)
    })
    .toBeLessThan(1)
})

test('keeps search results above the Portal sidebar', async ({ page }) => {
  await page.goto(
    '/web/components/search/demos/#panel-with-filtering-and-sorting'
  )
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const fixture = page.locator('[data-testid="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  for (const width of [1280, 900]) {
    await test.step(width + 'px sidebar', async () => {
      await page.setViewportSize({ width, height: 900 })
      await input.scrollIntoViewIfNeeded()
      await input.focus()
      const results = page.getByRole('listbox', {
        name: 'Search with filters',
      })
      await expect(results).toBeVisible()
      await expect
        .poll(() =>
          results.getByRole('option').evaluateAll((options) =>
            options.slice(0, 3).every((option) => {
              const box = option.getBoundingClientRect()
              return option.contains(
                document.elementFromPoint(
                  box.x + 5,
                  box.y + box.height / 2
                )
              )
            })
          )
        )
        .toBe(true)
      await input.press('Escape')
      await input.blur()
    })
  }
})
