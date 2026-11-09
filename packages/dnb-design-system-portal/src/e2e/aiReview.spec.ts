import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('preserves reply action focus rings and expanded touch areas', async ({
  page,
  browserName,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/demos/')
  await waitForApp(page)
  const chat = page.locator('[data-visual-test="ai-chat"]')
  await chat
    .getByRole('button', { name: /Show my latest transactions/ })
    .click()
  const regenerate = chat.getByRole('button', {
    name: 'Regenerate',
    exact: true,
  })
  await expect(regenerate).toBeVisible({ timeout: 15000 })
  await chat.locator('textarea').fill('Block my Visa card')
  await chat.locator('textarea').press('Enter')
  await expect(regenerate).toBeVisible({ timeout: 15000 })
  const log = chat.getByRole('log')
  const buttons = log.locator('.dnb-ai-actions button')
  await expect(log.locator('.dnb-ai-message--user')).toHaveCount(2)
  await expect.poll(() => buttons.count()).toBeGreaterThanOrEqual(7)
  await log.dispatchEvent('wheel', { deltaY: -1 })
  for (const button of await buttons.all()) {
    await button.evaluate((element) =>
      element.scrollIntoView({ block: 'center', behavior: 'instant' })
    )
    const result = await button.evaluate((element) => {
      const row = element.closest('.dnb-ai-message')
      const bounds = element
        .querySelector('.dnb-button__bounding')
        .getBoundingClientRect()
      const centerX = (bounds.left + bounds.right) / 2
      const centerY = (bounds.top + bounds.bottom) / 2
      return {
        containment: getComputedStyle(row).contentVisibility,
        bottomHit: element.contains(
          document.elementFromPoint(centerX, bounds.bottom - 1)
        ),
        leftHit: element.contains(
          document.elementFromPoint(bounds.left + 1, centerY)
        ),
      }
    })
    expect(result.containment).toBe('visible')
    expect(result.bottomHit).toBe(true)
    expect(result.leftHit).toBe(true)
  }
  await chat.locator('textarea').focus()
  await page.keyboard.press(
    browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'
  )
  await expect(regenerate).toBeFocused()
  const space = await regenerate.evaluate((button) => {
    const rect = button.getBoundingClientRect()
    const viewport = button.closest('[role="log"]').getBoundingClientRect()
    return viewport.bottom - rect.bottom
  })
  expect(space).toBeGreaterThanOrEqual(4)
  await expect(log.locator('.dnb-ai-message--user').first()).toHaveCSS(
    'content-visibility',
    'auto'
  )
})

test('matches bubble tokens, spacing, avatars and sender groups', async ({
  page,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/Message/demos/')
  await waitForApp(page)
  const demo = page.locator('[data-visual-test="ai-message-design"]')
  const messages = demo.locator('.dnb-ai-message')
  await expect(messages).toHaveCount(5)
  await expect(messages.nth(2).locator('p')).toHaveCSS('font-size', '16px')
  await expect(
    messages.nth(0).locator('.dnb-ai-message__content')
  ).toHaveCSS('padding', '8px 16px')
  await expect(
    messages.nth(0).locator('.dnb-ai-message__content')
  ).toHaveCSS('font-size', '16px')
  const geometry = await messages.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect()
      const bubble = element
        .querySelector('.dnb-ai-message__content')
        .getBoundingClientRect()
      const avatar = element
        .querySelector('.dnb-ai-message__avatar')
        ?.getBoundingClientRect()
      return {
        top: rect.top,
        bottom: rect.bottom,
        bubbleTop: bubble.top,
        avatarTop: avatar?.top,
        avatarGap: avatar ? bubble.left - avatar.right : null,
      }
    })
  )
  expect(geometry[2].top - geometry[1].bottom).toBe(8)
  expect(geometry[1].top - geometry[0].bottom).toBe(16)
  expect(geometry[1].avatarTop).toBe(geometry[1].bubbleTop)
  expect(geometry[1].avatarGap).toBe(8)
  const log = demo.getByRole('log')
  const insets = await log.evaluate((element) => {
    const bounds = element.getBoundingClientRect()
    const user = element
      .querySelector('.dnb-ai-message--user')
      .getBoundingClientRect()
    const assistant = element
      .querySelector('.dnb-ai-message--assistant')
      .getBoundingClientRect()
    return {
      right: bounds.right - user.right,
      left: assistant.left - bounds.left,
    }
  })
  expect(insets.left).toBeCloseTo(16, 3)
  expect(insets.right).toBeCloseTo(16, 3)
})

test('shows the prompt outline in forced colors', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'Forced colors emulation is verified in Chromium'
  )
  await page.goto('/web/patterns-and-extensions/chat/PromptInput/demos/')
  await waitForApp(page)
  await page.emulateMedia({ forcedColors: 'active' })
  const form = page.locator(
    '[data-visual-test="ai-prompt-input-default"] form'
  )
  await expect(form).toHaveCSS('outline-width', '1px')
  await form.locator('textarea').focus()
  await expect(form).toHaveCSS('outline-width', '4px')
})

