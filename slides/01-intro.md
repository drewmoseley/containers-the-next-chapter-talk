% Beyond Basic Containers for Embedded Linux
% Drew Moseley
% {event} – {date}

---

## Why Containers *Beyond* the Basics?

- We already know:
  - `Dockerfile`, `docker run`, basic images
- Embedded questions are different:
  - Flash is small
  - Networks are flaky
  - Devices live for *years*
- Goal of this talk:
  - Take a naive embedded container setup
  - Turn it into something production-grade
  - Focus on size, performance, security, and lifecycle

---

## Running Example

- Simple embedded Linux device:
  - ARM-based SoC
  - eMMC/SD for storage
  - Network sometimes good, sometimes terrible
- Baseline:
  - App in a single, naive image
  - Built only for target arch
  - Runs as root, with a fat base distro
- We will:
  - Refine build
  - Improve performance
  - Harden security
  - Improve update workflows
