#!/usr/bin/env python3
"""Build the raven sprite sheets for the practice flight on the landing page.

Source: the Quill & Wing app's rendered runtime frames (assets/bird-v17 in the
app repo). Every clip is sampled at half rate, exactly as the page's flight
script indexes them, and packed into 6x5 sheets of 400px cells:

  sheet index  frames (0-based)   source clip
  0..          0-123   (124)      departure  frames 1,3,5 … 247  (247 @ 36fps)
               124-214 (91)       arrival    frames 1,3,5 … 179 + 180  (180 @ 30fps; the page rounds, so the last index is the settled frame)
               215-238 (24)       look       frames 1,3,5 … 47   (48 @ 24fps)
               239                perched    (bird at rest on the perch)
               240                perch      (the empty perch)

Usage:  python3 scripts/build-raven-sheets.py "/path/to/Send a Raven/assets/bird-v17"
Output: raven/sheet-00.webp … raven/sheet-08.webp  (2400x2000, RGBA)
"""
import os, sys
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Home/Send a Raven/assets/bird-v17")
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "raven")
FS, COLS, ROWS = 400, 6, 5
PER = COLS * ROWS

def frames(clip, count, step):
    return [os.path.join(SRC, clip, f"{i:03d}.png") for i in range(1, count + 1, step)]

order = (frames("departure", 247, 2)      # 124
       + frames("arrival", 180, 2) + [os.path.join(SRC, "arrival", "180.png")]  # 90 + the settled last frame = 91
       + frames("look", 48, 2)            # 24
       + [os.path.join(SRC, "perched", "001.png"), os.path.join(SRC, "perch", "001.png")])
assert len(order) == 241, len(order)
for p in order:
    if not os.path.exists(p): sys.exit(f"missing frame: {p}")

os.makedirs(OUT, exist_ok=True)
sheets = (len(order) + PER - 1) // PER
for s in range(sheets):
    sheet = Image.new("RGBA", (COLS * FS, ROWS * FS), (0, 0, 0, 0))
    for c, path in enumerate(order[s * PER:(s + 1) * PER]):
        im = Image.open(path).convert("RGBA").resize((FS, FS), Image.LANCZOS)
        sheet.paste(im, ((c % COLS) * FS, (c // COLS) * FS))
    out = os.path.join(OUT, f"sheet-{s:02d}.webp")
    sheet.save(out, "WEBP", quality=82, method=6)
    print(f"{out}: {os.path.getsize(out)//1024} KB")
print("sheets:", sheets, "frames:", len(order))
