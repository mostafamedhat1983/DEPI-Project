output "key_pair" {
  value = {
    private_key_pem = tls_private_key.mykey.private_key_pem
    public_key      = aws_key_pair.mykey.public_key
    key_name        = aws_key_pair.mykey.key_name
    private_key_path = local_file.private_key_file.filename
  }
}