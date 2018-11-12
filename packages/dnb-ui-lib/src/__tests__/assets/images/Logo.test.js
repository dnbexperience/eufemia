/**
 * Component Test
 *
 */

import path from 'path'
import {
  loadImage,
  setupPageScreenshot
} from '../../../core/jest/jestSetup'

describe('Logo image', () => {
  setupPageScreenshot()
  it('have to match image snapshot', async () => {
    const image = await loadImage(
      path.resolve(__dirname, '../../../../assets/images/dnb-logo.png')
    )
    expect(image).toMatchImageSnapshot()
  })
})
