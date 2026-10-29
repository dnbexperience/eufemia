import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.goto('/uilib/extensions/ai/Conversation/demos/')
  await waitForApp(page)
})

for (const mode of ['end', 'turn']) {
  test(
    'keeps backward keyboard focus visible in ' + mode + ' mode',
    async ({ page, browserName }) => {
      const demo = page.locator(
        '[data-visual-test="ai-virtualized-conversation"]'
      )
      const log = demo.getByRole('log')
      if (mode === 'turn') {
        await demo
          .getByRole('button', { name: 'Mode: end', exact: true })
          .click()
      }
      if (mode === 'end') {
        await demo
          .getByRole('button', { name: 'Go to latest', exact: true })
          .click()
      }
      const last = demo.getByRole('button', {
        name: 'Action 999',
        exact: true,
      })
      await last.focus()
      for (let index = 998; index >= 980; index--) {
        const action = demo.getByRole('button', {
          name: 'Action ' + index,
          exact: true,
        })
        if (browserName === 'webkit') {
          // WebKit's native Tab order follows the macOS keyboard setting.
          await action.focus()
        } else {
          await page.keyboard.press('Shift+Tab')
        }
        await expect(action).toBeFocused()
        await expect
          .poll(() =>
            action.evaluate((element) => {
              const viewport = element
                .closest('[role="log"]')
                .getBoundingClientRect()
              const bounds = element.getBoundingClientRect()
              return (
                bounds.top >= viewport.top &&
                bounds.bottom <= viewport.bottom
              )
            })
          )
          .toBe(true)
      }
      await demo
        .getByRole('button', { name: 'Extend latest reply', exact: true })
        .click()
      await expect
        .poll(() =>
          demo
            .getByRole('button', { name: 'Action 980', exact: true })
            .evaluate((element) => {
              const viewport = element
                .closest('[role="log"]')
                .getBoundingClientRect()
              const rect = element.getBoundingClientRect()
              return (
                rect.top >= viewport.top && rect.bottom <= viewport.bottom
              )
            })
        )
        .toBe(true)
      await expect(log).toHaveAttribute('aria-live', 'off')
    }
  )
}

test('uses smooth navigation unless reduced motion is requested', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const scrolling = await log.evaluateHandle((element) => {
    const calls: string[] = []
    const positions: number[] = []
    const original = element.scrollTo.bind(element)
    element.scrollTo = (options: ScrollToOptions | number, y?: number) => {
      if (typeof options === 'number') {
        original(options, y)
      } else {
        calls.push(options.behavior)
        original(options)
      }
    }
    const record = () => positions.push(element.scrollTop)
    element.addEventListener('scroll', record)
    return { calls, positions }
  })
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await expect(demo.locator('#history-100')).toBeInViewport()
  await expect
    .poll(() =>
      scrolling.evaluate(({ positions }) => new Set(positions).size)
    )
    .toBeGreaterThan(3)
  expect(await scrolling.evaluate(({ calls }) => calls)).toContain(
    'smooth'
  )
  await scrolling.evaluate(({ calls, positions }) => {
    calls.length = 0
    positions.length = 0
  })
  await demo
    .getByRole('button', { name: 'Go to latest', exact: true })
    .click()
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  expect(await scrolling.evaluate(({ calls }) => calls)).toContain(
    'smooth'
  )
  await demo
    .getByRole('button', { name: 'Mode: end', exact: true })
    .click()
  await scrolling.evaluate(({ calls }) => {
    calls.length = 0
  })
  await demo
    .getByRole('button', { name: 'Append turn', exact: true })
    .click()
  await expect(demo.locator('#history-1000')).toBeInViewport()
  expect(await scrolling.evaluate(({ calls }) => calls)).toContain(
    'smooth'
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await scrolling.evaluate(({ calls }) => {
    calls.length = 0
  })
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await expect(demo.locator('#history-100')).toBeInViewport()
  expect(await scrolling.evaluate(({ calls }) => calls)).not.toContain(
    'smooth'
  )
  await scrolling.dispose()
  expect(errors).toEqual([])
})

