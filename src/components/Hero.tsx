import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/Button';
import { whatsappMessages } from '@/data/site';
import { useParallax } from '@/hooks/useParallax';
import { getImage } from '@/lib/images';
import { whatsappLink } from '@/lib/whatsapp';

const desktopImage = getImage('casamento-entrada-cerimonia');
const mobileImage = getImage('casamento-arco-floral');

export function Hero() {
  const { ref, offset } = useParallax<HTMLDivElement>({ distance: 60 });

  return (
    <section id="inicio" className="relative isolate h-hero w-full overflow-hidden bg-ink">
      <div
        ref={ref}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.06)` }}
      >
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={desktopImage.srcSet}
            sizes="100vw"
            width={desktopImage.width}
            height={desktopImage.height}
          />
          <img
            src={mobileImage.src}
            srcSet={mobileImage.srcSet}
            sizes="100vw"
            width={mobileImage.width}
            height={mobileImage.height}
            alt="Casal de noivos durante a cerimônia, no fim da tarde."
            fetchpriority="high"
            decoding="sync"
            className="h-full w-full animate-reveal-image object-cover"
          />
        </picture>
      </div>

      {/* Véu discreto, apenas o suficiente para o texto ficar legível. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/68 to-ink/15 md:bg-gradient-to-r md:from-ink/88 md:via-ink/55 md:to-ink/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-44 bg-gradient-to-t from-ink/70 to-transparent md:block"
      />

      <div className="section-shell flex h-full flex-col justify-end pb-16 pt-[72px] md:justify-center md:pb-32 md:pt-[88px]">
        <div className="max-w-xl lg:max-w-2xl">
          <p
            className="eyebrow animate-fade-in-up !text-canvas/75"
            style={{ animationDelay: '0.15s' }}
          >
            Fotografia autoral · Patos de Minas, MG
          </p>

          <h1
            className="display mt-5 animate-fade-in-up text-[clamp(2.6rem,9vw,5.6rem)] text-canvas"
            style={{ animationDelay: '0.3s' }}
          >
            Histórias reais.
            <span className="block italic text-canvas/95">Olhares sinceros.</span>
          </h1>

          <p
            className="mt-6 max-w-md animate-fade-in-up text-[15px] leading-relaxed text-canvas/85 md:text-base"
            style={{ animationDelay: '0.45s' }}
          >
            Casamentos, ensaios e momentos especiais, registrados com sensibilidade para que você
            possa reviver cada história.
          </p>

          <div
            className="mt-8 flex animate-fade-in-up flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '0.6s' }}
          >
            <Button href={whatsappLink(whatsappMessages.geral)} external variant="inverse">
              Vamos conversar
            </Button>
            <Button
              href="#portfolio"
              variant="secondary"
              className="!bg-transparent !text-canvas !shadow-[inset_0_0_0_1px_rgba(250,249,246,0.35)] hover:!bg-canvas/10 hover:!shadow-[inset_0_0_0_1px_rgba(250,249,246,0.6)]"
              icon={<ArrowDown size={15} strokeWidth={1.75} />}
            >
              Explorar portfólio
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#portfolio"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-canvas/70 transition-colors duration-300 hover:text-canvas md:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-label">Role para explorar</span>
        <ArrowDown size={16} strokeWidth={1.5} className="animate-nudge" aria-hidden="true" />
      </a>
    </section>
  );
}
