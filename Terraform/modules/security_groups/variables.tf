variable "vpc_id" {
  type        = string
  description = "VPC ID where Security Groups will be created"
}

variable "sg_names" {
  type = object({
    allow_ssh  = string
    frontend_sg = string
    backend_sg  = string
    db_sg     = string
  })
  description = "Names for security groups"
}

variable "ssh_port" {
  type    = number
  default = 22
  description = "Port for SSH access"
}

variable "frontend_port" {
  type    = number
  default = 5174
  description = "Port for Frontend application"
}

variable "backend_port" {
  type    = number
  default = 8080
  description = "Port for Backend application"
}

variable "db_port" {
  type    = number
  default = 3306
  description = "Port for Database access"
}