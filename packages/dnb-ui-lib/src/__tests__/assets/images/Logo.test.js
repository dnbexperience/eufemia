/**
 * Component Test
 *
 */

import path from 'path'
import {
  loadImage,
  setupJestScreenshot
} from '../../../core/jest/jestSetup'

describe('Logo image', () => {
  setupJestScreenshot()
  it('have to match image snapshot', async () => {
    const image = await loadImage(
      path.resolve(__dirname, '../../../../assets/images/dnb-logo.png')
    )
    expect(image).toMatchImageSnapshot()
  })
})
