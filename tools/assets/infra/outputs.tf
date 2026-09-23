output "bucket_name" {
  value = aws_s3_bucket.assets.id
}

output "distribution_id" {
  value = aws_cloudfront_distribution.assets.id
}

output "origin_hostname" {
  description = "CloudFront origin hostname for the assets.eufemia.dnb.no Akamai property"
  value       = aws_cloudfront_distribution.assets.domain_name
}
