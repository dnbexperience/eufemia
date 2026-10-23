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
})
