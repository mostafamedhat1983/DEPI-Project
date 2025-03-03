variable "instance_ami" {
  type        = string
  description = "AMI ID for instances"
}

variable "instance_type" {
  type        = string
  description = "Instance type for servers"
}

variable "instance_names" {
  type = object({
    frontend = string
    backend  = string
    db       = string
  })
  description = "Names for instances"
}

variable "security_group_ids" {
  type = object({
    allow_ssh = string
    frontend  = string
    backend   = string
    db        = string
  })
  description = "Map of security group IDs"
}

variable "subnet_id" {
  type        = string
  description = "Subnet ID to launch instances in"
}