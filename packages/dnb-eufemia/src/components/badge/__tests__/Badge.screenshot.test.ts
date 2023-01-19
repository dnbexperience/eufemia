/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Badge', () => {
  setupPageScreenshot({ url: '/uilib/components/badge/demos' })
  describe('variant', () => {
    it('have to match variant notification', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-variant-notification"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match variant notification inline with text', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-variant-notification-inline"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match variant notification for avatar as content', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-variant-notification-avatar"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match variant information as default variant', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-variant-default"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match variant information inline with text', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-variant-information-inline"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match variant information for avatar as content', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-variant-information-avatar"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('positioning', () => {
    it('have to match top left positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-top-left"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match top right positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-top-right"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match bottom left positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-bottom-left"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match bottom right positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-bottom-right"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('alternatives', () => {
    it('have to match alternative having icon as a child', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-alternative-icon"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match alternative having img as a child', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-alternative-img"] .dnb-badge__root',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
