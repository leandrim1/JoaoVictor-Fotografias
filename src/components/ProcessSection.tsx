import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { processSteps } from '@/data/services';
import { siteConfig } from '@/data/site';

export function ProcessSection() {
  return (
    <section id="experiencia" className="bg-sand py-24 md:py-36">
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="p" className="eyebrow">
              Do primeiro contato às suas memórias
            </Reveal>

            <Reveal
              as="h2"
              delay={0.1}
              className="display mt-6 text-[clamp(2rem,5.2vw,3.4rem)] text-ink"
            >
              Tudo começa com uma boa conversa.
            </Reveal>

            <Reveal delay={0.2} className="mt-10 max-w-sm md:mt-14">
              <Photo
                slug="joao-victor"
                alt={`${siteConfig.name} — retrato do fotógrafo.`}
                natural
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="w-full rounded-sm"
              />
              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                <span className="font-medium text-ink">João Victor</span> — fotógrafo em{' '}
                {siteConfig.city} e região, {siteConfig.state}.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="flex flex-col">
              {processSteps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.index}
                  delay={0.1 * index}
                  className="border-t border-ink/10 py-8 first:border-t-0 first:pt-0 md:py-10"
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span
                      aria-hidden="true"
                      className="font-serif text-[2.6rem] font-light leading-none text-gold/50 md:text-[3.4rem]"
                    >
                      {step.index}
                    </span>

                    <div>
                      <h3 className="font-serif text-2xl font-light text-ink md:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-md text-[15px] leading-[1.8] text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
