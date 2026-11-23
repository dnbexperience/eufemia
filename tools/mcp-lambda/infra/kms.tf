# Customer managed key for this stack's log groups.
#
# The key policy works like the AWS managed keys: principals in this account may
# use the key only through CloudWatch Logs. So the existing IAM permissions on
# the log groups still decide who may read or write logs, and the Lambda roles
# need no KMS permissions of their own.
#
# The key has no tags: tag-based access would let any role that may tag keys
# take over a key. Instead the key policy names the OIDC deploy role that
# applies this stack as the only key administrator. It may not delete or disable
# the key, change its tags or manage grants; prevent_destroy keeps a plan from
# trying.

# Roles from the OIDC federation repo live under the /tooling/ path. A caller
# that is not an assumed role gives an invalid principal, so only the deploy
# role can apply the key policy.
locals {
  key_admin_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/tooling/${regex(":assumed-role/([^/]+)/", data.aws_caller_identity.current.arn)[0]}"
}

resource "aws_kms_key" "stack" {
  description             = "${local.function_name}: log groups"
  enable_key_rotation     = true
  deletion_window_in_days = 30
  policy                  = data.aws_iam_policy_document.stack_key.json

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
    sid = "DeployRoleKeyAdministration"
    actions = [
      "kms:DescribeKey",
      "kms:GetKeyPolicy",
      "kms:GetKeyRotationStatus",
      "kms:ListResourceTags",
      "kms:PutKeyPolicy",
      "kms:UpdateKeyDescription",
      "kms:EnableKeyRotation",
    ]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = [local.key_admin_arn]
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
