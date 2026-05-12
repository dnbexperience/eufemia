import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Tag for %s`, (themeName) => {
  setupPageScreenshot({ themeName, url: '/uilib/components/tag/demos/' })

  it('have to match Tag default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="tag-default"] .dnb-tag',
    })
  })

  it('have to match Tag with icon', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="tag-icon"] .dnb-tag',
    })
  })

  it('have to match a removable Tag list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="tag-removable-list"]',
    })
  })

  it('have to match a inline Tag', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="tag-inline"]',
    })
  })

  it('have to match a skeleton Tag', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="tag-skeleton"]',
    })
  })

  describe.each(['clickable', 'addable', 'removable'])(
    `have to match`,
    (name) => {
      it(`a ${name} Tag`, async () => {
        await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
        })
      })
      it(`a ${name} Tag hover`, async () => {
        await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
          simulate: 'hover',
        })
      })
      it(`a ${name} Tag active`, async () => {
        await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
          simulate: 'active',
        })
      })
      it(`a ${name} Tag focus`, async () => {
        await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
          simulate: 'focus',
        })
      })
    }
  )
})
