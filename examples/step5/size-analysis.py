#!/usr/bin/env python3
"""Compute on-disk footprint for dashboard-step5-* images, counting shared layers once.

Note: step5 uses registry-pushed multi-arch images. Pull a specific platform
first to inspect locally, e.g.:
  docker pull --platform linux/arm64 ghcr.io/example/dashboard/sensor:step5
Then pass the image name as an argument:
  python3 size-analysis.py ghcr.io/example/dashboard/sensor:step5 \\
                           ghcr.io/example/dashboard/web:step5
"""

import subprocess, json, re, sys

def parse_bytes(s):
    s = s.strip()
    m = re.match(r"([\d.]+)\s*(B|kB|MB|GB)", s)
    if not m or s == "0B":
        return 0
    v, u = float(m.group(1)), m.group(2)
    return int(v * {"B": 1, "kB": 1024, "MB": 1024**2, "GB": 1024**3}[u])


def fmt(b):
    if b >= 1024**2:
        return f"{b / 1024**2:.0f} MB"
    return f"{b / 1024:.1f} kB"


# Accept explicit image names as arguments, or fall back to wildcard filter
if len(sys.argv) > 1:
    ls = sys.argv[1:]
else:
    ls = subprocess.check_output(
        ["docker", "image", "ls", "--filter", "reference=ghcr.io/example/dashboard/*",
         "--format", "{{.Repository}}:{{.Tag}}"],
        text=True,
    ).strip().splitlines()

if not ls:
    print("No images found. Pull them first or pass image names as arguments.")
    sys.exit(0)

# Inspect all images at once
data = json.loads(
    subprocess.check_output(["docker", "image", "inspect"] + ls, text=True)
)

# For each image, pair RootFS layer digests with sizes from docker history.
# docker history (oldest-first after reversing) matches RootFS.Layers order;
# we take the first len(layers) entries to skip trailing metadata (CMD, etc.).
digest_to_size: dict[str, int] = {}
naive_total = 0

for img in data:
    name = (img["RepoTags"] or [img["Id"][:12]])[0]
    layers = img["RootFS"]["Layers"]
    n = len(layers)

    hist = subprocess.check_output(
        ["docker", "history", name, "--format", "{{.Size}}"], text=True
    ).strip().splitlines()
    sizes = [parse_bytes(s) for s in reversed(hist)][:n]

    for digest, size in zip(layers, sizes):
        digest_to_size.setdefault(digest, size)

    naive_total += img["Size"]

on_disk = sum(digest_to_size.values())
savings = naive_total - on_disk

print(f"  Naïve sum : {fmt(naive_total)}")
print(f"  Savings   : {fmt(savings)} (shared layers counted once)")
print(f"  On-disk   : ~{fmt(on_disk)}")
