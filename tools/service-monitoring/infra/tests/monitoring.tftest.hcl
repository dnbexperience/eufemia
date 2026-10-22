mock_provider "aws" {
  mock_data "aws_iam_role" {
    defaults = { arn = "arn:aws:iam::123456789012:role/test-monitor" }
  }
  mock_data "aws_caller_identity" {
    defaults = { account_id = "123456789012" }
  }
  mock_data "aws_partition" {
    defaults = { partition = "aws" }
  }
  mock_resource "aws_lambda_function" {
    defaults = { arn = "arn:aws:lambda:eu-north-1:123456789012:function:test-monitor" }
  }
  mock_resource "aws_sns_topic" {
    defaults = { arn = "arn:aws:sns:eu-north-1:123456789012:test-alerts" }
  }
  mock_resource "aws_sqs_queue" {
    defaults = { arn = "arn:aws:sqs:eu-north-1:123456789012:test-failures", url = "https://sqs.eu-north-1.amazonaws.com/123456789012/test-failures" }
  }
  mock_resource "aws_secretsmanager_secret" {
    defaults = { arn = "arn:aws:secretsmanager:eu-north-1:123456789012:secret:test-webhook-abcdef" }
  }
}

variables {
  cost_allocation = "test"
}

run "shadow_rollout" {
  command = apply

  assert {
    condition = (
      length(aws_cloudwatch_metric_alarm.missing["CDN"].alarm_actions) == 0 &&
      length(aws_cloudwatch_metric_alarm.errors["MCP"].alarm_actions) == 0 &&
      aws_lambda_function.notifier.environment[0].variables["NOTIFICATIONS_ENABLED"] == "false" &&
      aws_lambda_function.monitor["CDN"].environment[0].variables["NOTIFICATIONS_ENABLED"] == "false"
    )
    error_message = "Initial deployment must not send Slack messages from checks or alarm routes."
  }
  assert {
    condition = alltrue([
      for function in aws_lambda_function.monitor : function.reserved_concurrent_executions == 1
    ])
    error_message = "Per-service state transitions must be serialized."
  }
  assert {
    condition = alltrue([
      for alarm in aws_cloudwatch_metric_alarm.missing : alarm.period == 3600 && alarm.evaluation_periods == 2 && alarm.treat_missing_data == "breaching"
    ])
    error_message = "A monitor that stops completing must trigger a missing-check alarm."
  }
}

run "enable_slack" {
  command = apply
  variables {
    notifications_enabled = true
  }
  assert {
    condition = (
      length(aws_cloudwatch_metric_alarm.missing["CDN"].alarm_actions) == 1 &&
      aws_lambda_function.notifier.environment[0].variables["NOTIFICATIONS_ENABLED"] == "true" &&
      aws_sns_topic_subscription.slack.protocol == "lambda"
    )
    error_message = "Alarm notifications must use the Slack notifier when enabled."
  }
  assert {
    condition = (
      aws_lambda_function_event_invoke_config.monitor["CDN"].destination_config[0].on_failure[0].destination == aws_sqs_queue.failures.arn &&
      aws_scheduler_schedule.monitor["MCP"].target[0].dead_letter_config[0].arn == aws_sqs_queue.failures.arn &&
      aws_sns_topic_subscription.slack.redrive_policy != null
    )
    error_message = "Delivery and asynchronous execution failures need durable destinations."
  }
}
