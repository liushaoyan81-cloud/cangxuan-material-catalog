import json
import os
import sys

import pypdfium2 as pdfium


def main() -> None:
    pdf_dir = os.path.abspath(sys.argv[1])
    output_root = os.path.abspath(sys.argv[2])
    os.makedirs(output_root, exist_ok=True)
    manifest = {}

    for filename in sorted(os.listdir(pdf_dir)):
        if not filename.lower().endswith(".pdf"):
            continue

        slug = os.path.splitext(filename)[0]
        document = pdfium.PdfDocument(os.path.join(pdf_dir, filename))
        output_dir = os.path.join(output_root, slug)
        os.makedirs(output_dir, exist_ok=True)

        for old_file in os.listdir(output_dir):
            if old_file.startswith("page-") and old_file.endswith(".webp"):
                os.remove(os.path.join(output_dir, old_file))

        dimensions = []
        for index in range(len(document)):
            page = document[index]
            width, height = page.get_size()
            scale = 1800 / max(width, height)
            image = page.render(scale=scale).to_pil().convert("RGB")
            image.save(
                os.path.join(output_dir, f"page-{index + 1:03d}.webp"),
                "WEBP",
                quality=83,
                method=6,
            )
            dimensions.append([image.width, image.height])
            if (index + 1) % 20 == 0:
                print(f"{slug}: {index + 1}/{len(document)}", flush=True)

        manifest[slug] = {"pages": len(document), "dimensions": dimensions}
        print(f"{slug}: completed {len(document)} pages", flush=True)

    with open(os.path.join(output_root, "manifest.json"), "w", encoding="utf-8") as handle:
        json.dump(manifest, handle, ensure_ascii=False, separators=(",", ":"))


if __name__ == "__main__":
    main()
