import { imageManifest, type ImageSlug } from '@/data/imageManifest';
import type { PhotoOrientation, ResponsiveImage } from '@/types/portfolio';

const BASE_PATH = '/images';

function orientationOf(width: number, height: number): PhotoOrientation {
  const ratio = width / height;
  if (ratio > 1.08) return 'horizontal';
  if (ratio < 0.92) return 'vertical';
  return 'quadrada';
}

/**
 * Monta src, srcSet e dimensões reais de uma foto a partir do manifesto gerado
 * por `npm run images`. As dimensões explícitas evitam deslocamento de layout.
 */
export function getImage(slug: ImageSlug): ResponsiveImage {
  const asset = imageManifest[slug];
  const widths = [...asset.widths].sort((a, b) => a - b);
  const largest = widths[widths.length - 1] ?? asset.width;

  const url = (width: number) => `${BASE_PATH}/${asset.folder}/${slug}-${width}.webp`;

  return {
    src: url(largest),
    srcSet: widths.map((width) => `${url(width)} ${width}w`).join(', '),
    width: asset.width,
    height: asset.height,
    placeholder: asset.placeholder,
    orientation: orientationOf(asset.width, asset.height),
  };
}
