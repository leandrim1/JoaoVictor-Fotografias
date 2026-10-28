import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { addressLine, siteConfig, whatsappMessages } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';

export function ContactSection() {
  return (
    <section id="contato" className="bg-canvas py-28 md:py-40">
      <div className="section-shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow">
              Contato
            </Reveal>

            <Reveal
              as="h2"
              delay={0.1}
              className="display mt-7 text-[clamp(2.4rem,7vw,4.6rem)] text-ink"
            >
              Vamos guardar
              <span className="block italic">essa história?</span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.2}
              className="mt-8 max-w-lg text-[15px] leading-[1.85] text-muted md:text-base"
            >
              Me conte o que você está planejando. Vai ser um prazer conhecer sua ideia e conversar
              sobre como podemos registrar esse momento.
            </Reveal>

            <Reveal delay={0.3} className="mt-10">
              <Button
                href={whatsappLink(whatsappMessages.contato)}
                external
                icon={<ArrowUpRight size={16} strokeWidth={1.75} />}
              >
                Falar com João Victor
              </Button>
            </Reveal>
          </div>

          <Reveal
            as="address"
            delay={0.2}
            className="not-italic lg:col-span-4 lg:col-start-9"
          >
            <p className="font-serif text-2xl font-light text-ink">{siteConfig.name}</p>
            <p className="mt-2 text-[14px] text-muted">{siteConfig.serviceArea}</p>

            <dl className="mt-10 space-y-7 text-[14px] leading-relaxed">
              <div>
                <dt className="eyebrow">Telefone</dt>
                <dd className="mt-2.5">
                  <a
                    href={siteConfig.phoneHref}
                    className="group/link inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-gold"
                  >
                    <Phone size={15} strokeWidth={1.5} aria-hidden="true" className="text-gold" />
                    <span className="link-underline">{siteConfig.phoneDisplay}</span>
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow">Endereço</dt>
                <dd className="mt-2.5">
                  <a
                    href={siteConfig.links.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex max-w-xs items-start gap-2 text-ink transition-colors duration-300 hover:text-gold"
                  >
                    <MapPin
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-gold"
                    />
                    <span className="link-underline">{addressLine}</span>
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow">Atendimento</dt>
                <dd className="mt-2.5 max-w-xs text-muted">{siteConfig.address.note}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
