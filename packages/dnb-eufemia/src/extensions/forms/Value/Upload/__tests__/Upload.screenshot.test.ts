import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Value.Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Upload/demos/',
  })

  it('have to match default upload value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-default"]',
    })
  })

  it('have to match upload displaying size', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-size"]',
    })
  })

  it('have to match list upload inline', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-inline"]',
    })
  })

  it('have to match label and value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-label-and-value"]',
    })
  })

  it('have to match label and value with on file click', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-label-and-value-on-file-click"]',
    })
  })

  it('have to match list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists"]',
    })
  })

  it('have to match list with on file click', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists-on-file-click"]',
    })
  })

  it('have to match files as non-clickable', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-display-file-as-non-clickable"]',
    })
  })
})
