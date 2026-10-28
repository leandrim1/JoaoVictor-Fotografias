import { siteConfig } from '@/data/site';

interface LogoProps {
  /** `true` quando o logo está sobre a fotografia do topo. */
  onDark?: boolean;
  className?: string;
}

/** Assinatura tipográfica da marca, usada no cabeçalho e no rodapé. */
export function Logo({ onDark = false, className = '' }: LogoProps) {
  return (
    <a
      href="#inicio"
      className={`group inline-flex flex-col leading-none transition-colors duration-500 ${
        onDark ? 'text-canvas' : 'text-ink'
      } ${className}`.trim()}
      aria-label={`${siteConfig.name} — ir para o início`}
    >
      <span className="font-serif text-[22px] font-medium tracking-[0.01em] md:text-[26px]">
        {siteConfig.shortName}
      </span>
      <span
        className={`mt-0.5 text-[9px] font-medium uppercase tracking-[0.34em] transition-colors duration-500 md:text-[10px] ${
          onDark ? 'text-canvas/70' : 'text-muted'
        }`}
      >
        Fotografias
      </span>
    </a>
  );
}
