locals {
  function_name = "eufemia-mcp"
}

# Lambda function
resource "aws_lambda_function" "mcp" {
  function_name = local.function_name
  role          = aws_iam_role.lambda.arn
  handler       = "lambda-handler.handler"
  runtime       = "nodejs22.x"
  timeout       = 30
  memory_size   = 256

  filename         = "${path.module}/../dist/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../dist/lambda.zip")

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
    }
  }
}

# IAM role for Lambda
resource "aws_iam_role" "lambda" {
  name = "${local.function_name}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# DynamoDB access
resource "aws_iam_role_policy" "dynamodb" {
  name = "${local.function_name}-dynamodb"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem"
      ]
      Resource = "arn:aws:dynamodb:${var.aws_region}:*:table/eufemia-mcp-*"
    }]
  })
}

# S3 access
resource "aws_iam_role_policy" "s3" {
  name = "${local.function_name}-s3"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:ListBucket"
      ]
      Resource = [
        "arn:aws:s3:::eufemia-mcp-*",
        "arn:aws:s3:::eufemia-mcp-*/*"
      ]
    }]
  })
}

# API Gateway HTTP API
resource "aws_apigatewayv2_api" "mcp" {
  name          = local.function_name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "mcp" {
  api_id      = aws_apigatewayv2_api.mcp.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "mcp" {
  api_id                 = aws_apigatewayv2_api.mcp.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.mcp.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "mcp" {
  api_id    = aws_apigatewayv2_api.mcp.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.mcp.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.mcp.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.mcp.execution_arn}/*/*"
}
