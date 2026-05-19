import { afterEach, describe, expect, it, vi } from 'vitest'

const ENV_KEYS = ['CI', 'GITHUB_REF_NAME', 'GITHUB_REF'] as const
type EnvKey = (typeof ENV_KEYS)[number]

const setEnv = (env: Partial<Record<EnvKey, string | undefined>>) => {
  vi.resetModules()
  for (const key of ENV_KEYS) {
    if (env[key] === undefined) {
      vi.stubEnv(key, '')
    } else {
      vi.stubEnv(key, env[key]!)
    }
  }
}

const importClient = async () => {
  return await import('../themeSelection.client')
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('selectThemes', () => {
  it('returns all brands on main', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'main' })
    const { selectThemes } = await importClient()

    expect(
      selectThemes({ always: ['ui', 'sbanken'], onMain: ['eiendom'] })
    ).toEqual(['ui', 'sbanken', 'eiendom'])
  })

  it('skips main-only brands on feature branches in CI', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'feature/button' })
    const { selectThemes } = await importClient()

    expect(
      selectThemes({ always: ['ui', 'sbanken'], onMain: ['eiendom'] })
    ).toEqual(['ui', 'sbanken'])
  })

  it('extracts the branch name from GITHUB_REF', async () => {
    setEnv({ CI: 'true', GITHUB_REF: 'refs/heads/main' })
    const { selectThemes } = await importClient()

    expect(selectThemes({ always: ['ui'], onMain: ['eiendom'] })).toEqual([
      'ui',
      'eiendom',
    ])
  })

  it('includes main-only brands on version branches', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'v11' })
    const { selectThemes } = await importClient()

    expect(selectThemes({ always: ['ui'], onMain: ['eiendom'] })).toEqual([
      'ui',
      'eiendom',
    ])
  })

  it('includes main-only brands on version branch prefixes', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'v11-fix' })
    const { selectThemes } = await importClient()

    expect(selectThemes({ always: ['ui'], onMain: ['eiendom'] })).toEqual([
      'ui',
      'eiendom',
    ])
  })

  it('skips main-only brands when branch is unknown in CI', async () => {
    setEnv({ CI: 'true' })
    const { selectThemes } = await importClient()

    expect(selectThemes({ always: ['ui'], onMain: ['eiendom'] })).toEqual([
      'ui',
    ])
  })

  it('includes main-only brands locally when branch is unknown', async () => {
    setEnv({})
    const { selectThemes } = await importClient()

    expect(selectThemes({ always: ['ui'], onMain: ['eiendom'] })).toEqual([
      'ui',
      'eiendom',
    ])
  })
})

describe('onMain', () => {
  it('runs the callback on main', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'main' })
    const { onMain } = await importClient()
    const callback = vi.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('runs the callback on version branch prefixes', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'v11-fix' })
    const { onMain } = await importClient()
    const callback = vi.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('skips the callback on non-main branches in CI', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'feature/button' })
    const { onMain } = await importClient()
    const callback = vi.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('runs the callback locally on non-main branches', async () => {
    setEnv({ GITHUB_REF_NAME: 'feature/button' })
    const { onMain } = await importClient()
    const callback = vi.fn()

    onMain(callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('runOnMain is an alias for the theme-name overload', async () => {
    setEnv({ CI: 'true', GITHUB_REF_NAME: 'main' })
    const { runOnMain } = await importClient()

    expect(runOnMain('eiendom')).toBe('eiendom')
  })
})
