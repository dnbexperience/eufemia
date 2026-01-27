/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tag', () => {
  setupPageScreenshot({ url: '/uilib/components/tag/demos' })

  it('should match Tag default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tag-default"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match Tag with icon', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tag-icon"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match a removable Tag list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tag-removable-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match a inline Tag', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tag-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match a skeleton Tag', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tag-skeleton"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe.each(['clickable', 'addable', 'removable'])(
    'have to match',
    (name) => {
      it(`a ${name} Tag`, async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
        })

        expect(screenshot).toMatchImageSnapshot()
      })
      it(`a ${name} Tag hover`, async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
          simulate: 'hover',
        })

        expect(screenshot).toMatchImageSnapshot()
      })
      it(`a ${name} Tag active`, async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
          simulate: 'active',
        })

        expect(screenshot).toMatchImageSnapshot()
      })
      it(`a ${name} Tag focus`, async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="tag-${name}"]`,
          simulate: 'focus',
        })

        expect(screenshot).toMatchImageSnapshot()
      })
    }
  )
})
