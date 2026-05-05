import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Iterate.Array', () => {
  const url = '/uilib/extensions/forms/Iterate/Array/demos/'

  test('have to match primitive element values', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="primitive-element-values"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match animated container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="animated-container"] .dnb-forms-section-block',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match filled view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="filled-view-and-edit-container"] .dnb-forms-section-view-block',
    })

    expect(screenshot).toMatchSnapshot()
  })

  test('have to match view container with line divider', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="view-and-edit-container-with-line-divider"]',
    })

    expect(screenshot).toMatchSnapshot()
  })

  test('have to match filled edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="filled-view-and-edit-container"]',
      screenshotSelector:
        '[data-visual-test="filled-view-and-edit-container"] .dnb-forms-section-edit-block',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filled-view-and-edit-container"] button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      screenshotSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-edit-block',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
