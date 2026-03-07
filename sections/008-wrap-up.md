## Putting It All Together

We started with:

- A single, naive image
  - Big, slow, insecure, target-only

We end with:

- Multi-stage, multi-arch builds
- Minimal runtime images + debug images
- Signed, SBOM-documented artifacts
- Update workflows for:
  - Online + offline
  - Rollback and long lifetimes
- Practical handling of:
  - Performance
  - Security
  - Hardware access
  - Debugging

<p class="fragment" style="font-size: 1.2em;"><strong>Key takeaway:</strong> Containers <em>can</em> be right for embedded—but only if we design with embedded constraints in mind.</p>