test('lets user scrolling interrupt smooth navigation', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await log.hover()
  await page.mouse.wheel(0, -80)
  const targetOffset = () =>
    log.evaluate((element) => {
      const target = element.querySelector('#history-100')
      return target
        ? target.getBoundingClientRect().top -
            element.getBoundingClientRect().top
        : null
    })
  // Cross the virtualizer's idle interval to catch a restarted destination.
  await page.waitForTimeout(300)
  const offset = await targetOffset()
  expect(offset === null || Math.abs(offset - 48) > 1).toBe(true)
  const top = await log.evaluate((element) => element.scrollTop)
  await page.waitForTimeout(300)
  expect(await log.evaluate((element) => element.scrollTop)).toBeCloseTo(
    top,
    0
  )
})

test('animates appended messages without animating recycled history', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const animations = await demo.evaluateHandle((element) => {
    const appended: string[] = []
    const animate = Element.prototype.animate
    Element.prototype.animate = function (...args) {
      const id = this.closest('[data-ai-message-id]')?.id
      if (id) {
        appended.push(id)
      }
      return animate.apply(this, args)
    }
    return {
      appended,
      restore: () => {
        Element.prototype.animate = animate
      },
    }
  })
  await demo
    .getByRole('button', { name: 'Append turn', exact: true })
    .click()
  expect(await animations.evaluate(({ appended }) => appended)).toEqual([
    'history-1000',
    'history-1001',
  ])
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await expect(demo.locator('#history-100')).toBeInViewport()
  expect(await animations.evaluate(({ appended }) => appended)).toEqual([
    'history-1000',
    'history-1001',
  ])
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await demo
    .getByRole('button', { name: 'Append turn', exact: true })
    .click()
  expect(
    await animations.evaluate(({ appended }) => appended)
  ).toHaveLength(2)
  await animations.evaluate(({ restore }) => restore())
  await animations.dispose()
})

test('preserves the regular message gap with and without virtualization', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  const regularGap = await page
    .locator(
      '.dnb-ai-conversation__content > .dnb-ai-message + .dnb-ai-message'
    )
    .first()
    .evaluate((element) => parseFloat(getComputedStyle(element).marginTop))
  expect(regularGap).toBe(16)
  for (const virtualized of [true, false]) {
    await demo
      .getByRole('button', { name: 'Short transcript', exact: true })
      .click()
    await expect(log.locator('.dnb-ai-message')).toHaveCount(2)
    await log.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        log.evaluate((element) => {
          const messages = element.querySelectorAll('.dnb-ai-message')
          return (
            messages[1]
              .querySelector('.dnb-ai-message__header')
              .getBoundingClientRect().top -
            messages[0].getBoundingClientRect().bottom
          )
        })
      )
      .toBeCloseTo(regularGap, 0)
    await expect
      .poll(() =>
        log.evaluate((element) => {
          const last = element.querySelectorAll('.dnb-ai-message')[1]
          return (
            element.getBoundingClientRect().bottom -
            last.getBoundingClientRect().bottom
          )
        })
      )
      .toBeCloseTo(0, 0)
    if (virtualized) {
      await demo
        .getByRole('button', { name: 'Show full transcript', exact: true })
        .click()
    }
  }
})

