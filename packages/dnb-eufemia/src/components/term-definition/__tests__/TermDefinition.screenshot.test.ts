import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`TermDefinition for %s`, (themeName) => {
  setupPageScreenshot({
    url: '/uilib/components/term-definition/demos/',
    themeName,
  })

  it('matches the basic style', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="term-definition-basic"]',
    })
  })

  it('matches the popover', async () => {
    await makeScreenshot({
      style: {
        'padding-bottom': '8rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger',
      selector: '[data-visual-test="term-definition-basic"]',
    })
  })

  it('matches various typography styles', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="term-definition-typography"]',
    })
  })
})
