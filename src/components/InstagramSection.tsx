import { ArrowUpRight, Instagram } from 'lucide-react';
import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { instagramTiles } from '@/data/instagram';
import { siteConfig } from '@/data/site';

const profileHandle = '@joaovictor.fotografias';

export function InstagramSection() {
  return (
    <section id="instagram" className="bg-sand py-24 md:py-32">
      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="p" className="eyebrow flex items-center gap-2">
              <Instagram size={14} strokeWidth={1.5} aria-hidden="true" />
              Instagram
            </Reveal>

            <Reveal
              as="h2"
              delay={0.1}
              className="display mt-6 text-[clamp(1.9rem,4.8vw,3rem)] text-ink"
            >
              Mais histórias, mais detalhes, mais momentos reais.
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-ink transition-colors duration-300 hover:text-gold"
              >
                <span className="link-underline">Acompanhe no Instagram</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-editorial group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
              <p className="mt-3 text-[13px] text-muted">{profileHandle}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7">
            <ul className="grid grid-cols-2 gap-3 md:gap-4">
              {instagramTiles.map((tile) => (
                <li key={tile.slug}>
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-sm"
                    aria-label={`Abrir o perfil ${profileHandle} no Instagram`}
                  >
                    <Photo
                      slug={tile.slug}
                      alt={tile.alt}
                      zoomOnHover
                      sizes="(min-width: 1024px) 23vw, 45vw"
                      className="aspect-[4/3] w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
