import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Form.Handler', () => {
  const url = '/uilib/extensions/forms/Form/Handler/demos/'

  it('have to match required and optional fields', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="required-and-optional-fields"]',
    })
  })
})