test('keeps visible messages stable while measuring older history', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  await demo
    .getByRole('button', { name: 'Go to latest', exact: true })
    .click()
  await log.hover()
  const movement = await log.evaluateHandle((element) => {
    const changes: number[] = []
    let previous = new Map<string, number>()
    function sample() {
      const top = element.getBoundingClientRect().top
      const next = new Map<string, number>()
      for (const row of element.querySelectorAll<HTMLElement>(
        '[data-ai-message-id]'
      )) {
        const rect = row.getBoundingClientRect()
        const offset = rect.top - top
        if (rect.bottom > top && offset < element.clientHeight) {
          if (previous.has(row.id)) {
            changes.push(offset - previous.get(row.id))
          }
          next.set(row.id, offset)
        }
      }
      previous = next
    }
    // Sample after measurement and before paint to catch a one-frame jump.
    const observer = new ResizeObserver(sample)
    function observeRows() {
      for (const row of element.querySelectorAll('[data-ai-message-id]')) {
        observer.observe(row)
      }
    }
    const mutations = new MutationObserver(observeRows)
    mutations.observe(element, { childList: true, subtree: true })
    observeRows()
    element.addEventListener('scroll', sample)
    sample()
    return { changes, observer, mutations, sample }
  })
  for (let step = 0; step < 30; step++) {
    await page.mouse.wheel(0, -60)
    await page.waitForTimeout(30)
  }
  const changes = await movement.evaluate(
    ({ changes, observer, mutations, sample }, element) => {
      observer.disconnect()
      mutations.disconnect()
      element.removeEventListener('scroll', sample)
      return changes
    },
    await log.elementHandle()
  )
  await movement.dispose()
  expect(changes.some((change) => change > 1)).toBe(true)
  expect(Math.min(...changes)).toBeGreaterThanOrEqual(-1)
})

test('allows slow scrolling in both directions and resumes following at the end', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  const distanceFromEnd = () =>
    log.evaluate(
      (element) =>
        element.scrollHeight - element.clientHeight - element.scrollTop
    )
  async function scrollSlowly(deltaY: number) {
    await log.hover()
    await page.mouse.wheel(0, deltaY)
    // Space small wheel movements across the virtualizer's scroll-idle reset.
    await page.waitForTimeout(250)
  }
  await demo
    .getByRole('button', { name: 'Go to latest', exact: true })
    .click()
  await expect.poll(distanceFromEnd).toBeLessThan(3)
  for (let step = 1; step <= 6; step++) {
    await scrollSlowly(-2)
    expect(await distanceFromEnd()).toBeCloseTo(step * 2, 0)
  }
  for (let step = 5; step >= 0; step--) {
    await scrollSlowly(2)
    expect(await distanceFromEnd()).toBeCloseTo(step * 2, 0)
  }
  await demo
    .getByRole('button', { name: 'Extend latest reply', exact: true })
    .click()
  await expect(demo.locator('#history-999')).toContainText(
    'Streaming response content'
  )
  await expect.poll(distanceFromEnd).toBeLessThan(3)
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await expect(demo.locator('#history-100')).toBeInViewport()
  const message = demo.locator('#history-100')
  const messageTop = () =>
    message.evaluate(
      (element) =>
        element.getBoundingClientRect().top -
        element.closest('[role="log"]').getBoundingClientRect().top
    )
  await expect.poll(messageTop).toBeCloseTo(48, 0)
  for (const delta of [-2, 2]) {
    await scrollSlowly(delta)
    expect(await messageTop()).toBeCloseTo(48 - Math.min(delta, 0), 0)
  }
})

test('windows history, navigates to unmounted messages and exposes the full transcript', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const rows = demo.locator('[data-ai-message-id]')
  const log = demo.getByRole('log')
  await expect(log).toHaveAttribute('aria-live', 'off')
  await expect.poll(() => rows.count()).toBeGreaterThan(0)
  expect(await rows.count()).toBeLessThan(40)
  await expect(demo.locator('#history-100')).toHaveCount(0)
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await expect(demo.locator('#history-100')).toBeInViewport()
  await expect(demo).toContainText('Current turn: history-100')
  await demo
    .getByRole('button', { name: 'Go to latest', exact: true })
    .click()
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  await demo
    .getByRole('button', { name: 'Show full transcript', exact: true })
    .click()
  await expect(demo.locator('.dnb-ai-conversation__item')).toHaveCount(
    1000
  )
  await expect(demo.locator('#history-100')).toHaveCount(1)
})

