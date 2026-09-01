output "api_endpoint" {
  description = "Base URL of the HTTP API"
  value       = aws_apigatewayv2_stage.analytics.invoke_url
}

output "dashboard_api_endpoint" {
  description = "Base URL of the browser-facing dashboard API (Entra JWT auth)"
  value       = aws_apigatewayv2_stage.dashboard.invoke_url
}

output "origin_domain" {
  description = "Custom origin hostname for Akamai to point at"
  value       = aws_apigatewayv2_domain_name.analytics.domain_name
}

output "function_name" {
  value = aws_lambda_function.analytics.function_name
}

output "dashboard_read_function_name" {
  description = "Read-only Lambda serving the dashboard GET /data route"
  value       = aws_lambda_function.dashboard_read.function_name
}

output "snapshot_function_name" {
  description = "Scheduled Lambda that regenerates the dashboard snapshot"
  value       = aws_lambda_function.snapshot.function_name
}

output "data_bucket" {
  value = aws_s3_bucket.data.id
}

output "dashboard_bucket" {
  description = "S3 bucket holding the static dashboard files"
  value       = aws_s3_bucket.dashboard.id
}

output "dashboard_url" {
  description = "Public CloudFront URL of the dashboard"
  value       = "https://${aws_cloudfront_distribution.dashboard.domain_name}"
}

output "dashboard_distribution_id" {
  description = "CloudFront distribution id (used for cache invalidation on publish)"
  value       = aws_cloudfront_distribution.dashboard.id
}
