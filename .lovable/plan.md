# Make contact submissions effectively never fail

A browser `fetch()` only enters the `catch` branch when the request can't leave the device:

1. Device is offline (no Wi-Fi / data).
2. DNS or TLS handshake fails (captive-portal Wi-Fi, broken corporate proxy, expired root cert).
3. Request is aborted mid-flight (user navigates away, tab closed, timeout).
4. CORS preflight rejected (not a real risk for Formspree — it allows browser POSTs).

We can't make the network itself reliable from inside the browser, but we can make sure the user's message is never silently lost. Two layers:

## 1. Retry with exponential backoff

In `src/routes/contact.tsx` `onSubmit`:
- Wrap the `fetch` in a small retry helper: up to 3 attempts, delays 0s → 1s → 3s.
- Treat any completed response (any status) as success, same as today.
- Only fall through to the failure branch after all retries throw.
- During retries, keep the button in "Sending…" so the user knows it's still working.

This handles transient drops (flaky Wi-Fi, brief DNS hiccups) without the user noticing.

## 2. Background send via `navigator.sendBeacon` as a last resort

If all 3 `fetch` retries fail:
- Try `navigator.sendBeacon(FORMSPREE_ENDPOINT, formData)`. Beacons are queued by the browser and delivered when the network returns, even if the tab is closed.
- If the beacon is accepted (returns `true`), show the success message — the message is now in the browser's outbound queue and the user can safely leave the page.
- If even the beacon is rejected (truly offline with no queue), show the existing fallback that points the user at WhatsApp / email so the message isn't lost.

## 3. Honest fallback copy

Update the error message to lead with the direct contacts instead of just "try again":
"We couldn't send right now. Reach out on WhatsApp or email so we don't miss you." with the existing `wa.me` / `mailto:` links rendered as inline buttons under the error.

## Out of scope
- No backend, no database, no new dependencies. Still purely Formspree.
- No server-side queue (would require Lovable Cloud + a worker; happy to add that separately if you want true server-side guaranteed delivery).

## Files
- `src/routes/contact.tsx` — retry helper, beacon fallback, updated error UI.
