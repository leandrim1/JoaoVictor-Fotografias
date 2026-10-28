export interface Testimonial {
  id: string;
  quote: string;
  /** Nome de quem assina o depoimento. Só publique com autorização. */
  author: string;
  /** Contexto curto, por exemplo "Casamento em Patos de Minas". */
  context?: string;
}

/**
 * Nenhum depoimento foi publicado aqui ainda.
 *
 * A estrutura já está pronta: basta acrescentar os itens autorizados por quem
 * escreveu e eles passam a ser exibidos na seção de depoimentos. Enquanto a
 * lista estiver vazia, a seção mostra apenas o convite para ler as avaliações
 * públicas no Google.
 */
export const testimonials: Testimonial[] = [];
