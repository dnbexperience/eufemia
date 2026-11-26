output "custom_domain" {
  value = "https://${var.domain_name}/mcp/web"
}

output "function_name" {
  value = aws_lambda_function.mcp.function_name
}
