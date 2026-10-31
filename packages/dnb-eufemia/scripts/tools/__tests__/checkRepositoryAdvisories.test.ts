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
    ['1.2.0', '>= 1.0.0, < 1.2.0', false],
    ['0.9.0', '>= 1.0.0, < 1.2.0', false],
    ['8.0.0-alpha.5', '>= 8.0.0-alpha.0, < 8.0.0-alpha.16', true],
    ['8.0.0-alpha.16', '>= 8.0.0-alpha.0, < 8.0.0-alpha.16', false],
    ['7.26.9', '<7.26.10, 8.0.0-alpha.0 - 8.0.0-alpha.16', true],
    ['8.0.0-alpha.16', '<7.26.10, 8.0.0-alpha.0 - 8.0.0-alpha.16', true],
    ['7.28.4', '<7.26.10, 8.0.0-alpha.0 - 8.0.0-alpha.16', false],
    ['7.20.0', '7.12.0 - 7.29.3', true],
    ['7.29.4', '7.12.0 - 7.29.3', false],
    ['1.1.0', '>=1.0.0 <1.2.0 || >=2.0.0 <2.1.0', true],
    ['1.5.0', '>=1.0.0 <1.2.0 || >=2.0.0 <2.1.0', false],
    ['3.1.2', '>= 2.3.1, <= 2.4.2; >= 3.0.0, <= 3.1.3', true],
    ['3.1.4', '>= 2.3.1, <= 2.4.2; >= 3.0.0, <= 3.1.3', false],
  ])('checks %s against "%s"', (version, range, expected) => {
    expect(isVersionInRange(version, range)).toBe(expected)
  })

  it.each([
    ['1.0.0', ''],
    ['1.0.0', '^1.0.0'],
    ['4.1.0', '4.0.0 < 4.1.2'],
    ['3.1.0', '3.0.0<= 3.1.0'],
    ['7.26.10', '7.26.10, 8.0.0-alpha.17'],
  ])('cannot read %s against "%s"', (version, range) => {
    expect(isVersionInRange(version, range)).toBeNull()
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

  it('reads ranges in npm syntax', () => {
    const advisories = [
      {
        ghsa_id: 'GHSA-968p-4wvh-cqc8',
        summary:
          'Inefficient RepExp complexity in generated code with .replace when transpiling named capturing groups',
        severity: 'medium',
        html_url:
          'https://github.com/babel/babel/security/advisories/GHSA-968p-4wvh-cqc8',
        vulnerabilities: [
          {
            package: { ecosystem: 'npm', name: '@babel/runtime-corejs3' },
            vulnerable_version_range:
              '<7.26.10, 8.0.0-alpha.0 - 8.0.0-alpha.16',
            patched_versions: '7.26.10, 8.0.0-alpha.17',
          },
        ],
      },
      {
        ghsa_id: 'GHSA-fv7c-fp4j-7gwp',
        summary:
          'Improper Control of Generation of Code when compiling specifically crafted malicious code with @babel/plugin-transform-modules-systemjs',
        severity: 'high',
        html_url:
          'https://github.com/babel/babel/security/advisories/GHSA-fv7c-fp4j-7gwp',
        vulnerabilities: [
          {
            package: {
              ecosystem: 'npm',
              name: '@babel/plugin-transform-modules-systemjs',
            },
            vulnerable_version_range: '7.12.0 - 7.29.3',
            patched_versions: '7.29.4',
          },
          {
            package: {
              ecosystem: 'npm',
              name: '@babel/plugin-transform-modules-systemjs',
            },
            vulnerable_version_range: '8.0.0-alpha.0 - 8.0.0-alpha.12',
            patched_versions: '8.0.0-alpha.13',
          },
        ],
      },
    ]

    expect(
      findAdvisoryMatches(
        { name: '@babel/runtime-corejs3', version: '7.26.9' },
        advisories
      )
    ).toEqual([
      {
        name: '@babel/runtime-corejs3',
        version: '7.26.9',
        ghsaId: 'GHSA-968p-4wvh-cqc8',
        severity: 'medium',
        summary: advisories[0].summary,
        url: advisories[0].html_url,
      },
    ])
    expect(
      findAdvisoryMatches(
        { name: '@babel/runtime-corejs3', version: '7.28.4' },
        advisories
      )
    ).toEqual([])
    expect(
      findAdvisoryMatches(
        {
          name: '@babel/plugin-transform-modules-systemjs',
          version: '7.20.0',
        },
        advisories
      )
    ).toEqual([expect.objectContaining({ ghsaId: 'GHSA-fv7c-fp4j-7gwp' })])
    expect(
      findAdvisoryMatches(
        {
          name: '@babel/plugin-transform-modules-systemjs',
          version: '8.0.0-alpha.12',
        },
        advisories
      )
    ).toHaveLength(1)
    expect(
      findAdvisoryMatches(
        {
          name: '@babel/plugin-transform-modules-systemjs',
          version: '7.29.4',
        },
        advisories
      )
    ).toEqual([])
  })

  it('reports entries with a missing or unreadable range for review', () => {
    const advisory = (
      vulnerable_version_range: string | null,
      patched_versions: string | null = null
    ) => ({
      ghsa_id: 'GHSA-xxxx-xxxx-xxxx',
      summary: 'Summary',
      severity: 'low',
      html_url: 'https://github.com/advisories/GHSA-xxxx-xxxx-xxxx',
      vulnerabilities: [
        {
          package: { ecosystem: 'npm', name: 'a' },
          vulnerable_version_range,
          patched_versions,
        },
      ],
    })
    const entry = { name: 'a', version: '1.0.0' }

    expect(findAdvisoryMatches(entry, [advisory(null)])).toEqual([
      expect.objectContaining({
        ghsaId: 'GHSA-xxxx-xxxx-xxxx',
        unreadableRange: '',
      }),
    ])
    expect(findAdvisoryMatches(entry, [advisory('^1.0.0')])).toEqual([
      expect.objectContaining({ unreadableRange: '^1.0.0' }),
    ])
    expect(
      findAdvisoryMatches({ name: 'b', version: '1.0.0' }, [
        advisory(null),
      ])
    ).toEqual([])
    expect(findAdvisoryMatches(entry, [advisory(null, '1.0.0')])).toEqual(
      []
    )
    expect(findAdvisoryMatches(entry, [advisory('>= 2.0.0')])).toEqual([])
  })

  it.each([
    ['7.1.6', '7.1.6', true],
    ['7.1.5', '7.1.6', false],
    ['8.0.0', '7.1.6', true],
    ['6.1.4', '6.1.4, 7.1.6', true],
    ['6.1.3', '6.1.4, 7.1.6', false],
    ['7.1.3', null, false],
    ['8.0.0-rc.5', '8.0.0-rc.6', false],
    ['8.0.0-rc.6', '8.0.0-rc.6', true],
    ['3.1.9', '4.1.2; 3.1.5; 2.4.4', true],
    ['3.1.4', '4.1.2; 3.1.5; 2.4.4', false],
  ])('treats %s as patched by "%s": %s', (version, patched, expected) => {
    expect(isPatched(version, patched)).toBe(expected)
  })
})
