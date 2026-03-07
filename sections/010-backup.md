## Backup Slides {.section-title}

---

## Inspecting Layers Before You Pull

:::: {.slide-columns}

::: {.slide-col-left}

- **`skopeo`** reads the OCI manifest from a registry — no pull, no daemon required
- Shows layer digests + compressed sizes before committing any bandwidth
- Useful for pre-flight estimates, diffing releases, scripted fleet rollouts

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[terminal]{.cw-filename}
::::

```
$ skopeo inspect --raw \
    docker://ghcr.io/example/dashboard/sensor:v2 \
  | jq '.layers[] | {digest: .digest[7:19],
                     size_kb: (.size/1024|floor)}'

{ "digest": "a8ca11554fce", "size_kb": 17999 }
{ "digest": "3d8f1b4c0b9e", "size_kb": 14453 }
{ "digest": "b2e7f9d1a3c4", "size_kb": 4      }
{ "digest": "9f4e2b8d6a1c", "size_kb": XX     }  ← TBD
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> Know your update payload size <em>before</em> you commit the device's bandwidth.</p>
