import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Flex.Stack', () => {
  setupPageScreenshot({
    url: '/uilib/layout/flex/stack/demos/',
  })

  it('have to match flex-stack-form', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-form"]',
    })
  })

  it('have to match flex-stack-paragraphs', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-paragraphs"]',
    })
  })

  it('have to match flex-stack-card-stack', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-stack"]',
    })
  })

  it('have to match flex-stack-card-heading', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-heading"]',
    })
  })

  it('have to match flex-stack-card-two-headings', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-two-headings"]',
    })
  })
})
