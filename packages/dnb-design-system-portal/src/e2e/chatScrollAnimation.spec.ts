import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import type { Locator } from '@playwright/test'

async function waitForScrollToSettle(log: Locator) {
  await log.evaluate(
    (element) =>
      new Promise<void>((resolve, reject) => {
        let previous = element.scrollTop
        let stable = 0
        let frames = 0
        const sample = () => {
          stable =
            Math.abs(element.scrollTop - previous) < 0.5 ? stable + 1 : 0
          previous = element.scrollTop
          if (stable >= 8) {
            resolve()
          } else if (++frames > 180) {
            reject(new Error('Conversation did not finish scrolling'))
          } else {
            requestAnimationFrame(sample)
          }
        }
        requestAnimationFrame(sample)
      })
  )
}

test('moves existing messages smoothly from short to overflowing human chat history', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(
    '/web/patterns-and-extensions/chat/demos/#human-support-chat'
  )
  await waitForApp(page)
  const demo = page.locator('[data-visual-test="chat-human-support"]')
  const first = demo.locator('.dnb-ai-message').first()
  for (let index = 0; index < 4; index++) {
    await demo.locator('textarea').fill('Can you help me? ' + index)
    const before = await first.evaluate(
      (element) => element.getBoundingClientRect().top
    )
    const recording = await first.evaluateHandle((element) => {
      const positions: number[] = []
      let active = true
      const sample = () => {
        positions.push(element.getBoundingClientRect().top)
        if (active) {
          requestAnimationFrame(sample)
        }
      }
      requestAnimationFrame(sample)
      return {
        positions,
        stop: () => {
          active = false
        },
      }
    })
    await demo.locator('textarea').press('Enter')
    await expect
      .poll(() =>
        recording.evaluate(
          ({ positions }) =>
            new Set(positions.map((value) => Math.round(value))).size
        )
      )
      .toBeGreaterThan(5)
    await expect
      .poll(() =>
        demo.evaluate(
          (element) =>
            element
              .getAnimations({ subtree: true })
              .filter((animation) => animation.playState === 'running')
              .length
        )
      )
      .toBe(0)
    await expect
      .poll(() =>
        demo
          .getByRole('log')
          .evaluate(
            (element) =>
              element.scrollHeight -
              element.scrollTop -
              element.clientHeight
          )
      )
      .toBeLessThan(3)
    const positions = await recording.evaluate(({ stop, positions }) => {
      stop()
      return positions
    })
    const after = await first.evaluate(
      (element) => element.getBoundingClientRect().top
    )
    expect(after).toBeLessThan(before - 30)
    const largestStep = Math.max(
      ...positions
        .slice(1)
        .map((position, index) => Math.abs(position - positions[index]))
    )
    expect(largestStep).toBeLessThan((before - after) / 2)
    await recording.dispose()
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await demo.locator('textarea').fill('Without animation')
  await demo.locator('textarea').press('Enter')
  expect(
    await first.evaluate((element) => element.getAnimations().length)
  ).toBe(0)
})

for (const virtualized of [false, true]) {
  test(`animates appended history and preserves reader control, virtualized=${virtualized}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(
      '/web/patterns-and-extensions/chat/Conversation/demos/#virtualized-history'
    )
    await waitForApp(page)
    const demo = page.locator(
      '[data-visual-test="ai-virtualized-conversation"]'
    )
    if (!virtualized) {
      await demo
        .getByRole('button', { name: 'Show full transcript', exact: true })
        .click()
    }
    const log = demo.getByRole('log')
    const gap = () =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    await expect.poll(gap).toBeLessThan(3)
    await waitForScrollToSettle(log)
    const recording = await log.evaluateHandle((element) => {
      const positions: number[] = []
      const calls: string[] = []
      const original = element.scrollTo.bind(element)
      element.scrollTo = (
        options?: ScrollToOptions | number,
        y?: number
      ) => {
        if (typeof options === 'number') {
          calls.push('auto')
          original(options, y)
        } else {
          calls.push(options?.behavior ?? 'auto')
          original(options)
        }
      }
      element.addEventListener('scroll', () =>
        positions.push(element.scrollTop)
      )
      return { positions, calls }
    })
    const start = await log.evaluate((element) => element.scrollTop)
    await demo
      .getByRole('button', { name: 'Receive message', exact: true })
      .click()
    await expect.poll(gap).toBeLessThan(3)
    await waitForScrollToSettle(log)
    const end = await log.evaluate((element) => element.scrollTop)
    const result = await recording.evaluate((value) => value)
    expect(result.calls).toContain('smooth')
    expect(end).toBeGreaterThan(start + 30)
    expect(
      result.positions.some(
        (position) => position > start + 2 && position < end - 2
      )
    ).toBe(true)

    // A user wheel gesture stops following, even close to the latest message.
    await log.hover()
    await page.mouse.wheel(0, -180)
    await expect.poll(gap).toBeGreaterThan(50)
    await waitForScrollToSettle(log)
    const before = await log.evaluate((element) => element.scrollTop)
    await demo
      .getByRole('button', { name: 'Receive message', exact: true })
      .click()
    await expect
      .poll(() => log.evaluate((element) => element.scrollTop))
      .toBeCloseTo(before, 0)
    await expect(
      demo.getByText('Unread messages: yes', { exact: true })
    ).toBeVisible()

    const message = log
      .locator('[id^="history-"]')
      .filter({ visible: true })
      .first()
    const messageId = await message.getAttribute('id')
    const position = () =>
      log
        .locator('#' + messageId)
        .evaluate((element) => element.getBoundingClientRect().top)
    const anchoredTop = await position()
    await demo
      .getByRole('button', { name: 'Prepend history', exact: true })
      .click()
    await expect.poll(position).toBeCloseTo(anchoredTop, 0)

    await demo
      .getByRole('button', { name: 'Go to latest', exact: true })
      .click()
    await expect.poll(gap).toBeLessThan(3)
    await demo.evaluate((element) => {
      const receive = Array.from(element.querySelectorAll('button')).find(
        (button) => button.textContent === 'Receive message'
      )
      receive.click()
      setTimeout(() => receive.click(), 50)
    })
    await expect.poll(gap).toBeLessThan(3)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await demo
      .getByRole('button', { name: 'Go to latest', exact: true })
      .click()
    await expect.poll(gap).toBeLessThan(3)
    await recording.evaluate((value) => {
      value.calls.length = 0
    })
    await demo
      .getByRole('button', { name: 'Receive message', exact: true })
      .click()
    await expect.poll(gap).toBeLessThan(3)
    expect(await recording.evaluate((value) => value.calls)).not.toContain(
      'smooth'
    )
    await recording.dispose()
  })
}
