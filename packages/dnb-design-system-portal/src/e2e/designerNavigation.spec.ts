import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('the design checklist is part of the accessibility page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/quickguide-designer/accessibility/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', {
      name: 'Accessibility checklist for designers',
      level: 2,
    })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Accessibility, Inclusiveness, and WCAG',
      level: 1,
    })
  ).toBeVisible()
  await expect(
    page.getByRole('link', {
      name: 'Open the Design Checklist Widget in Figma',
    })
  ).toHaveAttribute(
    'href',
    'https://www.figma.com/community/widget/1668930550957206964/design-checklist-widget'
  )
  const menu = page.locator('#portal-sidebar-menu')
  await expect(
    menu.getByRole('link', {
      name: 'Checklist for designers',
      exact: true,
    })
  ).toHaveCount(0)
})

for (const oldChecklistUrl of [
  '/quickguide-designer/checklist/',
  '/quickguide-designer/accessibility/checklist/',
]) {
  test(`${oldChecklistUrl} redirects to accessibility`, async ({
    page,
  }) => {
    await page.goto(oldChecklistUrl)
    await expect(page).toHaveURL(
      /\/quickguide-designer\/accessibility\/?$/
    )
    await waitForApp(page)
    await expect(
      page.getByRole('heading', {
        name: 'Accessibility checklist for designers',
        level: 2,
      })
    ).toBeVisible()
  })
}

test('keeps principles and motion together in Design language', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/quickguide-designer/design-principles/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Principles & Values', level: 1 })
  ).toBeVisible()
  const menu = page.locator('#portal-sidebar-menu')
  const designLanguage = menu.getByRole('button', {
    name: 'Design language',
    exact: true,
  })
  await expect(designLanguage).toHaveAttribute('aria-expanded', 'true')
  await expect(designLanguage.locator('svg')).toBeVisible()
  const design = menu.getByRole('link', {
    name: 'Design principles',
    exact: true,
  })
  await expect(design).toHaveAttribute(
    'href',
    '/quickguide-designer/design-principles'
  )
  const motion = menu.getByRole('button', { name: 'Motion', exact: true })
  await motion.click()
  await expect(page).toHaveURL('/quickguide-designer/design-principles/')
  await menu
    .getByRole('link', { name: 'Animation Principles', exact: true })
    .click()
  await expect(
    page.getByRole('heading', { name: 'Animation Principles', level: 1 })
  ).toBeVisible()
  await menu
    .getByRole('link', { name: 'Motion overview', exact: true })
    .click()
  await expect(page).toHaveURL('/quickguide-designer/motion')
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
