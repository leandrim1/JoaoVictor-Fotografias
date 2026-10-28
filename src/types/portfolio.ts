import type { ImageSlug } from '@/data/imageManifest';

/** Categorias previstas para o portfólio. */
export type PortfolioCategory = 'casamentos' | 'ensaios' | 'eventos' | 'retratos';

/** Orientação usada para montar a grade editorial. */
export type PhotoOrientation = 'vertical' | 'horizontal' | 'quadrada';

export interface PortfolioPhoto {
  /** Identificador estável, usado como chave de lista e no lightbox. */
  id: string;
  /** Slug do arquivo em /public/images (ver `imageManifest`). */
  slug: ImageSlug;
  /** Legenda curta exibida sobre a foto. */
  caption: string;
  category: PortfolioCategory;
  /** Texto alternativo descritivo, obrigatório para acessibilidade. */
  alt: string;
  /** Orientação da fotografia, usada para ler e revisar o acervo. A grade em si
   *  se apoia nas dimensões reais do arquivo, vindas do manifesto. */
  orientation: PhotoOrientation;
}

export interface PortfolioFilter {
  id: PortfolioCategory | 'todos';
  label: string;
}

/** Dados prontos para serem usados em <img>, derivados do manifesto. */
export interface ResponsiveImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  placeholder: string;
  orientation: PhotoOrientation;
}
