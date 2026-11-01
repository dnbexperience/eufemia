import {
  checkRepositoryAdvisories,
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
    ['1.0.0', '>= 1.0.0, <= 1.0.0', true],
    ['15.0.0', '15.0.0', true],
    ['14.2.0', '15.0.0', false],
    ['19.1.1', '19.0.0, 19.1.0, 19.1.1, 19.2.0', true],
    ['18.3.1', '19.0.0, 19.1.0, 19.1.1, 19.2.0', false],
    ['19.1.2', '19.0.0, 19.1.0, 19.1.1, 19.2.0', false],
    ['7.26.10', '7.26.10, 8.0.0-alpha.17', true],
  ])('checks %s against "%s"', (version, range, expected) => {
    expect(isVersionInRange(version, range)).toBe(expected)
  })

  it.each([
    ['1.0.0', ''],
    ['1.0.0', '^1.0.0'],
    ['4.1.0', '4.0.0 < 4.1.2'],
    ['3.1.0', '3.0.0<= 3.1.0'],
    ['4.7.2', '4.7.1+'],
    ['7.2.0', '7.0.0-7.4.0'],
    ['4.47.0', '4.46.0-4.48.7 '],
    ['15.3.0', '15.0.0'],
    ['7.26.9', '<7.26.10, >=8.0.0-alpha.0'],
    ['1.5.0', '2.0.0 - 1.0.0'],
    ['1.0.0', '> 1.0.0, <= 1.0.0'],
    [
      '5.4.19',
      '>=2.9.18,<3.0.0,>=3.2.9,<4.0.0,>=4.5.3,<5.0.0,>=5.2.6,<=5.4.20',
    ],
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
    ['GHSA-9g9p-9gw9-jx7f', 'next', '15.0.0', '15.5.10', '15.3.0'],
    ['GHSA-gc7p-j5xm-xxh2', '@strapi/strapi', '4.0.0', '4.13.1', '4.5.0'],
    [
      'GHSA-4q56-crqp-v477',
      '@react-router/express',
      '7.0.0-7.4.0',
      '7.4.1',
      '7.2.0',
    ],
    [
      'GHSA-g5m6-hxpp-fc49',
      '@sveltejs/kit',
      '2.0.0-2.4.2',
      '2.4.3',
      '2.3.0',
    ],
    ['GHSA-9gh8-wp53-ccc6', 'ghost', '4.46.0-4.48.7 ', '4.48.8', '4.47.0'],
    ['GHSA-68jh-rf6x-836f', '@apollo/server', '4.7.1+', '4.7.4', '4.7.2'],
    [
      'GHSA-93m4-6634-74q7',
      'vite',
      '>=2.9.18,<3.0.0,>=3.2.9,<4.0.0,>=4.5.3,<5.0.0,>=5.2.6,<=5.4.20',
      '5.4.21',
      '5.4.19',
    ],
  ])(
    'reports %s for %s "%s" as unreadable until it is patched',
    (ghsaId, name, range, patched, version) => {
      const advisories = [
        {
          ghsa_id: ghsaId,
          summary: 'Summary',
          severity: 'high',
          html_url: `https://github.com/advisories/${ghsaId}`,
          vulnerabilities: [
            {
              package: { ecosystem: 'npm', name },
              vulnerable_version_range: range,
              patched_versions: patched,
            },
          ],
        },
      ]

      expect(findAdvisoryMatches({ name, version }, advisories)).toEqual([
        expect.objectContaining({ ghsaId, unreadableRange: range }),
      ])
      expect(
        findAdvisoryMatches({ name, version: patched }, advisories)
      ).toEqual([])
    }
  )

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
    ['2.10.0', '2.10.1, 2.9.3, 1.123.22', false],
    ['2.10.1', '2.10.1, 2.9.3, 1.123.22', true],
    ['19.1.1', '19.0.1, 19.1.2, 19.2.1', false],
    ['1.20.0', '>=1.20.0', true],
    ['1.19.0', '>= 1.20.0', false],
    ['15.2.2', '14.2.30, >= 15.2.2', true],
    ['15.2.1', '14.2.30, >= 15.2.2', false],
  ])('treats %s as patched by "%s": %s', (version, patched, expected) => {
    expect(isPatched(version, patched)).toBe(expected)
  })

  it('does not treat a version as patched because an older line of its major was fixed', () => {
    const advisories = [
      {
        ghsa_id: 'GHSA-jjpj-p2wh-qf23',
        summary: 'Sandbox Escape in JavaScript Task Runner',
        severity: 'critical',
        html_url:
          'https://github.com/n8n-io/n8n/security/advisories/GHSA-jjpj-p2wh-qf23',
        vulnerabilities: [
          {
            package: { ecosystem: 'npm', name: 'n8n' },
            vulnerable_version_range:
              '< 1.123.22, >= 2.0.0 < 2.9.3, >= 2.10.0 < 2.10.1',
            patched_versions: '2.10.1, 2.9.3, 1.123.22',
          },
        ],
      },
      {
        ghsa_id: 'GHSA-h25m-26qc-wcjf',
        summary: 'Denial of Service with Server Components',
        severity: 'high',
        html_url:
          'https://github.com/vercel/next.js/security/advisories/GHSA-h25m-26qc-wcjf',
        vulnerabilities: [
          {
            package: { ecosystem: 'npm', name: 'next' },
            vulnerable_version_range:
              '>=13.0.0 <15.0.8, >=15.0.0 <15.6.0-canary.61, >=16.0.0 <16.1.5',
            patched_versions:
              '15.0.8, 15.1.12, 15.2.9, 15.3.9, 15.4.11, 15.5.10, 15.6.0-canary.61, 16.0.11, 16.1.5',
          },
        ],
      },
    ]

    const [match, ...rest] = findAdvisoryMatches(
      { name: 'n8n', version: '2.10.0' },
      advisories
    )
    expect(rest).toEqual([])
    expect(match).toEqual(
      expect.objectContaining({ ghsaId: 'GHSA-jjpj-p2wh-qf23' })
    )
    expect(match).not.toHaveProperty('unreadableRange')
    expect(
      findAdvisoryMatches({ name: 'n8n', version: '2.10.1' }, advisories)
    ).toEqual([])
    expect(
      findAdvisoryMatches({ name: 'n8n', version: '2.9.3' }, advisories)
    ).toEqual([])
    expect(
      findAdvisoryMatches({ name: 'next', version: '16.1.4' }, advisories)
    ).toEqual([expect.objectContaining({ ghsaId: 'GHSA-h25m-26qc-wcjf' })])
    expect(
      findAdvisoryMatches({ name: 'next', version: '16.1.5' }, advisories)
    ).toEqual([])
  })

  it('reads patched versions written as a lower bound', () => {
    const advisories = [
      {
        ghsa_id: 'GHSA-3h52-269p-cp9r',
        summary: 'Information exposure in Next.js dev server',
        severity: 'low',
        html_url:
          'https://github.com/vercel/next.js/security/advisories/GHSA-3h52-269p-cp9r',
        vulnerabilities: [
          {
            package: { ecosystem: 'npm', name: 'next' },
            vulnerable_version_range:
              '>=13.0.0 <14.2.30, >=15.0.0 <15.2.2',
            patched_versions: '14.2.30, >= 15.2.2',
          },
        ],
      },
      {
        ghsa_id: 'GHSA-r4gj-5m52-g5wh',
        summary: 'axios advisory',
        severity: 'high',
        html_url:
          'https://github.com/axios/axios/security/advisories/GHSA-r4gj-5m52-g5wh',
        vulnerabilities: [
          {
            package: { ecosystem: 'npm', name: 'axios' },
            vulnerable_version_range: '1.17.0',
            patched_versions: '>=1.20.0',
          },
        ],
      },
    ]

    expect(
      findAdvisoryMatches({ name: 'next', version: '15.2.1' }, advisories)
    ).toEqual([expect.objectContaining({ ghsaId: 'GHSA-3h52-269p-cp9r' })])
    expect(
      findAdvisoryMatches({ name: 'next', version: '15.2.2' }, advisories)
    ).toEqual([])
    expect(
      findAdvisoryMatches({ name: 'axios', version: '1.20.0' }, advisories)
    ).toEqual([])
    expect(
      findAdvisoryMatches({ name: 'axios', version: '2.0.0' }, advisories)
    ).toEqual([])
  })

  it('reads a list of versions as any of them', () => {
    const advisories = [
      {
        ghsa_id: 'GHSA-fv66-9v8q-g76r',
        summary:
          'Critical Security Vulnerability in React Server Components',
        severity: 'critical',
        html_url:
          'https://github.com/react/react/security/advisories/GHSA-fv66-9v8q-g76r',
        vulnerabilities: [
          {
            package: {
              ecosystem: 'npm',
              name: 'react-server-dom-webpack',
            },
            vulnerable_version_range: '19.0.0, 19.1.0, 19.1.1, 19.2.0',
            patched_versions: '19.0.1, 19.1.2, 19.2.1',
          },
        ],
      },
    ]
    const check = (version: string) =>
      findAdvisoryMatches(
        { name: 'react-server-dom-webpack', version },
        advisories
      )

    expect(check('19.1.1')).toEqual([
      expect.objectContaining({ ghsaId: 'GHSA-fv66-9v8q-g76r' }),
    ])
    expect(check('19.1.1')[0]).not.toHaveProperty('unreadableRange')
    expect(check('19.0.0')).toHaveLength(1)
    expect(check('18.3.1')).toEqual([])
    expect(check('19.1.2')).toEqual([])
    expect(check('19.2.1')).toEqual([])
  })

  describe('with the lockfile', () => {
    const stubFetch = (advisoriesStatus: number) => {
      vi.stubGlobal(
        'fetch',
        vi.fn(async (url: string) =>
          url.startsWith('https://registry.npmjs.org/')
            ? {
                ok: true,
                status: 200,
                json: async () => ({
                  repository: { url: 'https://github.com/owner/repo' },
                }),
              }
            : {
                ok: advisoriesStatus === 200,
                status: advisoriesStatus,
                json: async () => [],
              }
        )
      )
    }

    beforeEach(() => {
      vi.spyOn(console, 'log').mockImplementation(() => undefined)
    })

    afterEach(() => {
      vi.unstubAllGlobals()
      vi.restoreAllMocks()
    })

    it('fails when every GitHub repository is skipped', async () => {
      stubFetch(404)

      await expect(checkRepositoryAdvisories()).rejects.toThrow(
        'All 1 GitHub repositories were skipped'
      )
    })

    it('passes when the advisories could be read', async () => {
      stubFetch(200)

      await expect(checkRepositoryAdvisories()).resolves.toEqual([])
    })
  })
})
