import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('the start page links to Collections', async ({ page }) => {
  await page.goto('/')
  await waitForApp(page)
  await expect(
    page.getByRole('link', { name: /Collections/ })
  ).toHaveAttribute('href', /^\/collections\/?$/)
})

test('the Collections page links to the company logos', async ({
  page,
}) => {
  await page.goto('/collections/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Collections', level: 1 })
  ).toBeVisible()
  await expect(
    page
      .getByRole('main')
      .getByRole('link', { name: 'Company logos', exact: true })
  ).toHaveAttribute('href', /^\/collections\/logos\/?$/)
})

test('the company logos page is part of Collections', async ({ page }) => {
  await page.goto('/collections/logos/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Company logos', level: 1 })
  ).toBeVisible()
})

test('the old Foundations URL redirects to Collections', async ({
  page,
}) => {
  await page.goto('/foundations/')
  await expect(page).toHaveURL(/\/collections\/?$/)
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Collections', level: 1 })
  ).toBeVisible()
})

test('the old company logos URL redirects to Collections', async ({
  page,
}) => {
  await page.goto('/foundations/logos/')
  await expect(page).toHaveURL(/\/collections\/logos\/?$/)
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Company logos', level: 1 })
  ).toBeVisible()
})
