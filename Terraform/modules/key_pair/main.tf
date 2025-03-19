resource "tls_private_key" "mykey" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "mykey" {
  key_name   = "mykey"
  public_key = tls_private_key.mykey.public_key_openssh
}

resource "local_file" "private_key_file" {
  content              = tls_private_key.mykey.private_key_pem
  filename = "mykey.pem" 
  file_permission = "0600"
}