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