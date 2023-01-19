/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Avatar', () => {
  setupPageScreenshot({ url: '/uilib/components/avatar/demos' })

  describe('size', () => {
    it('have to match default size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-size-default"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match small size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-size-small"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match medium size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-size-medium"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match large size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-size-large"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match x-large size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-size-x-large"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('variant', () => {
    it('have to match default variant', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-default"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match primary variant', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-primary"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match secondary variant', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-secondary"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match tertiary variant', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-tertiary"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('children', () => {
    it('have to match icon of variant primary as children', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-children-icon-primary"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match icon of variant secondary as children', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-children-icon-secondary"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match icon of variant tertiary as children', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-children-icon-tertiary"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match logo as children', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-children-logo"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('src', () => {
    it('have to match png image of local src', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-image-local-png"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match svg image of local src', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-image-local-svg"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match image of external src', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-image-external"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match image when passing imgProps', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-image-props"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('grouping', () => {
    it('have to match grouping of small avatars', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-small"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match grouping of medium avatars', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-medium"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match grouping of large avatars', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-large"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match grouping of x-large avatars', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-x-large"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match grouping of img avatars', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-image"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
