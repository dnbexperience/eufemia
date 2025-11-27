import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Popover for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/popover/demos',
  })

  it('matches the basic style', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'margin-left': '180px',
        'padding-bottom': '200px',
        'padding-right': '180px',
      },
      selector: '[data-visual-test="popover-basic"]',
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-basic"] button',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches the dark theme style', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'margin-left': '160px',
        'padding-bottom': '140px',
        'padding-right': '160px',
      },
      selector: '[data-visual-test="popover-dark"]',
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-dark"] button',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui'])('Popover alignment for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/popover/demos',
  })

  it('have to match align center and arrow center', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-bottom': '3rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-arrow-center"] button',
      selector: '[data-visual-test="popover-align-arrow-center"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match align left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-align-left"] button',
      selector: '[data-visual-test="popover-align-left"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match align left and arrow left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-arrow-left"] button',
      selector: '[data-visual-test="popover-align-arrow-left"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match align right and arrow right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-arrow-right"] button',
      selector: '[data-visual-test="popover-align-arrow-right"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match align left and arrow right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-left-arrow-right"] button',
      selector: '[data-visual-test="popover-align-left-arrow-right"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match align right and arrow left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-align-right-arrow-left"] button',
      selector: '[data-visual-test="popover-align-right-arrow-left"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match align right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '3rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-align-right"] button',
      selector: '[data-visual-test="popover-align-right"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match arrow left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-arrow-left"] button',
      selector: '[data-visual-test="popover-arrow-left"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match arrow right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-arrow-right"] button',
      selector: '[data-visual-test="popover-arrow-right"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right"] button',
      selector: '[data-visual-test="popover-placement-right"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-left"] button',
      selector: '[data-visual-test="popover-placement-left"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement top', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-top': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-top"] button',
      waitAfterSimulateSelector: '.dnb-popover--active',
      selector: '[data-visual-test="popover-placement-top"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement bottom', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-bottom': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-bottom"] button',
      selector: '[data-visual-test="popover-placement-bottom"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement right and arrow top', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right-arrow-top"] button',
      selector: '[data-visual-test="popover-placement-right-arrow-top"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement right and arrow bottom', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-right': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-right-arrow-bottom"] button',
      selector:
        '[data-visual-test="popover-placement-right-arrow-bottom"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match placement left and arrow bottom', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-left': '2rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="popover-placement-left-arrow-bottom"] button',
      selector: '[data-visual-test="popover-placement-left-arrow-bottom"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
