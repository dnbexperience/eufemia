import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Autocomplete for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/demos/',
    pageViewport: {
      height: 1024, // The height influences this test: data-visual-test="autocomplete-drawer-search"
    },
  })

  // Run this test as one of the first because it's scroll-sensitive
  // Browser scroll position affects the list height
  it('have to match autocomplete with search result', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-drawer-search"]',
      simulateSelector:
        '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '30rem',
      },
    })
  })
})

describe.each(['ui', 'sbanken'])(`Autocomplete for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/demos/',
  })

  it('have to match different sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-sizes"]',
    })
  })

  it('have to match custom input width', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-input-width"]',
    })
  })

  it('have to match autocomplete with drawer-button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner',
    })
  })

  it('have to match the closed autocomplete', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner',
    })
  })

  it('have to match autocomplete with suffix value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-suffix"]',
      simulateSelector:
        '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '25rem',
      },
    })
  })

  it('have to match autocomplete with groups', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-groups"]',
      simulateSelector:
        '[data-visual-test="autocomplete-groups"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '29rem',
      },
      simulateAfter: { keypress: 'Escape' },
    })
  })

  it('have to match the status with status_state information', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-status-information"] .dnb-autocomplete__inner',
    })
  })

  it('have to match the status with status_state error', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-status-error"] .dnb-autocomplete__inner',
    })
  })
})

describe.each(['ui', 'sbanken'])(`Autocomplete for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/demos/',
    pageViewport: {
      width: 700,
    },
  })

  it('have to match small screen autocomplete with suffix value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-suffix"]',
      style: {
        height: '4rem',
      },
    })
  })
})

describe.each(['ui', 'sbanken'])(`Autocomplete for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/visual-tests/',
  })

  it('have to match disabled state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-disabled"]',
    })
  })

  it('have to match disabled options', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-disabled-options"]',
      simulateSelector:
        '[data-visual-test="autocomplete-disabled-options"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '25rem',
      },
    })
  })

  it('have to match autocomplete opened list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="autocomplete-opened"]',
      simulateSelector:
        '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
      simulate: 'click',
      style: {
        height: '40rem',
      },
    })
  })
})
