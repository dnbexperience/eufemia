import { isMatchMediaSupported as _isMatchMediaSupported } from '../../MediaQueryUtils'
import MatchMediaMock from '../../../core/test-utils/MatchMediaMock'

const isMatchMediaSupported =
  _isMatchMediaSupported as import('vitest').Mock

vi.mock('../../MediaQueryUtils', async () => ({
  ...(await vi.importActual<typeof import('../../MediaQueryUtils')>(
    '../../MediaQueryUtils'
  )),
  isMatchMediaSupported: vi.fn(),
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
