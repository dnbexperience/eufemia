import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const infra = fs.readFileSync(
  path.resolve(import.meta.dirname, '../infra/main.tf'),
  'utf8'
)
const edgeAuth = fs.readFileSync(
  path.resolve(
    import.meta.dirname,
    '../infra/functions/edge-auth.js.tftpl'
  ),
  'utf8'
)
const publicWorkflow = fs.readFileSync(
  path.resolve(
    import.meta.dirname,
    '../../../.github/workflows/assets.yml'
  ),
  'utf8'
)
const deployWorkflow = fs.readFileSync(
  path.resolve(import.meta.dirname, '../ghe-deploy-workflow.yml'),
  'utf8'
)
const socialImageWorkflow = fs.readFileSync(
  path.resolve(import.meta.dirname, '../ghe-og-workflow.yml'),
  'utf8'
)

function workflowJobs(workflow: string) {
  const [header, body] = workflow.split('\njobs:\n')
  return {
    header,
    jobs: Object.fromEntries(
      body
        .split(/\n(?= {2}[a-z-]+:\n)/)
        .map((job) => [job.trim().split(':')[0], job])
    ),
  }
}

describe('assets infrastructure', () => {
  it('keeps the bucket private behind a CloudFront OAC', () => {
    expect(infra).toContain('block_public_policy     = true')
    expect(infra).toContain(
      'origin_access_control_id = aws_cloudfront_origin_access_control.assets.id'
    )
    expect(infra).toContain('identifiers = ["cloudfront.amazonaws.com"]')
    expect(infra).toContain(
      'values   = [aws_cloudfront_distribution.assets.arn]'
    )
  })

  it('rejects requests that bypass the Akamai edge', () => {
    expect(infra).toContain('event_type   = "viewer-request"')
    expect(edgeAuth).toContain("request.headers['x-origin-verify']")
    expect(edgeAuth).toContain('statusCode: 403')
    expect(edgeAuth).toContain("delete request.headers['x-origin-verify']")
  })

  it('allows cross-origin asset use', () => {
    expect(infra).toContain('access_control_allow_origins')
    expect(infra).toContain('items = ["*"]')
  })

  it('blocks scripts in assets that are opened directly', () => {
    expect(infra).toContain(
      `content_security_policy = "default-src 'none'; style-src 'unsafe-inline'; sandbox"`
    )
  })

  it('publishes every GitHub release with its exact tag', () => {
    expect(publicWorkflow).toContain('release:\n    types: [published]')
    expect(publicWorkflow).toContain(
      'ASSET_VERSION: ${{ github.event.release.tag_name || inputs.version }}'
    )
    expect(publicWorkflow).toContain(
      'ref: ${{ github.event.release.tag_name || inputs.version }}'
    )
    expect(publicWorkflow).toContain('path: release-source')
    expect(publicWorkflow).toContain(
      '$GITHUB_WORKSPACE/release-source/packages/dnb-eufemia/assets'
    )
    expect(publicWorkflow).toContain('> VERSION')
    expect(publicWorkflow).toContain('> ASSETS.sha256')
  })

  it('preserves immutable releases and independently owned prefixes', () => {
    expect(deployWorkflow).toContain(
      'aws s3 sync assets "s3://${BUCKET}/${VERSION}/"'
    )
    expect(deployWorkflow).toContain(
      "--cache-control 'public,max-age=31536000,immutable'"
    )
    expect(deployWorkflow).toContain('for ASSET_DIR in assets/*/')
    expect(deployWorkflow).toContain(
      'aws s3 sync "$ASSET_DIR" "s3://${BUCKET}/${ASSET_PREFIX}/"'
    )
    expect(deployWorkflow).not.toContain(
      'aws s3 sync assets "s3://${BUCKET}"'
    )
    expect(deployWorkflow).toContain('.manifest.sha256')
    expect(deployWorkflow).toContain('cmp --silent')
    expect(deployWorkflow).toContain(
      'Refusing to change immutable assets for ${VERSION}.'
    )
    expect(deployWorkflow).toContain('if [[ "$VERSION" != *-* ]]')
    expect(deployWorkflow).toContain('logos|og|v*)')
    expect(deployWorkflow).toContain(
      'Reserved asset prefix: $ASSET_PREFIX'
    )
    expect(deployWorkflow).not.toContain("--paths '/*'")
  })

  it('renders social images in a job without AWS access', () => {
    const { header, jobs } = workflowJobs(socialImageWorkflow)

    expect(header).not.toContain('id-token')
    expect(Object.keys(jobs)).toEqual(['restore', 'render', 'publish'])
    expect(jobs.render).not.toContain('id-token')
    expect(jobs.render).not.toContain('configure-aws-credentials')
    expect(jobs.render).toContain('yarn install --immutable')
    expect(jobs.render).toContain('generate.mts render')

    for (const name of ['restore', 'publish']) {
      expect(jobs[name]).toContain('id-token: write')
      expect(jobs[name]).toContain('configure-aws-credentials')
      expect(jobs[name]).not.toContain('yarn')
      expect(jobs[name]).not.toContain('playwright')
      expect(jobs[name]).not.toContain('generate.mts')
    }
    expect(jobs.restore).toContain('s3.mts restore')
    expect(jobs.publish).toContain('s3.mts publish')
  })
})
