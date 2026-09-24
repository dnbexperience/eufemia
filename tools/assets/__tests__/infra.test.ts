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
    expect(deployWorkflow).not.toContain("--paths '/*'")
  })
})
