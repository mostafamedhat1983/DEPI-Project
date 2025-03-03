variable "aws_region" {
  type    = string
  default = "us-west-2"
  description = "AWS region"
}

variable "instance_ami" {
  type    = string
  default = "ami-00c257e12d6828491"
  description = "AMI ID for instances"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
  description = "Instance type for servers"
}

variable "vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
  description = "CIDR block for the VPC"
}

variable "public_subnet_cidr_block" {
  type    = string
  default = "10.0.1.0/24"
  description = "CIDR block for the public subnet"
}

variable "availability_zone" {
  type    = string
  default = "us-west-2a"
  description = "Availability Zone for the public subnet"
}