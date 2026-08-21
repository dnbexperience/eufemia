output "api_endpoint" {
  description = "Base URL of the HTTP API"
  value       = aws_apigatewayv2_stage.analytics.invoke_url
}

output "origin_domain" {
  description = "Custom origin hostname for Akamai to point at"
  value       = aws_apigatewayv2_domain_name.analytics.domain_name
}

output "function_name" {
  value = aws_lambda_function.analytics.function_name
}

output "data_bucket" {
  value = aws_s3_bucket.data.id
}
