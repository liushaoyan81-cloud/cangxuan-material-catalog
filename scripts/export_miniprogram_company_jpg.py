import sys
from pathlib import Path

from PIL import Image


def main() -> None:
    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    width = int(sys.argv[3]) if len(sys.argv) > 3 else 1000
    quality = int(sys.argv[4]) if len(sys.argv) > 4 else 72
    target.mkdir(parents=True, exist_ok=True)

    total = 0
    files = sorted(source.glob("page-*.webp"))
    for path in files:
        with Image.open(path) as original:
            image = original.convert("RGB")
            if image.width != width:
                height = round(image.height * width / image.width)
                image = image.resize((width, height), Image.Resampling.LANCZOS)
            output = target / f"{path.stem}.jpg"
            image.save(output, "JPEG", quality=quality, optimize=True, progressive=True)
            total += output.stat().st_size

    print(f"{len(files)} files, {total / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
