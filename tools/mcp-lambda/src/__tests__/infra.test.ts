import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

function readTerraform(relativePath: string) {
  return readFileSync(
    fileURLToPath(new URL(relativePath, import.meta.url)),
    'utf8'
  )
}

const terraform = readTerraform('../../infra/main.tf')
const analyticsTerraform = readTerraform(
  '../../../analytics/infra/main.tf'
)

const terraformBlock = (header: string) =>
  terraform.match(new RegExp(`^${header} \\{[\\s\\S]*?^\\}`, 'm'))?.[0]

const resourceBlocks = (type: string) =>
  terraform.match(
    new RegExp(`^resource "${type}" "\\w+" \\{[\\s\\S]*?^\\}`, 'gm')
  ) ?? []

describe('MCP infrastructure', () => {
  it('notifies the analytics alert topic from every alarm', () => {
    const alarms = [
      ...terraform.matchAll(
        /resource "aws_cloudwatch_metric_alarm" "(\w+)" \{[\s\S]*?^\}/gm
      ),
    ]

    expect(alarms.map(([, name]) => name)).toEqual(
      expect.arrayContaining([
        'mcp_usage_queue_age',
        'mcp_usage_dead_letter',
      ])
    )

    for (const [block, name] of alarms) {
      expect(block, `${name} alarm block`).toMatch(
        /^\s+alarm_actions\s+= \[local\.analytics_alert_topic_arn\]$/m
      )
    }
  })

  it('points analytics_alert_topic_arn at the topic analytics defines', () => {
    const topicName = analyticsTerraform.match(
      /resource "aws_sns_topic" "snapshot_alerts" \{\s+name\s+= "([^"]+)"/
    )?.[1]
    const topicArn = terraform.match(
      /analytics_alert_topic_arn\s+= "(arn:aws:sns:[^"]+)"/
    )?.[1]

    expect(topicName).toBeDefined()
    expect(topicArn?.split(':').at(-1)).toBe(topicName)
  })

  it('creates both Lambda roles with the OIDC boundary, Lambda-only trust and delete protection', () => {
    const assume = terraformBlock(
      'data "aws_iam_policy_document" "lambda_assume"'
    )

    expect(terraform).toMatch(
      /oidc_permissions_boundary_arn\s+=\s+".*:policy\/tlz\/oidc-tooling-github-permissionboundarypolicy"/
    )
    expect(assume?.match(/identifiers\s+=\s+\[.*\]/g)).toEqual([
      'identifiers = ["lambda.amazonaws.com"]',
    ])

    for (const name of ['mcp', 'usage_consumer']) {
      const role = terraformBlock(`resource "aws_iam_role" "${name}"`)

      expect(role, `${name} role`).toMatch(
        /permissions_boundary\s+=\s+local\.oidc_permissions_boundary_arn/
      )
      expect(role, `${name} role`).toContain(
        'data.aws_iam_policy_document.lambda_assume.json'
      )
      expect(role, `${name} role`).toMatch(
        /^\s+prevent_destroy\s+=\s+true$/m
      )
    }
  })

  it('attaches only the deploy-approved policies to each Lambda role', () => {
    const attachedPolicies = (role: string) =>
      resourceBlocks('aws_iam_role_policy_attachment')
        .filter((block) => block.includes(`aws_iam_role.${role}.name`))
        .map((block) => block.match(/policy_arn\s+=\s+"(.*)"/)?.[1])

    expect(attachedPolicies('mcp')).toEqual([
      'arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/tooling/${local.function_name}-usage-enqueue',
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    ])
    expect(attachedPolicies('usage_consumer')).toEqual([
      'arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/tooling/${local.function_name}-usage-consume',
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    ])
    expect(terraform).not.toMatch(
      /resource "aws_iam_role_policy" |managed_policy_arns|inline_policy/
    )
  })
})
