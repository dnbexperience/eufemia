import { fetchFigmaAll, fetchFigmaIcons } from '../FigmaAPI'
import { extractIcons } from '../tasks/assetsExtractors'
import { getRequiredBranchName } from '../../prebuild/commitToBranch'

vi.mock('../tasks/assetsExtractors', () => ({ extractIcons: vi.fn() }))
vi.mock('../../prebuild/commitToBranch', () => ({
  getRequiredBranchName: vi.fn(),
}))

// FigmaAPI logs on import, before a spy in beforeEach could silence it
vi.mock('../../lib', () => ({
  log: { start: vi.fn(), info: vi.fn(), succeed: vi.fn(), fail: vi.fn() },
  ErrorHandler: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('FigmaAPI', () => {
  it('rejects when extracting icons fails', async () => {
    vi.mocked(extractIcons).mockRejectedValueOnce(
      new Error('Figma could not export icons')
    )

    await expect(fetchFigmaIcons({ figmaFile: 'file' })).rejects.toThrow(
      'Figma could not export icons'
    )
  })

  it('rejects when the current branch is not an icon branch', async () => {
    vi.mocked(getRequiredBranchName).mockResolvedValueOnce(false)

    await expect(fetchFigmaAll()).rejects.toThrow(
      'Figma icon sync requires an icon branch'
    )
  })
})
