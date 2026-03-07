## Performance & Footprint

There is a lot to say here — this topic alone could fill a talk. A few key pointers:

- **Image size** directly impacts OTA bandwidth and flash usage — steps 1–4 showed the path from 498 MB to ~40 MB
- **Startup time** on cold boot matters; avoid unnecessary init scripts inside containers
- **overlayfs on eMMC/SD** has I/O characteristics worth measuring before you ship
- **cgroups** let you pin containers to cores and cap memory — essential for mixed-criticality workloads
- **Pre-pulling** images during a maintenance window avoids latency at startup

<p class="fragment" style="font-size: 1.2em;"><strong>Watch this space:</strong> this 2-part series is probably becoming a 3- or 4-parter.</p>
