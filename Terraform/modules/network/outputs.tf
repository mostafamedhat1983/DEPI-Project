output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnets" {
  value = {
    for network in var.networks : network.name => {
      public  = aws_subnet.main[network.name].id
      private = aws_subnet.private[network.name].id
      cidr_block = aws_subnet.main[network.name].cidr_block
    }
  }
}