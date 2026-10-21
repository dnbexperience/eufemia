locals {
  prefix   = "eufemia-${var.environment}-service-monitoring"
  services = toset(["CDN", "MCP"])
  tags = {
    Environment    = var.environment
    CostAllocation = var.cost_allocation
    Project        = "eufemia"
    Component      = "service-monitoring"
  }
}

data "aws_iam_role" "lambda" {
  name = "${local.prefix}-lambda"
}

data "aws_iam_role" "scheduler" {
  name = "${local.prefix}-scheduler"
}

resource "aws_dynamodb_table" "state" {
  name         = local.prefix
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "service"
  attribute {
    name = "service"
    type = "S"
  }
  point_in_time_recovery {
    enabled = true
  }
  server_side_encryption {
    enabled = true
  }
  deletion_protection_enabled = true
  tags                        = local.tags
}

resource "aws_secretsmanager_secret" "slack" {
  name                    = "eufemia/${var.environment}/monitoring/slack"
  description             = "Slack incoming webhook for Eufemia service monitoring"
  recovery_window_in_days = 30
  tags                    = local.tags
}

resource "aws_sqs_queue" "failures" {
  name                      = "${local.prefix}-failures"
  message_retention_seconds = 1209600
  sqs_managed_sse_enabled   = true
  tags                      = local.tags
}

resource "aws_scheduler_schedule_group" "monitors" {
  name = local.prefix
  tags = local.tags
}

resource "aws_cloudwatch_log_group" "monitor" {
  for_each          = local.services
  name              = "/aws/lambda/${local.prefix}-${lower(each.key)}"
  retention_in_days = 30
  tags              = local.tags
}

resource "aws_lambda_function" "monitor" {
  for_each                       = local.services
  function_name                  = "${local.prefix}-${lower(each.key)}"
  role                           = data.aws_iam_role.lambda.arn
  handler                        = "index.handler"
  runtime                        = "nodejs22.x"
  timeout                        = 480
  memory_size                    = 256
  reserved_concurrent_executions = 1
  filename                       = "${path.module}/../dist/lambda.zip"
  source_code_hash               = filebase64sha256("${path.module}/../dist/lambda.zip")
  environment {
    variables = {
      SERVICE                  = each.key
      STATE_TABLE              = aws_dynamodb_table.state.name
      SLACK_WEBHOOK_SECRET_ARN = aws_secretsmanager_secret.slack.arn
      NOTIFICATIONS_ENABLED    = tostring(var.notifications_enabled)
      GITHUB_TOKEN_SECRET_ARN  = each.key == "MCP" ? var.github_token_secret_arn : ""
    }
  }
  depends_on = [aws_cloudwatch_log_group.monitor]
  tags       = local.tags
}

resource "aws_lambda_function_event_invoke_config" "monitor" {
  for_each                     = local.services
  function_name                = aws_lambda_function.monitor[each.key].function_name
  maximum_event_age_in_seconds = 900
  maximum_retry_attempts       = 2
  destination_config {
    on_failure {
      destination = aws_sqs_queue.failures.arn
    }
  }
}

resource "aws_scheduler_schedule" "monitor" {
  for_each                     = local.services
  name                         = lower(each.key)
  group_name                   = aws_scheduler_schedule_group.monitors.name
  schedule_expression          = each.key == "CDN" ? "cron(7 * * * ? *)" : "cron(11 * * * ? *)"
  schedule_expression_timezone = "UTC"
  flexible_time_window {
    mode = "OFF"
  }
  target {
    arn      = aws_lambda_function.monitor[each.key].arn
    role_arn = data.aws_iam_role.scheduler.arn
    input    = "{}"
    retry_policy {
      maximum_event_age_in_seconds = 900
      maximum_retry_attempts       = 2
    }
    dead_letter_config {
      arn = aws_sqs_queue.failures.arn
    }
  }
  depends_on = [aws_lambda_function_event_invoke_config.monitor]
}

resource "aws_sns_topic" "alerts" {
  name = "${local.prefix}-alerts"
  tags = local.tags
}

