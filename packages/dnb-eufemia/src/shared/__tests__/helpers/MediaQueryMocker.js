import { isMatchMediaSupported } from '../../MediaQueryUtils'
import MatchMediaMock from 'jest-matchmedia-mock'

jest.mock('../../MediaQueryUtils', () => ({
  ...jest.requireActual('../../MediaQueryUtils'),
  isMatchMediaSupported: jest.fn(),
}))

export function mockMediaQuery() {
  const matchMedia = new MatchMediaMock()

  beforeEach(() => {
    isMatchMediaSupported.mockReturnValue(true)
  })

  afterEach(() => {
    matchMedia.clear()
  })

  afterAll(() => {
    matchMedia.destroy()
  })

  return matchMedia
}
