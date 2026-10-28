#!/usr/bin/env python3
"""Prepara as fotografias do site a partir de `fotos-originais/`.

Para cada arquivo encontrado em `fotos-originais/<pasta>/<slug>.<ext>` o script:

  * gera versoes WebP responsivas em `public/images/<pasta>/<slug>-<largura>.webp`;
  * calcula uma miniatura borrada (LQIP) embutida no manifesto;
  * reescreve `src/data/imageManifest.ts` com as dimensoes reais de cada foto.

Tambem regenera `public/images/og-image.jpg` (1200x630) a partir da foto
definida em OG_SOURCE.

Uso:  npm run images       (ou: python3 scripts/build-images.py)
Requisito:  Python 3.9+ com Pillow  ->  pip install Pillow
"""

from __future__ import annotations

import base64
import io
import json
import os
import sys

try:
    from PIL import Image, ImageFilter
except ImportError:  # pragma: no cover
    sys.exit("Pillow nao encontrado. Instale com: pip install Pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(ROOT, "fotos-originais")
OUTPUT_DIR = os.path.join(ROOT, "public", "images")
MANIFEST = os.path.join(ROOT, "src", "data", "imageManifest.ts")

# Larguras geradas para o srcset. Larguras maiores que a foto original sao ignoradas.
WIDTHS = [1440, 960, 640, 400]
QUALITY = 82
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

# Foto usada na imagem de compartilhamento (Open Graph).
OG_SOURCE = ("portfolio", "casamento-entrada-cerimonia")


def responsive_variants(image: Image.Image, folder: str, slug: str) -> list[int]:
    out_dir = os.path.join(OUTPUT_DIR, folder)
    os.makedirs(out_dir, exist_ok=True)

    width, height = image.size
    targets = [w for w in WIDTHS if w <= width] or [width]

    for target in targets:
        scale = target / width
        resized = image.resize((target, max(1, round(height * scale))), Image.LANCZOS)
        resized.save(
            os.path.join(out_dir, f"{slug}-{target}.webp"),
            "WEBP",
            quality=QUALITY,
            method=6,
        )

    return targets


def low_quality_placeholder(image: Image.Image) -> str:
    width, height = image.size
    tiny = image.resize((20, max(1, round(20 * height / width))), Image.LANCZOS)
    tiny = tiny.filter(ImageFilter.GaussianBlur(0.6))
    buffer = io.BytesIO()
    tiny.save(buffer, "WEBP", quality=45)
    return "data:image/webp;base64," + base64.b64encode(buffer.getvalue()).decode()


def open_graph_image() -> None:
    folder, slug = OG_SOURCE
    source = find_source(folder, slug)
    if source is None:
        print(f"  ! og-image: {folder}/{slug} nao encontrado, etapa ignorada")
        return

    image = Image.open(source).convert("RGB")
    width, height = image.size
    ratio = 1200 / 630

    if width / height > ratio:
        crop_width = round(height * ratio)
        left = (width - crop_width) // 2
        box = (left, 0, left + crop_width, height)
    else:
        crop_height = round(width / ratio)
        top = (height - crop_height) // 2
        box = (0, top, width, top + crop_height)

    image.crop(box).resize((1200, 630), Image.LANCZOS).save(
        os.path.join(OUTPUT_DIR, "og-image.jpg"), "JPEG", quality=84, optimize=True
    )
    print("  og-image.jpg (1200x630)")


def find_source(folder: str, slug: str) -> str | None:
    folder_path = os.path.join(SOURCE_DIR, folder)
    if not os.path.isdir(folder_path):
        return None
    for entry in sorted(os.listdir(folder_path)):
        name, ext = os.path.splitext(entry)
        if name == slug and ext.lower() in EXTENSIONS:
            return os.path.join(folder_path, entry)
    return None


def write_manifest(assets: dict[str, dict[str, object]]) -> None:
    lines = [
        "// ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.",
        "// Regenerar com `npm run images` depois de atualizar `fotos-originais/`.",
        "",
        "export interface ImageAsset {",
        "  /** Pasta dentro de /public/images. */",
        "  readonly folder: string;",
        "  /** Largura da maior versão disponível, em pixels. */",
        "  readonly width: number;",
        "  /** Altura da maior versão disponível, em pixels. */",
        "  readonly height: number;",
        "  /** Larguras geradas para o srcset, da maior para a menor. */",
        "  readonly widths: readonly number[];",
        "  /** Miniatura embutida (LQIP) exibida enquanto a foto carrega. */",
        "  readonly placeholder: string;",
        "}",
        "",
        "export const imageManifest = {",
    ]

    for slug in sorted(assets):
        meta = assets[slug]
        widths = ", ".join(str(w) for w in meta["widths"])  # type: ignore[index]
        lines += [
            f"  '{slug}': {{",
            f"    folder: '{meta['folder']}',",
            f"    width: {meta['width']},",
            f"    height: {meta['height']},",
            f"    widths: [{widths}],",
            f"    placeholder:\n      '{meta['placeholder']}',",
            "  },",
        ]

    lines += [
        "} as const satisfies Record<string, ImageAsset>;",
        "",
        "export type ImageSlug = keyof typeof imageManifest;",
        "",
    ]

    with open(MANIFEST, "w", encoding="utf-8") as handle:
        handle.write("\n".join(lines))


def main() -> None:
    if not os.path.isdir(SOURCE_DIR):
        sys.exit(f"Pasta nao encontrada: {SOURCE_DIR}")

    assets: dict[str, dict[str, object]] = {}
    print(f"Lendo fotos de {os.path.relpath(SOURCE_DIR, ROOT)}/")

    for folder in sorted(os.listdir(SOURCE_DIR)):
        folder_path = os.path.join(SOURCE_DIR, folder)
        if not os.path.isdir(folder_path):
            continue

        for entry in sorted(os.listdir(folder_path)):
            slug, ext = os.path.splitext(entry)
            if ext.lower() not in EXTENSIONS:
                continue

            if slug in assets:
                sys.exit(f"Slug duplicado: '{slug}'. Use nomes unicos entre as pastas.")

            image = Image.open(os.path.join(folder_path, entry)).convert("RGB")
            widths = responsive_variants(image, folder, slug)
            assets[slug] = {
                "folder": folder,
                "width": image.size[0],
                "height": image.size[1],
                "widths": widths,
                "placeholder": low_quality_placeholder(image),
            }
            print(f"  {folder}/{slug}  {image.size[0]}x{image.size[1]}  -> {widths}")

    if not assets:
        sys.exit("Nenhuma foto encontrada em fotos-originais/.")

    open_graph_image()
    write_manifest(assets)
    print(f"\n{len(assets)} fotos processadas. Manifesto: {os.path.relpath(MANIFEST, ROOT)}")
    print(json.dumps({"total": len(assets)}))


if __name__ == "__main__":
    main()
