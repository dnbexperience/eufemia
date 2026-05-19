import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Paragraph', () => {
  setupPageScreenshot({
    url: '/uilib/elements/paragraph/demos/',
  })

  it('matches prose max width', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-prose-max-width"]',
    })
  })
})

describe.each(['ui', 'sbanken'])(`Paragraph for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/paragraph/demos/',
  })

  it('have to match the paragraph with weight modifiers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-weight"]',
    })
  })

  it('have to match the paragraph with size modifiers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-size"]',
    })
  })

  it('have to match the paragraph with align modifiers', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="paragraph-modifiers-align"]',
    })
  })

  it('have to match the paragraph with family modifiers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-family"]',
    })
  })

  it('have to match the paragraph with line modifiers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-line"]',
    })
  })

  it('have to match the paragraph with other modifiers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-other"]',
    })
  })

  it('have to match the paragraph example', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-default"]',
    })
  })

  it('have to match the paragraph with small text', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-small"]',
    })
  })

  it('have to match the paragraph with additional elements', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-additional"]',
    })
  })
})

describe.each(['ui', 'sbanken'])(`Paragraph for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/paragraph/demos/',
  })

  it('matches all sizes and weights', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-sizes"]',
    })
  })
})
