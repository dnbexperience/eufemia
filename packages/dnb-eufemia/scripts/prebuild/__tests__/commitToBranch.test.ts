/**
 * Commit to branch test
 *
 */

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getRepo', () => {
  it('hands the CI auth header to git when guarded git variables are set', async () => {
    vi.stubEnv('CI', 'true')
    vi.stubEnv('GH_TOKEN', 'token')
    vi.stubEnv('GIT_ASKPASS', 'echo')

    const { getRepo } = await import('../commitToBranch')
    const repo = await getRepo()
    const header = await repo.raw([
      'config',
      '--get',
      'http.https://github.com/.extraheader',
    ])

    expect(header.trim()).toBe(
      `AUTHORIZATION: basic ${Buffer.from('x-access-token:token').toString('base64')}`
    )
  })
})
