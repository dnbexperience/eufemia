import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Form.Appearance for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/Form/Appearance/demos/',
  })

  it('have to match size', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="form-appearance-size"]',
    })
  })

  it('have to match size nested', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="form-appearance-size-nested"]',
    })
  })
})
