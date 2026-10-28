import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { categoryLabels } from '@/data/portfolio';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { getImage } from '@/lib/images';
import type { PortfolioPhoto } from '@/types/portfolio';

interface PortfolioLightboxProps {
  photos: PortfolioPhoto[];
  /** Índice da foto aberta ou `null` quando o lightbox está fechado. */
  index: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

const SWIPE_THRESHOLD = 48;

/**
 * Visualização ampliada das fotografias, com navegação por teclado
 * (setas e Esc), por toque (arrastar na horizontal) e por clique.
 */
export function PortfolioLightbox({
  photos,
  index,
  onClose,
  onChangeIndex,
}: PortfolioLightboxProps) {
  const isOpen = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useLockBodyScroll(isOpen);

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (index === null || photos.length === 0) return;
      const next = (index + direction + photos.length) % photos.length;
      onChangeIndex(next);
    },
    [index, photos.length, onChangeIndex],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') goTo(1);
      if (event.key === 'ArrowLeft') goTo(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, goTo]);

  // Leva o foco para o painel, para que as setas do teclado funcionem de imediato.
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  if (index === null) return null;

  const photo = photos[index];
  if (!photo) return null;

  const image = getImage(photo.slug);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.caption} — ${categoryLabels[photo.category]}`}
      tabIndex={-1}
      className="fixed inset-0 z-[70] flex flex-col bg-ink outline-none"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start === null || end === undefined) return;

        const distance = end - start;
        if (Math.abs(distance) < SWIPE_THRESHOLD) return;
        goTo(distance < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-canvas md:px-8 md:py-6">
        <span className="font-sans text-[11px] tracking-label text-canvas/60">
          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar visualização"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-canvas/80 transition-colors duration-300 hover:bg-white/10 hover:text-canvas"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Fotografia anterior"
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-canvas/20 text-canvas/80 transition-colors duration-300 hover:border-canvas/50 hover:text-canvas md:left-6"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>

        <img
          key={photo.id}
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 768px) 80vw, 100vw"
          width={image.width}
          height={image.height}
          alt={photo.alt}
          onLoad={() => setLoaded(true)}
          className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Próxima fotografia"
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-canvas/20 text-canvas/80 transition-colors duration-300 hover:border-canvas/50 hover:text-canvas md:right-6"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-5 py-5 text-center md:px-8 md:py-7">
        <p className="eyebrow !text-gold/80">{categoryLabels[photo.category]}</p>
        <p className="mt-2 font-serif text-xl font-light text-canvas md:text-2xl">{photo.caption}</p>
      </div>
    </div>
  );
}
