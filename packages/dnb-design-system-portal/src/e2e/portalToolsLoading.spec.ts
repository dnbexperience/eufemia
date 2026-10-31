import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps the page usable when the settings download fails', async ({
  page,
}) => {
  let documents = 0
  page.on('request', (request) => {
    if (
      request.isNavigationRequest() &&
      request.frame() === page.mainFrame()
    ) {
      documents++
    }
  })
  await page.route(/PortalToolsDrawer/, (route) => route.abort())
  await page.goto('/web/components/')
  await waitForApp(page)
  await page.locator('button#portal-tools').click()
  await expect(page.getByRole('alert')).toContainText(
    'Could not load settings'
  )
  await expect(page.locator('button#portal-tools')).toHaveAttribute(
    'aria-expanded',
    'false'
  )
  expect(documents).toBe(1)
  expect(
    await page.evaluate(() => sessionStorage.getItem('portal-tools-open'))
  ).toBeNull()
})

for (const path of ['/', '/web/components/']) {
  test('loads settings on first open from ' + path, async ({ page }) => {
    const requests: string[] = []
    page.on('request', (request) => requests.push(request.url()))
    await page.goto(path)
    await waitForApp(page)
    const trigger = page.locator('button#portal-tools')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(
      requests.filter((url) => /ChangeLocale|PortalToolsDrawer/.test(url))
    ).toEqual([])

    await trigger.click()
    const drawer = page.getByRole('dialog', {
      name: 'Portal Tools',
      exact: true,
    })
    await expect(drawer).toBeVisible()
    await expect(drawer.locator('#change-theme')).toBeFocused()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(requests.some((url) => /PortalToolsDrawer/.test(url))).toBe(
      true
    )
    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(trigger).toBeFocused()
    const loaded = requests.filter((url) =>
      /PortalToolsDrawer/.test(url)
    ).length
    await trigger.click()
    await expect(drawer).toBeVisible()
    expect(
      requests.filter((url) => /PortalToolsDrawer/.test(url))
    ).toHaveLength(loaded)
  })
}

test('opens on the first keyboard activation after a delayed settings download', async ({
  page,
}) => {
  let release: () => void
  const pending = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route(/PortalToolsDrawer/, async (route) => {
    await pending
    await route.continue()
  })
  await page.goto('/web/components/')
  await waitForApp(page)
  const trigger = page.locator('button#portal-tools')
  try {
    await trigger.focus()
    await trigger.press('Enter')
    await expect(trigger).toHaveAttribute('aria-busy', 'true')
    await expect(trigger).toBeFocused()
    release()
    const drawer = page.getByRole('dialog', {
      name: 'Portal Tools',
      exact: true,
    })
    await expect(drawer).toBeVisible()
    await expect(drawer.locator('#change-theme')).toBeFocused()
    await expect(trigger).not.toHaveAttribute('aria-busy', 'true')
  } finally {
    release()
  }
})

test('does not open after canceling a pending settings download', async ({
  page,
}) => {
  let release: () => void
  const pending = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route(/PortalToolsDrawer/, async (route) => {
    await pending
    await route.continue()
  })
  await page.goto('/web/components/')
  await waitForApp(page)
  const trigger = page.locator('button#portal-tools')
  try {
    await trigger.focus()
    await trigger.press('Enter')
    await expect(trigger).toHaveAttribute('aria-busy', 'true')
    await trigger.press('Enter')
    release()
    await expect(page.getByRole('status')).toHaveCount(0)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
    await expect(
      page.getByRole('dialog', { name: 'Portal Tools', exact: true })
    ).toBeHidden()
    await trigger.click()
    await expect(
      page.getByRole('dialog', { name: 'Portal Tools', exact: true })
    ).toBeVisible()
  } finally {
    release()
  }
})

test('restores an open drawer after a delayed settings download', async ({
  page,
}) => {
  let release: () => void
  const pending = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route(/PortalToolsDrawer/, async (route) => {
    await pending
    await route.continue()
  })
  await page.addInitScript(() =>
    sessionStorage.setItem('portal-tools-open', 'true')
  )
  try {
    await page.goto('/web/components/', { waitUntil: 'domcontentloaded' })
    await waitForApp(page)
    const trigger = page.locator('button#portal-tools')
    await expect(trigger).toHaveAttribute('aria-busy', 'true')
    release()
    const drawer = page.getByRole('dialog', {
      name: 'Portal Tools',
      exact: true,
    })
    await expect(drawer).toBeVisible()
    await expect(drawer.locator('#change-theme')).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(trigger).toBeFocused()
  } finally {
    release()
  }
})
