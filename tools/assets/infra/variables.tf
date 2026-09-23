variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "environment" {
  type        = string
  description = "AWS account environment used for names and tags. The public Akamai hostname is independent of this value."
  default     = "dev"

  validation {
    condition     = contains(["dev", "test", "sit", "uat", "preprod", "prod"], var.environment)
    error_message = "Environment must be one of: dev, test, sit, uat, preprod, prod."
  }
}

variable "cost_allocation" {
  type        = string
  description = "BA number from ServiceNow for cost allocation tagging"
}

variable "edge_auth_secret" {
  type        = string
  description = "Shared secret added by Akamai and checked at CloudFront."
  sensitive   = true

  validation {
    condition     = length(var.edge_auth_secret) >= 32
    error_message = "edge_auth_secret must be at least 32 characters."
  }
}
