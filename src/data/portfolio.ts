import type { PortfolioCategory, PortfolioFilter, PortfolioPhoto } from '@/types/portfolio';

/**
 * Nomes das categorias exibidos nos filtros e sobre cada fotografia.
 * As quatro categorias já ficam previstas; os filtros exibidos são montados a
 * partir das fotos realmente cadastradas em `portfolioPhotos` (ver `portfolioFilters`).
 */
export const categoryLabels: Record<PortfolioCategory, string> = {
  casamentos: 'Casamentos',
  ensaios: 'Ensaios',
  eventos: 'Eventos',
  retratos: 'Retratos',
};

/** Ordem em que as categorias aparecem na barra de filtros. */
const categoryOrder: PortfolioCategory[] = ['casamentos', 'ensaios', 'eventos', 'retratos'];

/**
 * Fotografias do portfólio.
 *
 * Para adicionar uma foto:
 *  1. coloque o arquivo em `fotos-originais/portfolio/<slug>.jpg`;
 *  2. rode `npm run images` (gera as versões WebP e atualiza o manifesto);
 *  3. acrescente um item aqui usando o mesmo `slug`.
 *
 * O TypeScript acusa erro se o `slug` não existir no manifesto.
 */
export const portfolioPhotos: PortfolioPhoto[] = [
  {
    id: 'casamento-entrada-cerimonia',
    slug: 'casamento-entrada-cerimonia',
    caption: 'A entrada',
    category: 'casamentos',
    alt: 'Entrada da noiva em cerimônia ao ar livre, entre os convidados, no fim da tarde.',
    orientation: 'horizontal',
  },
  {
    id: 'casamento-arco-floral',
    slug: 'casamento-arco-floral',
    caption: 'Depois do sim',
    category: 'casamentos',
    alt: 'Noivos sentados sob um arco de flores no jardim, olhando um para o outro.',
    orientation: 'vertical',
  },
  {
    id: 'casamento-abraco-altar',
    slug: 'casamento-abraco-altar',
    caption: 'O abraço',
    category: 'casamentos',
    alt: 'Noivos abraçados diante do altar, de olhos fechados, durante a cerimônia na igreja.',
    orientation: 'horizontal',
  },
  {
    id: 'casamento-altar-igreja',
    slug: 'casamento-altar-igreja',
    caption: 'No altar',
    category: 'casamentos',
    alt: 'Noivos de mãos dadas diante do altar, trocando olhares durante a cerimônia na igreja.',
    orientation: 'vertical',
  },
  {
    id: 'ensaio-casal-folhagem',
    slug: 'ensaio-casal-folhagem',
    caption: 'Entre folhas',
    category: 'ensaios',
    alt: 'Casal de mãos dadas encostado em uma parede clara, emoldurado por folhagens.',
    orientation: 'vertical',
  },
  {
    id: 'casamento-por-do-sol',
    slug: 'casamento-por-do-sol',
    caption: 'Pôr do sol',
    category: 'casamentos',
    alt: 'Noivos abraçados com o buquê, recortados pelo céu alaranjado do fim do dia.',
    orientation: 'horizontal',
  },
  {
    id: 'casamento-cerimonia-ar-livre',
    slug: 'casamento-cerimonia-ar-livre',
    caption: 'Cerimônia ao ar livre',
    category: 'casamentos',
    alt: 'Noivo beija a mão da noiva durante cerimônia ao ar livre, com os convidados ao fundo.',
    orientation: 'horizontal',
  },
  {
    id: 'casamento-noivos-igreja',
    slug: 'casamento-noivos-igreja',
    caption: 'Recém-casados',
    category: 'casamentos',
    alt: 'Noivos sorrindo lado a lado dentro da igreja, com buquê de flores claras.',
    orientation: 'vertical',
  },
  {
    id: 'casamento-ceu-aberto',
    slug: 'casamento-ceu-aberto',
    caption: 'Céu aberto',
    category: 'casamentos',
    alt: 'Cerimônia ao ar livre sob céu azul, com os noivos sentados diante do celebrante.',
    orientation: 'horizontal',
  },
  {
    id: 'ensaio-casal-alameda',
    slug: 'ensaio-casal-alameda',
    caption: 'Alameda',
    category: 'ensaios',
    alt: 'Casal abraçado e sorrindo em uma alameda arborizada, durante ensaio ao ar livre.',
    orientation: 'vertical',
  },
  {
    id: 'casamento-letreiro-love',
    slug: 'casamento-letreiro-love',
    caption: 'Fim de tarde',
    category: 'casamentos',
    alt: 'Casal de noivos ao lado de um letreiro luminoso durante o pôr do sol.',
    orientation: 'vertical',
  },
];

/**
 * Filtros exibidos na interface: "Todos" mais as categorias que têm pelo menos
 * uma fotografia cadastrada. Assim nenhuma aba abre vazia — ao cadastrar fotos
 * de eventos ou retratos, o filtro correspondente aparece sozinho.
 */
export const portfolioFilters: PortfolioFilter[] = [
  { id: 'todos', label: 'Todos' },
  ...categoryOrder
    .filter((category) => portfolioPhotos.some((photo) => photo.category === category))
    .map((category) => ({ id: category, label: categoryLabels[category] })),
];

/** Fotos usadas na faixa editorial logo abaixo do hero. */
export const marqueePhotos: PortfolioPhoto[] = portfolioPhotos;
