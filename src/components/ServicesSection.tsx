import { ArrowUpRight } from 'lucide-react';
import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { services } from '@/data/services';
import { whatsappLink } from '@/lib/whatsapp';

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-canvas py-24 md:py-36">
      <div className="section-shell">
        <header className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            Como podemos contar sua história?
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="display mt-6 text-[clamp(2rem,5.6vw,3.6rem)] text-ink"
          >
            Cada momento tem sua maneira de ser lembrado.
          </Reveal>
        </header>

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 1;

            return (
              <Reveal
                key={service.id}
                as="article"
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
              >
                <div
                  className={`lg:col-span-6 ${
                    imageFirst ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'
                  }`}
                >
                  {/* A proporção real guia o bloco, mas limitamos a altura para
                      que uma foto vertical não domine a tela em tablets. */}
                  <Photo
                    slug={service.slug}
                    alt={service.alt}
                    natural
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="max-h-[70vh] w-full rounded-sm"
                  />
                </div>

                <div
                  className={`lg:col-span-5 ${
                    imageFirst ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-[2.4rem] font-light leading-none text-gold/55"
                  >
                    {service.index}
                  </span>

                  <h3 className="display mt-4 text-[clamp(1.75rem,4vw,2.5rem)] text-ink">
                    {service.title}
                  </h3>

                  <p className="mt-5 max-w-lg text-[15px] leading-[1.8] text-muted">
                    {service.description}
                  </p>

                  <a
                    href={whatsappLink(service.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-7 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-ink transition-colors duration-300 hover:text-gold"
                  >
                    <span className="link-underline">{service.linkLabel}</span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-editorial group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
