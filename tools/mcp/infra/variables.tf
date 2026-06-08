variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "environment" {
  type        = string
  description = "Deployment environment (dev, test, preprod, prod)"
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

variable "api_key" {
  type        = string
  description = "API key for x-api-key header validation"
  sensitive   = true
}
