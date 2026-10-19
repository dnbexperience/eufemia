import {
  findAdvisoryMatches,
  getProductionPackages,
  isPatched,
  isVersionInRange,
  parseLockfile,
  toGitHubRepository,
} from '../checkRepositoryAdvisories'

const lockfile = `__metadata:
  version: 8

"a@npm:1.0.0":
  version: 1.0.0
  resolution: "a@npm:1.0.0"
  dependencies:
    "@scope/b": "npm:^2.0.0"
  peerDependencies:
    react: "*"
  languageName: node

"@scope/b@npm:2.1.0, @scope/b@npm:^2.0.0":
  version: 2.1.0
  resolution: "@scope/b@npm:2.1.0"
  dependencies:
    c: "npm:^3.0.0"
  dependenciesMeta:
    c:
      optional: true

"c@npm:3.0.1":
  version: 3.0.1
  resolution: "c@npm:3.0.1"

"dev-only@npm:9.0.0":
  version: 9.0.0
  resolution: "dev-only@npm:9.0.0"
`

describe('checkRepositoryAdvisories', () => {
  it('collects the production packages from the lockfile', () => {
    const packages = getProductionPackages(parseLockfile(lockfile), {
      a: '1.0.0',
      local: 'workspace:*',
    })

    expect(
      packages.map(({ name, version }) => `${name}@${version}`)
    ).toEqual(['a@1.0.0', '@scope/b@2.1.0', 'c@3.0.1'])
  })

  it('falls back to the locked versions when a resolution rewrote the range', () => {
    const packages = getProductionPackages(parseLockfile(lockfile), {
      c: '^3.0.0',
    })

    expect(packages.map(({ version }) => version)).toEqual(['3.0.1'])
  })

  it.each([
    ['7.1.3', '>= 0', true],
    ['7.1.3', '>= 7.0.0, < 7.1.6', true],
    ['7.1.6', '>= 7.0.0, < 7.1.6', false],
    ['6.1.3', '>= 7.0.0, < 7.1.6', false],
    ['1.2.3', '= 1.2.3', true],
    ['1.2.4', '<= 1.2.3', false],
  ])('checks %s against "%s"', (version, range, expected) => {
    expect(isVersionInRange(version, range)).toBe(expected)
  })

  it.each([
    [
      'git+https://github.com/postcss/postcss-selector-parser.git',
      'postcss/postcss-selector-parser',
    ],
    ['git@github.com:taiga-family/maskito.git', 'taiga-family/maskito'],
    ['https://github.com/date-fns/date-fns#readme', 'date-fns/date-fns'],
    ['https://gitlab.com/some/repo', null],
    [undefined, null],
  ])('reads the GitHub repository from %s', (url, expected) => {
    expect(toGitHubRepository(url)).toBe(expected)
  })

  it('reports advisories that affect the locked version', () => {
    const advisories = [
      {
        ghsa_id: 'GHSA-rj75-hqrm-r3gf',
        summary: 'Quadratic selector parsing',
        severity: 'medium',
        html_url: 'https://github.com/advisories/GHSA-rj75-hqrm-r3gf',
        vulnerabilities: [
          {
            package: { ecosystem: 'npm', name: 'postcss-selector-parser' },
            vulnerable_version_range: '>=0',
            patched_versions: '7.1.6',
          },
        ],
      },
    ]

    expect(
      findAdvisoryMatches(
        { name: 'postcss-selector-parser', version: '7.1.3' },
        advisories
      )
    ).toEqual([
      expect.objectContaining({
        name: 'postcss-selector-parser',
        version: '7.1.3',
        ghsaId: 'GHSA-rj75-hqrm-r3gf',
      }),
    ])
    expect(
      findAdvisoryMatches(
        { name: 'postcss-selector-parser', version: '7.1.6' },
        advisories
      )
    ).toEqual([])
    expect(
      findAdvisoryMatches(
        { name: 'postcss-selector-parser', version: '6.1.3' },
        advisories
      )
    ).toHaveLength(1)
  })

  it.each([
    ['7.1.6', '7.1.6', true],
    ['7.1.5', '7.1.6', false],
    ['8.0.0', '7.1.6', true],
    ['6.1.4', '6.1.4, 7.1.6', true],
    ['6.1.3', '6.1.4, 7.1.6', false],
    ['7.1.3', null, false],
  ])('treats %s as patched by "%s": %s', (version, patched, expected) => {
    expect(isPatched(version, patched)).toBe(expected)
  })
})
