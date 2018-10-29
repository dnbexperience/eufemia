/**
 * Component Test
 *
 */

import { loadImage } from '../../../core/jest/jestSetup'

describe('Logo image', () => {
  it('have to match image snapshot', async () => {
    const image = await loadImage(
      require.resolve('../../../assets/images/dnb-logo.png')
    )
    expect(image).toMatchImageSnapshot()
  })
})
