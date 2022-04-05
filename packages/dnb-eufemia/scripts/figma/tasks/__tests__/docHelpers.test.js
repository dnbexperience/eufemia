/**
 * Figma test
 *
 */

import '../../../../src/core/jest/jestSetup'
import { log } from '../../../lib'
import { getFigmaDoc } from '../../helpers/docHelpers'

const localFile = require.resolve('./files/FigmaTestDoc.json')

describe('FigmaDoc', () => {
  it('has to match selector criteria', async () => {
    const start = jest.fn()
    jest.spyOn(log, 'start').mockImplementation(start)
    const info = jest.fn()
    jest.spyOn(log, 'info').mockImplementation(info)
    const succeed = jest.fn()
    jest.spyOn(log, 'succeed').mockImplementation(succeed)

    const figmaDoc = await getFigmaDoc({
      forceRefetch: false,
      preventUpdate: true,
      localFile,
    })

    expect(typeof figmaDoc).toBe('object')
    expect(figmaDoc).toHaveProperty('name')
    expect(figmaDoc).toHaveProperty('lastModified')

    expect(start).toHaveBeenCalledTimes(1)
    expect(start).toHaveBeenCalledWith(
      expect.stringContaining('Fetching the figma doc')
    )
    expect(succeed).toHaveBeenCalledTimes(1)
    expect(succeed).toHaveBeenCalledWith(
      expect.stringContaining('Using old Figma document')
    )
  })
})
