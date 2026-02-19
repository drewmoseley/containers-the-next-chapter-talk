## 4. Performance & Footprint on Real Devices

- Performance questions:
  - Startup time of containers on cold boot
  - I/O behavior on cheap eMMC/SD
  - CPU/RAM overhead
- Footprint:
  - On-disk image size vs available flash
  - In-RAM footprint once running
- Measurements worth doing:
  - `time` from boot → app ready
  - Disk usage per image / per layer
  - Memory usage with and without sharing

---

## Tuning Performance

- Startup:
  - Avoid unnecessary init scripts / daemons inside containers
  - Pre-pull images where possible
- I/O:
  - Understand overlayfs behavior on your storage
  - Minimize write amplification (logs, temp files)
- CPU / RAM:
  - Use cgroups to:
    - Pin noisy containers to specific cores
    - Cap memory for non-critical services
