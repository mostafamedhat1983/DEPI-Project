terraform {
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

module "vpc" {
  source = "./modules/vpc"
  vpc_cidr_block = var.vpc_cidr_block
  public_subnet_cidr_block = var.public_subnet_cidr_block
  availability_zone = var.availability_zone
}

module "security_groups" {
  source = "./modules/security_groups"
  vpc_id = module.vpc.vpc_id
  sg_names = {
    allow_ssh  = "allow_ssh"
    frontend_sg = "frontend_sg"
    backend_sg  = "backend_sg"
    db_sg     = "db_sg"
  }
  ssh_port     = 22
  frontend_port = 5174
  backend_port  = 8080
  db_port     = 3306
}

module "instances" {
  source             = "./modules/instances"
  subnet_id          = module.vpc.public_subnet_id
  security_group_ids = module.security_groups.security_group_ids
  instance_ami       = var.instance_ami
  instance_type      = var.instance_type
  instance_names = {
    frontend = "frontend-server"
    backend  = "backend-server"
    db       = "db-server"
  }
}

# Output to file
resource "null_resource" "instance_ips" {
  provisioner "local-exec" {
    command = <<EOT
      echo "Frontend: Public IP: ${module.instances.frontend_public_ip}, Private IP: ${module.instances.frontend_private_ip}" >> instance_ips.txt
      echo "Backend: Public IP: ${module.instances.backend_public_ip}, Private IP: ${module.instances.backend_private_ip}" >> instance_ips.txt
      echo "DB: Public IP: ${module.instances.db_public_ip}, Private IP: ${module.instances.db_private_ip}" >> instance_ips.txt
    EOT
    working_dir = path.cwd
  }
  depends_on = [
    module.instances,
  ]
}