locals {
  function_name = "eufemia-${var.environment}-analytics"
  database_name = "eufemia_${var.environment}_analytics"
  table_name    = "records"

  tags = {
    CostAllocation = var.cost_allocation
    Environment    = var.environment
  }
}

data "aws_caller_identity" "current" {}

# ---------------------------------------------------------------------------
# Storage
# ---------------------------------------------------------------------------

# Single bucket holds both the stored records (records/) and the Athena query
# output (athena-results/). Account id keeps the name globally unique.
resource "aws_s3_bucket" "data" {
  bucket = "${local.function_name}-${data.aws_caller_identity.current.account_id}"
  tags   = local.tags
}

resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket = aws_s3_bucket.data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Athena scratch output is transient; expire it so it does not accumulate cost.
resource "aws_s3_bucket_lifecycle_configuration" "data" {
  bucket = aws_s3_bucket.data.id

  rule {
    id     = "expire-athena-results"
    status = "Enabled"

    filter {
      prefix = "athena-results/"
    }

    expiration {
      days = 7
    }
  }
}

# ---------------------------------------------------------------------------
# Glue Data Catalog
# ---------------------------------------------------------------------------

resource "aws_glue_catalog_database" "analytics" {
  name = local.database_name
}

resource "aws_glue_catalog_table" "records" {
  name          = local.table_name
  database_name = aws_glue_catalog_database.analytics.name
  table_type    = "EXTERNAL_TABLE"

  parameters = {
    classification     = "json"
    has_encrypted_data = "true"

    # Partition projection avoids running MSCK / ADD PARTITION as new days
    # arrive. Athena derives the partitions from the dt range at query time.
    "projection.enabled"          = "true"
    "projection.dt.type"          = "date"
    "projection.dt.range"         = "2024-01-01,NOW"
    "projection.dt.format"        = "yyyy-MM-dd"
    "projection.dt.interval"      = "1"
    "projection.dt.interval.unit" = "DAYS"
    "storage.location.template"   = "s3://${aws_s3_bucket.data.id}/records/dt=$${dt}/"
  }

  partition_keys {
    name = "dt"
    type = "string"
  }

  storage_descriptor {
    location      = "s3://${aws_s3_bucket.data.id}/records/"
    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.openx.data.jsonserde.JsonSerDe"

      parameters = {
        "case.insensitive" = "true"
      }
    }

    columns {
      name = "id"
      type = "string"
    }

    columns {
      name = "name"
      type = "string"
    }

    columns {
      name = "value"
      type = "double"
    }

    columns {
      name = "createdat"
      type = "string"
    }
  }
}

# ---------------------------------------------------------------------------
# Athena
# ---------------------------------------------------------------------------

resource "aws_athena_workgroup" "analytics" {
  name = local.function_name
  tags = local.tags

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://${aws_s3_bucket.data.id}/athena-results/"

      encryption_configuration {
        encryption_option = "SSE_S3"
      }
    }
  }
}

# ---------------------------------------------------------------------------
# Lambda
# ---------------------------------------------------------------------------

# Pre-created out-of-band: the OIDC deploy role's permissions boundary forbids
# iam:CreateRole (ADR 0004), so an account admin provisions the execution role
# (trust policy + AWSLambdaBasicExecutionRole) and it is only referenced here.
#
# The role additionally needs an inline/attached policy granting:
#   - s3:GetObject, s3:PutObject, s3:ListBucket on the data bucket (records/*)
#   - s3:GetObject, s3:PutObject on the data bucket (athena-results/*)
#   - athena:StartQueryExecution, athena:GetQueryExecution,
#     athena:GetQueryResults on the analytics workgroup
#   - glue:GetTable, glue:GetDatabase, glue:GetPartitions on the analytics db/table
data "aws_iam_role" "lambda" {
  name = "${local.function_name}-role"
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = 30
  tags              = local.tags
}

resource "aws_lambda_function" "analytics" {
  function_name = local.function_name
  role          = data.aws_iam_role.lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs22.x"
  timeout       = 30
  memory_size   = 256

  filename         = "${path.module}/../dist/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../dist/lambda.zip")

  environment {
    variables = {
      NODE_OPTIONS     = "--enable-source-maps"
      DATA_BUCKET      = aws_s3_bucket.data.id
      GLUE_DATABASE    = aws_glue_catalog_database.analytics.name
      GLUE_TABLE       = aws_glue_catalog_table.records.name
      ATHENA_WORKGROUP = aws_athena_workgroup.analytics.name
      API_TOKEN        = var.api_token
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda]
  tags       = local.tags
}

# ---------------------------------------------------------------------------
# API Gateway (HTTP API)
# ---------------------------------------------------------------------------

resource "aws_apigatewayv2_api" "analytics" {
  name          = local.function_name
  protocol_type = "HTTP"
  tags          = local.tags
}

resource "aws_apigatewayv2_stage" "analytics" {
  api_id      = aws_apigatewayv2_api.analytics.id
  name        = "$default"
  auto_deploy = true
  tags        = local.tags

  default_route_settings {
    throttling_burst_limit = 50
    throttling_rate_limit  = 100
  }
}

resource "aws_apigatewayv2_integration" "analytics" {
  api_id                 = aws_apigatewayv2_api.analytics.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.analytics.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "store" {
  api_id    = aws_apigatewayv2_api.analytics.id
  route_key = "POST /records"
  target    = "integrations/${aws_apigatewayv2_integration.analytics.id}"
}

resource "aws_apigatewayv2_route" "retrieve" {
  api_id    = aws_apigatewayv2_api.analytics.id
  route_key = "GET /records"
  target    = "integrations/${aws_apigatewayv2_integration.analytics.id}"
}

resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.analytics.id
  route_key = "GET /healthz"
  target    = "integrations/${aws_apigatewayv2_integration.analytics.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.analytics.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.analytics.execution_arn}/*/*"
}
