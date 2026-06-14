"""Generate favicon assets from the profile photo.

Crops a square centered on the face, then exports the standard icon set.
Run:  python scripts/make_favicons.py
Tune CENTER_X_FRAC / CENTER_Y_FRAC / CROP_FRAC if the framing is off.
"""
from PIL import Image
import os

SRC = "img/kevin-darty.jpg"
OUT = "img/icons"

# Face framing (fractions of the source dimensions).
CENTER_X_FRAC = 0.47   # horizontal center of the face
CENTER_Y_FRAC = 0.34   # vertical center of the face (head sits high in frame)
CROP_FRAC     = 0.62   # square edge as a fraction of the SHORTER side

PNG_SIZES = [16, 32, 48, 180, 192, 512]
ICO_SIZES = [16, 32, 48]


def main():
    img = Image.open(SRC).convert("RGB")
    w, h = img.size
    short = min(w, h)
    edge = int(short * CROP_FRAC)

    cx = int(w * CENTER_X_FRAC)
    cy = int(h * CENTER_Y_FRAC)
    left = cx - edge // 2
    top = cy - edge // 2

    # Keep the crop box inside the image.
    left = max(0, min(left, w - edge))
    top = max(0, min(top, h - edge))
    box = (left, top, left + edge, top + edge)
    square = img.crop(box)
    print(f"source {w}x{h}  crop {box}  edge {edge}")

    os.makedirs(OUT, exist_ok=True)

    masters = {}
    for s in PNG_SIZES:
        im = square.resize((s, s), Image.LANCZOS)
        masters[s] = im
        name = {
            180: "apple-touch-icon.png",
            192: "android-chrome-192x192.png",
            512: "android-chrome-512x512.png",
        }.get(s, f"favicon-{s}x{s}.png")
        im.save(os.path.join(OUT, name), "PNG")
        print("wrote", name)

    # Multi-resolution .ico
    ico = square.resize((256, 256), Image.LANCZOS)
    ico.save(os.path.join(OUT, "favicon.ico"),
             sizes=[(s, s) for s in ICO_SIZES])
    print("wrote favicon.ico")


if __name__ == "__main__":
    main()
