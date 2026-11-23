# Known Trivy findings in tools/*/infra when the IaC scan was added.
#
# The IaC scan (.github/workflows/iac-scan.yml) fails on any finding that is
# not listed here, so a new resource, or a renamed one, must pass the checks or
# be added below with a reason. Each entry is "<check ID>|<Terraform resource>".
# The key has no file path, so an entry also covers a resource with the same
# name in another tools/*/infra folder.
#
# This is a baseline, not a risk acceptance. Changes to these resources are
# applied to AWS when they are deployed, so fixing an entry needs someone who
# can verify the change in AWS. When you fix one, remove its line here.

package trivy

import rego.v1

default ignore := false

ignore if {
	key := sprintf("%s|%s", [input.ID, input.CauseMetadata.Resource])
	key in baseline
}

baseline := {
	# CloudFront access logs need a separate log bucket.
	"AWS-0010|aws_cloudfront_distribution.dashboard",
	"AWS-0010|aws_cloudfront_distribution.assets",
	# No WAF in front of CloudFront. The assets distribution serves public
	# files, and the dashboard data API checks an Entra ID token.
	"AWS-0011|aws_cloudfront_distribution.dashboard",
	"AWS-0011|aws_cloudfront_distribution.assets",
	# X-Ray tracing is not enabled.
	"AWS-0066|aws_lambda_function.analytics",
	"AWS-0066|aws_lambda_function.dashboard_read",
	"AWS-0066|aws_lambda_function.snapshot",
	"AWS-0066|aws_lambda_function.mcp",
	"AWS-0066|aws_lambda_function.usage_consumer",
	"AWS-0066|aws_lambda_function.monitor[\"Analytics\"]",
	"AWS-0066|aws_lambda_function.monitor[\"CDN\"]",
	"AWS-0066|aws_lambda_function.monitor[\"MCP\"]",
	"AWS-0066|aws_lambda_function.monitor[\"Tokens\"]",
	"AWS-0066|aws_lambda_function.notifier",
	# S3 server access logs need a separate log bucket.
	"AWS-0089|aws_s3_bucket.dashboard",
	"AWS-0089|aws_s3_bucket.data",
	"AWS-0089|aws_s3_bucket.assets",
	# The buckets use S3 managed encryption (AES256). The check asks for a
	# customer managed key instead.
	"AWS-0132|aws_s3_bucket_server_side_encryption_configuration.dashboard",
	"AWS-0132|aws_s3_bucket_server_side_encryption_configuration.data",
	"AWS-0132|aws_s3_bucket_server_side_encryption_configuration.assets",
}
