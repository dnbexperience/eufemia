output "api_endpoint" {
  value = aws_apigatewayv2_stage.mcp.invoke_url
}

output "function_name" {
  value = aws_lambda_function.mcp.function_name
}
