import { ArrowUpRight, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/data/site';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <section id="depoimentos" className="bg-canvas py-24 md:py-36">
      <div className="section-shell">
        <div className="mx-auto max-w-prose text-center">
          <Reveal>
            <Quote
              size={26}
              strokeWidth={1.25}
              aria-hidden="true"
              className="mx-auto text-gold/70"
            />
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="display mt-8 text-[clamp(2rem,5.4vw,3.5rem)] text-ink"
          >
            Histórias que continuam com a gente.
          </Reveal>

          <Reveal as="p" delay={0.2} className="mt-7 text-[15px] leading-[1.8] text-muted">
            Quem já viveu esses momentos comigo deixou o próprio relato no Google. São cinco
            avaliações publicadas, abertas para quem quiser ler antes de conversar.
          </Reveal>

          <Reveal delay={0.3} className="mt-9">
            <a
              href={siteConfig.links.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-ink transition-colors duration-300 hover:text-gold"
            >
              <span className="link-underline">Veja as avaliações no Google</span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 ease-editorial group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        {hasTestimonials ? (
          <ul className="mx-auto mt-16 grid max-w-5xl gap-6 md:mt-20 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Reveal
                as="li"
                key={testimonial.id}
                delay={0.1 * index}
                className="border-t border-ink/10 pt-8"
              >
                <blockquote className="font-serif text-xl font-light leading-[1.5] text-ink md:text-2xl">
                  “{testimonial.quote}”
                </blockquote>
                <footer className="mt-5 text-[13px] text-muted">
                  <span className="font-medium text-ink">{testimonial.author}</span>
                  {testimonial.context ? <span> — {testimonial.context}</span> : null}
                </footer>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
