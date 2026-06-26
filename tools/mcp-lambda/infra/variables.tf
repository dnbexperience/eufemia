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

variable "domain_zone" {
  type        = string
  description = "Route 53 hosted zone name (trailing dot is required by AWS)"
  default     = "dev.eufemia.tech-03.net."
}

variable "domain_name" {
  type        = string
  description = "Custom domain for the MCP endpoint (no trailing dot)"
  default     = "mcp.dev.eufemia.tech-03.net"
}
