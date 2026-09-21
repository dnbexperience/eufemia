import { fetchFigmaAll, fetchFigmaIcons } from '../FigmaAPI'
import { extractIcons } from '../tasks/assetsExtractors'
import { getRequiredBranchName } from '../../prebuild/commitToBranch'
import { log } from '../../lib'

vi.mock('../tasks/assetsExtractors', () => ({ extractIcons: vi.fn() }))
vi.mock('../../prebuild/commitToBranch', () => ({
  getRequiredBranchName: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(log, 'start').mockImplementation(vi.fn())
  vi.spyOn(log, 'info').mockImplementation(vi.fn())
  vi.spyOn(log, 'succeed').mockImplementation(vi.fn())
  vi.spyOn(log, 'fail').mockImplementation(vi.fn())
})

afterEach(() => {
  vi.restoreAllMocks()
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
