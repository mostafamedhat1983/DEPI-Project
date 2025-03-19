networks = [
  {
    "name": "Web-Network",
    "cidr": "10.0.0.0/16",
    "gw_name": "Web-GW",
    "availability_zone": "us-west-2a",
    "subnets": [
      {
        "name": "public",
        "public": true,
        "cidr": "10.0.1.0/24"
      },
      {
        "name": "private",
        "public": false,
        "cidr": "10.0.2.0/24"
      }
    ]
  },
  {
    "name": "DB-Network",
    "cidr": "10.10.0.0/16",
    "gw_name": "DB-GW",
    "availability_zone": "us-west-2a",
    "subnets": [
      {
        "name": "public",
        "public": true,
        "cidr": "10.0.3.0/24"
      },
      {
        "name": "private",
        "public": false,
        "cidr": "10.0.4.0/24"
      }
    ]
  },
  {
    "name": "Infra-Network",
    "cidr": "10.0.0.0/16",
    "gw_name": "Infra-GW",
    "availability_zone": "us-west-2a",
    "subnets": [
      {
        "name": "public",
        "public": true,
        "cidr": "10.0.5.0/24"
      },
      {
        "name": "private",
        "public": false,
        "cidr": "10.0.6.0/24"
      }
    ]
  }    
]

security_groups = [
  {
    "name": "ssh",
    "description": "Allow SSH from anywhere",
    "ingress": [
      {
        "from_port": 22,
        "to_port": 22,
        "protocol": "tcp",
        "cidr_blocks": ["0.0.0.0/0"]
      }
    ],
    "egress": [
      {
        "from_port": 0,
        "to_port": 0,
        "protocol": "-1",
        "cidr_blocks": ["0.0.0.0/0"]
      }
    ]
  },
  {
    "name": "frontend",
    "description": "Allow access on port 5174",
    "ingress": [
      {
        "from_port": 5174,
        "to_port": 5174,
        "protocol": "tcp",
        "cidr_blocks": ["0.0.0.0/0"]
      }
    ],
    "egress": [
      {
        "from_port": 0,
        "to_port": 0,
        "protocol": "-1",
        "cidr_blocks": ["10.0.5.0/24", "10.0.6.0/24"]
      }
    ]
  },
  {
    "name": "backend",
    "description": "Allow access on port 8080",
    "ingress": [
      {
        "from_port": 8080,
        "to_port": 8080,
        "protocol": "tcp",
        "cidr_blocks": ["0.0.0.0/0"]
      }
    ],
    "egress": [
      {
        "from_port": 0,
        "to_port": 0,
        "protocol": "-1",
        "cidr_blocks": ["10.0.5.0/24", "10.0.6.0/24"]
      }
    ]
  },
  {
    "name" : "db",
    "description" : "Allow access on port 3306 from backend",
    "ingress": [
      {
        "from_port": 3306,
        "to_port": 3306,
        "protocol": "tcp",
        "cidr_blocks": ["10.0.1.0/24", "10.0.2.0/24"]
      }
    ],
    "egress": [
      {
        "from_port": 0,
        "to_port": 0,
        "protocol": "-1",
        "cidr_blocks": ["10.0.5.0/24", "10.0.6.0/24"]
      }
    ]
  },
  {
    "name": "infra",
    "description": "Allow all ports from Infra Network",
    "ingress": [
      {
        "from_port": 0,
        "to_port": 0,
        "protocol": "-1",
        "cidr_blocks": ["0.0.0.0/0"]
      }
    ],
    "egress": [
      {
        "from_port": 0,
        "to_port": 0,
        "protocol": "-1",
        "cidr_blocks": ["0.0.0.0/0"]
      }
    ]
  }
]

instances = [
    {
    "name": "DB",
    "ami": "ami-00c257e12d6828491",
    "instance_type": "t2.micro",
    "network": "DB-Network",
    "subnet_type": "public",
    "security_groups": ["ssh", "db"],
    "associate_public_ip_address": true
  },
  {
    "name": "Backend",
    "ami": "ami-00c257e12d6828491",
    "instance_type": "t2.micro",
    "network": "Web-Network",
    "subnet_type": "public",
    "security_groups": ["ssh", "backend"],
    "associate_public_ip_address": true
  },
  {
    "name": "Frontend",
    "ami": "ami-00c257e12d6828491",
    "instance_type": "t2.micro",
    "network": "Web-Network",
    "subnet_type": "public",
    "security_groups": ["ssh", "frontend"],
    "associate_public_ip_address": true
  },
  {
    "name": "Jenkins",
    "ami": "ami-00c257e12d6828491",
    "instance_type": "t2.micro",
    "network": "Infra-Network",
    "subnet_type": "public",
    "security_groups": ["ssh", "infra"],
    "associate_public_ip_address": true
  }
]