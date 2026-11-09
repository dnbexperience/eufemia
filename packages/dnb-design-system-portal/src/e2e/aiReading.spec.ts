import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.goto('/web/patterns-and-extensions/chat/Conversation/demos/')
  await waitForApp(page)
})

test('returns to the latest user turn after sending from older history', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-conversation-reading"]')
  const log = demo.getByRole('log')
  await log.evaluate((element) => {
    element.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, deltaY: -1200 })
    )
    element.scrollTop = 0
    element.dispatchEvent(new Event('scroll'))
  })
  await expect
    .poll(() => log.evaluate((element) => element.scrollTop))
    .toBeLessThan(100)
  await demo.locator('textarea').fill('Next question')
  await demo.locator('textarea').press('Enter')
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  await expect(log.locator('.dnb-ai-message--user').last()).toContainText(
    'Next question'
  )
})

test('marks newly received replies as unread without treating history or streaming as new', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-conversation-reading"]')
  const log = demo.getByRole('log')
  await expect(
    demo.getByText('Unread messages: no', { exact: true })
  ).toBeVisible()
  await log.evaluate((element) => {
    element.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, deltaY: -1200 })
    )
    element.scrollTop = 0
    element.dispatchEvent(new Event('scroll'))
  })
  await expect
    .poll(() => log.evaluate((element) => element.scrollTop))
    .toBeLessThan(100)
  await demo
    .getByRole('button', { name: 'Extend reply', exact: true })
    .click()
  await expect(
    demo.getByText('Unread messages: no', { exact: true })
  ).toBeVisible()
  await demo
    .getByRole('button', { name: 'Receive message', exact: true })
    .click()
  await expect(
    demo.getByText('Unread messages: yes', { exact: true })
  ).toBeVisible()
  const latest = demo.getByRole('button', {
    name: 'Ny melding. Gå til siste melding',
    exact: true,
  })
  await expect(latest).toHaveText('Ny melding')
  await latest.click()
  await expect(
    demo.getByText('Unread messages: no', { exact: true })
  ).toBeVisible()
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
})

test('keeps the end visible as a multiline draft changes and the viewport shrinks', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-conversation-reading"]')
  const log = demo.getByRole('log')
  const textarea = demo.locator('textarea')
  const gap = () =>
    log.evaluate(
      (element) =>
        element.scrollHeight - element.clientHeight - element.scrollTop
    )
  await textarea.fill(
    ['First line', 'Second line', 'Third line', 'Fourth line'].join(
      String.fromCharCode(10)
    )
  )
  await expect.poll(gap).toBeLessThan(3)
  await textarea.press('End')
  await textarea.pressSequentially('a')
  await expect.poll(gap).toBeLessThan(3)
  await page.setViewportSize({ width: 390, height: 460 })
  await expect.poll(gap).toBeLessThan(3)
})

test('keeps a focused older reply visible as the latest reply grows', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-conversation-reading"]')
  const log = demo.getByRole('log')
  const button = log.getByRole('button', { name: 'Reply details' }).first()
  await button.focus()
  await expect(button).toBeInViewport()
  await expect
    .poll(() => log.evaluate((element) => element.scrollTop))
    .toBeLessThan(100)
  const top = await log.evaluate((element) => element.scrollTop)
  await demo
    .getByRole('button', { name: 'Extend reply', exact: true })
    .click()
  await expect
    .poll(() => log.evaluate((element) => element.scrollTop))
    .toBeCloseTo(top, 0)
  await expect(button).toBeInViewport()
})

test('announces rendered reply text and reports a stopped reply', async ({
  page,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/demos/')
  await waitForApp(page)
  const chat = page.locator('[data-visual-test="ai-chat"]')
  await chat.getByRole('button', { name: /Compare my spending/ }).click()
  const region = chat.locator('.chat > .dnb-aria-live')
  await expect(region).toContainText('6', { timeout: 15000 })
  const text = await region.innerText()
  expect(text).not.toContain('**')
  expect(text).not.toContain('|')
  expect(text).not.toContain(':--')
  await chat.locator('textarea').fill('What loan offers do you have?')
  await chat.locator('textarea').press('Enter')
  await expect(chat.locator('.dnb-ai-response').last()).toContainText(
    'Sorry'
  )
  await chat.getByRole('button', { name: 'Stop', exact: true }).click()
  await expect(chat.locator('.dnb-ai-message').last()).toContainText(
    'Reply stopped.'
  )
  await expect(region).toContainText('Reply stopped.')
  expect(await region.innerText()).not.toContain('https://')
})

test('preserves browser navigation and text selection while a reply grows', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-conversation-reading"]')
  const log = demo.getByRole('log')
  await log.scrollIntoViewIfNeeded()
  await expect
    .poll(() =>
      log.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop
      )
    )
    .toBeLessThan(3)
  await log.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  )
  const first = log.locator('.dnb-ai-message').first()
  await first.evaluate((element) =>
    element.scrollIntoView({ block: 'start', behavior: 'instant' })
  )
  await expect(first).toBeInViewport()
  const top = await log.evaluate((element) => element.scrollTop)
  await demo
    .getByRole('button', { name: 'Extend reply', exact: true })
    .click()
  await expect
    .poll(() => log.evaluate((element) => element.scrollTop))
    .toBeCloseTo(top, 0)
  const bubble = first.locator('.dnb-ai-message__content')
  await bubble.hover()
  await page.mouse.down()
  await bubble.evaluate((element) => {
    const range = document.createRange()
    range.selectNodeContents(element)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  })
  const selected = await page.evaluate(() =>
    window.getSelection().toString()
  )
  await demo
    .getByRole('button', { name: 'Extend reply', exact: true })
    .evaluate((element) => (element as HTMLButtonElement).click())
  await page.mouse.up()
  expect(await page.evaluate(() => window.getSelection().toString())).toBe(
    selected
  )
  await expect
    .poll(() => log.evaluate((element) => element.scrollTop))
    .toBeCloseTo(top, 0)
})
