output "security_group_ids" {
  value = {
    allow_ssh = aws_security_group.allow_ssh.id
    frontend  = aws_security_group.frontend_sg.id
    backend   = aws_security_group.backend_sg.id
    db        = aws_security_group.db_sg.id
  }
}