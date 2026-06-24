locals {
  function_name = "eufemia-dev-mcp"

  tags = {
    CostAllocation = var.cost_allocation
    Environment    = var.environment
  }
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
  # surfaced by the HTTP API as 503). Kept conservative while the endpoint
  # is unauthenticated; raise once Akamai edge rate-limiting fronts it.
  reserved_concurrent_executions = 30

  filename         = "${path.module}/../dist/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../dist/lambda.zip")

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
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
resource "aws_apigatewayv2_route" "mcp" {
  api_id    = aws_apigatewayv2_api.mcp.id
  route_key = "POST /mcp"
  target    = "integrations/${aws_apigatewayv2_integration.mcp.id}"
}

# Cheap health check for uptime monitoring; the handler short-circuits this
# route and returns 200 without touching the MCP transport.
resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.mcp.id
  route_key = "GET /healthz"
  target    = "integrations/${aws_apigatewayv2_integration.mcp.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.mcp.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.mcp.execution_arn}/*/POST/mcp"
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
