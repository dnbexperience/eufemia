import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('renders the renamed task states, results and property docs', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/Task/demos/')
  await waitForApp(page)

  await expect(page).toHaveTitle(/Ai.Task.*Demos/)
  const tasks = page.locator(
    '[data-visual-test="ai-task-states"] .dnb-ai-task'
  )
  await expect(tasks).toHaveCount(5)

  const statuses = ['running', 'awaiting', 'done', 'error', 'canceled']
  for (let index = 0; index < statuses.length; index++) {
    const status = statuses[index]

    await expect(tasks.nth(index)).toHaveClass(
      new RegExp('dnb-ai-task--' + status)
    )
    await expect(
      tasks.nth(index).locator('.dnb-ai-task__status')
    ).toHaveCSS('display', 'flex')
  }

  await expect(
    tasks.first().locator('.dnb-progress-indicator')
  ).toBeVisible()
  await expect(tasks.nth(1)).toContainText('Venter på bekreftelse')
  await expect(tasks.nth(2)).toContainText(
    'Your latest transactions are ready.'
  )
  await expect(tasks.nth(3).locator('.dnb-ai-task__error')).toHaveText(
    'The card could not be blocked. Try again later.'
  )

  await page.goto('/uilib/extensions/ai/Task/properties/')
  await waitForApp(page)

  await expect(page.locator('#dnb-app-content')).toContainText(
    'taskAwaitingConfirmation'
  )
})

test('renders simulated framework tool calls through Task in the chat', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/demos/')
  await waitForApp(page)

  const chat = page.locator('[data-visual-test="ai-chat"]')
  await chat.getByRole('button', { name: /Block my Visa card/ }).click()

  const task = chat.locator('.dnb-ai-task').first()
  await expect(task).toHaveClass(/dnb-ai-task--running/, {
    timeout: 10000,
  })
  await expect(task).toHaveClass(/dnb-ai-task--done/, { timeout: 10000 })
  await expect(task).toContainText('Looking up your cards')
  await expect(chat.locator('.dnb-ai-task--done')).toHaveCount(2, {
    timeout: 10000,
  })
  await expect(
    page.locator('.dnb-live-preview .dnb-form-status--error')
  ).toHaveCount(0)
})
