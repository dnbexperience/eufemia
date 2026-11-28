import { checkWorkflowFile } from '../checkWorkflows.mjs'

const sha = '3d3c42e5aac5ba805825da76410c181273ba90b1'
const file = '.github/workflows/test.yml'

describe('checkWorkflowFile', () => {
  it('accepts actions pinned to a full-length commit SHA', () => {
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@${sha} # v7
      - name: Analyse
        uses: 'github/codeql-action/init@${sha}'
`

    expect(checkWorkflowFile({ file, text })).toEqual([])
  })

  it('reports actions pinned to a tag, a branch or a short SHA', () => {
    const text = `permissions: {}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/cache@main
      - uses: actions/setup-node@3d3c42e
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `actions/checkout@v7` must be pinned to a full-length commit SHA',
      '.github/workflows/test.yml: `actions/cache@main` must be pinned to a full-length commit SHA',
      '.github/workflows/test.yml: `actions/setup-node@3d3c42e` must be pinned to a full-length commit SHA',
    ])
  })

  it('accepts local actions and local reusable workflows', () => {
    const text = `permissions:
  contents: read

jobs:
  changes:
    uses: ./.github/workflows/detect.yml

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: ./.github/actions/setup
`

    expect(checkWorkflowFile({ file, text })).toEqual([])
  })

  it('reports third-party actions that are not allowed', () => {
    const text = `permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: hashicorp/setup-terraform@${sha}
      - uses: someone/deploy-action@${sha}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `someone/deploy-action` is not on ALLOWED_THIRD_PARTY_ACTIONS',
    ])
    expect(
      checkWorkflowFile({ file, text, allowed: ['someone/deploy-action'] })
    ).toEqual([
      '.github/workflows/test.yml: `hashicorp/setup-terraform` is not on ALLOWED_THIRD_PARTY_ACTIONS',
    ])
  })

  it('reports Docker images that are not pinned to a digest', () => {
    const digest = 'a'.repeat(64)
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: docker://alpine:3
      - uses: docker://alpine@sha256:${digest}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `docker://alpine:3` must be pinned to an image digest (`@sha256:…`)',
    ])
  })

  it('reports jobs that set no permissions when their workflow sets none', () => {
    const text = `on: push

jobs:
  lint:
    permissions:
      contents: read
    runs-on: ubuntu-latest
    steps:
      - run: echo lint

  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo test
        env:
          permissions: none

  changes:
    uses: ./.github/workflows/detect.yml
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: job `test` sets no `permissions`, and neither does its workflow',
      '.github/workflows/test.yml: job `changes` sets no `permissions`, and neither does its workflow',
    ])
  })

  it('reports a workflow whose jobs it cannot find', () => {
    const text = `on: push

jobs:
    build:
        runs-on: ubuntu-latest
        permissions:
            contents: read
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: found no jobs at two-space indentation; format it with Prettier',
    ])
  })

  it('ignores `uses:` that does not start a line, as in a run script', () => {
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "uses: actions/checkout@v7"
`

    expect(checkWorkflowFile({ file, text })).toEqual([])
  })

  it('reads `uses:` in a flow mapping and with a quoted key', () => {
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - { uses: actions/checkout@v7 }
      - { name: Cache, uses: 'actions/cache@main' }
      - "uses": someone/action@v1
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `actions/checkout@v7` must be pinned to a full-length commit SHA',
      '.github/workflows/test.yml: `actions/cache@main` must be pinned to a full-length commit SHA',
      '.github/workflows/test.yml: `someone/action@v1` must be pinned to a full-length commit SHA',
    ])
  })

  it('reports local actions outside .github, which it does not read', () => {
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: ./tools/setup
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `./tools/setup` is a local action outside `.github`, which this check does not read',
    ])
  })

  it('reads quoted job ids', () => {
    const text = `on: push

jobs:
  a:
    runs-on: ubuntu-latest
  "b":
    permissions:
      contents: read
    runs-on: ubuntu-latest
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: job `a` sets no `permissions`, and neither does its workflow',
    ])
  })

  it('accepts jobs that read a deploy token in the ghe-deploy environment', () => {
    const text = `permissions:
  contents: read

jobs:
  push:
    runs-on: ubuntu-latest
    environment: ghe-deploy # holds the token
    steps:
      - run: echo push
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}

  monitoring:
    runs-on: ubuntu-latest
    environment:
      url: https://example.invalid
      name: 'ghe-deploy' # holds the token
    steps:
      - run: echo monitoring
        env:
          GHE_PAT: \${{ secrets['GHE_MONITORING_DEPLOY_PAT'] }}
`

    expect(checkWorkflowFile({ file, text })).toEqual([])
  })

  it('reports a job that reads a deploy token outside the ghe-deploy environment', () => {
    const text = `permissions:
  contents: read

jobs:
  push:
    runs-on: ubuntu-latest
    environment: ghe-deploy
    steps:
      - run: echo push
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}

  none:
    runs-on: ubuntu-latest
    steps:
      - run: echo none
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}

  other:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo other
        env:
          GHE_PAT: \${{ secrets['ghe_monitoring_deploy_pat'] }}

  dynamic:
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment }}
    steps:
      - run: echo dynamic
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: job `none` reads `secrets.GHE_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
      '.github/workflows/test.yml: job `other` reads `secrets.GHE_MONITORING_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
      '.github/workflows/test.yml: job `dynamic` reads `secrets.GHE_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
    ])
  })

  it('reports a deploy token that is read outside a job', () => {
    const text = `permissions:
  contents: read

env:
  GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}

jobs:
  build:
    runs-on: ubuntu-latest
    environment: ghe-deploy
    steps:
      - run: echo build
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `secrets.GHE_DEPLOY_PAT` is read outside a job, so no environment applies; read it in a job that uses the `ghe-deploy` environment',
    ])
  })

  it('ignores the name of a deploy token in a comment', () => {
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # secrets.GHE_DEPLOY_PAT belongs to the ghe-deploy environment
      - run: echo build
`

    expect(checkWorkflowFile({ file, text })).toEqual([])
  })

  it('reports a job line it cannot read, also when the workflow sets its permissions', () => {
    const text = `permissions:
  contents: read

jobs:
  push:
    runs-on: ubuntu-latest
    environment: ghe-deploy
  "other job":
    runs-on: ubuntu-latest
    steps:
      - run: echo other
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: cannot read the job on line 8',
    ])
  })

  it('reports each deploy token once per job', () => {
    const text = `permissions:
  contents: read

jobs:
  both:
    runs-on: ubuntu-latest
    steps:
      - run: echo both
        env:
          FIRST: \${{ secrets.GHE_DEPLOY_PAT }}
          SECOND: \${{ secrets.GHE_MONITORING_DEPLOY_PAT }}
          THIRD: \${{ secrets.GHE_DEPLOY_PAT }}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: job `both` reads `secrets.GHE_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
      '.github/workflows/test.yml: job `both` reads `secrets.GHE_MONITORING_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
    ])
  })

  it('reports an environment name with extra text or mismatched quotes', () => {
    const text = `permissions:
  contents: read

jobs:
  extra:
    runs-on: ubuntu-latest
    environment: ghe-deploy extra
    steps:
      - run: echo extra
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}

  quotes:
    runs-on: ubuntu-latest
    environment: 'ghe-deploy"
    steps:
      - run: echo quotes
        env:
          GHE_PAT: \${{ secrets.GHE_DEPLOY_PAT }}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: job `extra` reads `secrets.GHE_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
      '.github/workflows/test.yml: job `quotes` reads `secrets.GHE_DEPLOY_PAT` and must run in the `ghe-deploy` environment',
    ])
  })

  it('reports a job line it cannot read', () => {
    const text = `on: push

jobs:
  <<: *defaults
  build:
    permissions: {}
    runs-on: ubuntu-latest
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: cannot read the job on line 4',
    ])
  })

  it('reads a file that starts with a byte order mark', () => {
    const text = `\uFEFFpermissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
`

    expect(checkWorkflowFile({ file, text })).toEqual([])
  })

  it('checks the steps of a composite action, which has no permissions', () => {
    const text = `name: Setup
runs:
  using: composite
  steps:
    - uses: actions/cache@v6
    - uses: actions/setup-node@${sha}
`

    expect(
      checkWorkflowFile({ file: '.github/actions/setup/action.yml', text })
    ).toEqual([
      '.github/actions/setup/action.yml: `actions/cache@v6` must be pinned to a full-length commit SHA',
    ])
  })

  it('reports the retired personal access token secrets', () => {
    const text = `permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: git push
        env:
          GH_TOKEN: \${{ secrets.GH_TOKEN }}
          GH_NAME: \${{ secrets['GH_NAME'] }}
          GH_EMAIL: \${{ secrets.GH_EMAIL }}
          LOWER_CASE: \${{ secrets.gh_token }}
          OTHER: \${{ secrets.GH_TOKEN_OTHER }}
          BUILT_IN: \${{ secrets.GITHUB_TOKEN }}
`

    expect(checkWorkflowFile({ file, text })).toEqual([
      '.github/workflows/test.yml: `secrets.GH_TOKEN` is a retired personal access token secret; use a GitHub App token instead',
      '.github/workflows/test.yml: `secrets.GH_NAME` is a retired personal access token secret; use a GitHub App token instead',
      '.github/workflows/test.yml: `secrets.GH_EMAIL` is a retired personal access token secret; use a GitHub App token instead',
      '.github/workflows/test.yml: `secrets.gh_token` is a retired personal access token secret; use a GitHub App token instead',
    ])
  })
})
