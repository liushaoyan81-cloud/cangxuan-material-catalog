import os
import sys
from pathlib import Path

from PIL import Image


def main() -> None:
    root = Path(sys.argv[1])
    target_long_edge = int(sys.argv[2]) if len(sys.argv) > 2 else 1200
    quality = int(sys.argv[3]) if len(sys.argv) > 3 else 76
    files = sorted(root.rglob("*.webp"))
    before = 0
    after = 0

    for path in files:
        before += path.stat().st_size
        with Image.open(path) as source:
            image = source.convert("RGB")
            scale = min(1.0, target_long_edge / max(image.size))
            if scale < 1:
                image = image.resize(
                    (round(image.width * scale), round(image.height * scale)),
                    Image.Resampling.LANCZOS,
                )
            temporary = path.with_suffix(".compressed.webp")
            image.save(temporary, "WEBP", quality=quality, method=6)
        os.replace(temporary, path)
        after += path.stat().st_size

    print(f"{len(files)} files: {before / 1024 / 1024:.1f} MB -> {after / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    main()
