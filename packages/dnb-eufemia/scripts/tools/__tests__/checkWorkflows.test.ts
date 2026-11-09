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

  it('ignores `uses:` in a run script', () => {
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
})
