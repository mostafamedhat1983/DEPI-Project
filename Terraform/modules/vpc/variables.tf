variable "vpc_cidr_block" {
  type        = string
  description = "CIDR block for the VPC"
}

variable "public_subnet_cidr_block" {
  type        = string
  description = "CIDR block for the public subnet"
}

variable "availability_zone" {
  type        = string
  description = "Availability Zone for the public subnet"
}