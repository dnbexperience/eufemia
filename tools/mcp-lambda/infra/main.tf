locals {
  function_name = "eufemia-${var.environment}-mcp"

  tags = {
    CostAllocation = var.cost_allocation
    Environment    = var.environment
  }
}

data "aws_caller_identity" "current" {}

# Usage events leave the request path through SQS. The consumer batches them
# into S3 objects for Athena, while the dead-letter queue retains messages that
# still fail after retries.
resource "aws_sqs_queue" "mcp_usage_dead_letter" {
  name                      = "${local.function_name}-usage-dlq"
  message_retention_seconds = 1209600
  sqs_managed_sse_enabled   = true
  tags                      = local.tags
}

resource "aws_sqs_queue" "mcp_usage" {
  name                       = "${local.function_name}-usage"
  message_retention_seconds  = 345600
  visibility_timeout_seconds = 240
  sqs_managed_sse_enabled    = true

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.mcp_usage_dead_letter.arn
    maxReceiveCount     = 5
  })

  tags = local.tags
}

resource "aws_sqs_queue_redrive_allow_policy" "mcp_usage" {
  queue_url = aws_sqs_queue.mcp_usage_dead_letter.id

  redrive_allow_policy = jsonencode({
    redrivePermission = "byQueue"
    sourceQueueArns   = [aws_sqs_queue.mcp_usage.arn]
  })
}

# Lambda function
resource "aws_lambda_function" "mcp" {
  function_name = local.function_name
  role          = data.aws_iam_role.lambda.arn
  handler       = "lambda-handler.handler"
  runtime       = "nodejs22.x"
  timeout       = 30
  memory_size   = 512

  # LLM clients fan out tool calls in parallel, so the cap must absorb
  # bursts well above the previous 10 to avoid Lambda throttling (429 ->
  # surfaced by the HTTP API as 503). Kept conservative for now; raise as
  # traffic grows.
  reserved_concurrent_executions = 30

  filename         = "${path.module}/../dist/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../dist/lambda.zip")

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"

      # Shared secret for the X-Edge-Auth origin check (injected by Akamai).
      EDGE_AUTH_SECRET = var.edge_auth_secret

      # Anonymous MCP usage is queued so S3 storage stays off the request path.
      USAGE_QUEUE_URL = aws_sqs_queue.mcp_usage.url
      USAGE_ENV       = var.environment
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda]
  tags       = local.tags
}

# CloudWatch log group with retention policy.
# Created before the Lambda so the function does not auto-create one
# with infinite retention.
resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = 30
  tags              = local.tags
}

# IAM role for Lambda.
# Pre-created out-of-band: the OIDC deploy role's permissions boundary
# forbids iam:CreateRole, so the execution role (with its trust policy and
# AWSLambdaBasicExecutionRole attachment) is provisioned by an account admin
# and only referenced here.
data "aws_iam_role" "lambda" {
  name = "${local.function_name}-role"
}

# The MCP role needs only SendMessage on the source queue. The consumer uses a
# separate pre-created role with basic logging, SQS read/delete permissions on
# the source queue, and PutObject on the analytics bucket's mcp-usage/* prefix.
data "aws_iam_role" "usage_consumer" {
  name = "${local.function_name}-usage-consumer-role"
}

resource "aws_cloudwatch_log_group" "usage_consumer" {
  name              = "/aws/lambda/${local.function_name}-usage-consumer"
  retention_in_days = 30
  tags              = local.tags
}

resource "aws_lambda_function" "usage_consumer" {
  function_name = "${local.function_name}-usage-consumer"
  role          = data.aws_iam_role.usage_consumer.arn
  handler       = "usage-consumer.handler"
  runtime       = "nodejs22.x"
  timeout       = 30
  memory_size   = 256

  reserved_concurrent_executions = 2

  filename         = "${path.module}/../dist/usage-consumer.zip"
  source_code_hash = filebase64sha256("${path.module}/../dist/usage-consumer.zip")

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
      DATA_BUCKET  = "eufemia-${var.environment}-analytics-${data.aws_caller_identity.current.account_id}"
    }
  }

  depends_on = [aws_cloudwatch_log_group.usage_consumer]
  tags       = local.tags
}

