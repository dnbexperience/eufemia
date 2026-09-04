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
  description = "Bearer token required on all /records requests."
  sensitive   = true

  validation {
    condition     = length(var.api_token) > 0
    error_message = "api_token must be a non-empty value."
  }
}

variable "domain_zone" {
  type        = string
  description = "Route 53 hosted zone name (trailing dot is required by AWS)."
  default     = "dev.eufemia.tech-03.net."
}

variable "domain_name" {
  type        = string
  description = "Custom origin domain for the analytics API (no trailing dot)."
  default     = "analytics.dev.eufemia.tech-03.net"
}

variable "edge_auth_secret" {
  type        = string
  description = "Shared secret for the X-Edge-Auth header injected by Akamai."
  sensitive   = true

  validation {
    condition     = length(var.edge_auth_secret) > 0
    error_message = "edge_auth_secret must be a non-empty value."
  }
}

variable "entra_client_id" {
  type        = string
  description = "Entra (Azure AD) application (client) ID accepted by the dashboard API JWT authorizer."

  validation {
    condition     = length(var.entra_client_id) > 0
    error_message = "entra_client_id must be a non-empty value."
  }
}

variable "entra_tenant_id" {
  type        = string
  description = "Entra (Azure AD) directory (tenant) ID; used to build the dashboard API JWT issuer."

  validation {
    condition     = length(var.entra_tenant_id) > 0
    error_message = "entra_tenant_id must be a non-empty value."
  }
}

variable "dashboard_origins" {
  type        = list(string)
  description = "Allowed CORS origins for the dashboard API (e.g. the dashboard host and http://localhost:4173)."

  validation {
    condition     = length(var.dashboard_origins) > 0
    error_message = "dashboard_origins must list at least one allowed origin."
  }
}

# Canonical public URL the dashboard is served from, fronted by a custom domain
# (e.g. https://dashboard.eufemia.dnb.no via Akamai). It is the allowed CORS
# origin and the OIDC redirect URI. Required: the dashboard is served from the
# custom domain and the data API CORS no longer allows the raw CloudFront URL.
variable "dashboard_public_url" {
  type        = string
  description = "Canonical public dashboard URL (e.g. https://dashboard.eufemia.dnb.no). Becomes a CORS origin and the OIDC redirect URI."

  # Entra matches redirect URIs exactly, so a trailing slash or missing scheme
  # would break sign-in while the deploy still succeeds.
  validation {
    condition     = can(regex("^https://[^/]+$", var.dashboard_public_url))
    error_message = "dashboard_public_url must be an https:// origin with no trailing slash (e.g. https://dashboard.eufemia.dnb.no)."
  }
}
