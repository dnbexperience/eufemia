import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`DrawerList for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/fragments/drawer-list/demos/',
  })

  it('have to match the default drawer-list', async () => {
    await makeScreenshot({
      style: {
        width: '14rem',
      },
      selector: '[data-visual-test="drawer-list"] .dnb-drawer-list__list',
    })
  })

  it('have to match the disabled option', async () => {
    await makeScreenshot({
      style: {
        width: '14rem',
      },
      selector: '[data-visual-test="drawer-list-disabled"]',
    })
  })

  it('have to match the inline style example', async () => {
    await makeScreenshot({
      style: {
        width: '14rem',
        'padding-top': '3rem',
      },
      selector: '[data-visual-test="drawer-list-inline-style"]',
    })
  })

  it('have to match the groups example', async () => {
    await makeScreenshot({
      style: {
        width: '14rem',
        'padding-top': '3rem',
      },
      selector: '[data-visual-test="drawer-list-groups"]',
    })
  })
})
