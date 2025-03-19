resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "Main-VPC"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "Main-IGW"
  }
}

resource "aws_subnet" "main" {
  for_each = { for network in var.networks : network.name => network.subnets[0] }
  vpc_id                  = aws_vpc.main.id
  cidr_block              = each.value.cidr
  availability_zone       = var.networks[index(var.networks.*.name, each.key)].availability_zone
  map_public_ip_on_launch = each.value.public
  tags = {
    Name = "${each.key}-${each.value.name}"
  }
}

resource "aws_subnet" "private" {
  for_each = { for network in var.networks : network.name => network.subnets[1] }
  vpc_id                  = aws_vpc.main.id
  cidr_block              = each.value.cidr
  availability_zone       = var.networks[index(var.networks.*.name, each.key)].availability_zone
  tags = {
    Name = "${each.key}-${each.value.name}"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "public" {
  for_each = aws_subnet.main
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}