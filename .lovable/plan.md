## Goal
Replace the current 5-second thumbnail for the "Luxury watch editorial" entry on the work page with a frame extracted at exactly 8 seconds from the `luxury-watches.mp4` video.

## Steps

1. **Read the video asset** — Get the CDN URL from `src/assets/luxury-watches.mp4.asset.json`.

2. **Extract frame at 8s** — Use ffmpeg to download the video and capture a single high-quality JPEG frame at the 8-second mark:
   ```
   ffmpeg -ss 00:00:08 -i <video_url> -vframes 1 -q:v 2 /tmp/luxury-watches-thumb-8s.jpg
   ```

3. **Upload as Lovable asset** — Use the `lovable-assets create` CLI to upload the extracted JPEG, producing `src/assets/luxury-watches-thumb-8s.jpg.asset.json`.

4. **Update site data** — In `src/data/site.ts`:
   - Add a new import for the 8-second thumbnail asset.
   - Update the first `FEATURED` item ("Luxury watch editorial") to use the new 8s thumbnail instead of the existing 5s one.

## Output
- New asset file: `src/assets/luxury-watches-thumb-8s.jpg.asset.json`
- Updated reference in `src/data/site.ts`