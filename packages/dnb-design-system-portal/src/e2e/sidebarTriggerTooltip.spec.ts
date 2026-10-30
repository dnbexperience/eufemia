import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('names the Portal hamburger and shows one tooltip without a native title', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/components/input/')
  await waitForApp(page)
  const trigger = page.locator('#toggle-sidebar-menu')
  await expect(trigger).toHaveAccessibleName('Open section content menu')
  await expect(trigger).not.toHaveAttribute('title')
  await trigger.focus()
  const tooltip = page.getByRole('tooltip', {
    name: 'Open section content menu',
    exact: true,
  })
  await expect(tooltip).toBeVisible()
  await expect(trigger).not.toHaveAttribute('aria-describedby')
  await expect(tooltip.locator('.dnb-tooltip__arrow')).toHaveClass(
    /dnb-tooltip__arrow__placement--bottom/
  )
  await trigger.click()
  const drawer = page.getByRole('dialog', { name: 'Menu', exact: true })
  await expect(drawer).toBeVisible()
  await expect(trigger).toHaveAccessibleName('Hide section content menu')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(tooltip).toBeHidden()
  await drawer.locator('.dnb-modal__close-button').click()
  await expect(drawer).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAccessibleName('Open section content menu')
})

test('demonstrates an explicit accessible name and tooltip on the hamburger', async ({
  page,
}) => {
  await page.setViewportSize({ width: 600, height: 900 })
  await page.goto(
    '/web/extensions/sidebar-menu/demos/?focusmode=SidebarMenuResponsiveNavigation'
  )
  await waitForApp(page)
  const trigger = page.locator(
    '[data-sidebar-menu-responsive-example] .dnb-sidebar-menu-responsive-trigger'
  )
  await expect(trigger).toHaveAccessibleName('Open banking menu')
  await expect(trigger).not.toHaveAttribute('title')
  await trigger.focus()
  await expect(
    page.getByRole('tooltip', { name: 'Open banking menu', exact: true })
  ).toBeVisible()
  await expect(trigger).not.toHaveAttribute('aria-describedby')
})
