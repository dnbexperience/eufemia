import { isMatchMediaSupported as _isMatchMediaSupported } from '../../MediaQueryUtils'
import { matchMedia } from 'mock-match-media'

const isMatchMediaSupported = _isMatchMediaSupported as jest.Mock

jest.mock('../../MediaQueryUtils', () => ({
  ...jest.requireActual('../../MediaQueryUtils'),
  isMatchMediaSupported: jest.fn(),
}))

export function mockMediaQuery() {
  beforeEach(() => {
    isMatchMediaSupported.mockReturnValue(true)
  })

  return { useMediaQuery: (query: string) => matchMedia(query).matches }
}
