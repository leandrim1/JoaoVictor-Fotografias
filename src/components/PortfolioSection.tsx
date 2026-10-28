import { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Photo } from '@/components/Photo';
import { PortfolioLightbox } from '@/components/PortfolioLightbox';
import { Reveal } from '@/components/Reveal';
import { categoryLabels, portfolioFilters, portfolioPhotos } from '@/data/portfolio';
import { useColumnCount } from '@/hooks/useColumnCount';
import { getImage } from '@/lib/images';
import type { PortfolioCategory, PortfolioPhoto } from '@/types/portfolio';

type FilterId = PortfolioCategory | 'todos';

/** Espaço extra somado à altura relativa de cada foto, equivalente ao respiro da grade. */
const GAP_RATIO = 0.07;

/**
 * Distribui as fotos entre as colunas sempre pela coluna mais curta, usando a
 * proporção real de cada arquivo. O resultado é uma grade assimétrica e
 * equilibrada, sem cartões de altura idêntica.
 */
function distribute(photos: PortfolioPhoto[], columns: number): PortfolioPhoto[][] {
  const buckets: PortfolioPhoto[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);

  photos.forEach((photo) => {
    const image = getImage(photo.slug);
    let target = 0;

    for (let column = 1; column < columns; column += 1) {
      if ((heights[column] ?? 0) < (heights[target] ?? 0)) target = column;
    }

    buckets[target]?.push(photo);
    heights[target] = (heights[target] ?? 0) + image.height / image.width + GAP_RATIO;
  });

  return buckets;
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('todos');
  const [pendingFilter, setPendingFilter] = useState<FilterId | null>(null);
  /** Guardamos o id (e não a posição) para a foto aberta não trocar ao girar a tela. */
  const [openPhotoId, setOpenPhotoId] = useState<string | null>(null);
  const columns = useColumnCount();
  const timeoutRef = useRef<number | undefined>(undefined);

  const visiblePhotos = useMemo(
    () =>
      activeFilter === 'todos'
        ? portfolioPhotos
        : portfolioPhotos.filter((photo) => photo.category === activeFilter),
    [activeFilter],
  );

  const columnsContent = useMemo(
    () => distribute(visiblePhotos, columns),
    [visiblePhotos, columns],
  );

  /**
   * Ordem em que as fotos aparecem na página (coluna a coluna). É ela que o
   * lightbox usa, para o contador combinar com a foto que a pessoa clicou.
   */
  const orderedPhotos = useMemo(() => columnsContent.flat(), [columnsContent]);
  const openIndex = openPhotoId
    ? orderedPhotos.findIndex((photo) => photo.id === openPhotoId)
    : -1;

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  // Troca de categoria: esmaece a grade, troca o conteúdo e revela de novo.
  const handleFilter = (filter: FilterId) => {
    if (filter === activeFilter) return;

    setPendingFilter(filter);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setActiveFilter(filter);
      setPendingFilter(null);
    }, 220);
  };

  const isTransitioning = pendingFilter !== null;

  return (
    <section id="portfolio" className="bg-canvas pb-24 pt-4 md:pb-36 md:pt-8">
      <div className="section-shell">
        <header className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            Portfólio
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="display mt-6 text-[clamp(2rem,5.6vw,3.6rem)] text-ink"
          >
            Histórias que merecem ser lembradas.
          </Reveal>

          <Reveal as="p" delay={0.2} className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
            Cada história tem seu próprio ritmo, seus detalhes e sua maneira de acontecer.
          </Reveal>
        </header>

        <Reveal
          delay={0.25}
          className="no-scrollbar -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 md:mx-0 md:mt-14 md:flex-wrap md:px-0"
        >
          {portfolioFilters.map((filter) => {
            const isActive = filter.id === (pendingFilter ?? activeFilter);

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleFilter(filter.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-[12px] font-medium tracking-[0.06em] transition-all duration-300 ease-editorial ${
                  isActive
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-ink/12 bg-transparent text-muted hover:border-ink/35 hover:text-ink'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </Reveal>

        <div
          className={`mt-8 grid gap-4 transition-all duration-200 ease-editorial md:mt-12 md:gap-6 ${
            isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
          }`}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {columnsContent.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex flex-col gap-4 md:gap-6 ${
                columns === 3 && columnIndex === 1 ? 'lg:mt-14' : ''
              }`}
            >
              {column.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setOpenPhotoId(photo.id)}
                  className="group relative block w-full overflow-hidden rounded-sm text-left"
                  aria-label={`Ampliar fotografia: ${photo.caption}`}
                >
                  <Photo
                    slug={photo.slug}
                    alt={photo.alt}
                    natural
                    zoomOnHover
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    className="w-full rounded-sm"
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100"
                  />

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100 md:p-5">
                    <span className="block">
                      <span className="block text-[10px] font-medium uppercase tracking-label text-gold">
                        {categoryLabels[photo.category]}
                      </span>
                      <span className="mt-1.5 block font-serif text-lg font-light leading-tight text-canvas md:text-xl">
                        {photo.caption}
                      </span>
                    </span>

                    <Maximize2
                      size={16}
                      strokeWidth={1.5}
                      className="mb-1 shrink-0 text-canvas/80"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <PortfolioLightbox
        photos={orderedPhotos}
        index={openIndex >= 0 ? openIndex : null}
        onClose={() => setOpenPhotoId(null)}
        onChangeIndex={(next) => setOpenPhotoId(orderedPhotos[next]?.id ?? null)}
      />
    </section>
  );
}
