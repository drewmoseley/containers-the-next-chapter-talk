% Beyond Basic Containers for Embedded Linux
% Drew Moseley
% Embedded World Conference and Expo – March 12, 2026

---

## WITH YOU TODAY… {.speaker-slide}

<div class="speaker-cards">
<div class="speaker-card">
<img src="img/headshot.png" alt="Drew Moseley">
<p class="speaker-name">Drew Moseley</p>
<p class="speaker-role">Torizon Professional Services, Staff Developer</p>
<p class="speaker-company">Toradex</p>
</div>
</div>

<p class="speaker-location">We're located in Lucerne, Switzerland</p>

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
