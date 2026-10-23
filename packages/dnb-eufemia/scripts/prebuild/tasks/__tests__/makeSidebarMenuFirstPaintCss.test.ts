import fs from 'node:fs/promises'
import path from 'node:path'
import { createSidebarMenuFirstPaintCss } from '../makeSidebarMenuFirstPaintCss'

it('keeps committed first-paint templates in sync with the shared SCSS', async () => {
  const output = path.resolve(
    __dirname,
    '../../../../src/extensions/sidebar-menu/SidebarMenuFirstPaintCss.ts'
  )
  expect(await fs.readFile(output, 'utf8')).toBe(
    await createSidebarMenuFirstPaintCss()
  )
})
