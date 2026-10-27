import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/web/extensions/forms/Form/Card/demos/'

describe('Form.Card', () => {
  it('have to match when used in wizard', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="forms-card-in-wizard"]',
    })
  })
})
