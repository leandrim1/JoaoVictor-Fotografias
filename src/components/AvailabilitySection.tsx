import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { siteConfig, whatsappMessages } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';

export function AvailabilitySection() {
  return (
    <section id="disponibilidade" className="relative overflow-hidden bg-ink py-24 md:py-36">
      {/* Detalhes gráficos discretos: linhas finas e um ponto dourado. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
      />

      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal as="div" className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-canvas/25" />
            <span className="eyebrow !text-gold/90">Disponibilidade</span>
            <span aria-hidden="true" className="h-px w-8 bg-canvas/25" />
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="display mt-8 text-[clamp(2.2rem,6.4vw,4.2rem)] text-canvas"
          >
            Uma edição limitada
            <span className="block italic text-canvas/85">de datas.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.85] text-canvas/70 md:text-base"
          >
            Algumas histórias já têm data marcada. Se você está planejando um casamento, ensaio ou
            evento, vamos conversar sobre o seu momento.
          </Reveal>

          <Reveal delay={0.3} className="mt-11 flex justify-center">
            <Button
              href={whatsappLink(whatsappMessages.disponibilidade)}
              external
              variant="inverse"
              icon={<ArrowUpRight size={16} strokeWidth={1.75} />}
            >
              Consultar disponibilidade
            </Button>
          </Reveal>

          <Reveal as="p" delay={0.4} className="mt-8 text-[12px] tracking-[0.06em] text-canvas/45">
            {siteConfig.serviceArea}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
