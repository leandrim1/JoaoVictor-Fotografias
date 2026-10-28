import { marqueePhotos } from '@/data/portfolio';
import { getImage } from '@/lib/images';

/**
 * Faixa editorial de fotografias em movimento horizontal contínuo.
 *
 * A sequência é duplicada e o trilho desloca exatamente 50% da própria
 * largura, o que fecha o laço sem salto. As margens ficam em cada foto (e não
 * em `gap`) para que as duas metades tenham a mesma largura.
 */
export function PhotoMarquee() {
  const sequence = [...marqueePhotos, ...marqueePhotos];

  return (
    <section
      aria-label="Fotografias recentes"
      className="group relative overflow-hidden border-y border-ink/5 bg-sand/60 py-8 md:py-12"
    >
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        {sequence.map((photo, index) => {
          const image = getImage(photo.slug);
          const isDuplicate = index >= marqueePhotos.length;

          return (
            <div
              key={`${photo.id}-${index}`}
              className="relative mx-2 h-[200px] shrink-0 overflow-hidden rounded-lg bg-sand md:mx-3 md:h-[360px] lg:h-[420px]"
              style={{
                aspectRatio: `${image.width} / ${image.height}`,
                backgroundImage: `url("${image.placeholder}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              {...(isDuplicate ? { 'aria-hidden': true } : {})}
            >
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 180px"
                width={image.width}
                height={image.height}
                alt={isDuplicate ? '' : photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Desvanecimento nas bordas, para a faixa não terminar em corte seco. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-canvas to-transparent md:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-canvas to-transparent md:w-24"
      />
    </section>
  );
}
