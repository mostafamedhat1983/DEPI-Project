terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = "us-west-2"
}

# Security Groups
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH access"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "frontend_sg" {
  name        = "frontend_sg"
  description = "Allow traffic to Frontend Server"
  ingress {
    from_port   = 5174
    to_port     = 5174
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "backend_sg" {
  name        = "backend_sg"
  description = "Allow traffic to Backend Server"
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "db_sg" {
  name        = "db_sg"
  description = "Allow traffic to DB Server"
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Instances
resource "aws_instance" "db" {
  ami           = "ami-00c257e12d6828491"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id, aws_security_group.db_sg.id]
  tags = {
    Name = "db-server"
  }
#  lifecycle {
#    prevent_destroy = true
#  }
}
resource "aws_instance" "backend" {
  ami           = "ami-00c257e12d6828491"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id, aws_security_group.backend_sg.id]
  depends_on = [aws_instance.db]
  tags = {
    Name = "backend-server"
  }
}
resource "aws_instance" "frontend" {
  ami           = "ami-00c257e12d6828491"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id, aws_security_group.frontend_sg.id]
  depends_on = [aws_instance.backend]
  tags = {
    Name = "frontend-server"
  }
}

# Output to file
resource "null_resource" "instance_ips" {
  provisioner "local-exec" {
    command = <<EOT
      echo "Frontend: Public IP: ${aws_instance.frontend.public_ip}, Private IP: ${aws_instance.frontend.private_ip}" >> instance_ips.txt
      echo "Backend: Public IP: ${aws_instance.backend.public_ip}, Private IP: ${aws_instance.backend.private_ip}" >> instance_ips.txt
      echo "DB: Public IP: ${aws_instance.db.public_ip}, Private IP: ${aws_instance.db.private_ip}" >> instance_ips.txt
    EOT
    working_dir = path.cwd
  }
  depends_on = [
    aws_instance.frontend,
    aws_instance.backend,
    aws_instance.db,
  ]
}

# Outputs
output "frontend_public_ip" {
  value = aws_instance.frontend.public_ip
}
output "backend_public_ip" {
  value = aws_instance.backend.public_ip
}
output "db_public_ip" {
  value = aws_instance.db.public_ip
}
output "frontend_private_ip" {
  value = aws_instance.frontend.private_ip
}
output "backend_private_ip" {
  value = aws_instance.backend.private_ip
}
output "db_private_ip" {
  value = aws_instance.db.private_ip
}