for (const virtualized of [false, true]) {
  test(
    'keeps focus after the latest-message button disappears, virtualized=' +
      virtualized,
    async ({ page }) => {
      await page.goto(
        virtualized
          ? '/web/patterns-and-extensions/chat/Conversation/demos/'
          : '/web/patterns-and-extensions/chat/demos/'
      )
      await waitForApp(page)
      const demo = page.locator(
        virtualized
          ? '[data-visual-test="ai-virtualized-conversation"]'
          : '[data-visual-test="ai-chat"]'
      )
      if (!virtualized) {
        await demo
          .getByRole('button', { name: /Block my Visa card/ })
          .click()
        await expect(demo.locator('.dnb-ai-task--done')).toHaveCount(2, {
          timeout: 12000,
        })
      }
      const log = demo.getByRole('log')
      await log.evaluate((element) => {
        element.style.maxHeight = '100px'
        element.style.flex = '0 0 100px'
      })
      await log.evaluate((element) => {
        element.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
        element.scrollTop = 0
        element.dispatchEvent(new Event('scroll'))
      })
      const latest = demo.locator('.dnb-ai-conversation__scroll-button')
      await expect(latest).toBeVisible()
      await latest.focus()
      await latest.press('Enter')
      await expect(latest).toHaveCount(0)
      await expect
        .poll(() =>
          log.evaluate((element) =>
            element.contains(document.activeElement)
          )
        )
        .toBe(true)
      await expect(page.locator('body')).not.toBeFocused()
    }
  )
}

test('keeps response block spacing in application styles, outside the portal reset', async ({
  page,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/Response/demos/')
  await waitForApp(page)
  const response = page.locator(
    '[data-visual-test="ai-response"] .dnb-ai-response'
  )
  const gaps = await response.evaluate((element) => {
    const host = document.createElement('div')
    host.className = 'dnb-core-style'
    host.style.cssText =
      'position:fixed;top:0;left:0;width:500px;background:var(--token-color-background-neutral)'
    document.body.append(host)
    host.append(element.cloneNode(true))
    const root = host.firstElementChild
    const first = root.firstElementChild
    const last = root.lastElementChild
    const paragraphs = root.querySelectorAll('p.dnb-p')
    const result = {
      first: getComputedStyle(first).marginTop,
      last: getComputedStyle(last).marginBottom,
      paragraph:
        paragraphs.length > 1
          ? getComputedStyle(paragraphs[0]).marginBottom
          : '',
    }
    host.remove()
    return result
  })
  expect(gaps.first).toBe('0px')
  expect(gaps.last).toBe('0px')
  expect(gaps.paragraph).toBe('24px')
})

test('does not request untrusted images in a response', async ({
  page,
}) => {
  const requests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('untrusted.example')) {
      requests.push(request.url())
    }
  })
  await page.goto('/web/patterns-and-extensions/chat/Response/demos/')
  await waitForApp(page)
  const response = page.locator(
    '[data-visual-test="ai-response-image-policy"] .dnb-ai-response'
  )
  await expect(response).toHaveText('Untrusted image')
  await expect(response.locator('img')).toHaveCount(0)
  expect(requests).toEqual([])
})

for (const brand of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  for (const scheme of ['light', 'dark']) {
    test(
      'keeps task text legible in ' + brand + ' ' + scheme + ' bubbles',
      async ({ page }) => {
        await page.goto(
          '/web/patterns-and-extensions/chat/Task/demos/?eufemia-theme=' +
            brand +
            '&eufemia-color-scheme=' +
            scheme
        )
        await waitForApp(page)
        const task = page.locator(
          '[data-visual-test="ai-task-states"] .dnb-ai-task--error'
        )
        const colors = await task.evaluate((element) => {
          const bubble = document.createElement('div')
          bubble.className =
            'dnb-ai-message dnb-ai-message--assistant dnb-ai-message--bubble'
          const content = document.createElement('div')
          content.className = 'dnb-ai-message__content'
          bubble.append(content)
          element.parentElement.append(bubble)
          content.append(element.cloneNode(true))
          const result = {
            foreground: getComputedStyle(
              content.querySelector('.dnb-ai-task__state')
            ).color,
            error: getComputedStyle(
              content.querySelector('.dnb-ai-task__error')
            ).color,
            background: getComputedStyle(content).backgroundColor,
          }
          bubble.remove()
          return result
        })
        const luminance = (color: string) => {
          const rgb = color
            .match(/[0-9.]+/g)
            .slice(0, 3)
            .map(Number)
            .map((value) => {
              const channel = value / 255
              return channel <= 0.04045
                ? channel / 12.92
                : ((channel + 0.055) / 1.055) ** 2.4
            })
          return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
        }
        for (const foreground of [colors.foreground, colors.error]) {
          const [low, high] = [
            luminance(foreground),
            luminance(colors.background),
          ].sort((a, b) => a - b)
          expect((high + 0.05) / (low + 0.05)).toBeGreaterThanOrEqual(4.5)
        }
      }
    )
  }
}

test('keeps suggestion and regenerate focus in the prompt', async ({
  page,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/demos/')
  await waitForApp(page)
  const chat = page.locator('[data-visual-test="ai-chat"]')
  await chat.getByRole('button', { name: /Block my Visa card/ }).click()
  await expect(chat.locator('textarea')).toBeFocused()
  await expect(
    chat.getByRole('button', { name: 'Regenerate', exact: true })
  ).toBeVisible({ timeout: 15000 })
  await chat
    .getByRole('button', { name: 'Regenerate', exact: true })
    .click()
  await expect(chat.locator('textarea')).toBeFocused()
})

test('opens and closes the chat window with focus restored to its trigger', async ({
  page,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/demos/')
  await waitForApp(page)
  const trigger = page.getByRole('button', {
    name: 'Open chat window',
    exact: true,
  })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('Maria')
  await expect(dialog.locator('.dnb-ai-message__tag')).toHaveCount(0)
  await expect(dialog).toBeFocused()
  await dialog.locator('.dnb-modal__close-button').click()
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})
