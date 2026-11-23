# Customer managed key for this stack's log groups.
#
# The key policy works like the AWS managed keys: principals in this account may
# use the key only through CloudWatch Logs. So the existing IAM permissions on
# the log groups still decide who may read or write logs, and the Lambda roles
# need no KMS permissions of their own.
#
# The OIDC deploy role may create and manage only keys tagged with this stack's
# KeyStack value, and may not schedule key deletion: prevent_destroy keeps a
# plan from trying.

resource "aws_kms_key" "stack" {
  description             = "${local.function_name}: log groups"
  enable_key_rotation     = true
  deletion_window_in_days = 30
  policy                  = data.aws_iam_policy_document.stack_key.json
  tags                    = merge(local.tags, { KeyStack = local.function_name })

  lifecycle {
    prevent_destroy = true
  }
}

data "aws_iam_policy_document" "stack_key" {
  # Lets IAM policies in this account grant key access, as in every default key policy.
  statement {
    sid       = "AccountIamPolicies"
    actions   = ["kms:*"]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
  }

  statement {
    sid       = "CloudWatchLogsService"
    actions   = ["kms:Encrypt", "kms:Decrypt", "kms:ReEncrypt*", "kms:GenerateDataKey*", "kms:Describe*"]
    resources = ["*"]

    principals {
      type        = "Service"
      identifiers = ["logs.${var.aws_region}.amazonaws.com"]
    }

    condition {
      test     = "ArnLike"
      variable = "kms:EncryptionContext:aws:logs:arn"
      values = [
        "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${local.function_name}*",
        "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/apigateway/${local.function_name}*",
      ]
    }
  }

  statement {
    sid       = "AccountThroughCloudWatchLogs"
    actions   = ["kms:Encrypt", "kms:Decrypt", "kms:ReEncrypt*", "kms:GenerateDataKey*", "kms:Describe*"]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringEquals"
      variable = "kms:CallerAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["logs.${var.aws_region}.amazonaws.com"]
    }
  }
}
