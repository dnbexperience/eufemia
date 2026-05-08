import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Dropdown for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/dropdown/demos/',
    })

    test('have to match the closed dropdown', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match different sizes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dropdown-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match disabled state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dropdown-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match disabled options', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-bottom': '14rem',
        },
        selector: '[data-visual-test="dropdown-disabled-options"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dropdown-disabled-options"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match tertiary variant disabled state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dropdown-disabled-tertiary"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with icon on left side', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dropdown-left-icon"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with status: error', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-status-error"] .dnb-dropdown__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with tertiary button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with tertiary button in focus state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner',
        simulateSelector:
          '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__trigger',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the closed dropdown with focus', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
        simulateSelector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the closed dropdown with hover', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
        simulateSelector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown items', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '14rem',
        },
        selector:
          '[data-visual-test="dropdown-list"] .dnb-drawer-list__list',
        simulateSelector:
          '[data-visual-test="dropdown-list"] .dnb-drawer-list__option:nth-of-type(1)',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown button with ellipsis overflow', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-ellipsis"] .dnb-dropdown__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown button in active state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
        simulateSelector:
          '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with groups', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-bottom': '26rem',
        },
        selector: '[data-visual-test="dropdown-groups"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dropdown-groups"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Dropdown for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/dropdown/demos/',
      pageViewport: {
        width: 480,
        height: 480 * 2,
      },
    })

    test('have to match different item directions', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-top': '16rem',
        },
        selector: '[data-visual-test="dropdown-item-directions"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dropdown-item-directions"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with independentWidth opened with icon_position left', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-top': '16rem',
        },
        selector: '[data-visual-test="dropdown-independent_width_left"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dropdown-independent_width_left"] .dnb-dropdown button',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the dropdown with independentWidth opened with icon_position right', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-top': '16rem',
        },
        selector: '[data-visual-test="dropdown-independent_width_right"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dropdown-independent_width_right"] .dnb-dropdown button',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Dropdown for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/dropdown/demos/',
    })

    test('have to match the tertiary variant opened on left side', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dropdown-tertiary"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
        style: {
          'padding-bottom': '20rem',
          'padding-right': '5rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the tertiary variant opened on right side', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dropdown-tertiary-right"]',
        simulate: ['focus', 'click'],
        simulateSelector:
          '[data-visual-test="dropdown-tertiary-right"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
        style: {
          'padding-bottom': '20rem',
          'padding-right': '5rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
