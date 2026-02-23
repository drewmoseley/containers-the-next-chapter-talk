## 6. Deployment & Update Workflows

- Embedded constraints:
  - Intermittent connectivity
  - Bandwidth is expensive
  - Power can drop at any time
- We care about:
  - Minimizing download size
  - Safe rollbacks
  - Offline / factory updates

---

## Designing Images for Efficient Updates

- Layering strategy:
  - Put frequently changing parts in upper layers
  - Keep shared base layers very stable
- Anti-pattern:
  - `RUN apt update && apt upgrade` in every build
  - Leads to huge diffs and unpredictable contents
- Better:
  - Fixed, versioned base image
  - Application layer(s) on top
  - Predictable diffs and caching between releases

---

## Online Updates: Registries and Mirrors

- Central registry:
  - Holds signed, multi-arch images
- Edge mirrors:
  - Site-local registry to save bandwidth
  - Devices pull from nearby source
- Consider:
  - Authentication and authorization to registry
  - Rate limits for large fleets
  - Staggered rollout / canary devices

---

## Offline & Air-Gapped Updates

- Common scenarios:
  - Factory provisioning
  - Customer sites without internet
- Techniques:
  - `docker save`/`load` style workflows
  - Transfer OCI archives via USB / SD card
  - Verify signature on-device before load
- Rollback:
  - Keep at least one previous image locally
  - Fallback if new version fails health checks
