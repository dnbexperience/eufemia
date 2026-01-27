/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Badge for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/badge/demos',
  })

  describe('variant', () => {
    it('should match variant notification', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="badge-variant-notification"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match variant notification inline with text', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="badge-variant-notification-inline"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match variant notification for avatar as content', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="badge-variant-notification-avatar"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match variant information as default variant', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="badge-variant-default"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match variant information inline with text', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="badge-variant-information-inline"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match variant information for avatar as content', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="badge-variant-information-avatar"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('positioning', () => {
    it('should match top left positioning', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '.dnb-badge__root:has([data-visual-test="badge-top-left"])',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match top right positioning', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '.dnb-badge__root:has([data-visual-test="badge-top-right"])',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match bottom left positioning', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '.dnb-badge__root:has([data-visual-test="badge-bottom-left"])',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('should match bottom right positioning', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '.dnb-badge__root:has([data-visual-test="badge-bottom-right"])',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('status', () => {
    it('should match all status variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="badge-status"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
