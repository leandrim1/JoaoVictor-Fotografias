import { Reveal } from '@/components/Reveal';

export function AboutSection() {
  return (
    <section id="essencia" className="bg-canvas py-24 md:py-36 lg:py-44">
      <div className="section-shell">
        <div className="mx-auto max-w-prose text-center">
          <Reveal as="p" className="eyebrow">
            Mais do que fotografias
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="mt-7 text-[clamp(1.7rem,4.4vw,2.85rem)] font-light leading-[1.22] tracking-[-0.015em] text-ink"
          >
            Alguns momentos merecem ser{' '}
            <span className="font-serif text-[1.14em] font-normal italic">sentidos outra vez</span>.
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mx-auto mt-9 max-w-[62ch] text-[15px] leading-[1.85] text-muted md:text-[17px]"
          >
            Um abraço apertado, um olhar que diz tudo, a alegria de um dia esperado há tanto tempo.
            Meu trabalho é estar atento a esses instantes e registrar cada história de um jeito
            verdadeiro, sem deixar que o momento perca sua essência.
          </Reveal>

          <Reveal delay={0.3} className="mt-14 flex justify-center md:mt-20">
            <span aria-hidden="true" className="block h-px w-16 bg-gold/50" />
          </Reveal>

          <Reveal
            as="p"
            delay={0.4}
            className="display mt-14 text-[clamp(1.9rem,5.4vw,3.5rem)] text-ink md:mt-20"
          >
            Não é só sobre como foi.
            <span className="mt-1 block italic text-ink/80">
              É sobre como você vai se lembrar.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
