variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "environment" {
  type        = string
  description = "Deployment environment (dev, test, sit, uat, preprod, prod)"
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

variable "api_token" {
  type        = string
  description = "Bearer token required on /records requests. Empty disables auth (demo only)."
  default     = ""
  sensitive   = true
}
