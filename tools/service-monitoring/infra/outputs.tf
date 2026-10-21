output "function_names" {
  value = { for service, function in aws_lambda_function.monitor : service => function.function_name }
}

output "slack_secret_arn" {
  value = aws_secretsmanager_secret.slack.arn
}

output "alert_topic_arn" {
  value = aws_sns_topic.alerts.arn
}

output "failure_queue_url" {
  value = aws_sqs_queue.failures.url
}
