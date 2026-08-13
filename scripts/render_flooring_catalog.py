import os
import sys

import pypdfium2 as pdfium
def main() -> None:
    source = sys.argv[1]
    output_dir = sys.argv[2]
    if os.path.isfile(source):
        pdf_path = source
    else:
        source_dir, title_fragment = source.split("|", 1)
        pdf_path = next(
            os.path.join(source_dir, filename)
            for filename in os.listdir(source_dir)
            if title_fragment in filename and filename.lower().endswith(".pdf")
        )
    os.makedirs(output_dir, exist_ok=True)
    document = pdfium.PdfDocument(pdf_path)
    target_long_edge = 1800

    for filename in os.listdir(output_dir):
        if filename.startswith("page-") and filename.endswith(".webp"):
            os.remove(os.path.join(output_dir, filename))

    for index in range(len(document)):
        page = document[index]
        width, height = page.get_size()
        scale = target_long_edge / max(width, height)
        image = page.render(scale=scale).to_pil().convert("RGB")
        image.save(
            os.path.join(output_dir, f"page-{index + 1:03d}.webp"),
            "WEBP",
            quality=85,
            method=6,
        )
        if (index + 1) % 20 == 0:
            print(f"{index + 1}/{len(document)}", flush=True)

    print(f"completed {len(document)} pages", flush=True)


if __name__ == "__main__":
    main()
