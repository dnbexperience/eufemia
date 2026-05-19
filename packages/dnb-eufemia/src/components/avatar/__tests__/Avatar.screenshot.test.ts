import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Avatar for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/avatar/demos/',
  })

  describe('children', () => {
    it('have to match icon of variant primary as children', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-children-icon-primary"]',
      })
    })

    it('have to match icon of variant secondary as children', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-children-icon-secondary"]',
      })
    })

    it('have to match icon of variant tertiary as children', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-children-icon-tertiary"]',
      })
    })

    it('have to match logo as children', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-children-logo"]',
      })
    })
  })

  describe('size', () => {
    it('have to match default size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-size-default"]',
      })
    })

    it('have to match small size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-size-small"]',
      })
    })

    it('have to match medium size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-size-medium"]',
      })
    })

    it('have to match large size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-size-large"]',
      })
    })

    it('have to match x-large size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-size-x-large"]',
      })
    })
  })

  describe('variant', () => {
    it('have to match default variant', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-default"]',
      })
    })

    it('have to match primary variant', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-primary"]',
      })
    })

    it('have to match secondary variant', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-secondary"]',
      })
    })

    it('have to match tertiary variant', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-variant-tertiary"]',
      })
    })
  })

  describe('src', () => {
    it('have to match png image of local src', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-image-local-png"]',
      })
    })

    it('have to match svg image of local src', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-image-local-svg"]',
      })
    })

    it('have to match image of external src', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-image-external"]',
      })
    })

    it('have to match image when passing imgProps', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-image-props"]',
      })
    })
  })

  describe('grouping', () => {
    it('have to match grouping of small avatars', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-small"]',
      })
    })

    it('have to match grouping of medium avatars', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-medium"]',
      })
    })

    it('have to match grouping of large avatars', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-large"]',
      })
    })

    it('have to match grouping of x-large avatars', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-x-large"]',
      })
    })

    it('have to match grouping of img avatars', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-grouped-image"]',
      })
    })

    it('have to match setting custom colors', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-custom-colors"]',
      })
    })

    it('have to match using country flag as a badge', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="avatar-country-flag-badge"]',
      })
    })
  })
})