resource "aws_lambda_event_source_mapping" "mcp_usage" {
  event_source_arn                   = aws_sqs_queue.mcp_usage.arn
  function_name                      = aws_lambda_function.usage_consumer.arn
  batch_size                         = 100
  maximum_batching_window_in_seconds = 60

  scaling_config {
    maximum_concurrency = 2
  }
}

resource "aws_cloudwatch_metric_alarm" "mcp_usage_queue_age" {
  alarm_name          = "${local.function_name}-usage-queue-age"
  alarm_description   = "MCP usage messages are not reaching the S3 consumer"
  namespace           = "AWS/SQS"
  metric_name         = "ApproximateAgeOfOldestMessage"
  dimensions          = { QueueName = aws_sqs_queue.mcp_usage.name }
  statistic           = "Maximum"
  period              = 300
  evaluation_periods  = 2
  threshold           = 600
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
}

resource "aws_cloudwatch_metric_alarm" "mcp_usage_dead_letter" {
  alarm_name          = "${local.function_name}-usage-dead-letter"
  alarm_description   = "MCP usage messages exhausted their storage retries"
  namespace           = "AWS/SQS"
  metric_name         = "ApproximateNumberOfMessagesVisible"
  dimensions          = { QueueName = aws_sqs_queue.mcp_usage_dead_letter.name }
  statistic           = "Maximum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
}

# API Gateway HTTP API
resource "aws_apigatewayv2_api" "mcp" {
  name          = local.function_name
  protocol_type = "HTTP"
  tags          = local.tags
}

resource "aws_apigatewayv2_stage" "mcp" {
  api_id      = aws_apigatewayv2_api.mcp.id
  name        = "$default"
  auto_deploy = true
  tags        = local.tags

  default_route_settings {
    throttling_burst_limit = 200
    throttling_rate_limit  = 400
  }
}

resource "aws_apigatewayv2_integration" "mcp" {
  api_id                 = aws_apigatewayv2_api.mcp.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.mcp.invoke_arn
  payload_format_version = "2.0"
}

# POST-only: GET (SSE) and DELETE (session cleanup) are not needed
# because sessionIdGenerator is disabled in the Lambda transport.
# The /mcp/<client> namespace leaves room for a future native endpoint
# (e.g. /mcp/native); /mcp/web is the canonical path for the web docs server.
resource "aws_apigatewayv2_route" "mcp_web" {
  api_id    = aws_apigatewayv2_api.mcp.id
  route_key = "POST /mcp/web"
  target    = "integrations/${aws_apigatewayv2_integration.mcp.id}"
}

# Cheap health check for uptime monitoring; the handler short-circuits this
# route and returns 200 without touching the MCP transport.
resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.mcp.id
  route_key = "GET /healthz"
  target    = "integrations/${aws_apigatewayv2_integration.mcp.id}"
}

resource "aws_lambda_permission" "apigw_web" {
  statement_id  = "AllowAPIGatewayWeb"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.mcp.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.mcp.execution_arn}/*/POST/mcp/web"
}

resource "aws_lambda_permission" "apigw_health" {
  statement_id  = "AllowAPIGatewayHealth"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.mcp.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.mcp.execution_arn}/*/GET/healthz"
}

# Custom domain
data "aws_route53_zone" "eufemia" {
  name = var.domain_zone
}

resource "aws_acm_certificate" "mcp" {
  domain_name       = var.domain_name
  validation_method = "DNS"
  tags              = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.mcp.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id = data.aws_route53_zone.eufemia.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 300
}

resource "aws_acm_certificate_validation" "mcp" {
  certificate_arn         = aws_acm_certificate.mcp.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

resource "aws_apigatewayv2_domain_name" "mcp" {
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.mcp.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  tags = local.tags
}

resource "aws_apigatewayv2_api_mapping" "mcp" {
  api_id      = aws_apigatewayv2_api.mcp.id
  domain_name = aws_apigatewayv2_domain_name.mcp.id
  stage       = aws_apigatewayv2_stage.mcp.id
}

resource "aws_route53_record" "mcp" {
  zone_id = data.aws_route53_zone.eufemia.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.mcp.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.mcp.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
