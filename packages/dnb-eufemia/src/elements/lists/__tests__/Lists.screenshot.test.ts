import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('List', () => {
  setupPageScreenshot({
    url: '/uilib/elements/lists/demos/',
  })

  it('have to match ul list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
      style: { width: '20rem', height: '18rem' },
    })
  })

  it('have to match ol list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
  })

  it('have to match outside ol list', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
  })

  it('have to match ol list with custom types', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
  })

  it('have to match dl list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
  })

  it('have to match dl horizontal list', async () => {
    await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-horizontal"]',
    })
  })

  it('have to match dl grid list', async () => {
    await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-grid"]',
    })
  })

  it('have to match lists reset', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-reset"]',
    })
  })

  it('have to match ul inside ol', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="ul-inside-ol"]',
    })
  })
})

describe('Lists with skeleton', () => {
  setupPageScreenshot({ url: '/uilib/elements/lists/demos/?skeleton' })

  it('have to match ul list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
    })
  })

  it('have to match ol list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
  })

  it('have to match outside ol list', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
  })

  it('have to match ol list with custom types', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
  })

  it('have to match dl list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
  })
})
