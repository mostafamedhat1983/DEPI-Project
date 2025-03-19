terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

variable "networks" {}
variable "security_groups" {}
variable "instances" {}

module "key_pair" {
  source = "./modules/key_pair"
}

module "network" {
  source = "./modules/network"
  networks = var.networks
}

module "security_group" {
  source = "./modules/security_groups"
  vpc_id = module.network.vpc_id
  security_groups = var.security_groups
}

module "instances" {
  source = "./modules/instances"
  instances = var.instances
  subnets = module.network.subnets
  security_groups = module.security_group.security_groups
  key_pair = module.key_pair.key_pair
}

# Output to file --> Inventory file structure for Ansible
resource "null_resource" "instance_ips" {
  provisioner "local-exec" {
    command = <<EOT
      echo "[Frontend_server]" >> inventory
      echo "${module.instances.instance_ips["Frontend"]}" >> inventory
      echo "[Backend_server]" >> inventory
      echo "${module.instances.instance_ips["Backend"]}" >> inventory
      echo "[DB_server]" >> inventory
      echo "${module.instances.instance_ips["DB"]}" >> inventory
      echo "[Jenkins_server]" >> inventory
      echo "${module.instances.instance_ips["Jenkins"]}" >> inventory
    EOT
    working_dir = path.cwd
  }
}