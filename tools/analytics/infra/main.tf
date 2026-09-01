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

    # Page-view columns. The JSON SerDe reads schema-on-read, so record rows
    # read NULL for these and page-view rows read NULL for id/name/value.
    columns {
      name = "type"
      type = "string"
    }

    columns {
      name = "path"
      type = "string"
    }

    columns {
      name = "env"
      type = "string"
    }

    columns {
      name = "timestamp"
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

      # Shared secret for the X-Edge-Auth origin check (injected by Akamai).
      EDGE_AUTH_SECRET = var.edge_auth_secret
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

resource "aws_apigatewayv2_route" "collect" {
  api_id    = aws_apigatewayv2_api.analytics.id
  route_key = "POST /collect"
  target    = "integrations/${aws_apigatewayv2_integration.analytics.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.analytics.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.analytics.execution_arn}/*/*"
}

# ---------------------------------------------------------------------------
# Dashboard API (browser-facing, Entra JWT auth)
# ---------------------------------------------------------------------------

# A separate HTTP API for the dashboard so its browser/JWT trust model stays
# isolated from the edge-locked ingest API. It targets the same Lambda; the
# GET /data route is handled ahead of the edge check.
resource "aws_apigatewayv2_api" "dashboard" {
  name          = "${local.function_name}-dashboard"
  protocol_type = "HTTP"
  tags          = local.tags

  cors_configuration {
    # Always include the live dashboard origin so CORS works on the first deploy
    # (no chicken-and-egg); dashboard_origins adds any extra, e.g. local dev.
    allow_origins = concat(
      var.dashboard_origins,
      ["https://${aws_cloudfront_distribution.dashboard.domain_name}"],
    )
    allow_methods = ["GET"]
    allow_headers = ["authorization"]
    max_age       = 3600
  }
}

resource "aws_apigatewayv2_stage" "dashboard" {
  api_id      = aws_apigatewayv2_api.dashboard.id
  name        = "$default"
  auto_deploy = true
  tags        = local.tags

  default_route_settings {
    throttling_burst_limit = 20
    throttling_rate_limit  = 40
  }
}

resource "aws_apigatewayv2_integration" "dashboard" {
  api_id                 = aws_apigatewayv2_api.dashboard.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.analytics.invoke_arn
  payload_format_version = "2.0"
}

# Validates Entra (Azure AD) tokens: only users assigned to the app registration
# receive one, so this is the access gate for the data.
resource "aws_apigatewayv2_authorizer" "entra" {
  api_id           = aws_apigatewayv2_api.dashboard.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "entra"

  jwt_configuration {
    audience = [var.entra_client_id]
    issuer   = "https://login.microsoftonline.com/${var.entra_tenant_id}/v2.0"
  }
}

resource "aws_apigatewayv2_route" "dashboard_data" {
  api_id             = aws_apigatewayv2_api.dashboard.id
  route_key          = "GET /data"
  target             = "integrations/${aws_apigatewayv2_integration.dashboard.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.entra.id

  # Require the exposed scope so an ID token (same aud/iss, no scp) can't stand
  # in for the access token the browser requests.
  authorization_scopes = ["Dashboard.Read"]
}

resource "aws_lambda_permission" "dashboard_apigw" {
  statement_id  = "AllowDashboardAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.analytics.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.dashboard.execution_arn}/*/*"
}

# ---------------------------------------------------------------------------
# Custom domain (origin for Akamai)
# ---------------------------------------------------------------------------

# Custom domain used as the Akamai origin.
data "aws_route53_zone" "eufemia" {
  name = var.domain_zone
}

resource "aws_acm_certificate" "analytics" {
  domain_name       = var.domain_name
  validation_method = "DNS"
  tags              = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.analytics.domain_validation_options : dvo.domain_name => {
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

resource "aws_acm_certificate_validation" "analytics" {
  certificate_arn         = aws_acm_certificate.analytics.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

resource "aws_apigatewayv2_domain_name" "analytics" {
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.analytics.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  tags = local.tags
}

resource "aws_apigatewayv2_api_mapping" "analytics" {
  api_id      = aws_apigatewayv2_api.analytics.id
  domain_name = aws_apigatewayv2_domain_name.analytics.id
  stage       = aws_apigatewayv2_stage.analytics.id
}

resource "aws_route53_record" "analytics" {
  zone_id = data.aws_route53_zone.eufemia.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.analytics.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.analytics.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

# ---------------------------------------------------------------------------
# Dashboard static hosting (public site, private S3 bucket via CloudFront)
# ---------------------------------------------------------------------------
#
# The dashboard shell holds no data and no secrets: all data lives behind the
# Entra-authenticated /data API, so the UI is safe to serve as a plain public
# site. Access control is entirely the Entra sign-in plus the /data API's JWT
# authorizer — there is deliberately no Lambda@Edge and no edge auth here. The
# bucket stays private; CloudFront reads it through an Origin Access Control.

resource "aws_s3_bucket" "dashboard" {
  bucket = "${local.function_name}-dashboard-${data.aws_caller_identity.current.account_id}"
  tags   = local.tags
}

resource "aws_s3_bucket_server_side_encryption_configuration" "dashboard" {
  bucket = aws_s3_bucket.dashboard.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Versioning + the --delete sync gives a free rollback for a bad publish.
resource "aws_s3_bucket_versioning" "dashboard" {
  bucket = aws_s3_bucket.dashboard.id

  versioning_configuration {
    status = "Enabled"
  }
}

# The bucket is private; the objects are served to the public through the
# distribution, never from the bucket directly.
resource "aws_s3_bucket_public_access_block" "dashboard" {
  bucket = aws_s3_bucket.dashboard.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "dashboard" {
  name                              = "${local.function_name}-dashboard"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "dashboard" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "${local.function_name} dashboard"
  price_class         = "PriceClass_100"
  tags                = local.tags

  origin {
    domain_name              = aws_s3_bucket.dashboard.bucket_regional_domain_name
    origin_id                = "dashboard-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.dashboard.id
  }

  default_cache_behavior {
    target_origin_id       = "dashboard-s3"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    # AWS managed "CachingOptimized" policy.
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    # AWS managed "SecurityHeadersPolicy": adds HSTS, X-Content-Type-Options,
    # X-Frame-Options, Referrer-Policy. Managed id needs no extra deploy-role IAM.
    response_headers_policy_id = "67f7725c-6f97-4210-82d7-5512b31e9d03"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # No custom domain: the default *.cloudfront.net certificate is used, so the
  # CloudFront URL is added to the app registration redirect URIs after deploy.
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Allow only this distribution to read the bucket (OAC identity + SourceArn).
data "aws_iam_policy_document" "dashboard" {
  statement {
    sid       = "AllowCloudFrontRead"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.dashboard.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.dashboard.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "dashboard" {
  bucket = aws_s3_bucket.dashboard.id
  policy = data.aws_iam_policy_document.dashboard.json

  depends_on = [aws_s3_bucket_public_access_block.dashboard]
}
