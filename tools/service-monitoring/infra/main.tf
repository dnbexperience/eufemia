locals {
  prefix = "eufemia-${var.environment}-service-monitoring"
  schedules = {
    CDN       = "cron(7 * * * ? *)"
    MCP       = "cron(11 * * * ? *)"
    Analytics = "cron(17 * * * ? *)"
  }
  services = toset(keys(local.schedules))
  tags = {
    Environment    = var.environment
    CostAllocation = var.cost_allocation
    Project        = "eufemia"
    Component      = "service-monitoring"
  }
}

# The OIDC deploy role pins these names, the boundary and the attachable policies.
# prevent_destroy: the deploy role cannot recreate a renamed role.
locals {
  permissions_boundary  = "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:policy/tlz/oidc-tooling-github-permissionboundarypolicy"
  tooling_policy_prefix = "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:policy/tooling/${local.prefix}"
  lambda_logs_policy    = "arn:${data.aws_partition.current.partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "scheduler_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["scheduler.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values   = [aws_scheduler_schedule_group.monitors.arn]
    }
  }
}

resource "aws_iam_role" "check" {
  name                 = "${local.prefix}-check-lambda"
  assume_role_policy   = data.aws_iam_policy_document.lambda_assume.json
  permissions_boundary = local.permissions_boundary
  tags                 = local.tags

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_iam_role_policy_attachment" "check" {
  role       = aws_iam_role.check.name
  policy_arn = "${local.tooling_policy_prefix}-check"
}

resource "aws_iam_role_policy_attachment" "check_logs" {
  role       = aws_iam_role.check.name
  policy_arn = local.lambda_logs_policy
}

resource "aws_iam_role" "notifier" {
  name                 = "${local.prefix}-alarms-lambda"
  assume_role_policy   = data.aws_iam_policy_document.lambda_assume.json
  permissions_boundary = local.permissions_boundary
  tags                 = local.tags

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_iam_role_policy_attachment" "notifier" {
  role       = aws_iam_role.notifier.name
  policy_arn = "${local.tooling_policy_prefix}-notify"
}

resource "aws_iam_role_policy_attachment" "notifier_logs" {
  role       = aws_iam_role.notifier.name
  policy_arn = local.lambda_logs_policy
}

resource "aws_iam_role" "scheduler" {
  name                 = "${local.prefix}-scheduler-invoke"
  assume_role_policy   = data.aws_iam_policy_document.scheduler_assume.json
  permissions_boundary = local.permissions_boundary
  tags                 = local.tags

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_iam_role_policy_attachment" "scheduler" {
  role       = aws_iam_role.scheduler.name
  policy_arn = "${local.tooling_policy_prefix}-invoke"
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
  role                           = aws_iam_role.check.arn
  handler                        = "index.handler"
  runtime                        = "nodejs22.x"
  timeout                        = 480
  memory_size                    = 256
  reserved_concurrent_executions = 1
  filename                       = "${path.module}/../dist/lambda.zip"
  source_code_hash               = filebase64sha256("${path.module}/../dist/lambda.zip")
  environment {
    variables = merge({
      SERVICE                 = each.key
      STATE_TABLE             = aws_dynamodb_table.state.name
      ALERT_TOPIC_ARN         = aws_sns_topic.alerts.arn
      NOTIFICATIONS_ENABLED   = tostring(var.notifications_enabled)
      GITHUB_TOKEN_SECRET_ARN = each.key == "CDN" ? "" : var.github_token_secret_arn
      }, each.key == "Analytics" ? {
      # Read by name: the check policy grants this name plus Secrets Manager's suffix.
      GHE_TOKEN_SECRET            = "eufemia/${var.environment}/monitoring/ghe-analytics-token"
      ANALYTICS_DEPLOY_REPOSITORY = var.analytics_deploy_repository
    } : {})
  }
  depends_on = [
    aws_cloudwatch_log_group.monitor,
    aws_iam_role_policy_attachment.check,
    aws_iam_role_policy_attachment.check_logs,
  ]
  tags = local.tags
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
  schedule_expression          = local.schedules[each.key]
  schedule_expression_timezone = "UTC"
  flexible_time_window {
    mode = "OFF"
  }
  target {
    arn      = aws_lambda_function.monitor[each.key].arn
    role_arn = aws_iam_role.scheduler.arn
    input    = "{}"
    retry_policy {
      maximum_event_age_in_seconds = 900
      maximum_retry_attempts       = 2
    }
    dead_letter_config {
      arn = aws_sqs_queue.failures.arn
    }
  }
  depends_on = [
    aws_lambda_function_event_invoke_config.monitor,
    aws_iam_role_policy_attachment.scheduler,
  ]
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
  ok_actions          = var.notifications_enabled ? [aws_sns_topic.alerts.arn] : []
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
  ok_actions          = var.notifications_enabled ? [aws_sns_topic.alerts.arn] : []
  tags                = local.tags
}

resource "aws_cloudwatch_log_group" "notifier" {
  name              = "/aws/lambda/${local.prefix}-alarms"
  retention_in_days = 30
  tags              = local.tags
}

resource "aws_lambda_function" "notifier" {
  function_name                  = "${local.prefix}-alarms"
  role                           = aws_iam_role.notifier.arn
  handler                        = "alarms.handler"
  runtime                        = "nodejs22.x"
  timeout                        = 120
  memory_size                    = 128
  reserved_concurrent_executions = 1
  filename                       = "${path.module}/../dist/lambda.zip"
  source_code_hash               = filebase64sha256("${path.module}/../dist/lambda.zip")
  environment {
    variables = {
      ALERT_TOPIC_ARN       = aws_sns_topic.alerts.arn
      SLACK_BOT_SECRET_ARN  = var.slack_bot_secret_arn
      STATE_TABLE           = aws_dynamodb_table.state.name
      NOTIFICATIONS_ENABLED = tostring(var.notifications_enabled)
      MONITOR_LOG_GROUPS    = jsonencode({ for service in local.services : service => aws_cloudwatch_log_group.monitor[service].name })
    }
  }
  lifecycle {
    precondition {
      condition     = !var.notifications_enabled || var.slack_bot_secret_arn != ""
      error_message = "Configure the Slack bot secret before enabling threaded notifications."
    }
  }
  depends_on = [
    aws_cloudwatch_log_group.notifier,
    aws_iam_role_policy_attachment.notifier,
    aws_iam_role_policy_attachment.notifier_logs,
  ]
  tags = local.tags
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
