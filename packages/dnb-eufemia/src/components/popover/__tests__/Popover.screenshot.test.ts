import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Popover for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/popover/demos/',
  })

  it('matches the basic style', async () => {
    await makeScreenshot({
      style: {
        'margin-left': '180px',
        'padding-bottom': '200px',
        'padding-right': '180px',
      },
      selector: '[data-visual-test="popover-basic"]',
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-basic"] button',
    })
  })
})

describe.each(['ui'])(`Popover alignment for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/popover/demos/',
  })

  it('have to match align center and arrow center', async () => {
    await makeScreenshot({
      style: {
        'padding-top': '3rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-arrow-center"] button',
      selector: '[data-visual-test="popover-align-arrow-center"]',
    })
  })

  it('have to match align left', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-align-left"] button',
      selector: '[data-visual-test="popover-align-left"]',
    })
  })

  it('have to match align left and arrow left', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-arrow-left"] button',
      selector: '[data-visual-test="popover-align-arrow-left"]',
    })
  })

  it('have to match align right and arrow right', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-arrow-right"] button',
      selector: '[data-visual-test="popover-align-arrow-right"]',
    })
  })

  it('have to match align left and arrow right', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-left-arrow-right"] button',
      selector: '[data-visual-test="popover-align-left-arrow-right"]',
    })
  })

  it('have to match align right and arrow left', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-right-arrow-left"] button',
      selector: '[data-visual-test="popover-align-right-arrow-left"]',
    })
  })

  it('have to match align right', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '3rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-align-right"] button',
      selector: '[data-visual-test="popover-align-right"]',
    })
  })

  it('have to match arrow left', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-arrow-left"] button',
      selector: '[data-visual-test="popover-arrow-left"]',
    })
  })

  it('have to match arrow right', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-arrow-right"] button',
      selector: '[data-visual-test="popover-arrow-right"]',
    })
  })

  it('have to match placement right', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right"] button',
      selector: '[data-visual-test="popover-placement-right"]',
    })
  })

  it('have to match placement left', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-left"] button',
      selector: '[data-visual-test="popover-placement-left"]',
    })
  })

  it('have to match placement top', async () => {
    await makeScreenshot({
      style: {
        'padding-top': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-top"] button',
      selector: '[data-visual-test="popover-placement-top"]',
    })
  })

  it('have to match placement bottom', async () => {
    await makeScreenshot({
      style: {
        'padding-bottom': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-bottom"] button',
      selector: '[data-visual-test="popover-placement-bottom"]',
    })
  })

  it('have to match placement right and arrow top', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right-arrow-top"] button',
      selector: '[data-visual-test="popover-placement-right-arrow-top"]',
    })
  })

  it('have to match placement right and arrow bottom', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right-arrow-bottom"] button',
      selector:
        '[data-visual-test="popover-placement-right-arrow-bottom"]',
    })
  })

  it('have to match placement left and arrow bottom', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-left-arrow-bottom"] button',
      selector: '[data-visual-test="popover-placement-left-arrow-bottom"]',
    })
  })

  it('have to match placement right and arrow left', async () => {
    await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right-arrow-left"] button',
      selector: '[data-visual-test="popover-placement-right-arrow-left"]',
    })
  })

  it('have to match placement left and arrow right', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-left-arrow-right"] button',
      selector: '[data-visual-test="popover-placement-left-arrow-right"]',
    })
  })

  it('have to match placement left and arrow top', async () => {
    await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-left-arrow-top"] button',
      selector: '[data-visual-test="popover-placement-left-arrow-top"]',
    })
  })
})
