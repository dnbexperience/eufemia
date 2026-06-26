output "api_endpoint" {
  value = aws_apigatewayv2_stage.mcp.invoke_url
}

output "custom_domain" {
  value = "https://${var.domain_name}/mcp"
}

output "function_name" {
  value = aws_lambda_function.mcp.function_name
}
