variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "environment" {
  type    = string
  default = "dev"
  validation {
    condition     = contains(["dev", "test", "sit", "uat", "preprod", "prod"], var.environment)
    error_message = "Select a supported deployment environment."
  }
}

variable "cost_allocation" {
  type        = string
  description = "ServiceNow cost allocation identifier."
  validation {
    condition     = length(trimspace(var.cost_allocation)) > 0
    error_message = "Cost allocation is required."
  }
}

variable "notifications_enabled" {
  type        = bool
  description = "Enable Slack after verifying shadow runs and configuring the Slack bot secret."
  default     = false
}

variable "github_token_secret_arn" {
  type        = string
  description = "Optional Secrets Manager ARN containing a read-only public GitHub Actions token."
  default     = ""
}

variable "slack_bot_secret_arn" {
  type        = string
  description = "Secrets Manager ARN containing the Slack bot token and private channel ID as JSON."
  default     = ""
}
