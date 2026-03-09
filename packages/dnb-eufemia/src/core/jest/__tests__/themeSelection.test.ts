import { onMain, runOnMain, selectThemes } from '../themeSelection'

describe('themeSelection', () => {
  const previousRefName = process.env.GITHUB_REF_NAME
  const previousRef = process.env.GITHUB_REF
  const previousCi = process.env.CI

  afterEach(() => {
    process.env.GITHUB_REF_NAME = previousRefName
    process.env.GITHUB_REF = previousRef
    process.env.CI = previousCi
  })

  it('returns all brands on main', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'main'

    const result = selectThemes({
      always: ['ui', 'sbanken'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui', 'sbanken', 'eiendom'])
  })

  it('skips main-only brands on feature branches', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'feature/button'

    const result = selectThemes({
      always: ['ui', 'sbanken'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui', 'sbanken'])
  })

  it('supports branch extraction from GITHUB_REF', () => {
    process.env.CI = 'true'
    delete process.env.GITHUB_REF_NAME
    process.env.GITHUB_REF = 'refs/heads/main'

    const result = selectThemes({
      always: ['ui'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui', 'eiendom'])
  })

  it('includes main-only brands on version branches', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'v11'

    const result = selectThemes({
      always: ['ui'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui', 'eiendom'])
  })

  it('includes main-only brands on version branch prefixes', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'v11-fix'

    const result = selectThemes({
      always: ['ui'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui', 'eiendom'])
  })

  it('skips main-only brands when branch is unknown in CI', () => {
    process.env.CI = 'true'
    delete process.env.GITHUB_REF_NAME
    delete process.env.GITHUB_REF

    const result = selectThemes({
      always: ['ui'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui'])
  })

  it('includes main-only brands locally when branch is unknown', () => {
    delete process.env.CI
    delete process.env.GITHUB_REF_NAME
    delete process.env.GITHUB_REF

    const result = selectThemes({
      always: ['ui'],
      onMain: ['eiendom'],
    })

    expect(result).toEqual(['ui', 'eiendom'])
  })

  it('runs callback on main', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'main'
    const callback = jest.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('runs callback on version branch prefixes', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'v11-fix'
    const callback = jest.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('skips callback on non-main branches in CI', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'feature/button'
    const callback = jest.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('runs callback locally on non-main branches', () => {
    delete process.env.CI
    process.env.GITHUB_REF_NAME = 'feature/button'
    const callback = jest.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('keeps runOnMain as an alias for onMain theme usage', () => {
    process.env.CI = 'true'
    process.env.GITHUB_REF_NAME = 'main'

    expect(runOnMain('eiendom')).toBe('eiendom')
  })
})
