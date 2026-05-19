import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`ChildrenWithAge for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos/',
  })

  it('have to match when answering yes to all options', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
  })

  it('have to match field and value when multiple children', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-multiple-children"]',
    })
  })

  it('have to match field and value when no children', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-no-children"]',
    })
  })

  it('have to match field and value when previously filled out data', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-previously-filled-out-data"]',
    })
  })

  it('have to match field and value when multiple no answers', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-multiple-no-answers"]',
    })
  })
})

describe('ChildrenWithAge', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos/',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  it('have to match small screens', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
  })
})
