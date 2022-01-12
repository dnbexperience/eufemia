/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Avatar screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/avatar/demos' })
  describe('size', () => {
    it('have to match default size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-size-default"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match small size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-size-small"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match medium size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-size-medium"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match large size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-size-large"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match x-large size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-size-x-large"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('variant', () => {
    it('have to match default variant', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-variant-default"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match primary variant', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-variant-primary"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match secondary variant', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-variant-secondary"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match tertiary variant', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-variant-tertiary"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('children', () => {
    it('have to match icon of variant primary as children', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-children-icon-primary"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match icon of variant secondary as children', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-children-icon-secondary"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match icon of variant tertiary as children', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-children-icon-tertiary"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match logo as children', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-children-logo"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('src', () => {
    it('have to match png image of local src', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-image-local-png"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match svg image of local src', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="avatar-image-local-svg"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match image of external src', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-image-external"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match image when passing imgProps', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="avatar-image-props"] .dnb-avatar',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