resource "aws_cloudwatch_metric_alarm" "missing" {
  for_each            = local.services
  alarm_name          = "${local.prefix}-${lower(each.key)}-not-completing"
  alarm_description   = "No completed check in two consecutive hourly periods. Inspect Lambda logs and Scheduler delivery."
  namespace           = "Eufemia/ServiceMonitoring"
  metric_name         = "Completed"
  dimensions          = { FunctionName = aws_lambda_function.monitor[each.key].function_name }
  statistic           = "Sum"
  period              = 3600
  evaluation_periods  = 2
  threshold           = 1
  comparison_operator = "LessThanThreshold"
  treat_missing_data  = "breaching"
  alarm_actions       = var.notifications_enabled ? [aws_sns_topic.alerts.arn] : []
  ok_actions          = var.notifications_enabled ? [aws_sns_topic.alerts.arn] : []
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "errors" {
  for_each            = local.services
  alarm_name          = "${local.prefix}-${lower(each.key)}-execution-errors"
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  dimensions          = { FunctionName = aws_lambda_function.monitor[each.key].function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = var.notifications_enabled ? [aws_sns_topic.alerts.arn] : []
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "failures" {
  alarm_name          = "${local.prefix}-undelivered"
  alarm_description   = "Scheduler delivery or Lambda asynchronous execution exhausted retries. Inspect the failures queue."
  namespace           = "AWS/SQS"
  metric_name         = "ApproximateNumberOfMessagesVisible"
  dimensions          = { QueueName = aws_sqs_queue.failures.name }
  statistic           = "Maximum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = var.notifications_enabled ? [aws_sns_topic.alerts.arn] : []
  tags                = local.tags
}

data "aws_iam_role" "notifier" {
  name = "${local.prefix}-notifier"
}

resource "aws_cloudwatch_log_group" "notifier" {
  name              = "/aws/lambda/${local.prefix}-alarms"
  retention_in_days = 30
  tags              = local.tags
}

resource "aws_lambda_function" "notifier" {
  function_name                  = "${local.prefix}-alarms"
  role                           = data.aws_iam_role.notifier.arn
  handler                        = "alarms.handler"
  runtime                        = "nodejs22.x"
  timeout                        = 60
  memory_size                    = 128
  reserved_concurrent_executions = 1
  filename                       = "${path.module}/../dist/lambda.zip"
  source_code_hash               = filebase64sha256("${path.module}/../dist/lambda.zip")
  environment {
    variables = {
      ALERT_TOPIC_ARN          = aws_sns_topic.alerts.arn
      SLACK_WEBHOOK_SECRET_ARN = aws_secretsmanager_secret.slack.arn
      NOTIFICATIONS_ENABLED    = tostring(var.notifications_enabled)
    }
  }
  depends_on = [aws_cloudwatch_log_group.notifier]
  tags       = local.tags
}

resource "aws_lambda_function_event_invoke_config" "notifier" {
  function_name                = aws_lambda_function.notifier.function_name
  maximum_event_age_in_seconds = 3600
  maximum_retry_attempts       = 2
  destination_config {
    on_failure {
      destination = aws_sqs_queue.failures.arn
    }
  }
}

resource "aws_lambda_permission" "alarms" {
  statement_id  = "AllowMonitoringAlarmNotifications"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notifier.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.alerts.arn
}

resource "aws_sns_topic_subscription" "slack" {
  topic_arn      = aws_sns_topic.alerts.arn
  protocol       = "lambda"
  endpoint       = aws_lambda_function.notifier.arn
  redrive_policy = jsonencode({ deadLetterTargetArn = aws_sqs_queue.failures.arn })
  depends_on     = [aws_lambda_permission.alarms, aws_lambda_function_event_invoke_config.notifier, aws_sqs_queue_policy.sns_failures]
}

resource "aws_sqs_queue_policy" "sns_failures" {
  queue_url = aws_sqs_queue.failures.url
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "sns.amazonaws.com" }
      Action    = "sqs:SendMessage"
      Resource  = aws_sqs_queue.failures.arn
      Condition = { ArnEquals = { "aws:SourceArn" = aws_sns_topic.alerts.arn } }
    }]
  })
}

data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}

resource "aws_sns_topic_policy" "alarms" {
  arn = aws_sns_topic.alerts.arn
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "cloudwatch.amazonaws.com" }
      Action    = "sns:Publish"
      Resource  = aws_sns_topic.alerts.arn
      Condition = {
        StringEquals = { "aws:SourceAccount" = data.aws_caller_identity.current.account_id }
        ArnLike      = { "aws:SourceArn" = "arn:${data.aws_partition.current.partition}:cloudwatch:${var.aws_region}:${data.aws_caller_identity.current.account_id}:alarm:${local.prefix}-*" }
      }
    }]
  })
}
