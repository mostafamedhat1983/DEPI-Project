variable "instances" {
  type = list(any)
}

variable "subnets" {
  type = map(map(string))
}

variable "security_groups" {
  type = map(string)
}

variable "key_pair" {
  type = object({
    private_key_pem = string
    public_key      = string
    key_name        = string
    private_key_path = string
  })
}