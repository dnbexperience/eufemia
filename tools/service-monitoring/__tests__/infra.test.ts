import { readFileSync } from 'node:fs'
import path from 'node:path'
import { expect, it } from 'vitest'

const terraform = readFileSync(
  path.resolve(import.meta.dirname, '../infra/main.tf'),
  'utf8'
)

const terraformBlock = (header: string) =>
  terraform.match(new RegExp(`^${header} \\{[\\s\\S]*?^\\}`, 'm'))?.[0] ??
  ''

it('creates the execution roles with the OIDC boundary, never reads pre-made roles or adds inline policies', () => {
  expect(terraform).toMatch(
    /permissions_boundary\s+=\s+".*:policy\/tlz\/oidc-tooling-github-permissionboundarypolicy"$/m
  )
  expect(terraform).not.toMatch(
    /data "aws_iam_role"|resource "aws_iam_(role_policy|policy_attachment|role_policy_attachments_exclusive)" |managed_policy_arns|inline_policy/
  )
})

it('lets only Lambda assume the Lambda roles, and only this schedule group assume the scheduler role', () => {
  const lambdaAssume = terraformBlock(
    'data "aws_iam_policy_document" "lambda_assume"'
  )
  const schedulerAssume = terraformBlock(
    'data "aws_iam_policy_document" "scheduler_assume"'
  )

  expect(lambdaAssume.match(/identifiers\s+=\s+\[.*\]/g)).toEqual([
    'identifiers = ["lambda.amazonaws.com"]',
  ])
  expect(lambdaAssume).not.toContain('condition')
  expect(schedulerAssume.match(/identifiers\s+=\s+\[.*\]/g)).toEqual([
    'identifiers = ["scheduler.amazonaws.com"]',
  ])
  expect(
    schedulerAssume.match(/(test|variable|values)\s+=\s+.*/g)
  ).toEqual([
    'test     = "StringEquals"',
    'variable = "aws:SourceAccount"',
    'values   = [data.aws_caller_identity.current.account_id]',
    'test     = "ArnEquals"',
    'variable = "aws:SourceArn"',
    'values   = [aws_scheduler_schedule_group.monitors.arn]',
  ])
})

it.each([
  {
    label: 'the check Lambdas',
    role: 'check',
    trust: 'lambda_assume',
    consumer: 'resource "aws_lambda_function" "monitor"',
    policies: [
      '"${local.tooling_policy_prefix}-check"',
      'local.lambda_logs_policy',
    ],
  },
  {
    label: 'the Slack notifier Lambda',
    role: 'notifier',
    trust: 'lambda_assume',
    consumer: 'resource "aws_lambda_function" "notifier"',
    policies: [
      '"${local.tooling_policy_prefix}-notify"',
      'local.lambda_logs_policy',
    ],
  },
  {
    label: 'the schedules',
    role: 'scheduler',
    trust: 'scheduler_assume',
    consumer: 'resource "aws_scheduler_schedule" "monitor"',
    policies: ['"${local.tooling_policy_prefix}-invoke"'],
  },
])(
  'runs $label under the delete-protected $role role, once only its approved policies are attached',
  ({ role, trust, consumer, policies }) => {
    const roleBlock = terraformBlock(`resource "aws_iam_role" "${role}"`)
    const consumerBlock = terraformBlock(consumer)
    const roleAttachments = (
      terraform.match(
        /^resource "aws_iam_role_policy_attachment" "\w+" \{[\s\S]*?^\}/gm
      ) ?? []
    ).filter((block) =>
      new RegExp(`aws_iam_role\\.${role}\\.(name|id)\\b`).test(block)
    )

    expect(roleBlock).toMatch(
      /^\s+permissions_boundary\s+=\s+local\.permissions_boundary$/m
    )
    expect(roleBlock).toContain(
      `data.aws_iam_policy_document.${trust}.json`
    )
    expect(roleBlock).toMatch(/^\s+prevent_destroy\s+=\s+true$/m)
    expect(
      roleAttachments.map(
        (block) => block.match(/policy_arn\s+=\s+(.*)$/m)?.[1]
      )
    ).toEqual(policies)
    expect(consumerBlock).toMatch(
      new RegExp(
        `^\\s+role(_arn)?\\s+=\\s+aws_iam_role\\.${role}\\.arn$`,
        'm'
      )
    )
    for (const name of roleAttachments.map(
      (block) => block.match(/"(\w+)" \{/)?.[1]
    )) {
      expect(consumerBlock).toContain(
        `aws_iam_role_policy_attachment.${name},`
      )
    }
  }
)
