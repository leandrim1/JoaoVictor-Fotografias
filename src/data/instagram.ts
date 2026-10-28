import type { ImageSlug } from '@/data/imageManifest';

export interface InstagramTile {
  slug: ImageSlug;
  alt: string;
}

/**
 * Galeria estática exibida ao lado do convite para o Instagram.
 *
 * Não há integração com a API do Instagram, portanto nada aqui é um feed ao
 * vivo: são fotos escolhidas à mão. Para trocar, edite esta lista usando os
 * slugs disponíveis no manifesto de imagens.
 */
export const instagramTiles: InstagramTile[] = [
  { slug: 'estudio-fachada', alt: 'Parede do estúdio com a identidade visual de João Victor Fotografias.' },
  { slug: 'estudio-recepcao', alt: 'Sala de recepção do estúdio, com poltronas e fotografias na parede.' },
  { slug: 'estudio-escritorio', alt: 'Escritório do estúdio, com mesa de atendimento e porta-retratos.' },
  { slug: 'casamento-cerimonia-ar-livre', alt: 'Cerimônia de casamento ao ar livre, com os convidados ao fundo.' },
];
