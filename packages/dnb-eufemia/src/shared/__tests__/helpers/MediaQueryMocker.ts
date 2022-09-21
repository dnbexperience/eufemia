import { isMatchMediaSupported as _isMatchMediaSupported } from '../../MediaQueryUtils'
import MatchMediaMock from 'jest-matchmedia-mock'

const isMatchMediaSupported = _isMatchMediaSupported as jest.Mock

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
    matchMedia?.clear()
  })

  afterAll(() => {
    matchMedia?.destroy()
  })

  return matchMedia
}
