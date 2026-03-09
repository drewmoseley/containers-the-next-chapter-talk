## Embedded Integration Ladder

Containers don't replace the OS — pick the right rung for your application:

<div class="priv-ladder">

<div class="priv-rung priv-safe fragment" data-fragment-index="0">
<div class="priv-rung-label">Groups & permissions</div>
<div class="priv-rung-desc"><code>dialout</code>, <code>gpio</code>, <code>i2c</code> — no kernel privileges needed</div>
</div>

<div class="priv-arrow fragment" data-fragment-index="1">↓ need a specific device node?</div>

<div class="priv-rung priv-safe fragment" data-fragment-index="1">
<div class="priv-rung-label"><code>--device</code></div>
<div class="priv-rung-desc">Single device node; nothing else exposed (<code>/dev/ttyUSB0</code>, CAN, I²C/SPI)</div>
</div>

<div class="priv-arrow fragment" data-fragment-index="2">↓ need a whole class of devices?</div>

<div class="priv-rung priv-caution fragment" data-fragment-index="2">
<div class="priv-rung-label"><code>--device-cgroup-rule</code></div>
<div class="priv-rung-desc">Device class by major number — Wayland kiosk: <code>c 226:* rmw</code>, <code>/dev/dri</code>, <code>--shm-size</code></div>
</div>

<div class="priv-arrow fragment" data-fragment-index="3">↓ need kernel-level privileges?</div>

<div class="priv-rung priv-caution fragment" data-fragment-index="3">
<div class="priv-rung-label">Linux capabilities</div>
<div class="priv-rung-desc"><code>--cap-drop ALL --cap-add CAP_NET_ADMIN</code> — surgical and auditable</div>
</div>

<div class="priv-arrow fragment" data-fragment-index="4">↓ still not enough?</div>

<div class="priv-rung priv-danger fragment" data-fragment-index="4">
<div class="priv-rung-label">⛔ <code>--privileged</code></div>
<div class="priv-rung-desc">Full host kernel access — almost never the right answer</div>
</div>

</div>

<p class="fragment" data-fragment-index="5" style="font-size: 1.2em;"><strong>Key idea:</strong> Least-privilege applies here too — expose exactly what the application needs, nothing more.</p>