test('follows streaming at the end but keeps a reader stable on prepend', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  await demo
    .getByRole('button', { name: 'Go to latest', exact: true })
    .click()
  await demo
    .getByRole('button', { name: 'Extend latest reply', exact: true })
    .click()
  await expect(demo.locator('#history-999')).toContainText(
    'Streaming response content'
  )
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  await expect(demo.locator('#history-100')).toBeInViewport()
  await expect
    .poll(() =>
      demo
        .locator('#history-100')
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top -
            element.closest('[role="log"]').getBoundingClientRect().top
        )
    )
    .toBeCloseTo(48, 0)
  const before = 48
  await demo
    .getByRole('button', { name: 'Prepend history', exact: true })
    .click()
  await expect
    .poll(() =>
      demo
        .locator('#history-100')
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top -
            element.closest('[role="log"]').getBoundingClientRect().top
        )
    )
    .toBeCloseTo(before, 0)
  await demo
    .getByRole('button', { name: 'Extend latest reply', exact: true })
    .click()
  await expect
    .poll(() =>
      demo
        .locator('#history-100')
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top -
            element.closest('[role="log"]').getBoundingClientRect().top
        )
    )
    .toBeCloseTo(before, 0)
})

test('preserves focus outside the virtual range and anchors new user turns', async ({
  page,
  browserName,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  await demo
    .getByRole('button', { name: 'Go to message 100', exact: true })
    .click()
  const action = demo.getByRole('button', {
    name: 'Action 100',
    exact: true,
  })
  await action.focus()
  await log.evaluate((element) => {
    element.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
    element.scrollTop = element.scrollHeight
    element.dispatchEvent(new Event('scroll'))
  })
  await expect(action).toBeFocused()
  await expect
    .poll(() =>
      log.evaluate((element) => {
        const message = element.querySelector('#history-999')
        return (
          message &&
          message.getBoundingClientRect().top -
            element.getBoundingClientRect().top <
            element.clientHeight
        )
      })
    )
    .toBe(true)
  expect(await demo.locator('[data-ai-message-id]').count()).toBeLessThan(
    40
  )
  if (browserName !== 'webkit') {
    // WebKit follows macOS keyboard settings and skips native buttons on Tab.
    await action.press('Tab')
    await expect(
      demo.getByRole('button', { name: 'Action 101', exact: true })
    ).toBeFocused()
  }
  await demo
    .getByRole('button', { name: 'Mode: end', exact: true })
    .click()
  await demo
    .getByRole('button', { name: 'Append turn', exact: true })
    .click()
  await expect(demo.locator('#history-1000')).toBeInViewport()
  await expect
    .poll(() =>
      demo
        .locator('#history-1000')
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top -
            element.closest('[role="log"]').getBoundingClientRect().top
        )
    )
    .toBeCloseTo(48, 0)
})

test('keeps a reader in place during reply growth and aligns short history to the end', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-virtualized-conversation"]'
  )
  const log = demo.getByRole('log')
  await demo
    .getByRole('button', { name: 'Go to latest', exact: true })
    .click()
  await log.evaluate((element) => {
    element.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
    element.scrollTop -= 250
    element.dispatchEvent(new Event('scroll'))
  })
  const anchor = await log.evaluate((element) => {
    const top = element.getBoundingClientRect().top
    const row = Array.from(
      element.querySelectorAll<HTMLElement>('[data-ai-message-id]')
    ).find((item) => item.getBoundingClientRect().top >= top)
    return { id: row.id, top: row.getBoundingClientRect().top - top }
  })
  await demo
    .getByRole('button', { name: 'Extend latest reply', exact: true })
    .click()
  await expect
    .poll(() =>
      demo
        .locator('#' + anchor.id)
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top -
            element.closest('[role="log"]').getBoundingClientRect().top
        )
    )
    .toBeCloseTo(anchor.top, 0)
  await expect(
    demo.locator('.dnb-ai-conversation__scroll-button')
  ).toBeVisible()
  await demo.locator('.dnb-ai-conversation__scroll-button').click()
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  await page.setViewportSize({ width: 800, height: 900 })
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  await demo
    .getByRole('button', { name: 'Short transcript', exact: true })
    .click()
  await expect(demo.locator('[data-ai-message-id]')).toHaveCount(2)
  await expect
    .poll(() =>
      log.evaluate((element) => {
        const last = element.querySelector('#history-1')
        return Math.abs(
          last.getBoundingClientRect().bottom -
            element.getBoundingClientRect().bottom
        )
      })
    )
    .toBeLessThan(3)
})
