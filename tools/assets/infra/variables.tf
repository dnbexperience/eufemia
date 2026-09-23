variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "environment" {
  type    = string
  default = "dev"
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
