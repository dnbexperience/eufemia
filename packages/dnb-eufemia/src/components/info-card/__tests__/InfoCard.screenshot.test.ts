import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`InfoCard for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/info-card/demos/',
    })

    test('renders correct default component', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="info-card-basic"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders correct stretched component', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '60rem' },
        selector: '[data-visual-test="info-card-stretch"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders correct component with title and buttons', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="info-card-buttons"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders correct component with close button', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector:
          '[data-visual-test="info-card-close-button"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders correct component with accept button', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector:
          '[data-visual-test="info-card-accept-button"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders the centered component', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector:
          '[data-visual-test="info-card-buttons-centered"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders the centered card component', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="info-card-centered"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders with custom icon', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector:
          '[data-visual-test="info-card-custom-icon"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders with custom image', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector:
          '[data-visual-test="info-card-custom-image"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders with custom image centered', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector:
          '[data-visual-test="info-card-custom-image-centered"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('renders with children', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="info-card-children"] .dnb-info-card',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
