import { useEffect, useRef, useState } from 'react';
import type { ImageSlug } from '@/data/imageManifest';
import { getImage } from '@/lib/images';

interface PhotoProps {
  slug: ImageSlug;
  alt: string;
  /** Dica de largura renderizada, usada pelo navegador para escolher o arquivo. */
  sizes: string;
  /** Classes do contêiner — normalmente a proporção (`aspect-[4/5]`). */
  className?: string;
  imgClassName?: string;
  /** Carrega a foto imediatamente. Use apenas na primeira dobra. */
  priority?: boolean;
  /** Aplica um leve zoom quando o contêiner pai recebe hover. */
  zoomOnHover?: boolean;
  /** Usa a proporção real do arquivo para reservar o espaço do contêiner. */
  natural?: boolean;
}

/**
 * Fotografia responsiva com dimensões explícitas (evita deslocamento de
 * layout), carregamento preguiçoso fora da primeira dobra e uma miniatura
 * borrada no lugar da área vazia enquanto o arquivo final chega.
 */
export function Photo({
  slug,
  alt,
  sizes,
  className = '',
  imgClassName = '',
  priority = false,
  zoomOnHover = false,
  natural = false,
}: PhotoProps) {
  const image = getImage(slug);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Imagens vindas do cache podem concluir antes do React registrar o onLoad.
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-sand ${className}`}
      style={{
        backgroundImage: `url("${image.placeholder}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...(natural ? { aspectRatio: `${image.width} / ${image.height}` } : {}),
      }}
    >
      <img
        ref={imgRef}
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' as const } : {})}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-editorial ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${zoomOnHover ? 'group-hover:scale-[1.04]' : ''} ${imgClassName}`.trim()}
      />
    </div>
  );
}
