## 7. Embedded Integration: OS, Devices, and Boot

- Containers don’t replace the OS
- The host still handles:
  - Bootloader & kernel
  - Hardware drivers
  - System logging and basic services
- Containers handle:
  - Application stack
  - Optional: certain system services

---

## Accessing Hardware Safely

- Typical needs:
  - `/dev/tty*`, CAN, GPIO, I²C/SPI, USB
- Patterns:
  - `--device` flags to expose only what’s needed
  - Use groups/permissions on host to limit access
- Avoid:
  - Mounting `/` from host into container
  - Giving blanket `--privileged` for everything

---

## Boot Flow & Supervision

- Boot:
  - Host OS brings up networking and storage
  - Container runtime starts critical containers
- Use systemd (or similar) to:
  - Define service dependencies
  - Restart on failure
  - Handle graceful shutdowns
- Orchestration options:
  - Plain Docker/Podman + systemd
  - Lightweight Kubernetes (k3s, microk8s) when warranted
