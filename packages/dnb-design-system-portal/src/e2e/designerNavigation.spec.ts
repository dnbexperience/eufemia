import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('the designer checklist is a standalone menu entry with an icon', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/quickguide-designer/checklist/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', {
      name: 'Accessibility checklist for designers',
      level: 1,
    })
  ).toBeVisible()
  const menu = page.locator('#portal-sidebar-menu')
  const checklist = menu.getByRole('link', {
    name: 'Checklist for designers',
    exact: true,
  })
  await expect(checklist).toHaveAttribute(
    'href',
    /\/quickguide-designer\/checklist\/?$/
  )
  await expect(checklist.locator('svg')).toBeVisible()
  expect(
    await checklist.evaluate((link) => {
      const accessibility = document.querySelector(
        '#portal-sidebar-menu a[href="/quickguide-designer/accessibility"]'
      )
      return (
        link.closest('li').parentElement ===
        accessibility?.closest('li').parentElement
      )
    })
  ).toBe(true)
})

test('the old designer checklist URL redirects and accessibility links to the new page', async ({
  page,
}) => {
  await page.goto('/quickguide-designer/accessibility/checklist/')
  await expect(page).toHaveURL(/\/quickguide-designer\/checklist\/?$/)
  await waitForApp(page)
  await expect(
    page.getByRole('heading', {
      name: 'Accessibility checklist for designers',
      level: 1,
    })
  ).toBeVisible()
  await page.goto('/quickguide-designer/accessibility/')
  await waitForApp(page)
  const checklist = page.getByRole('main').getByRole('link', {
    name: 'Accessibility checklist for designers',
    exact: true,
  })
  await expect(checklist).toHaveAttribute(
    'href',
    /\/quickguide-designer\/checklist\/?$/
  )
  await checklist.click()
  await expect(page).toHaveURL(/\/quickguide-designer\/checklist\/?$/)
})

test('designer principles and motion are adjacent sibling pages with icons', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/quickguide-designer/design-principles/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Principles & Values', level: 1 })
  ).toBeVisible()
  const menu = page.locator('#portal-sidebar-menu')
  const design = menu.getByRole('link', {
    name: 'Design Principles',
    exact: true,
  })
  const animation = menu.getByRole('link', {
    name: 'Animation Principles',
    exact: true,
  })
  const motion = menu.getByRole('link', { name: 'Motion', exact: true })
  await expect(design).toHaveAttribute(
    'href',
    /\/quickguide-designer\/design-principles\/?$/
  )
  await expect(animation).toHaveAttribute(
    'href',
    /\/quickguide-designer\/animation-principles\/?$/
  )
  await expect(motion).toHaveAttribute(
    'href',
    /\/quickguide-designer\/motion\/?$/
  )
  for (const link of [design, animation, motion]) {
    await expect(link.locator('svg')).toBeVisible()
  }
  expect(
    await design.evaluate((link) => {
      const item = link.closest('li')
      return [
        item.nextElementSibling?.querySelector('a')?.getAttribute('href'),
        item.nextElementSibling?.nextElementSibling
          ?.querySelector('a')
          ?.getAttribute('href'),
      ].map((path) => path?.replace(/\/$/, ''))
    })
  ).toEqual([
    '/quickguide-designer/animation-principles',
    '/quickguide-designer/motion',
  ])
  await animation.click()
  await expect(page).toHaveURL(
    /\/quickguide-designer\/animation-principles\/?$/
  )
  await expect(
    page.getByRole('heading', { name: 'Animation Principles', level: 1 })
  ).toBeVisible()
  await motion.click()
  await expect(page).toHaveURL(/\/quickguide-designer\/motion\/?$/)
  await expect(page.locator('.dnb-motion-demo')).toHaveCount(13)
})

test('the old design principles URL redirects to its new page', async ({
  page,
}) => {
  await page.goto('/quickguide-designer/principles')
  await expect(page).toHaveURL(
    /\/quickguide-designer\/design-principles\/?$/
  )
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Principles & Values', level: 1 })
  ).toBeVisible()
})

test('the old animation principles URL redirects to its new page', async ({
  page,
}) => {
  await page.goto('/quickguide-designer/principles/animations/')
  await expect(page).toHaveURL(
    /\/quickguide-designer\/animation-principles\/?$/
  )
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Animation Principles', level: 1 })
  ).toBeVisible()
})
