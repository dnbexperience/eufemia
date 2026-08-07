terraform {
  required_version = "~> 1.10"

  # Reuses the existing Eufemia Terraform state bucket with a dedicated key so
  # this stack's state is isolated from the other stacks.
  backend "s3" {
    bucket       = "eufemia-mcp-terraform-state"
    key          = "analytics/terraform.tfstate"
    region       = "eu-north-1"
    use_lockfile = true
    encrypt      = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
