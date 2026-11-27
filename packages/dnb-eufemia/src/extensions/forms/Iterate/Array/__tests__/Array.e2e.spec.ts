import { expect, test } from '@playwright/test'

test('continues from the surviving item or empty array after keyboard removal', async ({
  page,
}) => {
  await page.goto('/web/forms/Iterate/Array/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )

  const example = page.locator(
    '[data-visual-test="view-and-edit-container-with-line-divider"]'
  )
  const array = example.locator('.dnb-forms-iterate')
  const rows = array.locator('.dnb-forms-iterate__element')
  const maria = rows.filter({ hasText: 'Maria' })
  const remove = '.dnb-forms-iterate-remove-element-button'

  await rows.filter({ hasText: 'Tony' }).locator(remove).press('Enter')
  await expect(rows).toHaveCount(1)
  await expect(maria).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(
    maria.locator('.dnb-forms-iterate__edit-button')
  ).toBeFocused()

  await maria.locator(remove).press('Enter')
  await expect(rows).toHaveCount(0)
  await expect(array).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(example.locator('button[type="submit"]')).toBeFocused()
})
