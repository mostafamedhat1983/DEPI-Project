# Ansible Playbook Guide

## 📌 Prerequisites
Before running the Ansible playbook, ensure you have the following:

- **Ansible Installed**: Install Ansible on your control machine (your local machine or a server):
  ```bash
  sudo apt update && sudo apt install ansible -y  # For Ubuntu/Debian
  sudo yum install ansible -y  # For CentOS/RHEL
  ```

- **SSH Access**: Ensure the control machine can SSH into target hosts.
  ```bash
  ssh user@target_host
  ```
  If using passwordless authentication, set up SSH keys:
  ```bash
  ssh-keygen -t rsa -b 4096
  ssh-copy-id user@target_host
  ```

## 📂 Project Structure
```
ansible-files/
│── ansible.cfg           # Ansible configuration file
│── hosts                 # Inventory file (target hosts)
│── my_inventory.ini      # Alternative inventory file
│── my_playbook.yml       # Ansible playbook
│── README.md             # This guide
```

## 🔧 Configuration
### 1️⃣ Edit the Inventory File (`hosts` or `my_inventory.ini`)
Add target hosts under the relevant groups:
```ini
[web_servers]
192.168.1.10
192.168.1.11

[db_servers]
192.168.1.20
```

Alternatively, if using an `.ini` file:
```ini
[web_servers]
server1 ansible_host=192.168.1.10 ansible_user=root
server2 ansible_host=192.168.1.11 ansible_user=root
```

### 2️⃣ Configure `ansible.cfg`
Ensure `ansible.cfg` points to the correct inventory file:
```ini
[defaults]
inventory = ./hosts  # Change if using a different inventory file
host_key_checking = False
```

## ▶️ Running the Playbook
Run the Ansible playbook with:
```bash
ansible-playbook -i hosts my_playbook.yml
```

For a specific group:
```bash
ansible-playbook -i hosts my_playbook.yml --limit web_servers
```

For debugging (verbose mode):
```bash
ansible-playbook -i hosts my_playbook.yml -vvv
```

## 🔍 Verify Connection to Hosts
Before running the playbook, test the connection:
```bash
ansible -i hosts all -m ping
```

If successful, you’ll see output like:
```bash
192.168.1.10 | SUCCESS => {
    "ping": "pong"
}
```

## 🛠 Troubleshooting
- **Permission denied?** Use `--ask-become-pass` for sudo access:
  ```bash
  ansible-playbook -i hosts my_playbook.yml --ask-become-pass
  ```

- **Authentication failure?** Ensure SSH keys or correct passwords are set.

- **Hosts unreachable?** Check network/firewall settings.

## 📢 Conclusion
This guide helps you set up and run an Ansible playbook efficiently. Modify it based on your requirements! 🚀

